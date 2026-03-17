#!/usr/bin/env python3
"""
单卡监控爬虫 - 最终优化版
修复内容：
1. 正确的选择器 (data-testid="item-cell")
2. 正确获取商品状态（访问详情页）
3. 正确获取上架时间（从详情页提取）
4. 扩大关键词覆盖范围
"""
import asyncio
import re
from playwright.async_api import async_playwright
import pandas as pd
from datetime import datetime

# 核心关键词 - 包含AR/SAR/宝石包
KEYWORDS = [
    # AR卡
    "0307 AR ポケモン", "0709 AR ポケモン", "0115 AR ポケモン", "0615 AR ポケモン", "0915 AR ポケモン",
    # SAR卡  
    "0307 SAR ポケモン", "0709 SAR ポケモン", "0115 SAR ポケモン", "0615 SAR ポケモン", "0915 SAR ポケモン",
    # 宝石包
    "宝石包 AR", "宝石包 SAR", "ジェムパック AR", "ジェムパック SAR",
    "宝石包 ポケモン", "ジェムパック ポケモン",
]

def get_type(title):
    t = title.lower()
    if "psa10" in t or "bgs10" in t:
        return "PSA10"
    if "bgs" in t:
        return "BGS"
    if "sar" in t:
        return "SAR"
    if "ar" in t and not any(x in t for x in ["psa","bgs","cgc","ars","9."]):
        return "AR"
    return None

def should_include(title):
    t = title.lower()
    whitelist = ["ポケモン", "AR", "SAR", "PSA", "BGS", "宝石包", "ジェムパック", "中国", "CBB"]
    blacklist = ["メガ", "セット", "まとめ売り", "引退品", "GX", "VMAX", "Vstar", "ジャンク", "バラ売り", "プレイ用"]
    if not any(w.lower() in t for w in whitelist):
        return False
    if any(w.lower() in t for w in blacklist):
        return False
    return True

async def get_item_detail(browser, url):
    """快速获取商品详情"""
    try:
        page = await browser.new_page()
        await page.goto(url, timeout=8000)
        await page.wait_for_timeout(1000)
        text = await page.inner_text('body')
        
        is_sold = "売り切れ" in text
        
        # 提取时间
        time_match = re.search(r'(\d+[時間日时分])', text)
        created = time_match.group(1) + "前" if time_match else "近日"
        
        await page.close()
        return is_sold, created
    except:
        await page.close()
        return False, "近日"

async def search_keyword(kw, max_items=15):
    """搜索关键词"""
    results = []
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        
        try:
            page = await browser.new_page()
            url = f"https://jp.mercari.com/search?keyword={kw.replace(' ','+')}&status=on_sale"
            await page.goto(url, timeout=20000)
            await page.wait_for_timeout(3000)
            
            items = await page.query_selector_all('[data-testid="item-cell"]')
            
            for item in items[:max_items]:
                try:
                    link = await item.query_selector('a[href^="/item/"]')
                    if not link:
                        continue
                    href = await link.get_attribute('href')
                    item_url = f"https://jp.mercari.com{href}" if href else ""
                    
                    text = await item.inner_text()
                    lines = [l.strip() for l in text.strip().split('\n') if l.strip()]
                    
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
                    
                    ctype = get_type(title)
                    if not ctype:
                        continue
                    if not should_include(title):
                        continue
                    
                    # 获取详情
                    is_sold, created = await get_item_detail(browser, item_url)
                    
                    results.append({
                        "title": title,
                        "price_jpy": price,
                        "status": "売り切れ" if is_sold else "販売中",
                        "created": created,
                        "url": item_url,
                        "type": ctype,
                        "keyword": kw
                    })
                except:
                    continue
        except Exception as e:
            print(f"  错误: {kw} - {e}")
        
        await browser.close()
    return results

async def main():
    print("="*50)
    print("单卡监控爬虫 - 优化版")
    print("="*50)
    print(f"关键词数: {len(KEYWORDS)}")
    print()
    
    all_results = []
    
    for kw in KEYWORDS:
        items = await search_keyword(kw, max_items=15)
        status_counts = {}
        for i in items:
            s = i['status']
            status_counts[s] = status_counts.get(s, 0) + 1
        on_sale = status_counts.get('販売中', 0)
        sold = status_counts.get('売り切れ', 0)
        print(f"{kw}: {len(items)}条 (在售:{on_sale}, 售出:{sold})")
        all_results.extend(items)
    
    if all_results:
        df = pd.DataFrame(all_results)
        df = df.drop_duplicates(subset=['title'], keep='first')
        
        on_sale = len(df[df['status'] == '販売中'])
        sold = len(df[df['status'] == '売り切れ'])
        
        print(f"\n=== 统计 ===")
        print(f"总计: {len(df)}")
        print(f"販売中: {on_sale}")
        print(f"売り切れ: {sold}")
        print(f"类型: {df['type'].value_counts().to_dict()}")
        
        output = f"/Users/hm/Desktop/销售总监報告/单卡监控_{datetime.now().strftime('%Y-%m-%d')}.json"
        df.to_json(output, orient='records', force_ascii=False, indent=2)
        print(f"\n已保存: {output}")
        
        # 显示时间分布
        print(f"\n上架时间分布:")
        print(df['created'].value_counts().head(10))

if __name__ == "__main__":
    asyncio.run(main())
