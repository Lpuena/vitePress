# Express
## 安装
```shell
ni express --save
```
## init
```js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```
使用ts可以这么写
```ts
import express from 'express'
import type { Express, Request, Response } from 'express'

const app:Express = express()

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})
app.listen(3000, () => {
  console.log('Example app listening on http://localhost:3000')
})
```
:::tip
使用import需要在 `tsconfig.json` 中将 `esModuleInterop` 打开
:::
```json
"compilerOptions": {
    "esModuleInterop": true
  },
```

## get请求
`get` 请求的参数传在 `req.query` 中，前端使用axios，参数传递在 `{params:query}` 中
```ts
app.get('/user', (req: Request, res: Response) => {
  console.log(req.query.name)

  res.send(req.query.name)
})
```

## post请求
`post`请求的参数在 `req.body` 中

使用 `app.use(express.json())` 解析参数
```ts
app.use(express.json())
app.post('/login', (req: Request, res: Response) => {
  console.log(req.body.name)

  if (req.body.name === 'admin' && req.body.password === '123456') {
    res.json({
      route: [
        {
          path: '/demo1',
          name: 'Demo1',
          component: 'demo1.vue',
        },
      ],
    })
  }
  else {
    res.json({
      code: 400,
      message: '账号密码错误',
    })
  }
})
```


