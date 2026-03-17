#!/usr/bin/env python3
"""单卡监控 - mercapi版"""
import asyncio
import mercapi
from mercapi import Mercapi
import pandas as pd

# 扩展关键词
SINGLE_CARD_KEYWORDS = [
    # SV3a 宝石包
    "0307 イーブイ AR", "0709 エーフィ AR", "0115 ブラッキー AR", "0615 リーフィア AR", "0915 グレイシア AR", "0616 ニンフィア AR",
    "0307 イーブイ SAR", "0709 エーフィ SAR", "0115 ブラッキー SAR", "0615 リーフィア SAR", "0915 グレイシア SAR", "0616 ニンフィア SAR",
    "SV3a 0307", "SV3a 0709", "SV3a 0115", "SV3a 0615", "SV3a 0915", "SV3a 0616",
    # SV4a
    "0406 リザードン AR", "0407 カメックス AR", "0403 フシギダネ AR", "0410 ゲンガー AR",
    "SV4a 0406", "SV4a 0407", "SV4a 0403", "SV4a 0410",
    # SV5a
    "0809 ルギア AR", "0814 レックウザ AR", "0813 サーナイト AR",
    "SV5a 0809", "SV5a 0814", "SV5a 0813",
    # SV6a
    "0901 ミュウツー AR", "0902 ミュウ AR", "0903 ピカチュウ AR",
    "SV6a 0901", "SV6a 0902", "SV6a 0903",
    # SV12a
    "1226 オーガポン",
    "SV12a 1226",
    # 宝石包通用
    "宝石包 AR", "宝石包 SAR", "ジェムパック AR", "ジェムパック SAR",
    "宝石包 ポケモン", "ジェムパック ポケモン",
]

def detect_type(title):
    t = title.lower()
    if "psa10" in t or "bgs10" in t:
        return "PSA10"
    if "bgs" in t:
        return "BGS10"
    if "sar" in t:
        return "SAR"
    if "ar" in t and not any(x in t for x in ["psa","bgs","cgc","ars","9."]):
        return "AR"
    return None

def should_include(title):
    t = title.lower()
    whitelist = ["ポケモン", "AR", "SAR", "PSA", "BGS", "宝石包", "ジェムパック", "中国"]
    blacklist = ["メガ", "セット", "まとめ売り", "引退品", "GX", "VMAX", "Vstar", "ジャンク"]
    if not any(w.lower() in t for w in whitelist):
        return False
    if any(w.lower() in t for w in blacklist):
        return False
    return True

async def search_cards(keywords):
    all_items = []
    m = Mercapi()
    
    for kw in keywords:
        print(f"搜索: {kw}")
        try:
            results = await m.search(kw)
            for item in results.items:
                if not should_include(item.name):
                    continue
                ctype = detect_type(item.name)
                if not ctype:
                    continue
                    
                created = item.created
                if created:
                    from datetime import datetime, timedelta
                    try:
                        # 处理datetime对象
                        if hasattr(created, 'year'):
                            created_jp = created
                        else:
                            created_dt = datetime.strptime(str(created), '%Y-%m-%d %H:%M:%S')
                            # 转换为日本时间 (UTC+9)
                            created_jp = created_dt + timedelta(hours=9)
                        # 返回具体日期格式
                        created_str = created_jp.strftime("%Y-%m-%d %H:%M")
                    except:
                        created_str = "近日"
                else:
                    created_str = "近日"
                
                all_items.append({
                    "title": item.name,
                    "price_jpy": item.price,
                    "status": "販売中" if item.status == "ITEM_STATUS_ON_SALE" else "売り切れ",
                    "url": f"https://jp.mercari.com/item/{item.id_}" if item.id_ else "",
                    "thumbnail": item.thumbnails[0] if item.thumbnails else "",
                    "created": created_str,
                    "keyword": kw,
                    "type": ctype
                })
            print(f"  获取: {len(results.items)} 个")
        except Exception as e:
            print(f"  错误: {e}")
    
    return all_items

async def main():
    print("="*50)
    print("单卡监控 - mercapi版 (扩展关键词)")
    print("="*50)
    
    items = await search_cards(SINGLE_CARD_KEYWORDS)
    df = pd.DataFrame(items)
    
    # 统计
    print(f"\n=== 统计 ===")
    print(f"总计: {len(df)} 个商品")
    print(f"\n按类型:")
    print(df['type'].value_counts())
    print(f"\n按状态:")
    print(df['status'].value_counts())
    
    # 保存
    output = "/Users/hm/Desktop/销售总监報告/单卡监控_2026-03-15.json"
    df.to_json(output, orient='records', force_ascii=False, indent=2)
    print(f"\n已保存: {output}")

asyncio.run(main())
