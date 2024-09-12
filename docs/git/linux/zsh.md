# zsh终端
下载zsh和oh-my-zsh

## 在winows下安装zsh
[Windows在git-bash安装zsh](https://juejin.cn/post/7122882640998301733)

解压 zsh 压缩文件
这里推荐使用 [peazip.github.io](https://peazip.github.io/) 进行解压。
:::warning
一定要先解压到文件夹，再将内容覆盖到git根目录
:::
> win10用oh my zsh 安装spaceship主题，有点问题

使用了[Manual](https://spaceship-prompt.sh/getting-started/)
需要修改.zshrc文件中的内容
```zsh
source "$HOME/.zsh/spaceship/spaceship.zsh"
```

> 安装Powerline Font 也有问题

我使用了[DejaVuSansMono Nerd Font](https://www.nerdfonts.com/)

在vscode中使用`DejaVuSansM Nerd Font`字体重启后应用

:::tip
直接使用 JetBrains Mono 字体(Regular)
:::

## spaceship主题
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
  package
  node
  exec_time
  line_sep
  battery
  sudo
  char
)
```
