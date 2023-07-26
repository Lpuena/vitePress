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
