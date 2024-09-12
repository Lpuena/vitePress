# Vue+webpack(从0搭建)

## 初始化项目结构（跟cli 结构保持一致）

1. 生成package.json

```shell
npm init -y
```

2. 生成tsconfig.json
> 如果没有tsc 安装npm install typescript -g

```shell
tsc --init
```

3. public/index.html
4. src/App.vue
5. src/main.ts

## 安装所需要的依赖包
```json
{
  "name": "vue-webpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "webpack-dev-server",
    "build": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "css-loader": "^6.8.1",  //处理css文件
    "html-webpack-plugin": "^5.5.1", //html 模板
    "style-loader": "^3.3.3", //处理style样式
    "ts-loader": "^9.4.3", //处理ts
    "typescript": "^5.0.4", //ts
    "vue": "^3.3.4",  //vue
    "webpack": "^5.84.1",
    "webpack-cli": "^5.1.1",
    "webpack-dev-server": "^4.15.0"
  },
  "dependencies": {
    "@vue/compiler-sfc": "^3.3.4", //解析vue文件
    "friendly-errors-webpack-plugin": "^1.7.0", //美化dev
    "vue-loader": "^17.1.2" //解析vue
  }
}

```
## 配置 vue 声明文件
> 不然ts 识别不了 vue 后缀

src/env.d.ts
```ts
declare module "*.vue" {
    import { DefineComponent } from "vue"
    const component: DefineComponent<{}, {}, any>
    export default component
  }
```

## 编写webpack.config.js
```js
// 基于nodejs 的 commonJs规范
const {Configuration} = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {VueLoaderPlugin} = require('vue-loader/dist/index')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
/**
 * @type {Configuration} //配置智能提示(vscode)
 */


const config = {
  mode: 'development',
  entry: './src/main.ts', //入口文件
  output: {
    filename: "[hash].js",
    path: path.resolve(__dirname, 'dist'), //出口文件
    clean: true, //打包清空dist
  },
  module: {
    rules: [
      {
        test: /\.vue$/, //解析vue 模板
        use: "vue-loader"
      },
      {
        // 用来匹配 .css 结尾的文件
        test: /\.css$/, 
        // use 数组里面 Loader 执行顺序是从右到左
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.ts$/, // 解析ts
        loader: 'ts-loader',
        options: {
          // process.cwd() 获取根目录
          configFile: path.resolve(process.cwd(), 'tsconfig.json'),
          appendTsSuffixTo: [/\.vue$/]
        }
      },
    ]
  },
  stats: "errors-only", //取消提示(控制台只显示错误信息)
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "8080", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src') // 别名
    },
    extensions: ['.js', '.json', '.vue', '.ts', '.tsx'] //识别后缀
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html" //html模板
    }),
    new VueLoaderPlugin(), //解析vue
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: { //美化样式
        messages: [process.env.npm_lifecycle_event==='dev' ? 'You application is running here http://localhost:8080':'build成功']
      }
    })
  ],
  externals: {
    vue:'Vue' //减小打包后的体积，使用 vue 需要在 public/index.html 文件中使用 CDN 引入
  }
}
module.exports = config
```

