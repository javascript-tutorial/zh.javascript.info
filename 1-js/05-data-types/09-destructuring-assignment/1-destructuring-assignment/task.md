importance: 5

---

# 解构赋值

有以下对象：

```js
let user = {
  name: "John",
  years: 30
};
```

写一个解构赋值语句使得：

- `name` 属性赋值给变量 `name`。
- `years` 属性赋值给 `age`。
- `isAdmin` 属性赋值给变量 `isAdmin`（如果属性缺失则赋值为 false）。

赋值语句后的值必须是：

```js
let user = { name: "John", years: 30 };

// 等号左侧是你的代码
// ... = user

alert( name ); // John
alert( age ); // 30
alert( isAdmin ); // false
```
