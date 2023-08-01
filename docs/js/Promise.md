# Promise
> Promise 是异步编程的一种解决方案，比较传统的解决方案回调函数，更合理和更强大。ES6将其写进了语言标准。

- 指定回调函数方式更加灵活易懂
- 解决异步回调地狱的问题

## 回调地狱
> 就是回调函数嵌套过多导致的

当一个回调函数嵌套一个回调函数的时候，就会出现一个嵌套结构，嵌套的多了，就会出现回调地狱的情况

```js
function ajax(url, successCb, errorCb) {
  setTimeout(() => {
    // 成功的回调
    successCb();
    // 失败的回调
    errorCb();
  }, 1000);
}
// 111成功后请求222，再333
ajax('111', () => {
  console.log('成功了');
  // 回调地狱
  ajax('222', () => {
    console.log('成功了');
    ajax('333', () => {
          console.log('成功了');
        }, () => {
          console.log('失败了');
        })
  }, () => {
    console.log('失败了');
  })
}, () => {
  console.log('失败了');
});
```

## 基本语法
- 当我们 `new` 一个 `promise`，此时我们需要传递一个回调函数，这个函数为立即执行的，称之为（`executor`）
- 这个回调函数，我们需要传入两个参数回调函数，`resolve` , `reject` (函数可以进行传参)

当执行了 `resolve` 函数，会回调 `promise` 对象的 `.then` 函数
当执行了 `reject` 函数，会回调 `promise` 对象的 `.catch` 函数

**示例：**
```js
function resultData(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data === 'xxx') {
        resolve("成功了，数据上传成功")
      } else {
        reject("失败了，请检查数据是否正确")
      }
    }, 1000)
  })
}

// 写法1
resultData('list').then(resolve => {
  //成功了，数据上传成功
  console.log(resolve);

}, reject => {
  //失败了]=>请检查数据是否正确
  console.log(reject);
})

// 写法2
resultData('list').then(resolve => {
  //成功了，数据上传成功
  console.log(resolve);
}).catch(reject => {
  //失败了，请检查数据是否正确
  console.log(reject);
})
```
## Promise 对象的状态
> Promise对象通过自身的状态,来控制异步操作.Promise实例具有三种状态

- 异步操作未完成(pending)
- 异步操作完成(fulfilled)
- 异步操作失败(rejected)

这三种的状态的变化途径只有两种
- 从"未完成"到成功
- 从"未完成"到失败

状态一旦改变就会定型,不会再改变了(所以 `resolve` 和 `reject` 只能执行一个)

## resolve不同值的区别
`resolve()` 和 `reject()` 只能接受并处理一个参数，多余的参数会被忽略掉,
如果想传递多个数据，需要用数组，或者对象的方式来进行传参。
```js
  function resultData(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data === 'list') {
        resolve(["成功了，数据上传成功", "你可以进行下一步操作了"])
      } else {
        reject({one: "失败了，请检查数据是否正确", two: "需要重新上传"})
      }
    }, 1000)
  })
}

//请求成功
resultData('list').then(resolve => {
  //成功了，数据上传成功 你可以进行下一步操作了
  console.log(resolve[0], resolve[1]);
})
//请求失败
resultData('lit').catch(reject => {
  //失败了，请检查数据是否正确 需要重新上传
  console.log(reject.one, reject.two);
})
```
如果resolve中传入的是另外一个Promise，那么这个新Promise会决定原Promise的状态

## Promise 对象方法(类方法/静态方法)
> Promise 是一个对象，也是一个构造函数

### 1. Promise.resolve()
```js
Promise.resolve('xxx')
//等价于
new Promise(resolve => {
  resolve('xxx')
})
```
### 2. Promise.reject()
```js
const p = new Promise((resolve, reject) => reject('error'))
//等价于
const p = Promise.reject('error')
```
:::tip
可以让 `Promise` 对象，走 `resolve` 的时候,依旧可以走 `reject`

当返回的数据不是标准格式的时候，另类格式（接口返回的数据异常）的时候通过 [`return Promise.reject()`](#promise的链式调用) 来返回，或者通过 `throw new Error()` 来抛出错误

:::
```js
let a = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, 5000)
})

a.then(res => {
  console.log(res);
  if (res) {
    console.log('成功')
  } else {
    // return Promise.reject('失败')
    throw new Error('失败')
  }
}).catch(err => {
  console.log(err);
})
```
### 3. Promise.all()
> `Promise.all()` 方法用于将多个 Promise 实例，包装成一个新的 Promise 实例
```js
const p = Promise.all([1, 2, 3])
```
p的状态由p1，p2，p3决定，分成两种情况。
1. 只有p1、p2、p3的状态都为`fulfilled`，那么p的状态为`fulfilled`，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数
2. 只要p1、p2、p3的状态有一个为`rejected`，那么p的状态为`rejected`，此时第一个被reject的实例的返回值，传递给p的回调函数

示例：
```js
function getData(list) {
  let newList = list.map(item => {
    return fetch(item).then(res => res.json())
  })
  return Promise.all(newList)
}
getData([
  'https://api.github.com/users/github',
  'https://api.github.com/users/Lpuena',
  'https://api.github.com/users/hzhu25'
]).then(res => {
  console.log(res)
})
```

### 4. Promise.race()
> `Promise.race()` 方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例

```js
const p = Promise.race([p1, p2, p3])
```
上面的代码中，只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着变化。哪个率先改变的Promise实例的返回值，就传递给p的回调函数

示例：给fetch增加请求的超时时间
```js
// 使用Promise.race进行fetch请求超时
let p1 = fetch('http://127.0.0.1:3000/news').then((res) => {
  return res.json();
});
let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('超时');
  }, 2000);
});

Promise.race([p1, p2]).then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err);
});
```
### 5. Promise.allSettled()
> `Promise.allSettled()` 方法确定一组异步操作是否都结束了（不管成功或失败）。所以，它的名字叫做 `settled` 包含了 `fulfilled` 和 `rejected` 两种状态
```js
const promises = [ajax('111'), ajax('222'), ajax('333')]
Promise.allSettled(promises).then(results => {
//   过滤出成功的请求
  results.filter(item => item.status === 'fulfilled')
//   过滤失败的请求
  results.filter(item => item.status === 'rejected')
})
```
### 6. Promise.any()
> 只要参数实例有一个编程 fulfilled 状态，包装实例就会变成`fulfilled`状态 如果所有参数实例都变成 rejected状态，包装实例就变成`rejected`状态

Promise.any()跟Promise.race()方法很像，只有一点不同，
就是Promise.any()不会因为某个Promise变成rejected状态而结束，必须等到所有参数Promise变成rejected状态才会结束

```js

```


## Promise的链式调用
`.catch` 可以直接写在 `.then` 的后面，是因为 `.then` 方法返回的是一个 `Promise` 对象

`.then` 返回的默认值是 **`undefined，fulfilled`**，使用 return 可以改变默认值，
想要走到 `.catch` 方法，就要返回一个 Promise
`return Promise.reject('error')`，这样就可以将 Promise 的状态改成 `rejected`

可以无限 `.then` 方法:
```js
let a = new Promise(resolve => {
  resolve('data')
})
let a1 = a.then(res => {
  console.log(1, res); // data
  return res
}).then(res => {
  console.log(2, res); // data
}).then(res => {
  console.log(3, res); // undefined
})
```
`.then` 后调用 `.catch` 方法:
```js
let a = new Promise(resolve => {
  resolve('data')
})
let a1 = a.then(res => {
  console.log(1, res); // data
  return '12323'
}).then(res => {
  console.log(2, res); // 12323
  return Promise.reject('error')
}).then(res => {
  console.log(3, res);
}).catch(err => {
  console.log(4, err); // error
})
```
接口的连续调用：
```js
const title = 'xx'
const url = `http://localhost:3000/news?title=${title}`

// 获取id
fetch(url).then(res => res.json()).then(data => {
  let id = data[0].id
  // 通过id查询评论
  return fetch(`http://localhost:3000/comments?news_id=${id}`)
}).then(res => {
  console.log('122', res)
  return res.json()
}).then(res => {
  console.log('333', res)
})
```
## Promise实例上的finally方法
无论走 `.then` 还是 `.catch` 都会执行 `finally` 方法,这个方法会返回一个新的 fulfilled Promise 实例

可以将 `.then` 和 `.catch` 中都想实现的功能放到 `finally` 方法中 (用例:接口请求后关闭loading)
```js
let p = new Promise((resolve, reject) => {
  resolve(1)
})
p.then((res) => {
  console.log('then1', res); // then1 1

}).catch((err) => {
  console.log('catch');
}).finally(() => {
  // finally这里接受不了参数,永远都是`undefined`
  console.log('finally'); // finally
}).then((res) => {
  console.log('then2', res); // then2 undefined
})
```
```js
let p = new Promise((resolve, reject) => {
  reject(1)
})
p.then((res) => {
  console.log('then1', res);
  return undefined
}).catch((err) => {
  console.log('catch', err); // catch 1
  return 'error'
}).finally(() => {
  console.log('finally');  // finally
}).then((res) => {
  console.log('then2', res); // then2 error
})
```
## async 和 await
`async` 函数，使得异步操作变得更加方便
- 更好的语意
- 返回值是一个 `Promise`
```js
async function getData() {
  
}
const a = getData()
console.log(a) // Promise
```
`await` 关键字只能在异步函数中使用，用于等待一个 `Promise` 对象的解决结果。
当遇到 `await` 表达式时，JavaScript 引擎会暂停函数的执行，直到 `Promise` 对象被解决（`resolved`）。await 表达式返回解决后的结果。
```js
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

```
在上面的例子中，`fetchData` 是一个异步函数，它使用 `await` 等待 `fetch` 函数返回的 `Promise` 对象。
当 `Promise` 被解决（请求成功）时，它会将响应数据解析为 `JSON`，并打印在控制台上。
如果 `Promise` 被拒绝（请求失败），则会在控制台打印错误信息。
