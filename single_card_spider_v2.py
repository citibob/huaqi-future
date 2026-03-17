#!/usr/bin/env python3
"""
单卡监控爬虫 - 修复版
修复内容：
1. 使用正确的选择器 (data-testid="item-cell")
2. 正确获取商品状态（在售/售罄）
3. 访问详情页获取精确上架时间
"""
import asyncio
import json
import re
from datetime import datetime
from playwright.async_api import async_playwright
import pandas as pd

# 核心关键词
KEYWORDS = [
    "0307 ポケモン", "0709 ポケモン", "0115 ポケモン", "0615 ポケモン", "0915 ポケモン",
    "宝石包 ポケモン", "ジェムパック"
]

def get_type(title):
    t = title.lower()
    if "psa10" in t or "bgs10" in t:
        return "PSA10"
    if "bgs" in t:
        return "BGS10"
    if "sar" in t:
        return "SAR"
    if "ar" in t and not any(x in t for x in ["psa","bgs","cgc","ars","9."]):
        return "AR"
    return None

def should_include(title):
    t = title.lower()
    whitelist = ["ポケモン", "Pokémon", "Pokemon", "PSA", "BGS", "宝石包", "ジェムパック", "AR", "SAR", "CBB", "中国"]
    blacklist = ["メガ", "セット", "まとめ売り", "引退品", "GX", "VMAX", "Vstar", "ジャンク"]
    
    if not any(w.lower() in t for w in whitelist):
        return False
    if any(w.lower() in t for w in blacklist):
        return False
    return True

async def get_item_detail(browser, url):
    """访问商品详情页获取精确状态和时间"""
    try:
        page = await browser.new_page()
        await page.goto(url, timeout=15000)
        await page.wait_for_timeout(2000)
        
        text = await page.inner_text('body')
        
        # 判断状态
        is_sold = "売り切れ" in text
        
        # 提取时间 - 多种格式
        time_patterns = [
            r'(\d+[時間日时分])前',
            r'(\d+[時間日时分])',
            r'掲載\s*(\d+[時間日时分])',
        ]
        created = "近日"
        for pattern in time_patterns:
            match = re.search(pattern, text)
            if match:
                created = match.group(1) + "前"
                break
        
        await page.close()
        return is_sold, created
    except Exception as e:
        await page.close()
        return False, "近日"

async def search_keyword(kw, status, get_details=True):
    results = []
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        
        try:
            page = await browser.new_page()
            status_param = "sold_out" if status == "sold" else "on_sale"
            url = f"https://jp.mercari.com/search?keyword={kw.replace(' ','+')}&status={status_param}"
            
            await page.goto(url, timeout=20000)
            await page.wait_for_timeout(3000)
            
            # 使用正确的选择器
            items = await page.query_selector_all('[data-testid="item-cell"]')
            
            for item in items[:30]:
                try:
                    # 获取商品链接
                    link = await item.query_selector('a[href^="/item/"]')
                    if not link:
                        continue
                    href = await link.get_attribute('href')
                    item_url = f"https://jp.mercari.com{href}" if href else ''
                    
                    if not item_url:
                        continue
                    
                    # 获取文本内容解析标题和价格
                    text = await item.inner_text()
                    lines = [l.strip() for l in text.strip().split('\n') if l.strip()]
                    
                    # 新格式：['¥', '1,600', '标题']
                    price = 0
                    title = ""
                    for i, line in enumerate(lines):
                        if line == '¥' and i+1 < len(lines):
                            price_str = lines[i+1].replace(',', '')
                            if price_str.isdigit():
                                price = int(price_str)
                        elif line and not line.startswith('['):
                            if not re.match(r'^[\d,]+$', line) and line != '¥':
                                title = line
                                break
                    
                    if not title or price <= 0:
                        continue
                    
                    # 类型判断
                    ctype = get_type(title)
                    if not ctype:
                        continue
                    
                    # 过滤
                    if not should_include(title):
                        continue
                    
                    # 如果需要获取详情页信息
                    if get_details:
                        is_sold, created = await get_item_detail(browser, item_url)
                    else:
                        is_sold = (status == "sold")
                        created = "近日"
                    
                    # 状态
                    final_status = "売り切れ" if is_sold else "販売中"
                    
                    results.append({
                        "title": title,
                        "price_jpy": price,
                        "status": final_status,
                        "created": created,
                        "url": item_url,
                        "type": ctype,
                        "keyword": kw
                    })
                except Exception as e:
                    continue
                    
        except Exception as e:
            print(f"错误: {kw} - {e}")
        
        await browser.close()
    
    return results

async def main():
    print("="*50)
    print("单卡监控 - Mercari版 (修复版)")
    print("="*50)
    print("获取详细信息: 是 (访问详情页)")
    print()
    
    all_results = []
    
    # 只搜索在售商品，售罄商品单独处理
    for kw in KEYWORDS:
        print(f"搜索: {kw}")
        
        # 在售
        items = await search_keyword(kw, "on_sale", get_details=True)
        on_sale_count = len([i for i in items if i['status'] == '販売中'])
        sold_count = len([i for i in items if i['status'] == '売り切れ'])
        print(f"  販売中: {on_sale_count}, 売り切れ: {sold_count}")
        all_results.extend(items)
    
    if all_results:
        df = pd.DataFrame(all_results)
        df = df.drop_duplicates(subset=['title'], keep='first')
        
        print(f"\n=== 统计 ===")
        print(f"总计: {len(df)}")
        on_sale = len(df[df['status'] == '販売中'])
        sold = len(df[df['status'] == '売り切れ'])
        print(f"販売中: {on_sale}")
        print(f"売り切れ: {sold}")
        print(f"类型: {df['type'].value_counts().to_dict()}")
        
        # 保存
        output = f"/Users/hm/Desktop/销售总监報告/单卡监控_{datetime.now().strftime('%Y-%m-%d')}.json"
        df.to_json(output, orient='records', force_ascii=False, indent=2)
        print(f"\n已保存: {output}")
    else:
        print("没有获取到数据")

if __name__ == "__main__":
    asyncio.run(main())
