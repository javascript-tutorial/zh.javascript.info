importance: 5

---

<<<<<<< HEAD:1-js/08-prototypes/01-prototype-inheritance/4-hamster-proto/task.md
# 为什么两只仓鼠都饱了？
=======
# Why are both hamsters full?
>>>>>>> 9acc1302a14a3bbabbc9bf95d04581094bd0f1a8:1-js/08-prototypes/01-prototype-inheritance/4-hamster-proto/task.md

我们有两只仓鼠：`speedy` 和 `lazy` 都继承自普通的 `hamster` 对象。 

<<<<<<< HEAD:1-js/08-prototypes/01-prototype-inheritance/4-hamster-proto/task.md
当我们喂一只的同时，另一只也吃饱了。为什么？如何修复这件事？
=======
When we feed one of them, the other one is also full. Why? How can we fix it?
>>>>>>> 9acc1302a14a3bbabbc9bf95d04581094bd0f1a8:1-js/08-prototypes/01-prototype-inheritance/4-hamster-proto/task.md

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

