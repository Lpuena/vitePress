# zsh终端
下载zsh和oh-my-zsh
安装[spaceship](https://spaceship-prompt.sh/)

在.zshrc 文件中添加(加载node)
```
source /etc/profile
```

在.spaceshiprc.zsh
```zsh
# Display time
SPACESHIP_TIME_SHOW=false

# Display username always
#SPACESHIP_USER_SHOW=always

# Do not truncate path in repos
SPACESHIP_DIR_TRUNC_REPO=false

# Add custom Ember section
# See: https://github.com/spaceship-prompt/spaceship-ember
#spaceship add ember

# Add a custom vi-mode section to the prompt
# See: https://github.com/spaceship-prompt/spaceship-vi-mode
#spaceship add --before char vi_mode
SPACESHIP_PROMPT_ORDER=(
  time
  dir
  git
  node
  exec_time
  line_sep
  battery
  sudo
  char
)
```