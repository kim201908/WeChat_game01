# gstack 角色模型配置

**最后更新：** 2026-03-27

---

## 🎯 角色 - 模型映射

| 角色 | 模型 | 说明 |
|------|------|------|
| `gstack:ceo` | `dashscope/qwen3-max-2026-01-23` | 战略决策 |
| `gstack:retro` | `dashscope/qwen3-max-2026-01-23` | 复盘总结 |
| `gstack:eng` | `dashscope/qwen3-coder-plus` | 架构设计 |
| `gstack:dev` | `dashscope/qwen3-coder-plus` | 代码开发 |
| `gstack:test` | `dashscope/qwen3-coder-plus` | 测试代码 |
| 其他所有角色 | `dashscope/qwen3.5-plus` | 通用任务 |

---

## 📋 使用方式

在钉钉中直接调用：

```
@gstack:ceo 分析产品
@gstack:dev 写代码
@gstack:review 审查
```

**主 Agent 会自动使用对应模型处理！**

---

*配置已保存到主 Agent 记忆*
