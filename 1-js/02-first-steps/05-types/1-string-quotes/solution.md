在反引号字符串中嵌入表达式 `${...}`。

```js run
let name = "Ilya";

// 表达式为数字 1
alert( `hello ${1}` ); // hello 1

// 表达式为一个字符串 "name"
alert( `hello ${"name"}` ); // hello name

// 表达式是一个变量，嵌入进去。
alert( `hello ${name}` ); // hello Ilya
```
