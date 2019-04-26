# 查找正数

编写一个能够匹配正数的正则，包括没有小数点的数。

使用案例：
```js
let reg = /your regexp/g;

let str = "1.5 0 -5 12. 123.4.";

alert( str.match(reg) ); // 1.5, 12, 123.4 (ignores 0 and -5)
```
