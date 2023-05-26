import {defineConfig} from 'vitepress'
import getNavs from "./config/nav";
import sidebar from "./config/sidebar";


export default defineConfig({
  // title:'Vite',
  head: [
    ['link', {rel: 'icon', type: 'image/svg+xml', href: 'https://lpuena.github.io/vitePress/32.png'}],
  ],
  lastUpdated: true,
  markdown: {
    lineNumbers: true,
  },
  base: '/vitePress/',
  themeConfig: {
    outline: [2, 4],//侧边栏深度:数字或者deep
    // outlineTitle: '文章目录',
    siteTitle: 'Blog',
    // logo: '/32.png',
    nav: getNavs(),
    sidebar,
  },

})
