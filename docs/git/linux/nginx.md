# Nginx

## 安装

1. 安装gccs

> 安装 nginx 需要先将官网下载的源码进行编译，编译依赖 gcc 环境，如果没有 gcc 环境，则需要安装：

```shell
yum install gcc-c++

apt install build-essential
```

2. PCRE pcre-devel 安装

> PCRE(Perl Compatible Regular Expressions) 是一个Perl库，包括 perl 兼容的正则表达式库。
> nginx 的 http 模块使用 pcre 来解析正则表达式，所以需要在 linux 上安装 pcre 库，pcre-devel 是使用 pcre
> 开发的一个二次开发库。nginx也需要此库。命令：

```shell
yum install -y pcre pcre-devel

apt install libpcre3 libpcre3-dev
```

3. zlib 安装

> zlib 库提供了很多种压缩和解压缩的方式， nginx 使用 zlib 对 http 包的内容进行 gzip ，所以需要在 Centos 上安装 zlib 库。

```shell
yum install -y zlib zlib-devel

apt install zlib1g zlib1g-dev
```

4. OpenSSL 安装

> OpenSSL 是一个强大的安全套接字层密码库，囊括主要的密码算法、常用的密钥和证书封装管理功能及 SSL 协议，并提供丰富的应用程序供测试或其它目的使用。
> nginx 不仅支持 http 协议，还支持 https（即在ssl协议上传输http），所以需要在 Centos 安装 OpenSSL 库。

```shell
yum install -y openssl openssl-devel

apt install openssl libssl-dev
```

5. 下载Nginx

```shell
wget https://nginx.org/download/nginx-1.22.0.tar.gz 
```

6. 解压nginx

```shell
tar -zxvf nginx-1.22.0.tar.gz
cd nginx-1.22.0
```

7. 执行nginx-configure文件

```shell
./configure
```

8. make命令编译

> 执行完后会有一个MakeFile文件夹
> make 是一个命令工具，它解释 Makefile 中的指令（应该说是规则）。在 Makefile文件中描述了整个工程所有文件的编译顺序、编译规则

```shell
make
make install
```

9. 查询nginx 安装目录

```shell
whereis nginx
```

10. 进入安装目录执行nginx

```shell
cd /usr/local/nginx/sbin

./nginx
```

## 常用命令

配置nginx环境变量
使用 `whereis nginx` 找到 nginx 安装目录
在 etc/profile 中添加环境变量(拼接在node后面)
`export PATH=$PATH:/node-v14.19.1-linux-x64/bin:/usr/local/nginx/sbin`

查看nginx版本号

```shell
nginx -v
```

```shell
nginx -V
```

启动nginx
> 直接执行 nginx 即可

停止nginx
> stop 是立即停止

```shell
nginx -s stop
```

> quit 是一个优雅的关闭方式，Nginx 在退出前完成已经接受的请求处理

```shell
nginx -s quit
```

重载nginx配置文件

```shell
nginx -s reload
```

查看nginx进程

```shell
ps -ef | grep nginx
```

> `ps -ef` 输出标准格式的linux进程命令
>
> `grep nginx` grep命令 是查找， 是一种强大的文本搜索工具 我们这儿是查找nginx

## Nginx配置文件

查找nginx配置文件

```shell
nginx -t 
```

> 检查配置文件是否有语法错误

## 打开配置文件

Nginx 的主配置文件是 nginx.conf，这个配置文件一共由三部分组成，分别为**全局块**、**events块**和**http块**。

在http块中，又包含http全局块、多个server块。

每个server块中，可以包含server全局块和多个location块。在同一配置块中嵌套的配置块，各个之间不存在次序关系

### 1. 全局快

全局块是默认配置文件从开始到events块之间的一部分内容，主要设置一些影响 Nginx 服务器整体运行的配置指令，因此，这些指令的作用域是
Nginx 服务器全局。

- user [user] [group]  指定可以运行nginx服务的用户和用户组，只能在全局块配置 user指令在Windows上不生效，如果你制定具体用户和用户组会报警告
- worker_processes nginx 进程数量 worker_processes 比如设置为2 nginx 将会开启一个 master 进程和2两个 worker 进程
- pid logs/nginx.pid 存放 pid 文件
- error_log logs/error.log; 全局错误日志类型 debug info warn error 存放地址

### 2. events块

- events块涉及的指令主要影响 Nginx 服务器与用户的网络连接。常用到的设置包括是否开启对多 worker
  process下的网络连接进行序列化，是否允许同时接收多个网络连接，选取哪种事件驱动模型处理连接请求，每个 worker
  process可以同时支持的最大连接数等

- accept_mutex 默认开启-开启之后 nginx
  的多个 worker 将会以串行的方式来处理，只会有一个 worker 将会被唤起，其他的 worker 继续睡眠，如果不开启将会造成**惊群效应
  **多个 worker 全部唤起不过只有一个 Worker 能获取新连接，其它的 Worker 会重新进入休眠状态

- worker_connections 单个进程最大连接数（最大连接数=连接数+进程数）

### 3. http块

http块是 Nginx 服务器配置中的重要部分，代理、缓存和日志定义等绝大多数的功能和第三方模块的配置都可以放在这个模块中。

- include 指令，用于引入其他的配置文件
- default_type 如果 Web 程序没设置，Nginx 也没对应文件的扩展名，就用 Nginx 里默认的 default_type 定义的处理方式。default_type
  application/octet-stream; #nginx默认文件类型
- log_format指令，用于定义日志格式，此指令只能在http块中进行配置
- sendfile 简单来说就是启用 `sendfile()` 系统调用来替换 `read()` 和 `write()` 调用，减少系统上下文切换从而提高性能，当
  nginx
  是静态文件服务器时，能极大提高 nginx 的性能表现
- keepalive_timeout HTTP 有一个 KeepAlive 模式，它告诉 webserver 在处理完一个请求后保持这个 TCP
  连接的打开状态。若接收到来自客户端的其它请求，服务端会利用这个未被关闭的连接，而不需要再建立一个连接。
- gzip 开启 Gzip 压缩功能， 可以使网站的 css、js 、xml、html 文件在传输时进行压缩，提高访问速度, 进而优化 Nginx 性能

### 4. server块

每一个http块都可以包含多个server块，而每个server块就相当于一台虚拟主机，它内部可有多台主机联合提供服务，一起对外提供在逻辑上关系密切的一组服务

- listen指令的配置非常灵活，可以单独制定 ip，单独指定端口或者同时指定 ip 和端口

```
listen 127.0.0.1:8000;  #只监听来自127.0.0.1这个IP，请求8000端口的请求
listen 127.0.0.1; #只监听来自127.0.0.1这个IP，请求80端口的请求（不指定端口，默认80）
listen 9999; #监听来自所有IP，请求9999端口的请求
listen *:9999; #和上面效果一样
listen localhost:8000; #和第一种效果一致
```

- server_name nginx 允许一个虚拟主机有一个或多个名字，也可以使用通配符"*"来设置虚拟主机的名字 支持 ip 域名 通配符 正则等

```
server_name  localhost;
```

### 5.location块

每个server块中可以包含多个location块。在整个Nginx配置文档中起着重要的作用，而且Nginx服务器在许多功能上的灵活性往往在location指令的配置中体现出来

location 指令可以分为以下 3 类：

- 前缀字符串匹配
- 正则表达式匹配
- 用于内部跳转的命名location

### 前缀字符串匹配

- 精确匹配 =
- 前缀匹配 ^~（立刻停止后续的正则搜索）
- 按文件中顺序的正则匹配 ~或~*
- 匹配不带任何修饰的前缀匹配。

### location root

root 指定目录的上级目录，并且该上级目录要含有locatoin指定名称的同名目录。

```
location /img/ {
	root /var/www/image;
}
```

> 若按照这种配置的话，则访问/img/目录下的文件时，nginx会去/var/www/image/img/目录下找文件

## 反向代理

### Nginx反向代理的配置语法

反向代理中的常用指令：

```
proxy_pass 
proxy_set_header 
```

> proxy_pass 该指令用来设置被代理服务器地址，可以是主机名称、IP地址加端口号形式。


案例1 代理到哔哩哔哩

```nginx configuration
location / {
   root   html;
   index  index.html index.htm;
   proxy_pass http://bilibili.com;
}
```

> 使用https会报错
> 访问/就会被转到哔哩哔哩


案例2 nginx反向代理解决跨域
前端代码

```ts
a.onclick = () => {
  let xhr = new XMLHttpRequest()

  xhr.open('GET', '/api/portal/list')

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log(xhr.responseText);
    }
  }

  xhr.send(null)
}
```

express 服务端代码

```ts
const express = require('express')

const app = express()


app.get('/portal/list', (req, res) => {
  res.json({
    code: 200,
    message: "搞咩啊"
  })
})

app.listen(9000, () => {
  console.log('success');
})
```

nginx 配置文件

```nginx configuration
location /api/ {
    proxy_pass http://localhost:9000/;
}
```

截取到 `/api/` 将会转发到 `http://localhost:9000/`

proxy_set_header

该指令可以更改Nginx服务器接收到的客户端请求的请求头信息，然后将新的请求头发送给代理的服务器

proxy_set_header X-Real-IP $remote_addr;

proxy_set_header X-Real-Port $remote_port;

proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

三个header分别表示：

- X-Real-IP 客户端或上一级代理ip
- X-Real-Port 客户端或上一级端口
- X-Forwarded-For 包含了客户端和各级代理ip的完整ip链路

> 其中X-Real-IP是必需的，后两项选填。当只存在一级nginx代理的时候 `X-Real-IP` 和 `X-Forwarded-For`
> 是一致的，而当存在多级代理的时候，`X-Forwarded-For`
> 就变成了如下形式:
>
> `$remote_addr` 是前一节点的IP，并不一定是用户的真实IP。

## Nginx-Vue-History-404问题

Vue histroy 模式 跳转路由404 问题

问题原因

服务器是根据页面路由，去按路径寻找资源的。我们打包好的web站点只有一个html页面，不存在其他资源目录下的html，服务器找不到对应页面所以才报404。

解决方案
```nginx configuration
try_files $uri $uri/ /index.html;
```
如果给出的file都没有匹配到，则重新请求最后一个参数给定的uri，就是新的location匹配

常见的变量：

- $uri 当前请求的 URI，但不含“？”后的参数
- $args 当前请求的参数，即“？”后的宇符串
- $arg_xxx 当前请求里的某个参数，“arg ”后是参数的名字
- $http_xxx 当前请求里的 xxx 头部对应的值
- $sent_http_xxx 返回给客户端的响应头部对应的值
- $remote_addr 客户端IP 地址。
- $http_cookie 获取cookie值
- $cookie_xxx 当前请求的cookie xxx对应的值
- $request_uri 浏览器发起的不作任何修改的请求的url中的path 如在www.baidu.com/p1/file?d=111, 其值为/p1/file?d=111
- $uri 指当前的请求URI，不包括任何参数，反映任何内部重定向或index模块所做的修改
- $request_method 请求方法



## Nginx-Go-Access-日志分析器
GoAccess 是一款开源、实时，运行在命令行终端下的 web 日志分析工具。该工具提供快速、多样的 HTTP 状态统计，
可以令管理员不再纠结于统计各类数据，和繁杂的指令以及一大堆管道/正则表达式说 bye bye
```shell
wget http://tar.goaccess.io/goaccess-1.2.tar.gz
tar -xzvf goaccess-1.2.tar.gz
cd goaccess-1.2/
./configure --enable-utf8 --enable-geoip=legacy
make
make install
```

操作手册
[GoAccess - 中文站 - 可视化 Web 日志分析工具](https://www.goaccess.cc/?mod=man)

开启实时HTML报告分析（webSocket）
```shell
goaccess access.log -a -o ../html/report.html --real-time-html --log-format=COMBINED
```
[选项](https://xiaoman.blog.csdn.net/article/details/124546293)

## Nginx-负载均衡upstream
基本语法
upstream的基本语法如下，一个upstream需要设置一个名称，这个名称可以在server里面当作proxy主机使用。
```nginx configuration
http {
    upstream my_backend {
        server backend1.example.com;
        server backend2.example.com;
        server backend3.example.com;
    }

    server {
        listen 80;
        server_name myserver.example.com;

        location / {
            proxy_pass http://my_backend;
        }
    }
}

```
### 默认状态是按照轮询的方式去做负载的
使用express 启动三个服务 分别是9001 9002 9003
```js
const express = require('express')
var num = 1
const app = express()
 
app.get('/list',(req,res)=>{
    res.json({
        code:200,
        message:"Nginx 负载均衡9001"
    })
    console.log("Nginx 负载均衡9001",num)
   num++
})
//------------------------------9001
app.listen(9001,()=>{
    console.log('9001 success')
})
 
//-----------------------------------
const express = require('express')
var num = 1
const app = express()
 
app.get('/list',(req,res)=>{
    res.json({
        code:200,
        message:"Nginx 负载均衡9002"
    })
    console.log("Nginx 负载均衡9002",num)
    num++
})
//------------------------------9002
app.listen(9002,()=>{
    console.log('9002 success')
})
 
//--------------------------------
 
const express = require('express')
var num = 1
const app = express()
 
app.get('/list',(req,res)=>{
    
    res.json({
        code:200,
        message:"Nginx 负载均衡9003"
    })
    console.log("Nginx 负载均衡9003",num)
    num++
})
//------------------------------9003
app.listen(9003,()=>{
    console.log('9003 success')
})
```
### 权重weight
```nginx configuration
upstream  node {
    server 127.0.0.1:9001 weight=3;
    server 127.0.0.1:9002 weight=2;
    server 127.0.0.1:9003 weight=1;
}
```
> 权重越大服务器承载的并发就越高

### fail_timeout backup
fail_timeout是故障等待超时时间

backup是备用服务器参数，可以为一个upstream设置一个backup的server，在生产server全部都出问题之后，可以自动切换到备用server上，为回复服务争取时间
```nginx configuration
upstream  node {

    server 127.0.0.1:9001 fail_timeout=60;

    server 127.0.0.1:9002 fail_timeout=20;

    server 127.0.0.1:9003 backup;

}
```
