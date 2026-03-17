#!/usr/bin/env python3
"""
单卡监控 - 并发优化版
使用asyncio并发搜索，大幅减少执行时间
"""
import asyncio
import json
import time
from datetime import datetime
from mercapi import Mercapi
import pandas as pd
from collections import Counter

# 优化后的关键词列表（精简有效）
KEYWORDS = [
    # 宝石包系列
    "宝石包 ポケモン", "ジェムパック ポケモン",
    "宝石包 vol.1", "宝石包 vol.2", "宝石包 vol.3", "宝石包 vol.4",
    "CBB1C", "CBB2C", "CBB3C", "CBB4C",
    # SV系列
    "SV3a 0307", "SV3a 0709", "SV3a 0115", "SV3a 0615", "SV3a 0915",
    "SV4a 0406", "SV4a 0407", "SV4a 0410",
    "SV5a 0809", "SV5a 0814",
    "SV6a 0901", "SV6a 0902", "SV6a 0903",
    # 评级卡
    "PSA10 ポケモン", "BGS10 ポケモン", "SAR ポケモン",
    # 中国限定
    "中国語版 ポケモン", "中国限定 ポケモン",
    # 热门卡
    "イーブイ SAR", "リザードン SAR", "ミュウツー SAR",
    "ゲンガー AR", "ニンフィア AR", "リーフィア AR",
]

# 过滤规则
MUST_CONTAIN = ["ポケモン", "AR", "SAR", "PSA", "BGS", "宝石包", "ジェムパック", "中国"]
BLACKLIST = ["メガ", "セット", "まとめ売り", "引退品", "GX", "VMAX", "Vstar", "ジャンク", "訳あり"]

def normalize(title):
    return title.replace(" ", "").replace("　", "").replace("-", "").lower()

def should_include(title):
    t = title.lower()
    n = normalize(title)
    
    # 白名单
    if not any(k.lower() in t or k.lower() in n for k in MUST_CONTAIN):
        return False
    
    # 黑名单
    for w in BLACKLIST:
        if w.lower() in t:
            return False
    
    return True

def detect_type(title):
    t = normalize(title)
    if "psa10" in t or "bgs10" in t:
        return "PSA10"
    if "bgs" in t:
        return "BGS10"
    if "sar" in t:
        return "SAR"
    if "ar" in t and not any(x in t for x in ["psa", "bgs", "ars"]):
        return "AR"
    return None

async def search_keyword(m, kw):
    """搜索单个关键词"""
    try:
        results = await m.search(kw)
        items = []
        for item in results.items:
            if should_include(item.name):
                created_str = item.created.strftime('%Y-%m-%d %H:%M') if item.created else ''
                items.append({
                    'title': item.name,
                    'price_jpy': item.price,
                    'status': '販売中' if item.status == 'ITEM_STATUS_ON_SALE' else '売り切れ',
                    'keyword': kw,
                    'created': created_str,
                    'type': detect_type(item.name)
                })
        return kw, items
    except Exception as e:
        return kw, []

async def main():
    print("="*50)
    print("单卡监控 - 并发优化版")
    print("="*50)
    
    start_time = time.time()
    
    # 并发搜索
    m = Mercapi()
    tasks = [search_keyword(m, kw) for kw in KEYWORDS]
    results = await asyncio.gather(*tasks)
    
    # 收集所有商品
    all_items = []
    for kw, items in results:
        all_items.extend(items)
        print(f"搜索 [{kw}]: {len(items)} 个")
    
    elapsed = time.time() - start_time
    print(f"\n搜索完成: {len(all_items)} 个商品, 耗时: {elapsed:.1f}秒")
    
    # 过滤并去重
    target_types = ['PSA10', 'BGS10', 'AR', 'SAR']
    filtered = [i for i in all_items if i['type'] in target_types]
    
    seen = set()
    unique = []
    for item in filtered:
        if item['title'] not in seen:
            seen.add(item['title'])
            unique.append(item)
    
    print(f"过滤后: {len(unique)} 个商品")
    
    # 统计
    types = Counter(i['type'] for i in unique)
    print(f"类型分布: {dict(types)}")
    
    # 保存
    output = f"/Users/hm/Desktop/销售总监報告/单卡监控_{datetime.now().strftime('%Y-%m-%d')}.json"
    with open(output, 'w', encoding='utf-8') as f:
        json.dump(unique, f, ensure_ascii=False, indent=2)
    print(f"\n已保存: {output}")
    print(f"总耗时: {time.time() - start_time:.1f}秒")

if __name__ == "__main__":
    asyncio.run(main())
