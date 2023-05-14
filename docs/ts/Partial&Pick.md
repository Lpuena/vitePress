# Partial & Pick

## Partial

源码

```ts
/**
 * Make all properties in T optional
 将T中的所有属性设置为可选
 */
type Partial<T> = {
  [P in keyof T]?: T[P];
}
```

:::tip

- `keyof` 是干什么的？

- `in` 是干什么的？

- `?` 是将该属性变为可选属性

- `T[P]` 是干什么的？

1. `keyof` 将一个接口对象的全部属性取出来变成联合类型

2. `in` 我们可以理解成 `for in P` 就是 `key` 遍历 ` keyof T`  就是联合类型的每一项

3. `？`这个操作就是将每一个属性变成可选项

4. `T[P]` 索引访问操作符，与 `JavaScript` 种访问属性值的操作类似
   :::

使用前

```ts
type Person = {
  name: string,
  age: number
}

type p = Partial<Person>
```

转换后全部转为了可选

```ts
type p = {
  name?: string | undefined;
  age?: number | undefined;
}
```

## Pick

从类型定义T的属性中，选取指定一组属性，返回一个新的类型定义。

```ts
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

```ts
type Person = {
  name: string,
  age: number,
  text: string
  address: string
}

type Ex = "text" | "age"

type A = Pick<Person, Ex>
```