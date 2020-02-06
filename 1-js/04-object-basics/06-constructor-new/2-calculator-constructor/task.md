importance: 5

---

# 创建 new Calculator

创建一个构造函数 `Calculator`，它创建的对象中有三个方法：

- `read()` 使用 `prompt` 请求两个值并把它们记录在对象的属性中。
- `sum()` 返回这些属性的总和。
- `mul()` 返回这些属性的乘积。

例如：

```js
let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );
```

[demo]
