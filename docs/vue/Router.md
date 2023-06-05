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
import { createRouter, createWebHistory, createWebHashHistory, createMemoryHistory, RouteRecordRaw } from 'vue-router'
 
//vue2 mode history vue3 createWebHistory
//vue2 mode  hash  vue3  createWebHashHistory
//vue2 mode abstact vue3  createMemoryHistory
 
//路由数组的类型 RouteRecordRaw
// 定义一些路由
// 每个路由都需要映射到一个组件。
const routes: Array<RouteRecordRaw> = [{
    path: '/',
    component: () => import('../components/a.vue')
},{
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

请注意，我们没有使用常规的 a 标签，而是使用一个自定义组件 router-link 来创建链接。这使得 Vue Router 可以在不重新加载页面的情况下更改 URL，处理 URL 的生成以及编码。我们将在后面看到如何从这些功能中获益。
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
    <hr />
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>
```