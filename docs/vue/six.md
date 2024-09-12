# 五、新的组件

## 1.Fragment

- 在Vue2中: 组件必须有一个根标签
- 在Vue3中: 组件可以没有根标签, 内部会将多个标签包含在一个Fragment虚拟元素中
- 好处: 减少标签层级, 减小内存占用

## 2.Teleport

> Teleport Vue 3.0新特性之一。

- Teleport 是一种能够将我们的模板渲染至指定DOM节点，不受父级style、v-show等属性影响，但data、prop数据依旧能够共用的技术；类似于
  React 的 Portal。

- 主要解决的问题 因为Teleport节点挂载在其他指定的DOM节点下，完全不受父级style样式影响

通过 `to` 属性 插入指定元素位置 `to="移动位置"` 便可以将 `Teleport` 内容传送到指定位置

```vue
<template>
  <teleport to="body">
  	<div v-if="isShow" class="mask">
  		<div class="dialog">
  			<h3>我是一个弹窗</h3>
  			<button @click="isShow = false">关闭弹窗</button>
  		</div>
  	</div>
  </teleport>
</template>
```

也可以自定义传送位置 支持 class id等 选择器

```html

<div id="app"></div>
<div class="modal"></div>
```

多个使用场景

```vue
<template>
	<Teleport to="#modals">
		<div>A</div>
	</Teleport>
	<Teleport to="#modals">
		<div>B</div>
	</Teleport>
</template>
```

动态控制teleport
> 使用disabled 设置为 true则 to属性不生效 false 则生效

```vue
<template>
	<teleport :disabled="true" to='body'>
		<A></A>
	</teleport>
</template>
```

## 3.Suspense

### 异步组件

在大型应用中，我们可能需要将应用分割成小一些的代码块 并且减少主包的体积

这时候就可以使用异步组件

### 顶层 await

在setup语法糖里面 使用方法

`<script setup>` 中可以使用顶层 `await`。结果代码会被编译成 `async setup()`

等待异步组件时渲染一些额外内容，让应用有更好的用户体验

使用步骤：

1. 异步引入组件

> 父组件引用子组件 通过defineAsyncComponent加载异步配合import 函数模式便可以分包

```js
import {defineAsyncComponent} from 'vue'
// 简写
const Child = defineAsyncComponent(()=>import('./components/Child.vue'))

// 完整写法
const AsyncComp = defineAsyncComponent({
  // 加载函数
  loader: () => import('./Foo.vue'),

  // 加载异步组件时使用的组件
  loadingComponent: LoadingComponent,
  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 200,

  // 加载失败后展示的组件
  errorComponent: ErrorComponent,
  // 如果提供了一个 timeout 时间限制，并超时了
  // 也会显示这里配置的报错组件，默认值是：Infinity
  timeout: 3000
})
```

2. 使用 `Suspense` 包裹组件，并配置好 `default` 与 `fallback`

```vue
<template>
    <div class="app">
        <h3>我是App组件</h3>
        <Suspense>
            <template #default>
                <Child/>
            </template>
            <template #fallback>
                <h3>加载中.....</h3>
            </template>
        </Suspense>
    </div>
</template>
```
