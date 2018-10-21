# 查找编程语言

有许多编程语言，例如 Java, JavaScript, PHP, C, C++。

构建一个正则式，用以在字符串 `subject:Java JavaScript PHP C++ C` 中把他们匹配出来：

```js
let reg = /your regexp/g;

alert("Java JavaScript PHP C++ C".match(reg)); // Java JavaScript PHP C++ C
```
