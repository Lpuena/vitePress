# React 
## HTML中简单使用
React 18以前
```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8" />
  <title>Hello World</title>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

  <!-- Don't use this in production: -->
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>

<body>
  <div id="root"></div>
  <script type="text/babel">
    const VDOM = React.createElement("h1", {id:'title'}, 'Hello React')
    ReactDOM.render(VDOM, document.getElementById('root'))

  </script>
</body>

</html>
```
React 18 
```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8" />
  <title>Hello World</title>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

  <!-- Don't use this in production: -->
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>

<body>
  <div id="root"></div>
  <script type="text/babel">
    const VDOM = React.createElement("h1", { id: 'title' }, 'Hello React')
    const root = ReactDOM.createRoot(document.getElementById('root'))
    root.render(VDOM)

  </script>
</body>

</html>
```
