importance: 3

---

# 将数值属性值都乘以 2

创建一个 `multiplyNumeric(obj)` 函数，把 `obj` 所有的数值属性值都乘以 `2`。

例如：

```js
// 在调用之前
let menu = {
  width: 200,
  height: 300,
  title: "My menu"
};

multiplyNumeric(menu);

// 调用函数之后
menu = {
  width: 400,
  height: 600,
  title: "My menu"
};
```

注意 `multiplyNumeric` 函数不需要返回任何值，它应该就地修改对象。

P.S. 用 `typeof` 检查值类型。
