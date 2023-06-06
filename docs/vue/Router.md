# Router

## 前言

因为vue是单页应用不会有那么多 html 让我们跳转 所有要使用路由做页面的跳转，
Vue 路由允许我们通过不同的 URL 访问不同的内容。通过 Vue 可以实现多视图的单页Web应用

## 安装

构建前端项目

```shell
npm init vue@latest
//或者
npm init vite@latest
```

:::tip
使用 Vue3 安装对应的 router4 版本

使用 Vue2 安装对应的 router3 版本
:::

```shell
npm install vue-router@4
```

在 src 目录下面新建 router 文件 然后在 router 文件夹下面新建 index.ts

```ts
//引入路由对象
import {createRouter, createWebHistory, createWebHashHistory, createMemoryHistory, RouteRecordRaw} from 'vue-router'

//vue2 mode history vue3 createWebHistory
//vue2 mode  hash  vue3  createWebHashHistory
//vue2 mode abstact vue3  createMemoryHistory

//路由数组的类型 RouteRecordRaw
// 定义一些路由
// 每个路由都需要映射到一个组件。
const routes: Array<RouteRecordRaw> = [{
  path: '/',
  component: () => import('../components/a.vue')
}, {
  path: '/register',
  component: () => import('../components/b.vue')
}]


const router = createRouter({
  history: createWebHistory(),
  routes
})

//导出router
export default router
```

最后在main.ts 挂载

```ts
import {createApp} from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
```

## createWebHashHistory

`hash` 属性是一个可读可写的字符串，该字符串是 URL 的锚部分（从 # 号开始的部分）

hash路由模式是通过 `localtion.hash` 来进行跳转的

浏览器在处理 URL 中的 `hash` 变化时，会执行以下操作：

1. 更新 `location.hash` 的值。
2. 触发 `hashchange` 事件，使开发人员可以侦听 `hash` 的变化并执行相应的操作。
3. 浏览器将滚动到具有与新的 `hash` 值匹配的元素（如果存在）。

由于 hash 是 URL 的一部分，而不是作为请求服务器的一部分，所以浏览器不会重新加载整个页面。相反，它只会根据新的 hash 值执行相应的操作。

## createWebHistory

`history` 提供了 `pushState` 和 `replaceState` 两个方法，这两个方法改变 URL 的 path 部分不会引起页面刷新

`history` 提供类似 `hashchange` 事件的 `popstate` 事件，但 `popstate` 事件有些不同：

1. 通过浏览器前进后退改变 URL 时会触发 `popstate` 事件

2. 通过 `pushState` / `replaceState` 或 `<a>` 标签改变 URL 不会触发 `popstate` 事件

3. 可以拦截 `pushState` / `replaceState` 的调用和 `<a>` 标签的点击事件来检测 URL 变化

4. 通过 js 调用 `history` 的 `back`，`go`，`forward` 方法可触发该事件

监听 URL 变化可以实现，但没有 hashchange 那么方便

## router-link

[router-link](https://router.vuejs.org/zh/guide/#router-link)

请注意，我们没有使用常规的 a 标签，而是使用一个自定义组件 router-link 来创建链接。这使得 Vue Router 可以在不重新加载页面的情况下更改
URL，处理 URL 的生成以及编码。我们将在后面看到如何从这些功能中获益。

## router-view

[router-view](https://router.vuejs.org/zh/guide/#router-view)

router-view 将显示与 url 对应的组件。你可以把它放在任何地方，以适应你的布局。

```vue

<template>
  <div>
    <h1>App</h1>
    <div>
      <!--使用 router-link 组件进行导航 -->
      <!--通过传递 `to` 来指定链接 -->
      <!--`<router-link>` 将呈现一个带有正确 `href` 属性的 `<a>` 标签-->
      <router-link tag="div" to="/">跳转a</router-link>
      <router-link tag="div" style="margin-left:200px" to="/register">跳转b</router-link>
    </div>
    <hr/>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>
```

## 路由跳转

### 命名路由

除了 path 之外，你还可以为任何路由提供 name。这有以下优点：

- 没有硬编码的 URL
- params 的自动编码/解码。
- 防止你在 url 中出现打字错误。
- 绕过路径排序（如显示一个）

```ts
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Login",
    component: () => import('../components/login.vue')
  },
  {
    path: "/reg",
    name: "Reg",
    component: () => import('../components/reg.vue')
  }
]
```

router-link 跳转方式需要改变 变为对象并且有对应 name

```vue

<template>
  <div>
    <router-link :to="{name:'Login'}">Login</router-link>
    <router-link style="margin-left:10px" :to="{name:'Reg'}">Reg</router-link>
  </div>
</template>
```

### 编程式导航

除了使用 `<router-link>` 创建 a 标签来定义导航链接，我们还可以借助 router 的实例方法，通过编写代码来实现。

1. 字符串模式

```ts
import {useRouter} from 'vue-router'

const router = useRouter()

const toPage = () => {
  router.push('/reg')
}
```

2. 对象模式

```ts

import {useRouter} from 'vue-router'

const router = useRouter()

const toPage = () => {
  router.push({
    path: '/reg'
  })
}
```

3. 命名式路由模式

```ts
import {useRouter} from 'vue-router'

const router = useRouter()

const toPage = () => {
  router.push({
    name: 'Reg'
  })
}
```

### a标签跳转

直接通过 a href 也可以跳转但是会刷新页面

```html
 <a href="/reg">rrr</a>
```

## 历史记录

### replace

采用 replace 进行页面的跳转会同样也会创建渲染新的 Vue 组件，但是在 history 中其不会重复保存记录，而是替换原有的 vue 组件；

- router-link 使用方法

```html

<router-link replace to="/">Login</router-link>
<router-link replace style="margin-left:10px" to="/reg">Reg</router-link>
```

- 编程式导航

```vue

<template>
  <button @click="toPage('/')">Login</button>
  <button @click="toPage('/reg')">Reg</button>
</template>
<script setup lang="ts">
import {useRouter} from 'vue-router'

const router = useRouter()

const toPage = (url: string) => {
  router.replace(url)
}
</script>
```

### 横跨历史

该方法采用一个整数作为参数，表示在历史堆栈中前进或后退多少步

```vue

<template>
  <button @click="next">前进</button>
  <button @click="prev">后退</button>
</template>
<script setup lang="ts">
import {useRouter} from 'vue-router'

const router = useRouter()
const next = () => {
  //前进 数量不限于1
  router.go(1)
}

const prev = () => {
  //后退
  router.back()
}
</script>
```

## 路由传参

### Query

编程式导航使用 router push 或者 replace 的时候，改为对象形式新增 query 必须传入一个对象

```ts
const toDetail = (item: Item) => {
  router.push({
    path: '/reg',
    query: item
  })
}
```

接受参数

> 使用 useRoute 的 query

```ts
import {useRoute} from 'vue-router';

const route = useRoute()
```

```html

<div>品牌：{{ route.query?.name }}</div>
<div>价格：{{ route.query?.price }}</div>
<div>ID：{{ route.query?.id }}</div>
```

### Params

编程式导航使用 router push 或者 replace 的时候，改为对象形式并且只能使用name，path无效，然后传入params

```ts
const toDetail = (item: Item) => {
  router.push({
    name: 'Reg',
    params: item
  })
}
```

接受参数
> 使用 useRoute 的 params

```ts
import {useRoute} from 'vue-router';

const route = useRoute()
```

```html

<div>品牌：{{ route.params?.name }}</div>
<div>价格：{{ route.params?.price }}</div>
<div>ID：{{ route.params?.id }}</div>
```

:::tip
params 传参是在内存中保存的，页面一刷新，就没有了
:::

### 动态路由传参

很多时候，我们需要将给定匹配模式的路由映射到同一个组件。
例如，我们可能有一个 User 组件，它应该对所有用户进行渲染，但用户 ID 不同。
在 Vue Router 中，我们可以在路径中使用一个动态字段来实现，我们称之为 路径参数。

路径参数 用冒号 : 表示。当一个路由被匹配时，它的 params 的值将在每个组件

```ts
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Login",
    component: () => import('../components/login.vue')
  },
  {
    //动态路由参数
    path: "/reg/:id",
    name: "Reg",
    component: () => import('../components/reg.vue')
  }
]
```

```ts
const toDetail = (item: Item) => {
  router.push({
    name: 'Reg',
    params: {
      id: item.id
    }
  })
}
```

```ts
import {useRoute} from 'vue-router';
import {data} from './list.json'

const route = useRoute()


const item = data.find(v => v.id === Number(route.params.id))
```

### 二者的区别

1. query 传参配置的是 path，而 params 传参配置的是 name，在 params 中配置 path 无效
2. query 在路由配置不需要设置参数，而 params 必须设置
3. query 传递的参数会显示在地址栏中
4. params传参刷新会无效，但是 query 会保存传递过来的值，刷新不变 ;
5. 路由配置

## 嵌套路由

一些应用程序的 UI 由多层嵌套的组件组成。在这种情况下，URL 的片段通常对应于特定的嵌套组件结构，例如：

```ts
const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    component: () => import('../components/user.vue'),
    children: [
      {
        path: "",
        name: "Login",
        component: () => import('../components/login.vue')
      },
      {
        path: "reg",
        name: "Reg",
        component: () => import('../components/reg.vue')
      }
    ]
  },

]
```
:::tip
children 中的 path 最前面不能加'/'，会匹配不到。
:::

children 配置只是另一个路由数组，就像 routes 本身一样。因此，你可以根据自己的需要，不断地嵌套视图

```html

<div>
    <router-view></router-view>
    <div>
        <router-link to="/user">login</router-link>
        <router-link style="margin-left:10px;" to="/user/reg">reg</router-link>
    </div>
</div>
```
:::tip
router-link 中的 to 必须在最前面添加 '/'，不然匹配不到正确的路由，而且要加上父级路由的前缀
:::