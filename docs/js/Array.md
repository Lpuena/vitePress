# 数组问题

## 数组的过滤

1. 使用***forEach***遍历的过程中，对其进行过滤

    ```js
    let list = ['a', 'b', 'c', 'd']
    list.forEach((item, index) => {
      if (item === 'c') {
        list.splice(index, 1)
      }
    })
    ```
   :::tip [splice用法](#splice方法)
   splice() 方法用于添加或删除数组中的元素。

   **注意**：这种方法会改变原始数组。

2. 使用***map***方法
    ```js
    let list = ['a', 'b', 'c', 'd']
    let newList = list.map(item => {
      return item === 'c' ? '' : item
    })
    ```
   :::tip [map方法](#map方法)
   返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。
   :::

3. 使用***filter***方法
    ```js
    let list = ['a', 'b', 'c', 'd']
    list = list.filter(item=>{
      return item != 'c'
    })
    ```
   :::tip [filter方法](#filter方法)
   filter方法会创建一个<strong style="color:orange">新的数组</strong>，新数组中的元素是通过检查指定数组中符合条件的所有元素。

   **注意**： filter() 不会对空数组进行检测。

   **注意**： filter() 不会改变原始数组。
   :::

## splice方法

> 该方法可以**删除**数组中的元素、
> 可以在数组中**插入**元素、
> 可以**替换**数组中的元素

- **删除**：
  - 指定两个参数：要删除的第一项的位置和要删除的项数
   ```js
    list.splice(2,1)
    #找到索引为2的那一项,删除一项(会返回删除的那一项,没删除就返回空数组)
   ```
- **插入**：
  - 可以向指定位置插入任意数量的项
  - 提供三个参数，<strong style="color:orange">起始位置</strong>，<strong style="color:orange">要删除的项数</strong>
    ，和<strong style="color:orange">要插入的项</strong>
  - `arr.splice(2,0,4,6)`
  > 数组arr从索引2开始，共插入2个元素，即4和6。参数0表示没有要删除的项
   ```js
    var fruits = ["Banana", "Orange", "Apple", "Mango"];
    fruits.splice(2,1,"Lemon","Kiwi");
    #输出结果为: Banana,Orange,Lemon,Kiwi,Mango
    #从索引2开始,移除数组的第三个元素,并在数组第三个位置添加新元素
   ```
- **替换**：
  - 可以向指定位置，插入任意数量的项，且同时删除任意数量的项
  - 只需要指定3个参数，<strong style="color:orange">起始位置</strong>，<strong style="color:orange">要删除的项数</strong>
    ，和<strong style="color:orange">要插入的项</strong>
  - `arr.splice(2,2,4,6)`
  > 数组arr从索引2开始，删除2项，共插入2个元素，即4和6

## map方法

> 数组map方法的作用：映射数组

```js
list.map((value, index, arr) => {
})

#第一个参数
value
必填
当前元素的值
#第二个参数
index
可选
当前元素的索引值
#第三个参数
arr
当前元素属于的数组对象(就是原数组)
```

- map方法：返回一个新的数组
- map方法：按照原数组元素顺序一次处理
- map方法：不会对空数组进行检测
- map方法：不会改变原始数组

:::tip 特点

- 函数执行次数 === 数组长度
- 函数内部的return，return新的元素
- 如果没有return，则map的值为undefined
  :::

简写的方法

```ts
let a: number[] = [1, 2, 3, 4, 5]
let b: Array<any> = a.map(value => {
      return {num: value}
    }
)

#简写
//这里箭头函数如果只有一句返回可以省略花括号和return，
// 然后因为返回的是个对象，避免编译器认错，就要先加小括号。
// 表明这是返回的内容而不是方法体
let c: Array<any> = a.map(value => ({num: value}))


```

## filter和map在相同需求下的不同写法

> 过滤掉 fileList 中 url 与当前 file.url 相同的元素

filter：

```js
this.imgList = fileList.filter(item => {
  console.log(item)
  return item.url !== file.url
})
```

map:
> 使用 `filter()` 方法过滤掉返回值为 `null` 或 `undefined` 的对象。

```js
this.imgList = fileList.map(item => {
  if (item.url !== file.url) {
    return item;
  }
}).filter(item => item);
```

或者这么写

```js
this.imgList = fileList.map(item => {
  if (item.url !== file.url) {
    return item;
  }
}).filter(Boolean)
```

使用 `.filter(Boolean)` 来过滤掉数组中的 `null` 或 `undefined` 元素。这种方式利用了 `Boolean` 构造函数的特性，它会将传入的值转换为布尔值。

在 JavaScript 中，`null` 和 `undefined` 在布尔上下文中会被视为 `false`，而其他值会被视为 `true`。
因此，当你将 `Boolean` 构造函数作为 `.filter()` 方法的回调函数时，它会将数组中的每个元素作为参数传递给 `Boolean` 构造函数进行转换。
对于值为 `null` 或 `undefined` 的元素，转换后的结果为 `false`，它们将被过滤掉，而其他非空的元素将被保留下来。

## filter方法

> filter()会创建一个新的数组

```js
let arr = [1, 2, 3, 4, 5]
let brr = arr.filter(x => {
  return x >= 2
})
#简写为:
    let brr = arr.filter(x => x >= 2)
```

### 使用filter去除数组中所有的 ”false“ 类型元素

> (false, null, undefined, 0, NaN or an empty string)

```js
let a = [1, 2, "b", 0, {}, "", NaN, 3, undefined, null, 5];
let b = a.filter(Boolean); // [1,2,"b",{},3,5]
```

## includes方法

关键字查询时使用

```ts
const arr = ['你好', '你在干嘛', '小黑子']

let brr = arr.filter(item => {
  return item.includes('你')
})
console.log(brr) // ['你好', '你在干嘛']
```

## reduce方法

> reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。
>
> reduce() 可以作为一个高阶函数，用于函数的 compose
>
> reduce() 对于空数组是不会执行回调函数的

```vue

<script>
export default {
  computed: {
    StatusMount() {
      return this.todos.reduce((pre, current) => pre + (current.status ? 1 : 0), 0)
      // pre为上一次的返回值
      // current为当前对象
      // 最后的0代表着初始值
    }
  }
}
</script>
```
## fill方法
它用于填充数组的所有元素，将它们设置为指定的固定值。这个方法会修改原始数组，也可以返回一个新数组。
`fill()` 方法的语法如下：

```js
array.fill(value, start, end);
```
其中：

- value：要用于填充数组的值。
- start（可选）：填充开始的索引，默认为 0。
- end（可选）：填充结束的索引（不包含），默认为数组的长度。
示例：
```js
const numbers = [1, 2, 3, 4, 5];
numbers.fill(0, 1, 4); // 将索引从 1 到 3 的元素设置为 0

console.log(numbers); // 输出 [1, 0, 0, 0, 5]

```
在这个示例中，`fill()` 方法将索引从 1 到 3 的元素设置为 0，原数组被修改。

注意事项：

- `start` 和 `end` 参数用于指定要填充的元素范围，其中 `start` 包含在内，`end` 不包含在内。默认情况下，整个数组都会被填充。
- `fill()` 方法会在原数组上进行修改，如果要保持原数组不变，可以使用 `slice()` 方法复制一个数组，然后在新数组上应用 `fill()`。
- `fill()` 方法可以用于各种填充场景，如初始化数组为特定值，重置数组中的值等。

## Array.apply

### Array构造函数

> 直接调用Array函数跟new方式调用是等价的，即:

```js
var a = Array(2); // 等价于var a = new Array(2);
```

表示：创建一个长度为2的数组，注意该数组的元素并没有被初始化，即：

```js
console.log(0 in a); // false
console.log(1 in a); // false, 因为数组下标0，1还未初始化
// undefined, 因为数组下标0还未初始化,访问不存在的属性返回undefined
console.log(a[0]); 
```
:::tip
> 使用 `forEach` 和 `Map` 遍历数组的时候，会自动跳过未被初始化的项（稀疏数组）
> 
> 密集数组：数组中每一项都有值哪怕是 `null`
>
> 可以用数组的 [`fill`](#fill方法) 方法，进行填充，将稀疏数组转换成密集数组 
> 
```js
const arr1 = Array(5) // [empty × 5]
arr1.fill(null) // [null, null, null, null, null]
```
:::

因为通过 `Array(5)` 或者 `new Array(5)` 方式创建的数组是一个有 `length` 属性的空数组，其中的每个元素还没有被赋值（初始化）

### apply函数

> ES5开始apply函数的第二个参数除了可以是数组外，还可以是类数组对象（即包含length属性，且length属性值是个数字的对象）。

创建一个长度是81的数组，并且每一项的值是undefined

```ts
Array.apply(null, {length: 81})
```

使用map来遍历每一项数组对其修改

```js
const list = ref(Array.apply(null, {length: 81}).map((value, index) => {
  return {
    id: index,
    number: (index % 9) + 1
  }
}))
```

## Array.from
它用于将类数组对象或可迭代对象转换为真正的数组。

> 该方法接受两个参数：第一个参数是要转换的对象，第二个参数（可选）是一个映射函数，用于对每个元素进行转换或操作。

### 生成长度为n的数组
```js
const numbers = Array.from({ length: 10 });
console.log(numbers);
// 输出: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]
```
>numbers 的结果将是一个由 undefined 组成的数组，数组的长度为 10。

```js
const numbers = Array.from({length: 10}, (_, idx) => idx + 1);
console.log(numbers);
// 输出: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```
1. `{ length: 10 }` 是一个具有 length 属性为 10 的对象字面量。这将作为 `Array.from()` 方法的第一个参数。
2. 第二个参数 `(_, idx) => idx + 1` 是一个箭头函数，用于指定如何将对象转换为数组元素。在这个函数中，我们忽略第一个参数（用 _
   表示），它表示当前数组元素的值（在这个例子中没有用到）。第二个参数 idx 表示当前数组元素的索引。箭头函数的返回值是当前数组元素的值，由索引
   idx 加上 1 组成。
3. `Array.from()` 方法将根据提供的对象和转换函数生成一个新数组，并将其赋值给变量 numbers。
   因此，最终 numbers 的结果将是一个包含数字 1 到 10 的数组。


### 将字符串转换为字符数组
```js
const str = 'Hello';
const charArray = Array.from(str);

console.log(charArray);
// 输出: ["H", "e", "l", "l", "o"]
```
### 将类数组对象转换为数组
```js
const arrayLike = { 0: 'apple', 1: 'banana', length: 2 };
const fruits = Array.from(arrayLike);

console.log(fruits);
// 输出: ["apple", "banana"]
```
### 使用映射函数对元素进行转换
```js
const numbers = [1, 2, 3, 4, 5];
const doubledNumbers = Array.from(numbers, num => num * 2);

console.log(doubledNumbers);
// 输出: [2, 4, 6, 8, 10]
```



### 将set集合转成数组

[set集合可以去重](../ts/set-map.html#set)

```js
const set = new Set(['welcome', 'you', '!']);
console.log(set);
// 转成数组
console.log(Array.from(set))
```

## some方法

定义和用法：`some()` 方法用于检测数组中的元素是否满足指定条件（函数提供）。

`some()` 方法会依次执行数组的每个元素：

回调函数返回一个布尔值，如果任一元素满足条件，some() 方法返回 true，否则返回 false。
:::tip
`some()` 不会对空数组进行检测

`some()` 不会改变原始数组
:::

示例：

```js
const numbers = [2, 4, 6, 8, 9, 10];

const hasOddNumber = numbers.some(number => {
  console.log('Checking number:', number);
  return number % 2 !== 0;
});

console.log('Result:', hasOddNumber);
```

结果为：

```yaml
Checking number: 2
Checking number: 4
Checking number: 6
Checking number: 8
Checking number: 9
Result: true
```

## find()方法

方法用于查找数组中满足指定条件的第一个元素，并返回该元素。
它会对数组中的每个元素依次调用提供的回调函数，直到找到满足条件的元素，或者遍历完所有元素。

`find()` 方法的语法如下：

```js
array.find((item, index, array) => {
})
```

- currentValue（必需）：当前正在被测试的元素。
- index（可选）：当前元素的索引。
- array（可选）：调用 find 方法的数组。

回调函数应返回一个布尔值。如果返回 true，find() 方法会立即返回当前元素，并停止遍历剩余的元素。
如果回调函数对所有元素的测试都返回 false，则 find() 方法返回 undefined。

示例:
> 展示了如何使用 find() 方法的完整语法来查找数组中的第一个奇数

```js
const numbers = [2, 4, 6, 8, 9, 10];

const firstOddNumber = numbers.find((item, index, array) => {
  return item % 2 !== 0;
});

console.log(firstOddNumber); // 输出: 9

```
## 数组解构
**一些使用数组解构赋值的示例：**
```js
const numbers = [1, 2, 3];

// 基本解构
const [a, b, c] = numbers;
console.log(a); // 输出: 1
console.log(b); // 输出: 2
console.log(c); // 输出: 3

// 跳过某些元素
const [x, , z] = numbers;
console.log(x); // 输出: 1
console.log(z); // 输出: 3

// 剩余元素
const [first, ...rest] = numbers;
console.log(first); // 输出: 1
console.log(rest); // 输出: [2, 3]

```
需要注意的是，在使用解构赋值时，左边的模式（即 [a, b]）必须与右边的值（即 [1, 2, 3]）的结构相匹配。
否则，赋值操作可能无法正常进行。

当使用数组解构赋值时，`...` 可以用来提取剩余的数组元素，将它们放入一个新数组中。

此外，`...` 还可以用于对象解构赋值中的剩余属性，用来提取对象中未被解构赋值的属性。这种方式允许我们将对象的一部分解构为一个新的对象。

**示例：**
```js
var { a, b, ...rest } = { a: 1, b: 2, c: 3, d: 4 };
console.log(a); // 输出: 1
console.log(b); // 输出: 2
console.log(rest); // 输出: { c: 3, d: 4 }
```

## ...方法
### 展开语法（Spread Syntax）：
>`...` 可以用于展开数组或对象。

```js
const arr = [1, 2, 3];
const newArr = [...arr, 4, 5];
console.log(newArr); // 输出: [1, 2, 3, 4, 5]

const obj = { a: 1, b: 2 };
const newObj = { ...obj, c: 3 };
console.log(newObj); // 输出: { a: 1, b: 2, c: 3 }
```
在上述示例中，`...arr` 将数组 arr 展开，然后添加新的元素 `[4, 5]`，得到新的数组 newArr。类似地，`...obj`
将对象 obj 展开，并添加新的属性 `{ c: 3 }`，得到新的对象 newObj。
### 函数参数中的剩余参数（Rest Parameters）
> `...` 可以将剩余的参数收集到一个数组中。

示例：
```js
function sum(...nums) {
  return nums.reduce((total, num) => total + num, 0);
}
```
- `...nums` 是剩余参数语法的形式，它表示可以接收任意数量的参数，并将它们收集到一个名为 nums 的数组中。
- [`reduce()`](#reduce方法) 是数组的一个高阶方法，用于对数组中的元素进行累积计算。它接受一个回调函数和一个初始值作为参数。
- 在回调函数 `(total, num) => total + num` 中，total 是累积的结果，num 是当前遍历到的元素。回调函数将当前元素与累积结果相加，得到新的累积结果。
- 0 是 `reduce()` 方法的初始值。如果数组为空，则返回该初始值作为结果。

**调用该函数并打印输出：**
```js
console.log(sum(1, 2, 3)); // 输出: 6
console.log(sum(4, 5, 6, 7)); // 输出: 22
```
- `sum(1, 2, 3)` 调用函数 sum 并传入三个参数 1、2 和 3。这些参数被收集到 nums 数组中。
- `nums.reduce((total, num) => total + num, 0)` 对 nums 数组中的元素进行累积计算。初始值为 0。计算过程为 `0 + 1 + 2 + 3`，结果为 6。
- `console.log(sum(1, 2, 3))` 打印输出结果 6。

### [浅拷贝](/js/#浅拷贝)

## pop()方法
`pop()` 是 JavaScript 数组的一个内置方法，它用于移除数组中的最后一个元素，并返回被移除的元素。
```js
const array = [1, 2, 3, 4];
const lastElement = array.pop();
console.log(lastElement); // 输出 4
console.log(array); // 输出 [1, 2, 3]

```
需要注意的是，pop() 方法会改变原始数组，即在调用 pop() 方法后，原数组中的最后一个元素将不再存在。
## shift()方法
`shift()` 是 JavaScript 数组的一个内置方法，用于移除数组的第一个元素，并返回被移除的元素。
```js
const array = [1, 2, 3, 4];
const firstElement = array.shift();
console.log(firstElement); // 输出 1
console.log(array); // 输出 [2, 3, 4]

```
需要注意的是，shift() 方法会改变原始数组，即在调用 shift() 方法后，原数组中的第一个元素将不再存在。

## slice()方法
`slice()` 方法是用于从数组中创建一个新的数组的方法。
它并不修改原始数组，而是返回一个从指定开始索引到结束索引（不包括结束索引本身）的新数组的副本。

**`slice()` 方法的语法如下：**
```js
array.slice(startIndex, endIndex);
```
**参数说明：**

- `startIndex`（可选）：表示从原数组中开始提取元素的起始位置的索引。如果未指定该参数，则默认从索引 0 开始。
- `endIndex`（可选）：表示在原数组中结束提取元素的索引（不包括该索引本身）。如果未指定该参数，则提取到原数组的末尾。

返回值：`slice()` 方法将返回一个新的数组，其中包含从原始数组中提取的元素。

**示例：**
```js
const originalArray = [1, 2, 3, 4, 5];

// 从索引 1 开始，到索引 4 结束（不包括索引 4 本身）
const slicedArray = originalArray.slice(1, 4);
console.log(slicedArray); // Output: [2, 3, 4]

// 未指定结束索引，从索引 2 开始到末尾
const slicedArray2 = originalArray.slice(2);
console.log(slicedArray2); // Output: [3, 4, 5]

// 不传递任何参数，创建原数组的浅拷贝
const shallowCopy = originalArray.slice();
console.log(shallowCopy); // Output: [1, 2, 3, 4, 5]

```
需要注意的是，`slice()` 方法返回的是原数组的一部分副本，并不影响原始数组本身。如果想从原数组中删除元素，可以使用 [`splice()`](#splice方法) 方法。

## join()
 `join()` 方法不会改变原数组,它会把数组的所有元素连接成一个字符串并返回。

`join()` 方法的语法如下:
```js
arr.join(separator)
```
- `separator`: 指定要使用的分隔符,默认为","。

join()方法不会改变原数组,例如:
```js
let arr = [1, 2, 3];

let str = arr.join(); // '1,2,3'

console.log(arr); // [1, 2, 3] (no changes)
```
```js
let arr = [1, 2, 3];

let str = arr.join('-'); // '1-2-3' 

console.log(arr); // [1, 2, 3] (no changes)
```
使用自定义分隔符 '-' ,原数组也没有被改变。
