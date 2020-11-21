
# Reference Type

```warn header="深入的语言特性"
本文所讲的是一个高阶主题，能帮你更好地理解一些边缘情况。

这仅是锦上添花。许多经验丰富的的开发者不甚了了也过得不错。如果你想了解代码运行的本质，那就继续读下去吧。
```

一个动态执行的方法调用可能会丢失 `this`。

例如：

```js run
let user = {
  name: "John",
  hi() { alert(this.name); },
  bye() { alert("Bye"); }
};

user.hi(); // 正常运行

// 现在让我们基于 name 来选择调用 user.hi 或 user.bye
*!*
(user.name == "John" ? user.hi : user.bye)(); // Error!
*/!*
```

在最后一行有个在 `user.hi` 和 `user.bye` 中做选择的条件（三元）运算符。当前情形下的结果是 `user.hi`。

接着该方法被通过 `()` 立刻调用。但是并不能正常工作！

如你所见，此处调用导致了一个错误，因为在该调用中 `"this"` 的值变成了 `undefined`。

这样是能工作的（对象.方法）：
```js
user.hi();
```

这就无法工作了（被评估的方法）：
```js
(user.name == "John" ? user.hi : user.bye)(); // Error!
```

为什么呢？欲知缘何，且让我们深入 `obj.method()` 调用运行的本质。

## Reference type 解读

仔细看的话，我们可能注意到 `obj.method()` 语句中的两个操作：

1. 首先，点 `'.'` 取了属性 `obj.method` 的值。
2. 接着 `()` 执行了它。

那么，`this` 的信息是怎么从第一部分传递到第二部分的呢？

如果我们将这些操作放在不同的行，`this` 必定是会丢失的：

```js run
let user = {
  name: "John",
  hi() { alert(this.name); }
}

*!*
// 把获取方法和调用方法拆成两行
let hi = user.hi;
hi(); // 报错了，因为 this 的值是 undefined
*/!*
```

这里 `hi = user.hi` 把函数赋值给了一个变量，接下来在最后一行它是完全独立的，所以这里没有 `this`。

**为确保 `user.hi()` 调用正常运行，JavaScript 玩了个小把戏 —— 点 `'.'` 返回的不是一个函数，而是一个特殊的 [Reference Type](https://tc39.github.io/ecma262/#sec-reference-specification-type) 的值。**

Reference Type 是 ECMA 中的一个“规范类型”。我们不能直接使用它，但它被用在 JavaScript 语言内部。

Reference Type 的值是一个三个值的组合 `(base, name, strict)`，其中：

- `base` 是对象。
- `name` 是属性名。
- `strict` 在 `use strict` 模式下为 true。

对属性 `user.hi` 访问的结果不是一个函数，而是一个 Reference Type 的值。对于 `user.hi`，在严格模式下是：

```js
// Reference Type 的值
(user, "hi", true)
```

当 `()` 被在 Reference Type 上调用时，它们会接收到关于对象和对象的方法的完整信息，然后可以设置正确的 `this`（在此处 `=user`）。

Reference Type 是一个特殊的“中间人”内部类型，目的是从 `.` 传递信息给 `()` 调用。

任何例如赋值 `hi = user.hi` 等其他的操作，都会将 Reference Type 作为一个整体丢弃掉，而会取 `user.hi`（一个函数）的值并继续传递。所以任何后续操作都“丢失”了 `this`。

因此，`this` 的值仅在函数直接被通过点符号 `obj.method()` 或方括号 `obj['method']()` 语法（此处它们作用相同）调用时才被正确传递。还有很多种解决这个问题的方式，例如 [func.bind()](/bind#solution-2-bind)。

## 总结

Reference Type 是语言内部的一个类型。

读取一个属性，例如在 `obj.method()` 中，`.` 返回的准确来说不是属性的值，而是一个特殊的 "Reference Type" 值，其中储存着属性的值和它的来源对象。

这是为了随后的方法调用 `()` 获取来源对象，然后将 `this` 设为它。

对于所有其它操作，Reference Type 会自动变成属性的值（在我们这个情况下是一个函数）。

这整个机制对我们是不可见的。它仅在一些微妙的情况下才重要，例如使用表达式从对象动态地获取一个方法时。
