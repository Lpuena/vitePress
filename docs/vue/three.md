# 二、常用 Composition API

官方文档: https://v3.cn.vuejs.org/guide/composition-api-introduction.html

## 1.拉开序幕的setup

1. 理解：Vue3.0中一个新的配置项，值为一个函数。
2. setup是所有<strong style="color:#DD5145">Composition API（组合API）</strong><i style="color:gray;font-weight:bold">“
   表演的舞台 ”</i>。
3. 组件中所用到的：数据、方法等等，均要配置在setup中。
4. setup函数的两种返回值：
    1. 若返回一个对象，则对象中的属性、方法, 在模板中均可以直接使用。（重点关注！）
    2. <span style="color:#aad">若返回一个渲染函数：则可以自定义渲染内容。（了解）</span>
5. 注意点：
    1. 尽量不要与Vue2.x配置混用
        - Vue2.x配置（data、methos、computed...）中<strong style="color:#DD5145">可以访问到</strong>setup中的属性、方法。
        - 但在setup中<strong style="color:#DD5145">不能访问到</strong>Vue2.x配置（data、methos、computed...）。
        - 如果有重名, setup优先。
    2. setup不能是一个async函数，因为返回值不再是return的对象, 而是promise,
       模板看不到return对象中的属性。（后期也可以返回一个Promise实例，但需要Suspense和异步组件的配合）

## 2.ref函数

- 作用: 定义一个响应式的数据
- 语法: ```const xxx = ref(initValue)```
    - 创建一个包含响应式数据的<strong style="color:#DD5145">引用对象（reference对象，简称ref对象）</strong>。
    - JS中操作数据： ```xxx.value```
    - 模板中读取数据: 不需要.value，直接：```<div>{{xxx}}</div>```
- 备注：
    - 接收的数据可以是：基本类型、也可以是对象类型。
    - 基本类型的数据：响应式依然是靠``Object.defineProperty()``的```get```与```set```完成的。
    - 对象类型的数据：内部 <i style="color:gray;font-weight:bold">“ 求助 ”</i> 了Vue3.0中的一个新函数—— ```reactive```函数。

:::tip
通过 ref 来获取 dom，获取到的是组件的实力类型
`<div ref="dom">我是dom</div>`

`const dom = ref()`

定义的 `ref` 变量名称要和在 `html` 标签中的相对应

在TS中用 `Instanceof<type of xxx>` 来表示实例类型
:::

## 3.reactive函数

- 作用: 定义一个<strong style="color:#DD5145">对象类型</strong>的响应式数据（基本类型不要用它，要用```ref```函数）
- 语法：```const 代理对象= reactive(源对象)```接收一个对象（或数组），返回一个<strong style="color:#DD5145">
  代理对象（Proxy的实例对象，简称proxy对象）</strong>
- reactive定义的响应式数据是“深层次的”。
- 内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据进行操作。

:::tip
在使用 reactive 定义复杂结构的响应式数据时，如果你要对其赋值，会丢失其响应性。

解决方法：

1. 使用 ref 定义

`const arr= ref([])`

`arr.value = [1, 2, 3]`

2. push新增数据

`const arr = reactive([])`

`arr.push(...[1, 2, 3])`

3. 再封装一层数据（推荐！）

`const state = reactive({
arr: []
});`

`state.arr = [1, 2, 3]`
:::

## 4.Vue3.0中的响应式原理

### vue2.x的响应式

- 实现原理：
  - 对象类型：通过```Object.defineProperty()```对属性的读取、修改进行拦截（数据劫持）。

  - 数组类型：通过重写更新数组的一系列方法来实现拦截。（对数组的变更方法进行了包裹）。

    ```js
    Object.defineProperty(data, 'count', {
        get () {}, 
        set () {}
    })
    ```

- 存在问题：
    - 新增属性、删除属性, 界面不会更新。
    - 直接通过下标修改数组, 界面不会自动更新。

### Vue3.0的响应式

- 实现原理:
  - 通过Proxy（代理）:  拦截对象中任意属性的变化, 包括：属性值的读写、属性的添加、属性的删除等。
  - 通过Reflect（反射）:  对源对象的属性进行操作。
  - MDN文档中描述的Proxy与Reflect：
    - Proxy：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy

    - Reflect：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect

    ```js
    new Proxy(data, {
      // 拦截读取属性值
      get (target, prop) {
        return Reflect.get(target, prop)
      },
      // 拦截设置属性值或添加新属性
      set (target, prop, value) {
        return Reflect.set(target, prop, value)
      },
      // 拦截删除属性
      deleteProperty (target, prop) {
        return Reflect.deleteProperty(target, prop)
      }
    })
    
    proxy.name = 'tom'   
    ```

:::tip
`reactive` 后的 `proxy` 对象 不能直接赋值，否则会破坏响应式对象

解决方案：

1. `reactive` 的数组，可以使用 `push` 方法加解构。
2. 添加一个对象，把数组作为一个属性去解决。
   :::

## 5.reactive对比ref

- 从定义数据角度对比：
  - ref用来定义：<strong style="color:#DD5145">基本类型数据</strong>。
  - reactive用来定义：<strong style="color:#DD5145">对象（或数组）类型数据</strong>。
  - 备注：ref也可以用来定义<strong style="color:#DD5145">对象（或数组）类型数据</strong>, 它内部会自动通过```reactive```
    转为<strong style="color:#DD5145">代理对象</strong>。
- 从原理角度对比：
  - ref通过``Object.defineProperty()``的```get```与```set```来实现响应式（数据劫持）。
    - reactive通过使用<strong style="color:#DD5145">Proxy</strong>来实现响应式（数据劫持）,
      并通过<strong style="color:#DD5145">Reflect</strong>操作<strong style="color:orange">源对象</strong>内部的数据。
- 从使用角度对比：
    - ref定义的数据：操作数据<strong style="color:#DD5145">需要</strong>```.value```
      ，读取数据时模板中直接读取<strong style="color:#DD5145">不需要</strong>```.value```。
    - reactive定义的数据：操作数据与读取数据：<strong style="color:#DD5145">均不需要</strong>```.value```。

## 6.setup的两个注意点

- setup执行的时机
    - 在beforeCreate之前执行一次，this是undefined。

- setup的参数
    - props：值为对象，包含：组件外部传递过来，且组件内部声明接收了的属性。
    - context：上下文对象
        - attrs: 值为对象，包含：组件外部传递过来，但没有在props配置中声明的属性, 相当于 ```this.$attrs```。
        - slots: 收到的插槽内容, 相当于 ```this.$slots```。
        - emit: 分发自定义事件的函数, 相当于 ```this.$emit```。

## 7.计算属性与监视

### 1.computed函数

- 与Vue2.x中computed配置功能一致

- 写法

  ```js
  import {computed} from 'vue'
  
  //计算属性——简写
  //函数式写法 只能支持一个getter函数，不允许修改值的
    let fullNameA = computed(()=>{
        return person.firstName + '-' + person.lastName
    })
    //计算属性——完整
    //选项式写法 支持一个对象传入get函数以及set函数自定义操作
    let fullNameB = computed({
        get(){
            return person.firstName + '-' + person.lastName
        },
        set(newValue){
            const nameArr = newValue.split('-')
            person.firstName = nameArr[0]
            person.lastName = nameArr[1]
            //简写，解构赋值
            [firstName.value,lastName.value] = newValue.split('-')
        }
    })

  ```

### 2.watch函数

- 与Vue2.x中watch配置功能一致

- 两个小“坑”：

    - 监视reactive定义的响应式数据时：oldValue无法正确获取、强制开启了深度监视（deep配置失效）。
    - 监视reactive定义的响应式数据中某个属性时：deep配置有效。

  ```js
  //情况一：监视ref定义的响应式数据
  watch(sum,(newValue,oldValue)=>{
  	console.log('sum变化了',newValue,oldValue)
  },{immediate:true})
  
  //情况二：监视多个ref定义的响应式数据
  watch([sum,msg],(newValue,oldValue)=>{
  	console.log('sum或msg变化了',newValue,oldValue)
  }) 
  
  /* 情况三：监视reactive定义的响应式数据
  			若watch监视的是reactive定义的响应式数据，则无法正确获得oldValue！！
  			若watch监视的是reactive定义的响应式数据，则强制开启了深度监视 
  */
  watch(person,(newValue,oldValue)=>{
  	console.log('person变化了',newValue,oldValue)
  },{immediate:true,deep:false}) //此处的deep配置不再奏效
  
  //情况四：监视reactive定义的响应式数据中的某个属性
  watch(()=>person.job,(newValue,oldValue)=>{
  	console.log('person的job变化了',newValue,oldValue)
  },{immediate:true,deep:true,flush:'pre'})
  // pre 组件更新之前调用，sync同步执行， post组件更新之后执行 
  
  //情况五：监视reactive定义的响应式数据中的某些属性
  watch([()=>person.job,()=>person.name],(newValue,oldValue)=>{
  	console.log('person的job变化了',newValue,oldValue)
  },{immediate:true,deep:true})
  
  //特殊情况
  watch(()=>person.job,(newValue,oldValue)=>{
      console.log('person的job变化了',newValue,oldValue)
  },{deep:true}) //此处由于监视的是reactive素定义的对象中的某个属性，所以deep配置有效
  ```
  :::tip
  配置项的flush

  flush:'pre'

  `pre` 组件更新之前调用，`sync` 同步执行， `post` 组件更新之后执行
  :::

### 3.watchEffect函数

- watch的套路是：既要指明监视的属性，也要指明监视的回调。

- watchEffect的套路是：不用指明监视哪个属性，监视的回调中用到哪个属性，那就监视哪个属性。

- watchEffect有点像computed：

    - 但computed注重的计算出来的值（回调函数的返回值），所以必须要写返回值。
    - 而watchEffect更注重的是过程（回调函数的函数体），所以不用写返回值。

  ```js
  //watchEffect所指定的回调中用到的数据只要发生变化，则直接重新执行回调。
  watchEffect(()=>{
      const x1 = sum.value
      const x2 = person.age
      console.log('watchEffect配置的回调执行了')
  })
  ```

#### 接受参数回调

回调在 `watchEffect` 中总是先执行

```ts
watchEffect((oninvalidate) => {
  console.log('message2========>', message2.value)
  oninvalidate(() => {
    console.log('before')
  })
})
```

#### 停止监听

```ts
const stop = watchEffect((oninvalidate) => {
  console.log('message2========>', message2.value)
  oninvalidate(() => {
    console.log('before')
  })
})

// 调用stop函数直接停止监听
const stopWatch = () => stop()
```

#### 配置项

```ts
const stop = watchEffect((cb) => {
  let ipt: HTMLInputElement = document.querySelector('#ipt')
  console.log('elll', ipt)
  console.log('message2========>', message2.value)
  cb(() => {
    console.log('before')
  })

}, {
  flush: "post",// [!code ++]
  onTrigger(e) { // [!code ++]
    console.log(e) // [!code ++]
    debugger // [!code ++]
  }
})
```

## 8.生命周期

- Vue3.0中可以继续使用Vue2.x中的生命周期钩子，但有有两个被更名：
  - ```beforeDestroy```改名为 ```beforeUnmount```
  - ```destroyed```改名为 ```unmounted```
- Vue3.0也提供了 Composition API 形式的生命周期钩子，与Vue2.x中钩子对应关系如下：
  - `beforeCreate` ==>`setup()`
  - `created` ==>`setup()`
  - `beforeMount` ==>`onBeforeMount`
  - `mounted` ==>`onMounted`  (可以读取到dom)
  - `beforeUpdate` ==>`onBeforeUpdate`
  - `updated` ==>`onUpdated`
  - `beforeUnmount`==>`onBeforeUnmount`
  - `unmounted`  ==>`onUnmounted`
  - `onRenderTracked`  用来调试的
  - `onRenderTriggered`  用来调试的

```ts
onRenderTracked((e) => {
  console.log(e)
})
onRenderTriggered((e) => {
  console.log(e)
})
```

获取组件当前实例

```ts
const instance = getCurrentInstance()
console.log(instance)
```

## 9.自定义hook函数

- 什么是hook？—— 本质是一个函数，把setup函数中使用的Composition API进行了封装。

- 类似于vue2.x中的mixin。

- 自定义hook的优势: 复用代码, 让setup中的逻辑更清楚易懂。

## 10.toRef/toRefs

- 作用：创建一个 ref 对象，其value值指向另一个对象中的某个属性。
- 语法：
```ts
const person = reactive({
  name: 'zs',
});
const nameRef = toRef(person,'name')
person.name = 'ww'
nameRef.value = 'ls'
```
- 应用:   要将响应式对象中的某个属性单独提供给外部使用时。


- 扩展：```toRefs``` 与```toRef```功能一致，但可以批量创建多个 ref 对象，语法：```toRefs(person)```

:::tip
`toRef` 只能修改修改响应式对象的值，非响应式视图毫无变化

`toRefs` 可以把他当成一个响应式对象的解构，解构出来的属性，依旧是响应式的ref。
:::
```ts
const man = reactive({name: 'Gxx', age: 20})
let {name, age} = toRefs(man)
age.value++
```
