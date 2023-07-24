# String
## String.padStart方法
> `String.padStart()` 是 JavaScript 字符串的一个方法，用于将当前字符串填充到指定的长度，并在填充部分的开头添加指定的字符。

**语法:**
```js
str.padStart(targetLength, [ padString])
```

**参数:**

- `targetLength`：要填充的目标长度。如果当前字符串的长度小于目标长度，则会进行填充。如果大于或等于目标长度，则不会进行任何操作。
- `padString`（可选）：用于填充的字符串。默认值是空格字符 " "。
  
**返回值:**

填充后的新字符串。

```js
const str = 'Hello';
const paddedStr = str.padStart(10, '*');

console.log(paddedStr);
// 输出: "*****Hello"

```
在上面的示例中，我们调用了 padStart() 方法将字符串 'Hello' 填充到长度为 10，并在填充部分的开头添加了 * 字符。
由于字符串 'Hello' 的长度小于目标长度 10，所以在开头添加了 5 个 * 字符，以达到目标长度。

> 需要注意的是，如果指定的填充字符串无法完全填充到目标长度，那么会截断填充字符串，使其适应目标长度。

**示例：**
```js
const str = 'Hello';
const paddedStr = str.padStart(3, '*');

console.log(paddedStr);
// 输出: "Hello"

```
在上面的示例中，我们将字符串 'Hello' 填充到长度为 3，并使用 * 字符进行填充。
由于目标长度 3 小于字符串 'Hello' 的长度，所以不进行任何填充，返回原始字符串。

`padStart()` 方法对于需要将字符串对齐到固定宽度的情况很有用，比如在打印输出时对齐列数据或创建固定宽度的文本格式等。

## repeat方法
`repeat()` 方法是字符串对象的内置方法，用于创建一个新的字符串，该字符串是原始字符串重复指定次数的结果。

该方法接受一个整数参数，表示要重复字符串的次数。它会将原始字符串重复指定次数，并返回一个新的字符串。

```js
const str = 'Hello';
const length = 10;
const char = '*';

const paddedStr = str + char.repeat(length - str.length);

console.log(paddedStr);
// 输出: "Hello*****"
```
> 需要注意的是，如果传递给 repeat() 方法的参数是 0 或负数，则会返回一个空字符串。如果传递的参数是浮点数，会将其取整为最接近的整数。

```js
const str = 'Hello';
console.log(str.repeat(0));   // 输出: ""
console.log(str.repeat(-1));  // 输出: ""
console.log(str.repeat(2.5)); // 输出: "HelloHello"
```
## charAt方法
`charAt()` 方法可返回指定位置的字符。

第一个字符位置为 0, 第二个字符位置为 1,以此类推.

```js
var str = "HELLO WORLD";
var n = str.charAt(2) // L
```
### 实现GPT动画效果
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<div>
    <span id="textSpan"></span>
</div>
<script>
    const text = '你好好哈克里时间分厘卡第三方库垃圾上单'
    let textSpan = document.getElementById('textSpan');
    // index 是字符的索引
    function changeText(index) {
        if (index < text.length) {
            textSpan.innerHTML += text.charAt(index);
            index++;
            setTimeout(() => changeText(index), 100)
        }
    }
    changeText(0)
</script>
</body>
</html>
```

## split方法
split() 是 JavaScript 字符串的一个内置方法，用于将字符串拆分为一个字符串数组，根据指定的分隔符进行拆分。
```js
const str = "Hello, World!";
const parts = str.split(",");
console.log(parts); // 输出 ["Hello", " World!"]

```
在上面的示例中，split() 方法被调用在字符串 str 上，使用逗号 , 作为分隔符进行拆分。
它将字符串拆分为一个数组 ["Hello", " World!"]，并将该数组返回。

需要注意的是，split() 方法不会改变原始字符串，而是返回一个新的数组。

除了指定单个字符作为分隔符，split() 方法还可以使用正则表达式作为分隔符，从而进行更复杂的字符串拆分操作。

## slice方法
```js
const str = 'Hello, World!';

// 使用slice()方法从索引7开始（包括7），直到索引12结束（不包括12）获取一个新的子字符串
const slicedStr = str.slice(7, 12);
console.log(slicedStr); // 输出: 'World'

// 如果只提供开始索引，则从该索引开始一直复制到字符串的末尾
const slicedStrFromIndex = str.slice(3);
console.log(slicedStrFromIndex); // 输出: 'lo, World!'

// 注意：原始字符串str并未被修改
console.log(str); // 输出: 'Hello, World!'

```

