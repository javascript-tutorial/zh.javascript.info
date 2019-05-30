我们仔细研究一下在调用 `speedy.eat("apple")` 的时候，发生了什么。

1.  `speedy.eat` 方法在原型（`=hamster`）中被发现，然后执行 `this=speedy`（在点之前的对象）。

2. `this.stomach.push()` 需要查找到 `stomach` 属性，然后调用 `push` 来处理。它在 `this` (`=speedy`) 中查找 `stomach`，但并没有找到。

3. 然后它顺着原型链，在 `hamster` 中找到 `stomach`。

4. 然后它调用 `push` ，将食物添加到**胃的原型链**中。

因此所有的仓鼠都有共享一个胃！

每次 `stomach` 从原型中获取，然后 `stomach.push` 修改它的“位置”。

请注意，这种情况在 `this.stomach=` 进行简单的赋值情况下不会发生：

```js run
let hamster = {
  stomach: [],

  eat(food) {
*!*
    // assign to this.stomach instead of this.stomach.push
    this.stomach = [food];
*/!*
  }
};

let speedy = {
   __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// Speedy one found the food
speedy.eat("apple");
alert( speedy.stomach ); // apple

// Lazy one's stomach is empty
alert( lazy.stomach ); // <nothing>
```

现在，所有的都在正常运行，因为 `this.stomach=` 不会在 `stomach` 中执行查找。该值会被直接写入 `this` 对象。

<<<<<<< HEAD:1-js/07-object-oriented-programming/03-prototype-inheritance/4-hamster-proto/solution.md
此外，我们还可以通过确保每只仓鼠都有自己的胃来完全回避这个问题：
=======
Also we can totally evade the problem by making sure that each hamster has their own stomach:
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f:1-js/08-prototypes/01-prototype-inheritance/4-hamster-proto/solution.md

```js run
let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster,
*!*
  stomach: []
*/!*
};

let lazy = {
  __proto__: hamster,
*!*
  stomach: []
*/!*
};

// Speedy one found the food
speedy.eat("apple");
alert( speedy.stomach ); // apple

// Lazy one's stomach is empty
alert( lazy.stomach ); // <nothing>
```

作为一种常见的解决方案，描述特定对象状态的所有属性，如上述的 `stomach`，通常都被写入到该对象中。这防止了类似问题的出现。
