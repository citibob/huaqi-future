# huaqi.jp 网站信息 (给 Codex 参考)

## 网站概况
- **URL**: https://www.huaqi.jp
- **托管**: Cloudflare Pages (项目名: huaqi)
- **域名DNS**: Cloudflare
- **源码**: https://github.com/citibob/huaqi-future

## 技术栈
- **框架**: Next.js 14
- **样式**: Tailwind CSS
- **部署方式**: 静态导出 (`npm run build` → `out/` 文件夹)
- **部署命令**: `npx wrangler pages deploy out --project-name=huaqi`

## 项目路径
`~/Desktop/pokemon-system/huaqi-nextjs/`

## 主要页面
- / (首页)
- /packs (宝石包商品)
- /pokemon (宝可梦卡牌查询)
- /market (市场)
- /company (公司介绍)
- /contact (联系表单)

## 待优化事项
等待 Codex 评估后提出优化方案。

## 规范域名
待确认 (huaqi.jp vs www.huaqi.jp)

## Search Console
待确认

## 最近修改记录
- 2026-03-25: 恢复网站配色（金色导航栏）
- 部署命令修正：必须用 `out` 文件夹，不能用 `.next`
