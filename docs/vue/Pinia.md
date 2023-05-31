# Pinia

<img src="https://pinia.vuejs.org/logo.svg" alt="" width="100px" height="100px" style="margin-left: 8rem" >

## Pinia.js特点：

- 完整的 ts 的支持；
- 足够轻量，压缩后的体积只有1kb左右;
- 去除 mutations，只有 state，getters，actions；
- actions 支持同步和异步；
- 代码扁平化没有模块嵌套，只有 store 的概念，store 之间可以自由使用，每一个store都是独立的
- 无需手动添加 store，store 一旦创建便会自动添加；
- 支持Vue3 和 Vue2

## 起步 安装

```shell
yarn add pinia
 
npm install pinia
```

## 引入注册

Vue3

```ts
import {createApp} from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'


let app = createApp(App)


app.use(createPinia())

app.mount('#app')
```

Vue2

```js
import {createPinia, PiniaVuePlugin} from 'pinia'

Vue.use(PiniaVuePlugin)
const pinia = createPinia()

new Vue({
  el: '#app',
  // other options...
  // ...
  // note the same `pinia` instance can be used across multiple Vue apps on
  // the same page
  pinia,
})
```

## 初始化仓库Store

1. 新建一个文件夹Store

2. 新建文件`[name].ts`

3. 定义仓库Store

```ts
import {defineStore} from 'pinia'
```

4. 我们需要知道存储是使用定义的defineStore()，并且它需要一个唯一的名称，作为第一个参数传递

这里将名称抽离出去了

新建文件store-namespace/index.ts

```ts
export const enum Names {
  Test = 'TEST'
}
```

store 引入

```ts
import {defineStore} from 'pinia'
import {Names} from './store-namespace'

export const useTestStore = defineStore(Names.Test, {})
```

这个名称，也称为id，是必要的，Pinia 使用它来将商店连接到 devtools。将返回的函数命名为 use··· 是可组合项之间的约定，以使其使用习惯。

5. 定义值
   State 箭头函数 返回一个对象 在对象里面定义值

```ts
import {defineStore} from 'pinia'
import {Names} from './store-namespce'

export const useTestStore = defineStore(Names.Test, {
   state: () => {
      return {
         current: 1
      }
   },
   //类似于computed 可以帮我们去修饰我们的值
   getters: {},
   //可以操作异步 和 同步提交state
   actions: {}
})
```

## 修改state中的值
1. 直接修改 state 中的值 例如current++
```vue

<template>
   <div>
      <button @click="Add">+</button>
      <div>
         {{Test.current}}
      </div>
   </div>
</template>

<script setup lang='ts'>
import {useTestStore} from './store'

const Test = useTestStore()
const Add = () => {
   Test.current++
}

</script>
```
:::tip
在Vuex中，不允许直接修改state中的数据，Pinia中可以直接修改
:::
2. 通过$patch方法修改(批量修改)
```vue

<template>
   <div>
      <button @click="Add">+</button>
      <div>
         {{Test.current}}
      </div>
      <div>
         {{Test.age}}
      </div>
   </div>
</template>

<script setup lang='ts'>
import {useTestStore} from './store'

const Test = useTestStore()
const Add = () => {
   Test.$patch({
      current: 200,
      age: 300
   })
}

</script>

```