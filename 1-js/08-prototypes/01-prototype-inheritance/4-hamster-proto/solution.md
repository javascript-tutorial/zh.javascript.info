我们仔细研究一下在调用 `speedy.eat("apple")` 的时候，发生了什么。

1. `speedy.eat` 方法在原型（`=hamster`）中被找到，然后执行 `this=speedy`（在点符号前面的对象）。

2. `this.stomach.push()` 需要找到 `stomach` 属性，然后对其调用 `push`。它在 `this`（`=speedy`）中查找 `stomach`，但并没有找到。

3. 然后它顺着原型链，在 `hamster` 中找到 `stomach`。

4. 然后它对 `stomach` 调用 `push`，将食物添加到 **`stomach` 的原型** 中。

因此，所有的仓鼠共享了同一个胃！

对于 `lazy.stomach.push(...)` 和 `speedy.stomach.push()` 而言，属性 `stomach` 被在原型中找到（不是在对象自身），然后向其中 `push` 了新数据。

请注意，在简单的赋值 `this.stomach=` 的情况下不会出现这种情况：

```js run
let hamster = {
  stomach: [],

  eat(food) {
*!*
    // 分配给 this.stomach 而不是 this.stomach.push
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

// 仓鼠 Speedy 找到了食物
speedy.eat("apple");
alert( speedy.stomach ); // apple

// 仓鼠 Lazy 的胃是空的
alert( lazy.stomach ); // <nothing>
```

现在，一切都运行正常，因为 `this.stomach=` 不会执行对 `stomach` 的查找。该值会被直接写入 `this` 对象。

此外，我们还可以通过确保每只仓鼠都有自己的胃来完全回避这个问题：

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

// 仓鼠 Speedy 找到了食物
speedy.eat("apple");
alert( speedy.stomach ); // apple

// 仓鼠 Lazy 的胃是空的
alert( lazy.stomach ); // <nothing>
```

作为一种常见的解决方案，所有描述特定对象状态的属性，例如上面的 `stomach`，都应该被写入该对象中。这样可以避免此类问题。
