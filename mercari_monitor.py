#!/usr/bin/env python3
"""
煤炉宝石包网页深抓版

目标：
- 对齐用户在网页里看到的搜索结果
- 在售/售罄双状态抓取
- 最新排序
- 深滚动，减少漏抓
- 输出给宝石包报表直接使用
"""

import asyncio
import json
import os
import re
from collections import OrderedDict
from datetime import datetime
from urllib.parse import quote_plus

from playwright.async_api import async_playwright


OUTPUT_JSON = "/Users/hm/.openclaw/agents/ebay/mercari_data.json"
SEARCH_MATRIX = OrderedDict({
    "VOL.1": ["宝石包vol.1", "宝石包 vol.1", "ジェムパックvol.1", "ジェムパック vol.1"],
    "VOL.2": ["宝石包vol.2", "宝石包 vol.2", "ジェムパックvol.2", "ジェムパック vol.2"],
    "VOL.3": ["宝石包vol.3", "宝石包 vol.3", "ジェムパックvol.3", "ジェムパック vol.3"],
    "VOL.4": ["宝石包vol.4", "宝石包 vol.4", "ジェムパックvol.4", "ジェムパック vol.4"],
})
STATUS_MAP = OrderedDict({
    "販売中": "on_sale",
    "売り切れ": "sold_out",
})
MAX_ITEMS_PER_QUERY = 120
SCROLL_ROUNDS = 10


def normalize_title(title: str) -> str:
    return re.sub(r"\s+", " ", title or "").strip()


def build_search_url(keyword: str, status: str) -> str:
    q = quote_plus(keyword)
    return f"https://jp.mercari.com/search?keyword={q}&status={status}&sort=created_time&order=desc"


def detect_status_from_text(text: str, expected_status: str) -> str:
    if "売り切れ" in text or "SOLD" in text.upper():
        return "売り切れ"
    return "販売中" if expected_status == "on_sale" else "売り切れ"


async def collect_item_cards(page):
    return await page.query_selector_all('[data-testid="item-cell"]')


async def extract_card(item, keyword: str, query_vol: str, expected_status: str):
    try:
        link = await item.query_selector('a[href*="/item/"]')
        if not link:
            return None
        href = await link.get_attribute("href")
        if not href:
            return None
        url = href if href.startswith("http") else f"https://jp.mercari.com{href}"

        text = await item.inner_text()
        lines = [x.strip() for x in text.splitlines() if x.strip()]
        title = ""
        price = None
        for i, line in enumerate(lines):
            if line == "¥" and i + 1 < len(lines):
                nxt = lines[i + 1].replace(",", "")
                if nxt.isdigit():
                    price = int(nxt)
            elif line != "¥" and not re.fullmatch(r"[\d,]+", line):
                if "前" not in line and line not in ("販売中", "売り切れ"):
                    title = line
        if not title or price is None:
            return None

        created = ""
        for line in lines:
            if re.search(r"\d{4}-\d{2}-\d{2}", line) or re.search(r"\d+[分時間日]前", line):
                created = line
                break

        img = await item.query_selector("img")
        thumbnail = ""
        if img:
            thumbnail = await img.get_attribute("src") or await img.get_attribute("data-src") or ""

        return {
            "title": normalize_title(title),
            "price_jpy": price,
            "status": detect_status_from_text(text, expected_status),
            "created": created,
            "url": url,
            "thumbnail": thumbnail,
            "vol": query_vol,
            "keyword": keyword,
            "query_vol": query_vol,
            "query_status": "販売中" if expected_status == "on_sale" else "売り切れ",
        }
    except Exception:
        return None


async def search_keyword(page, keyword: str, query_vol: str, expected_status: str):
    url = build_search_url(keyword, expected_status)
    await page.goto(url, timeout=30000)
    await page.wait_for_timeout(2500)

    seen = OrderedDict()
    stable_rounds = 0
    last_count = 0

    for _ in range(SCROLL_ROUNDS):
        cards = await collect_item_cards(page)
        for card in cards[:MAX_ITEMS_PER_QUERY]:
            data = await extract_card(card, keyword, query_vol, expected_status)
            if data and data["url"] not in seen:
                seen[data["url"]] = data

        if len(seen) == last_count:
            stable_rounds += 1
            if stable_rounds >= 2:
                break
        else:
            stable_rounds = 0
            last_count = len(seen)

        await page.mouse.wheel(0, 5000)
        await page.wait_for_timeout(1500)

    return list(seen.values())


async def main():
    os.makedirs(os.path.dirname(OUTPUT_JSON), exist_ok=True)

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True, channel="chrome")
        page = await browser.new_page()
        await page.set_extra_http_headers({
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
        })

        merged = OrderedDict()

        for vol, keywords in SEARCH_MATRIX.items():
            for keyword in keywords:
                for status_name, status_param in STATUS_MAP.items():
                    print(f"搜索 {vol} | {status_name} | {keyword}")
                    items = await search_keyword(page, keyword, vol, status_param)
                    print(f"  获取 {len(items)} 条")
                    for item in items:
                        if item["url"] not in merged:
                            merged[item["url"]] = item

        await browser.close()

    result = list(merged.values())
    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    print(f"已保存 {len(result)} 条到 {OUTPUT_JSON}")


if __name__ == "__main__":
    asyncio.run(main())
