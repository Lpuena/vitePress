# 介绍Vue

vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue
的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue
也完全能够为复杂的单页应用提供驱动。

MVVM（Model-View-ViewModel）架构

1. 『View』：视图层（UI 用户界面）
2. 『ViewModel』：业务逻辑层（一切 js 可视为业务逻辑）
3. 『Model』：数据层（存储数据及对数据的处理如增删改查）

![img](/mvvm.png)

## vue中解决跨域问题

### vue-cli脚手架工具搭建项目

在 `vue.config.js` 配置文件中

```js
module.exports = {
  devServer: {
    // 代理配置
    proxy: {
      // 如果请求地址以/api打头,就出触发代理机制
      '/api': {
        target: 'http://localhost:3000' // 要代理的真实接口地址
        // http://localhost:9588/api/login -> http://localhost:3000/api/login
      }
    }
  }
}
```

## 递归组件的用法

### 父组件

```vue

<template>
	<div>
		<Tree :data="data"></Tree>
	</div>
</template>

<script setup lang="ts">
import {reactive} from "vue";
// 引入子组件
import Tree from "./components/tree.vue";

interface Tree {
	name: string,
	checked: boolean,
	children?: Tree[]
}

const data = reactive<Tree[]>([
	{
		name: '1',
		checked: true,
		children: [
			{
				name: '1-1',
				checked: true,
			},
			{
				name: '1-2',
				checked: false,
			}
		]
	},
	{
		name: '2',
		checked: true,
	},
	{
		name: '3',
		checked: false,
		children: [
			{
				name: '3-1',
				checked: false,
				children: [
					{
						name: '3-1-1',
						checked: false
					}
				]
			},
			{
				name: '3-2',
				checked: false,
			}
		]
	}
])
</script>
```

### 子组件

```vue

<script setup lang="ts">
interface Tree {
	name: string,
	checked: boolean,
	children?: Tree[]
}

// 接受父组件的传参
defineProps<{
	data?: Tree[]
}>()

</script>
// 新增script标签，来添加name属性
// 控制子组件自己调用自己时的标签名称，不添加name默认就是子组件的文件名
<script lang="ts">
export default {
	name: 'Gxx'
}
</script>

<template>
	<div class="tree" v-for="item in data">
		<input v-model="item.checked" type="checkbox"> <span>{{ item.name }}</span>
		<Gxx v-if="item?.children?.length" :data="item?.children"></Gxx>
	</div>
</template>

<style scoped lang="scss">
.tree {
	margin-left: 20px;
}
</style>
```

### ??运算符

跟逻辑或（||）运算符 有区别

只能判断 `undefined` 和 `null`，当前面是`undefined`或者是`null`的时候，返回 `??` 后面的值，其余情况都是返回前面的值

## 动态组件

什么是动态组件 就是：让多个组件使用同一个挂载点，并动态切换，这就是动态组件。

在挂载点使用component标签，然后使用v-bind:is=”组件”

### 第一种 Composition API式

```vue

<template>
	<div style="display: flex">
		<div @click="switchCom(item,index)"
		     class="tabs" :class="[active == index ? 'active':'']"
		     v-for="(item,index) in data">
			<div>{{ item.name }}</div>
		</div>
	</div>
	<component class="" :is="comId"/>
</template>

<script setup lang="ts">
import {markRaw, reactive, ref, shallowRef} from "vue";
import AVue from './components/A.vue'
import BVue from './components/B.vue'
import CVue from './components/C.vue'

const comId = shallowRef(AVue)
const active = ref(0)
const data = reactive([
	{
		name: 'A组件',
		com: markRaw(AVue)
	}, {
		name: 'B组件',
		com: markRaw(BVue)
	}, {
		name: 'C组件',
		com: markRaw(CVue)
	}
])
const switchCom = (item, index) => {
	console.log(item)
	comId.value = item.com
	active.value = index
}
</script>

<style scoped>
.tabs {
	border: 1px solid #ccc;
	margin: 5px;
	padding: 5px 10px;
	cursor: pointer;
}

.active {
	background-color: skyblue;
}
</style>
```

![image](/动态组件v3.png)
:::tip 注意事项
1.在Vue2 的时候 `is` 是通过组件名称切换的 在 `Vue3 setup` 是通过组件实例切换的

2.如果你把组件实例放到Reactive
Vue会给你一个警告 `runtime-core.esm-bundler.js:38 [Vue warn]: Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `
markRaw` or using `shallowRef` instead of `ref`.
Component that was made reactive:`

这是因为reactive 会进行proxy 代理 而我们组件代理之后毫无用处 节省性能开销 推荐我们使用shallowRef 或者 markRaw 跳过proxy
代理
:::

### 第二种 Options API式

```vue

<script setup lang="ts">
import {markRaw, reactive, ref, shallowRef} from "vue";

const comId = shallowRef('AVue') //[!code ++]
const active = ref(0)
const data = reactive([
	{
		name: 'A组件',
		com: 'AVue' //[!code ++]
	}, {
		name: 'B组件',
		com: 'BVue' //[!code ++]
	}, {
		name: 'C组件',
		com: 'CVue' //[!code ++]
	}
])
const switchCom = (item, index) => {
	console.log(item)
	comId.value = item.com
	active.value = index
}
</script>
<script lang="ts"> //[!code ++]
import AVue from './components/A.vue'; //[!code ++]
import BVue from './components/B.vue'; //[!code ++]
import CVue from './components/C.vue'; //[!code ++]
export default { //[!code ++]
	components: { //[!code ++]
		AVue, //[!code ++]
		BVue, //[!code ++]
		CVue //[!code ++]
	} //[!code ++]
} //[!code ++]
</script> //[!code ++]
```

![img](/动态组件v2.png)

## 插槽

插槽就是子组件中的提供给父组件使用的一个占位符，用<slot></slot> 表示，
父组件可以在这个占位符中填充任何模板代码，如 HTML、组件等，填充的内容会替换子组件的<slot></slot>标签。

### 匿名插槽

在子组件放置一个插槽

```vue

<template>
	<div>
		<slot></slot>
	</div>
</template>
```

父组件使用插槽，在父组件给这个插槽填充内容

```vue

<template>
	// 子组件标签名称
	<Dialog>
		<template v-slot>
			<div>2132</div>
		</template>
	</Dialog>
</template>
```

### 具名插槽

具名插槽其实就是给插槽取个名字。一个子组件可以放多个插槽，而且可以放在不同的地方，而父组件填充内容时，可以根据这个名字把内容填充到对应插槽中

```vue

<template>
	<div>
		<slot name="header"></slot>
		// 不写名字，就是默认default
		<slot></slot>
		<slot name="footer"></slot>
	</div>
</template>
```

父组件使用,需对应插槽名称

```vue

<template>
	// 子组件标签名称
	<Dialog>
		<template v-slot:header>
			<div>1</div>
		</template>
		<template v-slot>
			<div>2</div>
		</template>
		<template #footer>
			<div>3</div>
		</template>
	</Dialog>
</template>
```

:::tip
`v-slot:header` 可以简写成 `#header`
:::

### 作用域插槽

在子组件动态绑定参数 派发给父组件的slot去使用

子组件

```vue

<template>
	<div style="background-color:red;">
		<slot name="header"></slot>
	</div>
	<div style="background-color:skyblue;">
		<div v-for="item in data">
			<slot :data="item" name="default"></slot>
		</div>
	</div>
	<div style="background-color:orange;">
		<slot name="footer"></slot>
	</div>
</template>

<script setup lang="ts">
import {reactive} from "vue";

interface Data {
	name: string,
	age: number
}

const data = reactive<Data[]>([
	{
		name: '小满被插入了1',
		age: 2011
	},
	{
		name: '小满被插入了2',
		age: 202
	}, {
		name: '小满被插入了3',
		age: 203
	}, {
		name: '小满被插入了4',
		age: 204
	},
])
</script>
```

父组件

```vue

<template>
	<div>
		<MySlot>
			//绑定的数据名称，就是子组件slot标签上面 v-bind 绑定的值
			<template v-slot="{data}">
				{{ data }}
			</template>
			<template #footer>
				12312
			</template>
			<template v-slot:header>
				321321
			</template>
		</MySlot>
	</div>
</template>

<script setup lang="ts">
import MySlot from "./components/MySlot.vue";
</script>
```

### 动态插槽

插槽可以是一个变量名

```vue

<template>
	<div>
		<MySlot>
			<template v-slot="{data}">
				{{ data }}
			</template>
			<template #[name]> // [!code ++]
				12312
			</template>
			<template v-slot:header>
				321321
			</template>
		</MySlot>
	</div>
</template>

<script setup lang="ts">
import MySlot from "./components/MySlot.vue";
import {ref} from "vue";

const name = ref('footer') // [!code ++]
</script>
```

## keep-alive缓存组件

> 内置组件keep-alive

有时候我们不希望组件被重新渲染影响使用体验；或者处于性能考虑，避免多次重复渲染降低性能。而是希望组件可以缓存下来,维持当前的状态。这时候就需要用到keep-alive组件。

开启keep-alive 生命周期的变化

- 初次进入时： onMounted> onActivated
- 退出后触发 deactivated
- 再次进入：
- 只会触发 onActivated
- 事件挂载的方法等，只执行一次的放在 onMounted中；组件每次进去执行的方法放在 onActivated中

```vue

<template>
	<!-- 基本 -->
	<keep-alive>
		<component :is="view"></component>
	</keep-alive>
	
	<!-- 多个条件判断的子组件 -->
	<keep-alive>
		<comp-a v-if="a > 1"></comp-a>
		<comp-b v-else></comp-b>
	</keep-alive>
	
	<!-- 和 `<transition>` 一起使用 -->
	<transition>
		<keep-alive>
			<component :is="view"></component>
		</keep-alive>
	</transition>
</template>
```

### include 和 exclude

```vue
// include 是缓存哪一个
// exclude 是不缓存哪一个
// max 是最大缓存实例数
<keep-alive :include="['comp-a']" :exclude="" :max=""></keep-alive>
```

`include` 和 `exclude` 允许组件有条件地缓存。二者都可以用逗号分隔字符串、正则表达式或一个数组来表示：

### 缓存实例的生命周期

当一个组件实例从 DOM 上移除但因为被 `<KeepAlive>` 缓存而仍作为组件树的一部分时，它将变为不活跃状态而不是被卸载。当一个组件实例作为缓存树的一部分插入到
DOM 中时，它将重新被激活。

一个持续存在的组件可以通过 `onActivated()` 和 `onDeactivated()` 注册相应的两个状态的生命周期钩子：

```vue

<script setup lang="ts">
import {onActivated, onDeactivated} from 'vue'

onActivated(() => {
	// 调用时机为首次挂载
	// 以及每次从缓存中被重新插入时
})

onDeactivated(() => {
	// 在从 DOM 上移除、进入缓存
	// 以及组件卸载时调用
})
</script>
```

请注意：

`onActivated` 在组件挂载时也会调用，并且 `onDeactivated` 在组件卸载时也会调用。

这两个钩子不仅适用于 `<KeepAlive>` 缓存的根组件，也适用于缓存树中的后代组件。

## Transition

`<Transition>` 是一个内置组件，这意味着它在任意别的组件中都可以被使用，无需注册。
它可以将进入和离开动画应用到通过默认插槽传递给它的元素或组件上。进入或离开可以由以下的条件之一触发：

- 由 `v-if` 所触发的切换
- 由 `v-show` 所触发的切换
- 由特殊元素 `<component>` 切换的动态组件
- 改变特殊的 `key` 属性

自定义 transition 过渡效果，对transition组件的name属性自定义。并且在css中写入对应的样式

### 过渡类名

在进入/离开的过度中，有6个class切换

- `v-enter-from`：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。

- `v-enter-active`：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。

- `v-enter-to`：定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 v-enter-from 被移除)，在过渡/动画完成之后移除。

- `v-leave-from`：定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。

- `v-leave-active`：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。

- `v-leave-to`：离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 v-leave-from 被移除)，在过渡/动画完成之后移除。

示例

```html

<button @click='flag = !flag'>切换</button>
<transition name='fade'>
  <div v-if='flag' class="box"></div>
</transition>
```

```scss
//开始过度
.fade-enter-from {
  background: red;
  width: 0;
  height: 0;
  transform: rotate(360deg)
}

//开始过度了
.fade-enter-active {
  transition: all 2.5s linear;
}

//过度完成
.fade-enter-to {
  background: yellow;
  width: 200px;
  height: 200px;
}

//离开的过度
.fade-leave-from {
  width: 200px;
  height: 200px;
  transform: rotate(360deg)
}

//离开中过度
.fade-leave-active {
  transition: all 1s linear;
}

//离开完成
.fade-leave-to {
  width: 0;
  height: 0;
}
```

### 自定义过渡 class

可以向 `<Transition>` 传递以下的 props 来指定自定义的过渡 class：

- `enter-from-class`
- `enter-active-class`
- `enter-to-class`
- `leave-from-class`
- `leave-active-class`
- `leave-to-class`

传入的这些 class 会覆盖相应阶段的默认 class 名。
这个功能在你想要在 Vue 的动画机制下集成其他的第三方 CSS 动画库时非常有用，比如 [Animate.css](https://animate.style/)：

```vue

<template>
	<!-- 假设你已经在页面中引入了 Animate.css -->
	<Transition
			name="custom-classes"
			enter-active-class="animate__animated animate__tada"
			leave-active-class="animate__animated animate__bounceOutRight"
	>
		<p v-if="show">hello</p>
	</Transition>
</template>
```

### 指定进入和离开的持续时间

使用 duration 来显式指定过渡的持续时间 (以毫秒为单位)。总持续时间应该匹配延迟加上内部元素的过渡持续时间

```vue

<transition :duration="1000">...</transition>


<transition :duration="{ enter: 500, leave: 800 }">...</transition>
```

### JavaScript 钩子

可以通过监听 `<Transition>` 组件事件的方式在过渡过程中挂上钩子函数：

```html

<Transition
    @before-enter="onBeforeEnter" //对应enter-from
@enter="onEnter" //对应enter-active
@after-enter="onAfterEnter" //对应enter-to
@enter-cancelled="onEnterCancelled" //显示过度打断
@before-leave="onBeforeLeave" //对应leave-from
@leave="onLeave" //对应enter-active
@after-leave="onAfterLeave" //对应leave-to
@leave-cancelled="onLeaveCancelled" //离开过度打断
>
<!-- ... -->
</Transition>
```

```js
// 在元素被插入到 DOM 之前被调用
// 用这个来设置元素的 "enter-from" 状态
function onBeforeEnter(el) {
}

// 在元素被插入到 DOM 之后的下一帧被调用
// 用这个来开始进入动画
function onEnter(el, done) {
  // 调用回调函数 done 表示过渡结束
  // 如果与 CSS 结合使用，则这个回调是可选参数
  done()
}

// 当进入过渡完成时调用。
function onAfterEnter(el) {
}

function onEnterCancelled(el) {
}

// 在 leave 钩子之前调用
// 大多数时候，你应该只会用到 leave 钩子
function onBeforeLeave(el) {
}

// 在离开过渡开始时调用
// 用这个来开始离开动画
function onLeave(el, done) {
  // 调用回调函数 done 表示过渡结束
  // 如果与 CSS 结合使用，则这个回调是可选参数
  done()
}

// 在离开过渡完成、
// 且元素已从 DOM 中移除时调用
function onAfterLeave(el) {
}

// 仅在 v-show 过渡中可用
function onLeaveCancelled(el) {
}
```

### appear

首次加载时，出现过渡效果

```vue

<Transition appear>
...
</Transition>
```

## TransitionGroup

`<TransitionGroup>` 是一个内置组件，用于对 v-for 列表中的元素或组件的插入、移除和顺序改变添加动画效果。

### 和 `<Transition>` 的区别

`<TransitionGroup>` 支持和 `<Transition>` 基本相同的 props、CSS 过渡 class 和 JavaScript 钩子监听器，但有以下几点区别：

- 默认情况下，它不会渲染一个容器元素。但你可以通过传入 tag prop 来指定一个元素作为容器元素来渲染。

- 过渡模式在这里不可用，因为我们不再是在互斥的元素之间进行切换。

- 列表中的每个元素都必须有一个独一无二的 key attribute。

- CSS 过渡 class 会被应用在列表内的元素上，而不是容器元素上。

:::tip
当在 DOM 模板中使用时，组件名需要写为 `<transition-group>`。
:::

### 进入 / 离开动画

这里是 `<TransitionGroup>` 对一个 `v-for` 列表添加进入 / 离开动画的示例：

```vue

<TransitionGroup name="list" tag="ul">
<li v-for="item in items" :key="item">
	{{ item }}
</li>
</TransitionGroup>
```

```css
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
```

### 列表的移动过渡

添加 name 属性，添加 name-move css样式类名，添加动画样式

```vue

<template>
	<div>
		<button @click="random">random</button>
		<transition-group name="xxx" class="wraps" tag="div">
			<div class="items" v-for="item in list" :key="item.id">
				{{ item.number }}
			</div>
		</transition-group>
	</div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import _ from 'lodash'

const list = ref(Array.apply(null, {length: 81}).map((value, index) => {
	return {
		id: index,
		number: (index % 9) + 1
	}
}))
const random = () => {
	list.value = _.shuffle(list.value)
	console.log(_.shuffle(list.value))
	
	// console.log(list.arr)
}
</script>

<style scoped>
.wraps {
	display: flex;
	flex-wrap: wrap;
	width: calc(25px * 10 + 9px);
	
	.items {
		width: 25px;
		height: 25px;
		border: 1px solid #ccc;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}

.xxx-move {
	transition: all 1s;
}
</style>
```

### 状态过渡

Vue 也同样可以给数字 Svg 背景颜色等添加过度动画
案例是数字的状态过渡

```vue

<template>
	<div>
		<input v-model="num.current" type="number" step="20">
		<div>{{num.tweenedNumber.toFixed(0)}}</div>
	</div>
</template>

<script setup lang="ts">
import {reactive, watch} from "vue";
import gsap from "gsap";

const num = reactive({
	current: 0,
	tweenedNumber: 0
})
watch(() => num.current, (newV, oldV) => {
	gsap.to(num, {
		duration: 2,
		tweenedNumber: newV
	})
})
</script>

<style scoped>

</style>
```

## 环境变量
环境变量：他的主要作用就是让开发者区分不同的运行环境，来实现兼容开发和生产

例如 `npm run dev` 就是开发环境  `npm run build` 就是生产环境等等

Vite 在一个特殊的 import.meta.env 对象上暴露环境变量。这里有一些在所有情况下都可以使用的内建变量
```json
{
"BASE_URL":"/", //部署时的URL前缀
"MODE":"development", //运行模式
"DEV":true,"  //是否在dev环境
PROD":false, //是否是build 环境
"SSR":false //是否是SSR 服务端渲染模式
}
```

:::tip
**需要注意的一点就是这个环境变量不能使用动态赋值 `import.meta.env[key]` 因为这些环境变量在打包的时候是会被硬编码的通过 JSON.stringify 注入浏览器的**
:::

### 配置额外的环境变量
在根目录新建 env 文件 可以创建多个

如下  .env.[name]
![img](/环境变量.png)

修改启动命令

在 package json 配置 --mode env文件名称
![img](/环境变量2.png)

:::tip
跟据创建的 env 的文件名来进行不同的配置，如果名字是 development 和 production 启动项可以不用更改，可以自动获取
:::

### 在vite.config.ts 使用环境变量
![img](/环境变量3.png)
```ts
import { fileURLToPath, URL } from 'node:url'
 
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
 
 
 
// https://vitejs.dev/config/
export default ({mode}:any) => {
 
  console.log(loadEnv(mode,process.cwd()))
  
  return defineConfig({
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  })
} 
```
我们就可以通过环境变量这个值 做一些事情比如 切换接口url 等 
:::tip
本地起项目，可以使用http-server
，全局安装`npm install -g http-server`

在目标文件夹中使用
`http-server -p 9002`命令 后面是端口号
:::
## 性能优化
[详情CSDN(小满zs)](https://xiaoman.blog.csdn.net/article/details/126811832)

## Vue3 Web Components
[详情CSDN(小满)](https://xiaoman.blog.csdn.net/article/details/127328300)