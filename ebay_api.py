#!/usr/bin/env python3
"""
eBay API 接入 - 宝可梦卡牌价格搜索
用于Mercari→eBay套利监控
"""
import requests
import json
import os
from datetime import datetime

# Sandbox API配置
EBAY_API_KEYS = {
    'app_id': 'YOUR_EBAY_SBX_CLIENT_ID',
    'dev_id': 'c57e012f-6ad6-40c1-abb2-98fa5c2480e2',
    'cert_id': 'YOUR_EBAY_SBX_CLIENT_SECRET',
}

# eBay Finding API - Sandbox
EBAY_FINDING_API = 'https://svcs.sandbox.ebay.com/services/search/FindingService/v1'

# 搜索关键词
SEARCH_KEYWORDS = [
    "pokemon card",
    "pokemon charizard",
    "pokemon pikachu",
    "pokemon mew",
    "pokemon card graded",
]

def search_items(keywords, site_id='77', limit=20):
    """搜索商品"""
    url = EBAY_FINDING_API
    
    params = {
        'OPERATION-NAME': 'findItemsByKeywords',
        'SERVICE-VERSION': '1.13.0',
        'SECURITY-APPNAME': EBAY_API_KEYS['app_id'],
        'RESPONSE-DATA-FORMAT': 'JSON',
        'REST-PAYLOAD': 'true',
        'keywords': keywords,
        'siteid': site_id,
        'paginationInput.entriesPerPage': str(limit),
    }
    
    try:
        response = requests.get(url, params=params, timeout=15)
        
        if response.status_code != 200:
            return []
        
        data = response.json()
        
        items = []
        if 'findItemsByKeywordsResponse' in data:
            searchresult = data['findItemsByKeywordsResponse'][0].get('searchResult', [])
            if searchresult:
                item_list = searchresult[0].get('item', [])
                
                for item in item_list:
                    try:
                        title = item.get('title', [''])[0]
                        price_data = item.get('sellingStatus', [{}])[0].get('currentPrice', [{}])[0]
                        price = float(price_data.get('__value__', '0'))
                        currency = price_data.get('@currencyId', 'USD')
                        item_url = item.get('viewItemURL', [''])[0]
                        
                        items.append({
                            'title': title,
                            'price': price,
                            'currency': currency,
                            'url': item_url,
                            'keywords': keywords
                        })
                    except:
                        continue
        
        return items
        
    except Exception as e:
        print(f"Error: {e}")
        return []

def main():
    print("=" * 50)
    print("🔍 eBay API - 宝可梦卡牌价格搜索")
    print("=" * 50)
    
    all_items = []
    
    # 搜索所有关键词
    for keyword in SEARCH_KEYWORDS:
        print(f"\n📊 搜索: {keyword}")
        
        items = search_items(keyword, limit=15)
        
        if items:
            print(f"   找到 {len(items)} 个商品")
            all_items.extend(items)
        else:
            print(f"   没有找到")
    
    # 去重
    seen = set()
    unique_items = []
    for item in all_items:
        if item['title'] not in seen:
            seen.add(item['title'])
            unique_items.append(item)
    
    all_items = unique_items
    
    # 保存结果
    output_dir = "/Users/hm/Desktop/销售总监報告"
    os.makedirs(output_dir, exist_ok=True)
    
    timestamp = datetime.now().strftime("%Y-%m-%d")
    output_file = os.path.join(output_dir, f"ebay_api_prices_{timestamp}.json")
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(all_items, f, ensure_ascii=False, indent=2)
    
    print(f"\n💾 保存 {len(all_items)} 条数据到 {output_file}")
    
    # 显示结果
    print("\n📋 搜索结果:")
    for item in all_items[:15]:
        print(f"   ${item['price']} - {item['title'][:50]}...")
    
    print("\n✅ 完成!")

if __name__ == "__main__":
    main()
