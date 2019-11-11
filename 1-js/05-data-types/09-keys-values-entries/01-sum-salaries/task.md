importance: 5

---

# 属性求和 Sum the properties

有一个 salaries 对象，包含了任意数量的薪水。

使用 Object.values 和 for..of 循环语句写一个可以返回所有薪水的和的函数 sumSalaries(salaries)。

如果 `salaries` 是空对象，那么结果必须是 `0`。

举个例子：

```js
let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

alert( sumSalaries(salaries) ); // 650
```

