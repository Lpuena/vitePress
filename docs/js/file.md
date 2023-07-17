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
