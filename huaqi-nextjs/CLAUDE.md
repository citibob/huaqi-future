# Project Rules — huaqi.jp

## Golden Rule
**以 git HEAD 为准。** 修改任何文件前，先 `git pull` 或读取当前文件内容。禁止凭记忆中的旧版本覆盖现有代码。

## Content Compliance (must follow)
本站是独立进口商，不是官方授权经销商。所有页面内容必须遵守以下措辞规范：

| 禁止使用 | 正确用法 |
|----------|---------|
| 正規ライセンス店 / authorized dealer / official distributor | 信頼できる仕入先 / import & sales |
| 公式メーカー / manufacturer | 仕入先 |
| 正規品保証 / 品質保証書 | 正品確認済 / 原盒原膜 / 商品状態レポート |
| 中国正規ライセンス品 | 中国正規発売品 |
| PSA鑑定 / PSA代行 | (deleted, do not add back) |
| CEO message / 代表挨拶 with partner/country stats | (deleted, do not add back) |
| Company History / 業務沿革 | (deleted, do not add back) |

## Tech Stack
- Next.js 14.2.5, `output: 'export'` (static site)
- Cloudflare Pages (`huaqi` project), serves huaqi.jp
- Bilingual: use `<LangText ja="..." en="..." />` component, never hardcode mixed JP/EN strings
- Pack names: always `<LangText ja={pack.nameJP} en={pack.nameEN} />`, never `{pack.nameCN}`

## Build & Deploy
```bash
PATH="/opt/homebrew/Cellar/node@22/22.22.2/bin:$PATH" npm run build
npx wrangler pages deploy out --project-name huaqi --branch main --commit-dirty=true --commit-message="description here"
```

## Deploy Checklist (must verify before every deploy)
每次部署前必须按顺序执行以下检查，任一失败则禁止部署：

1. **构建通过**：`npm run build` 成功，0 error
2. **禁用词扫描**：
   ```bash
   grep -r "正規ライセンス\|Authorized.*Dealer\|PSA鑑定\|公式メーカー\|品質保証書\|正規品保証\|代表挨拶\|業務沿革" app/ components/
   ```
   → 必须返回 0 结果。如有匹配，修复后重新构建。
3. **本地抽查**：`npx serve out -p 3001`，打开浏览器检查首页、/packs、/company 页面无异常

## Git Safety
以下命令**绝对禁止**在本项目执行：
- `git checkout .` / `git restore .` / `git clean -f` / `git reset --hard`
- 如需回退改动，必须先 `git stash` 保存当前工作区

## Project Write Lock
修改本项目代码前，必须：
1. 检查 `~/.openclaw/workspace/locks/huaqi.lock` 是否存在
2. 如存在 → 说明其他 Agent 正在操作，**不得修改**，汇报冲突
3. 如不存在 → 创建该文件，内容格式：`{agent_id} | {timestamp} | {task_description}`
4. 任务完成后 → 删除该 lock 文件

## Do NOT
- Add `app/api/` route handlers (incompatible with `output: 'export'`)
- Add `.babelrc` (conflicts with `next/font` which requires SWC)
- Add `resend`, `stripe`, or other server-side-only dependencies
- Revert bilingual LangText back to hardcoded Japanese
- Add exaggerated business claims (partner counts, country counts, authorization status)
- Run destructive git commands (see Git Safety above)
