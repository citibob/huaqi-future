# eBay API 接入进度

## 当前状态
- Sandbox API: ✅ 可用
- Production API: ⏳ 被限速中（等待1-2小时后恢复）

## 凭证
- Client ID: YOUR_EBAY_PRD_CLIENT_ID
- Client Secret: YOUR_EBAY_PRD_CLIENT_SECRET

## 代码文件
- ebay_api_oauth.py - OAuth版本（含token刷新）
- ebay_api_test.py - Sandbox测试脚本
- ebay_api_prod.py - Production测试脚本

## 待办
- [ ] 等限速恢复后测试Production API
- [ ] 测试关键词: "gem pack box"
- [ ] 确认返回数据结构正确
- [ ] 接入销售总监001b cron

## 备注
- 免费额度：5000次/天
- 端点：https://api.ebay.com/buy/browse/v1/item_summary/search

## 接入001b cron计划（API测试通过后）

### 1. 数据源切换
- 原来方式 → Browse API search接口
- 引入 ebay_api_oauth.py 做token管理

### 2. 搜索关键词
- "gem pack box"
- "ジェムパック box"
- "CBB1C~CBB4C"
- "pokemon gem pack sealed"

### 3. Filter省配额
- 只搜 NEW（condition=NEW）
- 设合理价格区间

### 4. 输出格式
- 对齐现有报告模板
- 对齐Opportunity Engine输入格式

### 5. 配额检查
- 脚本开头加 getRateLimits 配额检查
- 快到上限自动跳过
- 发Telegram通知

### 6. cron时间
- 暂时不变（04:40 JST）
