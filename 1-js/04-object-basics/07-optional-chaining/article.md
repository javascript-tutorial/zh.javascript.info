
# 可选链 "?."

[recent browser="new"]

可选链 `?.` 是一种访问嵌套对象属性的防错误方法。即使中间的属性不存在，也不会出现错误。

## 问题

如果你才刚开始读此教程并学习 JavaScript，那可能还没接触到这个问题，但它却相当常见。

例如，我们有些用户会有地址信息，但有一少部分用户并没有提供相关信息。那么我们就不能安全地读取到 `user.address.street`：

```js run
let user = {}; // 这个 user 恰巧没有 address

alert(user.address.street); // Error!
```

或者，在 Web 开发中，我们想获取页面上某个元素的信息，但它可能不存在：

```js run
// 如果 querySelector(...) 的结果为 null，则会报错
let html = document.querySelector('.my-element').innerHTML;
```

在 JavaScript 这门语言中出现 `?.` 前，`&&` 运算符常被用来解决这个问题。

例如：

```js run
let user = {}; // user 没有 address

alert( user && user.address && user.address.street ); // undefined（不报错）
```

依次对整条路径上的属性使用与运算进行判断，以确保所有节点是存在的，但是写起来很麻烦。

## 可选链

如果可选链 `?.` 前面部分是 `undefined` 或者 `null`，它会停止运算并返回 `undefined`。

**为了简明起见，在本文接下来的内容中，我们会说如果一个属性既不是 `null` 也不是 `undefined`，那么它就“存在”。**

下面这是一种安全地访问 `user.address.street` 的方式：

```js run
let user = {}; // user 没有 address

alert( user?.address?.street ); // undefined （不报错）
```

以 `user?.address` 的方式来读取 `address` 是可行的，即使对象 `user` 不存在：

```js run
let user = null;

alert( user?.address ); // undefined
alert( user?.address.street ); // undefined
```

请注意：`?.` 语法使其前面的值成为可选值，但不会对其后面的起作用。

在上面的例子中，`user?.` 只允许 `user` 为 `null/undefined`。

另一方面，如果 `user` 存在，那么它必须具有 `user.address` 属性，否则 `user?.address.street` 在第二个点符号处会报错。

```warn header="不要过度使用可选链"
我们应该只将 `?.` 使用在一些东西可以不存在的地方。

例如，如果根据我们的代码逻辑，`user` 对象必须存在，但 `address` 是可选的，那么 `user.address?.street` 会更好。

所以，如果 `user` 恰巧因为失误变为 undefined，我们会知道并修复这个失误。否则，代码中的 error 在不恰当的地方被消除了，这会导致调试更加困难。
```

````warn header="`?.` 前的变量必须已声明"
如果未声明变量 `user`，那么 `user?.anything` 会触发一个错误：

```js run
// ReferenceError: user is not defined
user?.address;
```
`?.` 前的变量必须已通过 `let/const/var user` 进行声明。可选链仅适用于已声明的变量。
````

## 短路效应

正如前面所说的，如果 `?.` 左边部分不存在，就会立即停止运算（“短路效应”）。

所以，如果后面有任何函数调用或者副作用，它们均不会执行：

```js run
let user = null;
let x = 0;

user?.sayHi(x++); // 没事发生

alert(x); // 0，值没有增加
```

## 其它情况：?.()，?.[]

可选链 `?.` 不是一个运算符，而是一个特殊的语法结构。它还可以与函数和方括号一起使用。

例如，将 `?.()` 用于调用一个可能不存在的函数。

在下面这段代码中，有些用户具有 `admin` 方法，而有些没有：

```js run
let user1 = {
  admin() {
    alert("I am admin");
  }
}

let user2 = {};

*!*
user1.admin?.(); // I am admin
user2.admin?.();
*/!*
```

在这两行代码中，我们首先使用点符号 `.` 来获取 `admin` 属性，因为用户对象一定存在，因此可以安全地读取它。

然后 `?.()` 会检查它左边的部分：如果 admin 函数存在，那么就调用运行它（对于 `user1`）。否则（对于 `user2`）运算停止，没有错误。

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

```warn header="我们可以使用 `?.` 来安全地读取或删除，但不能写入"
可选链 `?.` 不能用在赋值语句的左侧：

```js run
// 下面这段代码的想法是要写入 user.name，如果 user 存在的话

user?.name = "John"; // Error，不起作用
// because it evaluates to undefined = "John"
```

## 总结

可选链 `?.` 语法有三种形式：

1. `obj?.prop` —— 如果 `obj` 存在则返回 `obj.prop`，否则返回 `undefined`。
2. `obj?.[prop]` —— 如果 `obj` 存在则返回 `obj[prop]`，否则返回 `undefined`。
3. `obj?.method()` —— 如果 `obj` 存在则调用 `obj.method()`，否则返回 `undefined`。

正如我们所看到的，这些语法形式用起来都很简单直接。`?.` 检查左边部分是否为 `null/undefined`，如果不是则继续运算。

`?.` 链使我们能够安全地访问嵌套属性。

但是，我们应该谨慎地使用 `?.`，仅在当左边部分不存在也没问题的情况下使用为宜。

以保证在代码中有编程上的 error 出现时，也不会对我们隐藏。
