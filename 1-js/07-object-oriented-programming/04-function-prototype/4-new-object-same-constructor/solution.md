如果我们确信 `"constructor"` 属性具有正确的值，我们可以使用这种方法。

例如，如果我们不访问默认的 `"prototype"`，那么这段代码肯定会起作用：

```js run
function User(name) {
  this.name = name;
}

let user = new User('John');
let user2 = new user.constructor('Pete');

alert( user2.name ); // Pete (worked!)
```

它起作用了，因为 `User.prototype.constructor == User`。

...但是如果有人说，覆盖 `User.prototype` 并忘记重新创建 `"constructor"`，那么它就会失败。

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

 `new user.constructor('Pete')` 的工作原理是：

1. 首先，它在 `user` 中寻找 `constructor`。什么也没有。
2. 然后它追溯原型链。`user` 的原型是 `User.prototype`，它也什么都没有。
3. `User.prototype` 的值是一个普通对象 `{}`，其原型是 `Object.prototype`。还有 `Object.prototype.constructor == Object`。所以就用它了。

最后，我们有 `let user2 = new Object（'Pete'）`。内置的 `Object` 构造函数忽略参数，它总是创建一个空对象 —— 这就是我们在 `user2` 中所拥有的东西。