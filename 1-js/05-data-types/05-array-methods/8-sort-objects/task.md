importance: 5

---

<<<<<<< HEAD
# 按年龄对用户排序

编写函数 `sortByAge(users)` 获得对象数组的 `age` 属性，并根据 `age` 对这些对象数组进行排序。
=======
# Sort users by age

Write the function `sortByAge(users)` that gets an array of objects with the `age` property and sorts them by `age`.
>>>>>>> 9acc1302a14a3bbabbc9bf95d04581094bd0f1a8

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
