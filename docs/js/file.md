# 文件上传

- 二进制传输：用二进制流的形式传输文件
- base64：把文件转为base64字符串传输

文件相关的js对象解析

- `Blob对象` ： 把文件转换成二进制形式获取为blob对象
- `file` ： 通过input标签读取过来的对象
- `formData` ： 可以用来搭载blob对象来传输
- `fileReader` ： 多用于把文件读取为某种形式，如文本，base64

:::tip
file 是 Blob对象的子类 本质上还是 Blob
:::

## 使用formData
```vue
<script setup lang="ts">
import axios from 'axios'
function onFileChange(e: any) {
  console.log(e.target.files);
  const file = e.target.files[0];
  // 判断文件大小不能超过10KB
  if (file.size > 10000) {
    alert('文件大小不能超过10KB');
    console.log(e);

    console.log(e.target.value);
    e.target.value = ''
    return
  }
  // 限制文件后缀
  let ext = file.name.split('.').pop();
  console.log(ext);
  if (ext !== 'xls' && ext !== 'jpeg' && ext !== 'gif') {
    alert('只能上传xls、jpeg、gif格式的文件');
    e.target.value = ''
    return
  }
  console.log('file', file);

  // 新建formDate对象
  let formData = new FormData();
  formData.append('file', file)
  formData.append('aaa', 'aaa')
  console.log(formData);
  const url = 'http://localhost:8080/upload'
  axios.post(url, formData)
}
</script>

<template>
  <div>
    <input type="file" @change="onFileChange">
  </div>
</template>

<style scoped></style>
```

## 转成base64
```ts
// 新建fileReader对象
let reader = new FileReader();
let base64 = reader.readAsDataURL(file);
reader.onload = function () {
  console.log(reader.result); // base64
  imgUrl.value = reader.result as string

}
console.log(base64); // undefined
```

## 多文件上传
```ts
const imgList = ref<Array<any>>([])
const base64List = ref<Array<any>>([])
// 多文件上传
function onFileChange2(e: any) {
  const fileList= e.target.files
  console.log(e.target.files);
  for (let i = 0; i < fileList.length; i++) {
    imgList.value.push(fileList[i])
    let reader = new FileReader();
    reader.readAsDataURL(fileList[i]);
    reader.onload= function (){
     base64List.value.push(reader.result)
    }
  }
}
```
