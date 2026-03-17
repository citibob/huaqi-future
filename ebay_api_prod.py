#!/usr/bin/env python3
"""
eBay API - Production环境测试
"""
import requests
import json
import os
from datetime import datetime

# Production API配置
EBAY_API_KEYS = {
    'app_id': 'YOUR_EBAY_PRD_CLIENT_ID',
    'dev_id': 'c57e012f-6ad6-40c1-abb2-98fa5c2480e2',
    'cert_id': 'YOUR_EBAY_PRD_CLIENT_SECRET',
}

EBAY_FINDING_API = 'https://svcs.ebay.com/services/search/FindingService/v1'

TEST_CASES = [
    {"name": "Pokemon卡基础", "keywords": "pokemon card"},
    {"name": "Charizard", "keywords": "charizard pokemon"},
    {"name": "Pikachu", "keywords": "pikachu pokemon"},
    {"name": "Gengar", "keywords": "gengar pokemon"},
    {"name": "Mewtwo", "keywords": "mewtwo pokemon"},
    {"name": "PSA10", "keywords": "pokemon PSA 10"},
    {"name": "日版", "keywords": "pokemon japanese"},
    {"name": "闪卡", "keywords": "pokemon holographic"},
    {"name": "Charizard VMAX", "keywords": "charizard vmax"},
    {"name": "Mewtwo EX", "keywords": "mewtwo ex"},
    {"name": "梦幻", "keywords": "mew pokemon"},
    {"name": "龙系", "keywords": "dragonite pokemon"},
]

def search_items(keywords, limit=20):
    url = EBAY_FINDING_API
    params = {
        'OPERATION-NAME': 'findItemsByKeywords',
        'SERVICE-VERSION': '1.13.0',
        'SECURITY-APPNAME': EBAY_API_KEYS['app_id'],
        'RESPONSE-DATA-FORMAT': 'JSON',
        'REST-PAYLOAD': 'true',
        'keywords': keywords,
        'siteid': '77',
        'paginationInput.entriesPerPage': str(limit),
    }
    
    try:
        response = requests.get(url, params=params, timeout=15)
        
        if response.status_code != 200:
            return [], 0, response.text[:200]
        
        data = response.json()
        
        items = []
        total = 0
        
        if 'findItemsByKeywordsResponse' in data:
            resp = data['findItemsByKeywordsResponse'][0]
            pagination = resp.get('paginationOutput', [{}])[0] if resp.get('paginationOutput') else {}
            total = int(pagination.get('totalEntries', ['0'])[0])
            
            searchresult = resp.get('searchResult', [])
            if searchresult:
                for item in searchresult[0].get('item', []):
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
        
        return items, total, None
        
    except Exception as e:
        return [], 0, str(e)

def main():
    print("=" * 60)
    print("🔍 eBay API - Production环境测试")
    print("=" * 60)
    
    all_items = []
    test_results = []
    
    for i, test in enumerate(TEST_CASES):
        print(f"\n[{i+1}/{len(TEST_CASES)}] {test['name']}: {test['keywords']}")
        
        items, total, error = search_items(test['keywords'])
        
        result = {
            'name': test['name'],
            'keywords': test['keywords'],
            'found': len(items),
            'total': total,
            'success': len(items) > 0
        }
        test_results.append(result)
        
        if error:
            print(f"   ❌ 错误: {error}")
        elif items:
            print(f"   ✅ 找到 {len(items)} 个 (总计 {total} 个)")
            print(f"   最低: ${min(i['price'] for i in items)}")
            all_items.extend(items)
        else:
            print(f"   ❌ 没有找到")
    
    # 统计
    success_count = sum(1 for r in test_results if r['success'])
    print("\n" + "=" * 60)
    print("📊 测试结果")
    print("=" * 60)
    print(f"总测试数: {len(TEST_CASES)}")
    print(f"成功: {success_count}")
    print(f"成功率: {success_count/len(TEST_CASES)*100:.1f}%")
    print(f"总商品数: {len(all_items)}")
    
    # 保存
    output_dir = "/Users/hm/Desktop/销售总监報告"
    os.makedirs(output_dir, exist_ok=True)
    timestamp = datetime.now().strftime("%Y-%m-%d_%H%M%S")
    
    test_file = os.path.join(output_dir, f"ebay_prod_test_{timestamp}.json")
    with open(test_file, 'w', encoding='utf-8') as f:
        json.dump({'test_results': test_results, 'summary': {'total': len(TEST_CASES), 'success': success_count, 'items': len(all_items)}}, f, ensure_ascii=False, indent=2)
    
    items_file = os.path.join(output_dir, f"ebay_prod_items_{timestamp}.json")
    with open(items_file, 'w', encoding='utf-8') as f:
        json.dump(all_items, f, ensure_ascii=False, indent=2)
    
    print(f"\n💾 结果: {test_file}")
    
    # 显示商品
    if all_items:
        print("\n📋 商品列表 (价格排序):")
        sorted_items = sorted(all_items, key=lambda x: x['price'], reverse=True)
        for item in sorted_items[:15]:
            print(f"   ${item['price']:,.0f} - {item['title'][:50]}...")
    
    print("\n✅ 完成!")

if __name__ == "__main__":
    main()
