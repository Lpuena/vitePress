import {defineConfig} from 'vitepress'
import getNavs from "./config/nav";
import sidebar from "./config/sidebar";


export default defineConfig({
  // title:'Vite',
  head: [
    // ['link', {rel: 'icon', type: 'image/svg+xml', href: 'https://lpuena.github.io/vitePress/32.png'}],
    ['link', {rel: 'icon', type: 'image/svg+xml', href: 'https://lpuena.github.io/vitePress/Lp-1.svg'}],
  ],
  lastUpdated: true,
  markdown: {
    lineNumbers: true,
  },
  base: '/vitePress/',
  themeConfig: {
    search: {
      provider: "local",
    },
    outline: [2, 4],//侧边栏深度:数字或者deep
    // outlineTitle: '文章目录',
    siteTitle: 'FrontEnd',
    // logo: '/32.png',
    nav: getNavs(),
    sidebar,
  },

})
