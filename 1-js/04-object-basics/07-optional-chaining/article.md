
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

或者，在 web 开发中，我们想获取页面上某个元素的信息，但它可能不存在：

```js run
// querySelector(...) 结果为 null 时报错
let html = document.querySelector('.my-element').innerHTML;
```

在这门语言（JavaScript）出现 `?.` 前，`&&` 运算符常被用来解决这个问题。

例如：

```js run
let user = {}; // user 没有 address

alert( user && user.address && user.address.street ); // undefined （不报错）
```

整条路径上都对属性使用与运算来确保所有节点是存在的，但这代码显得累赘。

## 可选链

如果可选链 `?.` 前一部分是 `undefined` 或者 `null`，它会停止运算并返回 `undefined`。

为了简明起见，在本文接下来的内容中，我们会说如果一个属性既不是 `null` 也不是 `undefined`，那么它就“存在”。


一种安全访问 `user.address.street` 的方式：

```js run
let user = {}; // user 没有 address

alert( user?.address?.street ); // undefined （不报错）
```

以 `user?.address` 来读取地址的方式是可行的，即使 `user` 对象不存在：

```js run
let user = null;

alert( user?.address ); // undefined

alert( user?.address.street ); // undefined
alert( user?.address.street.anything ); // undefined
```

请注意：`?.` 语法正好会在它所在地方起作用，仅此而已，不会对后面起作用。

在最后两行里，运算立即在 `user?.` 后面停止，不会继续访问后面的属性。但如果 `user` 确实存在，那么后面的中间属性，如 `user.address`，就必须存在（才不会报错）。

```warn header="不要过度使用可选链"
我们应该只将 `?.` 使用在属性（对象）可以不存在的地方。

例如，如果根据上面讨论的代码逻辑，`user` 对象必须存在，但 `address` 是可选的，那么 `user.address?.street` 会更好。

所以，如果 `user` 恰巧因为失误变为未定义的（undefined），我们会知道并修复这个失误。相反，代码失误在不恰当的地方被消除了，导致调试更加困难。
```

````warn header="`?.` 前的变量必须存在"
如果没有了变量 `user`，那么 `user?.anything` 会触发一个错误：

```js run
// ReferenceError: user is not defined
user?.address;
```
可选链只去检查 `null/undefined`，不干扰其他任何语言机制。
````

## 短路效应

正如之前所说，如果 `?.` 左边部分不存在，它就立即停止运算（“短路效应”）。

所以，如果后面有任何函数调用或者副作用，它们均不会执行：

```js run
let user = null;
let x = 0;

user?.sayHi(x++); // 没事发生

alert(x); // 0，值没有增加
```

## 其它情况：?.()、?.[]

可选链 `?.` 不是一个运算符，而是一个特殊的语法结构。它还可以与函数调用和方括号一起使用。

例如，用 `?.()` 来调用一个不存在的函数。

在下面代码里，有些用户含有 `admin` 方法，而有些没有：

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

在这两行代码里，我们首先用点 `.` 来获取 `admin` 属性，因为用户对象一定存在，直接读取很安全。

然后 `?.()` 会检查它的左边：如果 admin 函数存在，那么就调用运行（对于 `user1`）。否则（对于 `user2`）运算停止，没有错误。

如果我们想用方括号 `[]` 而不是点 `.` 来访问属性，语法 `?.[]` 也能用。跟前面的例子相似，允许安全地从一个不存在的对象上读取属性。

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

还有，我们能将 `?.` 跟 `delete` 一起使用：

```js run
delete user?.name; // 如果 user 存在，则删除 user.name
```

```warn header="我们可以使用 `?.` 来安全地读取或者删除，但不能写入"
可选链 `?.` 不能用在赋值语句的左侧：

```js run
// 下面代码的想法是要写入 user.name，如果 user 存在的话

user?.name = "John"; // Error, 不起作用
// because it evaluates to undefined = "John"
```

## 总结

`?.` 语法有三种形式：

1. `obj?.prop` -- 如果 `obj` 存在则返回 `obj.prop`，否则返回 `undefined`。
2. `obj?.[prop]` -- 如果 `obj` 存在则返回 `obj[prop]`，否则返回 `undefined`。
3. `obj?.method()` -- 如果 `obj` 存在则调用 `obj.method()`，否则返回 `undefined`。

如我们所见，这些语法形式用起来都是直接简单的。`?.` 检查左边部分是否为 `null/undefined`，如果不是则继续运算。

`?.` 链可以安全地访问嵌套属性。

但是，我们应该谨慎使用 `?.`，仅当左边部分不存在也没问题的情况下为宜。

以致于编程错误发生时，也不会对我们隐藏。
