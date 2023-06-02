
## Git的配置

>在 Git Bash 中 输入用户名和邮箱来配置git信息

```bash
git config --global user.name "xx"
git config --global user.email "xxx@xx.com"
```
--global 全局生效，配置一次即可。

在C:/Users/用户名文件夹/.gitconfig 文件中，可以查看全局配置的git信息。

### 检查配置信息

```bash
# 查看所有的全局配置项
git config --list --global
# 查看指定的全局配置项
git config user.name
git config user.email 
```
### 设置git代理


> 假设代理服务器的配置为：Socks5 代理，端口为10808，地址为：127.0.0.1,则直接在命令行输入如下命令：
```shell
git config --global http.proxy 'socks5://127.0.0.1:10808'
git config --global https.proxy 'socks5://127.0.0.1:10808'
```
> 如果用http代理，则输入的命令如下：
```shell
git config --global https.proxy http://127.0.0.1:10809
git config --global https.proxy https://127.0.0.1:10809
```
#### 取消git代理设置
```shell
git config --global --unset http.proxy
git config --global --unset https.proxy
```
### 获取帮助信息

>可以使用给git help命令，无需联网即可在浏览器中打开帮助手册

```bash
# 想要获取 git config 命令的快速参考
git config -h
```

>如果不想查看完整的的手册，可以用 -h 选项获得更简明的 ” help “ 输出

```bash
# 想要获取 git config 命令的快速参考
git config -h
```

## Git的基本操作

### 获取 Git 仓库的两种方法

1. 将尚未进行版本控制的本地目录**转换**为 Git 仓库
2. 从其他服务器克隆一个已存在的 Git 仓库

以上两种方法都能够在自己的电脑上得到一个可用的 Git 仓库。

### 在现有目录中初始化仓库
>如果自己有一个尚未进行版本控制的项目目录，想用 Git 来控制，需要执行：


1. 在项目目录中，通过鼠标右键打开 ”Git Bash“
2. 执行 `git init` 命令将当前的目录转化为 Git 仓库

`git init` 命令会创建一个名为 `.git` 的隐藏目录，**这个 `.git` 目录就是当前项目的 Git 仓库**，里面包含了**初始的必要文件**
，这些文件是 Git 仓库的**必要组成部分**。

### 工作区中文件的4种状态

工作区中的每一个文件可能有**4种状态**，这四种状态共分为两大类
![img](/git.png)

* 未被Git管理
* 未修改--工作区中的文件内容与仓库文件**内容相同**
* 已修改--工作区中的文件内容与仓库文件**内容不一致**
* 已暂存--工作区中被修改的文件已被放到暂存区，准备将修改后的文件保存到 Git 仓库中

:::tip
Git 操作的终极结果：让工作区中的文件都处于”未修改“的状态。
:::

### 检查文件的状态

> 使用 git status 命令查看文件处于什么状态
```bash
$ git status
On branch master

No commits yet

Untracked files:
(use "git add <file>..." to include in what will be committed)
index.html

nothing added to commit but untracked files present (use "git add" to track)
```

在状态报告中，可以看到新建的 `index.html` 文件出现在 **Untracked files**（未被跟踪的文件）下面。
未跟踪的文件意味着 Git 在之前的快照（提交）中没有这些文件；Git 不会自动将之纳入跟踪范围，除非明确地告诉它”我需要使用 Git
跟踪管理该文件“。

### 跟踪新文件
> 使用命令 git add 开始跟踪一个文件。

```bash
git add .
```

> 再运行 git status 命令，可以看到文件在 Changes to be committed 下面，说明已经被跟踪了，并处于暂存状态。

### 提交更新

>缓存区有文件等待被提交到 Git 仓库中进行保存。可以执行 git commit 命令进行提交。其中-m选项后面是本次的提交信息，用来对提交的内容做进一步的描述

```bash
git commit -m "新建了index.html文件"
```

### 对已提交的文件进行修改
文件被 Git 跟踪，并且工作区和 Git 仓库中的文件内容保持一致，当我们修改了工作区中的文件内容后，再次运行 git status 和 git status -s 命令，得到如下结果：

```bash
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   index.html       ##红色  修改没放到暂存区

no changes added to commit (use "git add" and/or "git commit -a")


$ git status -s
 M index.html

```
文件出现在 Changes not staged for commit 这行下面，说明**已跟踪文件的内容发生了变化，但还没没有放到暂存区。**

> 修改过的、没有放入暂存区的文件前面有**红色**的**M**标记。

### 暂存已修改的文件

> git add 命令 有多个功能

1. 可以用它开始跟踪新文件
2. 把**已跟踪的、且已修改**的文件放到**暂存区**
3. 把有冲突的文件标记为已解决状态

```bash
$ git add .       ##把已修改的文件放入暂存区

$ git status      
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   index.html     ##绿色   修改且放到了暂存区

```

### 提交已暂存的文件

> git commit -m "xxx"

### 撤销对文件的修改

> git checkout -- index.html 命令，撤销对index.html文件的修改

### 取消暂存的文件

> 如果需要从暂存区中移除对应的文件，可以使用：
>
> git reset HEAD 要移除的文件名称、
>
> git reset HEAD .      移除暂存区全部文件

### 跳过暂存区

> 标准流程是：工作区 => 暂存区 => Git仓库
>
> 有时候这样过于繁琐，可以跳过暂存区，直接将工作区中的修改提交到 Git 仓库，流程简化为了：工作区 => Git仓库
>
> 给 commit 加上 -a 选项。可以跳过 git add 步骤

```bash
git commit -a -m "描述信息"
```

### 移除文件
> 从 Git 仓库中移除文件的方式有两种：
>
> 1. 从Git仓库和工作区中同时移除对应的文件
> 2. 只从 Git 仓库中移除指定的文件，但保留工作区对应的文件

```bash
# 从 git 仓库和工作区同时移除 index.html 文件
git rm -f index.html

# 只从 git 仓库中移除 index.html 但保留工作区中的 index.html 文件
git rm --cached index.html
```

### 忽略文件
> 一般有些文件不需要纳入 Git 的管理，也不希望它总出现在未跟踪文件列表。这种情况下，我们可以创建一个名为 .gitignore 的配置文件，列出要忽略的文件的匹配模式。

文件 `.gitignore` 的格式规范如下：

1. 以 **# 开头** 的是注释
2. 以 **/ 结尾** 的是目录
3. 以 **/ 开头** 防止递归
4. 以 **！开头** 表示取反
5. 可以使用 glob 模式 进行文件和文件夹的匹配（glob指简化了的正则表达式）

### glob 模式

> 所谓的 glob 模式是指简化了的正则表达式:

1. **星号*** 匹配**零个或多个任意字符**
2. **[abc]** 匹配**任何一个列在方括号中的字符**
3. **问号?** 只**匹配一个任意字符**
4. 在方括号中使用**短划线**分隔两个字符，表示所有在这两个字符范围内的都可以匹配（比如[0-9]表示匹配所有的0到9的数字）
5. **两个星号**** 表示**匹配任意中间目录**（比如 a/**/z 可以匹配 a/z、a/b/z 或a/b/c/z 等）

### .gitignore 文件的例子

 ```bash
 # 忽略所有的 .a 文件
 *.a
 
 # 但跟踪所有的lib.a 即便前面忽略了 .a 文件
 !lib.a
 
 # 只忽略当前目录下的 TODO 文件，而不忽略 subdir/TODO
 /TODO
 
 # 忽略任何目录下名为 build 的文件夹
 build/
 
 # 忽略 doc/notes.txt，但不忽略 doc/server/arch.txt
 doc/*.txt
 
 # 忽略 doc/ 目录及其所有子目录下的 .pdf 文件
 doc/**/*.pdf
 ```

### 查看提交历史

> 希望回顾项目的提交历史，可以使用 ==git log== 这个简单且有效的命令

```bash
# 只展示最新的两条提交历史，数字可以按需进行填写
git log -2

# 在一行上展示最近两条提交历史的信息
git log -2 --pretty=oneline

# 在一行上展示最近两条提交历史的信息，并自定义输出的格式
# %h 提交的简写哈希值    %an 名字    %ar 作者修订日期，按多久以前的方式显示   %s 提交说明
git log -2 --pretty=format:"%h | %an | %ar | %s"
```

### 回退到指定的版本

```bash
# 在一行上展示所有的提交历史
git log --pretty=oneline

# 使用 git reset -- hard 命令，根据指定的提交 ID 回退到指定版本
git reset --hard <CommitID>

# 在旧版本中使用 git reflog --pretty=online 命令，查看命令操作的历史
git reflog --pretty=oneline

# 再次根据最新的提交 ID，跳转到最新的版本
git reset --hard <CommitID>
```





## 生成 SSH key

1. 打开 Git Bash

2. 
```bash
   ssh-keygen -t rsa -b 4096 -C "邮箱地址"
   ```

3. 连续敲击三次回车，即可在 C:\Users\用户名文件夹\ .ssh目录中生成id_rsa 和 id_rsa.pub 两个文件。

#### 检测 SSH key 是否配置成功

打开 Git Bash 输入下面命令

```bash
ssh -T git@github.com
```

然后输入 yes

```bash
The authenticity of host 'github.com (127.0.0.1)' can't be established.
ED25519 key fingerprint is SHA256:+DiY3wvvV6TuJJhbpZisF/zLDA0zPMSvHdkr4UvCOqU.
This key is not known by any other names
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
```

成功后 如下代码

```bash
Warning: Permanently added 'github.com' (ED25519) to the list of known hosts.
Hi Dotzzp! You've successfully authenticated, but GitHub does not provide shell access.
```

## 本地仓库与远程仓库

#### 本地仓库和远程仓库的链接

```bash
# 后面的代码是创建项目后 选择 ssh 提供的地址
git remote add origin git@github.com:Dotzzp/TodoList-practice.git
```

#### 将本地仓库推送到远程仓库

```bash
# 第一次推送(推送到master分支) 必须这么写   后续 可以直接 使用 git push
git push -u origin master
```

#### 将远程仓库克隆到本地

打开 Git Bash 输入命令

```bash
git clone -b 分支名 远程仓库地址
```

## 分支

#### 查看分支列表

```bash
git branch
```

#### 创建分支

```bash
git branch 分支名称
```

#### 切换分支

```bash
git checkout 分支名称
```

#### 分支的快速创建和切换

```bash
# 创建指定分支，并立即切换到新分支上：
git checkout -b 分支名称
```

#### 合并分支

> 功能分支的代码开发测试完毕后，可以使用如下命令，将完成后的代码合并到 master 主分支上

```bash
# 1.切换到 master 分支
git checkout master

# 2.在 master 分支上运行 git merge 命令，将 login 分支的代码合并到 master 分支
git merge login
```

#### 删除分支

```bash
git branch -d 分支名称
```

#### 将本地分支推送到远程仓库

>如果是第一次将本地分支推送到远程仓库，需要运行如下的命令：

```bash
# -u 表示把本地分支和远程分支进行关联，只在第一次推送的时候需要带 -u 参数
git push -u 远程仓库的别名 本地分支名称：远程分支名称

# 实际案例：
git push -u origin payment:pay

# 如果希望远程分支的名称和本地分支名称保持一致，可以对命令进行简化：
git push -u origin payment
```

#### 查看远程仓库所有的分支列表

```bash
git remote show 远程仓库名称
```

#### 跟踪分支

> 跟踪分支指的是：从远程仓库中，把远程分支下载到本地仓库中。

```bash
# 从远程仓库中，把对应的远程分支下载到本地仓库，保持本地分支和远程分支名称相同
git checkout 远程分支的名称

# 示例：
git checkout pay

# 从远程仓库中，把对应的远程分支下载到本地仓库，并把下载的本地分支进行重命名
git checkout -b 本地分支名称 远程仓库名称/远程分支名称

# 示例
git checkout -b payment origin/pay
```

#### 拉取远程分支的最新的代码

```bash
# 从远程仓库，拉取当前分支最新的代码，保持当前分支的代码和远程分支代码一致
git pull
```

#### 删除远程分支

```bash
# 删除远程仓库中，指定名称的远程分支
git push 远程仓库名称 --delete 远程分支名称
# 示例
git push origin --delete pay
```
