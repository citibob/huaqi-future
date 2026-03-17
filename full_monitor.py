#!/usr/bin/env python3
"""
全量监控系统 v7 - 保量增质版
单卡：保留现有关键词 + 本地过滤
盒子：必须包含 box/密封/シュリンク
"""
import json
import os
import re
import time
from itertools import islice
from datetime import datetime

import mercari
from mercari import MercariSearchStatus, MercariSort

# ============================================================
# 搜索关键词
# ============================================================

SINGLE_CARD_KEYWORDS = [
    {"id": "eevee", "jp": "イーブイ"},
    {"id": "espeon", "jp": "エーフィ"},
    {"id": "umbreon", "jp": "ブラッキー"},
    {"id": "leafeon", "jp": "リーフィア"},
    {"id": "glaceon", "jp": "グレイシア"},
    {"id": "sylveon", "jp": "ニンフィア"},
    {"id": "gengar", "jp": "ゲンガー"},
    {"id": "charizard", "jp": "リザードン"},
    {"id": "blastoise", "jp": "カメックス"},
    {"id": "venusaur", "jp": "フシギダネ"},
    {"id": "lugia", "jp": "ルギア"},
    {"id": "rayquaza", "jp": "レックウザ"},
    {"id": "gardevoir", "jp": "サーナイト"},
    {"id": "mewtwo", "jp": "ミュウツー"},
    {"id": "mew", "jp": "ミュウ"},
    {"id": "pikachu", "jp": "ピカチュウ"},
    {"id": "ogerpon", "jp": "オーガポン"},
]

# 盒子关键词
BOX_KEYWORDS = [
    {"id": "gem1", "jp": "宝石包", "code": "vol.1"},
    {"id": "gem2", "jp": "宝石包", "code": "vol.2"},
    {"id": "gem3", "jp": "宝石包", "code": "vol.3"},
    {"id": "gem4", "jp": "宝石包", "code": "vol.4"},
    {"id": "gem_pack", "jp": "ジェムパック", "code": ""},
]

# ============================================================
# 过滤规则
# ============================================================

BLACKLIST = re.compile(r'(ex(?!$)|メガ|セット|なし|9\.5|9/5|SSR|SAR|CHR|S12|S11|S10|gg|4枚|3枚|2枚|空き箱|株式会社)', re.IGNORECASE)
GRADED = re.compile(r'(psa\s*10|psa10|bgs\s*10)', re.IGNORECASE)
BOX_OK = re.compile(r'(box|密封|シュリンク|新品|未开封|1box)', re.IGNORECASE)
BOX_BAD = re.compile(r'(パック|單|空|不良|傷)', re.IGNORECASE)

def classify(title, is_box=False):
    title_lower = title.lower()
    
    if is_box:
        if not BOX_OK.search(title):
            return None, '无box/密封标识'
        if BOX_BAD.search(title):
            return None, '盒子黑名单'
        return 'box', '密封盒'
    
    if BLACKLIST.search(title):
        return None, '黑名单'
    if GRADED.search(title):
        return 'graded', 'PSA10'
    return 'raw', '裸卡'

# ============================================================
# 搜索
# ============================================================

def search_keyword(kw_dict, is_box=False):
    jp = kw_dict['jp']
    search_term = f"{jp} AR" if not is_box else f"{jp}"
    
    try:
        results = list(islice(
            mercari.search(
                search_term,
                status=MercariSearchStatus.ON_SALE,
                sort=MercariSort.SORT_CREATED_TIME,
            ),
            30,
        ))
        
        items = []
        for item in results:
            ctype, reason = classify(item.productName, is_box)
            if ctype:
                items.append({
                    'type': ctype,
                    'category': 'box' if is_box else 'single',
                    'card_id': kw_dict['id'],
                    'item_id': item.id,
                    'name': item.productName,
                    'price': int(item.price),
                    'image_url': item.imageURL,
                    'keyword': search_term,
                    'url': item.productURL,
                })
        return items
    except Exception as e:
        print(f"  ⚠️ {jp}: {e}")
        return []

# ============================================================
# 主函数
# ============================================================

def main():
    print("=" * 60)
    print("🔍 全量监控 v7")
    print("=" * 60)
    
    all_items = []
    
    # 单卡
    print("\n📦 单卡...")
    for kw in SINGLE_CARD_KEYWORDS:
        items = search_keyword(kw, is_box=False)
        if items:
            print(f"   {kw['jp']}: {len(items)}")
            all_items.extend(items)
    
    # 盒子
    print("\n📦 盒子...")
    for kw in BOX_KEYWORDS:
        items = search_keyword(kw, is_box=True)
        if items:
            print(f"   {kw['jp']}: {len(items)}")
            all_items.extend(items)
    
    # 去重
    seen = set()
    unique = [i for i in all_items if i['item_id'] not in seen and not seen.add(i['item_id'])]
    
    # 统计
    graded = sum(1 for i in unique if i['type'] == 'graded')
    raw = sum(1 for i in unique if i['type'] == 'raw')
    boxes = sum(1 for i in unique if i['type'] == 'box')
    
    print(f"\n📊 评级卡: {graded}, 裸卡: {raw}, 盒子: {boxes}, 总计: {len(unique)}")
    
    # 保存
    timestamp = datetime.now().strftime("%Y-%m-%d")
    output = os.path.expanduser(f"~/Desktop/销售总监報告/full_monitor_{timestamp}.json")
    os.makedirs(os.path.dirname(output), exist_ok=True)
    
    with open(output, 'w') as f:
        json.dump({'items': unique, 'summary': {'graded': graded, 'raw': raw, 'box': boxes}}, f, ensure_ascii=False, indent=2)
    
    print(f"💾 保存到: {output}")
    print("✅ 完成!")

if __name__ == "__main__":
    main()
