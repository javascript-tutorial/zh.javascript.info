# 基本类型的方法

JavaScript允许我们像对象一样使用基本类型（字符串，数字等）。

基本类型还提供调用方法等。我们会尽快研究这些，但首先我们会看看它是如何工作的，毕竟基本类型不是对象（在这里我们会更加清楚）。

我们来看看基本类型和对象之间的关键区别。

基本类型

对象
：能够将多个值存储为属性。
可以用`{}`创建，例如：`{name: "John", age: 30}`。JavaScript中还有其他种类的对象，例如函数就是对象。

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

所以我们在这里用 `sayHi` 方法创建了一个对象 `john`。

许多内置对象已经存在，例如那些与日期，错误，HTML元素等一起工作的内置对象。它们具有不同的属性和方法。

但是，这些特性都是有成本的！

对象比基本对象“更重”。他们需要额外的资源来支持运作。但是，由于属性和方法在编程中非常有用，JavaScript引擎会尝试优化它们以减少额外的负担。

## 作为对象的基本类型

Here's the paradox faced by the creator of JavaScript:

- There are many things one would want to do with a primitive like a string or a number. It would be great to access them as methods.
- Primitives must be as fast and lightweight as possible.

The solution looks a little bit awkward, but here it is:

1. Primitives are still primitive. A single value, as desired.
2. The language allows access to methods and properties of strings, numbers, booleans and symbols.
3. When this happens, a special "object wrapper" is created that provides the extra functionality, and then is destroyed.

The "object wrappers" are different for each primitive type and are called: `String`, `Number`, `Boolean` and `Symbol`. Thus, they provide different sets of methods.

For instance, there exists a method [str.toUpperCase()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase) that returns a capitalized string.

Here's how it works:

```js run
let str = "Hello";

alert( str.toUpperCase() ); // HELLO
```

Simple, right? Here's what actually happens in `str.toUpperCase()`:

1. The string `str` is a primitive. So in the moment of accessing its property, a special object is created that knows the value of the string, and has useful methods, like `toUpperCase()`.
2. That method runs and returns a new string (shown by `alert`).
3. The special object is destroyed, leaving the primitive `str` alone.

So primitives can provide methods, but they still remain lightweight.

The JavaScript engine highly optimizes this process. It may even skip the creation of the extra object at all. But it must still adhere to the specification and behave as if it creates one.

A number has methods of its own, for instance, [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) rounds the number to the given precision:

```js run
let n = 1.23456;

alert( n.toFixed(2) ); // 1.23
```

We'll see more specific methods in chapters <info:number> and <info:string>.


````warn header="Constructors `String/Number/Boolean` are for internal use only"
Some languages like Java allow us to create "wrapper objects" for primitives explicitly using a syntax like `new Number(1)` or `new Boolean(false)`.

In JavaScript, that's also possible for historical reasons, but highly **unrecommended**. Things will go crazy in several places.

For instance:

```js run
alert( typeof 1 ); // "number"

alert( typeof new Number(1) ); // "object"!
```

And because what follows, `zero`, is an object, the alert will show up:

```js run
let zero = new Number(0);

if (zero) { // zero is true, because it's an object
  alert( "zero is truthy?!?" );
}
```

On the other hand, using the same functions `String/Number/Boolean` without `new` is a totally sane and useful thing. They convert a value to the corresponding type: to a string, a number, or a boolean (primitive).

For example, this is entirely valid:
```js
let num = Number("123"); // convert a string to number
```
````


````warn header="null/undefined have no methods"
The special primitives `null` and `undefined` are exceptions. They have no corresponding "wrapper objects" and provide no methods. In a sense, they are "the most primitive".

An attempt to access a property of such value would give the error:

```js run
alert(null.test); // error
````

## Summary

- Primitives except `null` and `undefined` provide many helpful methods. We will study those in the upcoming chapters.
- Formally, these methods work via temporary objects, but JavaScript engines are well tuned to optimize that internally, so they are not expensive to call.
