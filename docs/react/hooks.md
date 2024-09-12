# hooks
## 在项目中启用@别名(vite)
vite.config.ts
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url' // 需要安装node的类型声明

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

```
tsconfig.json
```json
{
  "baseUrl": ".",
  "paths": {
    "@/*":["./src/*"]
  }
}
```

## tsx
函数式组件
```tsx
import React from "react"

// React.FC<T> 表示这是一个函数式的 react 组件,T 代表的是props的类型
const App: React.FC = () => {
  return (
    <>
      Hello
    </>
  )
}

export default App
```
## useState
`useState` 是一个 React Hook，它允许你向组件添加一个状态变量。
```js
const [index, setIndex] = useState(initialState);
```
`index` 是一个 `state` 变量，`setIndex` 是对应的 `setter` 函数。 `initialState` 为设置的初始值

这里的 `[` 和 `]` 语法称为数组解构，它允许你从数组中读取值。 useState 返回的数组总是正好有两项。


```jsx
function Demo() {
  const [count, setCount] = useState(0);
  const [form, setForm] = useState({name:'zs'});
  const clickHandler = (name, e) => {
    console.log('button', name, e);
    setCount(count +1);
    setForm({
      ...form,
      name:'ls'
    });
  }
  return (
    <>
      <h1>{count}</h1>
      <h1>{form.name}</h1>
      <button onClick={(e) => clickHandler('json', e)}>click</button>
    </>
  )
}
```
:::tip
`useState` 必须在组件中使用，`setCount(count++)` 或者 `setCount(++count)` 会报错
:::


## useRef
`useRef` 是一个 React Hook，可让您引用渲染不需要的值。

```jsx
const ref = useRef(initialValue)
```
使用 ref 来操作 DOM，DOM可用时，ref.current获取DOM（渲染完毕DOM后才可用）
```jsx
import { useRef } from 'react';

function MyComponent() {
  const inputRef = useRef(null);
  // ...
```

:::warning
渲染期间请勿写入或读取 `ref.current`
:::

## useEffect
useEffect 是一个 React Hook 函数，用于在React组件中创建不是由事件引起而是由渲染本身引起的操作，比如发送AJAX请求，更改DOM等等。
```jsx
import { useEffect } from 'react';
function MyComponent() {
  useEffect(() => {
    // 在此处执行副作用代码
  }, [dependencies]);
  
  return (
    // JSX 组件渲染
  );
}
```
- 第一个参数是一个函数，用于定义要执行的副作用代码。
- 第二个参数是一个依赖数组（可选）。如果提供依赖数组，那么副作用函数仅在依赖数组中的值发生变化时才会执行。
如果未提供依赖数组，副作用函数将在每次组件渲染后都执行。

使用场景：

在组件挂载后执行副作用，相当于 `componentDidMount`
```jsx
useEffect(() => {
  // 在组件挂载后执行的代码
}, []);
```
在组件挂载和指定依赖变化后执行副作用：
```jsx
const someValue = // some value that you want to watch for changes

useEffect(() => {
  // 在组件挂载后和 someValue 变化时执行的代码
}, [someValue]);

```

依赖项参数说明：
| 依赖项 | 副作用执行时机 |
|:-----:|:------:|
| 没有依赖项 | 组件初始化渲染+组件更新时执行 |
| 空数组依赖 | 只在初始渲染时执行一次 |
| 添加特定依赖项 | 组件初始渲染+特性依赖项变化时执行 |

### 清除副作用
在 useEffect 中编写的由渲染本身引起的对接组件外部的操作，
社区也经常把它叫做副作用操作，比如在 `useEffect` 中开启了一个定时器，在组件卸载时把这个定时器再清理掉，这个过程就是清理副作用
```jsx
function Son(){
  useEffect(()=>{
    const timer = setInterval(()=>{
      console.log('定时器执行中...');
    },1000)
    return ()=>{
      // 清除副作用（组件卸载时）
      clearInterval(timer)
    }
  },[])
  return <div>this is son</div>
}
function App(){
  // 通过条件渲染模拟组件卸载
  const [show,setShow] = useState(true)
  return(
    <>
    {show && <Son />}
    <button onClick={()=>setShow(false)}>卸载Son组件</button>
    </>
  )
}
```
:::tip
清除副作用的函数最常见的执行时机就是在组件卸载时自动执行
:::


## 自定义Hook函数
1. 声明一个以use打头的函数
2. 在函数体内封装可复用的逻辑（只要是可复用的逻辑）
3. 在组件中，用到的状态回调return出去（以对象或者数组）
4. 在哪个组件中用到这个逻辑，就执行这个函数，解构出来状态和回调进行使用

## React Hooks使用规则
- 只能在组件中或者其他自定义Hook函数中调用
- 只能在组件的顶层调用，不能嵌套在if、for、其他函数中 
