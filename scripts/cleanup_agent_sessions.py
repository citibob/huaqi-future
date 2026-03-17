#!/usr/bin/env python3
"""
Agent会话清理脚本
清理指定agent的历史会话，只保留最近5条

用法：
    python3 cleanup_agent_sessions.py <agent_id> [--keep N]
    
示例：
    python3 cleanup_agent_sessions.py 365          # 保留最近5条
    python3 cleanup_agent_sessions.py mosquito --keep 3  # 保留最近3条
"""
import os
import sys
import json
import shutil
from pathlib import Path
from datetime import datetime
import argparse

# OpenClaw agents目录
AGENTS_DIR = Path.home() / ".openclaw" / "agents"

def get_agent_sessions(agent_id):
    """获取agent的所有会话文件"""
    sessions_dir = AGENTS_DIR / agent_id / "sessions"
    
    if not sessions_dir.exists():
        print(f"❌ Agent '{agent_id}' 不存在")
        return []
    
    # 查找.jsonl文件（排除.lock和.deleted文件）
    sessions = []
    for f in sessions_dir.glob("*.jsonl"):
        if ".lock" not in f.name and ".deleted" not in f.name:
            sessions.append({
                'path': f,
                'name': f.name,
                'size': f.stat().st_size,
                'mtime': f.stat().st_mtime
            })
    
    # 按修改时间排序（最新的在前）
    sessions.sort(key=lambda x: x['mtime'], reverse=True)
    
    return sessions

def cleanup_sessions(agent_id, keep=5, dry_run=False):
    """清理会话文件，只保留最近N条"""
    sessions = get_agent_sessions(agent_id)
    
    if not sessions:
        print(f"⚠️ Agent '{agent_id}' 没有会话文件")
        return
    
    print(f"\n📊 Agent: {agent_id}")
    print(f"   当前会话数: {len(sessions)}")
    print(f"   保留数量: {keep}")
    
    if len(sessions) <= keep:
        print(f"   ✅ 会话数量少于{keep}，无需清理")
        return
    
    # 需要删除的会话
    to_delete = sessions[keep:]
    
    print(f"\n🗑️  将删除 {len(to_delete)} 个会话:")
    total_size = 0
    for s in to_delete:
        size_mb = s['size'] / 1024 / 1024
        total_size += size_mb
        date = datetime.fromtimestamp(s['mtime']).strftime("%Y-%m-%d %H:%M")
        print(f"   - {s['name'][:40]}... ({size_mb:.1f}MB, {date})")
    
    print(f"\n   总计: {total_size:.1f}MB")
    
    if dry_run:
        print(f"\n🔍 模拟运行，未实际删除")
        return
    
    # 执行删除
    confirm = input(f"\n确认删除? (y/n): ")
    if confirm.lower() != 'y':
        print("❌ 已取消")
        return
    
    # 删除文件
    deleted_count = 0
    for s in to_delete:
        try:
            # 移动到deleted目录而不是直接删除
            deleted_dir = s['path'].parent / "archive"
            deleted_dir.mkdir(exist_ok=True)
            
            # 重命名为deleted
            timestamp = datetime.now().strftime("%Y-%m-%dT%H-%M-%S")
            new_name = s['path'].stem + f".deleted.{timestamp}" + s['path'].suffix
            new_path = deleted_dir / new_name
            
            shutil.move(str(s['path']), str(new_path))
            print(f"   ✅ 已归档: {s['name']}")
            deleted_count += 1
        except Exception as e:
            print(f"   ❌ 删除失败: {s['name']} - {e}")
    
    # 更新sessions.json
    sessions_file = AGENTS_DIR / agent_id / "sessions" / "sessions.json"
    if sessions_file.exists():
        try:
            with open(sessions_file, 'r') as f:
                sessions_data = json.load(f)
            
            # 移除已删除的会话
            deleted_names = {s['name'] for s in to_delete}
            sessions_data = [s for s in sessions_data if s.get('sessionId', '') + '.jsonl' not in deleted_names]
            
            with open(sessions_file, 'w') as f:
                json.dump(sessions_data, f, indent=2)
            
            print(f"\n✅ 已更新 sessions.json")
        except Exception as e:
            print(f"⚠️ 更新sessions.json失败: {e}")
    
    print(f"\n✅ 清理完成！删除了 {deleted_count} 个会话")

def list_agents():
    """列出所有agent"""
    print("\n📋 可用Agent:")
    for d in AGENTS_DIR.iterdir():
        if d.is_dir() and not d.name.startswith('.'):
            # 统计会话数
            sessions = list(d.glob("sessions/*.jsonl"))
            sessions = [s for s in sessions if ".lock" not in s.name and ".deleted" not in s.name]
            print(f"   {d.name}: {len(sessions)} 个会话")

def main():
    parser = argparse.ArgumentParser(description="清理Agent会话文件")
    parser.add_argument('agent_id', nargs='?', help="Agent ID")
    parser.add_argument('--keep', '-k', type=int, default=5, help="保留的会话数量 (默认5)")
    parser.add_argument('--list', '-l', action='store_true', help="列出所有agent")
    parser.add_argument('--dry-run', '-n', action='store_true', help="模拟运行，不实际删除")
    
    args = parser.parse_args()
    
    if args.list:
        list_agents()
        return
    
    if not args.agent_id:
        parser.print_help()
        print("\n示例:")
        print("  python3 cleanup_agent_sessions.py 365")
        print("  python3 cleanup_agent_sessions.py mosquito --keep 3")
        print("  python3 cleanup_agent_sessions.py --list")
        return
    
    cleanup_sessions(args.agent_id, args.keep, args.dry_run)

if __name__ == "__main__":
    main()
