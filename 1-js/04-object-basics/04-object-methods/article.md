# 对象方法，"this"

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

OOP 是一门大学问，本身就是一门有趣的科学。怎样选择合适的实体？如何组织它们之间的交互？这就是架构，有很多关于这方面的书，例如 E. Gamma、R. Helm、R. Johnson 和 J. Vissides 所著的《设计模式：可复用面向对象软件的基础》，G. Booch 所著的《面向对象分析与设计》等。
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

通常，对象方法需要访问对象中存储的信息才能完成其工作。

例如，`user.sayHi()` 中的代码可能需要用到 `user` 的 name 属性。

**为了访问该对象，方法中可以使用 `this` 关键字。**

`this` 的值就是在点之前的这个对象，即调用该方法的对象。

举个例子：

```js run
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    // "this" 指的是“当前的对象”
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

……但这样的代码是不可靠的。如果我们决定将 `user` 复制给另一个变量，例如 `admin = user`，并赋另外的值给 `user`，那么它将访问到错误的对象。

下面这个示例证实了这一点：

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
user = null; // 重写让其更明显

admin.sayHi(); // 噢哟！在 sayHi() 使用了旧的 name 属性！报错！
```

如果我们在 `alert` 中以 `this.name` 替换 `user.name`，那么代码就会正常运行。

## "this" 不受限制

在 JavaScript 中，`this` 关键字与其他大多数编程语言中的不同。JavaScript 中的 `this` 可以用于任何函数。

下面这样的代码没有语法错误：

```js
function sayHi() {
  alert( *!*this*/!*.name );
}
```

`this` 的值是在代码运行时计算出来的，它取决于代码上下文。

例如，这里相同的函数被分配给两个不同的对象，在调用中有着不同的 "this" 值：

```js run
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert( this.name );
}

*!*
// 在两个对象中使用相同的函数
user.f = sayHi;
admin.f = sayHi;
*/!*

// 这两个调用有不同的 this 值
// 函数内部的 "this" 是“点符号前面”的那个对象
user.f(); // John（this == user）
admin.f(); // Admin（this == admin）

admin['f'](); // Admin（使用点符号或方括号语法来访问这个方法，都没有关系。）
```

这个规则很简单：如果 `obj.f()` 被调用了，则 `this` 在 `f` 函数调用期间是 `obj`。所以在上面的例子中 this 先是 `user`，之后是 `admin`。

````smart header="在没有对象的情况下调用：`this == undefined`"
我们甚至可以在没有对象的情况下调用函数：

```js run
function sayHi() {
  alert(this);
}

sayHi(); // undefined
```

在这种情况下，严格模式下的 `this` 值为 `undefined`。如果我们尝试访问 `this.name`，将会报错。

在非严格模式的情况下，`this` 将会是 **全局对象**（浏览器中的 `window`，我们稍后会在 [](info:global-object) 一章中学习它）。这是一个历史行为，`"use strict"` 已经将其修复了。

通常这种调用是程序出错了。如果在一个函数内部有 `this`，那么通常意味着它是在对象上下文环境中被调用的。
````

```smart header="解除 `this` 绑定的后果"
如果你经常使用其他的编程语言，那么你可能已经习惯了“绑定 `this`”的概念，即在对象中定义的方法总是有指向该对象的 `this`。

在 JavaScript 中，`this` 是“自由”的，它的值是在调用时计算出来的，它的值并不取决于方法声明的位置，而是取决于在“点符号前”的是什么对象。

在运行时对 `this` 求值的这个概念既有优点也有缺点。一方面，函数可以被重用于不同的对象。另一方面，更大的灵活性造成了更大的出错的可能。

这里我们的立场并不是要评判编程语言的这个设计是好是坏。而是要了解怎样使用它，如何趋利避害。
```

## 内部：引用类型

```warn header="高阶语言特性"
这一小节介绍了一个进阶主题，来更好地理解一些特殊情况。

如果你想学得更快，这部分你可以跳过或者过后来读。
```

“复杂”的方法调用可能会失去 `this`，例如：

```js run
let user = {
  name: "John",
  hi() { alert(this.name); },
  bye() { alert("Bye"); }
};

user.hi(); // John（简单的调用工作正常）

*!*
// 现在我们要根据 name 来决定调用 user.hi 还是 user.bye。
(user.name == "John" ? user.hi : user.bye)(); // 报错！
*/!*
```

最后一行中有一个三元运算符，用来决定调用 `user.hi` 还是 `user.bye`。在这种情况下，结果会是 `user.hi`。

该方法立即被括号 `()` 调用。但它不能正常工作！

你可以看到该调用导致了错误，因为调用中的 `"this"` 为 `undefined`。

这样能正常工作（对象点方法）：
```js
user.hi();
```

这样不行（对方法求值）：
```js
(user.name == "John" ? user.hi : user.bye)(); // 报错！
```

为什么？如果我们想了解为什么会这样，那么我们要深入理解 `obj.method()` 的调用原理。

仔细看，我们可能注意到 `obj.method()` 语句中有两个操作符。

1. 首先，点符号 `'.'` 取得这个 `obj.method` 属性。
2. 其后的括号 `()` 调用它。

那么，`this` 是怎样被从第一部分传递到第二部分的呢？

如果把这些操作拆分开，那么 `this` 肯定会丢失：

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

这里 `hi = user.hi` 把函数赋值给变量，其后的最后一行代码是完全独立的，所以它没有 `this`。

**为了让 `user.hi()` 有效，JavaScript 用了一个技巧 —— 这个 `'.'` 点符号返回的不是一个函数，而是一种特殊的 [引用类型](https://tc39.github.io/ecma262/#sec-reference-specification-type) 的值。**

引用类型是一种“规范中有的类型”。我们不能明确地指定它，但它被用在编程语言的内部。

引用类型的值是三部分的结合 `(base, name, strict)`，如下：

- `base` 是对象。
- `name` 是属性名。
- 在严格模式 `use strict` 下，`strict` 为真。

属性访问 `user.hi` 的结果不是函数，而是引用类型。在严格模式下的 `user.hi` 是：

```js
// 引用类型值
(user, "hi", true)
```

括号 `()` 调用引用类型时，将接收关于该对象及其方法的所有信息，并且可以设定正确的 `this` 值（这里等于 `user`）。

引用类型是一种特殊的“中间”内部类型，用于将信息从点符号 `.` 传递到调用括号 `()`。

像赋值 `hi = user.hi` 等其他的操作，将引用类型作为一个整体丢弃，只获取 `user.hi`（一个函数）的值进行传递。因此，任何进一步的操作都会“失去” `this`。

因此，结果是，只有使用点符号 `obj.method()` 或方括号语法 `obj[method]()`（它们在这里作用相同）调用函数时，`this` 的值才被正确传递（这里的例子也一样）。在本教程的后面，我们将学习解决此问题的各种方法，例如 [func.bind()](/bind#solution-2-bind)。

## 箭头函数没有自己的 "this"

箭头函数有些特别：它们没有自己的 `this`。如果我们在这样的函数中引用 `this`，`this` 值取决于外部“正常的”函数。

举个例子，这里的 `arrow()` 使用的 `this` 来自于外部的 `user.sayHi()` 方法：

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

这是箭头函数的一个特性，当我们并不想要一个独立的 `this`，反而想从外部上下文中获取时，它很有用。在后面的 <info:arrow-functions> 一章中，我们将深入介绍箭头函数。


## 总结

- 存储在对象属性中的函数被称为“方法”。
- 方法允许对象进行像 `object.doSomething()` 这样的“操作”。
- 方法可以将对象引用为 `this`。

`this` 的值是在程序运行时得到的。
- 一个函数在声明时，可能就使用了 `this`，但是这个 `this` 只有在函数被调用时才会有值。
- 可以在对象之间复制函数。
- 以“方法”的语法调用函数时：`object.method()`，调用过程中的 `this` 值是 `object`。

请注意箭头函数有些特别：它们没有 `this`。在箭头函数内部访问到的 `this` 都是从外部获取的。
