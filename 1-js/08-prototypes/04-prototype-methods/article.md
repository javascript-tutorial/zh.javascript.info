
<<<<<<< HEAD:1-js/07-object-oriented-programming/06-prototype-methods/article.md
# 原型方法

本章节我们会讨论原型（prototype）的附加方法。

获取/设置原型的方式有很多，我们已知的有：
=======
# Prototype methods, objects without __proto__

In the first chapter of this section, we mentioned that there are modern methods to setup a prototype.

The `__proto__` is considered outdated and somewhat deprecated (in browser-only part of the Javascript standard).

The modern methods are:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:1-js/08-prototypes/04-prototype-methods/article.md

- [Object.create(proto[, descriptors])](mdn:js/Object/create) —— 利用 `proto` 作为 `[[Prototype]]` 和可选的属性描述来创建一个空对象。
- [Object.getPrototypeOf(obj)](mdn:js/Object/getPrototypeOf) —— 返回 `obj` 对象的 `[[Prototype]]`。
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object/setPrototypeOf) —— 将 `obj` 对象的 `[[Prototype]]` 设置为 `proto`。

<<<<<<< HEAD:1-js/07-object-oriented-programming/06-prototype-methods/article.md
举个例子：
=======
These should be used instead of `__proto__`.

For instance:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:1-js/08-prototypes/04-prototype-methods/article.md

```js run
let animal = {
  eats: true
};

// 以 animal 为原型创建一个新对象
*!*
let rabbit = Object.create(animal);
*/!*

alert(rabbit.eats); // true
*!*
alert(Object.getPrototypeOf(rabbit) === animal); // 获取 rabbit 的原型
*/!*

*!*
Object.setPrototypeOf(rabbit, {}); // 将 rabbit 的原型更改为 {}
*/!*
```

`Object.create` 有一个可选的第二参数：属性描述。我们可以给新对象提供额外的属性，就像这样：

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

参数的格式同 <info:property-descriptors> 章节中讨论的相同。

我们可以利用 `Object.create` 来实现比 `for..in` 循环赋值属性方式更强大的对象复制功能：

```js
// obj 对象的浅复制
let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
```

这样实现了 `obj` 的完整复制，包含了所有属性：可枚举的和不可枚举的，数据属性以及 seeters/getters —— 所有属性，以及正确的 `[[Prototype]]`。

# 原型简史

如果我们计算有多少种方式来管理 `[[Prototype]]`，答案是很多！很多种方式！

为什么会出现这样的情况？

这里有历史遗留问题。

- 在上古时代 `prototype` 作为一个构造函数的属性来运行。
- 之后在 2012 年： `Object.create` 出现在标准中。它允许利用给定的原型来创建对象，但是不能 get/set 原型。因此许多浏览器厂商实现了非标准属性  `__proto__`，允许任何时候 get/set 原型。
- 之后在 2015 年： `Object.setPrototypeOf` 和 `Object.getPrototypeOf` 被加入到标准中。 `__proto__` 在几乎所有地方都得到实现，因此它成了标准以外的替代方案 B，在非浏览器环境下，它的支持性是不确定的，可选的。

目前为止，我们拥有了所有这些方式。

<<<<<<< HEAD:1-js/07-object-oriented-programming/06-prototype-methods/article.md
从技术上来讲，我们可以在任何时候 get/set `[[Prototype]]`。但是通常我们只在创建对象的时候设置它一次，自那之后不再修改：`rabbit` 继承自 `animal`，之后不再改变。对此 JavaScript 引擎做了高度的优化。运行中利用 `Object.setPrototypeOf` 或者 `obj.__proto__=` 来更改 prototype 是一个非常缓慢的操作。但是，这是可行的。
=======
Why `__proto__` was replaced by the functions? That's an interesting question, requiring us to understand why `__proto__` is bad. Read on to get the answer.

```warn header="Don't reset `[[Prototype]]` unless the speed doesn't matter"
Technically, we can get/set `[[Prototype]]` at any time. But usually we only set it once at the object creation time, and then do not modify: `rabbit` inherits from `animal`, and that is not going to change.

And JavaScript engines are highly optimized to that. Changing a prototype "on-the-fly" with `Object.setPrototypeOf` or `obj.__proto__=` is a very slow operation, it breaks internal optimizations for object property access operations. So evade it unless you know what you're doing, or Javascript speed totally doesn't matter for you.
```
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:1-js/08-prototypes/04-prototype-methods/article.md

## 「极简」对象

我们知道，对象可以当做关联数组来存储键值对。

...但是如果我们尝试存储**用户提供的**键（比如说：一个用户输入的字典），我们可以发现一个有趣的错误：所有的键都运行正常，除了 `"__proto__"`。

看一下这个例子：

```js run
let obj = {};

let key = prompt("What's the key?", "__proto__");
obj[key] = "some value";

alert(obj[key]); // [object Object]，而不是 "some value"！
```

这里如果用户输入 `__proto__`，那么赋值将会被忽略！

我们不应该感到惊讶。`__proto__` 属性很特别：它必须是对象或者 `null` 值，字符串不能成为 prototype。

<<<<<<< HEAD:1-js/07-object-oriented-programming/06-prototype-methods/article.md
但是我们并不想实现这样的行为，对吗？我们想要存储键值对，然而键名为 `"__proto__"` 没有被正确存储。所以这是一个错误。在这里，结果并没有很严重。但是在其他用例中，prototype 可能被改变，因此可能导致完全意想不到的结果。
=======
But we didn't *intend* to implement such behavior, right? We want to store key/value pairs, and the key named `"__proto__"` was not properly saved. So that's a bug!

Here the consequences are not terrible. But in other cases the prototype may indeed be changed, so the execution may go wrong in totally unexpected ways.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:1-js/08-prototypes/04-prototype-methods/article.md

最可怕的是 —— 通常开发者完全不会考虑到这一点。这让类似的 bug 很难被发现，甚至使得它们容易遭到攻击，特别是当 JavaScript 被用在服务端的时候。

<<<<<<< HEAD:1-js/07-object-oriented-programming/06-prototype-methods/article.md
这样的情况只出现在 `__proto__` 上，所有其他的属性都是正常被「赋值」。
=======
Unexpected things also may happen when accessing `toString` property -- that's a function by default, and other built-in properties.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:1-js/08-prototypes/04-prototype-methods/article.md

怎么样避免这个错误呢？

首先，我们可以改用 `Map`，那么一切都迎刃而解。

但是 `Object` 同样可以运行得很好，因为语言制造者很早以前就注意到这一点。

`__proto__` 根本不是一个对象的属性，只是 `Object.prototype` 的访问属性：

![](object-prototype-2.png)

<<<<<<< HEAD:1-js/07-object-oriented-programming/06-prototype-methods/article.md
因此，如果 `obj.__proto__` 被读取或者赋值，那么对应的 getter/setter 从它的原型被调用，它会获取/设置 `[[Prototype]]`。

就像开头所说：`__proto__` 是访问 `[[Prototype]]` 的方式，而不是 `[[prototype]]` 本身。
=======
So, if `obj.__proto__` is read or set, the corresponding getter/setter is called from its prototype, and it gets/sets `[[Prototype]]`.

As it was said in the beginning of this tutorial section: `__proto__` is a way to access `[[Prototype]]`, it is not `[[Prototype]]` itself.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:1-js/08-prototypes/04-prototype-methods/article.md

现在，我们想要使用一个对象作为关联数组，我们可以用一个小技巧：

```js run
*!*
let obj = Object.create(null);
*/!*

let key = prompt("What's the key?", "__proto__");
obj[key] = "some value";

alert(obj[key]); // "some value"
```

`Object.create(null)` 创建了一个空对象，这个对象没有原型（`[[Prototype]]` 是 `null`）：

![](object-prototype-null.png)

因此，它没有继承 `__proto__` 的 getter/setter 方法。现在它像正常的数据属性一样运行，因此以上的例子运行正确。

我们可以叫这样的对象「极简」或者「纯字典对象」，因此它们甚至比通常的简单对象 `{...}` 还要简单。

这样的对象有一个缺点是缺少内置的对象方法，比如说 `toString`：

```js run
*!*
let obj = Object.create(null);
*/!*

alert(obj); // Error （没有 toString 方法）
```

...但是它们通常对关联数组而言还是很友好。

请注意，和对象关系最密切的方法是 `Object.something(...)`，比如 `Object.keys(obj)` —— 它们不在 prototype 中，因此在极简对象中它们还是可以继续使用：


```js run
let chineseDictionary = Object.create(null);
chineseDictionary.hello = "你好";
chineseDictionary.bye = "再见";

alert(Object.keys(chineseDictionary)); // hello,bye
```

<<<<<<< HEAD:1-js/07-object-oriented-programming/06-prototype-methods/article.md
## 获取所有属性

获取一个对象的键/值有很多种方法。

我们已知的有：

- [Object.keys(obj)](mdn:js/Object/keys) / [Object.values(obj)](mdn:js/Object/values) / [Object.entries(obj)](mdn:js/Object/entries) -- 返回一个数组，包含所有可枚举字符串属性名称/值/键值对。这些方法只会列出**可枚举**属性，而且它们**键名为字符串形式**。

如果我们想要 symbol 属性：

- [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) —— 返回包含所有 symbol 属性名称的数组。

如果我们想要非可枚举属性：

- [Object.getOwnPropertyNames(obj)](mdn:js/Object/getOwnPropertyNames) —— 返回包含所有字符串属性名的数组。

如果我们想要**所有**属性：

- [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) —— 返回包含所有属性名称的数组。

这些方法和它们返回的属性有些不同，但它们都是对对象本身进行操作。prototype 的属性没有包含在内。

`for...in` 循环有所不同：它会对继承得来的属性也进行循环。

举个例子：

```js run
let animal = {
  eats: true
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

*!*
// 这里只有自身的键
alert(Object.keys(rabbit)); // jumps
*/!*

*!*
// 这里包含了继承得来的键
for(let prop in rabbit) alert(prop); // jumps，然后 eats
*/!*
```

如果我们想要区分继承属性，有一个内置方法 [obj.hasOwnProperty(key)](mdn:js/Object/hasOwnProperty)：如果 `obj` 有名为 `key` 的自身属性（而非继承），返回值为 `true`。

因此我们可以找出继承属性（或者对它们进行一些操作）：
=======
## Summary

Modern methods to setup and directly access the prototype are:

- [Object.create(proto[, descriptors])](mdn:js/Object/create) -- creates an empty object with given `proto` as `[[Prototype]]` (can be `null`) and optional property descriptors.
- [Object.getPrototypeOf(obj)](mdn:js/Object.getPrototypeOf) -- returns the `[[Prototype]]` of `obj` (same as `__proto__` getter).
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object.setPrototypeOf) -- sets the `[[Prototype]]` of `obj` to `proto` (same as `__proto__` setter).

The built-in `__proto__` getter/setter is unsafe if we'd want to put user-generated keys in to an object. Just because a user may enter "__proto__" as the key, and there'll be an error with hopefully easy, but generally unpredictable consequences.

So we can either use `Object.create(null)` to create a "very plain" object without `__proto__`, or stick to `Map` objects for that.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:1-js/08-prototypes/04-prototype-methods/article.md

Also, `Object.create` provides an easy way to shallow-copy an object with all descriptors:

```js
let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
```
<<<<<<< HEAD:1-js/07-object-oriented-programming/06-prototype-methods/article.md
这个例子中我们有以下继承链：`rabbit`，然后 `animal`，然后 `Object.prototype` （因为 `animal` 是个字面量对象 `{...}`，因此默认是这样），然后最终到达 `null`：

![](rabbit-animal-object.png)

请注意：这里有一个有趣的现象。`rabbit.hasOwnProperty` 这个方法来自哪里？观察继承链我们发现这个方法由 `Object.prototype.hasOwnProperty` 提供。换句话说，它是继承得来的。

...但是如果说 `for...in` 列出了所有继承属性，为什么 `hasOwnProperty` 这个方法没有出现在其中？答案很简单：它是不可枚举的。就像所有其他在 `Object.prototype` 中的属性一样。这是为什么它们没有被列出的原因。

## 小结

以下是我们在本章节讨论的方法 —— 作为一个总结：

- [Object.create(proto[, descriptors])](mdn:js/Object/create) —— 利用给定的 `proto` 作为 `[[Prototype]]` 来创建一个空对象。
- [Object.getPrototypeOf(obj)](mdn:js/Object.getPrototypeOf) —— 返回 `obj` 的 `[[Prototype]]`（和 `__proto__` getter 相同）。
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object.setPrototypeOf) —— 将 `obj` 的 `[[Prototype]]` 设置为 `proto`（和 `__proto__` setter 相同）。
- [Object.keys(obj)](mdn:js/Object/keys) / [Object.values(obj)](mdn:js/Object/values) / [Object.entries(obj)](mdn:js/Object/entries) —— 返回包含自身属性的名称/值/键值对的数组。
- [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) —— 返回包含所有自身 symbol 属性名称的数组。
- [Object.getOwnPropertyNames(obj)](mdn:js/Object/getOwnPropertyNames) —— 返回包含所有自身字符串属性名称的数组。
- [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) —— 返回包含所有自身属性名称的数组。
- [obj.hasOwnProperty(key)](mdn:js/Object/hasOwnProperty)：如果 `obj` 拥有名为 `key` 的自身属性（非继承得来），返回 `true`。
=======


- [Object.keys(obj)](mdn:js/Object/keys) / [Object.values(obj)](mdn:js/Object/values) / [Object.entries(obj)](mdn:js/Object/entries) -- returns an array of enumerable own string property names/values/key-value pairs.
- [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) -- returns an array of all own symbolic property names.
- [Object.getOwnPropertyNames(obj)](mdn:js/Object/getOwnPropertyNames) -- returns an array of all own string property names.
- [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) -- returns an array of all own property names.
- [obj.hasOwnProperty(key)](mdn:js/Object/hasOwnProperty): it returns `true` if `obj` has its own (not inherited) property named `key`.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:1-js/08-prototypes/04-prototype-methods/article.md

同时我们还明确了 `__proto__` 是 `[[Prototype]]` 的 getter/setter，位置在 `Object.prototype`，和其他方法相同。

我们可以不借助 prototype 创建一个对象，那就是 `Object.create(null)`。这些对象被用作是「纯字典」，对于它们而言 `"__proto__"` 作为键没有问题。

所有返回对象属性的方法（如 `Object.keys` 以及其他）—— 都返回「自身」属性。如果我们想继承它们，我们可以使用 `for...in`。
