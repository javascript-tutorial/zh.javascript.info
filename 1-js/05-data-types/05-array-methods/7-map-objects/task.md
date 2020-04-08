importance: 5

---

# 映射到对象

你有一个 `user` 对象数组，每个对象都有 `name`，`surname` 和 `id`。

编写代码以该数组为基础，创建另一个具有 `id` 和 `fullName` 的对象数组，其中 `fullName` 由 `name` 和 `surname` 生成。

例如：

```js no-beautify
let john = { name: "John", surname: "Smith", id: 1 };
let pete = { name: "Pete", surname: "Hunt", id: 2 };
let mary = { name: "Mary", surname: "Key", id: 3 };

let users = [ john, pete, mary ];

*!*
let usersMapped = /* ... your code ... */
*/!*

/*
usersMapped = [
  { fullName: "John Smith", id: 1 },
  { fullName: "Pete Hunt", id: 2 },
  { fullName: "Mary Key", id: 3 }
]
*/

alert( usersMapped[0].id ) // 1
alert( usersMapped[0].fullName ) // John Smith
```

所以，实际上你需要将一个对象数组映射到另一个对象数组。在这儿尝试使用箭头函数 `=>` 来编写。
