是的，看起来确实很奇怪。

`instanceof` 并不关心函数，而是关心函数的与原型链匹配的 `prototype`。

并且，这里 `a.__proto__ == B.prototype`，所以 `instanceof` 返回 `true`。

总之，根据 `instanceof` 的逻辑，真正决定类型的是 `prototype`，而不是构造函数。
