importance: 5

---

# 在对象字面量中使用 "this"

这里 `makeUser` 函数返回了一个对象。

访问 `ref` 的结果是什么？为什么？

```js
function makeUser() {
  return {
    name: "John",
    ref: this
  };
}

let user = makeUser();

alert( user.ref.name ); // 结果是什么？
```
