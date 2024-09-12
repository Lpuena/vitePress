# uniapp中使用pinia
与网页相同，重点是 `pinia-plugin-persistedstate` 持久化的不同
## persist
```js
persist: {
  storage: {
    getItem(key)
    {
      return uni.getStorageSync(key);
    },
    setItem(key, value)
    {
      uni.setStorageSync(key, value);
    },
  },
},
```
