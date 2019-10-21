importance: 5

---

# 最高薪资

以下是一个 `salaries` 对象：

```js
let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};
```

新建一个函数 `topSalary(salaries)`，返回拥有最高薪资的人。

- 如果 `salaries` 是空的，函数应该返回 `null`。
- 如果有多个最高薪资的人，返回其中任意一个。

提示：使用 `Object.entries` 和解构语法来遍历键/值对。
