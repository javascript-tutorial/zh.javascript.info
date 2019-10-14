importance: 5

---

# 计算属性数量

写一个可以返回对象的属性数量的函数 count(obj) ：

```js
let user = {
  name: 'John',
  age: 30
};

alert( count(user) ); // 2
```

试着让代码尽可能简短。

提示：忽略 Symbol 属性，只计算「常规」属性。

