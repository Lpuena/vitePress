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

```jsx
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
## 组件分类
### 函数式组件

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

### 类式组件

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

#### 总结

1. 类中的构造器不是必须填写的,要对实例进行一些初始化的操作,如添加指定属性时才写
2. 如果B类继承了A类,且B类中有构造器,那么B类中的构造器的super是必须被调用的
3. 类中的方法都是放在了类的原型对象上,供实例去使用

#### 使用

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

> 1. state 是组件对象最重要的属性，值是对象(可以包含多个key-value的组合)
> 
> 2. 组件被称为“状态机”，通过更新组件的state来更新对应的页面显示(重新渲染组件)

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

**简写：**

```jsx
class Weather extends React.Component {
  // 初始化状态
  state = {isHot: true}

  render() {
    return (
        <h2 id="title" onClick={this.change}>今天的天气很{this.state.isHot ? '炎热' : '凉爽'}</h2>
    )
  }

  // 自定义方法，—— 要用赋值语句的形式 + 箭头函数
  change = () => {
    console.log('this', this);
    this.setState({
      isHot: !this.state.isHot
    });
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Weather/>)
```

### props
> props是只读的（单向数据流）
> 
```jsx
class Person extends React.Component {
   render() {
      console.log('this', this)
      const { name, age, sex } = this.props
      return (
          <>
             <ul>
                <li>姓名：{name}</li>
                <li>性别：{sex}</li>
                <li>年龄：{age}</li>
             </ul>
          </>
      )
   }

}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Person name="Tom" sex="男" age={19} />);
```
解构传递一个对象
```jsx
class Person extends React.Component {
   render() {
      console.log('this', this)
      const { name, age, sex } = this.props
      return (
          <>
             <ul>
                <li>姓名：{name}</li>
                <li>性别：{sex}</li>
                <li>年龄：{age}</li>
             </ul>
          </>
      )
   }
}
const obj = {
  name:'Tom', 
  sex:'男', 
  age:19
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Person {...obj} />);
```
**PropTypes(prop 传递的参数类型)**

引用
```html
  <script src="https://unpkg.com/prop-types@15.6/prop-types.js"></script>
```
```jsx
class Person extends React.Component {
   render() {
      console.log('this', this)
      const { name, age, sex } = this.props
      return (
          <>
             <ul>
                <li>姓名：{name}</li>
                <li>性别：{sex}</li>
                <li>年龄：{age}</li>
             </ul>
          </>
      )
   }
}
Person.propTypes = {
  name:PropTypes.string.isRequired, // name是字符串且是必填项
  sex:PropTypes.string
}
// 默认值
Person.defaultProps = {
  sex:'不男不女'
}
const obj = {
  name:'Tom', 
  sex:'男', 
  age:19
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Person {...obj} />);
```
:::warning
在propTypes中定义一个函数的时候，要写成
`speak:PropTypes.func`的形式

这些都已经过时了，TS是更好的选择
:::

**简写**
```jsx
class Person extends React.Component {
  static propTypes = {
     name:PropTypes.string.isRequired, // name是字符串且是必填项
     sex:PropTypes.string
  }
  static defaultProps = {
     sex:'不男不女'
  }
   render() {
      console.log('this', this)
      const { name, age, sex } = this.props
      return (
          <>
             <ul>
                <li>姓名：{name}</li>
                <li>性别：{sex}</li>
                <li>年龄：{age}</li>
             </ul>
          </>
      )
   }
}
const obj = {
  name:'Tom', 
  sex:'男', 
  age:19
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Person {...obj} />);
```

> 如果写了 `constructor`，就必须在 `super` 中传 `props`，不然会造成 `this.props` 为 `undefined`

```jsx
constructor(props) {
  super(props)
  console.log(this.props);
}
```

### 在函数式组件中使用props
> 函数式组件中只能使用props，因为函数可以接受参数
```jsx
function Person(props) {
   const { name, age, sex } = props
   return (
     <>
       <ul>
         <li>姓名:{name}</li>
         <li>年龄:{age}</li>
         <li>性别:{sex}</li>
       </ul>
     </>
   )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
const obj = {
   name: '张三',
   age: 18,
   sex: '男'
}
root.render(<Person {...obj} />)
```
函数式组件也可以使用 PropTypes 来限制类型
```jsx
function Person(props) {
   const { name, age, sex } = props
   return (
     <>
       <ul>
         <li>姓名:{name}</li>
         <li>年龄:{age}</li>
         <li>性别:{sex}</li>
       </ul>
     </>
   )
}
Person.propTypes = {
   name:PropTypes.string.isRequired, // name是字符串且是必填项
   sex:PropTypes.string,
   age:PropTypes.number
}
Person.defaultProps = {
   sex:'不男不女'
}
const root = ReactDOM.createRoot(document.getElementById('root'));
const obj = {
   name: '张三',
   age: 18,
   sex: '男'
}
root.render(<Person {...obj} />)
```

### refs
使用 `ref` 来管理React中的 `DOM` 元素
#### 字符串形式的ref
```jsx
class Com extends React.Component {
   render() {
     return (
       <>
         <div>
           <input ref="input1" type="text" placeholder="点击按钮显示数据" />&nbsp;
           <button onClick={this.show}>点我显示左侧数据</button>&nbsp;
           <input ref='input2' onBlur={this.blur} type="text" placeholder="失去焦点显示数据" />
         </div>
       </>
     )
   }
   show = () => {
     console.log('this', this);
     console.log('input1', this.refs.input1.value);
   }

   blur = () => {
     const {input2} = this.refs
     console.log(input2.value);
   }
 }
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Com />);
```
:::warning
这种方法已经过时了，而且有着效率问题，不推荐使用
:::

#### 回调函数形式的ref
在ref中使用回调函数，该函数会自动执行，`currentNode` 就是当前标签所在的节点
```jsx
class Com extends React.Component {
  render() {
    return (
      <>
        <div>
          <input 
              ref={(currentNode) => {this.input1 = currentNode}} 
              type="text" 
              placeholder="点击按钮显示数据" />&nbsp;
          <button onClick={this.show}>点我显示左侧数据</button>&nbsp;
          <input 
              onBlur={this.blur} 
              ref={currentNode => this.input2 = currentNode} 
              type="text" 
              placeholder="失去焦点显示数据" />
        </div>
      </>
    )
  }
  show = () => {
    console.log(this.input1.value);
  }

  blur = () => {
    const { input2 } = this
    console.log(input2.value);
  }
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Com bool />);
```
如果 ref 回调函数是一内联函数的方式定义的，在更新过程中它会被执行两次，第一次传入参数 null，然后第二次会传入参数 DOM元素。

这是因为在每次渲染时会创建一个新的函数实例，所以 React 清空旧的 ref 并且设置新的。通过将 ref 的回调函数定义成 class 的绑定函数的方式
可以避免上述问题，但是大多数情况下，他是无关紧要的。
#### class的ref绑定函数
```jsx
class Com extends React.Component {
    render() {
      return (
        <>
          <div>
             {/* <input 
             ref={(currentNode) => { this.input1 = currentNode }} 
             type="text" 
             placeholder="点击按钮显示数据" 
             />&nbsp; */}
            <input 
                ref={this.saveInput}  
                type="text" 
                placeholder="点击按钮显示数据" />
            <button onClick={this.show}>点我显示左侧数据</button>&nbsp;
            <input onBlur={this.blur} 
                   ref={currentNode => this.input2 = currentNode} 
                   type="text" 
                   placeholder="失去焦点显示数据" />
          </div>
        </>
      )
    }
    saveInput = (currentNode) => {
      this.input1 = currentNode
      console.log(this);
      console.log('#',currentNode);
    }
    show = () => {
      console.log(this.input1.value);
    }

    blur = () => {
      const { input2 } = this
      console.log(input2.value);
    }
  }
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<Com bool />);
```
:::tip
注释的时候需要使用 /* */ 来包裹，然后用大括号包裹
```jsx
{/*<h2>hello</h2>*/}
```
:::

#### createRef
React.createRef 调用后可以返回一个容器，该容器可以存储被ref所标识的节点，该容器是“专人专用的”（只能存一个）

createRef 返回一个对象，该对象只有一个属性：

  - current：初始值为 null，你可以稍后设置为其他内容。如果你把 ref 对象作为 JSX 节点的 ref 属性传递给 React，React 将设置其 current 属性。
```jsx
class Com extends React.Component {
  myRef = React.createRef()
  render() {
    return (
    <>
      <input type="text" ref={this.myRef} />
      <button onClick={this.show}>点我</button>
    </>
    )
  }
  show = () => {
    console.log(this.myRef.current.value);
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Com />)
```




#### React中的事件处理
1. 通过onXxx属性指定事件处理函数（注意大小写）
   - React使用的是自定义（合成）事件，而不是使用的原生DOM事件 ———— 为了更好的兼容性
   - React中的事件是通过事件委托方式处理的（委托给组件最外层的元素（冒泡）） ———— 为了高效
2. 通过 `event.target` 得到发生事件的DOM元素对象，不要过多的使用ref

> 当发生事件的元素，正好是要操作的元素就可以省略ref

```jsx
class Com extends React.Component {
  myRef = React.createRef()
  render() {
    return (
      <>
        <input type="text" ref={this.myRef} />
        <button onClick={this.show}>点我</button>
        <input onBlur={this.blur} type="text" /> //[!code ++]
      </>
    )
  }
  show = () => {
    console.log(this.myRef.current.value);
  }
  blur = (event) => { //[!code ++]
    console.log(event.target.value); //[!code ++]
  } //[!code ++]
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Com />)
```

### 非受控组件
非受控组件是指表单元素的值和状态并不由React组件的状态控制的一类组件。换句话说，表单元素的值不会受到React组件的状态变化影响，而是直接从DOM中读取。
这意味着在处理非受控组件时，你需要直接操作DOM来获取和设置表单元素的值。非受控组件通常比较适用于简单的场景，或者与第三方库集成时。

页面中所有输入类DOM，是现用现取，就是非受控组件
```jsx
class Login extends React.Component {
  render() {
    return (
      <>
        <form onSubmit={this.submit}>
          用户名：<input 
            ref={c=>this.username=c} 
            type="text" 
            name="username" />
          密码：<input 
            ref={c=>this.password=c} 
            type="password" 
            name="password" />
          <button>login</button>
        </form>
      </>
    )
  }
  submit = (event) => {
    // 阻止默认事件
    event.preventDefault();
    const { username, password } = this

    console.log(`登录的用户名是${username.value},密码是${password.value}`)
  }
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Login />);
```
在这里，ref 被用于获取输入框的引用，并且在提交表单时，直接通过 this.username.value 
和 this.password.value 来获取输入框的值，这是非受控组件的典型做法。

### 受控组件
受控组件是指表单元素的值和状态完全由React组件的状态来控制的一类组件。
在受控组件中，表单元素的值通过React的state来管理，同时通过事件处理函数来更新这些状态。
每当用户与表单元素交互时，都会触发React组件的状态更新，从而保持React组件与表单元素的状态同步。
