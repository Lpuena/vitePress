# Electron桌面应用
electron 内置了 Chromium 和 nodeJS 其中 Chromium 是渲染进程 主要渲染和解析HTML，Nodejs作为主进程，其中管道用IPC 通信
## 使用vite 构建 electron项目
创建一个vite 项目
```shell
npm create vite@latest
```
安装electron
```shell
npm install electron -D
npm install vite-plugin-electron -D
```
根目录新建 electron / index.ts
```ts

const {app, BrowserWindow} = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })
  console.log(process.env, '===>')
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    win.loadFile('dist/index.html')
  }
}

app.whenReady().then(() => {
  createWindow()
})
```
修改vite.config.ts 配置文件
```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import electron from "vite-plugin-electron";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),electron({
    entry:'electron/index'
  })],
})
```
配置package json 增加main 字段 type 去掉
```json
{
  "name": "electron-demo",
  "private": true,
  "version": "0.0.0",
  "main": "dist-electron/index.js",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.2.47"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^4.1.0",
    "electron": "^25.0.0",
    "electron-builder": "^23.6.0",
    "typescript": "^5.0.2",
    "vite": "^4.3.9",
    "vite-plugin-electron": "^0.11.2",
    "vue-tsc": "^1.4.2"
  }
}

```
## 打包Electron
需要安装electron-builder
```shell
npm install electron-builder -D
```
package json 配置 build 修改npm run build命令
```json
{
  "name": "electron-demo",
  "private": true,
  "version": "0.0.0",
  "main": "dist-electron/index.js",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build ",//[!code --]
    "build": "vue-tsc && vite build && electron-builder",//[!code ++]
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.2.47"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^4.1.0",
    "electron": "^25.0.0",
    "electron-builder": "^23.6.0",
    "typescript": "^5.0.2",
    "vite": "^4.3.9",
    "vite-plugin-electron": "^0.11.2",
    "vue-tsc": "^1.4.2"
  },
  "build": { //[!code ++]
    "appId": "com.electron.desktop", //[!code ++]
    "productName": "electron", //[!code ++]
    "asar": true, //[!code ++]
    "copyright": "Copyright © 2022 electron", //[!code ++]
    "directories": { //[!code ++]
      "output": "release/" //[!code ++]
    }, //[!code ++]
    "files": [ //[!code ++]
      "dist", //[!code ++]
      "dist-electron" //[!code ++]
    ], //[!code ++]
    "mac": { //[!code ++]
      "artifactName": "${productName}_${version}.${ext}", //[!code ++]
      "target": [ //[!code ++]
        "dmg" //[!code ++]
      ]//[!code ++]
    }, //[!code ++]
    "win": { //[!code ++]
      "target": [ //[!code ++]
        { //[!code ++]
          "target": "nsis", //[!code ++]
          "arch": [ //[!code ++]
            "x64" //[!code ++]
          ] //[!code ++]
        } //[!code ++]
      ], //[!code ++]
      "artifactName": "${productName}_${version}.${ext}" //[!code ++]
    }, //[!code ++]
    "nsis": { //[!code ++]
      "oneClick": false, //[!code ++]
      "perMachine": false, //[!code ++]
      "allowToChangeInstallationDirectory": true, //[!code ++]
      "deleteAppDataOnUninstall": false //[!code ++]
    }, //[!code ++]
    "publish": [ //[!code ++]
      { //[!code ++]
        "provider": "generic", //[!code ++]
        "url": "http://127.0.0.1:8080" //[!code ++]
      } //[!code ++]
    ], //[!code ++]
    "releaseInfo": { //[!code ++]
      "releaseNotes": "版本更新的具体内容" //[!code ++]
    } //[!code ++]
  } //[!code ++]
}

```
nsis 配置详解 
```json
{"oneClick": false, // 创建一键安装程序还是辅助安装程序（默认是一键安装）
    "allowElevation": true, // 是否允许请求提升，如果为false，则用户必须使用提升的权限重新启动安装程序 （仅作用于辅助安装程序）
    "allowToChangeInstallationDirectory": true, // 是否允许修改安装目录 （仅作用于辅助安装程序）
    "installerIcon": "public/timg.ico",// 安装程序图标的路径
    "uninstallerIcon": "public/timg.ico",// 卸载程序图标的路径
    "installerHeader": "public/timg.ico", // 安装时头部图片路径（仅作用于辅助安装程序）
    "installerHeaderIcon": "public/timg.ico", // 安装时标题图标（进度条上方）的路径（仅作用于一键安装程序）
    "installerSidebar": "public/installerSiddebar.bmp", // 安装完毕界面图片的路径，图片后缀.bmp，尺寸164*314 （仅作用于辅助安装程序）
    "uninstallerSidebar": "public/uninstallerSiddebar.bmp", // 开始卸载界面图片的路径，图片后缀.bmp，尺寸164*314 （仅作用于辅助安装程序）
    "uninstallDisplayName": "${productName}${version}", // 控制面板中的卸载程序显示名称
    "createDesktopShortcut": true, // 是否创建桌面快捷方式
    "createStartMenuShortcut": true,// 是否创建开始菜单快捷方式
    "shortcutName": "SHom", // 用于快捷方式的名称，默认为应用程序名称
    "include": "script/installer.nsi",  // NSIS包含定制安装程序脚本的路径，安装过程中自行调用  (可用于写入注册表 开机自启动等操作)
    "script": "script/installer.nsi",  // 用于自定义安装程序的NSIS脚本的路径
    "deleteAppDataOnUninstall": false, // 是否在卸载时删除应用程序数据（仅作用于一键安装程序）
    "runAfterFinish": true,  // 完成后是否运行已安装的应用程序（对于辅助安装程序，应删除相应的复选框）
    "menuCategory": false, // 是否为开始菜单快捷方式和程序文件目录创建子菜单，如果为true，则使用公司名称
}
```

打包到 release 文件夹
```shell
npm run build
``` 
