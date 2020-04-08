importance: 5

---

# 按字段排序

我们有一组要排序的对象：

```js
let users = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" }
];
```

通常的做法应该是这样的：

```js
// 通过 name (Ann, John, Pete)
users.sort((a, b) => a.name > b.name ? 1 : -1);

// 通过 age (Pete, Ann, John)
users.sort((a, b) => a.age > b.age ? 1 : -1);
```

我们可以让它更加简洁吗，比如这样？

```js
users.sort(byField('name'));
users.sort(byField('age'));
```

这样我们就只需要写 `byField(fieldName)`，而不是写一个函数。

编写函数 `byField` 来实现这个需求。
