importance: 5

---

# 创建 new Calculator

创建一个使用 3 种方法创建对象的构造函数 `Calculator`：

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
