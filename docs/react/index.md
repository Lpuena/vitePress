---
markdown: true
---

# React
主流的思想：不在直接去操作DOM，而是改为 **“数据驱动思想”**

操作DOM思想:
- 操作DOM比较消耗性能广主要原因就是:可能会导致DOM重排(回流)/重绘
- 操作起来麻烦一些

数据驱动思想：
- 不去直接操作DOM
- 直接去操作数据（修改了数据，框架会按照相关的数据，让页面重新渲染）
- 框架底层实现视图的渲染，也是基于操作DOM完成的
  + 构建了一套 虚拟DOM->真实DOM 的渲染体系
  + 有效避免了DOM的重排/重绘
+ 开发效率较高，最后的性能相对较好

## MVC
React框架采用的是MVC体系，Vue框架采用的是MVVM体系
MVC："M" 代表数据模型（Model），"V" 代表视图（View）, "C" 代表控制器（Controller）
- 我们需要按照专业的语法去构建视图(页面): react 中是基于jsx语法来构建视图的 
- 构建数据层:但凡在视图中，需要“动态”处理的(需要变化的，不论样式还是内容)，都要有对应的数据模型
- 控制层：当我们在视图中(或者根据业务需求)进行某些操作的时候，都是去修改相关的数据，然后React框架会按照最新的数据，重新渲染
  视图，以此让用户看到最新的效果
数据驱动视图的渲染！

视图中的表单内容改变，想要修改数据，需要自己写代码实现
- 单向驱动

MVVM："M" 代表数据模型，"V" 代表视图，"VM" 代表视图模型（ViewModel）
- 数据驱动视图的渲染：修改数据，视图会跟着更新
- 视图驱动数据的更改，监听页面中表单元素内容的改变，自动去修改相关的数据
- 双向驱动（双向数据绑定）

## 版本之间区别
```
16版本：一些项目用的最多的
17版本：最大的升级就是看不出升级(语法没变啥，只是底层处理机制上的升级)
18版本：机制和语法都有区别
```
## 使用creat-react-app 脚手架
```json
{
   "scripts": {
      // 开发环境：在本地启动web服务器，预览打包内容 
      "start": "react-scripts start",
      // 生产环境：打包部署，打包的内容输出到 build 目录中
      "build": "react-scripts build",
      // 单元测试
      "test": "react-scripts test",
      // 暴露webpack的配置规则，因为想修改默认的打包规则
      "eject": "react-scripts eject" 
   },
   "dependencies": {
      "@testing-library/jest-dom": "^5.17.0",
      "@testing-library/react": "^13.4.0",
      "@testing-library/user-event": "^13.5.0",
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "react-scripts": "5.0.1",
      // 性能检测工具
      "web-vitals": "^2.1.4"
   },
}
```

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
   - `{}` 胡子语法中嵌入不同的值，所呈现的也不同
   - number/string 值是什么，就渲染出什么 
   - boolean/null/undefined/Symbol/BigInt 渲染的内容是空
   - 除数组对象外，其余对象一般都不支持在 `{}`中进行渲染，但也有特殊情况
     - JSX虚拟DOM对象
     - 个元素style行内样式，要求必须写成一个对象格式
   - 数组对象，将数组中的每一项分别拿出来渲染（并不是变成字符串渲染，中间没有逗号）
   - 函数对象，不支持在`{}`中渲染，但是可以作为函数组件，用`<Component />` 方式渲染

4. 样式的类名指定不用 `class`，使用 `className`

5. 内联样式要用

   ```jsx
   <div style={{color: 'red'}}></div>
   ```

6. 虚拟DOM必须只有一个根标签

7. 标签必须闭合
8. 标签名首字母大写：react就去渲染对应的组件，若组件没有定义，则报错
9. 标签名首字母小写：则将标签转为html中同名的元素，若html中无该标签对应的同名元素，则会报错

## JSX中使用循环
循环创建的元素一定设置key属性，属性值是本次循环中的唯一值，用于优化DOM-DIFF

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

## JSX条件渲染
```jsx
const flag = false

root.render(
  //   类似于Vue中的v-show
  <button style={{display:flag?'block':'none'}}>按钮1</button>
  //   类似于Vue中的v-if
  {flag ? <button>按钮2</button> : null}
  {flag && <button >按钮3</button>}
)



```

普通class类名和动态class类名的绑定

可以使用 `classnames` 这个js库，可以非常方便的通过条件动态控制class类名的显示
```jsx
<li className="nav-sort">
  {/* 高亮类名： active */}
  {tabs.map(item =>
    <span
      key={item.type}
      onClick={() => handleTabChange(item.type)}
      className={`nav-item ${ type === item.type && 'active'}`} //[!code --]
      className={classNames('nav-item', { active: type === item.type })}> //[!code ++]
      {item.text}
    </span>)}
</li>
```

## JSX底层处理机制 
第一步:把我们编写的JSX语法，编译为虚拟DOM对象 `virtualDOM`,
虚拟DOM对象:框架自己内部构建的一套对象体系(对象的相关成员都是React内部规定的)，基于这些属性描述出，我们所构建视图中的，DOM节点的相关特征!!
 - 基于 `babel-preset-react-app` 把 JSX 编译为 `React.createElement(...)`(legacy API) 这种格式!!
 - 只要是元素节点，必然会基于createElement进行处理!
 - React.createElement(ele,props,..children)
   - ele: 元素标签名(或组件)
   - props: 元素的属性集合(对象),如果没有设置过任何的属性，则此值是null
   - children: 第三个及以后的参数，都是当前元素的子节点

虚拟DOM中的内容
```js
virtualDOM = {
  $$typeof: Symbol('react.element'),
  key: null,
  props:{
    '元素的相关属性',
    children: '子节点信息 (没有子节点则没有这个属性、属性值可能是一个值、也可能是一个数组)'
  },
  ref:null,
  type: '标签名 (或组件)'
}
```
第二步:把构建的 `virtualDOM` 渲染为真实DOM
真实DOM:浏览器页面中，最后渲染出来，让用户看见的DOM元素!!

补充说明:第一次染页面是直接从 `virtualDOM` -> 真实DM；但是后期视图更新的时候，需要经过一个 `DOM-DIFF` 的对比，
计算出补丁包 `PATCH` (两次视图差异的部分)，把 `PATCH` 补丁包进行染!!

![img](/JSX虚拟DOM.png)

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

## 非受控组件
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

## 受控组件
受控组件是指表单元素的值和状态完全由React组件的状态来控制的一类组件。
在受控组件中，表单元素的值通过React的state来管理，同时通过事件处理函数来更新这些状态。
每当用户与表单元素交互时，都会触发React组件的状态更新，从而保持React组件与表单元素的状态同步。

```jsx
 class Login extends React.Component {
   state = {
     username: '',
     password: ''
   }
   render() {
     return (
       <>
         <form onSubmit={this.submit}>
           用户名：<input 
             onChange={this.nameChange} 
             type="text" 
             name="username" />
           密码：<input 
             onChange={this.passwordChange} 
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
     const { username, password } = this.state

     console.log(`登录的用户名是${username},密码是${password}`)
   }
   nameChange = (event) => {
     this.setState({
       username: event.target.value
     })
   }
   passwordChange = (event) => {
     this.setState({
       password: event.target.value
     })
   }
 }
 const root = ReactDOM.createRoot(document.getElementById('root'));
 root.render(<Login />);
```
## 高阶函数
如果一个函数符合下面2个规范中的任何一个，那该函数就是高阶函数

 - 若A函数，接收的参数是一个函数，那么A就可以称为高阶函数
 - 若A函数，调用的返回值依然是一个函数，那么A就可以成为高阶函数

常见的高阶函数：Promise、setTimeout、arr.map()
## 函数柯里化
通过函数调用继续返回函数的方式，实现多次接收参数最后统一处理的函数编码形式

```jsx
 class Login extends React.Component {
   state = {
     username: '',
     password: ''
   }
   render() {
     return (
       <>
         <form onSubmit={this.submit}>
           用户名：<input 
             onChange={this.nameChange} //[!code --]
             onChange={this.formChange('username')}  //[!code ++]
             type="text" name="username" />
           密码：<input 
             onChange={this.formChange('password')}  //[!code ++]
             type="password" name="password" />  
           <button>login</button>
         </form>
       </>
     )
   }
   submit = (event) => {
     // 阻止默认事件
     event.preventDefault();
     const { username, password } = this.state

     console.log(`登录的用户名是${username},密码是${password}`)
   }
   formChange = (type) => { //[!code ++]
     return (event) => this.setState({ //[!code ++]
       [type]: event.target.value //[!code ++]
     }) //[!code ++]
   } //[!code ++]
   nameChange = (event) => { //[!code --]
     this.setState({ //[!code --]
       username: event.target.value //[!code --]
     }) //[!code --]
   } //[!code --]
   passwordChange = (event) => { //[!code --]
     this.setState({ //[!code --]
       password: event.target.value //[!code --]
     }) //[!code --]
   } //[!code --]
 } //[!code --]
 const root = ReactDOM.createRoot(document.getElementById('root'));
 root.render(<Login />);
```

也可以不使用函数柯里化来解决
```jsx
class Login extends React.Component {
  render() {
    return (
        <form>
          密码：<input
            onChange={(event) => {this.change('password', event)}}
            type="password" name="password"/>
          <button>login</button>
        </form>
    )
  }

  change = (type, event) => {
    this.setState({
      [type]: event.target.value
    })
  }
}
```

