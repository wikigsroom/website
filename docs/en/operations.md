# Account isolation, deployment and release synchronization

[README](../../README.md) · [简体中文](../zh-CN/operations.md)

## Repository and deployment ownership

The maintained checkout is this repository, with remote `git@github.com:wikigsroom/website.git` and branch `main`. In the original workspace it lives under `website/`; the older sibling `web/` is retained as a pre-migration checkout. Its old remote and Git history were not copied into the new repository. Blog and private research content remain separate.

GitHub stores reviewed source, bilingual documentation, final media and update notes. Vercel hosts the compiled public site. A Git push does not itself publish the site in this setup; the checked-in CI only runs validation. No new Vercel project or global account switch is needed for this repository.

| Deployment field | Expected value |
| --- | --- |
| Account | `carzygodwu-2768` |
| Team slug | `carzygodwu-2768s-projects` |
| Team ID | `team_f2I6fSyyGCAvsD9XULNufnbe` |
| Project | `sidcloud` |
| Project ID | `prj_7FzL7ilgYomtw9XcRlEGQFfRhvSm` |
| Production domain | [www.sidcloud.cn](https://www.sidcloud.cn/) |
| CLI version | `65.4.0` |

These identifiers are recorded in [`operations/vercel-project.json`](../../operations/vercel-project.json). They identify the destination and are not authorization tokens.

## Where credentials are kept

[`scripts/vercel.ps1`](../../scripts/vercel.ps1) uses native Windows PowerShell and npm/npx. It always passes `--global-config` pointing to:

```text
%LOCALAPPDATA%\sidcloud\vercel-profile\
  config.json   isolated CLI settings
  auth.json     sensitive OAuth access/refresh credentials
```

On the original machine this is `C:\Users\carzy\AppData\Local\sidcloud\vercel-profile`. Credentials survive terminal/chat restarts and are available to subsequent authorized maintenance sessions on the same Windows account. They are outside the repository and upload root. The directory ACL grants the current Windows principal full control and removes inherited access. The wrapper forces file credential storage, disables native-binary delegation and CLI telemetry, and uses process-only CI mode to avoid automatic browser launches.

The wrapper saves and temporarily removes inherited `VERCEL_TOKEN`, `NOW_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, `VERCEL_SCOPE` and related storage/CI/browser settings, then restores them in `finally`. This prevents an unrelated terminal token from overriding the isolated identity. It checks `whoami` against the expected account, verifies access to the team/project, and checks ignored local project metadata before deployment.

The default Vercel configuration, OS-wide environment and default global login are not switched. Do not run a bare `vercel login`, `vercel logout`, or supply a token on a command line for this site. Do not copy `auth.json` into a README, Git commit, screenshot or upload directory.

## Initialize a checkout and authorize once

From the repository root in PowerShell 7:

```powershell
npm ci
pwsh -NoProfile -File scripts/vercel.ps1 Init
pwsh -NoProfile -File scripts/vercel.ps1 Status
```

`Init` creates ignored `.vercel/project.json` using the pinned existing project IDs. If a different project is already linked, the script stops instead of overwriting it. `Status` reuses the existing isolated login. On a new machine, or if that login has expired/revoked authorization:

```powershell
pwsh -NoProfile -File scripts/vercel.ps1 Login
```

Open the printed device authorization link in a private browser window, sign into the website's account, authorize it and close the temporary tab/window afterward. If a device code expires, run the same `Login` action to obtain a new one. After login the script checks the actual username and project access. If it reports the wrong account, repeat only the isolated Login action using the correct account; do not alter the default profile.

## Build and release

1. Update the relevant source/data, English and Chinese documentation, `CHANGELOG.md` and a dated file in `docs/releases/`.
2. When UI source/content changes, run `npm run docs:media`, inspect the captures, and include the new manifest and final assets.
3. Run `npm run release:check`. Review the diff and staged files, including `git diff --check`.
4. Commit the reviewed change and push `origin main`. If the remote advanced, integrate its changes and recheck; do not force push.
5. For a requested deployment, use the appropriate action below. Both actions independently run `release:check` before upload.

```powershell
pwsh -NoProfile -File scripts/vercel.ps1 Preview
pwsh -NoProfile -File scripts/vercel.ps1 Production
```

Preview creates a preview deployment URL. Production passes `--prod` to the pinned `sidcloud` project. Both pin `--project` and `--scope`; no project is selected interactively. The script uploads the repository's source, and Vercel builds it remotely. `vercel.json` overrides the project's historical “Other/public” defaults with Vite, `npm run build`, `dist/`. Local/CI checks use Node 22; the existing Vercel project reports Node 24.x.

The `.vercelignore` excludes documentation/media, dependency and build directories, Git data and local environment files from the upload. Git's `.gitignore` separately excludes credentials metadata, dependencies, builds and raw recordings from commits.

## Verify and synchronize the result

After publishing, verify the public domain, the requested visual behavior, correct footer destinations, both languages, catalog JSON and representative search/category behavior. Test internal-page direct requests and refreshes separately from client-side navigation; the current deep-link 404 issue is documented in [known issues](known-issues.md).

Record the deployment URL/ID, date, checks and any remaining limitation in the release note. Commit and push that result so GitHub includes what actually reached production. Compare local `HEAD` with `git ls-remote origin refs/heads/main` and leave the checkout clean. Close temporary browser tabs/contexts and stop local preview servers.

For a documentation-only update that does not change the deployed application, perform the repository synchronization without publishing a redundant production build. Keep the prior deployment reference identified as prior deployment evidence.

## Recovery

| Symptom | Action |
| --- | --- |
| Missing `.vercel/project.json` | Run `Init` in this checkout |
| Wrong linked IDs or username | Stop, inspect the pinned metadata and isolated login; preserve unrelated account files |
| Expired device code / revoked login | Repeat the isolated `Login`, then `Status` |
| Missing or stale documentation media | Run `docs:media`, inspect and commit the manifest/assets |
| Build outputs from `public` instead of `dist` | Check the committed `vercel.json`; do not work around it by uploading private workspace directories |
| Bad live release | Restore the intended source with a normal Git revert, synchronize docs/media, check and publish; document the result |
| Push rejected because remote advanced | Fetch, review and integrate remote changes; preserve remote history |

Use native tools only. Docker, WSL and local virtualization are outside this workflow.
