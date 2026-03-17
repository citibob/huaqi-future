#!/usr/bin/env python3
import json, time
from datetime import datetime
from mercari import MercariSearchStatus, MercariSort, MercariOrder
import mercari

CARD_KEYWORDS = {"耿鬼（ゲンガー）": ["ゲンガー PSA10 CBB3", "0307/07"]}

cutoff = time.time() - 86400 * 180
results = []
for card_name, keywords in CARD_KEYWORDS.items():
    seen = set()
    for kw in keywords:
        for s in ["on_sale", "sold_out"]:
            st = MercariSearchStatus.ON_SALE if s=="on_sale" else MercariSearchStatus.SOLD_OUT
            try:
                for item in mercari.search(kw, sort=MercariSort.SORT_CREATED_TIME, order=MercariOrder.ORDER_DESC, status=st):
                    ts = int(getattr(item, "created", 0) or 0)
                    if ts < cutoff: continue
                    if item.productURL in seen: continue
                    seen.add(item.productURL)
                    results.append({"title": item.productName, "price": int(item.price) if item.price else 0, "url": item.productURL, "status": getattr(item, "status", s), "created": getattr(item, "created", ""), "section": card_name})
            except: pass
print(f"完成: {len(results)}件")
with open("/Users/hm/Desktop/销售总监报告/single_card_test.json", "w") as f:
    json.dump({"results": results}, f)
