importance: 5

---

# 排除反向引用

在简单循环引用的情况下，我们可以通过名称排除序列化中匹配的属性。

<<<<<<< HEAD:1-js/05-data-types/11-json/2-serialize-event-circular/task.md
但有时会有很多反向引用。可以同时用于循环引用和常规属性。
=======
But sometimes we can't just use the name, as it may be used both in circular references and normal properties. So we can check the property by its value.
>>>>>>> 4d654318ccb6d37d6cefc9b859cf111ff3c96b27:1-js/05-data-types/12-json/2-serialize-event-circular/task.md

编写 `replacer` 函数，排除引用 `meetup` 的属性并将所有序列化：

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  occupiedBy: [{name: "John"}, {name: "Alice"}],
  place: room
};

*!*
// circular references
room.occupiedBy = meetup;
meetup.self = meetup;
*/!*

alert( JSON.stringify(meetup, function replacer(key, value) {
  /* your code */
}));

/* result should be:
{
  "title":"Conference",
  "occupiedBy":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
```
