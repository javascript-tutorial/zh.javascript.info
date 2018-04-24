# 数据类型

JavaScript 中的变量可以保存任何数据。变量在前一刻可以是个字符串，然后又收到一个数值：

```js
// 没有错误
let message = "hello";
message = 123456;
```

允许这种操作的编程语言称为“动态类型”（dynamically typed）的编程语言，意思是，拥有数据类型，但是变量并不限于数据类型中的任何一个。

在 JavaScript 中有七种基本数据类型。这一章我们会学习基本知识，下一章我们会详细介绍它们。

## number 类型

```js
let n = 123;
n = 12.345;
```

*number* 类型用于整数和浮点数。

数字有很多操作，比如，乘法 `*`、除法 `/`、加法 `+`、减法 `-` 等等。

除了常规的数字，还包括所谓的“特殊数值”也属于这种类型：`Infinity`、`-Infinity` 和 `NaN`。

- `Infinity` 代表数学概念中的[无穷大](https://en.wikipedia.org/wiki/Infinity) ∞。是一个比任何数字都大的特殊值。

    我们可以通过除以 0 来得到它。

    ```js run
    alert( 1 / 0 ); // Infinity
    ```

    或者在代码中直接提及它。

    ```js run
    alert( Infinity ); // Infinity
    ```
- `NaN` 代表一个计算错误。它是一个不对的或者一个未定义的数学操作所得到的结果，比如：

    ```js run
    alert( "not a number" / 2 ); // NaN, 这样的除法是错误的
    ```

    `NaN` 是粘性的。任何对 `NaN` 的进一步操作都会给出 `NaN`：

    ```js run
    alert( "not a number" / 2 + 5 ); // NaN
    ```

    所以，如果在数学表达式中有一个 `NaN`，会被传播到最终结果。

```smart header="数学运算是安全的"
在 JavaScript 中做数学运算是安全的。我们可以做任何事：除以 0，将非数字字符串视为数字，等等。

脚本永远不会有致命的错误(“死亡”)。最坏的情况下，会得到 `NaN` 作为结果。
```

特殊的数值属于 **number** 类型。当然，对这个词的一般认识是，它们并不是数字。

我们将在章节 <info:number> 了解更多有关使用数字的内容。

## string 类型

JavaScript 中的字符串必须被包含在引号里面。

```js
let str = "Hello";
let str2 = 'Single quotes are ok too';
let phrase = `can embed ${str}`;
```

在 JavaScript 中，有三种包含字符串的方式。

1. 双引号： `"Hello"`.
2. 单引号： `'Hello'`.
3. 反引号： <code>&#96;Hello&#96;</code>.

双引号和单引号都是“简单”引用，在 JavaScript 中两者并没有什么差别。

反引号是**功能扩展**的引用，允许通过 `${…}`，将变量和表达式嵌入到字符串中。例如：

```js run
let name = "John";

// embed a variable
alert( `Hello, *!*${name}*/!*!` ); // Hello, John!

// embed an expression
alert( `the result is *!*${1 + 2}*/!*` ); // 结果是 3
```

`${…}` 内的表达式会被计算，结果成为字符串的一部分。可以在 `${…}` 内放置任何东西：诸如 `name` 的变量，或者诸如 `1 + 2` 的算数表达式，或者其他一些更复杂的。

需要注意的是，这仅仅在反引号内有效，其他引号不允许这种嵌入。
```js run
alert( "the result is ${1 + 2}" ); // 结果是 ${1 + 2} (双引号什么也不做)
```

我们会在章节 <info:string> 讨论更多的细节。

```smart header="没有 **character** 类型。"
在一些语言中，单个字符有一个特殊的 “character” 类型，在 C 语言和 Java 语言中是 `char`。

JavaScript 中没有这种类型。只有一种 `string` 类型，一个字符串可以包含一个或多个字符。
```

## boolean 类型（逻辑类型）

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

alert( isGreater ); // true (比较的结果是 "yes")
```

更详细的内容将会在章节 <info:logical-operators> 进行介绍。

## "null" 值

特殊的 `null` 值不属于上述任何一种类型。

它构成一个独立的类型，只包含 `null` 值：

```js
let age = null;
```

相比较于其他语言，JavaScript 中的 `null` 不是一个“对不存在对象的引用”或者 “null 指针”。

仅仅是一个含义为“无”、“空”或“值未知”的特殊值。

上面的代码表示，由于某些原因，`age` 是未知的。

## "undefined" 值

特殊值和 `null` 一样，自成类型。

`undefined` 的含义是 `未被赋值`。

如果变量被声明，而未被赋值，那么它的值就是 `undefined`：

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

...但是不建议这样做。通常，使用使用 `null` 将一个“空”或者“未知”的值写入变量中，`undefined` 仅仅用于检验，以查看变量是否被赋值或者其他类似的操作。

## object 类型和 symbol 类型

`object` 类型是特殊的类型。

其他所有的类型都称为“原生类型”，因为它们的值只包含一个单独的东西（字符串、数字或者其他）。相反，对象用于储存数据集合和更复杂的实体。在充分了解原生类型之后，我们会在章节 <info:object> 介绍对象。

`symbol` 类型用于创建对象的唯一标识符。为了学习的完整性，我们在这里提到 `symbol` 类型，但最好在学完对象之后再学习它。

## typeof 运算符 [#type-typeof]

`typeof` 运算符返回参数的类型。当我们想要分别处理不同类型值的时候，或者简单地进行检验，就很有用。

它支持两种语法形式：

1. 作为运算符：`typeof x`。
2. 函数形式：`typeof(x)`。

换言之，有括号和没有括号，结果是一样的。

对 `typeof x` 的调用返回数据类型的字符串。

```js
typeof undefined // "undefined"

typeof 0 // "number"

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

最后三行可能需要额外的说明：

1. `Math` 是一个提供数学运算的内建对象。我们会在章节 <info:number> 学习它。此处作为一个对象的例子。
2. `typeof null` 的结果是 `"object"`。这是不对的。这是官方在 `typeof` 方面承认的错误，只是为了兼容性而保留。当然，`null` 不是一个对象。它有自己的类型，是一个特殊值。再次强调，这是语言中的一个错误。
3. `typeof alert` 的结果是 `"function"`，因为 `alert` 在语言中是一个函数。我们会在下一章学习函数，那时我们会了解到，在语言中没有一个特别的 "function" 类型。函数隶属于 object 类型。但是 `typeof` 会对函数区分对待。这不正确，但在实践中非常方便。

## 总结

JavaScript 中有七种基本的类型。

- `number` 用于任何类型的数字：整数或者浮点数。
- `string` 用于字符串。一个字符串可以包含一个或多个字符，所以没有单独的单字符类型。
- `boolean` 用于 `true` 和 `false`。
- `null` 用于未知的值 —— 只有一个 `null` 值的独立类型。
- `undefined` 用于未定义的值 —— 只有一个 `undefined` 值的独立类型。
- `object` 用于更复杂的数据结构。
- `symbol` 用于唯一的标识符。

`typeof` 运算符可以查看变量的类型。

- 两种形式：`typeof x` 或者 `typeof(x)`。
- 返回的类型的字符串，比如 `"string"`。
- `null` 返回 `"object"` —— 这是语言中的一个错误，实际上它并不是一个对象。

在接下来的章节中，我们将重点介绍原生类型值，一旦掌握了，我们将继续讨论对象。
