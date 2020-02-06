# 构造函数和操作符 "new"

常规的 `{...}` 语法允许创建一个对象。但是我们经常需要创建许多类似的对象，例如多个用户或菜单项等。

这可以使用构造函数和 `"new"` 操作符来实现。

## 构造函数

构造函数在技术上是常规函数。不过有两个约定：

1. 它们的命名以大写字母开头。
2. 它们只能由 `"new"` 操作符来执行。

例如：

```js run
function User(name) {
  this.name = name;
  this.isAdmin = false;
}

*!*
let user = new User("Jack");
*/!*

alert(user.name); // Jack
alert(user.isAdmin); // false
```

当一个函数被使用 `new` 操作符执行时，它按照以下步骤：

1. 一个新的空对象被创建并分配给 `this`。
2. 函数体执行。通常它会修改 `this`，为其添加新的属性。
3. 返回 `this` 的值。

换句话说，`new User(...)` 做的就是类似的事情：

```js
function User(name) {
*!*
  // this = {};（隐式创建）
*/!*

  // 添加属性到 this
  this.name = name;
  this.isAdmin = false;

*!*
  // return this;（隐式返回）
*/!*
}
```

所以 `new User("Jack")` 的结果是相同的对象：

```js
let user = {
  name: "Jack",
  isAdmin: false
};
```

现在，如果我们想创建其他用户，我们可以调用 `new User("Ann")`，`new User("Alice")` 等。比每次都使用字面量创建要短得多，而且更易于阅读。

这是构造函数的主要目的 — 实现可重用的对象创建代码。

让我们再强调一遍 — 从技术上讲，任何函数都可以用作构造函数。即：任何函数都可以通过 `new` 来运行，它会执行上面的算法。“首字母大写”是一个共同的约定，以明确表示一个函数将被使用 `new` 来运行。

````smart header="new function() { ... }"
如果我们有许多行用于创建单个复杂对象的代码，我们可以将它们封装在构造函数中，像这样：

```js
let user = new function() {
  this.name = "John";
  this.isAdmin = false;

  // ……用于用户创建的其他代码
  // 也许是复杂的逻辑和语句
  // 局部变量等
};
```

构造函数不能被再次调用，因为它不保存在任何地方，只是被创建和调用。因此，这个技巧旨在封装构建单个对象的代码，而无需将来重用。
````

## 双语法构造函数：new.target

```smart header="进阶内容"
本节涉及的语法内容很少使用，除非你想了解所有内容，否则你可以直接跳过该语法。
```

在一个函数内部，我们可以使用 `new.target` 属性来检查它是否被使用 `new` 进行调用了。

对于常规调用，它为空，对于使用 `new` 的调用，则等于该函数：

```js run
function User() {
  alert(new.target);
}

// 不带 "new"：
*!*
User(); // undefined
*/!*

// 带 "new"：
*!*
new User(); // function User { ... }
*/!*
```

它可以被用在函数内部，来判断该函数是被通过 `new` 调用的“构造函数模式”，还是没被通过 `new` 调用的“常规模式”。

我们也可以让 `new` 调用和常规调用做相同的工作，像这样：

```js run
function User(name) {
  if (!new.target) { // 如果你没有通过 new 运行我
    return new User(name); // ……我会给你添加 new
  }

  this.name = name;
}

let john = User("John"); // 将调用重定向到新用户
alert(john.name); // John
```

这种方法有时被用在库中以使语法更加灵活。这样人们在调用函数时，无论是否使用了 `new`，程序都能工作。

不过，到处都使用它并不是一件好事，因为省略了 `new` 使得很难观察到代码中正在发生什么。而通过 `new` 我们都可以知道这创建了一个新对象。

## 构造函数的 Return

通常，构造函数没有 `return` 语句。它们的任务是将所有必要的东西写入 `this`，并自动转换为结果。

但是，如果这有一个 `return` 语句，那么规则就简单了：

- 如果 `return` 返回的是一个对象，则返回这个对象，而不是 `this`。
- 如果 `return` 返回的是一个原始类型，则忽略。

换句话说，带有对象的 `return` 返回该对象，在所有其他情况下返回 `this`。

例如，这里 `return` 通过返回一个对象覆盖 `this`：

```js run
function BigUser() {

  this.name = "John";

  return { name: "Godzilla" };  // <-- 返回这个对象
}

alert( new BigUser().name );  // Godzilla，得到了那个对象
```

这里有一个 `return` 为空的例子（或者我们可以在它之后放置一个原始类型，没有什么影响）：

```js run
function SmallUser() {

  this.name = "John";

  return; // <-- 返回 this
}

alert( new SmallUser().name );  // John
```

通常构造函数没有 `return` 语句。这里我们主要为了完整性而提及返回对象的特殊行为。

````smart header="省略括号"
顺便说一下，如果没有参数，我们可以省略 `new` 后的括号：

```js
let user = new User; // <-- 没有参数
// 等同于
let user = new User();
```

这里省略括号不被认为是一种“好风格”，但是规范允许使用该语法。
````

## 构造函数中的方法

使用构造函数来创建对象会带来很大的灵活性。构造函数可能有一些参数，这些参数定义了如何构造对象以及要放入什么。

当然，我们不仅可以将属性添加到 `this` 中，还可以添加方法。

例如，下面的 `new User(name)` 用给定的 `name` 和方法 `sayHi` 创建了一个对象：

```js run
function User(name) {
  this.name = name;

  this.sayHi = function() {
    alert( "My name is: " + this.name );
  };
}

*!*
let john = new User("John");

john.sayHi(); // My name is: John
*/!*

/*
john = {
   name: "John",
   sayHi: function() { ... }
}
*/
```

[类](info:classes) 是用于创建复杂对象的一个更高级的语法，我们稍后会讲到。

## 总结

- 构造函数，或简称构造器，就是常规函数，但大家对于构造函数有个共同的约定，就是其命名首字母要大写。
- 构造函数只能使用 `new` 来调用。这样的调用意味着在开始时创建了空的 `this`，并在最后返回填充了值的 `this`。

我们可以使用构造函数来创建多个类似的对象。

JavaScript 为许多内置的对象提供了构造函数：比如日期 `Date`、集合 `Set` 以及其他我们计划学习的内容。

```smart header="对象，我们还会回来哒！"
在本章中，我们只介绍了关于对象和构造函数的基础知识。它们对于我们在下一章中，学习更多关于数据类型和函数的相关知识非常重要。

在我们学习了那些之后，我们将回到对象，在 <info:prototypes> 和 <info:classes> 章节中深入介绍它们。
```
