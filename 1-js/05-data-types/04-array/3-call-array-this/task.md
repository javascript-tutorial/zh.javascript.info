importance: 5

---

# 在数组上下文调用

结果是什么？为什么？

```js
let arr = ["a", "b"];

arr.push(function() {
  alert( this );
});

arr[2](); // ?
```
