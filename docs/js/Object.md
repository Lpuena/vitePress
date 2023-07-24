# Object
## Object.values()
`Object.values()` 方法返回一个给定对象自身的所有可枚举属性值的数组，值的顺序与使用 for...in 循环的顺序相同（区别在于 for-in 循环枚举原型链中的属性）。

### 语法
```ts
Object.values(obj)
```
### 参数
`obj`被返回可枚举属性值的对象。

## Object.fromEntries()
`Object.fromEntries()` 是 JavaScript 中的一个静态方法，
它接受一个可迭代对象（如数组或类数组对象）作为参数，并返回一个新的对象。该方法的作用是将可迭代对象转换为键值对的对象。
语法：
```js
Object.fromEntries(iterable)
```
**参数:**

- iterable：一个可迭代对象，其元素是表示键值对的数组。

**返回值：**

一个新的对象，其属性由可迭代对象中的键值对组成。

示例：
```js
const entries = [['a', 1], ['b', 2], ['c', 3]];
const obj = Object.fromEntries(entries);

console.log(obj);
// 输出: { a: 1, b: 2, c: 3 }

```
在上面的示例中，我们传递了一个包含三个键值对的数组 entries 给 Object.fromEntries() 方法，并将返回的新对象赋值给 obj。
新对象的属性由数组中的键值对组成，其中键是数组中的第一个元素，值是数组中的第二个元素。

需要注意的是，`Object.fromEntries()` 方法主要用于将键值对数组转换为对象。
如果提供的可迭代对象不包含键值对数组，则会抛出错误。另外，**如果键值对数组中的键重复出现**，后面的键值对将覆盖前面的键值对。

示例：
```js
const duplicateKeys = [['a', 1], ['b', 2], ['a', 3]];
const obj = Object.fromEntries(duplicateKeys);

console.log(obj);
// 输出: { a: 3, b: 2 }

```
>Object.fromEntries() 方法提供了一种简洁的方式来将键值对数组转换为对象。
> 它在处理从类数组对象、Map 对象等数据结构获取的键值对时非常有用。


## Object.values()
`Object.values()` 是一个内置的方法，用于返回一个给定对象的所有可枚举属性的值组成的数组。

该方法接收一个对象作为参数，并返回一个包含该对象所有可枚举属性值的数组。
数组中的值的顺序与对象中属性被枚举的顺序一致。如果对象没有可枚举属性，或者传入的参数不是对象类型，则返回一个空数组。

**示例：**
```js
const obj = { a: 1, b: 2, c: 3 };
const values = Object.values(obj);
console.log(values);
// 输出: [1, 2, 3]
```
在上述示例中，`Object.values(obj)` 返回一个包含对象obj的属性值的数组 `[1, 2, 3]`。

需要注意的是，`Object.values()` 只返回对象自身的可枚举属性的值，而不包括继承的属性。
如果你需要获取包括继承的属性在内的所有属性的值，可以考虑使用其他方法，比如 `for...in` 循环或 `Object.getOwnPropertyNames()` 方法。

## Object.keys()
`Object.keys()` 方法返回一个包含对象所有可枚举属性的键组成的数组。

**示例:**
```js
const obj = { a: 1, b: 2, c: 3 };
const keys = Object.keys(obj);
console.log(keys);
// 输出: ["a", "b", "c"]
```
如果希望同时获取键和对应的值，可以结合使用 `Object.keys()` 和 `Array.prototype.map()` 方法，像这样：
```js
const obj = { a: 1, b: 2, c: 3 };
const entries = Object.keys(obj).map(key => [key, obj[key]]);
console.log(entries);
// 输出: [["a", 1], ["b", 2], ["c", 3]]

```
在上述示例中，`Object.keys(obj)` 获取对象的键组成的数组，然后通过 `map()` 方法遍历每个键，
使用 `obj[key]` 来获取对应的值，返回键值对组成的二维数组 `[["a", 1], ["b", 2], ["c", 3]]`。

## Object.entries()
`Object.entries()` 是 JavaScript 中的一个内置方法，它用于将对象的键值对转换为一个由键值对组成的二维数组。
这个方法返回一个新的数组，其中每个元素都是一个包含键值对的数组，其中第一个元素是键，第二个元素是对应的值。

**示例：**
```js
const myObject = {
  name: 'John',
  age: 30,
  city: 'New York'
};

const entries = Object.entries(myObject);
console.log(entries);
// Output: [['name', 'John'], ['age', 30], ['city', 'New York']]

```
