# infer

## infer关键字

infer 是TypeScript 新增到的关键字 充当占位符

我们来实现一个条件类型推断的例子

定义一个类型 如果是数组类型 就返回 数组元素的类型 否则 就传入什么类型 就返回什么类型

```ts
type Infer<T> = T extends Array<any> ? T[number] : T


type A = Infer<(boolean | string)[]>

type B = Infer<null>
```

:::tip
`T[number]` 表示取到数组中元素的类型
:::

使用 infer 修改

```ts
type Infer<T> = T extends Array<infer U> ? U : T

type A = Infer<(string | Symbol)[]>
```

例子2配合tuple 转换 union 联合类型

```ts
type infer<T> = T extends Array<infer E> ? E : never

//元组
type TTuple = [string, number];

type ToUnion = infer<TTuple>; // string | number
```

## 类型提取

### 提取头部元素

```ts
type Arr = ['a', 'b', 'c']

type First<T extends any[]> = T extends [infer First, ...any[]] ? First : []

type a = First<Arr>
```

类型参数 `T` 通过 `extends` 约束，只能是数组类型，然后通过 `infer` 声明局部 `First` 变量做提取，后面的元素可以是任意类型，然后把局部变量返回

### 提取尾部元素

```ts
type Arr = ['a', 'b', 'c']

type Last<T extends any[]> = T extends [...any[], infer Last,] ? Last : []

type c = Last<Arr>
```

其实就是反过来就可以了

### 剔除第一个元素 Shift

```ts
type Arr = ['a', 'b', 'c']

type First<T extends any[]> = T extends [unknown, ...infer Rest] ? Rest : []

type a = First<Arr>
```

思路就是 我们除了第一个的元素把其他的剩余元素声明成一个变量 直接返回 就实现了我们的要求 剔除第一个元素

### 剔除尾部元素 pop

```ts
type Arr = ['a', 'b', 'c']

type First<T extends any[]> = T extends [...infer Rest, unknown] ? Rest : []

type a = First<Arr>
```

## 递归

有这么一个类型

```ts
type Arr = [1, 2, 3, 4]
```

希望通过一个 ts 工具变成

```ts
type Arr = [4, 3, 2, 1]
```

完整代码

```ts

type Arr = [1, 2, 3, 4]

type ReveArr<T extends any[]> = T extends [infer First, ...infer rest] ? [...ReveArr<rest>, First] : T

type Res = ReveArr<Arr>
```