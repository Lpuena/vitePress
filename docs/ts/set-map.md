# weakMap，weakSet，set，map

在es5的时候常用的Array object ，在es6又新增了两个类型，Set和Map，类似于数组和对象。

## Set

集合是由一组无序且唯一(即不能重复)的项组成的，可以想象成集合是一个既没有重复元素，也没有顺序概念的数组

- 属性:

  size：返回字典所包含的元素个数

- 操作方法
  1. add(value)：添加某个值，返回 Set 结构本身。
  2. delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
  3. has(value)：返回一个布尔值，表示该值是否为 Set 的成员。
  4. clear()：清除所有成员，无返回值。
  5. size: 返回set数据结构的数据长度

```ts
let set: Set<number> = new Set([1, 2, 3, 4, 4, 4, 5, 6])
set.add(7)
console.log(set) //Set(7) { 1, 2, 3, 4, 5, 6, 7 }
set.delete(6)
console.log(set.has(6)) //false

set.size //6
set.clear()

console.log(set)
```

## Map

它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键，是一种更完善的 Hash
结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适

```ts
let obj = {name: '小满'}
let map: Map<object, Function> = new Map()

map.set(obj, () => 123)

map.get(obj)

map.has(obj)

map.delete(obj)

map.size
```

## WeakSet 和 WeakMap

Weak 在英语的意思就是弱的意思，`weakSet` 和 `weakMap` 的键都是弱引用，不会被计入垃圾回收，我们来演示一下。

首先 `obj` 引用了这个对象 + 1，`obj2` 也引用了 + 1，`wmap` 也引用了，但是不会 +
1，应为他是弱引用，不会计入垃圾回收，因此 `obj` 和 `aahph`
释放了该引用 `weakMap` 也会随着消失的，但是有个问题你会发现控制台能输出，值是取不到的，因为 `V8` 的 `GC`
回收是需要一定时间的，你可以延长到500ms看一看，
并且为了避免这个问题不允许读取键值，也不允许遍历，同理 `weakSet` 也一样

```ts
let obj: any = {name: '小满zs'} //1
let obj2: any = obj //2
let wmap: WeakMap<object, string> = new WeakMap()

wmap.set(obj, '我是小呆瓜') //2 他的键是弱引用不会计数的

obj = null // -1
obj2 = null;//-1
//v8 GC 不稳定 最少200ms

setTimeout(() => {
  console.log(wmap)
}, 500)
```

:::tip
`WeakMap` 的 `Key` 必须是引用类型  
:::