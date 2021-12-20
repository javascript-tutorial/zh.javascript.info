# 在标签头后插入

我们有一个带有 HTML 文档的字符串。

编写一个正则表达式，在 `<body>` 标记之后立即插入 `<h1>Hello</h1>` 。标记可能具有属性。

例如：

```js
let regexp = /ваше регулярное выражение/;
let str = `
<html>
  <body style="height: 200px">
  ...
  </body>
</html>
`;
str = str.replace(regexp, `<h1>Hello</h1>`);
```

在此之后， `str` 的值应为：
```html
<html>
  <body style="height: 200px"><h1>Hello</h1>
  ...
  </body>
</html>
```