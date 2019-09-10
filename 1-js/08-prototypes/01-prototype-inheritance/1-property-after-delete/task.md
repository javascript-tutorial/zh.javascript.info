importance: 5

---

# 与原型一起工作

如下创建一对对象的代码，然后对它们进行修改。

过程中显示了哪些值？

```js
let animal = {
  jumps: null
};
let rabbit = {
  __proto__: animal,
  jumps: true
};

alert( rabbit.jumps ); // ? (1)

delete rabbit.jumps;

alert( rabbit.jumps ); // ? (2)

delete animal.jumps;

alert( rabbit.jumps ); // ? (3)
```

应该有 3 个答案。
