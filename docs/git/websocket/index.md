# webSocket
WebSocket 是一种用于在客户端和服务器之间进行实时双向通信的网络协议。
它提供了一种持久化的连接，使得服务器可以主动向客户端发送数据，而不需要客户端频繁地发起请求。

WebSocket 协议建立在 HTTP 协议之上，使用标准的 TCP 端口（通常是 80 或 443）。它通过在握手阶段升级 HTTP 连接为 WebSocket 连接，然后通过 WebSocket 连接传输数据。

WebSocket 协议提供了以下优点：

1. 实时性：WebSocket 允许服务器主动推送数据给客户端，实现实时的双向通信，适用于实时聊天、实时数据更新等场景。

2. 低延迟：与传统的轮询或长轮询相比，WebSocket 采用长连接方式，减少了每次通信的开销，从而降低了延迟。

3. 较少的数据传输量：WebSocket 使用二进制帧进行数据传输，相对于文本传输，它的数据包大小更小，可以减少网络带宽的使用。

4. 跨域支持：WebSocket 具有跨域能力，可以在不同域名或端口之间建立连接，实现跨域通信。


## 后端搭建
### 安装的包
```shell
ni @types/ws
ni ws
```
### Node.js 的 ws 模块
```ts
import WebSocket from 'ws'

// websocket.client 客户端   websocket.server 服务端
const webSocketServer = new WebSocket.Server({ port: 8000 })
// 服务和链接，长链接
// 可能有多个对象
const pool = new Map()
let num = 0
webSocketServer.on('connection', (ws) => {
  pool.set(`connection${num++}`, ws)
  // 必须转成字符串发送
  ws.send(JSON.stringify({ type: 'ping' }))
  ws.on('message', (data) => {
    console.log(data.toString())
  })
  ws.on('close', () => {

  })
  ws.on('error', () => {

  })
})

```
:::tip
TS 中使用 import 需要将`esModuleInterop`设置为 true
:::

## 前台
App.vue
```vue
<script setup lang="ts">
import { ref } from 'vue'

const inputValue = ref('')
// 建立和webSocket服务的链接
const client = new WebSocket('ws://localhost:8000')
client.onopen = (event) => {
  console.log('链接上了')
}
client.onmessage = (event) => {
  // 在event.data中就有后端传递过来的转换成字符的对象
  console.log(JSON.parse(event.data))
}
client.onclose = (event) => {
  console.log('close', event)
}
client.onerror = (event) => {
  console.log('error', event)
}
function sendMsg() {
  client.send(inputValue.value)
}
</script>

<template>
  <div>
    <div>
      用户
      <input v-model="inputValue" type="text">
      <button @click="sendMsg">
        发送
      </button>
      <button>关闭</button>
    </div>
  </div>
</template>

<style scoped>
</style>

```
