#!/usr/bin/env python3
"""快速单卡监控 - 精简版"""
import asyncio
import json
import re
from datetime import datetime
from playwright.async_api import async_playwright
import pandas as pd

# 核心关键词
KEYWORDS = ["0307", "0709", "0115", "0615", "0915", "宝石包"]

async def search_kw(kw):
    results = []
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        for status in ["on_sale", "sold_out"]:
            url = f"https://jp.mercari.com/search?keyword={kw.replace(' ','+')}&status={status}"
            try:
                await page.goto(url, timeout=15000)
                await page.wait_for_timeout(2000)
                
                items = await page.query_selector_all('[data-testid="item-cell"]')
                
                for item in items[:30]:
                    try:
                        text = await item.inner_text()
                        lines = [l.strip() for l in text.split('\n') if l.strip()]
                        
                        price = 0
                        title = ''
                        for j, line in enumerate(lines):
                            if line == '¥' and j+1 < len(lines):
                                try:
                                    price = int(lines[j+1].replace(',', ''))
                                except: pass
                            elif line != '¥' and line and (line[0].isalpha() or line[0] == '【'):
                                title = line
                        
                        link = await item.query_selector('a[href^="/item/"]')
                        href = await link.get_attribute('href') if link else ''
                        url = f"https://jp.mercari.com{href}" if href else ''
                        
                        html = await item.inner_html()
                        stat = "売り切れ" if "sold" in html.lower() else "販売中"
                        
                        # 获取时间
                        time_text = "近日"
                        try:
                            time_elem = await item.query_selector('[class*="time"]')
                            if time_elem:
                                time_text = await time_elem.inner_text()
                        except: pass
                        
                        # 类型判断
                        t = title.lower()
                        ctype = "other"
                        if "psa10" in t or "bgs10" in t:
                            ctype = "PSA10"
                        elif "bgs" in t:
                            ctype = "BGS10"
                        elif "sar" in t:
                            ctype = "SAR"
                        elif "ar" in t and not any(x in t for x in ["psa","bgs","cgc","ars","9."]):
                            ctype = "AR"
                        
                        if title and price > 0:
                            results.append({
                                "title": title, "price_jpy": price, "status": stat,
                                "created": time_text, "url": url, "type": ctype
                            })
                    except: continue
            except: continue
        
        await browser.close()
    return results

async def main():
    print("开始搜索...")
    all_results = []
    
    for kw in KEYWORDS:
        print(f"搜索: {kw}")
        items = await search_kw(kw)
        all_results.extend(items)
        print(f"  获取: {len(items)}")
    
    # 处理
    df = pd.DataFrame(all_results)
    df = df[df['type'].isin(['PSA10','BGS10','AR','SAR'])]
    df = df.drop_duplicates(subset=['title'], keep='first')
    
    print(f"\n总计: {len(df)}")
    print(f"販売中: {len(df[df['status']=='販売中'])}")
    print(f"売り切れ: {len(df[df['status']=='売り切れ'])}")
    
    # 保存
    output = f"/Users/hm/Desktop/销售总监報告/单卡监控_{datetime.now().strftime('%Y-%m-%d')}.json"
    df.to_json(output, orient='records', force_ascii=False, indent=2)
    print(f"已保存: {output}")

asyncio.run(main())
