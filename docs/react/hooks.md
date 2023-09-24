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
