#!/usr/bin/env python3
"""
eBay API 测试脚本 - 多种测试用例
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

EBAY_FINDING_API = 'https://svcs.sandbox.ebay.com/services/search/FindingService/v1'

# 测试用例
TEST_CASES = [
    # 基础搜索测试
    {"name": "Pokemon卡基础搜索", "keywords": "pokemon card", "site": "77"},
    {"name": "Charizard搜索", "keywords": "charizard pokemon", "site": "77"},
    {"name": "Pikachu搜索", "keywords": "pikachu pokemon", "site": "77"},
    {"name": "Gengar搜索", "keywords": "gengar pokemon", "site": "77"},
    {"name": "Mewtwo搜索", "keywords": "mewtwo pokemon", "site": "77"},
    {"name": "龙卡搜索", "keywords": "dragonite pokemon", "site": "77"},
    {"name": "水系搜索", "keywords": "blastoise pokemon", "site": "77"},
    {"name": "草系搜索", "keywords": "venusaur pokemon", "site": "77"},
    {"name": "梦幻搜索", "keywords": "mew pokemon", "site": "77"},
    {"name": "卡比兽搜索", "keywords": "snorlax pokemon", "site": "77"},
    # 扩展搜索
    {"name": "PSA搜索", "keywords": "pokemon card PSA", "site": "77"},
    {"name": "PSA10搜索", "keywords": "pokemon PSA 10", "site": "77"},
    {"name": "日版搜索", "keywords": "pokemon japanese card", "site": "77"},
    {"name": "美版搜索", "keywords": "pokemon english card", "site": "77"},
    {"name": "闪卡搜索", "keywords": "pokemon holographic", "site": "77"},
    {"name": "宝可梦玩具", "keywords": "pokemon toy", "site": "77"},
    {"name": "宝可梦周边", "keywords": "pokemon merchandise", "site": "77"},
    {"name": "游戏王", "keywords": "yugioh card", "site": "77"},
    {"name": "TCG搜索", "keywords": "trading card game", "site": "77"},
    # 更多卡牌
    {"name": "喷火龙VMAX", "keywords": "charizard vmax", "site": "77"},
    {"name": "超梦EX", "keywords": "mewtwo ex", "site": "77"},
    {"name": "梦幻V", "keywords": "mew v", "site": "77"},
    {"name": "水箭龟", "keywords": "blastoise", "site": "77"},
    {"name": "妙蛙花", "keywords": "venusaur", "site": "77"},
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
            return [], 0
        
        data = response.json()
        
        items = []
        total_count = 0
        
        if 'findItemsByKeywordsResponse' in data:
            resp = data['findItemsByKeywordsResponse'][0]
            
            # 获取总数
            pagination = resp.get('paginationOutput', [{}])[0] if resp.get('paginationOutput') else {}
            total_count = int(pagination.get('totalEntries', ['0'])[0])
            
            searchresult = resp.get('searchResult', [])
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
        
        return items, total_count
        
    except Exception as e:
        print(f"Error: {e}")
        return [], 0

def main():
    print("=" * 60)
    print("🔍 eBay API 大规模测试")
    print("=" * 60)
    
    all_items = []
    test_results = []
    
    # 执行所有测试
    for i, test in enumerate(TEST_CASES):
        print(f"\n[{i+1}/{len(TEST_CASES)}] {test['name']}: {test['keywords']}")
        
        items, total = search_items(test['keywords'], test['site'])
        
        result = {
            'name': test['name'],
            'keywords': test['keywords'],
            'found': len(items),
            'total': total,
            'success': len(items) > 0
        }
        test_results.append(result)
        
        if items:
            print(f"   ✅ 找到 {len(items)} 个 (总计 {total} 个)")
            # 保存商品
            for item in items:
                item['test_name'] = test['name']
            all_items.extend(items)
        else:
            print(f"   ❌ 没有找到")
    
    # 统计
    success_count = sum(1 for r in test_results if r['success'])
    print("\n" + "=" * 60)
    print("📊 测试结果统计")
    print("=" * 60)
    print(f"总测试数: {len(TEST_CASES)}")
    print(f"成功: {success_count}")
    print(f"失败: {len(TEST_CASES) - success_count}")
    print(f"成功率: {success_count/len(TEST_CASES)*100:.1f}%")
    print(f"总商品数: {len(all_items)}")
    
    # 保存结果
    output_dir = "/Users/hm/Desktop/销售总监報告"
    os.makedirs(output_dir, exist_ok=True)
    
    timestamp = datetime.now().strftime("%Y-%m-%d_%H%M%S")
    
    # 保存测试结果
    test_file = os.path.join(output_dir, f"ebay_api_test_{timestamp}.json")
    with open(test_file, 'w', encoding='utf-8') as f:
        json.dump({
            'test_results': test_results,
            'summary': {
                'total_tests': len(TEST_CASES),
                'success': success_count,
                'failed': len(TEST_CASES) - success_count,
                'total_items': len(all_items)
            }
        }, f, ensure_ascii=False, indent=2)
    print(f"\n💾 测试结果: {test_file}")
    
    # 保存商品数据
    items_file = os.path.join(output_dir, f"ebay_api_items_{timestamp}.json")
    with open(items_file, 'w', encoding='utf-8') as f:
        json.dump(all_items, f, ensure_ascii=False, indent=2)
    print(f"💾 商品数据: {items_file}")
    
    # 显示找到的商品
    print("\n📋 找到的商品:")
    for item in all_items[:20]:
        print(f"   ${item['price']} - {item['title'][:50]}...")
    
    print("\n✅ 测试完成!")

if __name__ == "__main__":
    main()
