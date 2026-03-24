# 网站优化待办 | huaqi.jp

**扫描时间：** 2026-03-24 05:00 JST  
**扫描范围：** 稳定性 + 企业展示层（不作脆弱的逐段编辑）

---

## 严重（需立即处理）

### 1. 部署命令错误 —— HTML 文件未上传
**问题：** 当前部署使用 `npx wrangler pages deploy .next/static`，该命令只上传 `/_next/static/` 目录（JS/CSS chunks），**所有 HTML 文件均未上传**。

**实测结果：**
- `https://www.huaqi.jp/services` → 404
- `https://www.huaqi.jp/packs` → 404
- `https://www.huaqi.jp/market` → 404
- `https://www.huaqi.jp/google9b30285c530b4cfd.html` → 404

**本地构建状态：** `out/` 目录构建正常，所有 HTML 文件完整（business.html 102KB、market.html 140KB 等）。

**建议：** 修正部署命令为：
```bash
npx wrangler pages deploy out/ --project-name=huaqi
```
或通过 Cloudflare Pages Dashboard 直接绑定 Git 仓库实现 CI/CD。

---

### 2. Sitemap 与实际部署严重不符
**问题：** sitemap.xml（2026-03-21 更新）列出了 `/business`、`/services`、`/market`、`/packs`、`/pokemon`、`/culture` 等页面，但这些页面在当前部署中均返回 404。

**影响：** Google 爬虫访问这些 URL 将得到 404，sitemap 成为死链接列表，影响 SEO。

**建议：** 重新部署后更新 sitemap，或在部署流程中加入构建后验证步骤。

---

## 重要（部署后需跟进）

### 3. og-image.png 缺失
**问题：** 所有页面 meta 标签引用 `https://www.huaqi.jp/og-image.png`，该文件在 `public/` 和 `out/` 中均不存在。

**建议：** 设计并添加 1200×630px 的 OG 分享图。

---

### 4. Sitemap 缺少法律页面
**问题：** sitemap.xml 未包含 `/privacy`（プライバシーポリシー）和 `/law`（特定商取引法）页面。

**建议：** 补充 privacy.html 和 law.html 到 sitemap.xml。

---

### 5. 规范域名 canonical URL 未确认
**问题：** 页面 meta 中 `og:url` 硬编码为 `https://www.huaqi.jp`（无 www），但规范域名待用户确认（记忆显示待确认 www.huaqi.jp vs huaqi.jp）。

**建议：** 用户确认规范域名后统一更新 metadata。

---

## 可后置

### 6. robots.txt 内容异常
**问题：** robots.txt 包含 EU 版权Directive 2019/790 相关文本（非标准内容），实际贸易网站无需此段。

**影响：** 低 —— 不影响爬虫访问。

### 7. 联系方式信息不完整
**问题：** Footer 仅显示"神奈川県横浜市"，无详细地址（但 contact.html 正确）。

**建议：** Footer 一行信息可视性优化，可后置。

---

## 备注

- 网站基础建设正常，Next.js 构建流程无报错
- `out/` 目录构建完整，本地验证通过
- 问题集中在**部署环节**而非代码层
- 本次只做检查与记录，不做代码修改
