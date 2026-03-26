# OpenClaw 会话配置指南

**项目：** WeChat_game01  
**创建时间：** 2026-03-27  
**最后更新：** 2026-03-27

---

## 📋 会话系统架构

OpenClaw 使用 **sessions.json** 管理所有会话。

**配置文件位置：**
```
~/.openclaw/agents/main/sessions/sessions.json
```

---

## 🎯 gstack 角色会话配置

### 方案 1：主 Agent 自动路由（推荐）

**原理：** 所有角色共用主会话，根据角色名自动选择模型。

**配置：** 已记忆在主 Agent 中

**使用方式：**
```
@gstack:ceo 分析产品      # 自动使用 qwen3-max
@gstack:dev 写代码        # 自动使用 qwen3-coder-plus
@gstack:review 审查       # 自动使用 qwen3.5-plus
```

**优点：**
- ✅ 无需额外配置
- ✅ 简单易用
- ✅ 上下文连续

**缺点：**
- ⚠️ 所有角色共享同一上下文
- ⚠️ 模型切换有开销

---

### 方案 2：独立会话（高级）

**原理：** 为每个角色创建独立会话，每个会话绑定不同模型。

**配置步骤：**

#### 第 1 步：创建 CEO 会话

```bash
# 使用 openclaw agent 命令
openclaw agent \
  --message "担任 gstack:ceo 角色" \
  --session-id "gstack-ceo"
```

#### 第 2 步：手动编辑 sessions.json

```json
{
  "gstack-ceo": {
    "sessionId": "xxx-xxx-xxx",
    "model": "dashscope/qwen3-max-2026-01-23",
    "label": "gstack:ceo"
  },
  "gstack-dev": {
    "sessionId": "yyy-yyy-yyy",
    "model": "dashscope/qwen3-coder-plus",
    "label": "gstack:dev"
  }
}
```

#### 第 3 步：绑定钉钉路由

```bash
openclaw agents bind gstack-ceo \
  --bind "clawdbot-dingtalk:dingxikqbhilqur2goat"
```

**优点：**
- ✅ 每个角色独立上下文
- ✅ 模型固定，无切换开销
- ✅ 可并行执行

**缺点：**
- ❌ 配置复杂
- ❌ 需要手动管理
- ❌ 上下文不共享

---

## 🛠️ 会话管理命令

### 查看会话

```bash
# 列出所有会话
openclaw sessions list

# 查看会话详情
openclaw sessions history --sessionKey xxx
```

### 创建会话

```bash
# 通过 agent 命令创建
openclaw agent --message "初始化" --session-id "my-session"
```

### 删除会话

```bash
# 删除会话文件
rm ~/.openclaw/agents/main/sessions/{session-id}.jsonl
```

---

## 📊 当前配置

### 主会话配置

**会话 ID：** `agent:main:dingt...`  
**默认模型：** `dashscope/qwen3.5-plus`  
**工作区：** `/root/.openclaw/workspace`

### gstack 角色映射

| 角色 | 自动使用模型 |
|------|-------------|
| `gstack:ceo` | qwen3-max-2026-01-23 |
| `gstack:retro` | qwen3-max-2026-01-23 |
| `gstack:eng` | qwen3-coder-plus |
| `gstack:dev` | qwen3-coder-plus |
| `gstack:test` | qwen3-coder-plus |
| 其他 | qwen3.5-plus |

---

## 🔧 修改配置

### 修改默认模型

编辑 `~/.openclaw/config.json`：

```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "dashscope/qwen3.5-plus"
      }
    }
  }
}
```

### 修改角色模型映射

编辑 `docs/gstack-角色模型配置.md`，然后重启 Gateway：

```bash
openclaw gateway restart
```

---

## ⚠️ 注意事项

1. **会话持久化：** 会话数据保存在 `sessions/*.jsonl` 文件
2. **上下文限制：** 每个会话有 Token 限制（qwen3.5-plus: 1M）
3. **成本控制：** 定期检查用量，设置预算告警
4. **备份建议：** 定期备份 `sessions.json` 和重要会话

---

## 📁 相关文件

| 文件 | 说明 |
|------|------|
| `~/.openclaw/agents/main/sessions/sessions.json` | 会话配置 |
| `~/.openclaw/agents/main/sessions/*.jsonl` | 会话数据 |
| `~/.openclaw/config.json` | 全局配置 |
| `docs/gstack-角色模型配置.md` | 角色模型映射 |

---

## 🚀 推荐流程

**现阶段：** 使用方案 1（主 Agent 自动路由）

**原因：**
1. 配置简单
2. 已经够用
3. 无需额外维护

**未来优化：** 如果发现上下文混乱或模型切换频繁，再考虑方案 2

---

*最后更新：2026-03-27*  
*维护者：kim201908*
