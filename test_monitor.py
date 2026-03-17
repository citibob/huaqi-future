#!/usr/bin/env python3
"""
单卡监控 - 恢复3-11搜索方式
用卡号搜索 + 区分售罄/在售
"""
import json
import os
import time
from itertools import islice
from datetime import datetime

import mercari
from mercari import MercariSearchStatus, MercariSort

# 搜索关键词 - 宝石包+CBB搜索
CARD_KEYWORDS = [
    # 伊布系列
    {"id": "eevee", "name": "イーブイ", "keywords": ["イーブイ AR", "宝石包", "CBB2", "ジェムパック"]},
    {"id": "espeon", "name": "エーフィ", "keywords": ["エーフィ AR", "宝石包", "CBB2"]},
    {"id": "umbreon", "name": "ブラッキー", "keywords": ["ブラッキー AR", "宝石包", "CBB2", "ジェムパック"]},
    {"id": "leafeon", "name": "リーフィア", "keywords": ["リーフィア AR", "宝石包", "CBB2"]},
    {"id": "glaceon", "name": "グレイシア", "keywords": ["グレイシア AR", "宝石包", "CBB2"]},
    {"id": "sylveon", "name": "ニンフィア", "keywords": ["ニンフィア AR", "宝石包", "CBB2"]},
    # 热门卡
    {"id": "gengar", "name": "ゲンガー", "keywords": ["ゲンガー AR", "宝石包", "CBB3", "ジェムパック"]},
    {"id": "charizard", "name": "リザードン", "keywords": ["リザードン AR", "宝石包", "CBB1", "ジェムパック"]},
    {"id": "blastoise", "name": "カメックス", "keywords": ["カメックス AR", "宝石包", "CBB1"]},
    {"id": "venusaur", "name": "フシギダネ", "keywords": ["フシギダネ AR", "宝石包", "CBB1"]},
    {"id": "lugia", "name": "ルギア", "keywords": ["ルギア AR", "宝石包"]},
    {"id": "rayquaza", "name": "レックウザ", "keywords": ["レックウザ AR", "宝石包", "CBB4"]},
    {"id": "gardevoir", "name": "サーナイト", "keywords": ["サーナイト AR", "宝石包"]},
    {"id": "mewtwo", "name": "ミュウツー", "keywords": ["ミュウツー AR", "宝石包"]},
    {"id": "mew", "name": "ミュウ", "keywords": ["ミュウ AR", "宝石包"]},
    {"id": "pikachu", "name": "皮卡丘", "keywords": ["ピカチュウ AR", "宝石包", "CBB1"]},
    {"id": "ogerpon", "name": "オーガポン", "keywords": ["オーガポン SAR", "宝石包", "CBB4"]},
]

# 过滤：必须包含宝可梦相关关键词
MUST_HAVE = ["ポケモン", "ポケカ", "PSA", "AR", "SAR", "宝石", "ジェム", "CBB", "中国", "語版"]

# 排除关键词
EXCLUDE = ["まとめ売り", "引退", "セット", "G X", "VMAX", "TAG"]

def should_include(title):
    """过滤非宝可梦商品"""
    title_lower = title.lower()
    
    # 必须包含
    if not any(k in title_lower for k in MUST_HAVE):
        return False
    
    # 排除
    if any(k.lower() in title_lower for k in EXCLUDE):
        return False
    
    return True

def search_card(keyword):
    """搜索单个卡牌"""
    results = []
    jp_name = keyword["name"]
    keywords_list = keyword["keywords"]
    
    # 在售 + 售罄
    for status in [MercariSearchStatus.ON_SALE, MercariSearchStatus.SOLD_OUT]:
        for kw in keywords_list:
            try:
                items = list(islice(
                    mercari.search(kw, status=status, sort=MercariSort.SORT_CREATED_TIME),
                    30,
                ))
                for item in items:
                    title = item.productName
                    if should_include(title):
                        results.append({
                            "title": title,
                            "price_jpy": int(item.price) if item.price else 0,
                            "status": "売り切れ" if status == MercariSearchStatus.SOLD_OUT else "販売中",
                            "created": item.created,
                            "image_url": getattr(item, "imageURL", ""),
                            "url": item.productURL,
                            "section": jp_name
                        })
                time.sleep(0.3)
            except Exception as e:
                print(f"  ⚠️ {kw}: {e}")
    
    return results

def main():
    print("=" * 50)
    print("🔍 单卡监控 (卡号搜索版)")
    print("=" * 50)
    
    all_results = []
    
    for i, kw in enumerate(CARD_KEYWORDS):
        print(f"[{i+1}/{len(CARD_KEYWORDS)}] {kw['name']}...")
        items = search_card(kw)
        print(f"   {len(items)} 件")
        all_results.extend(items)
    
    # 去重
    seen = set()
    unique = []
    for item in all_results:
        if item["url"] not in seen:
            seen.add(item["url"])
            unique.append(item)
    
    # 统计
    on_sale = sum(1 for i in unique if i["status"] == "販売中")
    sold = sum(1 for i in unique if i["status"] == "売り切れ")
    
    print(f"\n📊 总计: {len(unique)} 件 (在售: {on_sale}, 售罄: {sold})")
    
    # 保存
    timestamp = datetime.now().strftime("%Y-%m-%d")
    output = f"/Users/hm/Desktop/销售总监報告/single_card_{timestamp}.json"
    os.makedirs(os.path.dirname(output), exist_ok=True)
    
    with open(output, "w", encoding="utf-8") as f:
        json.dump({"results": unique}, f, ensure_ascii=False, indent=2)
    
    print(f"💾 保存到: {output}")
    print("✅ 完成!")

if __name__ == "__main__":
    main()
