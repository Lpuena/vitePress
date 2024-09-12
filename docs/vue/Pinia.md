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

3. 批量修改函数形式

> 推荐使用函数形式 可以自定义修改逻辑

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
	Test.$patch((state) => {
		state.current++;
		state.age = 40
	})
}

</script>
```

4. 通过原始对象修改整个实例

> `$state` 可以通过将 store 的属性设置为新对象来替换 store 的整个状态，缺点就是必须修改整个对象的所有属性

```vue

<script setup lang='ts'>
import {useTestStore} from './store'

const Test = useTestStore()
const Add = () => {
	Test.$state = {
		current: 10,
		age: 30
	}
}

</script>
```

5. 通过actions修改

定义Actions，在actions 中直接使用this就可以指到state里面的值

```ts
import {defineStore} from 'pinia'
import {Names} from './store-naspace'

export const useTestStore = defineStore(Names.TEST, {
  state: () => {
    return {
      current: 1,
      age: 30
    }
  },
  
  actions: {
    setCurrent() {
      this.current++
    }
  }
})
```

使用方法直接在实例中调用

```vue

<script setup lang='ts'>
import {useTestStore} from './store'

const Test = useTestStore()
const Add = () => {
	Test.setCurrent()
}
</script>
```

## 解构store

在 Pinia 是不允许直接解构是会失去响应性的

```ts
const Test = useTestStore()
const {current, name} = Test
console.log(current, name);
```

差异对比:

修改从 Test中解构出来的 current 数据不会变，而源数据Test.current是会变的

```vue

<template>
	<div>origin value {{Test.current}}</div>
	<div>
		pinia:{{ current }}--{{ name }}
		<button @click="change">change</button>
	</div>
</template>

<script setup lang='ts'>
import {useTestStore} from './store'

const Test = useTestStore()

const change = () => {
	Test.current++
}

const {current, name} = Test

console.log(current, name);


</script>
```

解决方案可以使用 `storeToRefs`

```ts
import {storeToRefs} from 'pinia'

const Test = useTestStore()

const {current, name} = storeToRefs(Test)
```

其原理跟 `toRefs` 一样的给里面的数据包裹一层 `toref`

源码 通过 `toRaw` 使 `store` 变回原始数据防止重复代理

循环 `store` 通过 `isRef` `isReactive` 判断 如果是响应式对象直接拷贝一份给 `refs` 对象 将其原始对象包裹 `toRef`
使其变为响应式对象

## Actions（支持同步异步）

1. 同步方法，直接调用即可

```ts
import {defineStore} from 'pinia'
import {Names} from './store-naspace'

export const useTestStore = defineStore(Names.TEST, {
  state: () => ({
    counter: 0,
  }),
  actions: {
    increment() {
      this.counter++
    },
    randomizeCounter() {
      this.counter = Math.round(100 * Math.random())
    },
  },
})
```

文件使用

```vue

<template>
	<div>
		<button @click="Add">+</button>
		<div>
			{{Test.counter}}
		</div>
	</div>
</template>

<script setup lang='ts'>
import {useTestStore} from './store'

const Test = useTestStore()
const Add = () => {
	Test.randomizeCounter()
}

</script>

<style>

</style>
```

2. 异步，可以结合async await修饰

```ts
import {defineStore} from 'pinia'
import {Names} from './store-naspace'

type Result = {
  name: string
  isChu: boolean
}

const Login = (): Promise<Result> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: '小满',
        isChu: true
      })
    }, 3000)
  })
}

export const useTestStore = defineStore(Names.TEST, {
  state: () => ({
    user: <Result>{},
    name: "123"
  }),
  actions: {
    async getLoginInfo() {
      const result = await Login()
      this.user = result;
    }
  },
})
```

引用

```vue

<template>
	<div>
		<button @click="Add">test</button>
		<div>
			{{Test.user}}
		</div>
	</div>
</template>

<script setup lang='ts'>
import {useTestStore} from './store'

const Test = useTestStore()
const Add = () => {
	Test.getLoginInfo()
}

</script>

```

3. 多个action互相调用

```ts
export const useTestStore = defineStore(Names.TEST, {
  state: () => ({
    user: <Result>{},
    name: "default"
  }),
  actions: {
    async getLoginInfo() {
      const result = await Login()
      this.user = result;
      this.setName(result.name)
    },
    setName(name: string) {
      this.name = name;
    }
  }
})
```

## getters

1.使用箭头函数不能使用this this指向已经改变指向undefined 修改值请用state

主要作用类似于computed 数据修饰并且有缓存

```ts
export const useTestStore = defineStore(Names.TEST, {
  getters: {
    newPrice: (state) => `$${state.user.price}`
  }
})
```

2. 普通函数形式可以使用this

```ts
export const useTestStore = defineStore(Names.TEST, {
  getters: {
    newCurrent(): number {
      return ++this.current
    }
  },
})
```

3. getters 互相调用

```ts
export const useTestStore = defineStore(Names.TEST, {
  getters: {
    newCurrent(): number | string {
      return ++this.current + this.newName
    },
    newName(): string {
      return `$-${this.name}`
    }
  }
})
```

## API

### $reset

重置store到他的初始状态

```ts
import {useTestStore} from "@/stores";

const Test = useTestStore()
Test.$reset()
```

### 订阅state的改变

类似于 Vuex 的 subscribe 只要有 state 的变化就会走这个函数

```ts
Test.$subscribe((args, state) => {
  console.log(args, state);
})
```

返回值
![img](/pinia.png)

第二个参数

如果你的组件卸载之后还想继续调用请设置第二个参数

```ts
Test.$subscribe((args, state) => {
  console.log(args, state);

}, {
  detached: true
})
```

### 订阅Actions的调用

只要有actions被调用就会走这个函数

```ts
Test.$onAction((args) => {
  console.log(args);

})
```

第二个参数

组件被卸载后依旧保留，使用第二个参数

```ts
Test.$onAction((args) => {
  console.log(args);

}, true)
```

## 插件(持久存储)

pinia 和 vuex 都有一个通病 页面刷新状态会丢失

我们可以写一个pinia 插件缓存他的值
main.ts

```ts
import {createApp, toRaw} from 'vue'
import {createPinia, PiniaPluginContext} from 'pinia'

interface Option {
  key?: string
}

const setStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}
const getStorage = (key: string) => {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : {}
}

const __Pinia_Key__: string = 'piniaDefalut'
const piniaPlugin = (option: Option) => {
  return (context: PiniaPluginContext) => {
    // 从 context 中解构出 store
    const {store} = context
    const data = getStorage(`${option.key ?? __Pinia_Key__}--${store.$id}`)
    store.$subscribe(() => {
      // 监听到变化，就存储
      // 没传 key 就用默认值 __Pinia_Key__
      setStorage(`${option.key ?? __Pinia_Key__}--${store.$id}`, toRaw(store.$state))
    })
    return {
      ...data
    }
  }
}

const pinia = createPinia()
pinia.use(piniaPlugin({
  key: 'pinia'
}))


// @ts-ignore
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')

```

或者直接使用 [pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/)
