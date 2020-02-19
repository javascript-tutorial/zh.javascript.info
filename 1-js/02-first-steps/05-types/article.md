# 数据类型

JavaScript 中的变量可以保存任何数据。变量在前一刻可以是个字符串，下一刻就可以变成 number 类型：

```js
// 没有错误
let message = "hello";
message = 123456;
```

允许这种操作的编程语言称为“动态类型”（dynamically typed）的编程语言，意思是虽然编程语言中有不同的数据类型，但是你定义的变量并不会在定义后，被限制为某一数据类型。

在 JavaScript 中有八种基本的数据类型。这一章我们会学习数据类型的基本知识，在下一章我们会对他们一一进行详细讲解。

## Number 类型

```js
let n = 123;
n = 12.345;
```

*number* 类型代表整数和浮点数。

数字可以有很多操作，比如，乘法 `*`、除法 `/`、加法 `+`、减法 `-` 等等。

除了常规的数字，还包括所谓的“特殊数值（"special numeric values"）”也属于这种类型：`Infinity`、`-Infinity` 和 `NaN`。

- `Infinity` 代表数学概念中的 [无穷大](https://en.wikipedia.org/wiki/Infinity) ∞。是一个比任何数字都大的特殊值。

    我们可以通过除以 0 来得到它：

    ```js run
    alert( 1 / 0 ); // Infinity
    ```

    或者在代码中直接使用它：

    ```js run
    alert( Infinity ); // Infinity
    ```
- `NaN` 代表一个计算错误。它是一个不正确的或者一个未定义的数学操作所得到的结果，比如：

    ```js run
    alert( "not a number" / 2 ); // NaN，这样的除法是错误的
    ```

    `NaN` 是粘性的。任何对 `NaN` 的进一步操作都会返回 `NaN`：

    ```js run
    alert( "not a number" / 2 + 5 ); // NaN
    ```

    所以，如果在数学表达式中有一个 `NaN`，会被传播到最终结果。

```smart header="数学运算是安全的"
在 JavaScript 中做数学运算是安全的。我们可以做任何事：除以 0，将非数字字符串视为数字，等等。

脚本永远不会因为一个致命的错误（“死亡”）而停止。最坏的情况下，我们会得到 `NaN` 的结果。
```

特殊的数值属于 "number" 类型。当然，对“特殊的数值”这个词的一般认识是，它们并不是数字。

我们将在 <info:number> 一节中学习数字的更多细节。

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

```js
let str = "Hello";
let str2 = 'Single quotes are ok too';
let phrase = `can embed another ${str}`;
```

在 JavaScript 中，有三种包含字符串的方式。

1. 双引号：`"Hello"`.
2. 单引号：`'Hello'`.
3. 反引号：<code>&#96;Hello&#96;</code>.

双引号和单引号都是“简单”引用，在 JavaScript 中两者几乎没有什么差别。

反引号是 **功能扩展** 引号。它们允许我们通过将变量和表达式包装在 `${…}` 中，来将它们嵌入到字符串中。例如：

```js run
let name = "John";

// 嵌入一个变量
alert( `Hello, *!*${name}*/!*!` ); // Hello, John!

// 嵌入一个表达式
alert( `the result is *!*${1 + 2}*/!*` ); // the result is 3
```

`${…}` 内的表达式会被计算，计算结果会成为字符串的一部分。可以在 `${…}` 内放置任何东西：诸如名为 `name` 的变量，或者诸如 `1 + 2` 的算数表达式，或者其他一些更复杂的。

需要注意的是，这仅仅在反引号内有效，其他引号不允许这种嵌入。
```js run
alert( "the result is ${1 + 2}" ); // the result is ${1 + 2}（使用双引号则不会计算 ${…} 中的内容）
```

我们会在 <info:string> 一节中学习字符串的更多细节。

```smart header="JavaScript 中没有 *character* 类型。"
在一些语言中，单个字符有一个特殊的 "character" 类型，在 C 语言和 Java 语言中被称为 "char"。

在 JavaScript 中没有这种类型。只有一种 `string` 类型，一个字符串可以包含一个或多个字符。
```

## Boolean 类型（逻辑类型）

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

更详细的内容将会在 <info:logical-operators> 一节中介绍。

## "null" 值

特殊的 `null` 值不属于上述任何一种类型。

它构成了一个独立的类型，只包含 `null` 值：

```js
let age = null;
```

相比较于其他编程语言，JavaScript 中的 `null` 不是一个“对不存在的 `object` 的引用”或者 “null 指针”。

JavaScript 中的 `null` 仅仅是一个代表“无”、“空”或“值未知”的特殊值。

上面的代码表示，由于某些原因，`age` 是未知或空的。

## "undefined" 值

特殊值 `undefined` 和 `null` 一样自成类型。

`undefined` 的含义是 `未被赋值`。

如果一个变量已被声明，但未被赋值，那么它的值就是 `undefined`：

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

……但是不建议这样做。通常，使用使用 `null` 将一个“空”或者“未知”的值写入变量中，`undefined` 仅仅用于检验，例如查看变量是否被赋值或者其他类似的操作。

## object 类型和 symbol 类型

`object` 类型是一个特殊的类型。

其他所有的数据类型都被称为“原生类型”，因为它们的值只包含一个单独的内容（字符串、数字或者其他）。相反，`object` 则用于储存数据集合和更复杂的实体。在充分了解原生类型之后，我们将会在 <info:object> 一节中介绍 `object`。

`symbol` 类型用于创建对象的唯一标识符。我们在这里提到 `symbol` 类型是为了学习的完整性，但我们会在学完 `object` 类型后再学习它。

## typeof 运算符 [#type-typeof]

`typeof` 运算符返回参数的类型。当我们想要分别处理不同类型值的时候，或者想快速进行数据类型检验时，非常有用。

它支持两种语法形式：

1. 作为运算符：`typeof x`。
2. 函数形式：`typeof(x)`。

换言之，有括号和没有括号，得到的结果是一样的。

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

最后三行可能需要额外的说明：

1. `Math` 是一个提供数学运算的内建 `object`。我们会在 <info:number> 一节中学习它。此处仅作为一个 `object` 的示例。
2. `typeof null` 的结果是 `"object"`。这其实是不对的。官方也承认了这是 `typeof` 运算符的问题，现在只是为了兼容性而保留了下来。当然，`null` 不是一个 `object`。`null` 有自己的类型，它是一个特殊值。再次强调，这是 JavaScript 语言的一个错误。
3. `typeof alert` 的结果是 `"function"`，因为 `alert` 在 JavaScript 语言中是一个函数。我们会在下一章学习函数，那时我们会了解到，在 JavaScript 语言中没有一个特别的 "function" 类型。函数隶属于 `object` 类型。但是 `typeof` 会对函数区分对待。这不是很正确的做法，但在实际编程中非常方便。

## 总结

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
