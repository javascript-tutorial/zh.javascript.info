
# 原型方法，没有 __proto__ 的对象

在这部分内容的第一章中，我们提到了设置原型的现代方法。

使用 `obj.__proto__` 设置或读取原型被认为已经过时且不推荐使用（deprecated）了（已经被移至 JavaScript 规范的附录 B，意味着仅适用于浏览器）。

现代的获取/设置原形的方法有：

- [Object.getPrototypeOf(obj)](mdn:js/Object/getPrototypeOf) —— 返回对象 `obj` 的 `[[Prototype]]`。
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object/setPrototypeOf) —— 将对象 `obj` 的 `[[Prototype]]` 设置为 `proto`。

`__proto__` 不被反对的唯一的用法是在创建新对象时，将其用作属性：`{ __proto__: ... }`。

虽然，也有一种特殊的方法：

- [Object.create(proto, [descriptors])](mdn:js/Object/create) —— 利用给定的 `proto` 作为 `[[Prototype]]` 和可选的属性描述来创建一个空对象。

例如：

```js run
let animal = {
  eats: true
};

// 创建一个以 animal 为原型的新对象
*!*
let rabbit = Object.create(animal); // 与 {__proto__: animal} 相同
*/!*

alert(rabbit.eats); // true

*!*
alert(Object.getPrototypeOf(rabbit) === animal); // true
*/!*

*!*
Object.setPrototypeOf(rabbit, {}); // 将 rabbit 的原型修改为 {}
*/!*
```

`Object.create` 方法更强大，因为它有一个可选的第二参数：属性描述器。

我们可以在此处为新对象提供额外的属性，就像这样：

```js run
let animal = {
  eats: true
};

let rabbit = Object.create(animal, {
  jumps: {
    value: true
  }
});

alert(rabbit.jumps); // true
```

描述器的格式与 <info:property-descriptors> 一章中所讲的一样。

我们可以使用 `Object.create` 来实现比复制 `for..in` 循环中的属性更强大的对象克隆方式：

```js
let clone = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
);
```

此调用可以对 `obj` 进行真正准确地拷贝，包括所有的属性：可枚举和不可枚举的，数据属性和 setters/getters —— 包括所有内容，并带有正确的 `[[Prototype]]`。

## 原型简史

有这么多可以处理 `[[Prototype]]` 的方式。发生了什么？为什么会这样？

这是历史原因。

原型继承从一开始就存在于语言中，但管理它的方式随着时间的推移而演变。

- 构造函数的 `"prototype"` 属性自古以来就起作用。这是使用给定原型创建对象的最古老的方式。
- 之后，在 2012 年，`Object.create` 出现在标准中。它提供了使用给定原型创建对象的能力。但没有提供 get/set 它的能力。一些浏览器实现了非标准的 `__proto__` 访问器，以为开发者提供更多的灵活性。
- 之后，在 2015 年，`Object.setPrototypeOf` 和 `Object.getPrototypeOf` 被加入到标准中，执行与 `__proto__` 相同的功能。由于 `__proto__` 实际上已经在所有地方都得到了实现，但它已过时，所以被加入到该标准的附件 B 中，即：在非浏览器环境下，它的支持是可选的。
- 之后，在 2022 年，官方允许在对象字面量 `{...}` 中使用 `__proto__`（从附录 B 中移出来了），但不能用作 getter/setter `obj.__proto__`（仍在附录 B 中）。

为什么要用函数 `getPrototypeOf/setPrototypeOf` 取代 `__proto__`？

为什么 `__proto__` 被部分认可并允许在 `{...}` 中使用，但仍不能用作 getter/setter？

这是一个有趣的问题，需要我们理解为什么 `__proto__` 不好。

很快我们就会看到答案。

```warn header="如果速度很重要，就请不要修改已存在的对象的 `[[Prototype]]`"
从技术上来讲，我们可以在任何时候 get/set `[[Prototype]]`。但是通常我们只在创建对象的时候设置它一次，自那之后不再修改：`rabbit` 继承自 `animal`，之后不再更改。

并且，JavaScript 引擎对此进行了高度优化。用 `Object.setPrototypeOf` 或 `obj.__proto__=` “即时”更改原型是一个非常缓慢的操作，因为它破坏了对象属性访问操作的内部优化。因此，除非你知道自己在做什么，或者 JavaScript 的执行速度对你来说完全不重要，否则请避免使用它。
```

## "Very plain" objects [#very-plain]

我们知道，对象可以用作关联数组（associative arrays）来存储键/值对。

……但是如果我们尝试在其中存储 **用户提供的** 键（例如：一个用户输入的字典），我们可以发现一个有趣的小故障：所有的键都正常工作，除了 `"__proto__"`。

看一下这个例子：

```js run
let obj = {};

let key = prompt("What's the key?", "__proto__");
obj[key] = "some value";

alert(obj[key]); // [object Object]，并不是 "some value"！
```

这里如果用户输入 `__proto__`，那么在第四行的赋值会被忽略！

对于非开发者来说，这肯定很令人惊讶，但对我们来说却是可以理解的。`__proto__` 属性很特殊：它必须是一个对象或者 `null`。字符串不能成为原形。这就是为什么将字符串赋值给 `__proto__` 会被忽略。

但我们不是 **打算** 实现这种行为，对吧？我们想要存储键值对，然而键名为 `"__proto__"` 的键值对没有被正确存储。所以这是一个 bug。

这里的后果并没有很严重。但在其他情况下，我们可能会在 `obj` 中存储对象而不是字符串，则原形确实会被改变。结果，执行将以完全意想不到的方式出错。

最可怕的是 —— 通常开发者完全不会考虑到这一点。这让此类 bug 很难被发现，甚至变成漏洞，尤其是在 JavaScript 被用在服务端的时候。

对 `obj.toString` 进行赋值时也可能发生意想不到的事情，因为它是一个内建的对象方法。

我们怎么避免这样的问题呢？

首先，我们可以改用 `Map` 来代替普通对象进行存储，这样一切都迎刃而解：

```js run
let map = new Map();

let key = prompt("What's the key?", "__proto__");
map.set(key, "some value");

alert(map.get(key)); // "some value"（符合预期）
```

……但 `Object` 语法通常更吸引人，因为它更简洁。

幸运的是，我们 **可以** 使用对象，因为 JavaScript 语言的制造者很久以前就考虑过这个问题。

正如我们所知道的，`__proto__` 不是对象的属性，而是 `Object.prototype` 的访问器属性：

![](object-prototype-2.svg)

因此，如果 `obj.__proto__` 被读取或者赋值，那么对应的 getter/setter 会被从它的原型中调用，它会 set/get `[[Prototype]]`。

就像在本部分教程的开头所说的那样：`__proto__` 是一种访问 `[[Prototype]]` 的方式，而不是 `[[prototype]]` 本身。

现在，我们想要将一个对象用作关联数组，并且摆脱此类问题，我们可以使用一些小技巧：

```js run
*!*
let obj = Object.create(null);
// 或者：obj = { __proto__: null }
*/!*

let key = prompt("What's the key?", "__proto__");
obj[key] = "some value";

alert(obj[key]); // "some value"
```

`Object.create(null)` 创建了一个空对象，这个对象没有原型（`[[Prototype]]` 是 `null`）：

![](object-prototype-null.svg)

因此，它没有继承 `__proto__` 的 getter/setter 方法。现在，它被作为正常的数据属性进行处理，因此上面的这个示例能够正常工作。

我们可以把这样的对象称为 "very plain" 或 "pure dictionary" 对象，因为它们甚至比通常的普通对象（plain object）`{...}` 还要简单。

缺点是这样的对象没有任何内建的对象的方法，例如 `toString`：

```js run
*!*
let obj = Object.create(null);
*/!*

alert(obj); // Error (no toString)
```

……但是它们通常对关联数组而言还是很友好。

请注意，大多数与对象相关的方法都是 `Object.something(...)`，例如 `Object.keys(obj)` —— 它们不在 prototype 中，因此在 "very plain" 对象中它们还是可以继续使用：


```js run
let chineseDictionary = Object.create(null);
chineseDictionary.hello = "你好";
chineseDictionary.bye = "再见";

alert(Object.keys(chineseDictionary)); // hello,bye
```

## 总结

- 要使用给定的原型创建对象，使用：

    - 字面量语法：`{ __proto__: ... }`，允许指定多个属性
    - 或 [Object.create(proto, [descriptors])](mdn:js/Object/create)，允许指定属性描述符。

    `Object.create` 提供了一种简单的方式来浅拷贝对象及其所有属性描述符（descriptors）。

    ```js
    let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
    ```

- 设置和访问原型的现代方法有：

  - [Object.getPrototypeOf(obj)](mdn:js/Object/getPrototypeOf) —— 返回对象 `obj` 的 `[[Prototype]]`（与 `__proto__` 的 getter 相同）。
  - [Object.setPrototypeOf(obj, proto)](mdn:js/Object/setPrototypeOf) —— 将对象 `obj` 的 `[[Prototype]]` 设置为 `proto`（与 `__proto__` 的 setter 相同）。

- 不推荐使用内建的的 `__proto__` getter/setter 获取/设置原型，它现在在 ECMA 规范的附录 B 中。

- 我们还介绍了使用 `Object.create(null)` 或 `{__proto__: null}` 创建的无原型的对象。

    这些对象被用作字典，以存储任意（可能是用户生成的）键。

    通常，对象会从 `Object.prototype` 继承内建的方法和 `__proto__` getter/setter，会占用相应的键，且可能会导致副作用。原型为 `null` 时，对象才真正是空的。
