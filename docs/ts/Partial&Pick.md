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

> Pick<T, K> 从类型 T 中选出符合属性名称在 K 中的属性，构造一个新的类型。

从类型定义T的属性中，选取指定一组属性，返回一个新的类型定义。

`keyof T` 表达式会返回类型 `T` 的所有属性名称的联合类型。这个联合类型可以用于遍历对象的属性，进行属性的访问和操作。

`[P in K]`：这是一个映射的语法，其中 P 是一个变量，代表在遍历过程中的每个属性名称。K 是一个类型，它规定了我们希望从原始类型 T
中选取哪些属性。

`: T[P];`：这部分定义了属性的类型。它表示新类型的属性 P 的类型应该与原始类型 T 中属性 P 的类型相同。通过 `T[P]`
，我们在新类型中映射了与原始类型相同的属性类型。

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

应用pick思想的案例

```ts
function getValue<T extends Object, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

const obj1 = {name: '张三', age: 18}
const value = getValue(obj1, 'age')
```
