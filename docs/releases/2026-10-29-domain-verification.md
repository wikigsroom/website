# 2026-10-29 — Domain verification / 域名验证

[Changelog / 更新记录](../../CHANGELOG.md) · [English README](../../README.md) · [中文 README](../../README.zh-CN.md)

## English

Added [`public/17df1b98016e4dce51cf8d4080665747.txt`](../../public/17df1b98016e4dce51cf8d4080665747.txt) so Vite publishes a static file at the domain root. Its body is exactly `ce49460b29a0a3d3fbf87ef530c8954f96e0258c` (40 ASCII bytes, no BOM or trailing newline). The public endpoint is [www.sidcloud.cn/17df1b98016e4dce51cf8d4080665747.txt](https://www.sidcloud.cn/17df1b98016e4dce51cf8d4080665747.txt).

Keep the file in future releases while domain verification depends on it. Updated both READMEs and the paired operations/media guides. Nonvisual, root-level hexadecimal `.txt` verification files are excluded from the media source digest, so the existing UI screenshots, MP4s and GIFs remain valid. This release uses exact byte comparison and public HTTP checks for the requested change.

## 简体中文

新增 [`public/17df1b98016e4dce51cf8d4080665747.txt`](../../public/17df1b98016e4dce51cf8d4080665747.txt)，通过 Vite 构建在域名根路径提供静态文件。正文严格为 `ce49460b29a0a3d3fbf87ef530c8954f96e0258c`（40 字节 ASCII，无 BOM 或末尾换行）。公开地址为 [www.sidcloud.cn/17df1b98016e4dce51cf8d4080665747.txt](https://www.sidcloud.cn/17df1b98016e4dce51cf8d4080665747.txt)。

域名验证仍依赖该文件时，后续发布应持续保留。同步两版 README 和部署/媒体文档；根目录十六进制文件名的 `.txt` 验证文件不影响界面，因此不纳入媒体源码指纹，现有截图、MP4 和 GIF 继续适用。本次改动通过精确字节比对与线上 HTTP 请求验证。

## Validation and deployment / 验证与部署

Deployment and public HTTP verification are pending. Results will be recorded here after the isolated production deployment. / 尚待使用独立账户发布并检查公开 HTTP 地址，完成后在此补充结果。
