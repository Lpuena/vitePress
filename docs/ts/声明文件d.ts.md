# 声明文件d.ts
## 声明文件 declare  
当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。

```ts

declare var //声明全局变量
declare function //声明全局方法
declare class //声明全局类
declare enum //声明全局枚举类型
declare namespace //声明（含有子属性的）全局对象
interface 和 type //声明全局类型

```
例如我们有一个 `express` 和 `axios`
![image](/声明文件.png)

发现 `express` 报错了，让我们去下载他的声明文件
```shell
npm install @types/node -D
```
那为什么 `axios` 没有报错 ，我们可以去 `node_modules` 下面去找 `axios` 的 `package.json`
```json
 "types": {
        "require": "./index.d.cts",
        "default": "./index.d.ts"
      },
```
发现 `axios` 已经指定了声明文件，所以没有报错可以直接用，通过语法 `declare` 暴露我们声明的 `axios` 对象 ，`declare  const axios: AxiosStatic`;

如果有一些第三方包确实没有声明文件我们可以自己去定义 ，新建一个 `typings` 的文件夹，在其中创建名称为 `xx.d.ts` 的文件去声明


## 案例手写声明文件
index.ts
```ts
import express from 'express'

const app = express()

const router = express.Router()

app.use('/api', router)

router.get('/list', (req, res) => {
  res.json({
    code: 200
  })
})

app.listen(9001, () => {
  console.log(9001)
})
```
express.d.ts
```ts
declare module 'express' {
  interface Router {
    get(path: string, cb: (req: any, res: any) => void): void
  }

  interface App {

    use(path: string, router: any): void

    listen(port: number, cb?: () => void): void
  }

  interface Express {
    (): App

    Router(): Router

  }

  const express: Express
  export default express
}
```