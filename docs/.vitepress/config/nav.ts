export default function getNavs() {
  return [
    {text: 'Tools', link: '/git/Git', activeMatch: '/git/'},
    {
      text:'FrontEnd',
      items: [
        {
          items: [
            {text: 'Vue', link: '/vue/', activeMatch: '/vue/'},
            {text: 'React', link: '/react/', activeMatch: '/react/'},
            {text: 'UniApp', link: '/uniapp/', activeMatch: '/uniapp/'},
            {text: 'Nuxt', link: '/nuxt/', activeMatch: '/nuxt/'},
          ]
        }
      ]

    },

    // {text: 'JS', link: '/js/', activeMatch: '/js/'},
    {
      text: 'TypeScript',
      items: [
        {
          // Title for the section.
          // text: 'Section A Title',
          items: [
            {text: 'TypeScript', link: '/ts/', activeMatch: '/ts/'},
            {text: 'JavaScript', link: '/js/', activeMatch: '/js/'},
            {text: 'jQuery', link: '/jQuery/', activeMatch: '/jQuery/'}
          ]
        }
      ]
    },
    {text: 'Webpack', link: '/webpack/', activeMatch: '/webpack/'},
    {
      text: 'Server',
      items: [
        {
          items:[
            {text: 'Node', link: '/node/', activeMatch: '/node/'},
            {text: 'Nest', link: '/nestjs/', activeMatch: '/nestjs/'},
            {text: 'Express', link: '/expressjs/', activeMatch: '/express/'},
          ]
        }
      ]
    },
    // {text: 'Github', link: 'https://github.com/Lpuena'},
    {text: 'About', link: '/about'},
  ]
}
