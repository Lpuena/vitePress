# JS常见问题

## 地址引用问题
- 基本类型： 传值，在栈内存中的数据发生数据变化的时候，系统会自动为新的变量分配一个新的之值在栈内存中，两个变量相互独立，互不影响的。
- 用类型： 传址，只改变指针的指向，指向同一个对象，两个变量相互干扰

## Input输入框正则校验问题
::: warning
汉语拼音导致报错
:::

```html
<el-input
    v-model="addPlaneForm.planPaymentAmount"
    oninput="value=value.match(/^\d+(?:\.\d{0,2})?/)"
    @blur="planPaymentAmountFix($event.target.value)"
    placeholder="请输入"/>

<!-- like this
        
  -->
```
> 如果不需要对数据进行加工,直接在```@blur```中将```$event.target.value```的值赋给v-model中绑定的值.
> 
> 示例:
> 
> ```@blur="addPlaneForm.planPaymentAmount = $event.target.value"```

```js
planPaymentAmountFix(value) {
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