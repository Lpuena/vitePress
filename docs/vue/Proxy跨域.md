# Proxy跨域

## 什么是跨域

主要是出于浏览器的同源策略限制，它是浏览器最核心也最基本的安全功能。

当一个请求url的 协议、域名、端口 三者之间任意一个与当前页面url不同即为跨域。

例如 http://xxxx.com -> https://xxxx.com 存在跨域 协议不同

例如 127.x.x.x:8001 -> 127.x.x.x:8002 存在跨域 端口不同

例如 www.xxxx.com -> www.yyyy.com 存在跨域 域名不同

## 如何解决跨域

1. jsonp 这种方式在之前很常见，他实现的基本原理是利用了 HTML 里 script 元素标签没有跨域限制
   动态创建 script 标签，将 src 作为服务器地址，服务器返回一个 callback 接受返回的参数

```js
function clickButton() {
  let obj, s
  obj = {"table": "products", "limit": 10}; //添加参数
  s = document.createElement("script"); //动态创建script
  s.src = "接口地址xxxxxxxxxxxx" + JSON.stringify(obj);
  document.body.appendChild(s);
}

//与后端定义callback名称
function myFunc(myObj) {
  //接受后端返回的参数
  document.getElementById("demo").innerHTML = myObj;
}
```

:::tip
只能 get 请求
:::

2. cors 设置 CORS 允许跨域资源共享 需要后端设置

```json
{
  "Access-Control-Allow-Origin": "http://web.xxx.com"
  //可以指定地址
}
```

```json
{
  "Access-Control-Allow-Origin": "*"
  //也可以使用通配符 任何地址都能访问 安全性不高
}
```

3. 使用Vite proxy 或者 node代理 或者 webpack proxy 他们三种方式都是代理
   我们先创建一个接口使用express简单构建一下

```js
const express = require('express')
const app = express()

//创建get请求
app.get('/xm', (req, res) => {
  res.json({
    code: 200,
    message: "请求成功"
  })
})
//端口号9001
app.listen(9001)
复制代码
```

在 vite 项目的 fetch 请求一下

```vue

<script lang="ts" setup>
import {ref, reactive} from 'vue'

fetch('http://localhost:9001/xm')
</script>
```
发现是存在跨域的,这时候我们就可以配合vite的代理来解决跨域 用法如下

需要在vite.config.js/ts 进行配置
```js
export default defineConfig({
  plugins: [vue()],
  server:{
     proxy:{
        '/api':{
            target:"http://localhost:9001/", //跨域地址
            changeOrigin:true, //支持跨域
            rewrite:(path) => path.replace(/^\/api/, "")//重写路径,替换/api
           //  当后端接口包含/api的时候 像http://localhost:9001/api/user这种，
           //  直接不用写rewrite，就可以使用
        }
     }
  }
})
```
fetch 替换/api 他会截取/api 替换成 target地址
```vue

<script lang="ts" setup>
import {ref, reactive} from 'vue'

fetch('/api/xm')
</script>
```