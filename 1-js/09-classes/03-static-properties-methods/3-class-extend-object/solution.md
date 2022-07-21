首先，让我们看看为什么之前的代码无法运行。

如果我们尝试运行它，就会发现原因其实很明显。派生类的 constructor 必须调用 `super()`。否则 `"this"` 不会被定义。

下面是修复后的代码：

```js run
class Rabbit extends Object {
  constructor(name) {
*!*
    super(); // 需要在继承时调用父类的 constructor
*/!*
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

alert( rabbit.hasOwnProperty('name') ); // true
```

但这还不是全部原因。

即便修复了它，`"class Rabbit extends Object"` 和 `class Rabbit` 之间仍存在着一个重要的差异。

我们知道，"extends" 语法会设置两个原型：

1. 在构造函数的 `"prototype"` 之间设置原型（为了获取实例方法）。
2. 在构造函数之间会设置原型（为了获取静态方法）。

在 `class Rabbit extends Object` 的例子中，意味着：

```js run
class Rabbit extends Object {}

alert( Rabbit.prototype.__proto__ === Object.prototype ); // (1) true
alert( Rabbit.__proto__ === Object ); // (2) true
```

所以，现在 `Rabbit` 可以通过 `Rabbit` 访问 `Object` 的静态方法，像这样：

```js run
class Rabbit extends Object {}

*!*
// 通常我们调用 Object.getOwnPropertyNames
alert ( Rabbit.getOwnPropertyNames({a: 1, b: 2})); // a,b
*/!*
```

但是如果我们没有 `extends Object`，那么 `Rabbit.__proto__` 将不会被设置为 `Object`。

下面是示例：

```js run
class Rabbit {}

alert( Rabbit.prototype.__proto__ === Object.prototype ); // (1) true
alert( Rabbit.__proto__ === Object ); // (2) false (!)
alert( Rabbit.__proto__ === Function.prototype ); // true，所有函数都是默认如此

*!*
// error，Rabbit 中没有这样的函数
alert ( Rabbit.getOwnPropertyNames({a: 1, b: 2})); // Error
*/!*
```

所以，在这种情况下，`Rabbit` 没有提供对 `Object` 的静态方法的访问。

顺便说一下，`Function.prototype` 也有一些“通用”函数方法，例如 `call` 和 `bind` 等。在上述的两种情况下它们都是可用的，因为对于内建的 `Object` 构造函数而言，`Object.__proto__ === Function.prototype`。

我们用一张图来解释：

![](rabbit-extends-object.svg)


所以，简而言之，这里有两点区别：

| class Rabbit | class Rabbit extends Object  |
|--------------|------------------------------|
| --             | 需要在 constructor 中调用 `super()` |
| `Rabbit.__proto__ === Function.prototype` | `Rabbit.__proto__ === Object` |
