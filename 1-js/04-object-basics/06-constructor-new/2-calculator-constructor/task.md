importance: 5

---

# 创建 new Calculator

创建一个构造函数使用3种方法创建对象的 `Calculator`：

- `read()` 使用 `prompt` 请求两个值并在对象属性中记住它们。
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
