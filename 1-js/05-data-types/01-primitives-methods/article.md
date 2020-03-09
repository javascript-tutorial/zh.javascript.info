# 原始（primitive）类型的方法

<<<<<<< HEAD
JavaScript 允许我们像使用对象一样使用原始类型（字符串，数字等）。JavaScript 还提供了这样的调用方法。我们很快就会学习它们，但是首先我们将了解它的工作原理，毕竟基本类型不是对象（在这里我们会分析的更加清楚）。

我们来看看基原始类型和对象之间的关键区别。

一个原始值
=======
JavaScript allows us to work with primitives (strings, numbers, etc.) as if they were objects. They also provide methods to call as such. We will study those soon, but first we'll see how it works because, of course, primitives are not objects (and here we will make it even clearer).

Let's look at the key distinctions between primitives and objects.
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

- 是原始类型中的一种值。
- 在 JavaScript 中有 7 种原始类型：`string`、`number`、`bigint`、`boolean`、`symbol`、`null` 和 `undefined`。

<<<<<<< HEAD
一个对象

- 能够存储多个值作为属性。
- 可以使用大括号 `{}` 创建对象，例如：`{name: "John", age: 30}`。JavaScript 中还有其他种类的对象，例如函数就是对象。

关于对象的最好的事儿之一是，我们把一个函数作为对象的属性存储到对象中。
=======
- Is a value of a primitive type.
- There are 7 primitive types: `string`, `number`, `bigint`, `boolean`, `symbol`, `null` and `undefined`.

An object

- Is capable of storing multiple values as properties.
- Can be created with `{}`, for instance: `{name: "John", age: 30}`. There are other kinds of objects in JavaScript: functions, for example, are objects.

One of the best things about objects is that we can store a function as one of its properties.
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

```js run
let john = {
  name: "John",
  sayHi: function() {
    alert("Hi buddy!");
  }
};

john.sayHi(); // Hi buddy!
```

所以我们在这里创建了一个包含 `sayHi` 方法的对象 `john`。

<<<<<<< HEAD
许多内置对象已经存在，例如那些处理日期、错误、HTML 元素等的内置对象。它们具有不同的属性和方法。
=======
Many built-in objects already exist, such as those that work with dates, errors, HTML elements, etc. They have different properties and methods.
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

但是，这些特性都是有成本的！

<<<<<<< HEAD
对象比原始类型“更重”。他们需要额外的资源来支持运作。
=======
Objects are "heavier" than primitives. They require additional resources to support the internal machinery.
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

## 当作对象的原始类型

以下是 JavaScript 创建者面临的悖论：

- 人们可能想对诸如字符串或数字之类的原始类型执行很多操作。最好将它们作为方法来访问。
- 原始类型必须尽可能的简单轻量。

而解决方案看起来多少有点尴尬，如下：

<<<<<<< HEAD
1. 原始类型仍然是原始的。与预期相同，提供单个值
2. JavaScript 允许访问字符串，数字，布尔值和符号的方法和属性。
3. 为了使它们起作用，创建了提供额外功能的特殊“对象包装器”，行后即被销毁。
=======
1. Primitives are still primitive. A single value, as desired.
2. The language allows access to methods and properties of strings, numbers, booleans and symbols.
3. In order for that to work, a special "object wrapper" that provides the extra functionality is created, and then is destroyed.
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

“对象包装器”对于每种原始类型都是不同的，它们被称为 `String`、`Number`、`Boolean` 和 `Symbol`。因此，他们提供了不同的方法。

<<<<<<< HEAD
例如，字符串方法 [str.toUpperCase()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase) 返回一个大写化处理的字符串。
=======
For instance, there exists a string method [str.toUpperCase()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase) that returns a capitalized `str`.
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

用法演示如下：

```js run
let str = "Hello";

alert( str.toUpperCase() ); // HELLO
```

很简单，对吧？以下是 `str.toUpperCase()` 中实际发生的情况：

1. 字符串 `str` 是一个原始值。因此，在访问其属性时，会创建一个包含字符串字面值的特殊对象，并且具有有用的方法，例如 `toUpperCase()`。
2. 该方法运行并返回一个新的字符串（由 `alert` 显示）。
3. 特殊对象被销毁，只留下原始值 `str`。

所以原始类型可以提供方法，但它们依然是轻量级的。

JavaScript 引擎高度优化了这个过程。它甚至可能跳过创建额外的对象。但是它仍然必须遵守规范，并且表现得好像它创造了一样。

数字有其自己的方法，例如，[toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) 将数字四舍五入到给定的精度：

```js run
let n = 1.23456;

alert( n.toFixed(2) ); // 1.23
```

我们将在后面 <info:number> 和 <info:string> 章节中看到更多具体的方法。


<<<<<<< HEAD
````warn header="构造函数 `String/Number/Boolean` 仅供内部使用"
像 Java 这样的一些语言允许我们使用 `new Number(1)` 或 `new Boolean(false)` 等语法，明确地为原始类型创建“对象包装器”。
=======
````warn header="Constructors `String/Number/Boolean` are for internal use only"
Some languages like Java allow us to explicitly create "wrapper objects" for primitives using a syntax like `new Number(1)` or `new Boolean(false)`.
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

在 JavaScript 中，由于历史原因，这也是可以的，但极其 **不推荐**。因为这样会出问题。

例如：

```js run
alert( typeof 0 ); // "number"

alert( typeof new Number(0) ); // "object"!
```

<<<<<<< HEAD
对象在 `if` 中始终是 `true`，因此此处的 alert 将显示：
=======
Objects are always truthy in `if`, so here the alert will show up:
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

```js run
let zero = new Number(0);

<<<<<<< HEAD
if (zero) { // zero 为 true，因为它是一个对象
  alert( "zero is truthy?!?" );
=======
if (zero) { // zero is true, because it's an object
  alert( "zero is truthy!?!" );
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a
}
```

另一方面，调用不带 `new`（关键字）的 `String/Number/Boolean` 函数是完全理智和有用的。它们将一个值转换为相应的类型：转成字符串、数字或布尔值（原始类型）。

例如，下面完全是有效的：
```js
let num = Number("123"); // 将字符串转成数字
```
````


````warn header="null/undefined 没有任何方法"
特殊的原始类型 `null` 和 `undefined` 是例外。它们没有对应的“对象包装器”，也没有提供任何方法。从某种意义上说，它们是“最原始的”。

尝试访问这种值的属性会导致错误：

```js run
alert(null.test); // error
````

## 总结

- 除 `null` 和 `undefined` 以外的原始类型都提供了许多有用的方法。我们将在即将到来的章节中研究这些内容。
- 从形式上讲，这些方法通过临时对象工作，但 JavaScript 引擎可以很好地调整以在内部对齐进行优化，因此调用它们并不需要太高的成本。
