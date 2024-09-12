# 单文件组件 CSS 功能

## Scoped和样式穿透

主要是用于修改很多vue常用的组件库（element, Vant, AntDesign），虽然配好了样式但是还是需要更改其他的样式，就需要用到**样式穿透**

### scoped的原理

vue中的scoped 通过在DOM结构以及css样式上加唯一不重复的标记:data-v-hash的方式，以保证唯一（而这个工作是由过PostCSS转译实现的），达到样式私有化模块化的目的。

总结一下scoped三条渲染规则：

> 1. 给HTML的DOM节点加一个不重复data属性(形如：data-v-123)来表示他的唯一性
> 2. 在每句css选择器的末尾（编译后的生成的css语句）加一个当前组件的data属性选择器（如[data-v-123]）来私有化样式
> 3. 如果组件内部包含有其他组件，只会给其他组件的最外层标签加上当前组件的data属性

PostCSS会给一个组件中的所有dom添加了一个独一无二的动态属性data-v-xxxx，然后，给CSS选择器额外添加一个对应的属性选择器来选择该组件中dom，这种做法使得样式只作用于含有该属性的dom——组件内部dom,
从而达到了'样式模块化'的效果.

### 案例修改Element ui Input样式

发现没有生效

```vue

<template>
	<div style="margin: 200px">
		<el-input class="ipt"></el-input>
	</div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
.ipt {
	.el-input__inner {
		background-color: red;
	}
}
</style>
```

如果不写Scoped 就没问题

原因就是Scoped 搞的鬼 他在进行PostCss转化的时候把元素选择器默认放在了最后

```html

<style type="text/css">.ipt .el-input__inner[data-v-7a7a37b1] {
  background-color: red;
}
</style>
```

Vue 提供了样式穿透:deep() 他的作用就是用来改变 属性选择器的位置

```vue

<style scoped lang="less">
.ipt {
	:deep(.el-input__inner) {
		background-color: red;
	}
}
</style>
```

```html

<style type="text/css">.ipt[data-v-7a7a37b1] .el-input__inner {
  background-color: red;
}
</style>
```

## 插槽选择器

A 组件定义一个插槽

```vue

<template>
	<div>
		我是插槽
		<slot></slot>
	</div>
</template>

<script>
export default {}
</script>

<style scoped>

</style>
```

在App.vue 引入

```vue

<template>
	<div>
		<A>
			<div class="a">私人定制div</div>
		</A>
	</div>
</template>

<script setup>
import A from "@/components/A.vue"
</script>


<style lang="less" scoped>
</style>
```

在被引用的A组件修改class a 的颜色

```vue

<style scoped>
.a {
	color: red
}
</style>
```

发现没有效果，默认情况下，作用域样式不会影响到 `<slot/>` 渲染出来的内容，因为它们被认为是父组件所持有并传递进来的。

解决方法：使用 `slotted`

```vue

<style scoped>
:slotted(.a) {
	color: red
}
</style>
```

## 全局选择器

在之前我们想加入全局 样式 通常都是新建一个 `style` 标签 不加 scoped 现在有更加优雅的解决方案

```vue

<style>
div {
	color: red
}
</style>

<style lang="less" scoped>

</style>
```

```vue

<style lang="less" scoped>
:global(div) {
	color: red
}
</style>
```

效果等同于上面

## 动态 CSS

单文件组件的 `<style>` 标签可以通过 `v-bind` 这一 CSS 函数将 CSS 的值关联到动态的组件状态上：

```vue

<template>
	<div class="div">
		小满是个弟弟
	</div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'

const red = ref<string>('red')
</script>

<style lang="less" scoped>
.div {
	color: v-bind(red)
}

</style>
```

如果是对象 v-bind 请加引号

```vue

<template>
	<div class="div">
		小满是个弟弟
	</div>
</template>

<script lang="ts" setup>
import {ref} from "vue"

const red = ref({
	color: 'pink'
})
</script>

<style lang="less" scoped>
.div {
	color: v-bind('red.color');
}
</style>
```

## css module

`<style module>` 标签会被编译为 CSS Modules 并且将生成的 CSS 类作为 $style 对象的键暴露给组件

```vue

<template>
	<div :class="$style.red">
		小满是个弟弟
	</div>
</template>

<style module>
.red {
	color: red;
	font-size: 20px;
}
</style>
```

自定义注入名称（多个可以用数组）

你可以通过给 module attribute 一个值来自定义注入的类对象的 property 键

```vue

<template>
	<div :class="[gxx.red,gxx.border]">
		小满是个弟弟
	</div>
</template>

<style module="gxx">
.red {
	color: red;
	font-size: 20px;
}

.border {
	border: 1px solid #ccc;
}
</style>
```

与组合式 API 一同使用

注入的类可以通过 useCssModule API 在 `setup()` 和 `<script setup>` 中使用。
对于使用了自定义注入名称的 `<style module>` 模块，useCssModule 接收一个对应的 module attribute 值作为第一个参数

```vue

<template>
	<div :class="[gxx.red,gxx.border]">
		小满是个弟弟
	</div>
</template>


<script setup lang="ts">
import {useCssModule} from 'vue'

const css = useCssModule('gxx')
</script>

<style module="gxx">
.red {
	color: red;
	font-size: 20px;
}

.border {
	border: 1px solid #ccc;
}
</style>
```

使用场景一般用于TSX 和 render 函数 居多

## Vue3集成Tailwind CSS

Tailwind CSS 是一个由js编写的CSS 框架 他是基于postCss 去解析的

官网地址[Tailwind CSS 中文文档 - 无需离开您的HTML，即可快速建立现代网站。](https://www.tailwindcss.cn/)

对于PostCSS的插件使用，我们再使用的过程中一般都需要如下步骤：

1. PostCSS 配置文件 postcss.config.js，新增 tailwindcss 插件。
2. TaiWindCss插件需要一份配置文件，比如:tailwind.config.js。

[PostCSS - 是一个用 JavaScript 工具和插件来转换 CSS 代码的工具 | PostCSS 中文网](https://www.postcss.com.cn/)

postCss 功能介绍

1. 增强代码的可读性 （利用从 Can I Use 网站获取的数据为 CSS 规则添加特定厂商的前缀。 Autoprefixer
   自动获取浏览器的流行度和能够支持的属性，并根据这些数据帮你自动为 CSS 规则添加前缀。）

2. 将未来的 CSS 特性带到今天！（PostCSS Preset Env 帮你将最新的 CSS 语法转换成大多数浏览器都能理解的语法，并根据你的目标浏览器或运行时环境来确定你需要的
   polyfills，此功能基于 cssdb 实现。）

3. 终结全局 CSS（CSS 模块 能让你你永远不用担心命名太大众化而造成冲突，只要用最有意义的名字就行了。）

4. 避免 CSS 代码中的错误（通过使用 stylelint 强化一致性约束并避免样式表中的错误。stylelint 是一个现代化 CSS 代码检查工具。它支持最新的
   CSS 语法，也包括类似 CSS 的语法，例如 SCSS 。）

postCss 处理 tailWind Css 大致流程

- 将CSS解析成抽象语法树(AST树)
- 读取插件配置，根据配置文件，生成新的抽象语法树
- 将AST树”传递”给一系列数据转换操作处理（变量数据循环生成，切套类名循环等）
- 清除一系列操作留下的数据痕迹
- 将处理完毕的AST树重新转换成字符串

安装

1. 初始化项目

```shell
npm init vue@latest
```

2. 安装 Tailwind 以及其它依赖项

```shell
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest 
```

3. 生成配置文件

```shell
npx tailwindcss init -p
```

[配置 - Tailwind CSS 中文文档](https://www.tailwindcss.cn/docs/configuration)

4. 修改配置文件 tailwind.config.js
   2.6版本

```js
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

3.0版本

```js
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

5. 创建一个src/Tailwind/index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

6. 在 main.ts 引入

```ts
import './Tailwind/index.css'
```

最后 `npm run dev` 就可以运行了

```vue

<template>
	<div class="w-screen h-screen bg-red-400 flex justify-center items-center text-8xl text-slate-100">
		hello Tailwind
	</div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
```
:::tip
如果使用了eslint的话，需要多两步操作
:::
```shell
npm i -D eslint-plugin-tailwindcss
```
在 `.eslintrc` 文件中添加
```json
module.exports = {
  root: true,
  extends: ["plugin:tailwindcss/recommended"],
}
```
## 什么是css原子化？

CSS原子化的优缺点

1.减少了css体积，提高了css复用

2.减少起名的复杂度

3.增加了记忆成本 将css拆分为原子之后，你势必要记住一些class才能书写，哪怕tailwindcss提供了完善的工具链，你写background，也要记住开头是bg

### 接入unocss

**tips：最好用于vite，webpack属于阉割版功能很少**

安装

```shell
npm i -D unocss
```

vite.config.ts

```ts
import unocss from 'unocss/vite'

plugins: [vue(), vueJsx(), unocss({
  rules: []
})],
```

main.ts 引入

```ts
import 'uno.css'
```

配置静态css，在vite.config.ts中

```ts
rules: [
  ['flex', {display: "flex"}]
]
```

![img](/unocss.png)

配置动态css（使用正则表达式）

`m-`参数*10 例如 `m-10` 就是 `margin:100px`

```ts
rules: [
  [/^m-(\d+)$/, ([, d]) => ({margin: `${Number(d) * 10}px`})],
  ['flex', {display: "flex"}]
]

```

![img](/unocss2.png)

shortcuts 可以自定义组合样式

```ts
  plugins: [vue(), vueJsx(), unocss({
  rules: [
    [/^m-(\d+)$/, ([, d]) => ({margin: `${Number(d) * 10}px`})],
    ['flex', {display: "flex"}],
    ['pink', {color: 'pink'}]
  ],
  shortcuts: {
    btn: "pink flex"
  }
})],
```

![img](/unocss3.png)

### unocss 预设

```ts
import {presetIcons, presetAttributify, presetUno} from 'unocss'

...
presets:[presetIcons(), presetAttributify(), presetUno()]
```

#### 1. presetIcons Icon图标预设

图标集合安装

```shell
npm i -D @iconify-json/ic
```

首先我们去[icones](https://icones.js.org/)官网（方便浏览和使用iconify）浏览我们需要的icon，比如这里我用到了Google Material
Icons图标集里面的baseline-add-circle图标

```html

<div class="i-ic-baseline-backspace text-3xl bg-green-500"/>
```

#### 2. presetAttributify 属性化模式支持

属性语义化 无须class

```html

<div font="black">
  btn
</div>
```

![img](/unocss4.png)

#### 3. presetUno 工具类预设

默认的 [@unocss/preset-uno](https://github.com/unocss/unocss/tree/main/packages/preset-uno) 预设（实验阶段）是一系列流行的原子化框架的
通用超集，包括了 Tailwind CSS，Windi CSS，Bootstrap，Tachyons 等。

例如，ml-3（Tailwind），ms-2（Bootstrap），ma4（Tachyons），mt-10px（Windi CSS）均会生效。