importance: 5

---

# 解构赋值

我们有一个对象：

```js
let user = {
  name: "John",
  years: 30
};
```

写一个解构赋值语句使得：

- `name` 属性赋值给变量 `name`。
- `years` 属性赋值给变量 `age`。
- `isAdmin` 属性赋值给变量 `isAdmin`（如果属性缺失则取默认值 false）。

下面是赋值完成后的值的情况：

```js
let user = { name: "John", years: 30 };

// 等号左侧是你的代码
// ... = user

alert( name ); // John
alert( age ); // 30
alert( isAdmin ); // false
```
