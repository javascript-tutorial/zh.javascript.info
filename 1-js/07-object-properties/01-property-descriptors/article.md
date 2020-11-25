
# 属性标志和属性描述符

我们知道，对象可以存储属性。

到目前为止，属性对我们来说只是一个简单的“键值”对。但对象属性实际上是更灵活且更强大的东西。

在本章中，我们将学习其他配置选项，在下一章中，我们将学习如何将它们无形地转换为 getter/setter 函数。

## 属性标志

对象属性（properties），除 **`value`** 外，还有三个特殊的特性（attributes），也就是所谓的“标志”：

- **`writable`** — 如果为 `true`，则值可以被修改，否则它是只可读的。
- **`enumerable`** — 如果为 `true`，则会被在循环中列出，否则不会被列出。
- **`configurable`** — 如果为 `true`，则此特性可以被删除，这些属性也可以被修改，否则不可以。

我们到现在还没看到它们，是因为它们通常不会出现。当我们用“常用的方式”创建一个属性时，它们都为 `true`。但我们也可以随时更改它们。

首先，让我们来看看如何获得这些标志。

[Object.getOwnPropertyDescriptor](mdn:js/Object/getOwnPropertyDescriptor) 方法允许查询有关属性的 **完整** 信息。

语法是：
```js
let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
```

`obj`
: 需要从中获取信息的对象。

`propertyName`
: 属性的名称。

返回值是一个所谓的“属性描述符”对象：它包含值和所有的标志。

例如：

```js run
let user = {
  name: "John"
};

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/* 属性描述符：
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
: 要应用描述符的对象及其属性。

`descriptor`
: 要应用的属性描述符对象。

如果该属性存在，`defineProperty` 会更新其标志。否则，它会使用给定的值和标志创建属性；在这种情况下，如果没有提供标志，则会假定它是 `false`。

例如，这里创建了一个属性 `name`，该属性的所有标志都为 `false`：

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

将它与上面的“以常用方式创建的” `user.name` 进行比较：现在所有标志都为 `false`。如果这不是我们想要的，那么我们最好在 `descriptor` 中将它们设置为 `true`。

现在让我们通过示例来看看标志的影响。

## 只读

让我们通过更改 `writable` 标志来把 `user.name` 设置为只读（`user.name` 不能被重新赋值）：

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
user.name = "Pete"; // Error: Cannot assign to read only property 'name'
*/!*
```

现在没有人可以改变我们 `user` 的 `name`，除非它们应用自己的 `defineProperty` 来覆盖我们的 `user` 的 `name`。

```smart header="只在严格模式下会出现 Errors"
在非严格模式下，在对不可写的属性等进行写入操作时，不会出现错误。但是操作仍然不会成功。在非严格模式下，违反标志的行为（flag-violating action）只会被默默地忽略掉。
```

这是相同的示例，但针对的是属性不存在的情况：

```js run
let user = { };

Object.defineProperty(user, "name", {
*!*
  value: "John",
  // 对于新属性，我们需要明确地列出哪些是 true
  enumerable: true,
  configurable: true
*/!*
});

alert(user.name); // John
user.name = "Pete"; // Error
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

// 默认情况下，我们的两个属性都会被列出：
for (let key in user) alert(key); // name, toString
```

如果我们不喜欢它，那么我们可以设置 `enumerable:false`。之后它就不会出现在 `for..in` 循环中了，就像内建的 `toString` 一样：

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
// 现在我们的 toString 消失了：
*/!*
for (let key in user) alert(key); // name
```

不可枚举的属性也会被 `Object.keys` 排除：

```js
alert(Object.keys(user)); // name
```

## 不可配置

不可配置标志（`configurable:false`）有时会预设在内建对象和属性中。

不可配置的属性不能被删除。

例如，`Math.PI` 是只读的、不可枚举和不可配置的：

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
因此，开发人员无法修改 `Math.PI` 的值或覆盖它。

```js run
Math.PI = 3; // Error

// 删除 Math.PI 也不会起作用
```

使属性变成不可配置是一条单行道。我们无法使用 `defineProperty` 把它改回去。

确切地说，不可配置性对 `defineProperty` 施加了一些限制：
1. 不能修改 `configurable` 标志。
2. 不能修改 `enumerable` 标志。
3. 不能将 `writable: false` 修改为 `true`（反过来则可以）。
4. 不能修改访问者属性的 `get/set`（但是如果没有可以分配它们）。

**"configurable: false" 的用途是防止更改和删除属性标志，但是允许更改对象的值。**

这里的 `user.name` 是不可配置的，但是我们仍然可以更改它，因为它是可写的：

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  configurable: false
});

user.name = "Pete"; // 正常工作
delete user.name; // Error
```

现在，我们将 `user.name` 设置为一个“永不可改”的常量：

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  writable: false,
  configurable: false
});

// 不能修改 user.name 或它的标志
// 下面的所有操作都不起作用：
user.name = "Pete";
delete user.name;
Object.defineProperty(user, "name", { value: "Pete" });
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

所以，我们可以一次性设置多个属性。

## Object.getOwnPropertyDescriptors

要一次获取所有属性描述符，我们可以使用 [Object.getOwnPropertyDescriptors(obj)](mdn:js/Object/getOwnPropertyDescriptors) 方法。

它与 `Object.defineProperties` 一起可以用作克隆对象的“标志感知”方式：

```js
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
```

通常，当我们克隆一个对象时，我们使用赋值的方式来复制属性，像这样：

```js
for (let key in user) {
  clone[key] = user[key]
}
```

……但是，这并不能复制标志。所以如果我们想要一个“更好”的克隆，那么 `Object.defineProperties` 是首选。

另一个区别是 `for..in` 会忽略 symbol 类型的属性，但是 `Object.getOwnPropertyDescriptors` 返回包含 symbol 类型的属性在内的 **所有** 属性描述符。

## 设定一个全局的密封对象

属性描述符在单个属性的级别上工作。

还有一些限制访问 **整个** 对象的方法：

[Object.preventExtensions(obj)](mdn:js/Object/preventExtensions)
: 禁止向对象添加新属性。

[Object.seal(obj)](mdn:js/Object/seal)
: 禁止添加/删除属性。为所有现有的属性设置 `configurable: false`。

[Object.freeze(obj)](mdn:js/Object/freeze)
: 禁止添加/删除/更改属性。为所有现有的属性设置 `configurable: false, writable: false`。

还有针对它们的测试：

[Object.isExtensible(obj)](mdn:js/Object/isExtensible)
: 如果添加属性被禁止，则返回 `false`，否则返回 `true`。

[Object.isSealed(obj)](mdn:js/Object/isSealed)
: 如果添加/删除属性被禁止，并且所有现有的属性都具有 `configurable: false`则返回 `true`。

[Object.isFrozen(obj)](mdn:js/Object/isFrozen)
: 如果添加/删除/更改属性被禁止，并且所有当前属性都是 `configurable: false, writable: false`，则返回 `true`。

这些方法在实际中很少使用。
