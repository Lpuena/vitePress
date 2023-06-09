# node配置
## 下载node包
在nodejs 官网找到
![img](/linuxNode.png)

使用 wget 命令下载
```shell
wget https://nodejs.org/dist/v18.16.0/node-v18.16.0-linux-x64.tar.xz
```
解压
```shell
tar -xf node-v18.16.0-linux-x64.tar.xz
```
## 配置环境变量
进入解压后的文件夹的bin目录,使用 `pwd` 获取路径

进入根目录 `/`，选择 etc/profile 文件使用自带的 vi 编辑

vi编辑器的使用：(命令行模式下)
- dd 删除该行
- x  删除光标所在位置的内容
- o  换行

在最后一行添加:

`export PATH=$PATH:你的目录/node-v18.16.0-linux-x64/bin`

然后执行 source profile

:::warning 全局变量的坑
只有手动执行了 `source etc/profile` 才可以成功的使用node命令

在当前用户的~目录下，编辑 .bashrc 文件，在最后使用 source profile 命令

如果没有使用bash命令工具，可能会造成切换用户后不主动加载 .bashrc 的情况
:::

