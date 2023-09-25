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

## 路由跳转携带参数


```html
<navigator
  hover-class="none"
  :url="`/pages/hot/hot?type=${item.type}`"
  class="cards"
>
  <image class="image" mode="aspectFit" :src="item.pictures[0]"></image>
  <image class="image" mode="aspectFit" :src="item.pictures[1]"></image>
</navigator>
```
两种方法，一种是onLoad中的options，另一种的vue的props传参
```ts
onLoad((options) => {
  console.log(options);
});
const query = defineProps<{
  type: number;
}>();
console.log("query", query);
```

## 分包和预下载
在 src 下新建一个文件夹，新建页面分包。使用 [`preloadRule`](https://uniapp.dcloud.net.cn/collocation/pages.html#preloadrule) 来设置预下载

示例如下：
```json
{
  //分包加载规则
  "subPackages": [
    {
      // 子包的根目录(刚才的新建文件夹)
      "root": "pagesMember",
      // 页面路径和窗口表现
      "pages": [
        {
          "path": "settings/settings",
          "style": {
            "navigationBarTitleText": "设置"
          }
        }
      ]
    }
  ],
  // 分包预下载规则
  "preloadRule": {
    // 打开my页面的时候，进行预下载
    "pages/my/my":{
      "network": "all",
      "packages": ["pagesMember"]
    }
  }
}
```
分包一般是按照项目的业务模块划分，如会员模块分包，订单模块分包等

## 从手机相册中选择图片
`uni.chooseMedia`
```ts
uni.chooseMedia({
  count: 1,
  mediaType: ['image'],
  success: (res) => {
    // 微信图片临时路径
    const { tempFilePath } = res.tempFiles[0]
  },
})
```
## 将本地资源上传到开发者服务器
`uni.uploadFile`

这里如果想要跟 `request` 一样被拦截的话，要添加拦截器 `uni.addInterceptor('uploadFile', httpInterceptor)`
```ts
uni.uploadFile({
  url: '/member/profile/avatar',
  name: 'file',
  filePath: tempFilePath,
  success: (success) => {
    if (success.statusCode === 200) {
      const { avatar } = JSON.parse(success.data).result
      console.log(avatar)
      profile.value!.avatar = avatar
      uni.showToast({ icon: 'success', title: '头像更新成功' })
    }
    else {
      uni.showToast({ icon: 'error', title: '头像更新失败' })
    }
  },
  fail: (fail) => {
    console.log(fail)
  },
})
```
