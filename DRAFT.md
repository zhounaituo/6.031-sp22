# Cheetsheet
#### Git
```bash
# 格式化 git log 
git config --global alias.lol "log --graph --oneline --decorate --color --all"

# 查看所有配置
git config --list

# 设置Git默认编辑器
git config --global core.editor "vim"

# 查看提交信息
git show [commit-id]

# 撤销某次提交，但不会影响历史记录，而是生成一个新的提交
git revert [commit-id]
```