# 类型断言

> 有些情况下，变量的类型对于我们来说是很明确，但是TS编译器却并不清楚，此时，可以通过类型断言来告诉编译器变量的类型，断言有两种形式：

- 第一种

```typescript
let someValue: unknown = "this is a string";
let strLength: number = (someValue as string).length;
```

- 第二种

```typescript
let someValue: unknown = "this is a string";
let strLength: number = (<string>someValue).length;
```

### 联合类型

> 跟字面量有点像

```ts
// tele 可以是字符串也可以是数字
let tele: string | number = 323123
console.log(tele)
tele = ' skfsf '
console.log(tele)
```

函数使用联合类型

```ts
// 当后端返回数字，需要我们自己转成布尔值时
let fn = function (type: number): boolean {
  // 取两次反
  return !!type
}
console.log(fn(0))

// 有的返回数字，有的返回布尔值
let fn2 = function (type: number | boolean): boolean {
  return !!type
}
console.log(fn2(0))
```

### 交叉类型

```ts
interface People {
  name: string,
  age: number
}

interface Man {
  sex: number
}

const Lisi = (man: Man & People) => {
  console.log(man)
}
```

### 类型别名

```ts
type s = string | number

let str: s = 'ls'
str = 33
```

#### 定义值的别名

```ts
type value = boolean | 0 | '213'

let s: value = true
//变量s的值  只能是上面value定义的值
```

#### 高级

```ts
// extends 表示包含的意思
//左边的值，作为右边类型的子类型
type num = 1 extends number ? 1 : 0 //结果为1
type num = 1 extends never ? 1 : 0 //结果为0
```

> 类型的层级关系（从上往下）

| unknow |        | any     |
|--------|--------|---------|
| Object | Object | Object  |
| Number | Sting  | Boolean |
| number | string | boolean |
| 1      | 'test' | true    |
| never  | never  | never   |

