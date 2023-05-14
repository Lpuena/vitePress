## 使用原生JS

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script> //[!code ++]
    window.onload = function () { //[!code ++]
        var btn = document.getElementById('btn') //[!code ++]
        btn.onclick = function () { //[!code ++]
            var username = document.getElementById('username').value //[!code ++]
            alert(username) //[!code ++]
        } //[!code ++]
    } //[!code ++]
    </script>//[!code ++]
</head>
<body>
用户名：<input type="text" id="username">
<button id="btn">确定(原生)</button>
</body>
</html>
```

:::tip
`window.onload()` 方法用于在网页加载完毕后立刻执行的操作，即当 HTML 文档加载完毕后，立刻执行某个方法。

`window.onload()` 通常用于 `<body>` 元素，在页面完全载入后(包括图片、css文件等等)执行脚本代码。
:::
或者：

```html {17}
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>document</title>
    <script> //[!code ++]
    function displayDate() { //[!code ++]
        document.getElementById("demo").innerHTML = Date(); //[!code ++]
    } //[!code ++]
    </script>//[!code ++]
</head>
<body>
    
<h1>我的第一个 JavaScript 程序</h1>
<p id="demo">这是一个段落</p>

<button type="button" onclick="displayDate()">显示日期</button>

</body>
</html>
```

## 使用jQuery

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="js/jQuery.js"></script>//[!code ++]
    <script> //[!code ++]
    $(function () { //[!code ++]
        $('#btnJQ').click(function () { //[!code ++]
            var username = $('#username').val() //[!code ++]
            alert(username) //[!code ++]
        }) //[!code ++]
    }) //[!code ++]
    </script> //[!code ++]
</head>
<body>
用户名：<input type="text" id="username">
<button id="btnJQ">确定(jQuery)</button>
</body>
</html>
```

:::tip
jQuery核心函数: `$/jQuery`

jQuery核心对象: 执行 $() 返回的对象
:::
