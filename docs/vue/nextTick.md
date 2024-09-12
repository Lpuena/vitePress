# event loop 和 nextTick

在我们学习nextTick 之前需要先了解Event Loop 事件循环机制

## JS 执行机制

在我们学js 的时候都知道js 是单线程的如果是多线程的话会引发一个问题在同一时间同时操作DOM
一个增加一个删除JS就不知道到底要干嘛了，所以这个语言是单线程的但是随着HTML5到来js也支持了多线程webWorker 但是也是不允许操作DOM

单线程就意味着所有的任务都需要排队，后面的任务需要等前面的任务执行完才能执行，如果前面的任务耗时过长，后面的任务就需要一直等，
一些从用户角度上不需要等待的任务就会一直等待，这个从体验角度上来讲是不可接受的，所以JS中就出现了异步的概念。

## 同步任务

代码从上到下按顺序执行

## 异步任务

### 宏任务

script(整体代码)、setTimeout、setInterval、UI交互事件、postMessage、Ajax

### 微任务

Promise.then catch finally、MutaionObserver、process.nextTick(Node.js 环境)

![img](https://up8.wang/images/js-execute-rule-02.png)

运行机制

所有的同步任务都是在主进程执行的形成一个执行栈，主线程之外，还存在一个"任务队列"
，异步任务执行队列中先执行宏任务，然后清空当次宏任务中的所有微任务，然后进行下一个tick如此形成循环。
## nextTick
nextTick 就是创建一个异步任务，那么它自然要等到同步任务执行完成后才执行。

```vue

<template>
	<div ref="xiaoman">
		{{ text }}
	</div>
	<button @click="change">change div</button>
</template>

<script setup lang='ts'>
import {ref, nextTick} from 'vue';

const text = ref('小满开飞机')
const xiaoman = ref<HTMLElement>()

const change = async () => {
	text.value = '小满不开飞机'
	console.log(xiaoman.value?.innerText) //小满开飞机
	await nextTick();
	console.log(xiaoman.value?.innerText) //小满不开飞机
}


</script>

<style scoped>
</style>
```

:::tip
当我们操作dom的时候，发现数据读取的是上次的，就需要使用nextTick，因为Vue更新dom是异步的，数据更新是同步的。

nextTick的两种使用方法

1. 回调函数模式

```ts
nextTick(() => {
  console.log(xiaoman.value?.innerText)
})
```

2. async await 写法

```ts
const method = async () => {
  //awiat 后面都是异步的
  await nextTick()
  console.log(xiaoman.value?.innerText)
}
```

:::

## 如何去理解Tick
例如我们显示器是60FPS

那浏览器绘制一帧就是1000 / 60  ≈ 16.6ms

那浏览器这一帧率做了什么

1. 处理用户的事件，就是event 例如 click，input change 等。

2. 执行定时器任务

3. 执行 requestAnimationFrame

4. 执行dom 的回流与重绘

5. 计算更新图层的绘制指令

6. 绘制指令合并主线程 如果有空余时间会执行 requestidlecallback

所以 一个Tick 就是去做了这些事

