#!/usr/bin/env python3
"""
单卡监控系统 - mercapi版（宝石包整盒版）
使用mercapi库 + 硬核过滤逻辑
"""
import asyncio
import json
from datetime import datetime
from mercapi import Mercapi
import pandas as pd

# 宝石包关键词（整盒）
GEM_PACK_KEYWORDS = [
    # 标准组合
    "宝石包 vol.1 BOX", "宝石包 vol.2 BOX", "宝石包 vol.3 BOX", "宝石包 vol.4 BOX",
    "宝石包1 BOX", "宝石包2 BOX", "宝石包3 BOX", "宝石包4 BOX",
    # 日语音译
    "ジェムパック BOX", "中国 ポケモンカード BOX", "中国限定 シュリンク",
    # 官方代码
    "CBB1C", "CBB2C", "CBB3C", "CBB4C",
    # 英文
    "Gem Pack BOX", "Gem Pack 1", "Gem Pack 4"
]

# 负向过滤（排除单卡）
NEGATIVE_KEYWORDS = [
    "-シングル", "-単品", "-枚", "-PSA", "-SR", "-SAR", "-UR", 
    "-AR", "-HR", "-CHR", "-CSR", "-プロモ", "-高確", "-サーチ", "-バラ"
]

# 价格区间
PRICE_MIN = 3000
PRICE_MAX = 15000

async def search_gem_pack():
    """搜索宝石包整盒"""
    all_items = []
    m = Mercapi()
    
    for kw in GEM_PACK_KEYWORDS:
        print(f"搜索: {kw}")
        try:
            results = await m.search(kw)
            for item in results.items:
                # 价格过滤
                if item.price < PRICE_MIN or item.price > PRICE_MAX:
                    continue
                
                title = item.name
                
                # 负向过滤
                skip = False
                for neg in NEGATIVE_KEYWORDS:
                    # 去掉负号检查
                    neg_word = neg.replace("-", "")
                    if neg_word in title:
                        skip = True
                        break
                
                # 单卡特征过滤
                if "1枚" in title or "カードのみ" in title:
                    skip = True
                
                if skip:
                    continue
                
                # 判定优先级
                priority = "normal"
                if "シュリンク付き" in title or "未开封" in title:
                    priority = "high"
                
                all_items.append({
                    "title": item.name,
                    "price_jpy": item.price,
                    "status": "販売中" if item.status == "ITEM_STATUS_ON_SALE" else "売り切れ",
                    "keyword": kw,
                    "priority": priority,
                    "type": detect_type(item.name)
                })
            print(f"  获取: {len([i for i in results.items if PRICE_MIN <= i.price <= PRICE_MAX])} 个")
        except Exception as e:
            print(f"  错误: {e}")
    
    return all_items

def detect_type(title):
    """识别卡片类型"""
    title = title.upper()
    if "PSA10" in title or "PSA 10" in title:
        return "PSA10"
    if "BGS10" in title or "BGS 10" in title:
        return "BGS10"
    if "SAR" in title:
        return "SAR"
    if "AR" in title:
        return "AR"
    return "other"

async def main():
    print("="*50)
    print("宝石包整盒监控 - mercapi版")
    print("="*50)
    print(f"价格区间: ¥{PRICE_MIN:,} - ¥{PRICE_MAX:,}")
    print(f"负向过滤: {len(NEGATIVE_KEYWORDS)} 项")
    
    # 搜索
    items = await search_gem_pack()
    print(f"\n总计: {len(items)} 个整盒")
    
    if not items:
        print("未获取到数据")
        return
    
    # 分析
    df = pd.DataFrame(items)
    
    # 统计
    print("\n=== 统计 ===")
    print(f"总计: {len(df)} 个")
    print(f"\n按优先级:")
    print(df['priority'].value_counts())
    print(f"\n按类型:")
    print(df['type'].value_counts())
    print(f"\n平均价格: ¥{df['price_jpy'].mean():,.0f}")
    
    # 高优先级（带塑封）
    high_priority = df[df['priority'] == 'high']
    print(f"高优先级(シュリンク付き): {len(high_priority)} 个")
    
    # 低价预警
    avg = df['price_jpy'].mean()
    cheap = df[df['price_jpy'] < avg * 0.7]
    print(f"低价预警 (<均价70%): {len(cheap)} 个")
    
    # 保存
    output = f"/Users/hm/Desktop/销售总监報告/宝石包整盒_{datetime.now().strftime('%Y-%m-%d')}.json"
    df.to_json(output, orient='records', force_ascii=False, indent=2)
    print(f"\n已保存: {output}")
    print("\n✅ 完成!")

if __name__ == "__main__":
    asyncio.run(main())
