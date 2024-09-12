# 自定义Hooks(组合式函数)

Vue3 自定义Hook : 主要用来处理复用代码逻辑的一些封装

这个在Vue2 就已经有一个东西是 Mixins

mixins 就是将这些多个相同的逻辑抽离出来，各个组件只需要引入 mixins，就能实现一次写代码，多组件受益的效果。

弊端就是会涉及到覆盖的问题

组件的 data、methods、filters 会覆盖 mixins 里的同名 data、methods、filters。
![img](/自定义Hooks.jpg)

第二点就是 变量来源不明确（隐式传入），不利于阅读，使代码变得难以维护。

Vue3 的自定义的hook

- Vue3 的 hook函数 相当于 vue2 的 mixin, 不同在与 hooks 是函数
- Vue3 的 hook函数 可以帮助我们提高代码的复用性, 让我们能在不同的组件中都利用 hooks 函数

Vue3 hook 库 [Get Started | VueUse](https://vueuse.org/guide/)

## 案例：将图片转换成base64

调用组件

```vue

<template>
	<div>
		<img id="img" width="400" height="400" src="./assets/1.png" alt="">
	</div>
</template>

<script setup lang="ts">
import useBase64 from './hooks'

useBase64({el: "#img"}).then(res => {
	console.log(res.baseUrl)
})
</script>

<style scoped>

</style>
```

Hooks/index.ts

```ts
import {onMounted} from "vue";

interface Options {
  el: string
}

export default function (options: Options): Promise<{ baseUrl: string }> {
  return new Promise((resolve) => {
    onMounted(() => {
      let img: HTMLImageElement = document.querySelector(options.el) as HTMLImageElement
      console.log(img, '------')
      img.onload = () => {
        resolve({
          baseUrl: base64(img)
        })
      }
    })
    // 使用canvas转成base64
    const base64 = (el: HTMLImageElement) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = el.width
      canvas.height = el.height
      ctx?.drawImage(el, 0, 0, canvas.width, canvas.height)
      return canvas.toDataURL('image/png')
    }
  })


}
```

## 案例二

自定义指令 + hooks 双管齐下

实现一个监听元素变化的hook

主要会用到一个新的API resizeObserver 兼容性一般 可以做polyfill

但是他可以监听元素的变化 执行回调函数 返回 contentRect 里面有变化之后的宽高。

### 初始化环境

根目录：

- 生成package.json

````shell
npm init -y
````

- 生成tsconfig.json

```shell
tsc --init
```

- 生成index.d.ts声明文件
- 新建vite.config.ts文件
- 安装vue

```shell
npm i vue -D
```

- 安装vite

```shell
npm i vite -D
```
### src/index.ts
```ts
import {App} from 'vue'
// InterSectionObserver 主要侦听元素是否在视口内
// MutationObserver 主要侦听子集的变化，还有属性的变化 以及 增删改查
// ResizeObserver  主要侦听元素宽高的变化
function useResize(el: HTMLElement, callback: Function) {
  let resize = new ResizeObserver((entries) => {
    callback(entries[0].contentRect)
  })
  resize.observe(el)
}

const install = (app: App) => {
  app.directive('resize', {
    mounted(el, binding) {
      useResize(el, binding.value)
    }
  })
}

useResize.install = install

export default useResize
```

