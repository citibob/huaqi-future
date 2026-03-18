#!/usr/bin/env python3
"""
煤炉宝石包监控。

改成 API 直连，避免 Playwright 深滚动把请求量打满。
"""

import json
import os
import re
import time
from collections import OrderedDict
from datetime import datetime
from itertools import islice

import mercari
from mercari import MercariOrder, MercariSearchStatus, MercariSort


OUTPUT_JSON = "/Users/hm/.openclaw/agents/ebay/mercari_data.json"
SUPPLEMENTAL_URLS = "/Users/hm/.openclaw/agents/ebay/mercari_supplemental_urls.txt"
SEARCH_MATRIX = OrderedDict({
    "VOL.1": ["宝石包vol.1", "宝石包 第一弹", "ジェムパック vol.1", "CBB1C pokemon"],
    "VOL.2": ["宝石包vol.2", "宝石包 第二弹", "ジェムパック vol.2", "CBB2C pokemon"],
    "VOL.3": ["宝石包vol.3", "宝石包 第三弹", "ジェムパック vol.3", "CBB3C pokemon"],
    "VOL.4": ["宝石包vol.4", "宝石包 第四弹", "ジェムパック vol.4", "CBB4C pokemon"],
})
STATUS_MAP = OrderedDict({
    "販売中": MercariSearchStatus.ON_SALE,
    "売り切れ": MercariSearchStatus.SOLD_OUT,
})
MAX_ITEMS_PER_QUERY = 30
MAX_ITEMS_PER_VOL = 80
SLEEP_BETWEEN_QUERIES = 1.2


def normalize_title(title: str) -> str:
    return re.sub(r"\s+", " ", title or "").strip()


def format_created(created) -> str:
    if hasattr(created, "strftime"):
        return created.strftime("%Y-%m-%d %H:%M")
    if isinstance(created, str):
        raw = created.replace("Z", "+00:00")
        try:
            return datetime.fromisoformat(raw).strftime("%Y-%m-%d %H:%M")
        except ValueError:
            return created
    return ""


def status_label(status_value: str) -> str:
    return "売り切れ" if status_value == MercariSearchStatus.SOLD_OUT else "販売中"


def detect_query_vol(text: str) -> str:
    upper = (text or "").upper()
    match = re.search(r"VOL[.\s]*([1-4])", upper)
    if match:
        return f"VOL.{match.group(1)}"
    match = re.search(r"CBB([1-4])C", upper)
    if match:
        return f"VOL.{match.group(1)}"
    return ""


def item_to_row(item, keyword: str, query_vol: str, query_status) -> dict:
    title = normalize_title(getattr(item, "productName", ""))
    price = int(getattr(item, "price", 0) or 0)
    created = format_created(getattr(item, "created", ""))
    url = getattr(item, "productURL", "")
    thumbnail = getattr(item, "imageURL", "")
    actual_status = status_label(query_status)
    item_status = getattr(item, "status", "")
    if item_status:
        actual_status = "売り切れ" if "SOLD_OUT" in item_status else "販売中"
    detected_vol = detect_query_vol(title)
    return {
        "title": title,
        "price_jpy": price,
        "status": actual_status,
        "created": created,
        "url": url,
        "thumbnail": thumbnail,
        "vol": detected_vol or query_vol,
        "keyword": keyword,
        "query_vol": query_vol,
        "query_status": status_label(query_status),
    }


def load_supplemental_urls():
    if not os.path.exists(SUPPLEMENTAL_URLS):
        return []
    result = []
    with open(SUPPLEMENTAL_URLS, "r", encoding="utf-8") as fh:
        for raw in fh:
            line = raw.strip()
            if not line:
                continue
            if "|" in line:
                vol, url = [x.strip() for x in line.split("|", 1)]
            else:
                vol, url = "", line
            if url.startswith("https://jp.mercari.com/item/"):
                result.append({"query_vol": vol, "url": url})
    return result


def merge_supplemental_urls(merged):
    for record in load_supplemental_urls():
        url = record["url"]
        if url in merged:
            continue
        query_vol = record.get("query_vol", "")
        merged[url] = {
            "title": f"[补录] {query_vol or 'Mercari链接'}",
            "price_jpy": 0,
            "status": "已补录",
            "created": "",
            "url": url,
            "thumbnail": "",
            "vol": query_vol,
            "keyword": query_vol.lower() if query_vol else "",
            "query_vol": query_vol,
            "query_status": "已补录",
        }


def collect_query(keyword: str, query_vol: str, query_status):
    search_iter = mercari.search(
        keyword,
        sort=MercariSort.SORT_CREATED_TIME,
        order=MercariOrder.ORDER_DESC,
        status=query_status,
    )
    rows = []
    for item in islice(search_iter, MAX_ITEMS_PER_QUERY):
        row = item_to_row(item, keyword, query_vol, query_status)
        if row["title"] and row["price_jpy"] > 0 and row["url"]:
            rows.append(row)
    return rows


def main():
    os.makedirs(os.path.dirname(OUTPUT_JSON), exist_ok=True)
    merged = OrderedDict()

    for vol, keywords in SEARCH_MATRIX.items():
        for keyword in keywords:
            for status_name, status_value in STATUS_MAP.items():
                vol_items = sum(
                    1
                    for row in merged.values()
                    if (row.get("query_vol") or row.get("vol")) == vol and row.get("status") == status_name
                )
                if vol_items >= MAX_ITEMS_PER_VOL:
                    print(f"跳过 {vol} | {status_name} | {keyword}，已达到 {MAX_ITEMS_PER_VOL} 条")
                    continue
                print(f"搜索 {vol} | {status_name} | {keyword}")
                items = collect_query(keyword, vol, status_value)
                print(f"  获取 {len(items)} 条")
                for item in items:
                    merged.setdefault(item["url"], item)
                time.sleep(SLEEP_BETWEEN_QUERIES)

    merge_supplemental_urls(merged)

    result = list(merged.values())
    with open(OUTPUT_JSON, "w", encoding="utf-8") as fh:
        json.dump(result, fh, ensure_ascii=False, indent=2)
    print(f"已保存 {len(result)} 条到 {OUTPUT_JSON}")


if __name__ == "__main__":
    main()
