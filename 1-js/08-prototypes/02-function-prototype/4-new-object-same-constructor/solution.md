如果我们确信 `"constructor"` 属性具有正确的值，那么就可以使用这种方法。

例如，如果我们不触碰默认的 `"prototype"`，那么这段代码肯定可以正常运行：

```js run
function User(name) {
  this.name = name;
}

let user = new User('John');
let user2 = new user.constructor('Pete');

alert( user2.name ); // Pete (worked!)
```

它起作用了，因为 `User.prototype.constructor == User`。

……但是如果有人，重写了 `User.prototype`，并忘记可重新创建 `constructor` 以引用 `User`，那么上面这段代码就会运行失败。

例如：

```js run
function User(name) {
  this.name = name;
}
*!*
User.prototype = {}; // (*)
*/!*

let user = new User('John');
let user2 = new user.constructor('Pete');

alert( user2.name ); // undefined
```

为什么 `user2.name` 是 `undefined`？

这是 `new user.constructor('Pete')` 的工作流程：

1. 首先，它在 `user` 中寻找 `constructor`。没找到。
2. 然后它追溯原型链。`user` 的原型是 `User.prototype`，它也没有 `constructor`（因为我们“忘记”在右侧设定它了）。
3. 再向上追溯，`User.prototype` 是一个普通对象 `{}`，其原型是 `Object.prototype`。
4. 最终，对于内建的 `Object.prototype`，有一个内建的 `Object.prototype.constructor == Object`。所以就用它了。

所以，最终我们得到了 `let user2 = new Object('Pete')`。

可能这不是我们想要的。我们想创建 `new User` 而不是 `new Object`。这就是缺少 `constructor` 的结果。

（以防你好奇，`new Object(...)` 调用会将其参数转换为对象。这是理论上的，在实际中没有人会调用 `new Object` 并传入一个值，通常我们也不会使用 `new Object` 来创建对象）。
