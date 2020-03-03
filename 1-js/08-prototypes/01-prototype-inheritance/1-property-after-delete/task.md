importance: 5

---

# 使用原型

下面这段代码创建了一对对象，然后对它们进行修改。

过程中会显示哪些值？

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
