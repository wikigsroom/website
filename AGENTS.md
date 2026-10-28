# Repository working instructions

- This is the maintained source of the sidcloud official website. The requested push destination is `git@github.com:wikigsroom/website.git`, branch `main`.
- Never launch local Docker, WSL or any other virtualization environment. Use native tools.
- Close all browser contexts, tabs and processes created for a check or capture when finished. Stop temporary preview servers as well. Preserve the user's own unrelated browser windows.
- For every requested update, synchronize the relevant code/data, both language versions of affected documentation, `CHANGELOG.md` and the corresponding release notes. Regenerate screenshots, recordings and GIFs when the interface or its displayed content changes.
- Run `npm run release:check`, review staged changes, then commit and push the completed work to `origin/main` as requested by the user. Never force push. Do not leave completed updates only in a local checkout.
- The user has authorized Codex to implement requested website updates and their deployment. Execute the concrete requested change; do not invent unrelated product changes.
- Vercel operations must use `scripts/vercel.ps1`. Run `Init` for a new checkout. Reuse the existing isolated profile at `%LOCALAPPDATA%\sidcloud\vercel-profile`; never log in/out with the default global configuration.
- The expected account/team/project are recorded in `operations/vercel-project.json`. Do not bypass account or project checks or inherit unrelated `VERCEL_TOKEN`, project or organization overrides.
- Never commit OAuth tokens, refresh tokens, `.vercel/`, `.env` files, private research documents or local credential directories.
- GitHub pushes do not automatically deploy Vercel in the current setup. When a live-site update is requested, run the isolated Production action, verify the public domain and include the deployment result in release notes before the final synchronization push.
- Do not claim placeholder Dev Toolbox tools, damaged Chinese catalog descriptions, unused copy/code components or the external Live2D widget are completed working features. Read the known-issues documents.
