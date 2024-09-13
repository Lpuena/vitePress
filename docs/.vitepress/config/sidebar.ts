export default function getSidebar() {
  return {
    '/git/': [
      {
        text: 'Git',
        // collapsible: true,
        // collapsed: false, //默认展开
        items: [
          // This shows `/guide/index.md` page.(必须有index.md)
          { text: 'Git的配置', link: '/git/Git' },
          { text: 'degit', link: '/git/degit' },
          { text:'git commit', link: '/git/commit' }
        ]
      },
      {
        text: 'ESLint',
        // collapsible: true,
        // collapsed: false, //默认展开
        items: [
          // This shows `/guide/index.md` page.(必须有index.md)
          { text: 'ESLint中的规则', link: '/git/eslint/' },
          { text: 'ESLint与插件冲突', link: '/git/eslint/plugins' },
        ]
      },
      {
        text: 'webSocket',
        // collapsible: true,
        // collapsed: false, //默认展开
        items: [
          // This shows `/guide/index.md` page.(必须有index.md)
          { text: '初步使用', link: '/git/websocket/' },
        ]
      },
      {
        text: 'NPM',
        // collapsible: true,
        // collapsed: false, //默认展开
        items: [
          // This shows `/guide/index.md` page.(必须有index.md)
          { text: '好用的npm包', link: '/git/npm/' },
        ]
      },
      {
        text: 'Linux',
        items: [
          { text: '基本命令', link: '/git/linux/' },
          { text: 'node配置', link: '/git/linux/node' },
          { text: 'Nginx', link: '/git/linux/nginx' },
          { text: 'zsh', link: '/git/linux/zsh' },
        ]
      },
      {
        text: '网络安全',
        items: [
          { text: 'canvas指纹技术', link: '/git/safe/' },
          { text: 'Puppeteer', link: '/git/safe/Puppeteer' }
        ]
      }
    ],
    '/webpack/': [
      {
        text: '基础',
        collapsible: true,
        collapsed: false, //默认展开
        items: [
          // This shows `/guide/index.md` page.(必须有index.md)
          { text: '前言', link: '/webpack/' },
          { text: '基本使用', link: '/webpack/基本使用' },
          { text: '基本配置', link: '/webpack/基本配置' },
          { text: '开发模式介绍', link: '/webpack/开发模式介绍' },
          { text: '处理样式资源', link: '/webpack/处理样式资源' },
          { text: '处理图片资源', link: '/webpack/处理图片资源' },
          { text: '修改输出资源的名称和路径', link: '/webpack/修改输出资源的名称和路径' },
          { text: '自动清空上次打包资源', link: '/webpack/自动清空上次打包资源' },
          { text: '处理字体图标资源', link: '/webpack/处理字体图标资源' },
          { text: '处理其他资源', link: '/webpack/处理其他资源' },
          { text: '处理JS资源', link: '/webpack/处理JS资源' },
          { text: '处理Html资源', link: '/webpack/处理Html资源' },
          { text: '开发服务器和自动化', link: '/webpack/开发服务器和自动化' },
          { text: '生产模式介绍', link: '/webpack/生产模式介绍' },
          { text: 'Css处理', link: '/webpack/css处理' },
          { text: 'html压缩', link: '/webpack/html压缩' },
        ]
      },
      {
        text: '高级',
        collapsible: true,
        collapsed: false, //默认展开
        items: [
          // This shows `/guide/index.md` page.(必须有index.md)
          { text: '介绍', link: '/webpack/介绍' },
          { text: 'SourceMap', link: '/webpack/SourceMap' },
        ]
      }
    ],
    '/ts/': [
      {
        text: 'TypeScript',
        // collapsible: true,
        // collapsed: false, //默认展开
        items: [
          // This shows `/guide/index.md` page.(必须有index.md)
          { text: '简介', link: '/ts/' },
          {
            text: '类型', items: [
              { text: '基本类型', link: '/ts/基本类型' },
              { text: '函数类型', link: '/ts/函数类型' },
              { text: 'Symbol', link: '/ts/symbol' },
              { text: '类型断言', link: '/ts/TypeAssertion' },
            ]
          },
          {
            text: '编译配置', items: [
              { text: '编译选项', link: '/ts/编译选项' },
              { text: 'compilerOptions', link: '/ts/compilerOptions' },
            ]
          },

          { text: '面向对象', link: '/ts/面向对象' },
          { text: 'nameSpace', link: '/ts/nameSpace' },
          { text: '三斜线指令', link: '/ts/三斜线指令' },
          { text: '声明文件d.ts', link: '/ts/声明文件d.ts' },
          { text: 'Mixins混入', link: '/ts/Mixins混入' },
          { text: '装饰器Decorator', link: '/ts/装饰器Decorator' },
          { text: 'proxy和Reflect', link: '/ts/proxy和Reflect' },
          { text: '类型兼容', link: '/ts/类型兼容' },
          { text: 'weakMap-weakSet-set-map', link: '/ts/set-map' },
          { text: 'Partial & Pick', link: '/ts/Partial&Pick' },
          { text: 'Record & Readonly', link: '/ts/Record&Readonly' },
          { text: 'Infer', link: '/ts/infer' },
          {
            text: '案例', items: [
              { text: 'LocalStorage增加有效期', link: '/ts/LocalStorage增加有效期' },
              { text: '发布订阅模式', link: '/ts/发布订阅模式' },
              { text: '前端埋点SDK', link: '/ts/前端埋点SDK' },
            ]
          },
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
          { text: 'JS常见问题', link: '/js/' },
          { text: 'JS Array', link: '/js/Array' },
          { text: 'JS Object', link: '/js/Object' },
          { text: 'JS String', link: '/js/String' },
          { text: '网络请求', link: '/js/网络请求' },
          { text: 'pm2', link: '/js/pm2' },
          { text: '文件上传', link: '/js/file' },
          { text: 'Promise', link: '/js/Promise' },
        ]
      }
    ],
    '/jQuery/': [
      {
        text: 'jQuery',
        collapsible: true,
        collapsed: false, //默认展开
        items: [
          // This shows `/guide/index.md` page.(必须有index.md)
          { text: '初始', link: '/jQuery/' },
          // {text: 'JS数组', link: '/js/数组'},
        ]
      }
    ],
    '/vue/': [
      {
        text: 'Vue',
        items: [
          // This shows `/guide/index.md` page.(必须有index.md)
          // {text: 'Vue3简介 ', link: '/vue/'},
          { text: 'Vue3带来了什么', link: '/vue/one.md' },
          { text: '创建', link: '/vue/two.md' },
          { text: '常用 Composition API', link: '/vue/three.md' },
          { text: '其它 Composition API', link: '/vue/four.md' },
          { text: 'Composition API 的优势 ', link: '/vue/five.md' },
          { text: '新的组件 ', link: '/vue/six.md' },
          { text: '其它', link: '/vue/seven.md' },
          { text: '组件传参', link: '/vue/传参.md' },
          { text: '自定义指令', link: '/vue/自定义指令.md' },
          { text: '自定义Hooks(组合式函数)', link: '/vue/自定义Hooks' },
          { text: 'Vue3全局注册', link: '/vue/全局注册' },
          { text: 'event loop 和 nextTick', link: '/vue/nextTick' },
          { text: 'css', link: '/vue/css' },
          { text: '移动端', link: '/vue/移动端' },
          { text: '函数式编程', link: '/vue/函数式编程' },
          { text: 'electron', link: '/vue/electron' },
          { text: 'Vue+webpack', link: '/vue/webpack' },
          { text: 'Proxy跨域', link: '/vue/Proxy跨域' },
          { text: 'Pinia', link: '/vue/Pinia' },
          { text: 'Router', link: '/vue/Router' },
          { text: '案例', link: '/vue/案例' },
        ]
      },
    ],
    '/react/': [
      {
        text: 'React',
        items: [
          { text: '初步使用', link: '/react/' },
          { text: '类式组件的生命周期', link: '/react/类式组件的生命周期' },
          { text: 'hooks', link: '/react/hooks' },
          { text: '组件间通信', link: '/react/组件通信' },
          { text: 'Redux', link: '/react/redux' },
        ]
      }
    ],
    '/nuxt/': [
      {
        text: 'Nuxt',
        items: [
          { text: 'init', link: '/nuxt/' },
          { text: 'router', link: '/nuxt/router' },
          { text: 'seo', link: '/nuxt/seo' },
          { text: 'server', link: '/nuxt/server' },
        ]
      }
    ],
    '/nestjs/': [
      {
        text: 'Nest',
        items: [
          // This shows `/guide/index.md` page.(必须有index.md)
          { text: 'IOC控制反转', link: '/nestjs/' },
          { text: 'NestJS Cli', link: '/nestjs/nestjsCli' },
          // {text: 'JS数组', link: '/js/数组'},
        ]
      }
    ],
    '/expressjs/': [
      {
        text: 'Express',
        items: [
          // This shows `/guide/index.md` page.(必须有index.md)
          { text: '初始化', link: '/expressjs/' },
          // {text: 'JS数组', link: '/js/数组'},
        ]
      }
    ],
    '/node': [
      {
        text: 'Node',
        items: [
          // This shows `/guide/index.md` page.(必须有index.md)
          { text: 'npm', link: '/node/' },
          { text: '模块化', link: '/node/模块化' },
        ]
      }
    ],
    '/uniapp': [
      {
        text: 'uni-app',
        items: [
          { text: '创建项目', link: '/uniapp/' },
          { text: '持久化', link: '/uniapp/pinia' },
          { text: '添加拦截器', link: '/uniapp/addInterceptor' },
          { text: '样式', link: '/uniapp/样式' },
        ]
      }
    ]
  }
}
