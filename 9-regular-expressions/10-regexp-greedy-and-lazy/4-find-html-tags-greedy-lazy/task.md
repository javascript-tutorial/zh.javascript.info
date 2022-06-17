# 寻找 HTML 标签

创建一个正则表达式语句来寻找所有具有其属性的（闭合或非闭合）HTML 标签。

用例：

```js run
let reg = /你的正则表达式/g;

let str = '<> <a href="/"> <input type="radio" checked> <b>';

alert( str.match(reg) ); // '<a href="/">', '<input type="radio" checked>', '<b>'
```

这里我们假设标签属性中不会包含 `<` 和 `>`（也包括引号），这将会简单许多。
