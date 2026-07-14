#!/usr/bin/env bash
# ============================================================
#  手动部署到腾讯云 COS（可选）
#  推荐用 GitHub Actions 自动部署；此脚本用于本地手动上传。
# ============================================================
# 前置：安装腾讯云 CLI
#   macOS : brew install tencentcloud/tencentcloud-cli/coscli
#   Linux : 见 https://cloud.tencent.com/document/product/436/63144
#
# 配置（环境变量，避免写死密钥）：
#   export COS_SECRET_ID=xxx
#   export COS_SECRET_KEY=xxx
#   export COS_BUCKET=your-bucket-1250000000   # 格式 bucket-appid
#   export COS_REGION=ap-guangzhou
# ------------------------------------------------------------
set -euo pipefail

: "${COS_SECRET_ID:?请设置 COS_SECRET_ID}"
: "${COS_SECRET_KEY:?请设置 COS_SECRET_KEY}"
: "${COS_BUCKET:?请设置 COS_BUCKET}"
: "${COS_REGION:?请设置 COS_REGION}"

# 构建
npm run build

# 写入 coscli 临时配置
export COSCLI_SECRET_ID="$COS_SECRET_ID"
export COSCLI_SECRET_KEY="$COS_SECRET_KEY"

coscli config add -b "$COS_BUCKET" -r "$COS_REGION" -a "$COS_SECRET_ID" -s "$COS_SECRET_KEY"

# 上传 dist/ 到存储桶根，并清除旧文件
coscli sync ./dist "cos://$COS_BUCKET" --delete

echo "✅ 已上传到 COS：$COS_BUCKET ($COS_REGION)"

# ICP 备案通过后，可开启 CDN 并刷新：
# coscli cache clean "https://你的域名/*"
