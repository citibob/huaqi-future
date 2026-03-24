# 网站现状报告

## 基本信息
- **网站地址**: https://huaqi.jp
- **状态**: 在线运行中 (HTTP 200)
- **更新日期**: 2026-03-21

## 目录结构

### 主目录 ~/Desktop/pokemon-system/
```
├── huaqi-nextjs/     # Next.js主应用（当前运行版本）
├── huaqi-site/       # Cloudflare Workers项目
├── *.html           # 静态HTML文件（备用）
└── *.py            # Python脚本（监控/报告）
```

### Next.js应用结构 ~/Desktop/pokemon-system/huaqi-nextjs/
```
├── app/              # 页面目录
│   ├── api/         # API路由
│   ├── business/    # 商业
│   ├── company/    # 公司
│   ├── contact/   # 联系
│   ├── culture/    # 文化
│   ├── market/    # 市场
│   ├── packs/     # 卡包
│   ├── pokemon/   # 宝可梦
│   ├── privacy/   # 隐私
│   ├── services/  # 服务
│   └── page.tsx   # 首页
├── components/      # UI组件
├── lib/            # 工具库
├── public/         # 静态资源
└── package.json    # 依赖管理
```

## 部署状态

| 项目 | 状态 | 备注 |
|------|------|------|
| huaqi.jp (主站) | ✅ 在线 | Next.js静态导出 |
| huaqi-nextjs | ✅ 已构建 | 最新构建在 .next/ |

## 已知问题
- 无.wrangler文件（Cloudflare Pages部署）
- 无.env配置文件（可能使用系统环境变量）

## 维护任务
- [ ] 更新.env配置
- [ ] 确认CI/CD部署流程
- [ ] 备份策略
