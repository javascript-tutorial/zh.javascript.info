importance: 5

---

# 属性求和

有一个带有任意数量薪水的 `salaries` 对象。

编写函数 `sumSalaries(salaries)`，该函数使用 `Object.values` 和 `for..of` 循环返回所有薪水的总和。

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

