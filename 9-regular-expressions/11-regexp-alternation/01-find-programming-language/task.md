# 查找编程语言

有许多编程语言，例如 Java, JavaScript, PHP, C, C++。

构建一个正则式，用来匹配字符串 `subject:Java JavaScript PHP C++ C` 中包含的编程语言：

```js
let reg = /your regexp/g;

alert("Java JavaScript PHP C++ C".match(reg)); // Java JavaScript PHP C++ C
```
