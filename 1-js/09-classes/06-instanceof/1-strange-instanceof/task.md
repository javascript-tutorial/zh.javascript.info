importance: 5

---

# 不按套路出牌的 instanceof

<<<<<<< HEAD:1-js/09-classes/06-instanceof/1-strange-instanceof/task.md
下面代码中，`instanceof` 为什么会返回 `true`？很显然，`a` 并不是通过 `B()` 创建的。
=======
In the code below, why does `instanceof` return `true`? We can easily see that `a` is not created by `B()`.
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a:1-js/09-classes/06-instanceof/1-strange-instanceof/task.md

```js run
function A() {}
function B() {}

A.prototype = B.prototype = {};

let a = new A();

*!*
alert( a instanceof B ); // true
*/!*
```
