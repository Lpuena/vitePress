# canvas指纹技术
技术场景（常用于广告联盟）
例如你在某个网站上看到某个商品没有登录过账号信息，过两天用同台电脑访问其他网站的时候却发现很多同类商品的广告。

在过去我们可能使用 cookie 去追踪用户信息，不过弊端也很明显 cookie 可以被用户禁止掉，从而无法追踪，并且无法跨域访问。

或者就是浏览器指纹（navigator）

userAgent(用户代理)
```
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36'
```

language (浏览器的语言)
```
'zh-CN'
```
platform(操作系统)
```
'MacIntel'  // Mac英特尔
``` 
这些指纹不能对某个人进行唯一性标识，也无法对客户端进行唯一性判定，基于HTML5的诸多高级指纹对此提供了新思路

### canvas指纹

canvas相信我们大家都用过，例如绘制一些图形，游戏等等，都会用到。它也可以用来跟踪用户当我们调用toDataURL转换base64，
他底层会获取设备，操作系统，浏览器，三合一的唯一标识，如果其他用户使用的这三个信息和你一样的话也是重复这个概率是很低的也不排除有可能。
### 生成canvas指纹
```js
const uuid = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const txt = 'test';
    ctx.fillText(txt, 10, 10)
    console.log(canvas.toDataURL())
    return md5(canvas.toDataURL())
}
```
每个浏览器的信息不同，生成的base64码也不同但是图片是一样的

### 如何防止跟踪

安装浏览器插件，谷歌应用商店有随机修改canvas指纹的插件（CanvasFingerprintBlock），其原理是，
每次随机往 canvas 画布里面注入一个随机的噪音（人肉眼是看不到的），从而影响base64加密结果


