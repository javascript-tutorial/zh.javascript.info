确实挺诡异的。

`instanceof` 并不关心构造函数，它真正关心的是原型链。

这里有 `a.__proto__ == B.prototype` 成立，所以 `instanceof` 返回了 `true`。

总之，按照 `instanceof` 的逻辑，真正决定类型的是 `prototype`，而不是构造函数。
