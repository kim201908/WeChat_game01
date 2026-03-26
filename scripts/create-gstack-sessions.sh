#!/bin/bash
# gstack 角色会话创建脚本
# 功能：为每个 gstack 角色创建独立的子 Agent 会话，绑定对应模型

set -e

echo "🚀 开始创建 gstack 角色会话..."
echo ""

# CEO - Qwen3 Max
echo "创建 gstack-ceo (qwen3-max)..."
openclaw sessions spawn \
  --task "担任 gstack:ceo 角色，负责产品规划、战略决策、市场分析" \
  --label "gstack-ceo" \
  --model "dashscope/qwen3-max-2026-01-23" \
  --mode "session" \
  --cleanup "keep" || echo "⚠️  gstack-ceo 已存在"

# ENG - Qwen3 Coder Plus
echo "创建 gstack-eng (qwen3-coder-plus)..."
openclaw sessions spawn \
  --task "担任 gstack:eng 角色，负责架构设计、技术选型、数据模型" \
  --label "gstack-eng" \
  --model "dashscope/qwen3-coder-plus" \
  --mode "session" \
  --cleanup "keep" || echo "⚠️  gstack-eng 已存在"

# DEV - Qwen3 Coder Plus
echo "创建 gstack-dev (qwen3-coder-plus)..."
openclaw sessions spawn \
  --task "担任 gstack:dev 角色，负责编写高质量生产代码、Bug 修复、重构" \
  --label "gstack-dev" \
  --model "dashscope/qwen3-coder-plus" \
  --mode "session" \
  --cleanup "keep" || echo "⚠️  gstack-dev 已存在"

# REVIEW - Qwen3.5 Plus
echo "创建 gstack-review (qwen3.5-plus)..."
openclaw sessions spawn \
  --task "担任 gstack:review 角色，负责代码审查、质量把控、优化建议" \
  --label "gstack-review" \
  --model "dashscope/qwen3.5-plus" \
  --mode "session" \
  --cleanup "keep" || echo "⚠️  gstack-review 已存在"

# QA - Qwen3.5 Plus
echo "创建 gstack-qa (qwen3.5-plus)..."
openclaw sessions spawn \
  --task "担任 gstack:qa 角色，负责测试策略、验收标准、质量把关" \
  --label "gstack-qa" \
  --model "dashscope/qwen3.5-plus" \
  --mode "session" \
  --cleanup "keep" || echo "⚠️  gstack-qa 已存在"

# TEST - Qwen3 Coder Plus
echo "创建 gstack-test (qwen3-coder-plus)..."
openclaw sessions spawn \
  --task "担任 gstack:test 角色，负责生成测试代码、单元测试、集成测试" \
  --label "gstack-test" \
  --model "dashscope/qwen3-coder-plus" \
  --mode "session" \
  --cleanup "keep" || echo "⚠️  gstack-test 已存在"

# RETRO - Qwen3 Max
echo "创建 gstack-retro (qwen3-max)..."
openclaw sessions spawn \
  --task "担任 gstack:retro 角色，负责项目复盘、经验总结、改进建议" \
  --label "gstack-retro" \
  --model "dashscope/qwen3-max-2026-01-23" \
  --mode "session" \
  --cleanup "keep" || echo "⚠️  gstack-retro 已存在"

# 其他角色 - Qwen3.5 Plus
for role in ship deploy docs office browse status github notify init; do
  echo "创建 gstack-${role} (qwen3.5-plus)..."
  openclaw sessions spawn \
    --task "担任 gstack:${role} 角色" \
    --label "gstack-${role}" \
    --model "dashscope/qwen3.5-plus" \
    --mode "session" \
    --cleanup "keep" || echo "⚠️  gstack-${role} 已存在"
done

echo ""
echo "✅ 所有 gstack 角色会话创建完成！"
echo ""
echo "查看会话列表："
echo "  openclaw sessions list"
echo ""
echo "使用示例（钉钉）："
echo "  @gstack:ceo 分析产品"
echo "  @gstack:dev 写代码"
echo "  @gstack:review 审查"
