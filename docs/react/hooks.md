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
