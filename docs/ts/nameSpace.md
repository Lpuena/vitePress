# nameSpace

> 工作中无法避免全局变量造成的污染，TypeScript提供了namespace 避免这个问题出现

- 内部模块，主要用于组织代码，避免命名冲突。
- 命名空间内的类默认私有
- 通过 export 暴露
- 通过 namespace 关键字定义

:::tip
TypeScript 与 ECMAScript 2015 一样，任何包含顶级 `import` 或者 `export`
的文件都被当成一个模块。相反地，如果一个文件不带有顶级的 `import` 或者 `export` 声明，那么它的内容被视为全局可见的（因此对模块也是可见的）
:::

## 命名空间中通过export将想要暴露的部分导出

> 如果不用export 导出是无法读取其值的

```ts
namespace a {
  export const Time: number = 1000
  export const fn = <T>(arg: T): T => {
    return arg
  }
  fn(Time)
}

namespace b {
  export const Time: number = 1000
  export const fn = <T>(arg: T): T => {
    return arg
  }
  fn(Time)
}

a.Time
b.Time
```

## 嵌套命名空间

```ts
namespace a {
  export namespace b {
    export class Vue {
      parameters: string

      constructor(parameters: string) {
        this.parameters = parameters
      }
    }
  }
}

let v = a.b.Vue

new v('1')
```

## 抽离命名空间

a.ts

```ts
export namespace V {
  export const a = 1
}
```

b.ts

```ts
import {V} from '../observer/a'

console.log(V);  //{a:1}
```

## 简化命名空间

```ts
namespace A {
  export namespace B {
    export const C = 1
  }
}

import X = A.B.C

console.log(X)
```
## 合并命名空间

> 重名的命名空间会合并

```ts
namespace a {
  export const b = 123
}
namespace a {
  export const c = 333
}
console.log(a.b) // 123
console.log(a.c) // 333
```