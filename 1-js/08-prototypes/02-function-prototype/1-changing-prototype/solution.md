
答案：

1. `true`。

    `Rabbit.prototype` 的赋值操作为新对象设置了 `[[Prototype]]`，但它不影响已有的对象。

2. `false`。

    对象通过引用被赋值。来自 `Rabbit.prototype` 的对象并没有被赋值，它仍然是被 `Rabbit.prototype` 和 `rabbit` 的 `[[Prototype]]` 引用的单个对象。

    所以当我们通过一个引用更改其内容时，它对其他引用也是可见的。

3. `true`。

    所有 `delete` 操作都直接应用于对象。这里的 `delete rabbit.eats` 试图从 `rabbit` 中删除 `eats` 属性，但 `rabbit` 对象并没有 `eats` 属性。所以这个操作不会有任何影响。

4. `undefined`。

    属性 `eats` 被从 prototype 中删除，prototype 中就没有这个属性了。
