#!/usr/bin/env python3
"""
eBay API - Production环境完整版
包含OAuth token刷新机制
"""
import requests
import time
import os
from datetime import datetime, timedelta
import json

# Production API配置
EBAY_API_KEYS = {
    'client_id': 'YOUR_EBAY_PRD_CLIENT_ID',
    'client_secret': 'YOUR_EBAY_PRD_CLIENT_SECRET',
    'dev_id': 'c57e012f-6ad6-40c1-abb2-98fa5c2480e2',
}

# Token缓存文件
TOKEN_FILE = "/Users/hm/.openclaw/ebay_token.json"

# Browse API endpoint
BROWSE_API = "https://api.ebay.com/buy/browse/v1"

class EbayAPI:
    def __init__(self, keys):
        self.keys = keys
        self.token = None
        self.token_expires = None
        self.load_token()
    
    def load_token(self):
        """加载缓存的token"""
        if os.path.exists(TOKEN_FILE):
            try:
                with open(TOKEN_FILE, 'r') as f:
                    data = json.load(f)
                    self.token = data.get('access_token')
                    self.token_expires = datetime.fromisoformat(data.get('expires', '2000-01-01'))
                    print(f"📂 加载缓存token，过期时间: {self.token_expires}")
            except:
                pass
    
    def save_token(self, token, expires_in):
        """保存token"""
        self.token = token
        self.token_expires = datetime.now() + timedelta(seconds=expires_in)
        
        with open(TOKEN_FILE, 'w') as f:
            json.dump({
                'access_token': token,
                'expires': self.token_expires.isoformat()
            }, f)
        print(f"💾 保存token，过期时间: {self.token_expires}")
    
    def get_token(self):
        """获取OAuth token"""
        # 检查token是否有效
        if self.token and self.token_expires and datetime.now() < self.token_expires - timedelta(minutes=5):
            print("✅ Token有效，复用缓存")
            return self.token
        
        # 申请新token
        print("🔑 申请新OAuth token...")
        
        url = "https://api.ebay.com/identity/v1/oauth2/token"
        
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        
        data = {
            'grant_type': 'client_credentials',
            'scope': 'https://api.ebay.com/oauth/api_scope'
        }
        
        auth = (self.keys['client_id'], self.keys['client_secret'])
        
        try:
            response = requests.post(url, headers=headers, data=data, auth=auth, timeout=30)
            
            if response.status_code == 200:
                token_data = response.json()
                self.save_token(token_data['access_token'], token_data['expires_in'])
                return self.token
            else:
                print(f"❌ Token申请失败: {response.status_code}")
                print(f"   {response.text[:200]}")
                return None
                
        except Exception as e:
            print(f"❌ Token申请异常: {e}")
            return None
    
    def search(self, q, limit=20):
        """搜索商品"""
        token = self.get_token()
        if not token:
            return [], "Token获取失败"
        
        url = f"{BROWSE_API}/item_summary/search"
        
        params = {
            'q': q,
            'limit': min(limit, 200)
        }
        
        headers = {
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json'
        }
        
        try:
            response = requests.get(url, params=params, headers=headers, timeout=15)
            
            if response.status_code == 200:
                data = response.json()
                items = data.get('itemSummaries', [])
                
                results = []
                for item in items:
                    results.append({
                        'title': item.get('title', ''),
                        'price': item.get('price', {}).get('value', '0'),
                        'currency': item.get('price', {}).get('currency', 'USD'),
                        'url': item.get('itemWebUrl', ''),
                        'condition': item.get('condition', ''),
                        'image': item.get('image', {}).get('imageUrl', '')
                    })
                
                return results, None
                
            elif response.status_code == 429:
                return [], "Rate Limited"
            else:
                return [], f"Error {response.status_code}: {response.text[:100]}"
                
        except Exception as e:
            return [], str(e)

def main():
    print("=" * 60)
    print("🔍 eBay API - Production + OAuth")
    print("=" * 60)
    
    api = EbayAPI(EBAY_API_KEYS)
    
    # 测试搜索
    test_queries = [
        "pokemon card",
        "pokemon charizard",
        "gem pack",
    ]
    
    for q in test_queries:
        print(f"\n📊 搜索: {q}")
        
        items, error = api.search(q, limit=10)
        
        if error:
            print(f"   ❌ 错误: {error}")
        else:
            print(f"   ✅ 找到 {len(items)} 个商品")
            if items:
                print(f"   最低价: {items[0]['price']} {items[0]['currency']}")
        
        time.sleep(2)
    
    print("\n✅ 测试完成!")

if __name__ == "__main__":
    main()
