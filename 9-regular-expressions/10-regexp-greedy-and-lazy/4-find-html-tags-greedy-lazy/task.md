<<<<<<< HEAD
# 寻找 HTML 标签

创建一个正则表达式语句来寻找所有具有其属性的（闭合或非闭合）HTML 标签。

用例：

```js run
let reg = /你的正则表达式/g;

let str = '<> <a href="/"> <input type="radio" checked> <b>';

alert( str.match(reg) ); // '<a href="/">', '<input type="radio" checked>', '<b>'
```

假设不包含 `<` 和 `>`（也包括引号），这将会简单许多。
=======
# Find HTML tags

Create a regular expression to find all (opening and closing) HTML tags with their attributes.

An example of use:

```js run
let regexp = /your regexp/g;

let str = '<> <a href="/"> <input type="radio" checked> <b>';

alert( str.match(regexp) ); // '<a href="/">', '<input type="radio" checked>', '<b>'
```

Here we assume that tag attributes may not contain `<` and `>` (inside squotes too), that simplifies things a bit. 
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648
