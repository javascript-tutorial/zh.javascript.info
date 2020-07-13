
<<<<<<< HEAD
# 可选链 "?."

[recent browser="new"]

可选链 `?.` 是一种访问嵌套对象属性的防错误方法。即使中间的属性不存在，也不会出现错误。

## 问题

如果你才刚开始读此教程并学习 JavaScript，那可能还没接触到这个问题，但它却相当常见。

例如，我们有些用户会有地址信息，但有一少部分用户并没有提供相关信息。那么我们就不能安全地读取到 `user.address.street`：

```js run
let user = {}; // 这个 user 恰巧没有 address
=======
# Optional chaining '?.'

[recent browser="new"]

The optional chaining `?.` is an error-proof way to access nested object properties, even if an intermediate property doesn't exist.

## The problem

If you've just started to read the tutorial and learn JavaScript, maybe the problem hasn't touched you yet, but it's quite common.

For example, some of our users have addresses, but few did not provide them. Then we can't safely read `user.address.street`:

```js run
let user = {}; // the user happens to be without address
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

alert(user.address.street); // Error!
```

<<<<<<< HEAD
或者，在 Web 开发中，我们想获取页面上某个元素的信息，但它可能不存在：

```js run
// querySelector(...) 结果为 null 时报错
let html = document.querySelector('.my-element').innerHTML;
```

在这门语言（JavaScript）出现 `?.` 前，`&&` 运算符常被用来解决这个问题。

例如：

```js run
let user = {}; // user 没有 address

alert( user && user.address && user.address.street ); // undefined（不报错）
```

依次对整条路径上的属性（使用与运算）进行判断，以确保所有节点是存在的，但这代码显得累赘。

## 可选链

如果可选链 `?.` 前一部分是 `undefined` 或者 `null`，它会停止运算并返回 `undefined`。

为了简明起见，在本文接下来的内容中，我们会说如果一个属性既不是 `null` 也不是 `undefined`，那么它就“存在”。


一种安全访问 `user.address.street` 的方式：

```js run
let user = {}; // user 没有 address

alert( user?.address?.street ); // undefined （不报错）
```

以 `user?.address` 的方式来读取 `address` 是可行的，即使对象 `user` 不存在：
=======
Or, in the web development, we'd like to get an information about an element on the page, but it may not exist:

```js run
// Error if the result of querySelector(...) is null
let html = document.querySelector('.my-element').innerHTML;
```

Before `?.` appeared in the language, the `&&` operator was used to work around that.

For example:

```js run
let user = {}; // user has no address

alert( user && user.address && user.address.street ); // undefined (no error)
```

AND'ing the whole path to the property ensures that all components exist, but is cumbersome to write.

## Optional chaining

The optional chaining `?.` stops the evaluation and returns `undefined` if the part before `?.` is `undefined` or `null`.

**Further in this article, for brevity, we'll be saying that something "exists" if it's not `null` and not `undefined`.**

Here's the safe way to access `user.address.street`:

```js run
let user = {}; // user has no address

alert( user?.address?.street ); // undefined (no error)
```

Reading the address with `user?.address` works even if `user` object doesn't exist:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

```js run
let user = null;

alert( user?.address ); // undefined
<<<<<<< HEAD

alert( user?.address.street ); // undefined
alert( user?.address.street.anything ); // undefined
```

请注意：`?.` 语法恰好会在它所处的位置起作用，仅此而已，不会对后面起作用。

在最后两行里，运算立即在 `user?.` 后面停止，不会继续访问后面的属性。但如果 `user` 确实存在，那么后面的中间属性，如 `user.address`，就必须存在（才不会报错）。

```warn header="不要过度使用可选链"
我们应该只将 `?.` 使用在属性（对象）可以不存在的地方。

例如，如果根据上面讨论的代码逻辑，`user` 对象必须存在，但 `address` 是可选的，那么 `user.address?.street` 会更好。

所以，如果 `user` 恰巧因为失误变为 undefined，我们会知道并修复这个失误。相反，代码中的 error 在不恰当的地方被消除了，这会导致调试更加困难。
```

````warn header="`?.` 前的变量必须已声明"
如果未声明变量 `user`，那么 `user?.anything` 会触发一个错误：
=======
alert( user?.address.street ); // undefined
```

Please note: the `?.` syntax makes optional the value before it, but not any further.

In the example above, `user?.` allows only `user` to be `null/undefined`.

On the other hand, if `user` does exist, then it must have `user.address` property, otherwise `user?.address.street` gives an error at the second dot.

```warn header="Don't overuse the optional chaining"
We should use `?.` only where it's ok that something doesn't exist.

For example, if according to our coding logic `user` object must be there, but `address` is optional, then `user.address?.street` would be better.

So, if `user` happens to be undefined due to a mistake, we'll know about it and fix it. Otherwise, coding errors can be silenced where not appropriate, and become more difficult to debug.
```

````warn header="The variable before `?.` must be declared"
If there's no variable `user` at all, then `user?.anything` triggers an error:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

```js run
// ReferenceError: user is not defined
user?.address;
```
<<<<<<< HEAD
可选链只会去检查 `null/undefined`，不会干扰任何其他语言机制。
````

## 短路效应

正如之前所说，如果 `?.` 左边部分不存在，它就立即停止运算（“短路效应”）。

所以，如果后面有任何函数调用或者副作用，它们均不会执行：
=======
There must be `let/const/var user`. The optional chaining works only for declared variables. 
````

## Short-circuiting

As it was said before, the `?.` immediately stops ("short-circuits") the evaluation if the left part doesn't exist.

So, if there are any further function calls or side effects, they don't occur:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

```js run
let user = null;
let x = 0;

<<<<<<< HEAD
user?.sayHi(x++); // 没事发生

alert(x); // 0，值没有增加
```

## 其它情况：?.()，?.[]

可选链 `?.` 不是一个运算符，而是一个特殊的语法结构。它还可以与函数调用和方括号一起使用。

例如，用 `?.()` 来调用一个不存在的函数。

在下面代码里，有些用户含有 `admin` 方法，而有些没有：
=======
user?.sayHi(x++); // nothing happens

alert(x); // 0, value not incremented
```

## Other cases: ?.(), ?.[]

The optional chaining `?.` is not an operator, but a special syntax construct, that also works with functions and square brackets.

For example, `?.()` is used to call a function that may not exist.

In the code below, some of our users have `admin` method, and some don't:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

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

<<<<<<< HEAD
在这两行代码里，我们首先用点 `.` 来获取 `admin` 属性，因为用户对象一定存在，直接读取很安全。

然后 `?.()` 会检查它的左边：如果 admin 函数存在，那么就调用运行（对于 `user1`）。否则（对于 `user2`）运算停止，没有错误。

如果我们想用方括号 `[]` 而不是点 `.` 来访问属性，语法 `?.[]` 也能用。跟前面的例子类似，它允许从一个可能不存在的对象上安全地读取属性。
=======
Here, in both lines we first use the dot `.` to get `admin` property, because the user object must exist, so it's safe read from it.

Then `?.()` checks the left part: if the admin function exists, then it runs (for `user1`). Otherwise (for `user2`) the evaluation stops without errors.

The `?.[]` syntax also works, if we'd like to use brackets `[]` to access properties instead of dot `.`. Similar to previous cases, it allows to safely read a property from an object that may not exist.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

```js run
let user1 = {
  firstName: "John"
};

<<<<<<< HEAD
let user2 = null; // 假设，我们不能授权此用户
=======
let user2 = null; // Imagine, we couldn't authorize the user
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

let key = "firstName";

alert( user1?.[key] ); // John
alert( user2?.[key] ); // undefined

alert( user1?.[key]?.something?.not?.existing); // undefined
```

<<<<<<< HEAD
此外，我们还可以将 `?.` 跟 `delete` 一起使用：

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

1. `obj?.prop` —— 如果 `obj` 存在则返回 `obj.prop`，否则返回 `undefined`。
2. `obj?.[prop]` —— 如果 `obj` 存在则返回 `obj[prop]`，否则返回 `undefined`。
3. `obj?.method()` —— 如果 `obj` 存在则调用 `obj.method()`，否则返回 `undefined`。

如我们所见，这些语法形式用起来都很简单直接。`?.` 检查左边部分是否为 `null/undefined`，如果不是则继续运算。

`?.` 链可以安全地访问嵌套属性。

但是，我们应该谨慎地使用 `?.`，仅在当左边部分不存在也没问题的情况下使用为宜。

以保证在代码中有编程上的 error 出现时，也不会对我们隐藏。
=======
Also we can use `?.` with `delete`:

```js run
delete user?.name; // delete user.name if user exists
```

```warn header="We can use `?.` for safe reading and deleting, but not writing"
The optional chaining `?.` has no use at the left side of an assignment:

```js run
// the idea of the code below is to write user.name, if user exists

user?.name = "John"; // Error, doesn't work
// because it evaluates to undefined = "John"
```

## Summary

The `?.` syntax has three forms:

1. `obj?.prop` -- returns `obj.prop` if `obj` exists, otherwise `undefined`.
2. `obj?.[prop]` -- returns `obj[prop]` if `obj` exists, otherwise `undefined`.
3. `obj?.method()` -- calls `obj.method()` if `obj` exists, otherwise returns `undefined`.

As we can see, all of them are straightforward and simple to use. The `?.` checks the left part for `null/undefined` and allows the evaluation to proceed if it's not so.

A chain of `?.` allows to safely access nested properties.

Still, we should apply `?.` carefully, only where it's ok that the left part doesn't to exist.

So that it won't hide programming errors from us, if they occur.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439
