#!/usr/bin/env python3
"""
gstack 角色 - 模型路由脚本

功能：根据角色名称自动选择对应的大模型
"""

import json
from pathlib import Path

# 配置文件路径
CONFIG_PATH = Path("/root/.openclaw/workspace/skills/gstack-openclaw/models-config.md")

def load_model_config():
    """加载模型配置文件"""
    models = {}
    
    # 简单解析 markdown 中的 JSON
    content = CONFIG_PATH.read_text()
    
    # 找到 JSON 块
    start = content.find('```json')
    end = content.find('```', start + 7)
    
    if start != -1 and end != -1:
        json_str = content[start+7:end].strip()
        config = json.loads(json_str)
        
        for role, info in config.items():
            models[role] = info['model']
    
    return models

def get_model_for_role(role_name):
    """根据角色名获取模型"""
    models = load_model_config()
    
    # 移除 "gstack:" 前缀
    role = role_name.replace('gstack:', '').lower()
    
    return models.get(role, 'dashscope/qwen3.5-plus')

# 测试
if __name__ == '__main__':
    roles = ['ceo', 'dev', 'review', 'eng', 'qa']
    
    print("角色 - 模型映射：")
    for role in roles:
        model = get_model_for_role(f'gstack:{role}')
        print(f"  gstack:{role} → {model}")
