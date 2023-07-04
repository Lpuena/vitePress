# 三、其它 Composition API

## 1.shallowReactive 与 shallowRef

- shallowReactive：只处理对象最外层属性的响应式（浅响应式）。
- shallowRef：只处理基本数据类型的响应式, 不进行对象的响应式处理。

:::tip 什么时候使用?

- 如果有一个对象数据，结构比较深, 但变化时只是外层属性变化 ==> shallowReactive。
- 如果有一个对象数据，后续功能不会修改该对象中的属性，而是生新的对象来替换 ==> shallowRef。

:::

:::warning
`shallowRef` 和 `ref` 不能同时使用，同时使用会影响 `shallowRef` 造成视图的更新。
因为 `triggerRef` 会强制更新我们这个收集的依赖。`ref` 底层已经调用了这个方法。
:::
例子：

```ts
const Man = shallowRef({name: 'ls'})
const change = () => {
  Man.value.name = 'Gxx'
  console.log(Man)
  triggerRef(Man) //[!code ++]
}
```

:::tip
`shallowRef` 是浅响应式的，只能改变第一层，普通类型可以直接通过 `.value`
修改，但是当其包装对象时，不能通过
`.value.name` 这种对象属性名，来进行修改。只能通过 `.value = {name:'Gxx'}` 直接进行对象的替换才行。
:::

## 2.readonly 与 shallowReadonly

- readonly: 让一个响应式数据变为只读的（深只读）。
- shallowReadonly：让一个响应式数据变为只读的（浅只读）。
- 应用场景: 不希望数据被修改时。

## 3.toRaw 与 markRaw

- toRaw：
  - 作用：将一个由```reactive```生成的<strong style="color:orange">响应式对象</strong>转为<strong style="color:orange">
    普通对象</strong>。
  - 使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新。
- markRaw：
  - 作用：标记一个对象，使其永远不会再成为响应式对象。
  - 应用场景:
    1. 有些值不应被设置为响应式的，例如复杂的第三方类库等。
    2. 当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能。

## 4.customRef

- 作用：创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制。

- 实现防抖效果：

```vue

<template>
  <input type="text" v-model="keyword">
  <h3>{{keyword}}</h3>
</template>

<script setup lang="js">
import {ref, customRef} from 'vue'

// let keyword = ref('hello') //使用Vue准备好的内置ref
//自定义一个myRef
function myRef(value, delay) {
  let timer
  //通过customRef去实现自定义
  return customRef((track, trigger) => {
    return {
      get() {
        //触发依赖，收集依赖
        track() //告诉Vue这个value值是需要被“追踪”的
        return value
      },
      set(newValue) {
        clearTimeout(timer)
        timer = setTimeout(() => {
          value = newValue
          trigger() //告诉Vue去更新界面
        }, delay)
      }
    }
  })
}

let keyword = myRef('hello', 500) //使用程序员自定义的ref


</script>
```

## 5.effectScope

创建一个 effect 作用域，可以捕获其中所创建的响应式副作用 (即计算属性和侦听器)，这样捕获到的副作用可以一起处理。

- 示例：

```js
const scope = effectScope()

scope.run(() => {
  const doubled = computed(() => counter.value * 2)

  watch(doubled, () => console.log(doubled.value))

  watchEffect(() => console.log('Count: ', doubled.value))
})

// 处理掉当前作用域内的所有 effect
scope.stop()
```

## 6.provide 与 inject

- 作用：实现<strong style="color:#DD5145">祖与后代组件间</strong>通信

- 套路：父组件有一个 `provide` 选项来提供数据，后代组件有一个 `inject` 选项来开始使用这些数据

- 具体写法：

  1. 祖组件中：

     ```js
     setup(){
         ......
         let car = reactive({name:'奔驰',price:'40万'})
         provide('car',car)
         ......
     }
     ```

  2. 后代组件中：

     ```js
     setup(props,context){
         ......
         const car = inject('car')
         return {car}
         ......
     }
     ```

### 依赖注入 Provide / Inject

通常，当我们需要从父组件向子组件传递数据时，我们使用 props。想象一下这样的结构：有一些深度嵌套的组件，而深层的子组件只需要父组件的部分内容。在这种情况下，如果仍然将
prop 沿着组件链逐级传递下去，可能会很麻烦。

官网的解释很让人疑惑，那我翻译下这几句话：

provide 可以在祖先组件中指定我们想要提供给后代组件的数据或方法，而在任何后代组件中，我们都可以使用 inject 来接收 provide
提供的数据或方法。

![image](/provide.png)

例子：

- 父组件

```vue

<template>
  <div class="App">
    <button>我是App</button>
    <A></A>
  </div>
</template>

<script setup lang='ts'>
import {provide, ref} from 'vue'
import A from './components/A.vue'

let flag = ref<number>(1)
provide('flag', flag)
</script>

<style>
.App {
  background: blue;
  color: #fff;
}
</style>
```

- 子组件

```vue

<template>
  <div style="background-color: green;">
    我是B
    <button @click="change">change falg</button>
    <div>{{ flag }}</div>
  </div>
</template>

<script setup lang='ts'>
import {inject, Ref, ref} from 'vue'
//ref(1)是默认值
const flag = inject<Ref<number>>('flag', ref(1))
const change = () => {
  flag.value = 2
}
</script>

<style>
</style>
```

:::tip
你如果传递普通的值 是不具有响应式的 需要通过ref reactive 添加响应式

注意:

注入的值可以是 `undefined`，因为无法保证提供者一定会在运行时 `provide` 这个值。

当提供了一个默认值后，这个 `undefined` 类型就可以被移除：
:::
使用场景

当父组件有很多数据需要分发给其子代组件的时候， 就可以使用provide和inject。

## 7.响应式数据的判断

- isRef: 检查一个值是否为一个 ref 对象
- isReactive: 检查一个对象是否是由 `reactive` 创建的响应式代理
- isReadonly: 检查一个对象是否是由 `readonly` 创建的只读代理
- isProxy: 检查一个对象是否是由 `reactive` 或者 `readonly` 方法创建的代理
