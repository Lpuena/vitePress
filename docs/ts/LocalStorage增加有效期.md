# LocalStorage增加有效期

`LocalStorage` 永久存储在浏览器中，封装 `LocalStorage` ，增加有效期。

## 使用rollup构建打包ts

参考[简介中的rollup](index.html#rollup构建ts项目)

### 改动部分

修改tsconfig.json

```json
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "node"
  }
}
```
修改package.json
增加下面代码

```json
{
  "type": "module",
  "scripts": {}
}
```

修改rollup.config.js
> 新版的写法(不用安装额外的包)

```js
import path from "path";
import ts from 'rollup-plugin-typescript2'
import serve from 'rollup-plugin-serve'


import {fileURLToPath} from 'url' // [!code ++]

const metaUrl = fileURLToPath(import.meta.url) // [!code ++]
const dirName = path.dirname(metaUrl) // [!code ++]

export default {
  // 入口
  input: "./src/index.ts",
  // 出口
  output: {
    //file: path.resolve(__dirName, './lib/index.js'), //[!code --]
    file: path.resolve(dirName, './lib/index.js'), //[!code ++]
  },
  plugins: [
    ts(),
    serve({
      open: true,
      port: 2000,
      openPage: '/public/index.html'
    })
  ]
}

```

## 核心代码

src/enum/index.ts

```ts
//字典 Dictionaries expire过期时间key permanent永久不过期
export enum Dictionaries {
  permanent = 'permanent',
  expire = '_expire_'
}
```

src/type/index.ts

```ts
// expire过期时间key permanent永久不过期
import {Dictionaries} from "../enum";

export type Key = string
export type Expire = Dictionaries.permanent | number // 时间戳或者 永久permanent
export interface Result<T> {
  msg: string,
  value: T | null
}

export interface Data<T> {
  value: T,
  [Dictionaries.expire]: Expire
}

export interface StorageCls {
  get: <T>(key: Key) => void
  set: <T>(key: Key, value: T, expire: Expire) => void
  remove: (key: Key) => void
  clear: () => void
}
```

src/index.ts

```ts
import {StorageCls, Key, Expire, Data, Result} from "./type";
import {Dictionaries} from "./enum";

export class Storage implements StorageCls {
  set<T>(key: Key, value: T, expire: Expire = Dictionaries.permanent) {
    const data = {
      value,
      [Dictionaries.expire]: expire
    }
    localStorage.setItem(key, JSON.stringify(data))
  }
  
  get<T>(key: Key): Result<T> {
    const value = localStorage.getItem(key)
    if (value) {
      const data: Data<T> = JSON.parse(value)
      const now = new Date().getTime()
      if (typeof data[Dictionaries.expire] == 'number' && data[Dictionaries.expire] < now) {
        this.remove(key)
        return {
          msg: `您的${key}值已过期`,
          value: null
        }
      } else {
        return {
          msg: '成功',
          value: data.value
        }
      }
    } else {
      return {
        msg: 'key值不存在',
        value: null
      }
    }
  }
  
  remove(key: Key) {
    localStorage.removeItem(key)
  }
  
  clear() {
  }
}
```

## 启动打包

```shell
rollup -c
```

## 打包后文件

lib/index.js

```js
//字典 Dictionaries expire过期时间key permanent永久不过期
var Dictionaries;
(function (Dictionaries) {
  Dictionaries["permanent"] = "permanent";
  Dictionaries["expire"] = "_expire_";
})(Dictionaries || (Dictionaries = {}));

class Storage {
  set(key, value, expire = Dictionaries.permanent) {
    const data = {
      value,
      [Dictionaries.expire]: expire
    };
    localStorage.setItem(key, JSON.stringify(data));
  }

  get(key) {
    const value = localStorage.getItem(key);
    if (value) {
      const data = JSON.parse(value);
      const now = new Date().getTime();
      if (typeof data[Dictionaries.expire] == 'number' && data[Dictionaries.expire] < now) {
        this.remove(key);
        return {
          msg: `您的${key}值已过期`,
          value: null
        };
      } else {
        return {
          msg: '成功',
          value: data.value
        };
      }
    } else {
      return {
        msg: 'key值不存在',
        value: null
      };
    }
  }

  remove(key) {
    localStorage.removeItem(key);
  }

  clear() {
  }
}

export {Storage};

```

## 在index中引入文件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>test</title>
</head>
<script type="module"> //[!code ++]
import {Storage} from '../lib/index.js' //[!code ++]
const ls = new Storage() //[!code ++]
ls.set('a', 123, new Date().getTime() + 5000) //[!code ++]
// setInterval(() => { //[!code ++]
//   let a = ls.get('a') //[!code ++]
//   console.log(a) //[!code ++]
// }, 500) //[!code ++]
</script>
<body>

</body>
</html>
```
