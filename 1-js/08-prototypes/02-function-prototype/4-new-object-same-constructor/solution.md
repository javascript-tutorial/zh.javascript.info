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
2. 然后它追溯原型链。`user` 的原型是 `User.prototype`，它也什么都没有。
3. `User.prototype` 的值是一个普通对象 `{}`，该对象的原型是 `Object.prototype`。并且 `Object.prototype.constructor == Object`。所以就用它了。

最后，我们有 `let user2 = new Object('Pete')`。内建的 `Object` 构造函数会忽略参数，它总是创建一个类似于 `let user2 = {}` 的空对象，这就是最后我们在 `user2` 中拥有的东西。
