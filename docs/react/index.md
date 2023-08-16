---
markdown: true
---

# React

## HTML中简单使用

React 18以前（使用的js，没用jsx）

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8"/>
    <title>Hello World</title>
    <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>

    <!-- Don't use this in production: -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>

<body>
<div id="root"></div>
<script type="text/javascript">
    const VDOM = React.createElement("h1", {id: 'title'}, 'Hello React')
    ReactDOM.render(VDOM, document.getElementById('root'))

</script>
</body>

</html>
```

jsx

```html

<body>
<div id="root"></div>
<script type="text/babel">
    const VDOM = <h1 id="title">Hello,React</h1>
    ReactDOM.render(VDOM, document.getElementById('root'))
</script>
</body>
```

React 18

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8"/>
    <title>Hello World</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

    <!-- Don't use this in production: -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>

<body>
<div id="root"></div>
<script type="text/babel">
    const VDOM = <h1 id="title">Hello,React</h1>
    const root = ReactDOM.createRoot(document.getElementById('root'))
    root.render(VDOM)

</script>
</body>

</html>
```

:::tip
关于虚拟DOM：

1. 本质是Object类型的对象（一般对象）
2. 虚拟DOM身上的属性少，真实DOM身上的属性多，因为虚拟DOM是React内部在用，无需真实DOM身上那么多的属性
3. 虚拟DOM最终会被React渲染成真实DOM
   :::

## 绑定变量

```html
const myId = 'tItLe'
const content = 'HeLLo,ReAct!'
const VDOM = (
<h2 id={myId.toLowerCase()}>
    <span>{content.toLowerCase()}</span>
</h2>
)
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(VDOM)
```

## JSX的语法规则：

1. 多层结构的时候，使用小括号包裹

2. 定义虚拟DOM时，不要写引号

3. 标签中混入**JS表达式**时要用`{}`

4. 样式的类名指定不用 `class`，使用 `className`

5. 内联样式要用

```jsx
<div style={{color: 'red'}}></div>
```

6. 虚拟DOM必须只有一个根标签

7. 标签必须闭合
8. 标签名首字母大写：react就去渲染对应的组件，若组件没有定义，则报错
9. 标签名首字母小写：则将标签转为html中同名的元素，若html中无该标签对应的同名元素，则会报错

## jsx中使用循环

```jsx
  const list = ['Angular', 'Vue', 'React']
const VDOM = (
    <>
      <h2> 前端框架列表 </h2>
      <ul>
        {
          list.map(item => {
            return <li key={item}>{item}</li>
          })
        }
      </ul>
    </>
)
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(VDOM)
```

## 函数式组件

```jsx
function Component() {
  console.log(this) // undefined 
  // 此处的this是 undefined 是因为通过 `babel` 编译后开启了严格模式
  return <h1>Hello</h1>
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Component/>)
```

:::tip root.render(<Component/>)之后，发生了什么

1. React解析组件标签，找到了 Component 组件。
2. 发现组件是使用函数定义的，调用该函数，将返回的虚拟DOM转为真实的DOM，随后呈现在页面中。
   :::

## 类式组件

### 类的概念

```js
class Person {
  constructor(name, age) {
    // 构造器中的this是谁，- 类的实例对象
    this.name = name
    this.age = age
  }

  // 一般方法
  say() {
    // say方法放在了哪里 - 类的原型对象上,供实例使用
    // 通过Person实例调用say时,say中的this就是Person实例
    console.log(`我是${this.name},今年${this.age}岁`)
  }
}

const p1 = new Person('张三', 18)
p1.say()

class Student extends Person {
  constructor(name, age, grade) {
    super(name, age)
    this.grade = grade
  }

  say() {
    console.log(`我是${this.name},今年${this.age}岁,我在读${this.grade}`)
  }
}

const s1 = new Student('李四', 19, '一年级')
s1.say()
```

### 总结

1. 类中的构造器不是必须填写的,要对实例进行一些初始化的操作,如添加指定属性时才写
2. 如果B类继承了A类,且B类中有构造器,那么B类中的构造器的super是必须被调用的
3. 类中的方法都是放在了类的原型对象上,供实例去使用

### 使用

```jsx
class MyComponent extends React.Component {
  render() {
    // render是放在哪里的 - MyComponent的原型对象上,供实例使用
    // render中的this 指向MyComponent的实例对象(MyComponent组件实例对象)
    return <h2>hhhh</h2>
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<MyComponent/>)
```

:::tip root.render(<Component/>)之后，发生了什么

1. React解析组件标签，找到了 Component 组件。
2. 发现组件是使用类定义的，随后new出来该类的实例，并通过该实例调用
   原型上的render方法
3. 将render返回的虚拟DOM转为真实的DOM，随后呈现在页面中。
   :::

## 组件实例的三大核心属性

### state

在class中使用

```jsx
class Weather extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isHot: true
    }
    this.change = this.change.bind(this) //[!code ++]
  }

  render() {
    return (
        // 这里使用change 而不是change(),是因为change()返回的是函数的返回值
        <h2 id="title" onClick={this.change}>今天的天气很{this.state.isHot ? '炎热' : '凉爽'}</h2>
    )
  }

  change() {
    console.log('this', this);
     // 严重注意:状态(state)不能直接修改,要借助内置API去更改,下面就是直接更改
     // this.state.isHot = !this.state.isHot  // 这是错误的写法
     this.setState({
        isHot: !this.state.isHot
     });
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Weather/>)
```
:::warning
1. `change` 是作为 `onClick` 的回调，所以不是通过实例调用的，是直接调用

2. 类中的方法默认开启了局部的严格模式，所以change中的this为undefined

3. 使用bind解决this指向问题,在constructor中使用
`this.change = this.change.bind(this);`
4. state 不可以直接修改，必须通过 `setState` 修改，而且更新是合并不是替换
5. construct 只有被实例化的时候被调用一次
6. render 调用1+n次，1是初始化的那次，n是状态更新的次数
:::
