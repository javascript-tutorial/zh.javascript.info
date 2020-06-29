importance: 4

---

# 获取平均年龄

<<<<<<< HEAD
编写 `getAverageAge(users)` 函数，该函数获取一个具有 `age` 属性的对象数组，并返回平均年龄。
=======
Write the function `getAverageAge(users)` that gets an array of objects with property `age` and returns the average age.
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8

平均值的计算公式是 `(age1 + age2 + ... + ageN) / N`。

例如：

```js no-beautify
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 29 };

let arr = [ john, pete, mary ];

alert( getAverageAge(arr) ); // (25 + 30 + 29) / 3 = 28
```
