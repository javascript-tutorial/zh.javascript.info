# 寻找 HTML 标签

创建一个正则表达式来寻找所有（开始和结束）HTML 标签及其特性。

用例：

```js run
let regexp = /你的正则表达式/g;

let str = '<> <a href="/"> <input type="radio" checked> <b>';

alert( str.match(regexp) ); // '<a href="/">', '<input type="radio" checked>', '<b>'
```

这里我们假设标签特征中不包含 `<` 和 `>`（包括被引号包裹的内容），这样就简单多了。
