# proxy和Reflect

## Proxy

Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）

语法：

```ts
let proxy = new Proxy(target, handelr)
```

### target

要使用 Proxy 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理），
必须是引用类型（对象，数组，函数，set，map）

### handler

一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 p 的行为。

`handler.get()` 本次使用的get

属性读取操作的捕捉器。

`handler.set()` 本次使用的set

属性设置操作的捕捉器。

### 创建一个没有任何捕捉器的代理（Proxy）

```ts
type Target = {
  text: number
}
let target: Target = {
  text: 1
};
let proxy = new Proxy(target, {}); // 空的 handler 对象

proxy.test = 5; // 写入 proxy 对象 (1)
alert(target.test); // 5，test 属性出现在了 target 中！

alert(proxy.test); // 5，我们也可以从 proxy 对象读取它 (2)

for (let key in proxy) alert(key); // test，迭代也正常工作 (3)
```

由于没有捕捉器，所有对 `proxy` 的操作都直接转发给了 `target`。

1. 写入操作 `proxy.test=` 会将值写入 `target`。
2. 读取操作 `proxy.test` 会从 `target` 返回对应的值。
3. 迭代 `proxy` 会从 `target` 返回对应的值。

我们可以看到，没有任何捕捉器，`proxy` 是一个 `target` 的透明包装器（wrapper）。


<img v-show="light" src="/proxy_light.png">
<img v-show="!light" src="/proxy_dark.png">

Proxy 是一种特殊的“奇异对象`（exotic object）`”。它没有自己的属性。如果 `handler` 为空，则透明地将操作转发给 `target`。

要激活更多功能，让我们添加捕捉器。

我们可以用它们拦截什么？

对于对象的大多数操作，JavaScript 规范中有一个所谓的“内部方法”，它描述了最底层的工作方式。例如 `[[Get]]`
，用于读取属性的内部方法，`[[Set]]`，用于写入属性的内部方法，等等。这些方法仅在规范中使用，我们不能直接通过方法名调用它们。

:::warning 不变量（Invariant）
JavaScript 强制执行某些不变量 —— 内部方法和捕捉器必须满足的条件。

其中大多数用于返回值：

- `[[Set]]` 如果值已成功写入，则必须返回 `true`，否则返回 `false`。
- `[[Delete]]` 如果已成功删除该值，则必须返回 `true`，否则返回 `false`。
- ……依此类推，我们将在下面的示例中看到更多内容。

还有其他一些不变量，例如：

- 应用于代理（proxy）对象的 `[[GetPrototypeOf]]`，必须返回与应用于被代理对象的 `[[GetPrototypeOf]]`
  相同的值。换句话说，读取代理对象的原型必须始终返回被代理对象的原型。

捕捉器可以拦截这些操作，但是必须遵循上面这些规则。

不变量确保语言功能的正确和一致的行为。完整的不变量列表在 规范 中。如果你不做奇怪的事情，你可能就不会违反它们。
:::

### 有get方法的Proxy

最常见的捕捉器是用于读取/写入的属性。

要拦截读取操作，`handler` 应该有 `get(target, property, receiver)` 方法。

读取属性时触发该方法，参数如下：

- `target` —— 是目标对象，该对象被作为第一个参数传递给 `new Proxy`
- `property` —— 目标属性名
- `receiver` —— 如果目标属性是一个 `getter` 访问器属性，则 `receiver` 就是本次读取属性所在的 `this`
  对象。通常，这就是 `proxy` 对象本身（或者，如果我们从 `proxy` 继承，则是从该 `proxy` 继承的对象）。

```ts
type Target = {
  test: number
  name: string
  age: number
}

let target: Target = {
  test: 1,
  name: 'zs',
  age: 20
}

let targetProxy = new Proxy(target, {
  get(target: Target, key, receiver) {
    
    if (key in target) {
      console.log('触发了get')
      return target[key] + '加工了一下'
    } else {
      console.log('触发了get-else')
      return 0
    }
  }
})
// 不会触发Proxy中的get方法
console.log(target.age); // 20

// 触发Proxy中的get方法，得到的结果就是get中return返回的可加工的字符串
console.log(targetProxy.age); // 触发了get   20加工了一下

```

我们可以用 Proxy 来实现“默认”值的任何逻辑。

想象一下，我们有一本词典，上面有短语及其翻译，如果没有我们要读取的短语，那么从 `dictionary` 读取它将返回
`undefined`。但实际上，返回一个未翻译的短语通常比 `undefined` 要好。因此，让我们在这种情况下返回一个未翻译的短语来替代
`undefined`。

为此，我们将把 `dictionary` 包装进一个拦截读取操作的代理：(在 `handler` 中添加 `get` 方法)

```ts
let dictionary = {
  'Hello': 'Hola',
  'Bye': 'Adiós',
};
let dictionaryProxy = new Proxy(dictionary, {
  get(target, key: string) {
    if (key in target) {
      return target[key]
    } else {
      console.log('触发没找到')
      return '字典中没有找到' + key
    }
  }
})

console.log(dictionaryProxy['Hello']) //Hola

//触发没找到
console.log(dictionaryProxy['askdf']); //字典中没有找到askdf

```

:::tip
请注意代理如何覆盖变量：

`dictionary = new Proxy(dictionary, ...);`

代理应该在所有地方都完全替代目标对象。目标对象被代理后，任何人都不应该再引用目标对象。否则很容易搞砸。
:::

### set 捕捉器

假设我们想要一个专门用于数字的数组。如果添加了其他类型的值，则应该抛出一个错误。

当写入属性时 `set` 捕捉器被触发。

`set(target, property, value, receiver)`：

`target` —— 是目标对象，该对象被作为第一个参数传递给 `new Proxy`，
`property` —— 目标属性名称，
`value` —— 目标属性的值，
`receiver` —— 与 `get` 捕捉器类似，仅与 `setter` 访问器属性相关。
如果写入操作（`setting`）成功，`set` 捕捉器应该返回 `true`，否则返回 `false`（触发 `TypeError`）。

让我们用它来验证新值：

```ts
let numbers = [];

numbers = new Proxy(numbers, { // (*)
  set(target, prop, val) { // 拦截写入属性操作
    if (typeof val == 'number') {
      target[prop] = val;
      return true;
    } else {
      return false;
    }
  }
});

numbers.push(1); // 添加成功
numbers.push(2); // 添加成功
console.log("Length is: " + numbers.length); // 2

// numbers.push("test"); // TypeError（proxy 的 'set' 返回 false）
// "This line is never reached (error in the line above)"
```

请注意：数组的内建方法依然有效！值被使用 `push` 方法添加到数组。当值被添加到数组后，数组的 `length`
属性会自动增加。我们的代理对象 `proxy` 不会破坏任何东西。

我们不必重写诸如 `push` 和 `unshift` 等添加元素的数组方法，就可以在其中添加检查，因为在内部它们使用代理所拦截的 `[[Set]]`
操作。

因此，代码简洁明了。
:::tip
别忘了返回 `true`
如上所述，要保持不变量。

对于 `set` 操作，它必须在成功写入时返回 t`rue。

如果我们忘记这样做，或返回任何假`（falsy）`值，则该操作将触发 `TypeError`。
:::

## Reflect

与大多数全局对象不同Reflect并非一个构造函数，所以不能通过new运算符对其进行调用，或者将Reflect对象作为一个函数来调用。Reflect的所有属性和方法都是静态的（就像Math对象）

**`Reflect.get(target, name, receiver)`**

Reflect.get方法查找并返回target对象的name属性，如果没有该属性返回undefined

**`Reflect.set(target, name,value, receiver)`**

Reflect.set方法设置target对象的name属性等于value。

```ts
type Person = {
  name: string,
  age: number,
  text: string
}


const proxy = (object: any, key: any) => {
  return new Proxy(object, {
    get(target, prop, receiver) {
      console.log(`get key======>${key}`);
      return Reflect.get(target, prop, receiver)
    },
    
    set(target, prop, value, receiver) {
      console.log(`set key======>${key}`);
      
      return Reflect.set(target, prop, value, receiver)
    }
  })
}

const logAccess = (object: Person, key: 'name' | 'age' | 'text') => {
  return proxy(object, key)
}

let man: Person = logAccess({
  name: "小满",
  age: 20,
  text: "我的很小"
}, 'age')

man.age = 30

console.log(man);
```

### 使用泛型+keyof优化

```ts
type Person = {
  name: string,
  age: number,
  text: string
}


const proxy = (object: any, key: any) => {
  return new Proxy(object, {
    get(target, prop, receiver) {
      console.log(`get key======>${key}`);
      return Reflect.get(target, prop, receiver)
    },
    
    set(target, prop, value, receiver) {
      console.log(`set key======>${key}`);
      
      return Reflect.set(target, prop, value, receiver)
    }
  })
}


const logAccess = <T>(object: T, key: keyof T): T => { //[!code ++]
  return proxy(object, key)//[!code ++]
}//[!code ++]

let man: Person = logAccess({
  name: "小满",
  age: 20,
  text: "我的很小"
}, 'age')


let man2 = logAccess({
  id: 1,
  name: "小满2"
}, 'name')

man.age = 30

console.log(man);
```

### 案例简单实现一个mobx观察者模式

```ts
const list: Set<Function> = new Set()
const autorun = (cb) => {
  if (!list.has(cb)) {
    list.add(cb)
  }
}

const observable = <T extends object>(params: T) => {
  return new Proxy(params, {
    set(target: T, key, newValue: any, receiver: any): boolean {
      const result = Reflect.set(target, key, newValue, receiver)
      list.forEach(fn => fn())
      return result
    }
  })
}

const personProxy = observable({name: 'Gxx', text: '1231231'})

autorun(() => {
  console.log('有变化了')
})
personProxy.name = 'ls'//触发autorun中的有变化了
```

<script lang="ts" setup>
import {onUpdated, ref, watchEffect} from "vue";
let value = ref('');
value.value = localStorage.getItem('vitepress-theme-appearance');

let dark = ref(false);
let light = ref(false);
if(value.value==='auto'){
  dark.value = false;
  light.value = true
}else{ 
  light.value = false;
  dark.value = true
}
watchEffect(()=>{
console.log(value);
console.log('变更了')

});
</script>