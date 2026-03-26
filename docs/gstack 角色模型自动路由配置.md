# gstack 角色模型自动路由配置

**目标：** 调用 gstack 角色时，自动使用配置文件中指定的大模型

**版本：** v1.0  
**日期：** 2026-03-27

---

## 📋 配置总览

| 角色 | 默认模型 | 说明 |
|------|----------|------|
| `gstack:ceo` | `dashscope/qwen3-max-2026-01-23` | 战略决策 |
| `gstack:eng` | `dashscope/qwen3-coder-plus` | 架构设计 |
| `gstack:dev` | `dashscope/qwen3-coder-plus` | 代码开发 |
| `gstack:review` | `dashscope/qwen3.5-plus` | 代码审查 |
| `gstack:qa` | `dashscope/qwen3.5-plus` | 测试策略 |
| `gstack:test` | `dashscope/qwen3-coder-plus` | 测试代码 |
| `gstack:ship` | `dashscope/qwen3.5-plus` | 发布管理 |
| `gstack:deploy` | `dashscope/qwen3.5-plus` | DevOps |
| `gstack:docs` | `dashscope/qwen3.5-plus` | 文档编写 |
| `gstack:retro` | `dashscope/qwen3-max-2026-01-23` | 复盘总结 |
| `gstack:office` | `dashscope/qwen3.5-plus` | 需求澄清 |
| `gstack:browse` | `dashscope/qwen3.5-plus` | 浏览器测试 |
| `gstack:status` | `dashscope/qwen3.5-plus` | 进度追踪 |
| `gstack:github` | `dashscope/qwen3.5-plus` | GitHub 集成 |
| `gstack:notify` | `dashscope/qwen3.5-plus` | 消息通知 |
| `gstack:init` | `dashscope/qwen3.5-plus` | 项目初始化 |

---

## 🛠️ 实现方式

### 方式 1：预创建子 Agent 会话（推荐）

**一次性创建所有角色的会话，每个会话绑定对应模型。**

```bash
#!/bin/bash
# 创建所有 gstack 角色的子 Agent 会话

# CEO
openclaw sessions spawn \
  --task "担任 gstack:ceo 角色，负责产品规划和战略决策" \
  --label "gstack-ceo" \
  --model "dashscope/qwen3-max-2026-01-23" \
  --mode "session" \
  --cleanup "keep"

# ENG
openclaw sessions spawn \
  --task "担任 gstack:eng 角色，负责架构设计和技术选型" \
  --label "gstack-eng" \
  --model "dashscope/qwen3-coder-plus" \
  --mode "session" \
  --cleanup "keep"

# DEV
openclaw sessions spawn \
  --task "担任 gstack:dev 角色，负责编写高质量生产代码" \
  --label "gstack-dev" \
  --model "dashscope/qwen3-coder-plus" \
  --mode "session" \
  --cleanup "keep"

# REVIEW
openclaw sessions spawn \
  --task "担任 gstack:review 角色，负责代码审查和质量把控" \
  --label "gstack-review" \
  --model "dashscope/qwen3.5-plus" \
  --mode "session" \
  --cleanup "keep"

# QA
openclaw sessions spawn \
  --task "担任 gstack:qa 角色，负责测试策略和验收标准" \
  --label "gstack-qa" \
  --model "dashscope/qwen3.5-plus" \
  --mode "session" \
  --cleanup "keep"

# TEST
openclaw sessions spawn \
  --task "担任 gstack:test 角色，负责生成测试代码" \
  --label "gstack-test" \
  --model "dashscope/qwen3-coder-plus" \
  --mode "session" \
  --cleanup "keep"

# RETRO
openclaw sessions spawn \
  --task "担任 gstack:retro 角色，负责项目复盘和经验总结" \
  --label "gstack-retro" \
  --model "dashscope/qwen3-max-2026-01-23" \
  --mode "session" \
  --cleanup "keep"

# 其他角色使用默认模型
for role in ship deploy docs office browse status github notify init; do
  openclaw sessions spawn \
    --task "担任 gstack:${role} 角色" \
    --label "gstack-${role}" \
    --model "dashscope/qwen3.5-plus" \
    --mode "session" \
    --cleanup "keep"
done

echo "✅ 所有 gstack 角色会话已创建"
```

**执行一次后，所有角色会话会持久保存。**

---

### 方式 2：钉钉调用 + 自动路由

**在钉钉中调用时，主 Agent 自动路由到对应模型。**

**使用方式：**
```
@gstack:ceo 分析产品
@gstack:dev 写代码
@gstack:review 审查
```

**路由逻辑：**
1. 检测消息中的 `@gstack:xxx` 前缀
2. 查找 `models-config.md` 配置
3. 使用对应模型创建临时会话或处理任务

---

## 📁 脚本文件

### 创建脚本：`create-gstack-sessions.sh`

**位置：** `/root/.openclaw/workspace/projects/WeChat_game01/scripts/create-gstack-sessions.sh`

**内容：** 上面的 bash 脚本

**执行：**
```bash
chmod +x scripts/create-gstack-sessions.sh
./scripts/create-gstack-sessions.sh
```

---

### 路由脚本：`gstack-model-router.py`

**位置：** `/root/.openclaw/workspace/projects/WeChat_game01/scripts/gstack-model-router.py`

**功能：** 解析配置文件，返回角色对应的模型

**使用：**
```bash
python3 scripts/gstack-model-router.py gstack:ceo
# 输出：dashscope/qwen3-max-2026-01-23
```

---

## 🚀 推荐流程

### 第 1 步：执行创建脚本

```bash
cd /root/.openclaw/workspace/projects/WeChat_game01
./scripts/create-gstack-sessions.sh
```

### 第 2 步：查看已创建的会话

```bash
openclaw sessions list
```

应该看到：
```
gstack-ceo      (qwen3-max)
gstack-eng      (qwen3-coder-plus)
gstack-dev      (qwen3-coder-plus)
gstack-review   (qwen3.5-plus)
...
```

### 第 3 步：在钉钉中调用

```
@gstack:ceo 分析产品方向
@gstack:dev 实现登录模块
@gstack:review 审查代码
```

**主 Agent 会自动路由到对应的子会话！**

---

## 📊 会话管理

### 查看会话

```bash
openclaw sessions list
```

### 向特定会话发送消息

```bash
openclaw sessions send \
  --sessionKey "gstack-ceo" \
  --message "分析产品方向"
```

### 查看会话历史

```bash
openclaw sessions history --sessionKey gstack-dev
```

### 删除会话

```bash
openclaw sessions kill --sessionKey gstack-ceo
```

---

## ⚠️ 注意事项

1. **会话持久化：** 创建的会话会保存，除非手动删除
2. **成本控制：** 检查 Token 使用量，设置预算告警
3. **上下文延续：** 同一会话中的对话有记忆
4. **模型切换：** 修改配置后需要重新创建会话

---

## 📝 更新日志

| 日期 | 版本 | 更新内容 |
|------|------|----------|
| 2026-03-27 | v1.0 | 初始版本，配置 16 个角色的默认模型 |

---

*最后更新：2026-03-27*  
*维护者：kim201908*
