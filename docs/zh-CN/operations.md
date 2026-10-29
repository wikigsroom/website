# 独立账户、部署与更新同步

[README](../../README.zh-CN.md) · [English](../en/operations.md)

## 仓库与部署归属

正式维护仓库的远程地址为 `git@github.com:wikigsroom/website.git`，分支为 `main`。在原工作区中位于 `website/`；旧的同级 `web/` 保留为迁移前 checkout，其旧远程和 Git 历史不混入新仓库。博客及私人研究内容继续独立维护。

GitHub 保存经过检查的源码、双语文档、最终媒体和更新说明；Vercel 托管编译后的官网。当前配置下 Git push 本身不会发布官网，仓库 CI 只做检查。本次整理复用已有 Vercel 项目，无需新建项目或切换全局账户。

| 部署字段 | 预期值 |
| --- | --- |
| 账户 | `carzygodwu-2768` |
| 团队 slug | `carzygodwu-2768s-projects` |
| 团队 ID | `team_f2I6fSyyGCAvsD9XULNufnbe` |
| 项目名 | `sidcloud` |
| 项目 ID | `prj_7FzL7ilgYomtw9XcRlEGQFfRhvSm` |
| 正式域名 | [www.sidcloud.cn](https://www.sidcloud.cn/) |
| CLI 版本 | `65.4.0` |

这些信息保存在 [`operations/vercel-project.json`](../../operations/vercel-project.json)，属于项目定位信息，不是授权 Token。

## 凭证保存与隔离方案

[`scripts/vercel.ps1`](../../scripts/vercel.ps1) 使用原生 Windows PowerShell 和 npm/npx，每次固定通过 `--global-config` 指向：

```text
%LOCALAPPDATA%\sidcloud\vercel-profile\
  config.json   独立 CLI 设置
  auth.json     敏感 OAuth 访问与刷新凭证
```

原机器的实际位置为 `C:\Users\carzy\AppData\Local\sidcloud\vercel-profile`。同一个 Windows 用户后续启动终端或会话时，可以继续使用保存的独立登录状态。凭证在仓库及上传根目录之外；目录 ACL 授予当前 Windows 用户完全控制，并移除继承访问。脚本强制文件凭证存储、关闭 native binary 转交和 CLI 遥测，并仅在本进程内启用 CI 模式，避免自动启动浏览器。

脚本保存并临时清除继承的 `VERCEL_TOKEN`、`NOW_TOKEN`、`VERCEL_ORG_ID`、`VERCEL_PROJECT_ID`、`VERCEL_SCOPE` 以及相关存储/CI/浏览器设置，在 `finally` 中恢复，防止其他业务终端中的 Token 覆盖独立身份。部署前会将 `whoami` 与预期账户比较，验证团队/项目访问权限，并检查本地已忽略的项目关联文件。

默认 Vercel 配置、系统级环境变量和全局登录状态不切换。维护本站时不要执行裸 `vercel login`、`vercel logout`，也不要把 Token 放入命令参数。不要把 `auth.json` 复制进 README、Git 提交、截图或上传目录。

## 初始化与一次性授权

在仓库根目录使用 PowerShell 7：

```powershell
npm ci
pwsh -NoProfile -File scripts/vercel.ps1 Init
pwsh -NoProfile -File scripts/vercel.ps1 Status
```

`Init` 按固定的已有项目 ID 生成 `.vercel/project.json`，该文件不提交。如果 checkout 已关联其他项目，脚本会停止，不会覆盖。`Status` 复用已有独立登录；新机器或登录过期/授权被撤销时执行：

```powershell
pwsh -NoProfile -File scripts/vercel.ps1 Login
```

用隐私窗口打开打印的设备授权链接，登录官网所属账户并授权，结束后关闭临时标签页/窗口。设备码过期时再次执行同一个 `Login` 获取新码。完成后脚本校验实际用户名与项目权限；账户不符时仅重新执行独立登录，不修改默认配置。

## 构建与发布流程

1. 修改对应源码/数据、中英两版文档、`CHANGELOG.md`，并在 `docs/releases/` 中编写带日期的说明。
2. 界面源码或展示内容变化时执行 `npm run docs:media`，检查素材并提交新的清单和最终文件。
3. 执行 `npm run release:check`，检查代码差异、暂存列表及 `git diff --check`。
4. 提交后推送 `origin main`。远程有新提交时先整合并重新检查，不强制覆盖历史。
5. 用户要求部署时执行下列对应动作。两个部署动作都会在上传前独立运行 `release:check`。

```powershell
pwsh -NoProfile -File scripts/vercel.ps1 Preview
pwsh -NoProfile -File scripts/vercel.ps1 Production
```

Preview 生成预览部署地址，Production 为固定的 `sidcloud` 项目传入 `--prod`。两者均固定 `--project` 和 `--scope`，不交互选择项目。上传仓库源码后由 Vercel 远程构建。`vercel.json` 将历史项目的 “Other/public” 默认值明确覆盖为 Vite、`npm run build`、`dist/`。本地/CI 使用 Node 22，现有 Vercel 项目报告 Node 24.x。

`.vercelignore` 将文档/媒体、依赖、构建目录、Git 信息和本地环境文件排除在上传之外；Git 的 `.gitignore` 则独立排除项目关联、依赖、构建和临时录屏，防止提交。

## 上线验证与结果同步

### 域名验证文件

验证文件维护在 [`public/17df1b98016e4dce51cf8d4080665747.txt`](../../public/17df1b98016e4dce51cf8d4080665747.txt)。Vite 将其原样复制到 `dist/17df1b98016e4dce51cf8d4080665747.txt`，由域名根路径直接提供，不经过 React 路由。正文严格为 40 字节 ASCII：`ce49460b29a0a3d3fbf87ef530c8954f96e0258c`，没有 BOM 或末尾换行。

上线后匿名请求[公开验证地址](https://www.sidcloud.cn/17df1b98016e4dce51cf8d4080665747.txt)，确认 HTTP 200、纯文本响应及正文完全一致；另外检查裸域名现有的跳转行为。后续构建应持续保留该文件，直到域名验证不再需要。此内容是有意公开的域名验证值，账户凭证仍保存在独立配置目录。

### 发布检查

发布后检查正式域名、请求修改的实际行为、页脚目标、两种语言、目录 JSON 以及代表性搜索和分类。内部页面直接访问/刷新需要与客户端点击导航分开测试，当前深链接 404 见[已知问题](known-issues.md)。

将部署地址/ID、日期、验证和剩余问题写入发布说明，再提交推送，让 GitHub 留存真正上线的结果。用 `git ls-remote origin refs/heads/main` 与本地 `HEAD` 比对，保持工作区干净，并关闭临时浏览器 tab/context，停止本地预览服务。

只修改说明文档、没有改变部署应用时，完成 GitHub 同步即可，不重复发布正式构建。此前的部署记录应明确标注为先前上线证据。

## 常见恢复方式

| 情况 | 处理 |
| --- | --- |
| 缺少 `.vercel/project.json` | 在此 checkout 执行 `Init` |
| 关联 ID 或实际用户名不符 | 停止，核对固定元数据及独立登录，保留其他账户文件 |
| 设备码过期或登录授权失效 | 重新执行独立 `Login`，再执行 `Status` |
| 文档媒体缺失/过期 | 执行 `docs:media`，检查后提交清单及素材 |
| 构建输出错误使用 `public` | 核对已提交的 `vercel.json`，不要通过上传私人工作区规避 |
| 线上版本错误 | 用普通 Git revert 恢复正确源码，同步文档/媒体，检查后重新发布并记录 |
| 远程已有新提交导致推送拒绝 | Fetch 后检查并整合远程变化，不覆盖历史 |

全程使用原生工具，不使用 Docker、WSL 或本地虚拟化环境。
