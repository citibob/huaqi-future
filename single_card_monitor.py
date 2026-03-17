#!/usr/bin/env python3.9
"""
单卡监控 - 卡号搜索版 (3-11版恢复)
用卡号搜索：0307/07、0709/09、0115/15、0615/15、0915/15
售罄和在售分开查询，保留真实上架时间
"""
import json
import os
import time
from itertools import islice
from datetime import datetime, timedelta
from collections import defaultdict
import mercari
from mercari import MercariSearchStatus, MercariSort

# 卡号搜索关键词 - 3-11版关键：使用卡号搜索
CARD_KEYWORDS = [
    # 宝石包 SV3a 系列 - 卡号格式
    {"id": "sv3a_0307", "name": "イーブイ", "keywords": ["0307", "07", "SV3a 0307", "SV3a 07"]},
    {"id": "sv3a_0709", "name": "エーフィ", "keywords": ["0709", "09", "SV3a 0709", "SV3a 09"]},
    {"id": "sv3a_0115", "name": "ブラッキー", "keywords": ["0115", "15", "SV3a 0115", "SV3a 15"]},
    {"id": "sv3a_0615", "name": "リーフィア", "keywords": ["0615", "15", "SV3a 0615", "SV3a 15"]},
    {"id": "sv3a_0915", "name": "グレイシア", "keywords": ["0915", "15", "SV3a 0915", "SV3a 15"]},
    {"id": "sv3a_0616", "name": "ニンフィア", "keywords": ["0616", "16", "SV3a 0616", "SV3a 16"]},
    # 宝石包 SV4a 系列
    {"id": "sv4a_0410", "name": "ゲンガー", "keywords": ["0410", "10", "SV4a 0410", "SV4a 10"]},
    {"id": "sv4a_0406", "name": "リザードン", "keywords": ["0406", "06", "SV4a 0406", "SV4a 06"]},
    {"id": "sv4a_0407", "name": "カメックス", "keywords": ["0407", "07", "SV4a 0407", "SV4a 07"]},
    {"id": "sv4a_0403", "name": "フシギダネ", "keywords": ["0403", "03", "SV4a 0403", "SV4a 03"]},
    # 宝石包 SV5a 系列
    {"id": "sv5a_0809", "name": "ルギア", "keywords": ["0809", "09", "SV5a 0809", "SV5a 09"]},
    {"id": "sv5a_0814", "name": "レックウザ", "keywords": ["0814", "14", "SV5a 0814", "SV5a 14"]},
    {"id": "sv5a_0813", "name": "サーナイト", "keywords": ["0813", "13", "SV5a 0813", "SV5a 13"]},
    # 宝石包 SV6a 系列
    {"id": "sv6a_0901", "name": "ミュウツー", "keywords": ["0901", "01", "SV6a 0901", "SV6a 01"]},
    {"id": "sv6a_0902", "name": "ミュウ", "keywords": ["0902", "02", "SV6a 0902", "SV6a 02"]},
    {"id": "sv6a_0903", "name": "ピカチュウ", "keywords": ["0903", "03", "SV6a 0903", "SV6a 03"]},
    # 宝石包 SV12a 系列
    {"id": "sv12a_1226", "name": "オーガポン", "keywords": ["1226", "26", "SV12a 1226", "SV12a 26"]},
]

# 过滤规则 - 用户提供的白名单
MUST_CONTAIN = ["ポケモン", "ポケカ", "PSA", "BGS", "ARS", "宝石包", "ジェムパック", "AR", "SAR", "CBB", "中国", "中国語", "海外限定"]

# 用户提供的黑名单
BLACKLIST = ["メガ", "無し", "セット", "まとめ売り", "引退品", "GX", "VMAX", "Vstar", "TAG TEAM", "ジャンク", "訳あり"]

# 非卡类商品 - 清理低价预警里的垃圾
NON_CARD = ["ウォレット", "バッグ", "リュック", "ワンピース", "セーター",
            "スマホ", "ケース", "カバー", "家電", "炊飯器", "冷蔵庫",
            "おもちゃ", "ゲーム", "switch", "cd", "dvd", "bluray",
            "リップ", "香水", "アクセサリー", "リング", "ピアス",
            "サングラス", "sunglasses", "zara", "ユニクロ",
            # 额外排除 - 清理低价预警垃圾
            " Golf ", "パター", "クラブ", "スパーク", "plug", " NGK",
            "ツール", "ドライバー", "レンチ", "シューズ", "スニーカー",
            "化粧品", "ベッセル", "vessel",
            "シャツ", "長袖", "T恤", "毛衣", "外套", "裤子", "裙子",
            "高尔夫", "ボール", "スリクソン", "ロストボール",
            "トート", "ブリーフケース", "ウエストバッグ",
            "イザベルマラン", "パーリーゲイツ", "pearly gates", "PEARLY GATES",
            "マリン", "サーフ", "釣り", "フィッシング",
            "T恤", "スウェット", "ポロシャツ", "パーカー"]

def normalize(title):
    """全角/半角归一化"""
    return title.replace(" ", "").replace("　", "").replace("-", "").replace(".", "").lower()

def should_include(title):
    """白名单+黑名单过滤 - 在normalize前后都做匹配"""
    t = title.lower()
    n = normalize(title)
    
    # 1. 白名单检查 - normalize前后都做，防止Pokemon丢失
    # 先检查原始标题
    whitelist_in_original = any(k.lower() in t for k in MUST_CONTAIN)
    # 再检查normalize后
    whitelist_in_normalized = any(k.lower() in n for k in MUST_CONTAIN)
    
    if not (whitelist_in_original or whitelist_in_normalized):
        return False
    
    # 2. 黑名单过滤
    for w in BLACKLIST:
        if w.lower() in t:
            return False
    
    # 3. 非卡类过滤
    for kw in NON_CARD:
        if kw.lower() in t:
            return False
    
    return True

def get_type(title):
    """分类：graded(评级卡) 或 raw(裸卡)"""
    t = normalize(title)
    
    # 评级卡：PSA10/BGS10/CGC10
    if "psa10" in t or "bgs10" in t or "cgc10" in t:
        return "graded"
    
    # 裸卡：AR/SAR且不含PSA/BGS/9/9.5
    if ("ar" in t or "sar" in t) and not any(x in t for x in ["psa", "bgs", "cgc", "ars", "9.", "95", "9.5"]):
        return "raw"
    
    return None

def format_time(created):
    """显示具体日期时间"""
    try:
        # 处理datetime对象
        if hasattr(created, 'year'):  # datetime对象
            jp_time = created
        elif isinstance(created, str) and created.isdigit():
            created_dt = datetime.fromtimestamp(int(created))
            jp_time = created_dt + timedelta(hours=9)
        elif isinstance(created, str):
            created_dt = datetime.fromisoformat(created.replace('Z', '+00:00'))
            jp_time = created_dt + timedelta(hours=9)
        elif isinstance(created, (int, float)):
            created_dt = datetime.fromtimestamp(int(created))
            jp_time = created_dt + timedelta(hours=9)
        else:
            return str(created)[:10]
        
        # 返回具体日期格式
        return jp_time.strftime("%Y-%m-%d %H:%M")
    except:
        return str(created)[:10]

def calculate_stats(items):
    """计算市场均价"""
    if not items:
        return 0, 0
    prices = [i['price_jpy'] for i in items if i['price_jpy'] > 0]
    if not prices:
        return 0, 0
    avg = sum(prices) // len(prices)
    return avg, min(prices)

def search_card(kw_dict):
    """3-11版搜索：分开查询售罄和在售，保留真实created时间"""
    results = []
    jp = kw_dict["name"]
    
    # 时间过滤：7天内
    cutoff_ts = int(time.time()) - (7 * 86400)
    
    # 关键：分开查询 ON_SALE 和 SOLD_OUT
    for status in [MercariSearchStatus.ON_SALE, MercariSearchStatus.SOLD_OUT]:
        status_name = "販売中" if status == MercariSearchStatus.ON_SALE else "売り切れ"
        
        for kw in kw_dict["keywords"]:
            try:
                # 获取更多结果以接近238条
                items = list(islice(
                    mercari.search(kw, status=status, sort=MercariSort.SORT_CREATED_TIME),
                    50,
                ))
                for item in items:
                    # 时间过滤：7天内
                    try:
                        # 处理各种时间戳格式：整数、浮点数、数字字符串
                        if isinstance(item.created, (int, float)):
                            item_ts = int(item.created)
                        elif isinstance(item.created, str):
                            if item.created.isdigit():
                                item_ts = int(item.created)
                            else:
                                # 尝试解析其他格式
                                import datetime
                                try:
                                    dt = datetime.datetime.fromisoformat(item.created.replace('Z', '+00:00'))
                                    item_ts = int(dt.timestamp())
                                except:
                                    item_ts = 0
                        else:
                            item_ts = 0
                        
                        if item_ts > 0 and item_ts < cutoff_ts:
                            continue  # 跳过超过7天的商品
                    except:
                        item_ts = 0
                    
                    title = item.productName
                    if not should_include(title):
                        continue
                    
                    ctype = get_type(title)
                    if not ctype:
                        continue
                    
                    # 3-11版关键：created字段存相对时间，created_raw存原始时间戳
                    results.append({
                        "title": title,
                        "price_jpy": int(item.price) if item.price else 0,
                        "status": status_name,  # 売り切れ / 販売中
                        "created": format_time(item.created),  # 相对时间如"3日前"
                        "created_raw": str(item.created),  # 原始时间戳
                        "image_url": getattr(item, "imageURL", ""),
                        "url": item.productURL,
                        "section": jp,
                        "type": ctype,
                        "item_id": item.id
                    })
                time.sleep(0.5)
            except Exception as e:
                print(f"   ⚠️ {kw} 失败: {e}")
                time.sleep(1)
    
    return results

def analyze_prices(items):
    """分析价格，标记低价预警"""
    # 按section+type分组计算均价
    price_stats = defaultdict(list)
    for item in items:
        key = (item['section'], item['type'])
        if item['price_jpy'] > 0:
            price_stats[key].append(item['price_jpy'])
    
    # 计算每个分组的均价和最低价
    avg_prices = {}
    for key, prices in price_stats.items():
        if prices:
            avg_prices[key] = {
                'avg': sum(prices) // len(prices),
                'min': min(prices),
                'count': len(prices)
            }
    
    # 标记低价商品（低于均价50%）
    flagged = []
    for item in items:
        key = (item['section'], item['type'])
        if key in avg_prices and item['price_jpy'] > 0:
            avg = avg_prices[key]['avg']
            # 低价预警：价格低于均价50%且不是售罄（售罄商品可能是之前的价格）
            if item['price_jpy'] < avg * 0.5 and item['status'] == "販売中":
                item['low_price_flag'] = True
                item['avg_price'] = avg
                flagged.append(item)
    
    return flagged

def main():
    print("=" * 60)
    print("单卡监控 - 3-11版恢复 (卡号搜索)")
    print("售罄/在售分开查询 + 真实上架时间")
    print("=" * 60)
    
    all_items = []
    
    for i, kw in enumerate(CARD_KEYWORDS):
        print(f"[{i+1}/{len(CARD_KEYWORDS)}] {kw['name']}...")
        items = search_card(kw)
        print(f"   {len(items)} 件")
        all_items.extend(items)
    
    # 去重
    seen = set()
    unique = [i for i in all_items if i["url"] not in seen and not seen.add(i["url"])]
    
    # 分类统计
    on_sale = [i for i in unique if i["status"] == "販売中"]
    sold_out = [i for i in unique if i["status"] == "売り切れ"]
    graded = [i for i in unique if i["type"] == "graded"]
    raw = [i for i in unique if i["type"] == "raw"]
    
    # 低价预警分析
    low_price_items = analyze_prices(unique)
    
    print(f"\n{'='*50}")
    print("📊 统计结果")
    print(f"{'='*50}")
    print(f"在售(販売中): {len(on_sale)} | 售罄(売り切れ): {len(sold_out)}")
    print(f"评级卡(PSA10等): {len(graded)}")
    print(f"未评级裸卡(AR/SAR): {len(raw)}")
    print(f"总计: {len(unique)}")
    print(f"\n⚠️ 低价预警 (价格<均价50%): {len(low_price_items)} 件")
    
    if low_price_items:
        print("\n🚨 低价商品列表:")
        for item in low_price_items[:10]:  # 只显示前10个
            print(f"  🔴 {item['title'][:30]}...")
            print(f"     {item['price_jpy']}円 (均价{item['avg_price']}円) | {item['section']} | {item['status']}")
    
    # 保存 - 3-11版字段：title, price_jpy, status, created, url
    timestamp = datetime.now().strftime("%Y-%m-%d")
    output = f"/Users/hm/Desktop/销售总监報告/single_card_{timestamp}.json"
    os.makedirs(os.path.dirname(output), exist_ok=True)
    
    # 确保输出字段与3-11版一致
    output_items = []
    for item in unique:
        output_items.append({
            "title": item["title"],
            "price_jpy": item["price_jpy"],
            "status": item["status"],
            "created": item["created"],  # 相对时间
            "created_raw": item.get("created_raw", ""),
            "url": item["url"],
            "section": item["section"],
            "type": item["type"]
        })
    
    with open(output, "w") as f:
        json.dump({
            "results": output_items,
            "stats": {
                "on_sale": len(on_sale),
                "sold_out": len(sold_out),
                "graded": len(graded),
                "raw": len(raw),
                "total": len(unique),
                "low_price_warning": len(low_price_items)
            },
            "low_price_items": low_price_items
        }, f, ensure_ascii=False, indent=2)
    
    print(f"\n💾 保存到: {output}")
    
    # 样本
    if unique:
        print("\n📋 样本 (显示真实上架时间):")
        for item in unique[:5]:
            print(f"  ★ {item['title'][:35]} | {item['price_jpy']}円 | {item['created']} | {item['status']}")

if __name__ == "__main__":
    main()
