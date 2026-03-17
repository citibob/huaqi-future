#!/usr/bin/env python3
"""
eBay API 扫描脚本 - 001b任务
输出格式对齐Mercari数据
"""
import requests
import json
import os
from datetime import datetime, timedelta

# Production API配置
EBAY_API_KEYS = {
    'client_id': 'YOUR_EBAY_PRD_CLIENT_ID',
    'client_secret': 'YOUR_EBAY_PRD_CLIENT_SECRET',
}

TOKEN_FILE = os.path.expanduser("~/.openclaw/ebay_token.json")
BROWSE_API = "https://api.ebay.com/buy/browse/v1"
OUTPUT_FILE = os.path.expanduser("~/Desktop/销售总监報告/ebay_{date}.json")

class EbayAPI:
    def __init__(self, keys):
        self.keys = keys
        self.token = None
        self.token_expires = None
        self.load_token()
    
    def load_token(self):
        if os.path.exists(TOKEN_FILE):
            try:
                with open(TOKEN_FILE, 'r') as f:
                    data = json.load(f)
                    self.token = data.get('access_token')
                    self.token_expires = datetime.fromisoformat(data.get('expires', '2000-01-01'))
            except:
                pass
    
    def save_token(self, token, expires_in):
        self.token = token
        self.token_expires = datetime.now() + timedelta(seconds=expires_in)
        with open(TOKEN_FILE, 'w') as f:
            json.dump({'access_token': token, 'expires': self.token_expires.isoformat()}, f)
    
    def get_token(self):
        if self.token and self.token_expires and datetime.now() < self.token_expires - timedelta(minutes=5):
            return self.token
        
        url = "https://api.ebay.com/identity/v1/oauth2/token"
        headers = {'Content-Type': 'application/x-www-form-urlencoded'}
        data = {'grant_type': 'client_credentials', 'scope': 'https://api.ebay.com/oauth/api_scope'}
        auth = (self.keys['client_id'], self.keys['client_secret'])
        
        response = requests.post(url, headers=headers, data=data, auth=auth, timeout=30)
        if response.status_code == 200:
            token_data = response.json()
            self.save_token(token_data['access_token'], token_data['expires_in'])
            return self.token
        return None
    
    def search(self, q, limit=50):
        token = self.get_token()
        if not token:
            return []
        
        url = f"{BROWSE_API}/item_summary/search"
        params = {'q': q, 'limit': min(limit, 200)}
        headers = {'Authorization': f'Bearer {token}'}
        
        try:
            response = requests.get(url, params=params, headers=headers, timeout=15)
            if response.status_code == 200:
                data = response.json()
                items = data.get('itemSummaries', [])
                results = []
                for item in items:
                    price = item.get('price', {})
                    item_loc = item.get('itemLocation', {})
                    results.append({
                        'source': 'ebay',
                        'item_id': item.get('itemId', ''),
                        'title': item.get('title', ''),
                        'price': float(price.get('value', '0')),
                        'currency': price.get('currency', 'USD'),
                        'shipping': 0,
                        'condition': item.get('condition', ''),
                        'location': item_loc.get('country', ''),
                        'url': item.get('itemWebUrl', ''),
                        'image': item.get('image', {}).get('imageUrl', ''),
                        'timestamp': datetime.now().isoformat()
                    })
                return results
        except Exception as e:
            print(f"Error: {e}")
        return []

def main():
    print("=" * 50)
    print("🔍 eBay扫描 - 001b任务")
    print("=" * 50)
    
    # 搜索关键词 (宝石包 Vol.1-4)
    keywords = [
        "pokemon gem pack",
        "宝石包 pokemon",
        "CBB1C",
        "CBB2C",
        "CBB3C",
        "CBB4C",
        "pokemon chinese exclusive"
    ]
    
    api = EbayAPI(EBAY_API_KEYS)
    all_items = []
    
    for kw in keywords:
        print(f"搜索: {kw}")
        items = api.search(kw, limit=50)
        print(f"  找到 {len(items)} 个")
        all_items.extend(items)
    
    # 去重
    seen = set()
    unique_items = []
    for item in all_items:
        if item['item_id'] not in seen:
            seen.add(item['item_id'])
            unique_items.append(item)
    
    # 保存
    timestamp = datetime.now().strftime("%Y-%m-%d")
    output_file = OUTPUT_FILE.format(date=timestamp)
    
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(unique_items, f, ensure_ascii=False, indent=2)
    
    print(f"\n💾 保存 {len(unique_items)} 个商品到 {output_file}")
    print("✅ 完成!")

if __name__ == "__main__":
    main()
