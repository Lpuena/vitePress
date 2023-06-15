# NestJS Cli

## 通过cli创建nestjs项目
```shell
npm i -g @nestjs/cli

nest new [项目名称]
```
启动项目 我们需要热更新 就启动npm run start:dev就可以了
```json
"start": "nest start",
"start:dev": "nest start --watch",
"start:debug": "nest start --debug --watch",
"start:prod": "node dist/main",
```
## 目录介绍
### main.ts 
> 入口文件主文件 类似于vue 的main.ts

通过 NestFactory.create(AppModule) 创建一个app  就是类似于绑定一个根组件App.vue

app.listen(3000); 监听一个端口
```ts
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
```