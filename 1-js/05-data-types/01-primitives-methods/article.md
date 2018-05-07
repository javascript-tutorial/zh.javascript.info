# 基本类型的方法

JavaScript 允许我们像对象一样使用基本类型（字符串，数字等）。

基本类型还提供调用方法等。我们会尽快研究这些，但首先我们会看看它是如何工作的，毕竟基本类型不是对象（在这里我们会更加清楚）。

我们来看看基本类型和对象之间的关键区别。

基本类型

对象
：能够将多个值存储为属性。
可以用 `{}` 创建，例如：`{name: "John", age: 30}`。JavaScript 中还有其他种类的对象，例如函数就是对象。

关于对象的最好的事情之一是我们可以存储一个函数作为它的一个属性：

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

许多内置对象已经存在，例如那些与日期，错误，HTML 元素等一起工作的内置对象。它们具有不同的属性和方法。

但是，这些特性都是有成本的！

对象比基本对象“更重”。他们需要额外的资源来支持运作。但是，由于属性和方法在编程中非常有用，JavaScript 引擎会尝试优化它们以减少额外的负担。

## 作为对象的基本类型

以下是 JavaScript 创建者面临的悖论：

- 有很多事情需要用像字符串或数字这样的基本类型来完成。这样要比直接访问他们方法要好。
- 基本类型必须尽可能的精简快速。

该解决方案看起来有点尴尬，是：

1. 基本类型仍然是原始数据。根据需要提供单个值。
2. JavaScript 允许访问字符串，数字，布尔值和符号的方法和属性。
3. 当触发这种情况时，会创建一个特殊的“包装对象”，它提供额外的功能，运行后即被销毁。

“包装对象”对于每种基本类型调用都是不同的，如`String`, `Number`, `Boolean` 和 `Symbol`。因此，他们提供了不同的方法。

例如，方法 [str.toUpperCase()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase) 返回一个大写的字符串。

以下是它的工作原理：

```js run
let str = "Hello";

alert( str.toUpperCase() ); // HELLO
```

很简单，对吧？以下是 `str.toUpperCase()` 实际发生的情况：

1. 字符串 `str` 是一个基本类型。所以在访问它的属性时，会创建一个已知字符串值的特殊对象，并且具有有用的方法，例如 `toUpperCase()`。
2. 该方法运行并返回一个新的字符串（由 `alert` 显示）。
3. 特殊对象被销毁，只留下基本类型 `str`。

所以基本类型可以提供方法，但它们依然是轻量级的。

JavaScript 引擎高度优化了这个过程。它甚至可能跳过创建额外的对象。但是它仍然必须遵守规范，并且表现得好像它创造了一样。

数字有其自己的方法，例如，[toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) 将数字四舍五入到给定的精度：

```js run
let n = 1.23456;

alert( n.toFixed(2) ); // 1.23
```

我们将在后面章节中看到更具体的方法 <info:number> 和 <info:string>。


````warn header="Constructors `String/Number/Boolean` are for internal use only"
像 Java 这样的一些语言允许我们使用 `new Number(1)` 或 `new Boolean(false)` 等语法明确地为基本类型创建“包装对象”。

在 JavaScript 中，由于历史原因，这也是可以的，但极其**不推荐**。因为这样会出问题。

例如：

```js run
alert( typeof 1 ); // "number"

alert( typeof new Number(1) ); // "object"!
```

同样的，`zero`，是一个对象，alert 将显示出来：

```js run
let zero = new Number(0);

if (zero) { // zero is true, because it's an object
  alert( "zero is truthy?!?" );
}
```

另一方面，不使用 `new` 的 `String/Number/Boolean` 是一个明智的选择。它们将一个值转换为相应的类型：转成 string，number，或  boolean（原始类型）。

例如，下面完全是有效的：
```js
let num = Number("123"); // convert a string to number
```
````


````warn header="null/undefined have no methods"
特殊的基本类型 `null` 和 `undefined` 是个例外。他们没有相应的“包装对象”，并没有提供任何方法。从某种意义上说，他们是“最原始的”。

尝试访问这种值的属性会导致错误：

```js run
alert(null.test); // error
````

## 总结

- 除 `null` 和 `undefined` 以外的基本类型都提供了许多有用的方法。我们将在即将到来的章节中研究这些内容。
- 从形式上讲，这些方法通过临时对象工作，但 JavaScript 引擎可以很好地调整以优化内部，因此调用它们运行成本并不昂贵。
