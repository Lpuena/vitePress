# 装饰器Decorator

Decorator 装饰器是一项实验性特性，在未来的版本中可能会发生改变
它们不仅增加了代码的可读性，清晰地表达了意图，而且提供一种方便的手段，增加或修改类的功能

## 开启功能

若要启用实验性的装饰器特性，你必须在命令行或 `tsconfig.json` 里启用编译器选项

```json
"experimentalDecorators": true, 
"emitDecoratorMetadata": true,
```

## 类装饰器 ClassDecorator

装饰器是一种特殊类型的声明，它能够被附加到类声明，方法， 访问符，属性或参数上。

首先定义一个类

```ts
class A {
  constructor() {
  }
}
```

定义一个类装饰器函数 他会把 ClassA 的构造函数传入你的 watcher 函数当做第一个参数

```ts
const watcher: ClassDecorator = (target: Function) => {
  target.prototype.getParams = <T>(params: T): T => {
    return params
  }
}
```

:::tip
`ClassDecorator` 是类装饰器

`target` 是构造函数
:::
使用的时候，直接通过 @函数名使用

```ts
@watcher //[!code ++]
class A {
  constructor() {

  }
}
```

验证

```ts
const a = new A();
console.log((a as any).getParams('123'));
```

## 装饰器工厂

其实也就是一个高阶函数，外层的函数接受值，里层的函数最终接受类的构造函数

```ts
const watcher = (name: string): ClassDecorator => {
  return (target: Function) => {
    target.prototype.getParams = <T>(params: T): T => {
      return params
    }
    target.prototype.getOptions = (): string => {
      return name
    }
  }
}

@watcher('name')
class A {
  constructor() {

  }
}

const a = new A();
console.log((a as any).getParams('123'));
```

## 装饰器组合

就是可以使用多个装饰器

```ts

const watcher = (name: string): ClassDecorator => {
  return (target: Function) => {
    target.prototype.getParams = <T>(params: T): T => {
      return params
    }
    target.prototype.getOptions = (): string => {
      return name
    }
  }
}
const watcher2 = (name: string): ClassDecorator => {
  return (target: Function) => {
    target.prototype.getNames = (): string => {
      return name
    }
  }
}

@watcher2('name2')
@watcher('name')
class A {
  constructor() {

  }
}


const a = new A();
console.log((a as any).getOptions());
console.log((a as any).getNames());
```

## 属性装饰器 PropertyDecorator

返回两个参数

- 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
- 属性的名字。

`[ {}, 'name', undefined ]`

```ts
const met: PropertyDecorator = (...args) => {
  console.log(args);
}

class A {
  @met
  name: string
  
  constructor() {
  
  }

}

const a = new A();
```

## 方法装饰器 MethodDecorator & PropertyDescriptor

返回三个参数

1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 成员的名字。
3. 成员的属性描述符。

:::tip 示例

1. target `{}`,
2. propertyKey  `'getList'`,
3. descriptor `{ value: [Function:getList], writable: true, enumerable:false, configurable:true }`
   :::

```ts
import axios from "axios";

const Get = (url: string): MethodDecorator => {
  return (target, propertyKey, descriptor: PropertyDescriptor) => {
    console.log(target, propertyKey, descriptor)
    axios.get(url).then(res => {
      descriptor.value(res)
    })
  }
}

class A {
  constructor() {

  }

  @Get('https://v.api.aa1.cn/api/yiyan/index.php')
  getList(data: any) {
    console.log('data', data)

  }

  create() {
  }
}

const a = new A();
```

:::tip
ts-node 编译必须使用 `CommonJS` 模式，否则报错
:::

## 参数装饰器 ParameterDecorator

返回三个参数

1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 成员的名字。
3. 参数在函数参数列表中的索引。

示例：

```
target
propertyKey
parameterIndex
[{}, 'setParasm', 0]
```

```ts
import axios from "axios";

const Get = (url: string): MethodDecorator => {
  return (target, propertyKey, descriptor: PropertyDescriptor) => {
    console.log(target, propertyKey, descriptor)
    axios.get(url).then(res => {
      descriptor.value(res)
    })
  }
}

const Result = (): ParameterDecorator => { //[!code ++]
  return (target, propertyKey, parameterIndex) => { //[!code ++]
    console.log(target, propertyKey, parameterIndex) //[!code ++]
  } //[!code ++]
} //[!code ++]

class A {
  constructor() {
  
  }
  
  @Get('https://v.api.aa1.cn/api/yiyan/index.php')
  //getList(data: any) { //[!code --]
  getList(@Result() data: any) { //[!code ++]
    console.log('data', data)
  
  }
  
  create() {
  }
}

const a = new A();
```

### 元数据存储

```ts
import 'reflect-metadata'
```

可以快速存储元数据然后在用到的地方取出来 defineMetadata getMetadata

```ts
import axios from "axios";

const Get = (url: string): MethodDecorator => {
  return (target, propertyKey, descriptor: PropertyDescriptor) => {
    console.log(target, propertyKey, descriptor)
    const key = Reflect.getMetadata('key', target) //[!code ++]
    axios.get(url).then(res => {
      descriptor.value(res)
    })
  }
}

const Result = (): ParameterDecorator => {
  return (target, propertyKey, parameterIndex) => {
    console.log(target, propertyKey, parameterIndex)
    Reflect.defineMetadata('key', 'animal', target) //[!code ++]
    // 中间的关键字，写什么就是存什么，'animal'就是数据中的一个
  }
}

class A {
  constructor() {
  
  }
  
  @Get('https://zj.v.api.aa1.cn/api/Age-calculation/?birthday=2000-01-01')
  //getList(data: any) { 
  getList(@Result() data: any) {
    console.log('data', data)
  }
  
  create() {
  }
}

const a = new A();
```