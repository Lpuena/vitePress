# 创建uniapp项目
> uni-app支持通过 可视化界面、vue-cli命令行 两种方式快速创建项目。

## HBuilderX
## 使用命令行
创建以 typescript 开发的工程
```shell
npx degit dcloudio/uni-preset-vue#vite-ts my-vue3-project
```

## vscode推荐插件
- mrmaoddxxaa.create-uniapp-view --> 创建 uni-app 页面
- uni-helper.uni-helper-vscode -->  uni-app 代码提示
- evils.uniapp-vscode --> uni-app 文档


## 引入 uni-ui 组件库
### 操作步骤
[安装 uni-ui 组件库](https://uniapp.dcloud.net.cn/component/uniui/quickstart.html#npm%E5%AE%89%E8%A3%85)
```shell
pnpm install @dcloudio/uni-ui
```
### 配置自动导入组件
```json
// pages.json
{
  // 组件自动导入
  "easycom": {
    "autoscan": true,
    "custom": {
      // uni-ui 规则如下配置  
      "^uni-(.*)": "@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue" 
    }
  },
  "pages": [
    // …省略
  ]
}
```
### 安装类型声明文件
```shell
pnpm i -D @uni-helper/uni-ui-types
```
### 配置类型声明文件
```json
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": [
      "@dcloudio/types", // uni-app API 类型
      "miniprogram-api-typings", // 原生微信小程序类型
      "@uni-helper/uni-app-types", // uni-app 组件类型
      "@uni-helper/uni-ui-types" // uni-ui 组件类型  
    ]
  },
  // vue 编译器类型，校验标签类型
  "vueCompilerOptions": {
    "nativeTags": ["block", "component", "template", "slot"]
  }
}
```




## 组件自动导入
在pages.json文件中
```json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      // uni-ui 规则如下配置
      "^uni-(.*)": "@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue",
      // 以Xtx开头的组件，在components中查找(修改完，需要重启服务)
      "^Xtx(.*)": "@/components/Xtx$1.vue"
    }
  }
}
```

声明组件的类型
> component.d.ts
> 自动导入的组件，就有类型了
```ts
import XtxSwiper from "@/components/XtxSwiper.vue";

/**
 * declare module '@vue/runtime-core'
 *   现调整为
 * declare module 'vue'
 */
import "vue";
declare module "vue" {
  export interface GlobalComponents {
    XtxSwiper: typeof XtxSwiper;
  }
}

```

