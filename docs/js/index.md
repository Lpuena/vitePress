# JS常见问题

## 地址引用问题

- 基本类型： 传值，在栈内存中的数据发生数据变化的时候，系统会自动为新的变量分配一个新的之值在栈内存中，两个变量相互独立，互不影响的。
- 引用类型： 传址，只改变指针的指向，指向同一个对象，两个变量相互干扰

### 浅拷贝

> 把对象 / 数组的第一层的值，复制到新的数组 / 对象中

**使用场景**
> 修改数组 / 对象，影响另一个数组 / 对象，“砍断”他们的联系

:::tip 实现

- 使用for循环，或者使用for-i
- 使用扩展运算符

`newObj = {...oldObj}`

`brr = [...arr]`

- 使用Object.assign(target, source1, source2)对象合并

`let newData = Object.assign({},data)`

:::
**浅拷贝：只拷贝第一层的值，第二层互相引用**

### 深拷贝

> 把数组 / 对象中所有层的值，复制到新的数组 / 对象中
> 深拷贝开辟一个新的栈，两个对象对应两个不同的地址，修改一个对象的属性，不会改变另一个对象的属性

:::tip 实现方式
structuredClone

- `JavaScript` 中提供了一个原生 `API` 来执行对象的深拷贝：`structuredClone`。
  它可以通过结构化克隆算法创建一个给定值的深拷贝，并且还可以传输原始值的可转移对象。

JSON.parse(JSON.stringify())

- `JSON.stringify()`是前端开发过程中比较常用的深拷贝方式。
- 原理是把一个对象序列化成为一个`JSON`字符串，将对象的内容转换成字符串的形式再保存在磁盘上，再用`JSON.parse()`
  反序列化将`JSON`字符串变成一个新的对象
  :::
  示例：

```js
let obj = {
  name: '张三',
  age: 20,
  study: {
    id: 1,
    class: '23'
  }
}
let obj3 = JSON.parse(JSON.stringify(obj2))
obj.study.id = 2
console.log('obj2', obj2)
console.log('3', obj3)
```

::: warning JSON.stringify()实现深拷贝注意点

1. 拷贝的对象的值中如果有函数,`undefined`,`symbol`则经过`JSON.stringify()`序列化后的`JSON`字符串中这个键值对会消失
2. 无法拷贝不可枚举的属性，无法拷贝对象的原型链
3. 拷贝`Date`引用类型会变成字符串
4. 拷贝`RegExp`引用类型会变成空对象
5. 对象中含有`NaN`、`Infinity`和`-Infinity`，则序列化的结果会变成`null`
6. 无法拷贝对象的循环应用(即`obj[key] = obj`)
   :::

## Input输入框正则校验问题

::: warning
汉语拼音导致报错
:::

```vue
<el-input
        v-model="addPlaneForm.planPaymentAmount"
        oninput="value=value.match(/^\d+(?:\.\d{0,2})?/)"
        @blur="planPaymentAmountFix($event.target.value)"
        placeholder="请输入"
/>
```

:::tip
如果不需要对数据进行加工,直接在```@blur```中将```$event.target.value```的值赋给v-model中绑定的值.

<strong>示例：</strong>```@blur="addPlaneForm.planPaymentAmount = $event.target.value"```
:::

```js
planPaymentAmountFix(value){
  // value的值是输入框上面的$event.target.value
  console.log('value', value)
  if (value !== '') {
    this.addPlaneForm.planPaymentAmount = Number(value).toFixed(2)
  } else {
    //如果没有这一步，input输入框绑定的值一直都是v-model的值
    //输入汉字后，值会比正确的值慢一拍
    this.addPlaneForm.planPaymentAmount = value
  }
  console.log('更新后的值', this.addPlaneForm.planPaymentAmount)

}
```

## 格式化时间戳 parseTime

```js
export function parseTime(time, pattern) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    } else if (typeof time === 'string') {
      time = time.replace(new RegExp(/-/gm), '/').replace('T', ' ').replace(new RegExp(/\.[\d]{3}/gm),'');
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}
```