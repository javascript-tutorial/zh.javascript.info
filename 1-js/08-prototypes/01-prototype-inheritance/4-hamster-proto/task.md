importance: 5

---

# 为什么两只仓鼠都饱了？

我们有两只仓鼠：`speedy` 和 `lazy` 都继承自普通的 `hamster` 对象。 

当我们喂一只的同时，另一只也吃饱了。为什么？如何修复这件事？

```js run
let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// This one found the food
speedy.eat("apple");
alert( speedy.stomach ); // apple

// This one also has it, why? fix please.
alert( lazy.stomach ); // apple
```

