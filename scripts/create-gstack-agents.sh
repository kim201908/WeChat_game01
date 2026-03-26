#!/bin/bash
# gstack 角色 Agent 创建脚本
# 功能：为每个 gstack 角色创建独立的 Agent，绑定对应模型

set -e

WORKSPACE="/root/.openclaw/workspace/projects/WeChat_game01/agents"

echo "🚀 开始创建 gstack 角色 Agent..."
echo ""

mkdir -p "$WORKSPACE"

# CEO - Qwen3 Max
echo "创建 gstack-ceo (qwen3-max)..."
openclaw agents add gstack-ceo \
  --model "dashscope/qwen3-max-2026-01-23" \
  --agent-dir "$WORKSPACE/gstack-ceo" \
  --non-interactive || echo "⚠️  gstack-ceo 已存在"

# ENG - Qwen3 Coder Plus
echo "创建 gstack-eng (qwen3-coder-plus)..."
openclaw agents add gstack-eng \
  --model "dashscope/qwen3-coder-plus" \
  --agent-dir "$WORKSPACE/gstack-eng" \
  --non-interactive || echo "⚠️  gstack-eng 已存在"

# DEV - Qwen3 Coder Plus
echo "创建 gstack-dev (qwen3-coder-plus)..."
openclaw agents add gstack-dev \
  --model "dashscope/qwen3-coder-plus" \
  --agent-dir "$WORKSPACE/gstack-dev" \
  --non-interactive || echo "⚠️  gstack-dev 已存在"

# REVIEW - Qwen3.5 Plus
echo "创建 gstack-review (qwen3.5-plus)..."
openclaw agents add gstack-review \
  --model "dashscope/qwen3.5-plus" \
  --agent-dir "$WORKSPACE/gstack-review" \
  --non-interactive || echo "⚠️  gstack-review 已存在"

# QA - Qwen3.5 Plus
echo "创建 gstack-qa (qwen3.5-plus)..."
openclaw agents add gstack-qa \
  --model "dashscope/qwen3.5-plus" \
  --agent-dir "$WORKSPACE/gstack-qa" \
  --non-interactive || echo "⚠️  gstack-qa 已存在"

# TEST - Qwen3 Coder Plus
echo "创建 gstack-test (qwen3-coder-plus)..."
openclaw agents add gstack-test \
  --model "dashscope/qwen3-coder-plus" \
  --agent-dir "$WORKSPACE/gstack-test" \
  --non-interactive || echo "⚠️  gstack-test 已存在"

# RETRO - Qwen3 Max
echo "创建 gstack-retro (qwen3-max)..."
openclaw agents add gstack-retro \
  --model "dashscope/qwen3-max-2026-01-23" \
  --agent-dir "$WORKSPACE/gstack-retro" \
  --non-interactive || echo "⚠️  gstack-retro 已存在"

# 其他角色 - Qwen3.5 Plus
for role in ship deploy docs office browse status github notify init; do
  echo "创建 gstack-${role} (qwen3.5-plus)..."
  openclaw agents add gstack-${role} \
    --model "dashscope/qwen3.5-plus" \
    --agent-dir "$WORKSPACE/gstack-${role}" \
    --non-interactive || echo "⚠️  gstack-${role} 已存在"
done

echo ""
echo "✅ 所有 gstack 角色 Agent 创建完成！"
echo ""
echo "查看 Agent 列表："
echo "  openclaw agents list"
echo ""
echo "Agent 目录："
echo "  $WORKSPACE"
