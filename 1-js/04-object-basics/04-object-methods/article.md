# 对象方法与，"this"

通常创建对象来表示真实世界中的实体，如用户和订单等：

```js
let user = {
  name: "John",
  age: 30
};
```

并且，在现实世界中，用户可以进行 **操作**：从购物车中挑选某物、登录和注销等。

在 JavaScript 中，操作通过属性中的函数来表示。

## 方法示例

刚开始，我们来教 `user` 说 hello：

```js run
let user = {
  name: "John",
  age: 30
};

*!*
user.sayHi = function() {
  alert("Hello!");
};
*/!*

user.sayHi(); // Hello!
```

这里我们使用函数表达式创建了一个函数，并将其指定给对象的 `user.sayHi` 属性。

随后我们调用它。用户现在可以说话了！

作为对象属性的函数被称为 **方法**。

所以，在这我们得到了 `user` 对象的 `sayHi` 方法。

当然，我们也可以使用预先声明的函数作为方法，就像这样：

```js run
let user = {
  // ...
};

*!*
// 首先，声明函数
function sayHi() {
  alert("Hello!");
};

// 然后将其作为一个方法添加
user.sayHi = sayHi;
*/!*

user.sayHi(); // Hello!
```

```smart header="面向对象编程"
当我们在代码中用对象表示实体时，就是所谓的 [面向对象编程](https://en.wikipedia.org/wiki/Object-oriented_programming)，简称为 "OOP"。

OOP 是一门大学问，本身就是一门有趣的科学。怎样选择合适的实体？如何组织它们之间的交互？这就是架构，有很多关于这方面的书，例如 E.Gamma、R.Helm、R.Johnson 和 J.Vissides 所著的《设计模式：可复用面向对象软件的基础》，G.Booch 所著的《面向对象分析与设计》等。
```
### 方法简写

在对象字面量中，有一种更短的（声明）方法的语法：

```js
// 这些对象作用一样

user = {
  sayHi: function() {
    alert("Hello");
  }
};

// 方法简写看起来更好，对吧？
let user = {
*!*
  sayHi() { // 与 "sayHi: function()" 一样
*/!*
    alert("Hello");
  }
};
```

如上所示，我们可以省略 `"function"`，只写 `sayHi()`。

说实话，这种表示法还是有些不同。在对象继承方面有一些细微的差别（稍后将会介绍），但目前它们并不重要。在几乎所有的情况下，较短的语法是首选的。

## 方法中的 "this"

在很多时候，对象方法需要访问对象中的存储的信息来完成其工作。

举个例子，`user.sayHi()` 中的代码可能需要用到 `user` 的 name 属性。

**为了访问该对象，方法中可以使用 `this` 关键字。**

`this` 的值就是在点之前的这个对象，即调用该方法的对象。

举个例子：

```js run
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    alert(this.name);
*/!*
  }

};

user.sayHi(); // John
```

在这里 `user.sayHi()` 执行过程中，`this` 的值是 `user`。

技术上讲，也可以在不使用 `this` 的情况下，通过外部变量名来引用它：

```js
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    alert(user.name); // "user" 替代 "this"
*/!*
  }

};
```

但这样的代码是不可靠的。如果我们将 `user` 复制给另一个变量。例如 `admin = user`，并赋另外的值给 `user`，那么它将访问到错误的对象。

如下所示：

```js run
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    alert( user.name ); // 导致错误
*/!*
  }

};


let admin = user;
user = null; // 覆盖让其更易懂

admin.sayHi(); // 噢哟！在 sayHi() 使用了旧的变量名。错误！
```

如果在 `alert` 中以 `this.name` 替换 `user.name`，那么代码就会正常运行。

## “this” 不受限制

在 JavaScript 中，"this" 关键字与大多数其他编程语言中的不同。首先，它可以用于任何函数。

这样的代码没有语法错误：

```js
function sayHi() {
  alert( *!*this*/!*.name );
}
```

`this` 是在运行时求值的。它可以是任何值。

例如，从不同的对象中调用同一个函数可能会有不同的 "this" 值：

```js run
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert( this.name );
}

*!*
// 在两个对象中使用的是相同的函数
user.f = sayHi;
admin.f = sayHi;
*/!*

// 它们调用时有不同的 this 值。
// 函数内部的 "this" 是点之前的这个对象。
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

admin['f'](); // Admin（使用点或方括号语法来访问这个方法，都没有关系。）
```

实际上，我们可以在没有任何对象的情况下调用函数：

```js run
function sayHi() {
  alert(this);
}

sayHi(); // undefined
```

在这种情况下，严格模式下的 `this` 值为 `undefined`。如果我们尝试访问 `this.name`，将会出现错误。

在非严格模式（没有使用 `use strict`）的情况下，`this` 将会是**全局对象**（浏览器中的 `window`，我们稍后会进行讨论）。`"use strict"` 可以修复这个历史行为。

请注意，通常在没有对象的情况下使用 `this` 的函数调用是不常见的，会（导致）编程错误。如果函数中有 `this`，那么通常意味着它是在对象上下文环境中被调用的。

```smart header="The consequences of unbound `this`"
如果你来自其他的编程语言，那么你可能熟悉『绑定 `this`』的概念。在对象定义的方法中，`this` 总是指向该对象。

在 JavaScript 中，`this` 是『自由』的，它的值是在调用时进行求值的，它的值并不取决于方法声明的位置，而是（取决）于在『点之前』的是什么对象。

在运行时对 `this` 求值的这个想法有其优缺点。一方面，函数可以被重用于不同的对象。另一方面，更大的灵活性给错误留下了余地。

这里我们的立场并不是要评判编程语言的这个想法的好坏，而是要了解怎样使用它，如何趋利避害。
```

## 内部：引用类型

```warn header="In-depth language feature"
本文介绍一个进阶的主题，来更好地理解一些特殊情况。

如果你想学得更快，这部分你可以跳过或过后来读。
```

『复杂』的方法调用可能会失去 `this`，比如：

```js run
let user = {
  name: "John",
  hi() { alert(this.name); },
  bye() { alert("Bye"); }
};

user.hi(); // John (the simple call works)

*!*
// 现在我们要判断 name 属性，来决定调用 user.hi 或是 user.bye。
(user.name == "John" ? user.hi : user.bye)(); // Error!
*/!*
```

最后一行中有一个三元运算符，它要判断是 `user.hi` 或 `user.bye`。在这种情况下，结果会是 `user.hi`。

该方法立即被括号 `()` 调用。但它无效。

你可以看到该调用导致了错误，因为调用中的 `"this"` 为 `undefined`。

这样是正确的（对象点方法）：
```js
user.hi();
```

这样没有效果（对方法求值）：
```js
(user.name == "John" ? user.hi : user.bye)(); // 错误！
```

原因是什么？如果我们想了解为什么会这样，那么我们要深入理解 `obj.method()` 调用的原理。

仔细看，我们可能注意到 `obj.method()` 语句中有两个操作符。

1. 首先，点 `'.'` 取得这个 `obj.method` 属性。
2. 其后的括号 `()` 调用它。

那么，`this` 是如何从第一部分传递到第二部分的呢？

如果把这些操作分离开，那么 `this` 肯定会丢失：

```js run
let user = {
  name: "John",
  hi() { alert(this.name); }
}

*!*
// 将赋值与方法调用拆分为两行
let hi = user.hi;
hi(); // 错误，因为 this 未定义
*/!*
```

这里 `hi = user.hi` 把函数赋值给变量，其后的最后一行是完全独立的，所以它没有 `this`。

**为了让 `user.hi()` 有效，JavaScript 用一个技巧 —— 这个 `'.'` 点返回的不是一个函数，而是一种特殊的[引用类型](https://tc39.github.io/ecma262/#sec-reference-specification-type)的值。**

引用类型是一种『规范中有的类型』。我们不能明确地指定它，但是可以在语言内部使用。

引用类型的值是三点的结合 `(base, name, strict)`，如下：

- `base` 是对象。
- `name` 是属性。
- 当 `use strict` 生效，`strict` 为真。

`user.hi` 属性访问的值不是函数，而是引用类型的值。在严格模式下，`user.hi` 是：

```js
// 引用类型值
(user, "hi", true)
```

`()` 被引用类型调用时，将接收关于该对象及其方法的所有信息，并且设定正确的 `this` 值（这里等于 `user`）。

`hi = user.hi` 赋值等其他的操作，将引用类型作为一个整体丢弃，只获取 `user.hi`（一个函数）的值进行传递。因此，进一步操作『失去』了 `this`（值）。

所以如果直接使用点 `obj.method()` 或方括号语法 `obj[method]()`（它们在这里并无差别）调用函数，那么作为结果，`this` 值会以正确的方式进行传递。

## 箭头函数没有自己的 "this"

箭头函数有些特别：它们没有自己的 `this`。如果我们在这样的函数中引用 `this`，`this` 值取决于外部『正常的』函数。

举个例子，这里的 `arrow()` 使用的 `this` 来自外部的 `user.sayHi()` 方法：

```js run
let user = {
  firstName: "Ilya",
  sayHi() {
    let arrow = () => alert(this.firstName);
    arrow();
  }
};

user.sayHi(); // Ilya
```

这是箭头函数的一个特征，当我们并不想要一个独立的 `this` 值，反而想从外部上下文中获取时，它很有用。在后面的章节 <info:arrow-functions> 中我们将更深入地介绍箭头函数。


## 总结

- 存储在对象中函数称之为『方法』。
- 对象执行方法进行『操作』，比如 `object.doSomething()`。
- 方法可以将该对象引用为 `this`。

`this` 的值是在运行时求值的。
- 函数声明使用的 `this` 只有等到调用时才会有值。
- 函数可以在对象之间进行共用。
- 当函数使用『方法』语法 `object.method()` 调用时，调用过程中的 `this` 总是指向 `object`。

请注意箭头函数有些特别：它们没有 `this`。在箭头函数内部访问的都是来自外部的 `this` 值。
