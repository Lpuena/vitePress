# 冲突
## AutoImport
```shell
ni -D unplugin-auto-import
```
vite.config.ts
```ts
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/, /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: [
        'vue',
        'vue-router',
      ],
      dts: true,
      eslintrc: {
        enabled: true,
      },
    }),
  ],
})
```
修改`.eslintrc.cjs`
```
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    '@antfu',
    './.eslintrc-auto-import.json',
  ],
}
```
