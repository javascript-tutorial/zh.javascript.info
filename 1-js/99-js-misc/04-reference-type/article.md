
# Reference Type

```warn header="深入的语言特性"
这篇文章包含一个高阶主题，能帮你更好地理解一些边缘情况。

这仅是锦上添花。许多经验丰富的的开发者不甚了了也过得不错。如果你想了然代码运行的本质，则请继续阅读。
```

一个动态执行的方法可能丢失 `this`。

例如：

```js run
let user = {
  name: "John",
  hi() { alert(this.name); },
  bye() { alert("Bye"); }
};

user.hi(); // 可以工作

// 此处我们基于 name 来选择调用 user.hi 或 user.bye
*!*
(user.name == "John" ? user.hi : user.bye)(); // 报错了
*/!*
```
在最后一行有个在 `user.hi` 和 `user.bye` 中做选择的条件（三元）运算符。当前情形下的结果是 `user.hi`。

接着该方法被通过 `()` 立刻调用。但是并不能正常工作！

如你所见, 此处调用导致了一个错误, 因为在该调用中 `"this"` 的值变成了 `undefined`。

这是能工作的（对象.方法）：
```js
user.hi();
```

这就无法工作了（直接执行 方法）：
```js
(user.name == "John" ? user.hi : user.bye)(); // 报错了!
```

为什么呢？欲知缘何, 且让我们深入 `obj.method()` 调用运行的本质。

## Reference type 解读

仔细看的话，我们可能注意到 `obj.method()` 语句中的两个操作：

1. 首先，点 `'.'` 取了属性 `obj.method` 的值。
2. 接着 `()` 执行了它。

所以，`this` 的信息是怎么从第一部分传递到第二部分的呢？

如果我们将这些操作放在不同的行，`this` 必定是会丢失的：

```js run
let user = {
  name: "John",
  hi() { alert(this.name); }
}

*!*
// 把 获取方法/调用方法 拆成两行
let hi = user.hi;
hi(); // 报错了，因为 this 的值是 undefined
*/!*
```

这里 `hi = user.hi` 把方法赋值给了一个变量，接下来在最后一行它是完全独立的，所以这里没有 `this`。

**为确保 `user.hi()` 调用正常运行，JavaScript 玩了个把戏 —— 点 `'.'` 返回的不是不是一个函数，而是一个特殊的 [Reference Type](https://tc39.github.io/ecma262/#sec-reference-specification-type) 的值。**

Reference Type 是一个 ECMA 标准内部用于规范而使用的类型（Specification Type）。我们不能直接使用它，但它被 JavaScript 在执行引擎内部使用。（注意：它并非我们通常所指的引用类型 —— reference type）

Reference Type 的值是一个三个值的组合 `(base, name, strict)`，其中：

- `base` 是对象。
- `name` 是属性名。
- `strict` 在 `use strict` 严格模式下为 true。

对属性 `user.hi` 访问的结果不是一个函数，而是一个 Reference Type 的值。对于 `user.hi`，它在严格模式下是：

```js
// Reference Type 的值
(user, "hi", true)
```

当 `()` 在 Reference Type 上调用时，它们会接收到关于对象和对象的属性的完整信息，然后设置正确的 `this`（在此处 `=user`）。

Reference Type 是一个特殊的“中间人”内部类型，目的是从 `.` 传递信息给 `()` 的调用。

任何其他的操作，例如赋值 `hi = user.hi`，完全丢弃了 Reference Type，而取了 `user.hi`（一个函数）的值并传递给其他变量。所以任何后续操作都“丢失”了 `this`。

故此，`this` 的值仅在函数直接使用点 `obj.method()` 或方括号 `obj['method']()` 语法（此处它们作用相同）调用时正确传递。在这份教程的后续部分，我们会学习通过多种方法解决这个问题，例如 [func.bind()](/bind#solution-2-bind)。

## 总结

Reference Type 是一个语言的内部类型。

读取一个属性，例如在 `obj.method()` 中，`.` 返回的准确来说不是属性的值，而是一个特殊的“Reference Type”的值，储存着属性的值和它的来源对象。

这是为了随后的方法调用 `()` 获取来源对象然后将 `this` 设为它。

对于所有其它操作，Reference Type 自动变成了属性的值（在我们这个情况下是一个函数）。

这整个机理对我们不可见。它仅在一些微妙的情形下才重要，例如一个方法是通过表达式从对象动态获取的。

`.` 的结果实际上不是一个方法，而是一个Reference Type 的值，以传递关于 `obj` 的信息。
