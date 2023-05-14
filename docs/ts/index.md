# 快速入门

## TypeScript简介

1. TypeScript是JavaScript的超集。
2. 它对JS进行了扩展，向JS中引入了类型的概念，并添加了许多新的特性。
3. TS代码需要通过编译器编译为JS，然后再交由JS解析器执行。
4. TS完全兼容JS，换言之，任何的JS代码都可以直接当成JS使用。
5. 相较于JS而言，TS拥有了静态类型，更加严格的语法，更强大的功能，TS可以在代码执行前就完成代码的检查，减小了运行时异常的出现的几率；
6. TS代码可以编译为任意版本的JS代码，可有效解决不同JS运行环境的兼容问题；
7. 同样的功能，TS的代码量要大于JS，但由于TS的代码结构更加清晰，变量类型更加明确，在后期代码的维护中TS却远远胜于JS。

## TypeScript 开发环境搭建

1. 下载Node.js

2. 安装Node.js

3. 使用npm全局安装typescript

- 进入命令行
- 输入：npm i -g typescript

4. 创建一个ts文件

5. 使用tsc对ts文件进行编译

- 进入命令行

- 进入ts文件所在目录

- 执行命令：tsc xxx.ts

## Rollup构建TS项目

### 初始化项目

生成package.json文件

```shell
npm init -y
```

### 安装依赖

1. 全局安装 rollup

```shell
npm install rollup -g
```

2. 安装 TypeScript 转换器

```shell
npm install rollup-plugin-typescript2 -D
```

3. 安装代码压缩插件

```shell
npm install rollup-plugin-terser -D
```

4. 安装 rollupweb 服务

```shell
npm install rollup-plugin-serve -D
```

5. 安装热更新

```shell
npm install rollup-plugin-livereload -D
```

6. 引入外部依赖

```shell
npm install rollup-plugin-node-resolve -D
```

7. 安装配置环境变量用来区分本地和生产

```shell
npm install cross-env -D
```

8. 替换环境变量给浏览器使用

```shell
npm install rollup-plugin-replace -D
```

### 配置文件

配置rollup.config.js文件

```js
import path from "path";
import ts from 'rollup-plugin-typescript2'
import serve from 'rollup-plugin-serve'
import livereload from "rollup-plugin-livereload";
import {terser} from 'rollup-plugin-terser'
import replace from "rollup-plugin-replace";

const isDev = () => {
  return process.env.NODE_ENV === 'development'
}
export default {
  // 入口
  input: "./src/index.ts",
  // 出口
  output: {
    file: path.resolve(__dirname, './lib/index.js'),
    format: 'umd',
    sourcemap: true,
  },
  plugins: [
    ts(),
    terser(),
    isDev() && livereload(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    isDev() && serve({
      open: true,
      port: 2000,
      openPage: '/public/index.html'
    })
  ]
}
```

配置tsconfig.json
> `sourceMap` 可以让压缩后的代码精确定位

```json
{
  "compilerOptions": {
    "target": "ES2015",
    "module": "ES2015",
    "sourceMap": true
  }
}

```

### 启动

package.json

```json
{
  "dev": "cross-env NODE_ENV=development rollup -c -w",
  "build": "cross-env NODE_ENV=production rollup -c"
}

```

## webpack

> 通常情况下，实际开发中我们都需要使用构建工具对代码进行打包，TS同样也可以结合构建工具一起使用，下边以webpack为例介绍一下如何结合构建工具使用TS。

### 1.初始化项目

```shell
 npm init -y
```

### 2.下载构建工具

```shell
npm i -D webpack webpack-cli webpack-dev-server html-webpack-plugin
npm i -D typescript ts-loader clean-webpack-plugin
```

> 共安装了7个包

- webpack

> 构建工具webpack

- webpack-cli

> webpack的命令行工具，webpack4以上需要

- webpack-dev-server

> webpack的开发服务器

- typescript

> ts编译器

- ts-loader

> ts加载器，用于在webpack中编译ts文件

- html-webpack-plugin

> webpack中html插件，用来自动创建html文件

- clean-webpack-plugin (可以不用安装，webpack5内置有)

> webpack中的清除插件，每次构建都会先清除目录

### 3.配置文件webpack.config.js

> 根目录下创建webpack的配置文件webpack.config.js

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
//webpack5 不用使用这个插件，直接在output中增加clean:true就行 //[!code --]
const {CleanWebpackPlugin} = require("clean-webpack-plugin"); //[!code --]

module.exports = {
  optimization: {
    minimize: false // 关闭代码压缩，可选
  },

  entry: "./src/index.ts",
  mode: 'development',
  devtool: "inline-source-map",

  devServer: {
    contentBase: './dist'
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true, //[!code ++]
    environment: {
      arrowFunction: false // 关闭webpack的箭头函数，可选
    }
  },

  resolve: {
    extensions: [".ts", ".js"]
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "ts-loader"
        },
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),//[!code --]
    new HtmlWebpackPlugin({
      // title: 'TS测试'
      template: "./public/index.html"
    }),
  ]
}
```

### 4.创建tsconfig.json

> 根目录下创建tsconfig.json，配置可以根据自己需要

```json
{
  "compilerOptions": {
    "target": "ES2015",
    "module": "ES2015",
    "strict": true
  }
}
```

### 5.修改package.json

> 添加如下配置

```json
  {
  "scripts": {
    "build": "webpack",
    "dev": "webpack-dev-server",
    "start": "webpack serve --open chrome.exe"
  }
}
```

### 6.执行

在src下创建ts文件，并在并命令行执行```npm run build```对代码进行编译，或者执行```npm start```来启动开发服务器

## esbuild+swc

前端工具层出不穷，之前有常用的打包工具webpack，现在有了速度更快的vite。 vite的开发模式是基于esBuild编译的,打包又是基于rollup,启动项目是很快的。

### esbuild为什么这么快

在esbuild的官方介绍中打包three.js 只需要0.37秒 无限接近于亚索的Q技能冷却时间可以说是很快了。

esbuild是go语言编写的并且是多线程执行,性能是js的好几十倍，所以很快。

- 无需缓存即可实现基础打包
- 支持 ES6 跟 CommonJS 模块
- 支持ES 6 Tree Shaking
- 体积小
- 插件化
- 其他
- 内置支持编译 jsx

### SWC

SWC则宣称其比Babel快20倍(四核情况下可以快70倍)
swc是用rust写的，所实现的功能跟babel一样，es6语法转es5，但是速度比babel更快，前端基建工具使用rust的是越来越多了，未来可能还会有一个替代postCss的😂。

那如果把esbuild + swc结合起来构建那岂不是接近光速 我们来try try

### 安装依赖

```shell
npm install @swc/core esbuild @swc/helpers @types/node
```

- @swc/core 是 swc 的核心包

> 用于编译 JavaScript 和 TypeScript 代码

- esbuild

> 是一个快速的 JavaScript 和 TypeScript 构建工具

- @swc/helpers

> 是 swc 的辅助包，用于转换 JSX 代码

- @types/node

> 是node的声明文件包，提供fs

### 修改 tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "node"
  }
}
```

### 配置config.ts

```ts
import esbuild from 'esbuild'
import swc from '@swc/core'
import fs from 'node:fs'

await esbuild.build({
  entryPoints: ['./src/index.ts'],
  outdir: "dist",
  treeShaking: true,
  bundle: true,
  loader: {
    '.js': "js",
    '.ts': "ts",
    '.jsx': "jsx",
    '.tsx': "tsx",
  },
  plugins: [
    {
      name: "swc-loader",
      setup(build) {
        build.onLoad({filter: /\.(js|ts|jsx|tsx)$/}, (args) => {
          const content = fs.readFileSync(args.path, 'utf-8')
          // console.log(content)
          const {code} = swc.transformSync(content, {
            filename: args.path
          })
          console.log(code)
          return {
            contents: code
          }
        })
      }
    }
  ]
})
```

修改package.json，添加type

```json
{
  "type": "module"
}
```

### 启动

```shell
ts-node-esm config.ts
```

## Babel

> 经过一系列的配置，使得TS和webpack已经结合到了一起，除了webpack，开发中还经常需要结合babel来对代码进行转换以使其可以兼容到更多的浏览器，在上述步骤的基础上，通过以下步骤再将babel引入到项目中。

### 1.安装依赖包

```shell
yarn add -D @babel/core @babel/preset-env babel-loader core-js
```

- 共安装了4个包，分别是：
  - @babel/core
    - babel的核心工具
  - @babel/preset-env
    - babel的预定义环境
  - @babel-loader
    - babel在webpack中的加载器
  - core-js
    - core-js用来使老版本的浏览器支持新版ES语法

### 2.修改webpack.config.js配置文件

```javascript

module: {
  rules: [
    {
      test: /\.ts$/,
      use: [
        {
          loader: "babel-loader",
          // 配置babel
          options: {
            presets: [
              [
                // 指定加载器
                "@babel/preset-env",
                // 配置信息
                {
                  // 要兼容的目标浏览器
                  "targets": {
                    "chrome": "58",
                    "ie": "11"
                  },
                  // 指定corejs版本
                  "corejs": "3",
                  // 使用corejs的方式 ”usage“ 表示按需加载
                  "useBuiltIns": "usage"
                }
              ]
            ]
          }
        },
        {
          loader: "ts-loader",

        }
      ],
      exclude: /node_modules/
    }
  ]
}

```

:::tip
如此一来，使用ts编译后的文件将会再次被babel处理，使得代码可以在大部分浏览器中直接使用，可以在配置选项的targets中指定要兼容的浏览器版本。
:::

