# Puppeteer
Puppeteer
- 支持分布式爬取
- 实现了深度优先和广度优先算法
- 支持 csv 和 json line 格式导出
- 插件式的结果存储，比如支持 redis
- 自动插入 jquery，可以使用 jquery 语法进行结果处理
- 支持截图作为爬取证据
- 支持模拟不同的设备

## 安装
```shell
npm install pnpm -g
```
```shell
npm init -y
pnpm add puppeteer
tsc --init
```
## 截图案例
```ts
import puppeteer from "puppeteer"

//延迟函数
const sleep = (time: number) => {
  return new Promise((r, j) => {
    setTimeout(() => {
      r(time)
    }, time)
  })
}

(async () => {
  //通过 launch 生成一个’浏览器‘实例,
  //option 中的 headless 是个布尔值，如果是 false 的话你就会看到一个浏览器从打开，到完成     //你整个任务的全过程，
  //默认是 true，也就是在后台自动完成你的任务
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized']
  })
  //打开一个新的标签页
  const page = await browser.newPage()
  //跳转到对应的页面
  await page.goto('https://jd.com')
  //获取搜索框的元素
  const key = await page.$('#key')
  //聚焦
  await key?.focus()
  //搜索东西
  await page.keyboard.sendCharacter('iphone13')
  //点击搜索按钮
  await page.click('.button')
  //延迟一秒钟
  await sleep(1000)
  //等待元素加载完成
  await page.waitForSelector('.gl-item')
  //开始自动滚动为了截图全屏有数据
  let scrollEnable: boolean = true;
  let scrollStep: number = 500
  while (scrollEnable) {
    scrollEnable = await page.evaluate((scrollStep: number) => {
      let scrollTop: number = document.scrollingElement?.scrollTop ?? 0;
      document.scrollingElement!.scrollTop = scrollTop + scrollStep;
      return document.body.clientHeight > scrollTop + 1080 ? true : false
    }, scrollStep)
    //防止滚动过快
    await sleep(500)
  }
  //截图全屏
  await page.screenshot({path: `iphone13.png`, fullPage: true})


})()
```
