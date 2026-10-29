# 2026-10-29 — Additional domain verification file / 新增域名验证文件

[Changelog / 更新记录](../../CHANGELOG.md) · [English README](../../README.md) · [中文 README](../../README.zh-CN.md)

## English

Added [`public/b8261e943cb1290db1a42a32c0ee9566.txt`](../../public/b8261e943cb1290db1a42a32c0ee9566.txt) for domain verification. Vite copies it unchanged to the build root, serving [the public verification URL](https://www.sidcloud.cn/b8261e943cb1290db1a42a32c0ee9566.txt). Its body is exactly `ec8ff0c82edb079d74fc8fc19d6c709828a0650a` (40 ASCII bytes, no BOM or trailing newline).

Both READMEs and operations guides now list both verification files. The [previous verification file](../../public/17df1b98016e4dce51cf8d4080665747.txt) stays deployed. This static-file addition does not change the interface; existing screenshot, video and GIF evidence remains valid under the existing visual-source digest rules. Keep both files in future releases while verification depends on them.

## 简体中文

新增 [`public/b8261e943cb1290db1a42a32c0ee9566.txt`](../../public/b8261e943cb1290db1a42a32c0ee9566.txt) 用于域名验证。Vite 将其原样复制到构建根目录，通过[公开验证地址](https://www.sidcloud.cn/b8261e943cb1290db1a42a32c0ee9566.txt)提供访问。正文严格为 `ec8ff0c82edb079d74fc8fc19d6c709828a0650a`（40 字节 ASCII，无 BOM 或末尾换行）。

两版 README 和部署文档均列出两个验证文件，[上次发布的文件](../../public/17df1b98016e4dce51cf8d4080665747.txt)继续保留。本次新增静态文件不改变界面，现有截图、视频和 GIF 按已有视觉源码指纹规则继续适用。后续发布应持续保留两个文件，直到相关域名验证不再需要。

## Validation and deployment / 验证与部署

Published and verified on 2026-10-29 at 16:43 Asia/Taipei. The [anonymous HTTP report](2026-10-29-domain-verification-b8261e94.http.json) records exact bodies, redirect chains and homepage/catalog checks. / 已于台北时间 2026-10-29 16:43 发布并验证，精确正文、跳转链及首页/目录检查见[匿名 HTTP 记录](2026-10-29-domain-verification-b8261e94.http.json)。

| Check / 检查 | Result / 结果 |
| --- | --- |
| Deployed source commit / 上线源码提交 | `631c218` — `feat: add second domain verification file` |
| Release checks / 发布检查 | `npm run release:check` passed locally and before upload: TypeScript, ESLint, catalogs, Vite, 19 documentation files, 253 local links and 14 media assets / 本地及上传前完整检查通过 |
| File bytes / 文件字节 | Both `public/` source files and `dist/` outputs match their required 40-byte bodies; the staged new file also matched exactly / 两个源码文件及构建产物均与要求的 40 字节正文一致，新增文件暂存内容也完全一致 |
| Production state / 正式部署状态 | Vercel `READY`, target `production`, aliased to `https://www.sidcloud.cn` / 正式部署就绪且已绑定官网域名 |
| Deployment ID / 部署 ID | `dpl_GUybcmQ1GLiDJWULtxX3xPuZXNjb` |
| Immutable deployment / 固定部署地址 | [sidcloud-qygig8nyt](https://sidcloud-qygig8nyt-carzygodwu-2768s-projects.vercel.app) |
| Deployment inspector / 部署详情 | [Vercel deployment](https://vercel.com/carzygodwu-2768s-projects/sidcloud/GUybcmQ1GLiDJWULtxX3xPuZXNjb) |
| New HTTPS `www` file / 新文件 HTTPS `www` 地址 | Anonymous HTTP 200, `text/plain; charset=utf-8`, exact 40-byte body; confirmed with Node fetch and native curl / 匿名访问返回 HTTP 200、纯文本及正确 40 字节正文，Node fetch 与原生 curl 均验证通过 |
| New apex/HTTP paths / 新文件裸域名及 HTTP 地址 | Existing HTTP 308 redirects to HTTPS `www`, then HTTP 200 with the correct body / 通过现有 308 跳转至 HTTPS `www`，最终返回 200 和正确正文 |
| Previous file / 原验证文件 | HTTPS `www` still returns HTTP 200 and the original exact 40-byte body; apex redirects to the same file / HTTPS `www` 继续返回 200 及原始 40 字节正文，裸域名跳转到同一文件 |
| Homepage and catalogs / 首页与目录 | HTTP 200 for `/`, `/main.json` (76 entries) and `/myapp.json` (18 entries); application bundle remains `index-CK-rTQO2.js` / 首页、两个目录均为 200，条目数及应用打包文件一致 |
| Account isolation / 账户隔离 | Used `scripts/vercel.ps1 Production` and the authorized isolated profile; all three default/global Vercel configuration/credential SHA-256 hashes remain unchanged / 使用独立部署脚本和已授权配置，三个默认全局配置/凭证文件的 SHA-256 均未变化 |
| Temporary resources / 临时资源 | No browser or local preview server was started / 本次没有启动浏览器或本地预览服务 |
