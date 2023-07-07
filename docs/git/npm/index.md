# 好用的NPM包
## [ni](https://github.com/antfu/ni)
自动判断是采用 `npm` 还是 `yarn` 还是 `pnpm`
```shell
npm i -g @antfu/ni
```
示例：(安装)
```shell
ni

# npm install
# yarn install
# pnpm install
# bun install
```
运行：
```shell
nr dev --port=3000

# npm run dev -- --port=3000
# yarn run dev --port=3000
# pnpm run dev --port=3000
# bun run dev --port=3000
```

## ts-node
直接运行ts文件
```shell
npm install -g ts-node
```
示例：
```shell
ts-node server.ts
```
