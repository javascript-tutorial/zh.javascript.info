# 条件运算符：if、'?'

<<<<<<< HEAD
有时我们需要根据不同条件执行不同的操作。

`if` 语句可以解决这个问题，条件运算符（三元），简称为“问号”运算符也可以解决。
=======
Sometimes, we need to perform different actions based on different conditions.

To do that, we can use the `if` statement and the conditional operator `?`, that's also called a "question mark" operator.
>>>>>>> 027933531e121650120f7e8385f691de99af12d2

## "if" 语句

<<<<<<< HEAD
`if` 语句获得一个条件，计算这个条件表达式，如果计算结果是 `true`，就会执行对应的代码。
=======
The `if` statement evaluates a condition and, if the condition's result is `true`, executes a block of code.
>>>>>>> 027933531e121650120f7e8385f691de99af12d2

如下：

```js run
let year = prompt('In which year was ECMAScript-2015 specification published?', '');

*!*
if (year == 2015) alert( 'You are right!' );
*/!*
```

<<<<<<< HEAD
在上面的例子中，条件是一个简单的相等性检查：`year == 2015`，但它可能更复杂。

如果有多个语句要执行，我们必须将要执行的代码块封装在大括号内：
=======
In the example above, the condition is a simple equality check (`year == 2015`), but it can be much more complex.

If we want to execute more than one statement, we have to wrap our code block inside curly braces:
>>>>>>> 027933531e121650120f7e8385f691de99af12d2

```js
if (year == 2015) {
  alert( "That's correct!" );
  alert( "You're so smart!" );
}
```

<<<<<<< HEAD
建议每次使用 if 语句都用大括号 `{}` 来包装代码块，即使只有一条语句也是。这样能提高代码可读性。
=======
We recommend wrapping your code block with curly braces `{}` every time you use an `if` statement, even if there is only one statement to execute. Doing so improves readability.
>>>>>>> 027933531e121650120f7e8385f691de99af12d2

## 布尔转换

<<<<<<< HEAD
`if（……）` 语句会计算圆括号包围的表达式的结果并将其转换为布尔类型。
=======
The `if (…)` statement evaluates the expression in its parentheses and converts the result to a boolean.
>>>>>>> 027933531e121650120f7e8385f691de99af12d2

让我们回顾一下 <info：type-conversions> 一章中的转换规则：

<<<<<<< HEAD
- 数字 `0`、一个空字符串 `""`、`null`、`undefined` 和 `NaN` 都会转换成 `false`。因为他们被称为 “falsy” 值。
- 其他值变成 `true`，所以它们被称为 “truthy”。
=======
- A number `0`, an empty string `""`, `null`, `undefined`, and `NaN` all become `false`. Because of that they are called "falsy" values.
- Other values become `true`, so they are called "truthy".
>>>>>>> 027933531e121650120f7e8385f691de99af12d2

所以，下面条件下的代码永远不会执行：

```js
if (0) { // 0 是 falsy
  ...
}
```

<<<<<<< HEAD
……但下面的条件 — 始终有效：
=======
...and inside this condition -- it always will:
>>>>>>> 027933531e121650120f7e8385f691de99af12d2

```js
if (1) { // 1 是 truthy
  ...
}
```

<<<<<<< HEAD
我们也可以将未计算的布尔值传入 `if` 语句，如下所示：
=======
We can also pass a pre-evaluated boolean value to `if`, like this:
>>>>>>> 027933531e121650120f7e8385f691de99af12d2

```js
let cond = (year == 2015); // 相等运算符的结果是 true 或 false

if (cond) {
  ...
}
```

## "else" 语句

<<<<<<< HEAD
`if` 语句包含一个可选的 “else” 块。如果条件不成立，就会执行它内部的代码。
=======
The `if` statement may contain an optional "else" block. It executes when the condition is false.
>>>>>>> 027933531e121650120f7e8385f691de99af12d2

如下所示：
```js run
let year = prompt('In which year was the ECMAScript-2015 specification published?', '');

if (year == 2015) {
  alert( 'You guessed it right!' );
} else {
  alert( 'How can you be so wrong?' ); // 2015 以外的任何值
}
```

## 多个条件："else if"

<<<<<<< HEAD
有时我们需要测试一个条件的几个变体。使用 `else if` 子句可以实现。
=======
Sometimes, we'd like to test several variants of a condition. The `else if` clause lets us do that.
>>>>>>> 027933531e121650120f7e8385f691de99af12d2

如下所示：

```js run
let year = prompt('In which year was the ECMAScript-2015 specification published?', '');

if (year < 2015) {
  alert( 'Too early...' );
} else if (year > 2015) {
  alert( 'Too late' );
} else {
  alert( 'Exactly!' );
}
```

<<<<<<< HEAD
在上面的代码中，首先检查 `year < 2015`。如果它是假的，就会转到下一个条件 `year > 2015`，否则显示最后一个 `alert`。

可以有更多的 `else if` 块。结尾的 `else` 是可选的。

## 三元运算符 '?'

有时我们需要根据一个条件去声明变量。
=======
In the code above, JavaScript first checks `year < 2015`. If that is falsy, it goes to the next condition `year > 2015`. If that is also falsy, it shows the last `alert`.

There can be more `else if` blocks. The final `else` is optional.

## Conditional operator '?'

Sometimes, we need to assign a variable depending on a condition.
>>>>>>> 027933531e121650120f7e8385f691de99af12d2

如下所示：

```js run no-beautify
let accessAllowed;
let age = prompt('How old are you?', '');

*!*
if (age > 18) {
  accessAllowed = true;
} else {
  accessAllowed = false;
}
*/!*

alert(accessAllowed);
```

<<<<<<< HEAD
所谓的“三元”或“问号”操作符让我们可以更简便地达到目的。

它用问号 `?` 表示。“三元”意味着操作符有三个操作数。它实际上是JavaScript 中唯一一个有这么多操作数的操作符。
=======
The so-called "conditional" or "question mark" operator lets us do that in a shorter and simpler way.

The operator is represented by a question mark `?`. Sometimes it's called "ternary", because the operator has three operands. It is actually the one and only operator in JavaScript which has that many.
>>>>>>> 027933531e121650120f7e8385f691de99af12d2

语法如下：
```js
let result = condition ? value1 : value2;
```

<<<<<<< HEAD
计算条件结果，如果结果为真，则返回 `value1`，否则返回 `value2`。
=======
The `condition` is evaluated: if it's truthy then `value1` is returned, otherwise -- `value2`.
>>>>>>> 027933531e121650120f7e8385f691de99af12d2

如下所示：

```js
let accessAllowed = (age > 18) ? true : false;
```

<<<<<<< HEAD
技术上，我们可以省略 `age > 18` 外面的括号。问号运算符的优先级较低。它在比较 `>` 后执行，所以也会执行相同的操作：
=======
Technically, we can omit the parentheses around `age > 18`. The question mark operator has a low precedence, so it executes after the comparison `>`.

This example will do the same thing as the previous one:
>>>>>>> 027933531e121650120f7e8385f691de99af12d2

```js
// 比较运算符 “age > 18” 首先执行
//（不需要将其包含在括号中）
let accessAllowed = age > 18 ? true : false;
```

<<<<<<< HEAD
但括号使代码更具可读性，所以建议使用它们。

````smart
在上面的例子中，可以去掉问号运算符，因为比较本身就返回 `true/false`：
=======
But parentheses make the code more readable, so we recommend using them.

````smart
In the example above, you can avoid using the question mark operator because the comparison itself returns `true/false`:
>>>>>>> 027933531e121650120f7e8385f691de99af12d2

```js
// 下面代码同样可以实现
let accessAllowed = age > 18;
```
````

## 多个 '?'

<<<<<<< HEAD
使用一系列问号 `?` 运算符可以返回一个取决于多个条件的值。
=======
A sequence of question mark operators `?` can return a value that depends on more than one condition.
>>>>>>> 027933531e121650120f7e8385f691de99af12d2

如下所示：
```js run
let age = prompt('age?', 18);

let message = (age < 3) ? 'Hi, baby!' :
  (age < 18) ? 'Hello!' :
  (age < 100) ? 'Greetings!' :
  'What an unusual age!';

alert( message );
```

<<<<<<< HEAD
很难一下子看出发生了什么。但经过仔细观察，我们可以看到它只是一个普通的检查序列。

1. 第一个问号检查 `age < 3`。
2. 如果为真 — 返回 `'Hi, baby!'`，否则 — 在冒号 `":"` 后面继续检查 `age < 18`。
3. 如果为真 — 返回 `'Hello!'`，否则 — 在下一个冒号 `":"` 后面继续检查 `age < 100`。
4. 如果为真 — 返回 `'Greetings!'`，否则 — 在最后一个冒号 `":"` 后面返回 `'What an unusual age!'`。

使用 `if..else` 实现上面的逻辑：
=======
It may be difficult at first to grasp what's going on. But after a closer look, we can see that it's just an ordinary sequence of tests:

1. The first question mark checks whether `age < 3`.
2. If true -- it returns `'Hi, baby!'`. Otherwise, it continues to the expression after the colon '":"', checking `age < 18`.
3. If that's true -- it returns `'Hello!'`. Otherwise, it continues to the expression after the next colon '":"', checking `age < 100`.
4. If that's true -- it returns `'Greetings!'`. Otherwise, it continues to the expression after the last colon '":"', returning `'What an unusual age!'`.

Here's how this looks using `if..else`:
>>>>>>> 027933531e121650120f7e8385f691de99af12d2

```js
if (age < 3) {
  message = 'Hi, baby!';
} else if (age < 18) {
  message = 'Hello!';
} else if (age < 100) {
  message = 'Greetings!';
} else {
  message = 'What an unusual age!';
}
```

## '?' 的非传统使用

有时可以使用问号 `?` 来代替 `if` 语句：

```js run no-beautify
let company = prompt('Which company created JavaScript?', '');

*!*
(company == 'Netscape') ?
   alert('Right!') : alert('Wrong.');
*/!*
```

<<<<<<< HEAD
根据 `company =='Netscape'` 条件，要么执行 `?` 后面的第一部分方法并显示对应内容，要么执行第二部分的方法并显示对应内容。

在这里我们不是把结果赋值给变量。而是根据条件执行不同的代码。

**不建议以这种方式使用问号运算符。**

这种写法比 `if` 语句更短，对一些程序员很有吸引力。但它的可读性较差。

下面是使用 `if` 语句实现的相同功能的代码，进行下比较：
=======
Depending on the condition `company == 'Netscape'`, either the first or the second expression after the `?` gets executed and shows an alert.

We don't assign a result to a variable here. Instead, we execute different code depending on the condition.

**We don't recommend using the question mark operator in this way.**

The notation is shorter than the equivalent `if` statement, which appeals to some programmers. But it is less readable.

Here is the same code using `if` for comparison:
>>>>>>> 027933531e121650120f7e8385f691de99af12d2

```js run no-beautify
let company = prompt('Which company created JavaScript?', '');

*!*
if (company == 'Netscape') {
  alert('Right!');
} else {
  alert('Wrong.');
}
*/!*
```

<<<<<<< HEAD
因为我们的眼睛垂直扫描代码。跨越多行的结构比长的水平代码更容易理解。

问号 `?` 的作用是根据条件返回一个或另一个值。请正确使用它。`if` 还可以用来执行代码的不同分支。
=======
Our eyes scan the code vertically. Code blocks which span several lines are easier to understand than a long, horizontal instruction set.

The purpose of the question mark operator `?` is to return one value or another depending on its condition. Please use it for exactly that. Use `if` when you need to execute different branches of code.
>>>>>>> 027933531e121650120f7e8385f691de99af12d2
