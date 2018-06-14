# 构造函数和操作符 "new"

常规的 `{...}` 语法允许创建一个对象。但是我们经常需要创建许多类似的对象，例如多个用户或菜单项等等。

这可以使用构造函数和 `"new"` 操作符。

## 构造函数

构造函数在技术上是常规函数。不过有两个约定：

1. 他们首先用大写字母命名。
2. 它们只能用 `"new"` 操作符来执行。

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

当一个函数作为 `new User(...)`执行时，它执行以下步骤：

1. 一个新的空对象被创建并分配给 `this`。
2. 函数体执行。通常它会修改 `this`，为其添加新的属性。
3. 返回 `this` 的值。

换句话说，`new User(...)` 做类似的事情：

```js
function User(name) {
*!*
  // this = {};  (隐式创建)
*/!*

  // 添加属性到 this
  this.name = name;
  this.isAdmin = false;

*!*
  // return this;  (隐式返回)
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

现在，如果我们想创建其他用户，我们可以调用 `new User("Ann")`，`new User("Alice")` 等等。比每次使用文字要短得多，而且易于阅读。

这是构造函数的主要目的 -- 实现可重用的对象创建代码

让我们再次注意 -- 从技术上讲，任何函数都可以用作构造函数。即：任何函数都可以运行 `new`，它会执行上面的算法。 “首字母大写”是一个共同的约定，以明确表示一个函数将被运行 `new`，

````smart header="new function() { ... }"
如果我们有许多关于创建单个复杂对象的代码行，我们可以将它们封装在构造函数中，如下所示：

```js
let user = new function() {
  this.name = "John";
  this.isAdmin = false;

  // ...用户创建的其他代码
  // 也许是复杂的逻辑和陈述
  // 局部变量等
};
```

构造函数不能被再次调用，因为它不保存在任何地方，只是被创建和调用。所以这个技巧的目的是封装构建单个对象的代码，而不是将来重用。
````

## 双语法构造函数：new.target

在一个函数内部，我们可以使用 `new.target` 属性来检查它是用 `new` 还是不用它来调用。

常规调用为空，如果通过 `new` 调用，则等于函数：

```js run
function User() {
  alert(new.target);
}

// 不带 new：
User(); // undefined

// 带 new：
new User(); // function User { ... }
```

这可以使 `new` 和常规语法的工作原理相同：

```js run
function User(name) {
  if (!new.target) { // 如果你没有运行 new
    return new User(name); // ...会为你添加 new
  }

  this.name = name;
}

let john = User("John"); // 重新调用 new User
alert(john.name); // John
```

这种方法有时用在库中以使语法更加灵活。但因为省略 `new` 使得它不易阅读，这可不是一件好事。 而通过 `new` 我们可以都知道这个新对象正在创建。

## Return from constructors

通常，构造函数没有 `return` 语句。他们的任务是将所有必要的东西写入 `this`，并自动转换。

但是，如果有 `return` 语句，那么规则很简单：

- If `return` is called with object, then it is returned instead of `this`.
- If `return` is called with a primitive, it's ignored.

In other words, `return` with an object returns that object, in all other cases `this` is returned.

For instance, here `return` overrides `this` by returning an object:

```js run
function BigUser() {

  this.name = "John";

  return { name: "Godzilla" };  // <-- returns an object
}

alert( new BigUser().name );  // Godzilla, got that object ^^
```

And here's an example with an empty `return` (or we could place a primitive after it, doesn't matter):

```js run
function SmallUser() {

  this.name = "John";

  return; // finishes the execution, returns this

  // ...

}

alert( new SmallUser().name );  // John
```

Usually constructors don't have a `return` statement. Here we mention the special behavior with returning objects mainly for the sake of completeness.

````smart header="Omitting parentheses"
By the way, we can omit parentheses after `new`, if it has no arguments:

```js
let user = new User; // <-- no parentheses
// same as
let user = new User();
```

Omitting parentheses here is not considered a "good style", but the syntax is permitted by specification.
````

## Methods in constructor

Using constructor functions to create objects gives a great deal of flexibility. The constructor function may have parameters that define how to construct the object, and what to put in it.

Of course, we can add to `this` not only properties, but methods as well.

For instance, `new User(name)` below creates an object with the given `name` and the method `sayHi`:

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

## Summary

- Constructor functions or, briefly, constructors, are regular functions, but there's a common agreement to name them with capital letter first.
- Constructor functions should only be called using `new`. Such a call implies a creation of empty `this` at the start and returning the populated one at the end.

We can use constructor functions to make multiple similar objects.

JavaScript provides constructor functions for many built-in language objects: like `Date` for dates, `Set` for sets and others that we plan to study.

```smart header="Objects, we'll be back!"
In this chapter we only cover the basics about objects and constructors. They are essential for learning more about data types and functions in the next chapters.

After we learn that, in the chapter <info:object-oriented-programming> we return to objects and cover them in-depth, including inheritance and classes.
```
