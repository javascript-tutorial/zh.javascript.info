importance: 5

---

# 计算属性数量

写一个 `count(obj)` 函数返回一个对象的属性数量：

```js
let user = {
  name: 'John',
  age: 30
};

alert( count(user) ); // 2
```

试着让代码尽可能简短。

提示：忽略 Symbol 属性，只计算「常规」属性。

