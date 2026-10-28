<#
.SYNOPSIS
Operate the existing sidcloud Vercel project with an isolated account.
.EXAMPLE
pwsh -File scripts/vercel.ps1 Init
.EXAMPLE
pwsh -File scripts/vercel.ps1 Login
.EXAMPLE
pwsh -File scripts/vercel.ps1 Status
.EXAMPLE
pwsh -File scripts/vercel.ps1 Production
#>
param(
    [Parameter(Position = 0)]
    [ValidateSet('Init', 'Login', 'Status', 'Preview', 'Production')]
    [string]$Action = 'Status'
)

$ErrorActionPreference = 'Stop'
$repositoryRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$deployment = Get-Content -LiteralPath (Join-Path $repositoryRoot 'operations\vercel-project.json') -Raw -Encoding UTF8 | ConvertFrom-Json
$linkDirectory = Join-Path $repositoryRoot '.vercel'
$linkPath = Join-Path $linkDirectory 'project.json'

if ($Action -eq 'Init') {
    if (-not (Test-Path -LiteralPath $linkPath)) {
        New-Item -ItemType Directory -Path $linkDirectory -Force | Out-Null
        [pscustomobject]@{
            projectId = $deployment.projectId
            orgId = $deployment.teamId
            projectName = $deployment.projectName
        } | ConvertTo-Json | Set-Content -LiteralPath $linkPath -Encoding UTF8
    }
}
if (-not (Test-Path -LiteralPath $linkPath)) {
    throw 'Project metadata is missing. Run scripts/vercel.ps1 Init first.'
}
$link = Get-Content -LiteralPath $linkPath -Raw -Encoding UTF8 | ConvertFrom-Json
if ($link.projectId -ne $deployment.projectId -or $link.orgId -ne $deployment.teamId) {
    throw 'The linked project differs from operations/vercel-project.json. Operation stopped.'
}
if ($Action -eq 'Init') {
    Write-Host "Linked existing project $($deployment.projectName). No account credentials were changed."
    return
}

$profileDirectory = Join-Path $env:LOCALAPPDATA 'sidcloud\vercel-profile'
if (-not (Test-Path -LiteralPath $profileDirectory)) {
    New-Item -ItemType Directory -Path $profileDirectory -Force | Out-Null
}
$principal = [Security.Principal.WindowsIdentity]::GetCurrent().Name
& icacls.exe $profileDirectory /grant:r "${principal}:(OI)(CI)F" | Out-Null
if ($LASTEXITCODE -ne 0) { throw 'Could not grant access to the isolated credential directory.' }
& icacls.exe $profileDirectory /inheritance:r | Out-Null
if ($LASTEXITCODE -ne 0) { throw 'Could not protect the isolated credential directory.' }

$profileConfigPath = Join-Path $profileDirectory 'config.json'
$profileConfig = if (Test-Path -LiteralPath $profileConfigPath) {
    Get-Content -LiteralPath $profileConfigPath -Raw -Encoding UTF8 | ConvertFrom-Json
} else { [pscustomobject]@{} }
$profileConfig | Add-Member -NotePropertyName credStorage -NotePropertyValue 'file' -Force
$profileConfig | Add-Member -NotePropertyName useNativeBinary -NotePropertyValue $false -Force
$profileConfig | Add-Member -NotePropertyName telemetry -NotePropertyValue ([pscustomobject]@{ enabled = $false }) -Force
$profileConfig | ConvertTo-Json -Depth 20 | Set-Content -LiteralPath $profileConfigPath -Encoding UTF8
if ($Action -ne 'Login' -and -not (Test-Path -LiteralPath (Join-Path $profileDirectory 'auth.json'))) {
    throw 'The isolated account is not logged in. Run scripts/vercel.ps1 Login.'
}

$npxCommand = (Get-Command npx.cmd -ErrorAction Stop).Source
$baseArguments = @('--yes', "vercel@$($deployment.cliVersion)", '--global-config', $profileDirectory, '--cwd', $repositoryRoot)
$environmentNames = @('VERCEL_TOKEN', 'NOW_TOKEN', 'VERCEL_ORG_ID', 'VERCEL_PROJECT_ID', 'VERCEL_SCOPE', 'VERCEL_TOKEN_STORAGE', 'VERCEL_TELEMETRY_DISABLED', 'CI', 'BROWSER')
$savedEnvironment = @{}
foreach ($name in $environmentNames) {
    $savedEnvironment[$name] = [Environment]::GetEnvironmentVariable($name, 'Process')
    [Environment]::SetEnvironmentVariable($name, $null, 'Process')
}
[Environment]::SetEnvironmentVariable('VERCEL_TOKEN_STORAGE', 'file', 'Process')
[Environment]::SetEnvironmentVariable('VERCEL_TELEMETRY_DISABLED', '1', 'Process')
[Environment]::SetEnvironmentVariable('CI', '1', 'Process')

try {
    Write-Host "Isolated profile: $profileDirectory"
    if ($Action -eq 'Login') {
        & $npxCommand @baseArguments login
        if ($LASTEXITCODE -ne 0) { throw 'The isolated login did not complete.' }
    }
    $accountOutput = & $npxCommand @baseArguments whoami
    if ($LASTEXITCODE -ne 0) { throw 'Account verification failed.' }
    $account = ($accountOutput | Out-String).Trim()
    if ($account -ne $deployment.account) { throw "Expected account '$($deployment.account)', received '$account'. Operation stopped." }
    Write-Host "Verified account: $account"
    & $npxCommand @baseArguments --scope $deployment.teamId project inspect $deployment.projectName
    if ($LASTEXITCODE -ne 0) { throw 'The isolated account cannot access the expected project.' }
    if ($Action -in 'Preview', 'Production') {
        & npm.cmd --prefix $repositoryRoot run release:check
        if ($LASTEXITCODE -ne 0) { throw 'Release checks failed. Deployment stopped.' }
        $arguments = @('deploy', '--project', $deployment.projectId, '--scope', $deployment.teamId, '--yes')
        if ($Action -eq 'Production') { $arguments += '--prod' }
        & $npxCommand @baseArguments @arguments
        if ($LASTEXITCODE -ne 0) { throw 'Vercel deployment failed.' }
    }
}
finally {
    foreach ($name in $environmentNames) {
        [Environment]::SetEnvironmentVariable($name, $savedEnvironment[$name], 'Process')
    }
}
