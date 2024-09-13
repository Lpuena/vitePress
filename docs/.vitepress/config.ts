import { defineConfig } from 'vitepress'
import getNavs from "./config/nav";
import getSidebar from "./config/sidebar";


export default defineConfig({
  lang: 'zh-Hans',
  title: 'FrontEnd Blog',
  description: 'A front-end blog powered by VitePress',
  head: [
    // ['link', {rel: 'icon', type: 'image/svg+xml', href: 'https://lpuena.github.io/vitePress/32.png'}],
    ['link', {rel: 'icon', type: 'image/svg+xml', href: 'https://lpuena.github.io/vitepress/Lp-1.svg'}],
  ],
  lastUpdated: true,
  markdown: {
    lineNumbers: true,
  },
  base: '/vitepress/',
  themeConfig: {
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },
    logo: '/Lp-1.svg',

    // outlineTitle: '文章目录',
    siteTitle: 'FrontEnd',
    // logo: '/32.png',
    nav: getNavs(),
    sidebar:getSidebar(),
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航',
      level: [2, 4],
    },
  },

})
