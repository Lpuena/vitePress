# Server
Nuxt 支持在 `server` 目录写服务器接口，用于数据请求。
## 创建接口
目录结构
```
-server
--| video
----| index.get.ts
```
```ts
import video from "~/database/video"

export default defineEventHandler(() => {
  return video
})
```
在页面中调用接口
```vue
<script setup lang="ts">
  const { data: videoList } = await useFetch('/api/video')
</script>
```
