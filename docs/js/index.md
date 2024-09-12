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
planPaymentAmountFix(value)
{
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

也可以这么写
```html
<el-form-item :label="passwordOrNewPassword" prop="password">
  <el-input
      v-model="ruleForm.password"
      type="password"
      @input="inputBoxRegular('password')"
      autocomplete="off"
      placeholder="请输入密码，只支持数字和字母"
  />
</el-form-item>
```
```ts
const inputBoxRegular = (name:string) => {
  ruleForm.value[name] = ruleForm.value[name].replace(/[^A-Za-z0-9]/g, '');
}
```

## 给元素绑定动态class样式

> 利用三元表达式 和v-bind 来动态绑定

```html

<a-checkbox :checked="item.done" :class="item.done ? 'textDecoration' : ''"
            @click="changeDoneById(item.id)">
    {{ item.info }}
</a-checkbox>
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
      time = time.replace(new RegExp(/-/gm), '/').replace('T', ' ').replace(new RegExp(/\.[\d]{3}/gm), '');
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

## element-ui table表格多选

> 使用element-ui中的table时，当有多选又有翻页功能时，点击翻页后之前选中的数据丢失，怎么使表格具有记忆功能呢

![img](/element-table.png)

:::warning
不建议使用该方法，因为该方法有一个弊端，就是数据回显的时候，没有使用回显中的数据进行状态选定，而是用了刚刚缓存的内容。

例如：选择了第一页的两个数据，没有点击保存确认，而是点击了取消，数据回显的时候，它的缓存就会把刚刚勾选的内容全部渲染成勾选的状态，而不是通过数据回显进行。
:::

### 推荐方法

直接定义一个数组，用来保存所选数据的 id，用存在数组中的 id 来进行判断是否被选中，也可以存别的内容，封装成对象保存在数组中，方便在父组件中使用。

在父组件中：

```html

<selectSupplierPopMut :IdNameList="IdNameList"
                      :productIdNameList="form.productIdNameList"
                      v-model="supplierIsShow"
                      @confirm="supplierSelecDataFn"
/>
```

:::tip
[`v-model="supplierIsShow"`](../vue/#父子组件的v-model传值) 的传值用来控制子组件的显示状态。

`productIdNameList` 用来传的是数据回显的时候，form表单中的一个list集合 里面有id和对象名称（使用对象名称，进行对象名字的拼接）

`IdNameList` 是子组件点击确认后传过来数据 即`@confirm="supplierSelecDataFn"`方法获取到的值
:::

在子组件：

```vue

<template>
  <el-table ref="multipleTable3"
            :data="supplierTableData"

            tooltip-effect="dark"
            height="600"
            style="width: 100%"
            @selection-change="supplierSelectionChange"
            @select="supplierSelectionSelect"
            @select-all="supplierSelectionSelectAll"
  >
  </el-table>
</template>
<script>
export default {
  props: ['value', 'productIdNameList', 'IdNameList'],
  data() {
    return {
      //上锁的状态
      rowSelectFlag: false,
      isSupplierPop: false, // 是否展示弹窗: 选择供应商
      newIdNameList: [], // 父组件传入的id集合的copy
      // 选择供应商弹窗 表格数据（接口获取到的分页数据在页面显示）
      supplierTableData: [],
    }
  },
  watch: {
    value(newval) {
      this.isSupplierPop = newval
      if (newval) {
        // 展示弹窗
        //打开弹窗总是展示第一页
        this.queryParams.pageNo = 1
        this.handleQuery() // 接口获取分页数据的方法
        // (分页的时候都会调用这个方法，我把idChange方法也放在里面了，
        // 在请求数据的时候就进行数据回显)

        // 如果父组件传入进来的IdNameList集合里面有数据，
        // 就证明需要数据回显，将数据深拷贝给子组件内的数组
        if (this.IdNameList.length > 0) {
          console.log(2)
          this.newIdNameList = structuredClone(this.IdNameList)
          //   如果父组件传入了一个productIdNameList的数组，
          //   就代表着是修改页面的数据
        } else if (this.productIdNameList) {
          console.log(1)
          this.newIdNameList = structuredClone(this.productIdNameList)
          //   首次打开
        } else {
          console.log(3)
          this.newIdNameList = []
        }

      }
    }
  },
  methods: {
    // 传id,name数组,通过id来进行多选的数据回显
    idChange() {
      console.log('777', this.newIdNameList)
      // 如果不是首次打开，有数据就进行多选框的状态回显
      if (this.newIdNameList.length > 0) {
        // 上锁，避免 toggleRowSelection 被动触发 select/select-change
        setTimeout(() => {
          this.rowSelectFlag = true
          this.newIdNameList.forEach(item => {
            // console.log(this.supplierTableData)
            this.supplierTableData.forEach(item1 => {
              // 如果匹配到相同id的，就证明该项需要显示勾选状态
              if (item.supplierId == item1.id) {
                // console.log('执行了数据回显的状态显示')
                // 将其状态改变
                this.$refs.multipleTable3.toggleRowSelection(item1, true)
              }
            })
          })
          this.rowSelectFlag = false
        }, 0)
      }

    },

    // 取消弹窗按钮
    cancel() {
      this.isSupplierPop = false
      this.$emit('input', false)
    },
    // 确认按钮 添加供应商
    async supplierConfirm() {
      // 选中的多选数据传给父组件
      // this.$emit('confirm', this.supplierSelecData)
      this.$emit('confirm', this.newIdNameList)
      // 关闭弹窗
      this.$emit('input', false)

    },

    // 供应商选择的select方法
    // select 方法接受两个参数selection和row
    // selection表示被选中的数组，所有被选中的内容都会被添加到这个数组中，
    // 只有第一次全新进入选择的时候，这个数组才好用

    // row，表示选中当前项的详细数据
    supplierSelectionSelect(selection, row) {
      console.log('selection', selection)
      console.log('row', row)
      // 如果选中的id在父组件传过来的id数组中有的话，就将该项删除，没有就添加
      this.newIdNameList.forEach(item => {
        if (row.id == item.supplierId) {
          this.idStatus = true
          console.log('id相同')
          this.newIdNameList = this.newIdNameList.filter(item1 => {
            // id相同，去除
            return item1.supplierId != row.id
          })
        }
        console.log('遍历', item.supplierId)
      })
      // 如果没找到id相同的就进行添加
      if (!this.idStatus) {
        console.log('添加')
        let obj = {
          supplierId: row.id,
          supplierName: row.supplierName
        }
        this.newIdNameList.push(obj)
      }

      console.log('newIdNameList', this.newIdNameList)
      this.idStatus = false

    },
    // 供应商选择的select-all 方法
    supplierSelectionSelectAll(selection) {
      // 当全选的时候，selection能拿到全选了哪些数据

      this.allList = structuredClone(selection)
      console.log('all', selection)
      console.log(this.newIdNameList)
      // 数组长度大于0就是全选了，不然就是取消全选了
      if (selection.length > 0) {
        selection.forEach(item => {
          this.newIdNameList.forEach(item1 => {
            // 如果选中的数据中，包含原来选中的数据，那么就将其删除然后push进去
            if (item.id == item1.supplierId) {
              console.log('有相同包含的')
              this.allList = this.allList.filter(x => x.id != item1.supplierId)
              console.log('allList', this.allList)
            }

          })
        })
        // 将全选筛选出来的数据放入newIdNameList
        this.SelectAllAdd()
      } else {
        // 但是当全部取消全选的时候，selection的值为空数组
        // 获取不到取消全选了哪些内容
        // 每次点击下一页的时候，数据接口都会返回该页的全部信息，用 cancelSelectAll 接收
        console.log('取消了的全选数据', this.cancelSelectAll)
        this.cancelSelectAll.forEach(item => {
          this.newIdNameList = this.newIdNameList.filter(item1 => {
            return item1.supplierId != item.id
          })
        })
        console.log('取消全选newIdNameList', this.newIdNameList)
      }

    },
    // 供应商选择的select-all 中，将全选筛选出来的数据放入newIdNameList
    SelectAllAdd() {
      let obj = {}
      // 将筛选后的每一项封装一下，只留下想要使用的信息
      this.allList.forEach(item => {
        obj = {
          supplierId: item.id,
          supplierName: item.supplierName
        }
        this.newIdNameList.push(obj)
      })

      console.log('最后的newIdNameList', this.newIdNameList)
    },
  }
}
</script>
```

:::tip
`selection-change`这个方法，在多选的时候，感觉不是很好用，`selection`方法更好(可以精确知道是哪个状态变化了)，
全选用`select-all`
:::

## element-table表格 Popover提示

需求：将列表的某一列的数据进行超过两行后过长隐藏
首先将这一列进行Popover包裹

1. 将 trigger 触发事件，由 hover 改成 manual
2. 绑定 `v-model` 绑定的值就是用来判断Popover是否展示的
3. 在需要隐藏的标签身上添加class样式
4. 给这个标签添加鼠标的划入和划出事件

:::warning
该方法有个问题，就是无法复制提示框的内容，鼠标一离开弹窗就消失。
:::

```vue

<template>
  <el-table :data="userList">
    <el-table-column label="供应商" align="center" key="supplierName"
                     prop="supplierName">
      <template v-slot="scope">
        <el-popover
            placement="top-start"
            width="300"
            trigger="manual"
            :content="scope.row.supplierName"
            v-model="scope.row.isTop"
        >

          <div class="lineOmitted" slot="reference"
               @mouseleave="closeTips($event,scope.row)"
               @mouseenter="showTips($event,scope.row)"
          >
            {{ scope.row.supplierName }}
          </div>
        </el-popover>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  methods: {
    // 鼠标划过
    showTips(obj, row) {
      // 多行隐藏的时候用scrollHeight  单行隐藏的时候用scrollWidth
      //scrollHeight就是文本未被隐藏的真实高度
      // console.log('鼠标呼划入事件', obj.target.scrollHeight)
      // 两行的高度是46,自适应宽度变，table表格的高不变
      // 判断高度是否超出46 来进行判断它是否被隐藏了部分
      if (obj.target.scrollHeight > 46) {
        row.isTop = true
        console.log(row.isTop)
      } else {
        row.isTop = false
        console.log(row.isTop)
      }

    },
    // 鼠标离开
    closeTips(obj, row) {
      row.isTop = false
    },
  }
}
</script>
<style lang="scss">
.lineOmitted {
  display: -webkit-box; //将对象作为弹性伸缩盒子模型显示。
  overflow: hidden;
  text-overflow: ellipsis;

  -webkit-box-orient: vertical; //从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
  -webkit-line-clamp: 2;

}
</style>

```

## TS + Vue3 + Element 打包报错

> 模块 "element-plus" 没有导出的成员 "ElMessage"。
> 你是想改用 "import ElMessage from "element-plus"" 吗?

环境：Vue3 + Vite + Ts + Element Plus

问题出在ts的语法检查，`import { ElMessage } from 'element-plus';` 在框架里找不到ElMessage这个对象

解决方法：
> tsconfig.app.json 和 tsconfig.node.json 都添加 `moduleResolution`属性

```json
"compilerOptions": {
"moduleResolution": "node"
}
```
