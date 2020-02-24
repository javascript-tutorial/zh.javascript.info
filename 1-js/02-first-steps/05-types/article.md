# 数据类型

<<<<<<< HEAD
JavaScript 中的变量可以保存任何数据。变量在前一刻可以是个字符串，下一刻就可以变成 number 类型：
=======
A variable in JavaScript can contain any data. A variable can at one moment be a string and at another be a number:
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

```js
// 没有错误
let message = "hello";
message = 123456;
```

允许这种操作的编程语言称为“动态类型”（dynamically typed）的编程语言，意思是虽然编程语言中有不同的数据类型，但是你定义的变量并不会在定义后，被限制为某一数据类型。

<<<<<<< HEAD
在 JavaScript 中有八种基本的数据类型。这一章我们会学习数据类型的基本知识，在下一章我们会对他们一一进行详细讲解。

## Number 类型
=======
There are eight basic data types in JavaScript. Here, we'll cover them in general and in the next chapters we'll talk about each of them in detail.

## Number
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

```js
let n = 123;
n = 12.345;
```

<<<<<<< HEAD
*number* 类型代表整数和浮点数。

数字可以有很多操作，比如，乘法 `*`、除法 `/`、加法 `+`、减法 `-` 等等。

除了常规的数字，还包括所谓的“特殊数值（"special numeric values"）”也属于这种类型：`Infinity`、`-Infinity` 和 `NaN`。
=======
The *number* type represents both integer and floating point numbers.

There are many operations for numbers, e.g. multiplication `*`, division `/`, addition `+`, subtraction `-`, and so on.

Besides regular numbers, there are so-called "special numeric values" which also belong to this data type: `Infinity`, `-Infinity` and `NaN`.
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

- `Infinity` 代表数学概念中的 [无穷大](https://en.wikipedia.org/wiki/Infinity) ∞。是一个比任何数字都大的特殊值。

    我们可以通过除以 0 来得到它：

    ```js run
    alert( 1 / 0 ); // Infinity
    ```

<<<<<<< HEAD
    或者在代码中直接使用它：
=======
    Or just reference it directly:
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

    ```js run
    alert( Infinity ); // Infinity
    ```
- `NaN` 代表一个计算错误。它是一个不正确的或者一个未定义的数学操作所得到的结果，比如：

    ```js run
    alert( "not a number" / 2 ); // NaN，这样的除法是错误的
    ```

<<<<<<< HEAD
    `NaN` 是粘性的。任何对 `NaN` 的进一步操作都会返回 `NaN`：
=======
    `NaN` is sticky. Any further operation on `NaN` returns `NaN`:
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

    ```js run
    alert( "not a number" / 2 + 5 ); // NaN
    ```

<<<<<<< HEAD
    所以，如果在数学表达式中有一个 `NaN`，会被传播到最终结果。

```smart header="数学运算是安全的"
在 JavaScript 中做数学运算是安全的。我们可以做任何事：除以 0，将非数字字符串视为数字，等等。

脚本永远不会因为一个致命的错误（“死亡”）而停止。最坏的情况下，我们会得到 `NaN` 的结果。
```

特殊的数值属于 "number" 类型。当然，对“特殊的数值”这个词的一般认识是，它们并不是数字。
=======
    So, if there's a `NaN` somewhere in a mathematical expression, it propagates to the whole result.

```smart header="Mathematical operations are safe"
Doing maths is "safe" in JavaScript. We can do anything: divide by zero, treat non-numeric strings as numbers, etc.

The script will never stop with a fatal error ("die"). At worst, we'll get `NaN` as the result.
```

Special numeric values formally belong to the "number" type. Of course they are not numbers in the common sense of this word.
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

我们将在 <info:number> 一节中学习数字的更多细节。

<<<<<<< HEAD
## BigInt 类型

在 JavaScript 中，"number" 类型无法代表大于 <code>2<sup>53</sup></code>（或小于 <code>-2<sup>53</sup></code>）的整数，这是其内部表示形式导致的技术限制。这大约是 16 位的十进制数字，因此在大多数情况下，这个限制不是问题，但有时我们需要很大的数字，例如用于加密或微秒精度的时间戳。

`BigInt` 类型是最近被添加到 JavaScript 语言中的，用于表示任意长度的整数。

通过将 `n` 附加到整数字段的末尾来创建 `BigInt`。

```js
// 尾部的 "n" 表示这是一个 BigInt 类型
const bigInt = 1234567890123456789012345678901234567890n;
```

由于很少需要 `BigInt` 类型的数字，因此我们在单独的章节 <info：bigint> 中专门对其进行介绍。

```smart header="兼容性问题"
目前 Firefox 和 Chrome 已经支持 `BigInt` 了，但 Safari/IE/Edge 还没有。
```

## String 类型

JavaScript 中的字符串必须被括在引号里。
=======
## BigInt

In JavaScript, the "number" type cannot represent integer values larger than <code>2<sup>53</sup></code> (or less than <code>-2<sup>53</sup></code> for negatives), that's a technical limitation caused by their internal representation. That's about 16 decimal digits, so for most purposes the limitation isn't a problem, but sometimes we need really big numbers, e.g. for cryptography or microsecond-precision timestamps.

`BigInt` type was recently added to the language to represent integers of arbitrary length.

A `BigInt` is created by appending `n` to the end of an integer literal:

```js
// the "n" at the end means it's a BigInt
const bigInt = 1234567890123456789012345678901234567890n;
```

As `BigInt` numbers are rarely needed, we devoted them a separate chapter <info:bigint>.

```smart header="Compatability issues"
Right now `BigInt` is supported in Firefox and Chrome, but not in Safari/IE/Edge.
```

## String

A string in JavaScript must be surrounded by quotes.
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

```js
let str = "Hello";
let str2 = 'Single quotes are ok too';
let phrase = `can embed another ${str}`;
```

在 JavaScript 中，有三种包含字符串的方式。

1. 双引号：`"Hello"`.
2. 单引号：`'Hello'`.
3. 反引号：<code>&#96;Hello&#96;</code>.

<<<<<<< HEAD
双引号和单引号都是“简单”引用，在 JavaScript 中两者几乎没有什么差别。
=======
Double and single quotes are "simple" quotes. There's practically no difference between them in JavaScript.
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

反引号是 **功能扩展** 引号。它们允许我们通过将变量和表达式包装在 `${…}` 中，来将它们嵌入到字符串中。例如：

```js run
let name = "John";

// 嵌入一个变量
alert( `Hello, *!*${name}*/!*!` ); // Hello, John!

// 嵌入一个表达式
alert( `the result is *!*${1 + 2}*/!*` ); // the result is 3
```

<<<<<<< HEAD
`${…}` 内的表达式会被计算，计算结果会成为字符串的一部分。可以在 `${…}` 内放置任何东西：诸如名为 `name` 的变量，或者诸如 `1 + 2` 的算数表达式，或者其他一些更复杂的。

需要注意的是，这仅仅在反引号内有效，其他引号不允许这种嵌入。
=======
The expression inside `${…}` is evaluated and the result becomes a part of the string. We can put anything in there: a variable like `name` or an arithmetical expression like `1 + 2` or something more complex.

Please note that this can only be done in backticks. Other quotes don't have this embedding functionality!
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46
```js run
alert( "the result is ${1 + 2}" ); // the result is ${1 + 2}（使用双引号则不会计算 ${…} 中的内容）
```

我们会在 <info:string> 一节中学习字符串的更多细节。

<<<<<<< HEAD
```smart header="JavaScript 中没有 *character* 类型。"
在一些语言中，单个字符有一个特殊的 "character" 类型，在 C 语言和 Java 语言中被称为 "char"。
=======
```smart header="There is no *character* type."
In some languages, there is a special "character" type for a single character. For example, in the C language and in Java it is called "char".
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

在 JavaScript 中没有这种类型。只有一种 `string` 类型，一个字符串可以包含一个或多个字符。
```

<<<<<<< HEAD
## Boolean 类型（逻辑类型）
=======
## Boolean (logical type)
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

boolean 类型仅包含两个值：`true` 和 `false`。

这种类型通常用于存储表示 yes 或 no 的值：`true` 意味着 “yes，正确”，`false` 意味着 “no，不正确”。

比如：

```js
let nameFieldChecked = true; // yes, name field is checked
let ageFieldChecked = false; // no, age field is not checked
```

布尔值也可作为比较的结果：

```js run
let isGreater = 4 > 1;

alert( isGreater ); // true（比较的结果是 "yes"）
```

<<<<<<< HEAD
更详细的内容将会在 <info:logical-operators> 一节中介绍。
=======
We'll cover booleans more deeply in the chapter <info:logical-operators>.
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

## "null" 值

<<<<<<< HEAD
特殊的 `null` 值不属于上述任何一种类型。

它构成了一个独立的类型，只包含 `null` 值：
=======
The special `null` value does not belong to any of the types described above.

It forms a separate type of its own which contains only the `null` value:
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

```js
let age = null;
```

<<<<<<< HEAD
相比较于其他编程语言，JavaScript 中的 `null` 不是一个“对不存在的 `object` 的引用”或者 “null 指针”。

JavaScript 中的 `null` 仅仅是一个代表“无”、“空”或“值未知”的特殊值。

上面的代码表示，由于某些原因，`age` 是未知或空的。
=======
In JavaScript, `null` is not a "reference to a non-existing object" or a "null pointer" like in some other languages.

It's just a special value which represents "nothing", "empty" or "value unknown".

The code above states that `age` is unknown or empty for some reason.
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

## "undefined" 值

<<<<<<< HEAD
特殊值 `undefined` 和 `null` 一样自成类型。
=======
The special value `undefined` also stands apart. It makes a type of its own, just like `null`.
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

`undefined` 的含义是 `未被赋值`。

<<<<<<< HEAD
如果一个变量已被声明，但未被赋值，那么它的值就是 `undefined`：
=======
If a variable is declared, but not assigned, then its value is `undefined`:
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

```js run
let x;

alert(x); // 弹出 "undefined"
```

原理上来说，可以为任何变量赋值为 `undefined`：

```js run
let x = 123;

x = undefined;

alert(x); // "undefined"
```

<<<<<<< HEAD
……但是不建议这样做。通常，使用使用 `null` 将一个“空”或者“未知”的值写入变量中，`undefined` 仅仅用于检验，例如查看变量是否被赋值或者其他类似的操作。
=======
...But we don't recommend doing that. Normally, we use `null` to assign an "empty" or "unknown" value to a variable, and we use `undefined` for checks like seeing if a variable has been assigned.
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

## object 类型和 symbol 类型

`object` 类型是一个特殊的类型。

<<<<<<< HEAD
其他所有的数据类型都被称为“原生类型”，因为它们的值只包含一个单独的内容（字符串、数字或者其他）。相反，`object` 则用于储存数据集合和更复杂的实体。在充分了解原生类型之后，我们将会在 <info:object> 一节中介绍 `object`。

`symbol` 类型用于创建对象的唯一标识符。我们在这里提到 `symbol` 类型是为了学习的完整性，但我们会在学完 `object` 类型后再学习它。
=======
All other types are called "primitive" because their values can contain only a single thing (be it a string or a number or whatever). In contrast, objects are used to store collections of data and more complex entities. We'll deal with them later in the chapter <info:object> after we learn more about primitives.

The `symbol` type is used to create unique identifiers for objects. We mention it here for completeness, but we'll study it after objects.
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

## typeof 运算符 [#type-typeof]

<<<<<<< HEAD
`typeof` 运算符返回参数的类型。当我们想要分别处理不同类型值的时候，或者想快速进行数据类型检验时，非常有用。
=======
The `typeof` operator returns the type of the argument. It's useful when we want to process values of different types differently or just want to do a quick check.
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

它支持两种语法形式：

<<<<<<< HEAD
1. 作为运算符：`typeof x`。
2. 函数形式：`typeof(x)`。

换言之，有括号和没有括号，得到的结果是一样的。
=======
1. As an operator: `typeof x`.
2. As a function: `typeof(x)`.

In other words, it works with parentheses or without them. The result is the same.
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

对 `typeof x` 的调用会以字符串的形式返回数据类型：

```js
typeof undefined // "undefined"

typeof 0 // "number"

typeof 10n // "bigint"

typeof true // "boolean"

typeof "foo" // "string"

typeof Symbol("id") // "symbol"

*!*
typeof Math // "object"  (1)
*/!*

*!*
typeof null // "object"  (2)
*/!*

*!*
typeof alert // "function"  (3)
*/!*
```

<<<<<<< HEAD
最后三行可能需要额外的说明：

1. `Math` 是一个提供数学运算的内建 `object`。我们会在 <info:number> 一节中学习它。此处仅作为一个 `object` 的示例。
2. `typeof null` 的结果是 `"object"`。这其实是不对的。官方也承认了这是 `typeof` 运算符的问题，现在只是为了兼容性而保留了下来。当然，`null` 不是一个 `object`。`null` 有自己的类型，它是一个特殊值。再次强调，这是 JavaScript 语言的一个错误。
3. `typeof alert` 的结果是 `"function"`，因为 `alert` 在 JavaScript 语言中是一个函数。我们会在下一章学习函数，那时我们会了解到，在 JavaScript 语言中没有一个特别的 "function" 类型。函数隶属于 `object` 类型。但是 `typeof` 会对函数区分对待。这不是很正确的做法，但在实际编程中非常方便。
=======
The last three lines may need additional explanation:

1. `Math` is a built-in object that provides mathematical operations. We will learn it in the chapter <info:number>. Here, it serves just as an example of an object.
2. The result of `typeof null` is `"object"`. That's wrong. It is an officially recognized error in `typeof`, kept for compatibility. Of course, `null` is not an object. It is a special value with a separate type of its own. So, again, this is an error in the language.
3. The result of `typeof alert` is `"function"`, because `alert` is a function. We'll study functions in the next chapters where we'll also see that there's no special "function" type in JavaScript. Functions belong to the object type. But `typeof` treats them differently, returning `"function"`. That's not quite correct, but very convenient in practice.
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

## 总结

<<<<<<< HEAD
JavaScript 中有八种基本的数据类型（译注：前七种为基本数据类型，也称为原始类型，而 `object` 为复杂数据类型）。

- `number` 用于任何类型的数字：整数或浮点数，在 ±2<sup>53</sup> 范围内的整数。
- `bigint` 用于任意长度的整数。
- `string` 用于字符串：一个字符串可以包含一个或多个字符，所以没有单独的单字符类型。
- `boolean` 用于 `true` 和 `false`。
- `null` 用于未知的值 —— 只有一个 `null` 值的独立类型。
- `undefined` 用于未定义的值 —— 只有一个 `undefined` 值的独立类型。
- `symbol` 用于唯一的标识符。
- `object` 用于更复杂的数据结构。

我们可以通过 `typeof` 运算符查看存储在变量中的数据类型。

- 两种形式：`typeof x` 或者 `typeof(x)`。
- 以字符串的形式返回类型名称，例如 `"string"`。
- `typeof null` 会返回 `"object"` —— 这是 JavaScript 编程语言的一个错误，实际上它并不是一个 `object`。

在接下来的章节中，我们将重点介绍原生类型值，当你掌握了原生数据类型后，我们将继续学习 `object`。
=======
There are 8 basic data types in JavaScript.

- `number` for numbers of any kind: integer or floating-point, integers are limited by ±2<sup>53</sup>.
- `bigint` is for integer numbers of arbitrary length.
- `string` for strings. A string may have one or more characters, there's no separate single-character type.
- `boolean` for `true`/`false`.
- `null` for unknown values -- a standalone type that has a single value `null`.
- `undefined` for unassigned values -- a standalone type that has a single value `undefined`.
- `object` for more complex data structures.
- `symbol` for unique identifiers.

The `typeof` operator allows us to see which type is stored in a variable.

- Two forms: `typeof x` or `typeof(x)`.
- Returns a string with the name of the type, like `"string"`.
- For `null` returns `"object"` -- this is an error in the language, it's not actually an object.

In the next chapters, we'll concentrate on primitive values and once we're familiar with them, we'll move on to objects.
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46
