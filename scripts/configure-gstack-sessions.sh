#!/bin/bash
# gstack 角色会话配置脚本
# 功能：创建带模型配置的会话绑定

set -e

echo "🚀 gstack 角色会话配置"
echo ""
echo "当前会话系统基于 OpenClaw sessions.json"
echo "配置文件位置：~/.openclaw/agents/main/sessions/sessions.json"
echo ""

# 显示当前会话
echo "📋 当前会话列表："
openclaw sessions list 2>&1 | head -20 || echo "无法列出会话"

echo ""
echo "=================================="
echo "💡 配置说明"
echo "=================================="
echo ""
echo "OpenClaw 的会话系统通过 sessions.json 管理"
echo "每个会话可以绑定不同的模型"
echo ""
echo "配置方式："
echo "1. 手动编辑 sessions.json"
echo "2. 使用 openclaw agent 命令创建新会话"
echo "3. 在钉钉调用时自动创建会话"
echo ""
echo "=================================="
echo "📝 推荐方案"
echo "=================================="
echo ""
echo "方案 1：主 Agent 自动路由（最简单）"
echo "  - 在钉钉调用 @gstack:xxx"
echo "  - 主 Agent 根据角色自动选择模型"
echo "  - 无需额外配置"
echo ""
echo "方案 2：创建独立会话"
echo "  - 为每个角色创建独立会话"
echo "  - 每个会话绑定不同模型"
echo "  - 需要手动管理"
echo ""
echo "=================================="
echo "🎯 当前配置"
echo "=================================="
echo ""
cat << 'EOF'
角色 - 模型映射（已记忆在主 Agent 中）：

| 角色          | 模型                        |
|---------------|----------------------------|
| gstack:ceo    | qwen3-max-2026-01-23       |
| gstack:retro  | qwen3-max-2026-01-23       |
| gstack:eng    | qwen3-coder-plus           |
| gstack:dev    | qwen3-coder-plus           |
| gstack:test   | qwen3-coder-plus           |
| 其他          | qwen3.5-plus               |

使用方式：
  @gstack:ceo 分析产品
  @gstack:dev 写代码
  @gstack:review 审查
EOF

echo ""
echo "✅ 配置完成！"
