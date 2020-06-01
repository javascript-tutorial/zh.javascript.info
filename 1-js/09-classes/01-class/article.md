
<<<<<<< HEAD
# Class 基本语法

```quote author="Wikipedia"
在面向对象的编程中，*class* 是用于创建对象的可扩展的程序代码模版，它为对象提供了状态（成员变量）的初始值和行为（成员函数或方法）的实现。
```

在日常开发中，我们经常需要创建许多相同类型的对象，例如用户（users）、商品（goods）或者任何其他东西。

正如我们在 <info:constructor-new> 一章中已经学到的，`new function` 可以帮助我们实现这种需求。

但在现代 JavaScript 中，还有一个更高级的“类（class）”构造方式，它引入许多非常棒的新功能，这些功能对于面向对象编程很有用。

## "class" 语法

基本语法是：
```js
class MyClass {
  // class 方法
=======
# Class basic syntax

```quote author="Wikipedia"
In object-oriented programming, a *class* is an extensible program-code-template for creating objects, providing initial values for state (member variables) and implementations of behavior (member functions or methods).
```

In practice, we often need to create many objects of the same kind, like users, or goods or whatever.

As we already know from the chapter <info:constructor-new>, `new function` can help with that.

But in the modern JavaScript, there's a more advanced "class" construct, that introduces great new features which are useful for object-oriented programming.

## The "class" syntax

The basic syntax is:
```js
class MyClass {
  // class methods
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74
  constructor() { ... }
  method1() { ... }
  method2() { ... }
  method3() { ... }
  ...
}
```

<<<<<<< HEAD
然后使用 `new MyClass()` 来创建具有上述列出的所有方法的新对象。

`new` 会自动调用 `constructor()` 方法，因此我们可以在 `constructor()` 中初始化对象。

例如：
=======
Then use `new MyClass()` to create a new object with all the listed methods.

The `constructor()` method is called automatically by `new`, so we can initialize the object there.

For example:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```js run
class User {

  constructor(name) {
    this.name = name;
  }

  sayHi() {
    alert(this.name);
  }

}

<<<<<<< HEAD
// 用法：
=======
// Usage:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74
let user = new User("John");
user.sayHi();
```

<<<<<<< HEAD
当 `new User("John")` 被调用：
1. 一个新对象被创建。
2. `constructor` 使用给定的参数运行，并为其分配 `this.name`。

……然后我们就可以调用对象方法了，例如 `user.sayHi`。


```warn header="类的方法之间没有逗号"
对于新手开发人员来说，常见的陷阱是在类的方法之间放置逗号，这会导致语法错误。

不要把这里的符号与对象字面量相混淆。在类中，不需要逗号。
```

## 什么是 class？

所以，`class` 到底是什么？正如人们可能认为的那样，这不是一个全新的语言级实体。

让我们揭开其神秘面纱，看看类究竟是什么。这将有助于我们理解许多复杂的方面。

在 JavaScript 中，类是一种函数。

看看下面这段代码：
=======
When `new User("John")` is called:
1. A new object is created.
2. The `constructor` runs with the given argument and assigns `this.name` to it.

...Then we can call object methods, such as `user.sayHi()`.


```warn header="No comma between class methods"
A common pitfall for novice developers is to put a comma between class methods, which would result in a syntax error.

The notation here is not to be confused with object literals. Within the class, no commas are required.
```

## What is a class?

So, what exactly is a `class`? That's not an entirely new language-level entity, as one might think.

Let's unveil any magic and see what a class really is. That'll help in understanding many complex aspects.

In JavaScript, a class is a kind of function.

Here, take a look:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```js run
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

<<<<<<< HEAD
// 佐证：User 是一个函数
=======
// proof: User is a function
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74
*!*
alert(typeof User); // function
*/!*
```

<<<<<<< HEAD
`class User {...}` 构造实际上做了如下的事儿：

1. 创建一个名为 `User` 的函数，该函数成为类声明的结果。该函数的代码来自于 `constructor` 方法（如果我们不编写这种方法，那么它就被假定为空）。
2. 存储类中的方法，例如 `User.prototype` 中的 `sayHi`。

当 `new User` 对象被创建后，当我们调用其方法时，它会从原型中获取对应的方法，正如我们在 <info:function-prototype> 一章中所讲的那样。因此，对象 `new User` 可以访问类中的方法。

我们可以将 `class User` 声明的结果解释为：

![](class-user.svg)

下面这些代码很好地解释了它们：
=======
What `class User {...}` construct really does is:

1. Creates a function named `User`, that becomes the result of the class declaration. The function code is taken from the `constructor` method (assumed empty if we don't write such method).
2. Stores class methods, such as `sayHi`, in `User.prototype`.

After `new User` object is created, when we call its method, it's taken from the prototype, just as described in the chapter <info:function-prototype>. So the object has access to class methods.

We can illustrate the result of `class User` declaration as:

![](class-user.svg)

Here's the code to introspect it:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```js run
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

<<<<<<< HEAD
// class 是函数 function
alert(typeof User); // function

// ...或者，更确切地说，是构造器方法
alert(User === User.prototype.constructor); // true

// 方法在 User.prototype 中，例如：
alert(User.prototype.sayHi); // alert(this.name);

// 在原型中实际上有两个方法
alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
```

## 不仅仅是语法糖

人们常说 `class` 是一个语法糖（旨在使内容更易阅读，但不引入任何新内容的语法），因为我们实际上可以在没有 `class` 的情况下声明相同的内容：

```js run
// 用纯函数重写 class User

// 1. 创建构造器函数
function User(name) {
  this.name = name;
}
// 任何函数原型默认都具有构造器属性，
// 所以，我们不需要创建它

// 2. 将方法添加到原型
=======
// class is a function
alert(typeof User); // function

// ...or, more precisely, the constructor method
alert(User === User.prototype.constructor); // true

// The methods are in User.prototype, e.g:
alert(User.prototype.sayHi); // alert(this.name);

// there are exactly two methods in the prototype
alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
```

## Not just a syntactic sugar

Sometimes people say that `class` is a "syntactic sugar" (syntax that is designed to make things easier to read, but doesn't introduce anything new), because we could actually declare the same without `class` keyword at all:

```js run
// rewriting class User in pure functions

// 1. Create constructor function
function User(name) {
  this.name = name;
}
// a function prototype has "constructor" property by default,
// so we don't need to create it

// 2. Add the method to prototype
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74
User.prototype.sayHi = function() {
  alert(this.name);
};

<<<<<<< HEAD
// 用法：
=======
// Usage:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74
let user = new User("John");
user.sayHi();
```

<<<<<<< HEAD
这个定义的结果与使用类得到的结果基本相同。因此，这确实是将 `class` 视为一种定义构造器及其原型方法的语法糖的理由。

尽管，它们之间存在着重大差异：

1. 首先，通过 `class` 创建的函数具有特殊的内部属性标记 `[[FunctionKind]]:"classConstructor"`。因此，它与手动创建并不完全相同。

    不像普通函数，调用类构造器时必须要用 `new` 关键词：
=======
The result of this definition is about the same. So, there are indeed reasons why `class` can be considered a syntactic sugar to define a constructor together with its prototype methods.

Still, there are important differences.

1. First, a function created by `class` is labelled by a special internal property `[[FunctionKind]]:"classConstructor"`. So it's not entirely the same as creating it manually.

    The language checks for that property in a variety of places. For example, unlike a regular function, it must be called with `new`:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

    ```js run
    class User {
      constructor() {}
    }

    alert(typeof User); // function
    User(); // Error: Class constructor User cannot be invoked without 'new'
    ```

<<<<<<< HEAD
    此外，大多数 JavaScript 引擎中的类构造器的字符串表示形式都以 "class..." 开头
=======
    Also, a string representation of a class constructor in most JavaScript engines starts with the "class..."
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

    ```js run
    class User {
      constructor() {}
    }

    alert(User); // class User { ... }
    ```
<<<<<<< HEAD

2. 类方法不可枚举。
    类定义将 `"prototype"` 中的所有方法的 `enumerable` 标志设置为 `false`。

    这很好，因为如果我们对一个对象调用 `for..in` 方法，我们通常不希望 class 方法出现。

3. 类总是使用 `use strict`。
    在类构造中的所有代码都将自动进入严格模式。

此外，`class` 语法还带来了许多其他功能，我们稍后将会探索它们。

## 类表达式

就像函数一样，类可以在另外一个表达式中被定义，被传递，被返回，被赋值等。

这是一个类表达式的例子：
=======
    There are other differences, we'll see them soon.

2. Class methods are non-enumerable.
    A class definition sets `enumerable` flag to `false` for all methods in the `"prototype"`.

    That's good, because if we `for..in` over an object, we usually don't want its class methods.

3. Classes always `use strict`.
    All code inside the class construct is automatically in strict mode.

Besides, `class` syntax brings many other features that we'll explore later.

## Class Expression

Just like functions, classes can be defined inside another expression, passed around, returned, assigned, etc.

Here's an example of a class expression:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```js
let User = class {
  sayHi() {
    alert("Hello");
  }
};
```

<<<<<<< HEAD
类似于命名函数表达式（Named Function Expressions），类表达式可能也应该有一个名字。

如果类表达式有名字，那么该名字仅在类内部可见：

```js run
// “命名类表达式（Named Class Expression）”
// (规范中没有这样的术语，但是它和命名函数表达式类似)
let User = class *!*MyClass*/!* {
  sayHi() {
    alert(MyClass); // MyClass 这个名字仅在类内部可见
  }
};

new User().sayHi(); // 正常运行，显示 MyClass 中定义的内容

alert(MyClass); // error，MyClass 在外部不可见
```


我们甚至可以动态地“按需”创建类，就像这样：

```js run
function makeClass(phrase) {
  // 声明一个类并返回它
=======
Similar to Named Function Expressions, class expressions may have a name.

If a class expression has a name, it's visible inside the class only:

```js run
// "Named Class Expression"
// (no such term in the spec, but that's similar to Named Function Expression)
let User = class *!*MyClass*/!* {
  sayHi() {
    alert(MyClass); // MyClass name is visible only inside the class
  }
};

new User().sayHi(); // works, shows MyClass definition

alert(MyClass); // error, MyClass name isn't visible outside of the class
```

We can even make classes dynamically "on-demand", like this:

```js run
function makeClass(phrase) {
  // declare a class and return it
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74
  return class {
    sayHi() {
      alert(phrase);
    };
  };
}

<<<<<<< HEAD
// 创建一个新的类
=======
// Create a new class
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74
let User = makeClass("Hello");

new User().sayHi(); // Hello
```


<<<<<<< HEAD
## Getters/setters 及其他速记

就像对象字面量，类可能包括 getters/setters，计算属性（computed properties）等。

这是一个使用 `get/set` 实现 `user.name` 的示例：
=======
## Getters/setters

Just like literal objects, classes may include getters/setters, computed properties etc.

Here's an example for `user.name` implemented using `get/set`:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```js run
class User {

  constructor(name) {
<<<<<<< HEAD
    // 调用 setter
=======
    // invokes the setter
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74
    this.name = name;
  }

*!*
  get name() {
*/!*
    return this._name;
  }

*!*
  set name(value) {
*/!*
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

}

let user = new User("John");
alert(user.name); // John

user = new User(""); // Name is too short.
```

<<<<<<< HEAD
类声明在 `User.prototype` 中创建 getters 和 setters，就像这样：

```js
Object.defineProperties(User.prototype, {
  name: {
    get() {
      return this._name
    },
    set(name) {
      // ...
    }
  }
});
```

这是一个 `[...]` 中有计算属性名称（computed property name）的例子：
=======
Technically, such class declaration works by creating getters and setters in `User.prototype`.

## Computed names [...]

Here's an example with a computed method name using brackets `[...]`:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```js run
class User {

*!*
  ['say' + 'Hi']() {
*/!*
    alert("Hello");
  }

}

new User().sayHi();
```

<<<<<<< HEAD
## Class 字段

```warn header="旧的浏览器可能需要 polyfill"
类字段（field）是最近才添加到语言中的。
```

之前，类仅具有方法。

“类字段”是一种允许添加任何属性的语法。

例如，让我们在 `class User` 中添加一个 `name` 属性：
=======
Such features are easy to remember, as they resemble that of literal objects.

## Class fields

```warn header="Old browsers may need a polyfill"
Class fields are a recent addition to the language.
```

Previously, our classes only had methods.

"Class fields" is a syntax that allows to add any properties.

For instance, let's add `name` property to `class User`:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```js run
class User {
*!*
<<<<<<< HEAD
  name = "Anonymous";
=======
  name = "John";
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74
*/!*

  sayHi() {
    alert(`Hello, ${this.name}!`);
  }
}

<<<<<<< HEAD
new User().sayHi();

alert(User.prototype.sayHi); // 被放在 User.prototype 中
alert(User.prototype.name); // undefined，没有被放在 User.prototype 中
```

关于类字段的重要一点是，它们设置在单个对象上的，而不是设置在 `User.prototype` 上的。

从技术上讲，它们是在 constructor 完成工作后被处理的。

### 使用类字段制作绑定方法

正如 <info:bind> 一章中所讲的，JavaScript 中的函数具有动态的 `this`。它取决于调用上下文。

因此，如果一个对象方法被传递到某处，或者在另一个上下文中被调用，则 `this` 将不再是对其对象的引用。

例如，此代码将显示 `undefined`：
=======
new User().sayHi(); // Hello, John!
```

So, we just write "<property name> = <value>" in the declaration, and that's it.

The important difference of class fields is that they are set on individual objects, not `User.prototype`:

```js run
class User {
*!*
  name = "John";
*/!*
}

let user = new User();
alert(user.name); // John
alert(User.prototype.name); // undefined
```

Technically, they are processed after the constructor has done it's job, and we can use for them complex expressions and function calls:

```js run
class User {
*!*
  name = prompt("Name, please?", "John");
*/!*
}

let user = new User();
alert(user.name); // John
```

### Making bound methods with class fields

As demonstrated in the chapter <info:bind> functions in JavaScript have a dynamic `this`. It depends on the context of the call.

So if an object method is passed around and called in another context, `this` won't be a reference to its object any more.

For instance, this code will show `undefined`:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```js run
class Button {
  constructor(value) {
    this.value = value;
  }

  click() {
    alert(this.value);
  }
}

let button = new Button("hello");

*!*
setTimeout(button.click, 1000); // undefined
*/!*
```

<<<<<<< HEAD
这个问题被称为“丢失 `this`”。

我们在 <info:bind> 一章中讲过，有两种可以修复它的方式：

1. 传递一个包装函数，例如 `setTimeout(() => button.click(), 1000)`。
2. 将方法绑定到对象，例如在 constructor 中：
=======
The problem is called "losing `this`".

There are two approaches to fixing it, as discussed in the chapter <info:bind>:

1. Pass a wrapper-function, such as `setTimeout(() => button.click(), 1000)`.
2. Bind the method to object, e.g. in the constructor:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```js run
class Button {
  constructor(value) {
    this.value = value;
*!*
    this.click = this.click.bind(this);
*/!*
  }

  click() {
    alert(this.value);
  }
}

let button = new Button("hello");

*!*
setTimeout(button.click, 1000); // hello
*/!*
```

<<<<<<< HEAD
类字段为后一种解决方案提供了更优雅的语法：
=======
Class fields provide a more elegant syntax for the latter solution:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```js run
class Button {
  constructor(value) {
    this.value = value;
  }
*!*
  click = () => {
    alert(this.value);
  }
*/!*
}

let button = new Button("hello");

setTimeout(button.click, 1000); // hello
```

<<<<<<< HEAD
类字段 `click = () => {...}` 在每个 `Button` 对象上创建一个独立的函数，并将 `this` 绑定到该对象上。然后，我们可以将 `button.click` 传递到任何地方，并且它会被以正确的 `this` 进行调用。

这在浏览器环境中，当我们需要将一个方法设置为事件监听器时尤其有用。

## 总结

基本的类语法看起来像这样：

```js
class MyClass {
  prop = value; // 属性

  constructor(...) { // 构造器
=======
The class field `click = () => {...}` creates an independent function on each `Button` object, with `this` bound to the object. Then we can pass `button.click` around anywhere, and it will be called with the right `this`.

That's especially useful in browser environment, when we need to setup a method as an event listener.

## Summary

The basic class syntax looks like this:

```js
class MyClass {
  prop = value; // property

  constructor(...) { // constructor
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74
    // ...
  }

  method(...) {} // method

<<<<<<< HEAD
  get something(...) {} // getter 方法
  set something(...) {} // setter 方法 

  [Symbol.iterator]() {} // 有计算名称（computed name）的方法（此处为 symbol）
=======
  get something(...) {} // getter method
  set something(...) {} // setter method

  [Symbol.iterator]() {} // method with computed name (symbol here)
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74
  // ...
}
```

<<<<<<< HEAD
技术上来说，`MyClass` 是一个函数（我们提供作为 `constructor` 的那个），而 methods、getters 和 settors 都被写入了 `MyClass.prototype`。

在下一章，我们将会进一步学习类的相关知识，包括继承和其他功能。
=======
`MyClass` is technically a function (the one that we provide as `constructor`), while methods, getters and setters are written to `MyClass.prototype`.

In the next chapters we'll learn more about classes, including inheritance and other features.
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74
