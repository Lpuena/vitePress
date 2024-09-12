# SEO
通过设置网页 title 和 description 等 SEO 优化信息，由服务端渲染，可提高网页在搜索引擎结果页面中的排名和可见性 。
```vue
<script setup lang="ts">
// SEO 优化信息
useSeoMeta({
  // 网站标题
  title: '哔哩哔哩 (゜-゜)つロ 干杯~-bilibili',
  // 网站描述
  description:
    'bilibili是国内知名的在线视频弹幕网站，拥有最棒的ACG氛围，哔哩哔哩内容丰富多元，涵盖动漫、电影、二次元舞蹈视频、在线音乐、娱乐时尚、科技生活、鬼畜视频等。下载客户端还可离线下载电影、动漫。',
  // 搜索关键词
  keywords: 'B站,bilibili,哔哩哔哩,哔哩哔哩动画,动漫,电影,在线动漫,高清电影',
  // 绕过b站防盗链
  referrer:'no-referrer',
})
</script>
```
