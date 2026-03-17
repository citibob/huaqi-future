#!/usr/bin/env python3
"""
Mercari爬虫 - 使用Playwright
功能：搜索商品并提取详细信息
"""
import asyncio
import json
import re
from datetime import datetime
from playwright.async_api import async_playwright

async def search_mercari(keyword, max_items=50):
    """搜索Mercari并返回商品列表"""
    results = []
    
    async with async_playwright() as p:
        # 使用本机Chrome（channel="chrome"）可复用已登录状态
        # headless=False 可视化调试，True 后台运行
        browser = await p.chromium.launch(
            headless=True,
            channel="chrome"  # 关键：使用本机Chrome
        )
        page = await browser.new_page()
        
        await page.set_extra_http_headers({
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        })
        
        keyword_encoded = keyword.replace(" ", "+")
        url = f"https://jp.mercari.com/search?keyword={keyword_encoded}"
        print(f"搜索: {keyword}")
        
        try:
            await page.goto(url, timeout=15000)
            await page.wait_for_timeout(5000)
            
            items = await page.query_selector_all('[data-testid="item-cell"]')
            print(f"找到 {len(items)} 个商品")
            
            for i, item in enumerate(items[:max_items]):
                try:
                    text = await item.inner_text()
                    lines = [l.strip() for l in text.split('\n') if l.strip()]
                    
                    # 找价格（¥后面跟的数字）
                    price_jpy = 0
                    title = ''
                    for j, line in enumerate(lines):
                        if line == '¥' and j+1 < len(lines):
                            try:
                                price_jpy = int(lines[j+1].replace(',', ''))
                            except:
                                pass
                        elif line != '¥' and not line[0].isdigit() and line:
                            title = line
                    
                    # 获取链接
                    link = await item.query_selector('a[href^="/item/"]')
                    href = await link.get_attribute('href') if link else ''
                    item_url = f"https://jp.mercari.com{href}" if href else ''
                    
                    # 检查售罄
                    html = await item.inner_html()
                    status = "売り切れ" if "sold" in html.lower() else "販売中"
                    
                    if title and price_jpy > 0:
                        results.append({
                            "title": title,
                            "price_jpy": price_jpy,
                            "status": status,
                            "url": item_url,
                            "keyword": keyword
                        })
                        
                except Exception as e:
                    continue
            
        except Exception as e:
            print(f"搜索出错: {e}")
        
        await browser.close()
    
    return results

async def main():
    keywords = ["宝石包 vol.1", "宝石包 vol.2", "宝石包 vol.3", "宝石包 vol.4"]
    
    all_results = []
    for kw in keywords:
        print(f"\n{'='*50}")
        items = await search_mercari(kw)
        all_results.extend(items)
        print(f"关键词 '{kw}': 获取 {len(items)} 个商品")
    
    print(f"\n总计: {len(all_results)} 个商品")
    
    # 显示前10个
    print("\n前10个商品:")
    for item in all_results[:10]:
        print(f"  - {item['title'][:45]} | ¥{item['price_jpy']:,} | {item['status']}")
    
    # 保存
    if all_results:
        output_file = f"/Users/hm/Desktop/销售总监報告/mercari_spider_{datetime.now().strftime('%Y-%m-%d')}.json"
        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(all_results, f, ensure_ascii=False, indent=2)
        print(f"\n已保存到: {output_file}")

if __name__ == "__main__":
    asyncio.run(main())
