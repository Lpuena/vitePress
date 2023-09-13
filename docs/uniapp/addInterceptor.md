# addInterceptor 添加拦截器

[```uni.addInterceptor(STRING, OBJECT)```](https://uniapp.dcloud.net.cn/api/interceptor.html#)

仅支持异步接口
## 请求拦截器
`uni.addInterceptor('request', OBJECT)`, 拦截 `uni.request()`

request 调用
> 要先引入这个工具文件
> `import "@/utils/http";`
```ts
function testApi() {
  uni.request({
    method: "GET",
    url: "/home/banner",
    success: (res) => {
      console.log(res);
    },
  });
}
```
请求拦截器添加
```ts
// 封装request
const baseURL = "https://pcapi-xiaotuxian-front-devtest.itheima.net";

// 添加拦截器
const httpInterceptor = {
  // 拦截前触发
  invoke: (options: UniApp.RequestOptions) => {
    // 1.拼接baseUrl（非http开头的）
    options.url = options.url.startsWith("http")
      ? options.url
      : baseURL + options.url;

    // 2.请求超时，默认60s
    options.timeout = 10000;
    // 3.添加小程序端请求头标识
    options.header = {
      ...options.header,
      "source-client": "miniapp",
    };
    // 4. 添加token请求头表示
    const memberStore = useMemberStore();
    const token = memberStore.profile?.token;
    if (token) options.header.Authorization = token;
    console.log("request options", options);
  },
};

uni.addInterceptor("request", httpInterceptor);
```

## 封装请求函数
导出封装好的函数

```ts
export const http = <T>(options: UniApp.RequestOptions) => {
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      success: (res) => {
        // 提取核心数据
        resolve(res.data as Data<T>);
      },
    });
  });
};
```
根据接口返回的类型，写接口类型
```ts
interface Data<T> {
  code: string;
  msg: string;
  result: T;
}
```

## 完善请求函数
```ts
export const http = <T>(options: UniApp.RequestOptions) => {
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      // 响应成功
      success: (res) => {
        console.log("res ", res);
        if (res.statusCode >= 200 && res.statusCode < 300) {
          // 提取核心数据
          resolve(res.data as Data<T>);
        } else if (res.statusCode === 401) {
          // 401错误，清理用户信息，跳转到登录页面
          const memberStore = useMemberStore();
          memberStore.clearProfile();
          uni.navigateTo({
            url: "/pages/login/login",
          });
          reject(res);
        } else {
          // 其他报错
          uni.showToast({
            title: (res.data as Data<T>).msg || "请求失败",
            icon: "none",
          });
          reject(res);
        }
      },
      // 响应失败
      fail: (err) => {
        uni.showToast({
          title: "网络错误,请求失败",
          icon: "none",
        });
        reject(err);
      },
    });
  });
};
```
