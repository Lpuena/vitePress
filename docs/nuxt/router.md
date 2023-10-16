# Nuxt中的路由

nuxt 有一些**约定的目录**，有特殊功能，如 **pages** 目录的 vue 文件会自动注册路由。
## 结构
```
pages/
--| index.vue
--| about.vue
--| video/
----| index.vue
----| [id].vue
```
:::tip
`----| [id].vue` 文件这么命名就是相当于动态路由

```json
{
"path": "/posts/:id",
"component": "pages/posts/[id].vue"
}
```
:::

参考代码
```vue
<template>
  <div>
    <nuxt-link to="/">首页</nuxt-link>
    <nuxt-link to="/about">关于</nuxt-link>
    <nuxt-link to="/video">video主页</nuxt-link>
    <nuxt-link to="`/video/${id}`">video Test</nuxt-link>
    <NuxtPage />
  </div>
</template>
```
- 页面路由 `<NuxtPage>` 相当于 `<RouterView>`
- 页面跳转 `<NuxtLink>` 相当于 `<RouterLink>`
