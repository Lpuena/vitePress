# Record & Readonly

## Readonly

和 `Partial` 很像只是把 `?` 替换成了 `Readonly`

源码

```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

:::tip
`keyof` 是干什么的？

`in` 是干什么的？

`Readonly` 是将该属性变为只读

`T[P]` 是干什么的？

1. `keyof`我们讲过很多遍了 将一个接口对象的全部属性取出来变成联合类型

2. `in` 我们可以理解成 `for in P` 就是 `key` 遍历 `keyof T` 就是联合类型的每一项

3. `Readonly` 这个操作就是将每一个属性变成只读

4. `T[P]` 索引访问操作符，与 `JavaScript` 种访问属性值的操作类似
   :::

## Record

源码

```ts
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```

:::tip

1. `keyof any` 返回 `string | number | symbol` 的联合类型

2. `in` 我们可以理解成 `for in P` 就是 `key` 遍历 `keyof any` 就是 `string number symbol` 类型的每一项

3. `extends` 来约束我们的类型

4. `T` 直接返回类型

做到了约束 对象的key 同时约束了 `value`
:::

示例

```ts
type Person = {
  name: string,
  age: number,
  sex: string
}

type A = 1 | 2 | 3
type B = Record<A, Person>
let obj: B = {
  1: {name: 'xx', age: 21, sex: '女'},
  2: {name: 'xx', age: 21, sex: '女'},
  3: {name: 'xx', age: 21, sex: '女'}
}
console.log(obj)
```

