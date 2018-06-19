# JavasScript 特性

本章简要回顾我们到现在为止学到的 JavaScript 特性，特别注意一些细节。

## 代码结构

语句用分号分隔：

```js run no-beautify
alert('Hello'); alert('World');
```

通常，换行符也被视为分隔符：

```js run no-beautify
alert('Hello')
alert('World')
```

这就是所谓的「自动分号插入」。有时它不起作用，例如：

```js run
alert("There will be an error after this message")

[1, 2].forEach(alert)
```

大多数代码风格指南都认为我们应该在每个语句后面加上分号。

在代码块 `{...}` 之后以及循环语句后不需要使用分号：

```js
function f() {
  //函数声明后不需要分号
}

for(;;) {
  //循环语句后不需要分号
}

```

...但即使我们可以在某处添加了「额外」分号，这也不是错误。它会被忽略的。
更多信息：<info:structure>。

## 严格模式

为了完全启用现代 JavaScript 的所有功能，我们应该使用 `"use strict"` 指令。

```js
'use strict';

...
```

该指令必须位于 JavaScript 文件的顶部或函数的开头。

如果没有使用严格模式，所有东西仍可以正常工作，但是某些特性的表现方式与旧式「兼容」方式相同。我们通常喜欢更现代的方式。

语言的一些现代特征（比如我们将来要学习的类）会隐式地启用严格模式。

更多信息：<info:strict-mode>。

## 变量

可以使用以下方式声明变量：

- `let`
- `const` (固定的，不能被改变)
- `var`（旧式的，稍后会看到）

一个合格的变量名可以由以下组成：
- 字符串和数字，但是第一个字符不能是数字。
- 字符 `$` 和 `_` 是允许的，用法同字母。
- 非拉丁字母和象形文字也是允许的，但通常不会使用。


变量的值可以动态改变数据类型，它们可以存储任何价：

```js
let x = 5;
x = "John";
```

有 7 种数据类型：

- `number` —— 可以是浮点数，也可以是整数，
- `string` —— 字符串类型，
- `boolean` —— 逻辑值: `true/false`，
- `null` —— 具有单个值 `null` 的类型，表示”空“或“不存在”，
- `undefined` —— 一个具有单个值 `undefined` 的类型，表示「未分配」，
- `object` 和 `symbol` —— 对于复杂的数据结构和唯一标识符，我们目前还没学习这个类型。

`typeof` 运算符返回值的类型，但有两个例外：

```js
typeof null == "object" // error in the language
typeof function(){} == "function" // 函数特殊
```

更多信息：<info:variables> 和 <info:types>。

## 交互

我们使用浏览器作为工作环境，所以基本的 UI 功能将是：
[`prompt(question[, default])`](mdn:api/Window/prompt)
: 询问一个问题，并返回访问者输入的内容，如果他按下「取消」则返回 `null`。

[`confirm(question)`](mdn:api/Window/confirm)
: 提出一个问题，并建议在确定和取消之间进行选择。该选项以 `true/false` 形式返回。

[`alert(message)`](mdn:api/Window/alert)
: 输出一个 `消息`。

所有这些函数都会产生**模态框**，它们会暂停代码执行并阻止访问者与页面交互，直到用户输入内容。

举个例子：

```js run
let userName = prompt("Your name?", "Alice");
let isTeaWanted = confirm("Do you want some tea?");

alert( "Visitor: " + userName ); // Alice
alert( "Tea wanted: " + isTeaWanted ); // true
```

更多信息：<info:alert-prompt-confirm>。

## 运算符

JavaScript 支持以下运算符：

算数运算符
: 常规的比如：`+ - * /`（加减乘除），以及取余操作 `%` 和幂运算符 `**` 。

    二进制加 `+` 连接字符串。如果任何一个操作数是一个字符串，另一个操作数也将转换为字符串：
    ```js run
    alert( '1' + 2 ); // '12', 字符串
    alert( 1 + '2' ); // '12', 字符串
    ```

赋值
: 简单的赋值：`a = b` 和连续赋值：`a * = 2`。

按位操作
: 位运算符在位级上使用整数：当需要时，请参阅 [docs](mdn:/JavaScript/Reference/Operators/Bitwise_Operators)。

三元运算
: 唯一具有三个参数的操作：`cond？ resultA: resultB`。如果 `cond` 是真的，则返回 `resultA`，否则返回 `resultB`。

逻辑运算符
: 逻辑与 `&&` 和或 `||` 执行短路评估，然后返回停止时的值。

比较运算符
: 运算符 `==` 将不同类型的值转换为一个数字（除了 `null` 和 `undefined`，它们彼此相等而没有别的情况），所以下面的例子是相等的：

    ```js run
    alert( 0 == false ); // true
    alert( 0 == '' ); // true
    ```
    其他比较也转换为数字。

    严格相等运算符 `===` 不会进行转换：不同的类型总是为其指定不同的值，因此：
    值 `null` 和 `undefined` 是特殊的：它们只在 `==` 下相等。
    字符串按照字符顺序逐一比较，其他类型转换为数字。

逻辑运算符
: 其他合规的运算符比较少，其中有逗号运算符。

More in: <info:operators>, <info:comparison>, <info:logical-operators>.
更多信息：<info:operators>, <info:comparison>, <info:logical-operators>。

## 循环语句

- 我们涵盖了 3 种类型的循环：

    ```js
    // 1
    while (condition) {
      ...
    }

    // 2
    do {
      ...
    } while (condition);

    // 3
    for(let i = 0; i < 10; i++) {
      ...
    }
    ```

- 在 `for(let...)` 循环中声明的变量只在循环中可见。但是我们也可以省略 `let` 并重用现有的变量。
- 指令 `break/continue` 允许退出整个循环/当前迭代。使用标签来打破嵌套循环。

详情参见：<info:while-for>。

稍后我们将学习更多类型的循环语句来处理事物。

## "switch" 结构

"switch" 结构可以替代多个 `if` 检查，它内部使用 `===`（严格相等）进行比较。

例如：

```js run
let age = prompt('Your age?', 18);

switch (age) {
  case 18:
    alert("Won't work"); //提示的结果是一个字符串，而不是数字
  case "18":
    alert("This works!");
    break;

  default:
    alert("Any value not equal to one above");
}
```

详情参见：<info:switch>。

## 函数

我们介绍了三种在 JavaScript 中创建函数的方法：

1. 函数声明：主代码流中的函数

    ```js
    function sum(a, b) {
      let result = a + b;

      return result;
    }
    ```

2. 函数表达式：表达式上下文中的函数

    ```js
    let sum = function(a, b) {
      let result = a + b;

      return result;
    }
    ```
    函数表达式可以有一个名字，比如 `sum = function name（a，b）`，但是 `name` 只在该函数内可见。

3. 箭头函数：

    ```js
    //表达式在右侧
    let sum = (a, b) => a + b;

    // 或带{...}的多行语法，需要此处返回：
    let sum = (a, b) => {
      // ...
      return a + b;
    }

    //没有参数
    let sayHi = () => alert("Hello");

    //有一个参数
    let double = n => n * 2;
    ```

- 函数可能具有局部变量：在其内部声明的变量。这些变量只在函数内部可见。
- 参数可以有默认值：`function sum(a = 1, b = 2) {...}`。
- 函数总是返回一些东西。如果没有 `return` 语句，那么结果是 `undefined`。

|函数声明|函数表达式|
|----------------------|---------------------|
|在整个代码块中可见|在执行到达时创建|
| - |可以有一个名字，只在函数内部可见|

更多：参见<info:function-basics>，<info:function-expressions-arrows>。

## 更多

这是 JavaScript 功能的简要概述。截至目前，我们只研究基础知识。随着教程的深入，您会发现更多特殊功能和 JavaScript 高级功能。
