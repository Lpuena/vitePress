import {defineConfig} from 'vitepress'

export default {
  // lastUpdated: true,
  base: '/vitePress/',
  themeConfig: {
    siteTitle: 'Blog',
    // logo: '/',
    nav: [
      {text: 'Git', link: '/git/Git'},
      {text: 'Vue', link: '/vue/', activeMatch: '/vue/'},
      {text: 'JS', link: '/js/', activeMatch: '/js/'},
      {
        text: 'Dropdown Menu',
        items: [
          {
            // Title for the section.
            text: 'Section A Title',
            items: [
              {text: 'Section A Item A', link: '...'},
              {text: 'Section B Item B', link: '...'}
            ]
          }
        ]
      },
      {text: 'Github', link: 'https://github.com/Lpuena'},
    ],
    sidebar: {
      '/js/': [
        {
          text: 'JS',
          collapsible: true,
          collapsed: false, //默认展开
          items: [
            // This shows `/guide/index.md` page.(必须有index.md)
            {text: 'JS常见问题', link: '/js/'},
            // {text: '地址引用问题', link: '/js/地址引用问题'},
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

}
