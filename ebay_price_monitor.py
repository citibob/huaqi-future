#!/usr/bin/env python3
"""
eBay价格监控 - Playwright浏览器自动化
"""
import asyncio
import json
import os
import re
from datetime import datetime
from playwright.async_api import async_playwright

OUTPUT_DIR = "/Users/hm/Desktop/销售总监報告"
CARD_LIST = ["Charizard", "Gengar", "Pikachu", "Mewtwo", "Blastoise"]

async def search_ebay(page, card_name):
    """搜索eBay商品"""
    query = f"pokemon {card_name} card graded"
    url = f"https://www.ebay.com/sch/i.html?_nkw={query.replace(' ', '+')}&_ipg=50&Graded=Yes"
    
    print(f"   {card_name}...", end=" ")
    await page.goto(url, wait_until='domcontentloaded')
    await asyncio.sleep(5)
    
    items = []
    listings = await page.query_selector_all('.s-item')
    
    for item in listings[:15]:
        try:
            title_elem = await item.query_selector('.s-item__title')
            if not title_elem:
                continue
            title = await title_elem.inner_text()
            title = title.strip()
            
            if not title or 'shop on ebay' in title.lower() or len(title) < 5:
                continue
            
            price_elem = await item.query_selector('.s-item__price')
            if not price_elem:
                continue
            price_text = await price_elem.inner_text()
            
            price_match = re.search(r'\$?([\d,]+\.?\d*)', price_text)
            if not price_match:
                continue
            price = float(price_match.group(1).replace(',', ''))
            
            if price > 0:
                items.append({
                    'name': title[:150],
                    'price': price,
                    'card': card_name,
                })
        except:
            continue
    
    print(f"{len(items)} items")
    return items

async def get_sold(page, card_name):
    """历史成交"""
    query = f"pokemon {card_name} card graded"
    url = f"https://www.ebay.com/sch/i.html?_nkw={query.replace(' ', '+')}&_ipg=50&Graded=Yes&LH_Sold=1"
    
    await page.goto(url, wait_until='domcontentloaded')
    await asyncio.sleep(5)
    
    items = []
    listings = await page.query_selector_all('.s-item')
    
    for item in listings[:15]:
        try:
            title_elem = await item.query_selector('.s-item__title')
            if not title_elem:
                continue
            title = await title_elem.inner_text()
            title = title.strip()
            
            if not title or 'shop on ebay' in title.lower() or len(title) < 5:
                continue
            
            price_elem = await item.query_selector('.s-item__price')
            if not price_elem:
                continue
            price_text = await price_elem.inner_text()
            
            price_match = re.search(r'\$?([\d,]+\.?\d*)', price_text)
            if not price_match:
                continue
            price = float(price_match.group(1).replace(',', ''))
            
            if price > 0:
                items.append({
                    'name': title[:150],
                    'price': price,
                    'card': card_name,
                    'sold': True
                })
        except:
            continue
    
    return items

async def main():
    print("=" * 50)
    print("🔍 eBay价格监控")
    print("=" * 50)
    
    all_prices = []
    
    async with async_playwright() as p:
        # 使用非headless
        browser = await p.chromium.launch(headless=False, args=['--disable-blink-features=AutomationControlled'])
        context = await browser.new_context(
            viewport={'width': 1280, 'height': 800},
            user_agent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        )
        page = await context.new_page()
        
        # 注入脚本绕过检测
        await page.add_init_script("""
            Object.defineProperty(navigator, 'webdriver', {get: () => undefined});
        """)
        
        for card in CARD_LIST:
            items = await search_ebay(page, card)
            all_prices.extend(items)
            
            sold = await get_sold(page, card)
            all_prices.extend(sold)
            
            await asyncio.sleep(2)
        
        await browser.close()
    
    timestamp = datetime.now().strftime("%Y-%m-%d")
    output_file = os.path.join(OUTPUT_DIR, f"ebay_prices_{timestamp}.json")
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(all_prices, f, ensure_ascii=False, indent=2)
    
    print(f"\n💾 Saved {len(all_prices)} prices")
    
    if all_prices:
        cards = {}
        for item in all_prices:
            c = item['card']
            if c not in cards:
                cards[c] = []
            cards[c].append(item['price'])
        
        print("\n📊 Summary:")
        for c, prices in cards.items():
            print(f"   {c}: ${min(prices):.0f} - ${max(prices):.0f}")
    
    print("\n✅ Done!")

if __name__ == "__main__":
    asyncio.run(main())
