importance: 5

---

# 为什么两只仓鼠都饱了？

我们有两只仓鼠：`speedy` 和 `lazy` 都继承自普通的 `hamster` 对象。 

当我们喂其中一只的时候，另一只也吃饱了。为什么？如何修复它？

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

// 这只仓鼠找到了食物
speedy.eat("apple");
alert( speedy.stomach ); // apple

// 这只仓鼠也找到了食物，为什么？请修复它。
alert( lazy.stomach ); // apple
```

