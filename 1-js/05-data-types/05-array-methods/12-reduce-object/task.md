importance: 4

---

# 从数组创建键（值）对象

假设我们收到了一个用户数组，形式为：`{id:..., name:..., age... }`。

创建一个函数 `groupById(arr)` 从该数组创建对象，以 `id` 为键（key），数组项为值。

例如:

```js
let users = [
  {id: 'john', name: "John Smith", age: 20},
  {id: 'ann', name: "Ann Smith", age: 24},
  {id: 'pete', name: "Pete Peterson", age: 31},
];

let usersById = groupById(users);

/*
// 调用函数后，我们应该得到：

usersById = {
  john: {id: 'john', name: "John Smith", age: 20}
  ann: {id: 'ann', name: "Ann Smith", age: 24},
  pete: {id: 'pete', name: "Pete Peterson", age: 31},
}
*/
```


处理服务端数据时，这个函数很有用。

在这个任务里我们假设 `id` 是唯一的。没有两个具有相同 `id` 的数组项。

请在解决方案中使用数组的 `.reduce` 方法。
