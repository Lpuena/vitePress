import {defineConfig} from 'vitepress'

export default defineConfig({
  head:[
    [
      'link',
      { rel: 'icon', href: '/32.png'}
    ]
  ],
  lastUpdated: true,
  markdown: {
    lineNumbers: true,
  },
  base: '/vitePress/',
  themeConfig: {
    siteTitle: 'Blog',
    // logo: '/32.png',
    nav: [
      {text: 'Git', link: '/git/Git'},
      {text: 'Vue', link: '/vue/', activeMatch: '/vue/'},
      // {text: 'JS', link: '/js/', activeMatch: '/js/'},
      {
        text: 'TypeScript',
        items: [
          {
            // Title for the section.
            // text: 'Section A Title',
            items: [
              {text: 'TypeScript', link: '/ts/'},
              {text: 'JavaScript', link: '/js/'}
            ]
          }
        ]
      },
      {text: 'Webpack', link: '/webpack/', activeMatch: '/webpack/'},
      // {text: 'Github', link: 'https://github.com/Lpuena'},
      {text: 'About', link: '/about'},
    ],
    sidebar: {
      '/webpack/': [
        {
          text: '基础',
          collapsible: true,
          collapsed: false, //默认展开
          items: [
            // This shows `/guide/index.md` page.(必须有index.md)
            {text: '前言', link: '/webpack/'},
            {text: '基本使用', link: '/webpack/基本使用'},
            {text: '基本配置', link: '/webpack/基本配置'},
            {text: '开发模式介绍', link: '/webpack/开发模式介绍'},
            {text: '处理样式资源', link: '/webpack/处理样式资源'},
            // {text: '处理样式资源', link: '/webpack/处理样式资源'},
          ]
        },
        {
          text: '高级',
          collapsible: true,
          collapsed: false, //默认展开
          items: [
            // This shows `/guide/index.md` page.(必须有index.md)
            {text: '前言', link: '/webpack/'},
            // {text: '二、面向对象', link: '/webpack/'},
          ]
        }
      ],
      '/ts/': [
        {
          text: 'TypeScript',
          collapsible: true,
          collapsed: false, //默认展开
          items: [
            // This shows `/guide/index.md` page.(必须有index.md)
            {text: '一、TypeScript简介', link: '/ts/'},
            {text: '二、面向对象', link: '/ts/面向对象'},
          ]
        }
      ],
      '/js/': [
        {
          text: 'JavaScript',
          collapsible: true,
          collapsed: false, //默认展开
          items: [
            // This shows `/guide/index.md` page.(必须有index.md)
            {text: 'JS常见问题', link: '/js/'},
            {text: 'JS数组', link: '/js/数组'},
          ]
        }
      ],
      '/vue/': [
        {
          text: 'Vue',
          items: [
            // This shows `/guide/index.md` page.(必须有index.md)
            {text: 'Vue3简介 ', link: '/vue/'},
            {text: 'Vue3带来了什么', link: '/vue/one.md'},
            {text: '一、创建', link: '/vue/two.md'},
            {text: '二、常用 Composition API', link: '/vue/three.md'},
            {text: '三、其它 Composition API', link: '/vue/four.md'},
            {text: '四、Composition API 的优势 ', link: '/vue/five.md'},
            {text: '五、新的组件 ', link: '/vue/six.md'},
            {text: '六、其它', link: '/vue/seven.md'},
          ]
        }
      ]
    }
  },

})
