importance: 4

---

# 从数组创建键（值）对象

假设我们有以下形式的用户对象数组 `{id:..., name:..., age... }` 。

创建一个函数 `groupById(arr)` 从数组创建对象，以 `id` 为key，数组项为value。

例如:

```js
let users = [
  {id: 'john', name: "John Smith", age: 20},
  {id: 'ann', name: "Ann Smith", age: 24},
  {id: 'pete', name: "Pete Peterson", age: 31},
];

let usersById = groupById(users);

/*
// 调用方法后我们得到:

usersById = {
  john: {id: 'john', name: "John Smith", age: 20}
  ann: {id: 'ann', name: "Ann Smith", age: 24},
  pete: {id: 'pete', name: "Pete Peterson", age: 31},
}
*/
```

处理服务端数据时，此功能很有用。

在这个任务里我们假设 `id` 是唯一的。没有哪两个数组项具有相同的 `id` 。

请使用数组 `.reduce` 方法解决。
