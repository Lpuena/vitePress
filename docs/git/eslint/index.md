# ESlint 中的规则

> 在方法的形参()之前，是否必须有空格

```json
{
"space-before-function-paren":["warn","never"]
}
```

## 使用别人的ESlint规则
[@antfu/eslint-config](https://github.com/antfu/eslint-config)
```shell
pnpm add -D eslint @antfu/eslint-config
```
package.json
```json
{
  "lint-staged": {
    "*": "eslint --fix"
  },
  "eslintConfig": {
    "extends": [
      "@antfu"
    ]
  }
}
```
安装VS Code ESLint 扩展并创建.vscode/settings.json
```json
{
  "prettier.enable": false,
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": false
  }
}
```

## webstorm调试ts文件
选择 nodejs，节点形参中写 `-r ts-node/register`

或者在package.json中添加一条`ts-node server.ts`的命令然后调试
