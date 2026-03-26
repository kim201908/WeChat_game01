# OpenClaw + gstack + GitHub 一人开发系统

**版本：** v1.0.0  
**创建时间：** 2026-03-27  
**作者：** Kim  
**项目：** 小红书法律获客系统

---

## 📋 目录

- [系统架构](#系统架构)
- [工具配置](#工具配置)
- [角色列表](#角色列表)
- [开发流程](#开发流程)
- [项目结构](#项目结构)
- [GitHub 配置](#github-配置)
- [钉钉集成](#钉钉集成)
- [自动化任务](#自动化任务)
- [常见问题](#常见问题)

---

## 系统架构

```
┌─────────────────────────────────────────────────────────┐
│                    用户 (Kim)                            │
│                     钉钉入口                             │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                   OpenClaw                               │
│  中枢神经：连接钉钉/浏览器/定时任务/MCP/GitHub            │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                   gstack (16 角色)                        │
│  专家大脑：产品/开发/测试/部署/GitHub/...                 │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                   GitHub                                 │
│  代码仓库：版本管理 / CI/CD / 协作                       │
└─────────────────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                阿里云 ECS                                │
│  部署环境：Docker + 自动化运营                           │
└─────────────────────────────────────────────────────────┘
```

---

## 工具配置

### OpenClaw 配置

**版本：** 2026.2.26  
**服务器：** 8.134.82.142 (root)  
**工作区：** `/root/.openclaw/workspace`

**配置文件：** `~/.openclaw/config.json`

```json
{
  "channels": {
    "clawdbot-dingtalk": {
      "enabled": true,
      "clientId": "dingxikqbhilqur2goat",
      "clientSecret": "***",
      "replyMode": "markdown"
    }
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "dashscope/qwen3.5-plus"
      }
    }
  },
  "models": {
    "providers": {
      "dashscope": {
        "baseUrl": "https://coding.dashscope.aliyuncs.com/v1",
        "apiKey": "sk-***"
      }
    }
  },
  "browser": {
    "enabled": true,
    "headless": true,
    "defaultProfile": "clawd"
  }
}
```

---

### gstack 配置

**技能路径：** `/root/.openclaw/workspace/skills/gstack-openclaw/`

**已安装角色 (16 个)：**

| 角色 | 职责 | 推荐模型 |
|------|------|----------|
| `gstack:ceo` | 产品规划 | qwen3-max |
| `gstack:eng` | 架构设计 | qwen3-coder-plus |
| `gstack:dev` | 代码开发 | qwen3-coder-plus |
| `gstack:review` | 代码审查 | qwen3.5-plus |
| `gstack:qa` | 测试设计 | qwen3.5-plus |
| `gstack:test` | 测试代码 | qwen3-coder-plus |
| `gstack:ship` | 发布部署 | qwen3.5-plus |
| `gstack:deploy` | DevOps | qwen3.5-plus |
| `gstack:docs` | 文档编写 | qwen3.5-plus |
| `gstack:retro` | 复盘总结 | qwen3-max |
| `gstack:office` | 需求澄清 | qwen3.5-plus |
| `gstack:browse` | 浏览器测试 | qwen3.5-plus |
| `gstack:status` | 进度追踪 | qwen3.5-plus |
| `gstack:github` | GitHub 集成 | qwen3.5-plus |
| `gstack:notify` | 消息通知 | qwen3.5-plus |
| `gstack:init` | 项目初始化 | qwen3.5-plus |

**项目上下文文件：** `GSTACK.md`

```markdown
# Project Context

## 项目名称
小红书法律获客系统

## 技术栈
- 语言：Python 3.11
- 框架：FastAPI
- 数据库：SQLite / PostgreSQL
- 部署：Docker + 阿里云 ECS

## 核心功能
1. 小红书内容调研
2. 自动内容生成
3. 自动发布笔记
4. 获客反馈追踪

## 团队规模
一人开发 (Kim + AI Agent 团队)
```

---

### GitHub 配置

**仓库：** `yourname/law-marketing` (私有)  
**CLI 工具：** `gh` (已安装)

**认证：**
```bash
gh auth login
# 选择 GitHub.com → HTTPS → Login with a web browser
```

**常用命令：**
```bash
# 创建仓库
gh repo create law-marketing --private

# 克隆仓库
gh clone git@github.com:yourname/law-marketing.git

# 创建 PR
gh pr create --title "feat: xxx" --body "描述"

# 查看状态
gh pr list
gh pr checks <PR 号>
```

---

## 角色列表

### 产品阶段

#### gstack:ceo
**职责：** 产品规划、需求分析、市场定位

**使用示例：**
```
@gstack:ceo 分析小红书法律获客产品
@gstack:ceo 设计 MVP 范围
@gstack:ceo 制定定价策略
```

**输出文件：** `docs/product.md`

---

#### gstack:office
**职责：** 需求澄清、方向校准、头脑风暴

**使用示例：**
```
@gstack:office 帮我看看这个产品方向
@gstack:office 澄清这个功能的需求
```

---

### 开发阶段

#### gstack:eng
**职责：** 架构设计、技术选型、数据模型

**使用示例：**
```
@gstack:eng 设计技术架构
@gstack:eng 设计数据库模型
@gstack:eng 选择技术方案
```

**输出文件：** `docs/architecture.md`

---

#### gstack:dev
**职责：** 编写生产级代码、Bug 修复、重构

**使用示例：**
```
@gstack:dev 实现用户登录模块
@gstack:dev 根据架构生成 API 代码
@gstack:dev 修复这个 Bug
@gstack:dev 添加单元测试
```

**输出文件：** `src/*.py`

---

#### gstack:review
**职责：** 代码审查、质量把控、优化建议

**使用示例：**
```
@gstack:review 审查 src/login.py
@gstack:review 检查代码安全问题
```

**输出文件：** `docs/review.md`

---

### 测试阶段

#### gstack:qa
**职责：** 测试策略、验收标准、测试计划

**使用示例：**
```
@gstack:qa 设计测试用例
@gstack:qa 制定验收标准
```

**输出文件：** `docs/test-plan.md`

---

#### gstack:test
**职责：** 生成测试代码、运行测试

**使用示例：**
```
@gstack:test 生成登录模块测试
@gstack:test 运行 pytest
```

**输出文件：** `tests/*.py`

---

### 部署阶段

#### gstack:deploy
**职责：** 部署脚本、CI/CD 配置、Docker

**使用示例：**
```
@gstack:deploy 生成 Dockerfile
@gstack:deploy 配置 GitHub Actions
```

**输出文件：** `Dockerfile`, `.github/workflows/*.yml`

---

#### gstack:ship
**职责：** 发布清单、Changelog、回滚方案

**使用示例：**
```
@gstack:ship 准备发布 v1.0.0
@gstack:ship 生成发布清单
```

**输出文件：** `docs/release.md`

---

#### gstack:github
**职责：** PR 管理、CI 状态、发布说明

**使用示例：**
```
@gstack:github 检查 PR 状态
@gstack:github 生成发布说明
@gstack:github 查看 CI 状态
```

---

### 运营阶段

#### gstack:docs
**职责：** 技术文档、API 文档、README

**使用示例：**
```
@gstack:docs 生成 API 文档
@gstack:docs 编写 README
```

**输出文件：** `README.md`, `docs/api.md`

---

#### gstack:retro
**职责：** 项目复盘、经验总结、改进建议

**使用示例：**
```
@gstack:retro 复盘这个项目
@gstack:retro 总结本周工作
```

**输出文件：** `docs/retro.md`

---

#### gstack:browse
**职责：** 浏览器测试、网页抓取、UI 验证

**使用示例：**
```
@gstack:browse 打开小红书
@gstack:browse 测试登录功能
```

---

#### gstack:status
**职责：** 项目状态追踪、下一步行动

**使用示例：**
```
@gstack:status 查看项目进度
@gstack:status 下一步做什么
```

---

#### gstack:notify
**职责：** 多渠道通知（飞书/Discord/钉钉）

**使用示例：**
```
@gstack:notify 发送发布通知
@gstack:notify 构建失败告警
```

---

#### gstack:init
**职责：** 项目初始化、骨架生成

**使用示例：**
```
@gstack:init 创建项目骨架
@gstack:init 初始化 GSTACK.md
```

---

## 开发流程

### 完整流程图

```
产品规划 → 架构设计 → 代码开发 → 代码审查 → 测试 → 部署 → 运营 → 复盘
   ↓           ↓           ↓           ↓        ↓      ↓      ↓      ↓
 CEO       ENG        DEV      REVIEW    QA    SHIP   CRON   RETRO
           ↓           ↓                    ↓      ↓      ↓
        DOCS        TEST                 DEPLOY  GITHUB NOTIFY
```

---

### 阶段 1：产品规划

**输入：** 产品想法  
**角色：** `gstack:ceo` + `gstack:office`  
**输出：** `docs/product.md`

**步骤：**
1. `@gstack:office 澄清产品需求`
2. `@gstack:ceo 分析产品定位`
3. 保存到 `docs/product.md`
4. `git add && git commit -m "docs: add product spec"`
5. `git push`

---

### 阶段 2：架构设计

**输入：** `docs/product.md`  
**角色：** `gstack:eng`  
**输出：** `docs/architecture.md`

**步骤：**
1. `@gstack:eng 设计技术架构`
2. 保存到 `docs/architecture.md`
3. `git add && git commit -m "docs: add architecture"`
4. `git push`

---

### 阶段 3：代码开发

**输入：** `docs/architecture.md`  
**角色：** `gstack:dev`  
**输出：** `src/*.py`

**步骤：**
1. `@gstack:dev 实现 XX 模块`
2. 保存到 `src/xx.py`
3. `git add && git commit -m "feat: add xx module"`
4. `git push`
5. GitHub 自动创建 PR

---

### 阶段 4：代码审查

**输入：** `src/*.py`  
**角色：** `gstack:review`  
**输出：** `docs/review.md`

**步骤：**
1. `@gstack:review 审查 src/xx.py`
2. 保存到 `docs/review.md`
3. GitHub PR Review 评论
4. `@gstack:dev 根据审查意见修复`
5. `git commit -m "fix: address review feedback"`
6. `git push`

---

### 阶段 5：测试

**输入：** `src/*.py`  
**角色：** `gstack:qa` + `gstack:test`  
**输出：** `tests/*.py`

**步骤：**
1. `@gstack:qa 设计测试用例`
2. `@gstack:test 生成测试代码`
3. 保存到 `tests/test_xx.py`
4. `git add && git commit -m "test: add xx tests"`
5. `git push`
6. GitHub Actions 自动运行 pytest

---

### 阶段 6：部署

**输入：** 测试通过的代码  
**角色：** `gstack:deploy` + `gstack:ship`  
**输出：** Docker 镜像 + 生产环境

**步骤：**
1. `@gstack:deploy 生成部署脚本`
2. `@gstack:ship 准备发布 v1.0.0`
3. GitHub 合并 PR → main
4. GitHub Actions 自动部署
5. `@gstack:github 生成发布说明`
6. GitHub Release

---

### 阶段 7：运营

**输入：** 生产环境  
**角色：** OpenClaw cron + browser  
**输出：** 自动化执行

**配置：**
```
每天 9:00 → 调研小红书
每天 10:00 → 生成内容
每天 11:00 → 发布笔记
实时 → 反馈到钉钉
```

---

### 阶段 8：复盘

**输入：** 项目数据  
**角色：** `gstack:retro`  
**输出：** `docs/retro.md`

**步骤：**
1. `@gstack:retro 复盘这个项目`
2. 保存到 `docs/retro.md`
3. `git add && git commit -m "docs: add retro"`
4. `git push`
5. 经验写入 `MEMORY.md`

---

## 项目结构

```
law-marketing/
├── .github/
│   └── workflows/
│       ├── ci.yml           # CI/CD
│       ├── notify.yml       # 钉钉通知
│       └── deploy.yml       # 部署
├── docs/
│   ├── product.md          # 产品文档
│   ├── architecture.md     # 架构设计
│   ├── review.md           # 审查报告
│   ├── test-plan.md        # 测试计划
│   ├── release.md          # 发布说明
│   ├── api.md              # API 文档
│   └── retro.md            # 复盘总结
├── src/
│   ├── crawler/            # 爬虫模块
│   │   ├── __init__.py
│   │   ├── xiaohongshu.py
│   │   └── test_xiaohongshu.py
│   ├── generator/          # 内容生成
│   │   ├── __init__.py
│   │   ├── content.py
│   │   └── test_content.py
│   ├── publisher/          # 自动发布
│   │   ├── __init__.py
│   │   ├── publish.py
│   │   └── test_publish.py
│   └── analytics/          # 数据分析
│       ├── __init__.py
│       └── analytics.py
├── tests/
│   ├── __init__.py
│   ├── conftest.py
│   └── integration/
├── GSTACK.md               # gstack 项目上下文
├── MEMORY.md               # 长期记忆
├── requirements.txt        # Python 依赖
├── Dockerfile             # Docker 配置
├── docker-compose.yml     # Docker 编排
├── .gitignore
└── README.md              # 项目说明
```

---

## GitHub 配置

### CI/CD 工作流

```yaml
# .github/workflows/ci.yml
name: CI/CD

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      
      - name: Install dependencies
        run: pip install -r requirements.txt
      
      - name: Run tests
        run: pytest tests/ -v --cov=src
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to ECS
        run: |
          ssh root@8.134.82.142 "cd /law-marketing && docker-compose up -d"
```

---

### 钉钉通知

```yaml
# .github/workflows/notify.yml
name: Notify DingTalk

on:
  pull_request:
    types: [opened, closed]
  issues:
    types: [opened, closed]
  workflow_run:
    workflows: ["CI/CD"]
    types: [completed]

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: Send to DingTalk
        uses: zcong1993/actions-ding@master
        with:
          dingToken: ${{ secrets.DINGTALK_TOKEN }}
          body: |
            {
              "msgtype": "markdown",
              "markdown": {
                "title": "GitHub 通知",
                "text": "## ${{ github.event.action == 'opened' && '🔔 新建' || '✅ 完成' }}\n\n**类型**: ${{ github.event_name }}\n**标题**: ${{ github.event.pull_request.title || github.event.issue.title }}\n**链接**: ${{ github.event.pull_request.html_url || github.event.issue.html_url }}"
              }
            }
```

---

## 钉钉集成

### 消息格式

**纯文本模式：** 简洁直接

**Markdown 模式：** 有限支持（标题、列表、代码块）

**媒体发送：**
```
[DING:IMAGE path="/root/.openclaw/media/xxx.jpg"]
[DING:FILE path="/root/.openclaw/workspace/xxx.html" name="文件名.html"]
```

---

### 定时任务

**配置方式：** OpenClaw cron

**示例：**
```
每天 9:00 → @gstack:ceo 调研市场需求
每天 10:00 → @gstack:dev 生成内容
每天 11:00 → browser 发布笔记
实时 → 反馈到钉钉
```

---

## 自动化任务

### 每日任务

| 时间 | 任务 | 角色/工具 |
|------|------|----------|
| 9:00 | 调研小红书热门话题 | browser |
| 10:00 | 生成 3 篇笔记内容 | gstack:dev |
| 11:00 | 自动发布笔记 | browser |
| 12:00 | 发送数据报告到钉钉 | notify |
| 20:00 | 整理当日获客反馈 | gstack:analyst |

---

### 每周任务

| 时间 | 任务 | 角色/工具 |
|------|------|----------|
| 周一 9:00 | 本周计划 | gstack:office |
| 周五 20:00 | 本周复盘 | gstack:retro |
| 周日 10:00 | 技能更新 | clawhub update |

---

### 每月任务

| 时间 | 任务 | 角色/工具 |
|------|------|----------|
| 1 号 9:00 | 月度规划 | gstack:ceo |
| 月底 20:00 | 月度复盘 | gstack:retro |
| 月底 21:00 | 备份数据 | exec backup |

---

## 常见问题

### Q1: 如何切换角色？

**A:** 在钉钉消息中使用 `@角色名` 前缀：
```
@gstack:ceo 分析产品
@gstack:dev 写代码
@gstack:review 审查
```

---

### Q2: 代码保存在哪里？

**A:** 直接保存到项目文件：
```
src/login.py
tests/test_login.py
docs/architecture.md
```

---

### Q3: 如何查看 GitHub PR 状态？

**A:** 使用 `@gstack:github`：
```
@gstack:github 检查 PR 状态
@gstack:github 查看 CI 状态
```

---

### Q4: 如何配置不同角色用不同模型？

**A:** 创建子 Agent 会话：
```bash
openclaw sessions spawn \
  --task "担任 gstack:ceo" \
  --label "ceo" \
  --model "dashscope/qwen3-max"
```

---

### Q5: 如何备份项目？

**A:** 使用 Git + 手动备份：
```bash
# Git 备份
git push origin main

# 手动备份
cp -r /root/.openclaw/workspace ~/openclaw_backups/$(date +%Y%m%d)
```

---

### Q6: 服务器无法访问 GitHub 怎么办？

**A:** 配置代理或使用镜像：
```bash
# 配置代理
export https_proxy=http://proxy-server:port

# 或使用 Git 镜像
git clone https://gitee.com/mirror/law-marketing.git
```

---

### Q7: 如何调试浏览器自动化？

**A:** 使用 `@gstack:browse` + 截图：
```
@gstack:browse 打开小红书
截图确认 → 发送到钉钉
```

---

## 更新日志

| 版本 | 日期 | 更新内容 |
|------|------|----------|
| v1.0.0 | 2026-03-27 | 初始版本 |

---

## 后续调整

本文档会根据实际使用情况持续调整，调整方向：

1. **角色优化** - 根据实际需求调整角色职责
2. **流程简化** - 减少不必要的步骤
3. **自动化增强** - 增加更多 cron 任务
4. **模型配置** - 优化各角色的模型选择
5. **GitHub 集成** - 深化 CI/CD 和通知

---

*最后更新：2026-03-27*  
*维护者：Kim*
