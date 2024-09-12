# Symbol

> 自ECMAScript 2015起，symbol成为了一种新的原生类型，就像number和string一样。

symbol类型的值是通过Symbol构造函数创建的。

```ts
let sym1 = Symbol();

let sym2 = Symbol("key"); // 可选的字符串key
```

## Symbol的值是唯一的

Symbol是不可改变且唯一的。

```ts
let sym2 = Symbol("key");
let sym3 = Symbol("key");

sym2 === sym3; // false, symbols是唯一的
```

让两个symbol的值相等
> for Symbol for全局symbol有没有注册过这个key 如果有就直接拿来用，没有的话他就取创建一个

```ts
console.log(Symbol.for('kun') === Symbol.for('kun')) // true
```

## 用作对象属性的键

像字符串一样，symbol也可以被用做对象属性的键。

```ts
let sym1 = Symbol(1);
let sym2 = Symbol(1);

let obj = {
  [sym1]: "value1",
  [sym2]: "value2",
  name: 'ls'
};

console.log(obj);
// { name: 'ls', [Symbol(1)]: 'value1', [Symbol(1)]: 'value2' }
```

for in 读取不到symbol属性

```ts
for (let key in obj) {
  console.log(key)
}
//结果只有name
```

keys 不能读到symbol

```ts
console.log(Object.keys(obj))
// 结果为 [ 'name' ]
```

getOwnPropertyNames不能读到symbol

```ts
console.log(Object.getOwnPropertyNames(obj));
//结果为 [ 'name' ]
```

getOwnPropertySymbols只能取到symbol

```ts
console.log(Object.getOwnPropertySymbols(obj));
//结果为 [ Symbol(1), Symbol(1) ]
```

Reflect.ownKeys()方法可以拿到symbol和别的属性名

```ts
console.log(Reflect.ownKeys(obj));
//结果为 [ 'name', Symbol(1), Symbol(1) ]
```

## 生成器 （和迭代器用法相同）

```ts
function* gen() {
  // yield 后跟一个返回的值
  yield '张三' // 同步异步都可以
  yield Promise.resolve('李四')
  yield '王五' // 同步异步都可以
  yield '赵六' // 同步异步都可以
}

// 返回的是一个Generator
// 无论同步还是异步 都是按顺序往下
const man = gen()
man.next() // { value: '张三', done: false }
man.next() // { value: Promise { '李四' }, done: false }
man.next() // { value: '王五', done: false }
man.next() // { value: '赵六', done: false }
man.next() // { value: undefined, done: true }
// done为true  就不能再往下迭代了
```

## Set

> `Set` 对象是值的集合，你可以按照插入的顺序迭代它的元素。`Set` 中的元素只会出现一次，即 `Set` 中的元素是唯一的。

```ts
let set: Set<number> = new Set([1, 1, 2, 3, 3, 4])
console.log(set) // Set(4) { 1, 2, 3, 4 } 天然去重
```

## Map

> `Map` 对象保存键值对，并且能够记住键的原始插入顺序。任何值（对象或者基本类型）都可以作为一个键或一个值。

```ts
let map: Map<any, any> = new Map()
let Arr = [1, 2, 3]
map.set(Arr, '小明')
console.log(map) // Map(1) { [ 1, 2, 3 ] => '小明' }
console.log(map.get(Arr)) // 小明
```

## 迭代器Symbol.iterator

> set map 数组，arguments，nodeList身上都有迭代器

```ts
let map: Map<any, any> = new Map()
let Arr = [1, 2, 3]
map.set(Arr, '小明')

const each = (value: any) => {
  let it = value[Symbol.iterator]()
  let next: any = {}
  while (!next.done) {
    next = it.next()
    if (!next.done) {
      console.log(next.value)
    }
  }
}

each(map) //[ [ 1, 2, 3 ], '小明' ]
each(Arr) // 1  2  3
```

### 迭代器语法糖 for of

```ts
for (let value of array) {
  console.log(value)
}

for (let value of map) {
  console.log(value)
}
// [ [ 1, 2, 3 ], '小明' ]
```

::: warning
`for of`不能用在对象身上，没有`Symbol.iterator`，只能上述类型(`set`,`map`,数组,`arguments`,`nodeList`)使用
:::

### 解构

> 底层原理都是调用 `iterator`

```ts
let [a, b, c] = [1, 2, 3]
console.log(a, b, c)

let a1 = [1, 2, 3]
let copy = [...a1]
```

### 让对象支持 for of

```ts
let obj = {
  max: 5,
  current: 0,
  [Symbol.iterator]() {
    return {
      max: this.max,
      current: this.current,
      next() {
        if (this.max == this.current) {
          return {
            value: undefined,
            done: true
          }
        } else {
          return {
            value: this.current++,
            done: false
          }
        }

      }
    }
  }
}
for (let value of obj) {
  console.log(value)
  //  0
  //  1
  //  2
  //  3
  //  4
}


// 使用数组解构对象
let x = [...obj]
console.log(x) // [ 0, 1, 2, 3, 4 ]


// 对象解构(不调用)
let x1 = {...obj}
console.log(x1)
// {
//   max: 5,
//       current: 0,
//     [Symbol(Symbol.iterator)]: [Function: [Symbol.iterator]]
// }

```

:::tip
对象自身的解构，调用的是 `for...in`

`for...in` 语句以任意顺序迭代一个对象的除 `Symbol` 以外的可枚举属性，包括继承的可枚举属性。
:::
