# 2026-10-29 — Domain verification / 域名验证

[Changelog / 更新记录](../../CHANGELOG.md) · [English README](../../README.md) · [中文 README](../../README.zh-CN.md)

## English

Added [`public/17df1b98016e4dce51cf8d4080665747.txt`](../../public/17df1b98016e4dce51cf8d4080665747.txt) so Vite publishes a static file at the domain root. Its body is exactly `ce49460b29a0a3d3fbf87ef530c8954f96e0258c` (40 ASCII bytes, no BOM or trailing newline). The public endpoint is [www.sidcloud.cn/17df1b98016e4dce51cf8d4080665747.txt](https://www.sidcloud.cn/17df1b98016e4dce51cf8d4080665747.txt).

Keep the file in future releases while domain verification depends on it. Updated both READMEs and the paired operations/media guides. Nonvisual, root-level hexadecimal `.txt` verification files are excluded from the media source digest, so the existing UI screenshots, MP4s and GIFs remain valid. This release uses exact byte comparison and public HTTP checks for the requested change.

## 简体中文

新增 [`public/17df1b98016e4dce51cf8d4080665747.txt`](../../public/17df1b98016e4dce51cf8d4080665747.txt)，通过 Vite 构建在域名根路径提供静态文件。正文严格为 `ce49460b29a0a3d3fbf87ef530c8954f96e0258c`（40 字节 ASCII，无 BOM 或末尾换行）。公开地址为 [www.sidcloud.cn/17df1b98016e4dce51cf8d4080665747.txt](https://www.sidcloud.cn/17df1b98016e4dce51cf8d4080665747.txt)。

域名验证仍依赖该文件时，后续发布应持续保留。同步两版 README 和部署/媒体文档；根目录十六进制文件名的 `.txt` 验证文件不影响界面，因此不纳入媒体源码指纹，现有截图、MP4 和 GIF 继续适用。本次改动通过精确字节比对与线上 HTTP 请求验证。

## Validation and deployment / 验证与部署

Published and verified on 2026-10-29 at 16:27 Asia/Taipei. Anonymous HTTP evidence, including the exact response body and redirect chains, is saved in the [HTTP verification report](2026-10-29-domain-verification.http.json). / 已于台北时间 2026-10-29 16:27 发布并验证；匿名请求的完整正文和跳转链见 [HTTP 检查记录](2026-10-29-domain-verification.http.json)。

| Check / 检查 | Result / 结果 |
| --- | --- |
| Source commit / 上线源码提交 | `9728270` — `feat: publish domain verification file` |
| Release checks / 发布检查 | `npm run release:check` passed locally and before upload: TypeScript, ESLint, catalogs, Vite, 18 documentation files, 236 local links and 14 media assets / 本地及上传前完整检查通过 |
| Exact file / 文件精确检查 | Source, Git-staged file and `dist/` output each matched the required 40-byte body, without BOM or trailing newline / 源码、Git 暂存内容及构建产物均为要求的 40 字节原文，无 BOM 或末尾换行 |
| Production state / 正式部署状态 | Vercel `READY`, target `production`, aliased to `https://www.sidcloud.cn` / 正式部署就绪且已绑定官网域名 |
| Deployment ID / 部署 ID | `dpl_F8rNXdkM9d7SQ2e1VUusXVfxP5du` |
| Immutable deployment / 固定部署地址 | [sidcloud-krgpwhks7](https://sidcloud-krgpwhks7-carzygodwu-2768s-projects.vercel.app) |
| Deployment inspector / 部署详情 | [Vercel deployment](https://vercel.com/carzygodwu-2768s-projects/sidcloud/F8rNXdkM9d7SQ2e1VUusXVfxP5du) |
| HTTPS `www` verification path / HTTPS `www` 验证路径 | Direct HTTP 200, `text/plain; charset=utf-8`, exactly 40 bytes, no authentication / 直接返回 HTTP 200、纯文本、40 字节，无需登录 |
| HTTPS apex verification path / HTTPS 裸域名验证路径 | Existing HTTP 308 redirect to the same HTTPS `www` path, then HTTP 200 with the exact body / 现有 308 跳转至同路径的 HTTPS `www`，随后返回 200 和正确正文 |
| HTTP verification paths / HTTP 验证路径 | Existing 308 redirects to HTTPS; both ultimately return the correct file / 通过现有 308 跳转至 HTTPS，最终均可读取正确文件 |
| Application bundle / 应用构建 | Remains `index-CK-rTQO2.js`; existing UI media digest and hashes pass / 应用打包文件相同，现有界面媒体指纹及哈希通过 |
| Account isolation / 账户隔离 | Used `scripts/vercel.ps1 Production` and the authorized isolated profile; all three default/global Vercel config/auth SHA-256 hashes remain unchanged / 使用独立脚本与已授权配置，三个默认全局配置/凭证文件的 SHA-256 均未变化 |
| Temporary resources / 临时资源 | No browser or local preview server was needed / 本次无需启动浏览器或本地预览服务 |

The checks above establish that the public file is available; the domain-verification provider still needs to complete its own validation. Existing catalog localization and other known issues remain tracked in the [English](../en/known-issues.md) and [Chinese](../zh-CN/known-issues.md) guides. / 上述检查确认公开文件可访问，域名验证服务仍需自行完成校验；现有目录翻译等问题继续记录在中英已知问题文档中。
