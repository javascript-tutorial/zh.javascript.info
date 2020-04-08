importance: 5

---

# 不按套路出牌的 instanceof

在下面的代码中，为什么 `instanceof` 会返回 `true`？我们可以明显看到，`a` 并不是通过 `B()` 创建的。

```js run
function A() {}
function B() {}

A.prototype = B.prototype = {};

let a = new A();

*!*
alert( a instanceof B ); // true
*/!*
```
