# 前端埋点SDK

埋点就是 数据采集-数据处理-数据分析和挖掘，如用户停留时间，用户哪个按钮点的多，等

技术架构使用ts + rollup

使用ts主要是在编译过程中发现问题，减少生产代码的错误，

使用rollup 应为 rollup打包干净，而webpack非常臃肿，可读性差，所以rollup非常适合开发SDK和一些框架，webpack 适合开发一些项目

## 目录结构设计

![img](/sdk.png)

## 安装开发依赖

```shell
npm install rollup -D
npm install rollup-plugin-dts -D
npm install rollup-plugin-typescript2 -D
npm install typescript -D
```

## 配置rollup.config.js
> 新版本写法
```js
import ts from 'rollup-plugin-typescript2'
import path from 'path'
import {fileURLToPath} from 'url'
const metaUrl = fileURLToPath(import.meta.url)
const dirname = path.dirname(metaUrl)
import dts from 'rollup-plugin-dts';
export default [{
  //入口文件
  input: "./src/core/index.ts",
  output: [
    //打包esModule
    {
      file: path.resolve(dirname, './dist/index.esm.js'),
      format: "es"
    },
    //打包common js
    {
      file: path.resolve(dirname, './dist/index.cjs.js'),
      format: "cjs"
    },
    //打包 AMD CMD UMD
    {
      input: "./src/core/index.ts",
      file: path.resolve(dirname, './dist/index.js'),
      format: "umd",
      name: "tracker"
    }

  ],
  //配置ts
  plugins: [
    ts(),
  ]

}, {
  //打包声明文件
  input: "./src/core/index.ts",
  output:{
    file: path.resolve(dirname, './dist/index.d.ts'),
    format: "es",
  },
  plugins: [dts()]
}]
```
