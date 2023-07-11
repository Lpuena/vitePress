export default function getNavs() {
  return [
    {text: '🔧前置', link: '/git/Git', activeMatch: '/git/'},
    {text: 'Vue', link: '/vue/', activeMatch: '/vue/'},
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
      text: '服务端',
      items: [
        {
          items:[
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
