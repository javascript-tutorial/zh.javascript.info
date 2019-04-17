
# 属性的标志和描述符

我们知道，对象可以存储属性。

<<<<<<< HEAD:1-js/07-object-oriented-programming/01-property-descriptors/article.md
到目前为止，属性对我们来说是一个简单的“键-值”对。但对象属性实际上是更复杂可变的东西。
=======
Till now, a property was a simple "key-value" pair to us. But an object property is actually a more flexible and powerful thing.

In this chapter we'll study additional configuration options, and in the next we'll see how to invisibly turn them into getter/setter functions.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:1-js/07-object-properties/01-property-descriptors/article.md

## 属性的标志

对象属性除 **`value`** 外还有三个特殊属性（所谓的“标志”）：

- **`writable`** — 如果为 `true`，则可以修改，否则它是只读的。
- **`enumerable`** — 如果是 `true`，则可在循环中列出，否则不列出。
- **`configurable`** — 如果是 `true`，则此属性可以被删除，相应的特性也可以被修改，否则不可以。

我们还没看到它们，是因为它们通常不会出现当我们用“常用的方式”创建一个属性时，它们都是 `true`。但我们也可以随时更改它们。

首先，让我们看看如何获得这些标志。

[Object.getOwnPropertyDescriptor](mdn:js/Object/getOwnPropertyDescriptor) 方法允许查询有关属性的**完整**信息。

语法是：
```js
let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
```

`obj`
: 需要获取信息的对象。

`propertyName`
: 属性的名称。

返回值是一个所谓的“属性描述符”对象：它包含值和所有的标志。

例如：

```js run
let user = {
  name: "John"
};

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/* property descriptor:
{
  "value": "John",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/
```

为了修改标志，我们可以使用 [Object.defineProperty](mdn:js/Object/defineProperty)。

语法是：

```js
Object.defineProperty(obj, propertyName, descriptor)
```

`obj`，`propertyName`
: 要处理的对象和属性。

`descriptor`
: 要应用的属性描述符。

如果该属性存在，则 `defineProperty` 更新其标志。否则，它会创建具有给定值和标志的属性；在这种情况下，如果没有提供标志，则会假定它是 `false`。

这里使用所有的伪造标志创建一个属性 `name`：

```js run
let user = {};

*!*
Object.defineProperty(user, "name", {
  value: "John"
});
*/!*

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": "John",
*!*
  "writable": false,
  "enumerable": false,
  "configurable": false
*/!*
}
 */
```

将它与上面的“以常用方式创建的” `user.name` 进行比较：现在所有标志都是假定的。如果这不是我们想要的，那么我们最好在 `descriptor` 中将它们设置为 `true`。

现在让我们通过示例来看看标志的效果。

## 只读

我们通过修改 `writable` 标志来把 `user.name` 设置为只读：

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
*!*
  writable: false
*/!*
});

*!*
user.name = "Pete"; // 错误：不能设置只读属性'name'...
*/!*
```

<<<<<<< HEAD:1-js/07-object-oriented-programming/01-property-descriptors/article.md
现在没有人可以改变我们的用户名称，除非他用自己的 `defineProperty` 来覆盖我们的用户。
=======
Now no one can change the name of our user, unless they apply their own `defineProperty` to override ours.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:1-js/07-object-properties/01-property-descriptors/article.md

以下是相同的操作，但针对的是属性不存在的情况：

```js run
let user = { };

Object.defineProperty(user, "name", {
*!*
  value: "Pete",
  // 对于新的属性，需要明确的列出哪些为 true
  enumerable: true,
  configurable: true
*/!*
});

alert(user.name); // Pete
user.name = "Alice"; // Error
```


## 不可枚举

现在让我们向 `user` 添加一个自定义的 `toString`。

通常，对象的内置 `toString` 是不可枚举的，它不会显示在 `for..in` 中。但是如果我们添加我们自己的 `toString`，那么默认情况下它将显示在 `for..in` 中，如下所示：

```js run
let user = {
  name: "John",
  toString() {
    return this.name;
  }
};

// 默认情况下，我们的两个属性都会列出：
for (let key in user) alert(key); // name, toString
```

如果我们不喜欢它，那么我们可以设置 `enumerable:false`。然后它不会出现在 `for..in` 循环中，就像内置循环一样：

```js run
let user = {
  name: "John",
  toString() {
    return this.name;
  }
};

Object.defineProperty(user, "toString", {
*!*
  enumerable: false
*/!*
});

*!*
// 现在 toString 消失了：
*/!*
for (let key in user) alert(key); // name
```

不可枚举的属性也会从 `Object.keys` 中排除：

```js
alert(Object.keys(user)); // name
```

## 不可配置

不可配置标志（`configurable:false`）有时会预设在内置对象和属性中。

一个不可配置的属性不能被 `defineProperty` 删除或修改。

<<<<<<< HEAD:1-js/07-object-oriented-programming/01-property-descriptors/article.md
例如，`Math.PI` 是只读的、不可枚举和不可配置的：
=======
For instance, `Math.PI` is read-only, non-enumerable and non-configurable:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:1-js/07-object-properties/01-property-descriptors/article.md

```js run
let descriptor = Object.getOwnPropertyDescriptor(Math, 'PI');

alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": 3.141592653589793,
  "writable": false,
  "enumerable": false,
  "configurable": false
}
*/
```
因此，开发人员无法改变 `Math.PI` 的值或覆盖它。

```js run
Math.PI = 3; // 错误

// 删除 Math.PI 也不会起作用
```

使属性不可配置是一条单行道。我们不能把它改回去，因为 `defineProperty` 不适用于不可配置的属性。

在这里，我们将 user.name 设置为“永久封闭”的常量：

```js run
let user = { };

Object.defineProperty(user, "name", {
  value: "John",
  writable: false,
  configurable: false
});

*!*
// 不能修改 user.name 或 它的标志
// 下面的所有操作都不起作用：
//   user.name = "Pete"
//   delete user.name
//   defineProperty(user, "name", ...)
Object.defineProperty(user, "name", {writable: true}); // 错误
*/!*
```

```smart header="只在使用严格模式时才会出现错误"
在非严格模式下，写入只读属性等时不会发生错误。但操作仍然不会成功。非严格模式下违反标志的行为只是默默地被忽略。
```

## Object.defineProperties

有一个方法 [Object.defineProperties(obj, descriptors)](mdn:js/Object/defineProperties)，允许一次定义多个属性。

语法是：

```js
Object.defineProperties(obj, {
  prop1: descriptor1,
  prop2: descriptor2
  // ...
});
```

例如：

```js
Object.defineProperties(user, {
  name: { value: "John", writable: false },
  surname: { value: "Smith", writable: false },
  // ...
});
```

因此，我们可以一次性设置多个属性。

## Object.getOwnPropertyDescriptors

要一次获取所有属性描述符，我们可以使用 [Object.getOwnPropertyDescriptors(obj)](mdn:js/Object/getOwnPropertyDescriptors) 方法。

与 `Object.defineProperties` 一起，它可以用作克隆对象的“标志感知”方式：

```js
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
```

通常，当我们克隆一个对象时，我们使用赋值的方式来复制属性，如下所示：

```js
for (let key in user) {
  clone[key] = user[key]
}
```

...但是，这并不能复制标志。所以如果我们想要一个“更好”的克隆，那么 `Object.defineProperties` 是首选。

另一个区别是 `for..in` 忽略了 symbolic 属性，但是 `Object.getOwnPropertyDescriptors` 返回包含 symbolic 属性在内的**所有**属性描述符。

## 设定一个全局的封闭对象

属性描述符可以在各个属性的级别上工作。

还有一些限制访问**整个**对象的方法：

[Object.preventExtensions(obj)](mdn:js/Object/preventExtensions)
: 禁止向对象添加属性。

[Object.seal(obj)](mdn:js/Object/seal)
: 禁止添加/删除属性，为所有现有的属性设置 `configurable: false`。

[Object.freeze(obj)](mdn:js/Object/freeze)
: 禁止添加/删除/更改属性，为所有现有属性设置 `configurable: false, writable: false`。

还有对他们的测试：

[Object.isExtensible(obj)](mdn:js/Object/isExtensible)
: 如果添加属性被禁止，则返回 `false`，否则返回 `true`。

[Object.isSealed(obj)](mdn:js/Object/isSealed)
: 如果禁止添加/删除属性，则返回 `true`，并且所有现有属性都具有 `configurable: false`。

[Object.isFrozen(obj)](mdn:js/Object/isFrozen)
: 如果禁止添加/删除/更改属性，并且所有当前属性都是 `configurable: false, writable: false`，则返回 `true`。

这些方法在实践中很少使用。
