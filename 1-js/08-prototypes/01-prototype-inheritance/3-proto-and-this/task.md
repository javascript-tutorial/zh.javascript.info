importance: 5

---

# 写在哪里？

`rabbit` 继承自 `animal`。

如果我们调用 `rabbit.eat()`，哪一个对象会接收到 `full` 属性：`animal` 还是 `rabbit`？ 

```js
let animal = {
  eat() {
    this.full = true;
  }
};

let rabbit = {
  __proto__: animal
};

rabbit.eat();
```
