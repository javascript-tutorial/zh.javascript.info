
# 可选链 "?."

[recent browser="new"]

可选链 `?.` 是一种访问嵌套对象属性的安全的方式。即使中间的属性不存在，也不会出现错误。

## “不存在的属性”的问题

如果你才刚开始读此教程并学习 JavaScript，那可能还没接触到这个问题，但它却相当常见。

举个例子，假设我们有很多个 `user` 对象，其中存储了我们的用户数据。

我们大多数用户的地址都存储在 `user.address` 中，街道地址存储在 `user.address.street` 中，但有些用户没有提供这些信息。

在这种情况下，当我们尝试获取 `user.address.street`，而该用户恰好没提供地址信息，我们则会收到一个错误：

```js run
let user = {}; // 一个没有 "address" 属性的 user 对象

alert(user.address.street); // Error!
```

这是预期的结果。JavaScript 的工作原理就是这样的。因为 `user.address` 为 `undefined`，尝试读取 `user.address.street` 会失败，并收到一个错误。

但是在很多实际场景中，我们更希望得到的是 `undefined`（表示没有 `street` 属性）而不是一个错误。

……还有另一个例子。在 Web 开发中，我们可以使用特殊的方法调用（例如 `document.querySelector('.elem')`）以对象的形式获取一个网页元素，如果没有这种对象，则返回 `null`。

```js run
// 如果 document.querySelector('.elem') 的结果为 null，则这里不存在这个元素
let html = document.querySelector('.elem').innerHTML; // 如果 document.querySelector('.elem') 的结果为 null，则会出现错误
```

同样，如果该元素不存在，则访问 `null` 的 `.innerHTML` 时会出错。在某些情况下，当元素的缺失是没问题的时候，我们希望避免出现这种错误，而是接受 `html = null` 作为结果。

我们如何实现这一点呢？

可能最先想到的方案是在访问该值的属性之前，使用 `if` 或条件运算符 `?` 对该值进行检查，像这样：

```js
let user = {};

alert(user.address ? user.address.street : undefined);
```

这样可以，这里就不会出现错误了……但是不够优雅。就像你所看到的，`"user.address"` 在代码中出现了两次。对于嵌套层次更深的属性就会出现更多次这样的重复，这就是问题了。

例如，让我们尝试获取 `user.address.street.name`。

我们既需要检查 `user.address`，又需要检查 `user.address.street`：

```js
let user = {}; // user 没有 address 属性

alert(user.address ? user.address.street ? user.address.street.name : null : null);
```

这样就太扯淡了，并且这可能导致写出来的代码很难让别人理解。

甚至我们可以先忽略这个问题，因为我们有一种更好的实现方式，就是使用 `&&` 运算符：

```js run
let user = {}; // user 没有 address 属性

alert( user.address && user.address.street && user.address.street.name ); // undefined（不报错）
```

依次对整条路径上的属性使用与运算进行判断，以确保所有节点是存在的（如果不存在，则停止计算），但仍然不够优雅。

就像你所看到的，在代码中我们仍然重复写了好几遍对象属性名。例如在上面的代码中，`user.address` 被重复写了三遍。

这就是为什么可选链 `?.` 被加入到了 JavaScript 这门编程语言中。那就是彻底地解决以上所有问题！

## 可选链

如果可选链 `?.` 前面的部分是 `undefined` 或者 `null`，它会停止运算并返回该部分。

**为了简明起见，在本文接下来的内容中，我们会说如果一个属性既不是 `null` 也不是 `undefined`，那么它就“存在”。**

换句话说，例如 `value?.prop`：
- 如果 `value` 存在，则结果与 `value.prop` 相同，
- 否则（当 `value` 为 `undefined/null` 时）则返回 `undefined`。

下面这是一种使用 `?.` 安全地访问 `user.address.street` 的方式：

```js run
let user = {}; // user 没有 address 属性

alert( user?.address?.street ); // undefined（不报错）
```

代码简洁明了，也不用重复写好几遍属性名。

即使 对象 `user` 不存在，使用 `user?.address` 来读取地址也没问题：

```js run
let user = null;

alert( user?.address ); // undefined
alert( user?.address.street ); // undefined
```

请注意：`?.` 语法使其前面的值成为可选值，但不会对其后面的起作用。

例如，在 `user?.address.street.name` 中，`?.` 允许 `user` 为 `null/undefined`，但仅此而已。更深层次的属性是通过常规方式访问的。如果我们希望它们中的一些也是可选的，那么我们需要使用更多的 `?.` 来替换 `.`。

```warn header="不要过度使用可选链"
我们应该只将 `?.` 使用在一些东西可以不存在的地方。

例如，如果根据我们的代码逻辑，`user` 对象必须存在，但 `address` 是可选的，那么我们应该这样写 `user.address?.street`，而不是这样 `user?.address?.street`。

所以，如果 `user` 恰巧因为失误变为 undefined，我们会看到一个编程错误并修复它。否则，代码中的错误在不恰当的地方被消除了，这会导致调试更加困难。
```

````warn header="`?.` 前的变量必须已声明"
如果未声明变量 `user`，那么 `user?.anything` 会触发一个错误：

```js run
// ReferenceError: user is not defined
user?.address;
```
`?.` 前的变量必须已声明（例如 `let/const/var user` 或作为一个函数参数）。可选链仅适用于已声明的变量。
````

## 短路效应

正如前面所说的，如果 `?.` 左边部分不存在，就会立即停止运算（“短路效应”）。

所以，如果后面有任何函数调用或者副作用，它们均不会执行。

例如：

```js run
let user = null;
let x = 0;

user?.sayHi(x++); // 没有 "sayHi"，因此代码执行没有触达 x++

alert(x); // 0，值没有增加
```

## 其它变体：?.()，?.[]

可选链 `?.` 不是一个运算符，而是一个特殊的语法结构。它还可以与函数和方括号一起使用。

例如，将 `?.()` 用于调用一个可能不存在的函数。

在下面这段代码中，有些用户具有 `admin` 方法，而有些没有：

```js run
let userAdmin = {
  admin() {
    alert("I am admin");
  }
};

let userGuest = {};

*!*
userAdmin.admin?.(); // I am admin
*/!*

*!*
userGuest.admin?.(); // 啥都没有（没有这样的方法）
*/!*
```

在这两行代码中，我们首先使用点符号（`userAdmin.admin`）来获取 `admin` 属性，因为用户对象一定存在，因此可以安全地读取它。

然后 `?.()` 会检查它左边的部分：如果 `admin` 函数存在，那么就调用运行它（对于 `userAdmin`）。否则（对于 `userGuest`）运算停止，没有错误。

如果我们想使用方括号 `[]` 而不是点符号 `.` 来访问属性，语法 `?.[]` 也可以使用。跟前面的例子类似，它允许从一个可能不存在的对象上安全地读取属性。

```js run
let user1 = {
  firstName: "John"
};

let user2 = null; // 假设，我们不能授权此用户

let key = "firstName";

alert( user1?.[key] ); // John
alert( user2?.[key] ); // undefined

alert( user1?.[key]?.something?.not?.existing); // undefined
```

此外，我们还可以将 `?.` 跟 `delete` 一起使用：

```js run
delete user?.name; // 如果 user 存在，则删除 user.name
```

````warn header="我们可以使用 `?.` 来安全地读取或删除，但不能写入"
可选链 `?.` 不能用在赋值语句的左侧。

例如：
```js run
let user = null;

user?.name = "John"; // Error，不起作用
// 因为它在计算的是 undefined = "John"
```

这还不是那么智能。
````

## 总结

可选链 `?.` 语法有三种形式：

1. `obj?.prop` —— 如果 `obj` 存在则返回 `obj.prop`，否则返回 `undefined`。
2. `obj?.[prop]` —— 如果 `obj` 存在则返回 `obj[prop]`，否则返回 `undefined`。
3. `obj.method?.()` —— 如果 `obj.method` 存在则调用 `obj.method()`，否则返回 `undefined`。

正如我们所看到的，这些语法形式用起来都很简单直接。`?.` 检查左边部分是否为 `null/undefined`，如果不是则继续运算。

`?.` 链使我们能够安全地访问嵌套属性。

但是，我们应该谨慎地使用 `?.`，仅在当左边部分不存在也没问题的情况下使用为宜。以保证在代码中有编程上的错误出现时，也不会对我们隐藏。
