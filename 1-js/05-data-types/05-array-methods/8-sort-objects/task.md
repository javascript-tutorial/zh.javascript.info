importance: 5

---

<<<<<<< HEAD
# 排序对象

编写函数 `sortByName(users)` 获得对象数组 property的属性 `name` 并对它进行排序。
=======
# Sort users by age

Write the function `sortByAge(users)` that gets an array of objects with the `age` property and sorts them by `age`.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

例如：

```js no-beautify
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let arr = [ pete, john, mary ];

sortByAge(arr);

// now: [john, mary, pete]
alert(arr[0].name); // John
alert(arr[1].name); // Mary
alert(arr[2].name); // Pete
```
