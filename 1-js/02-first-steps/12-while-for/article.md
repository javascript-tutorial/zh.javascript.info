# 循环：while 和 for

<<<<<<< HEAD
我们经常需要重复执行一些操作。

例如，我们需要将列表中的商品逐个输出，或者运行相同的代码将数字 1 到 10 逐个输出。

**循环** 是一种重复运行同一代码的方法。
=======
We often need to repeat actions.

For example, outputting goods from a list one after another or just running the same code for each number from 1 to 10.

*Loops* are a way to repeat the same code multiple times.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

## "while" 循环

`while` 循环的语法如下：

```js
while (condition) {
  // 代码
  // 所谓的“循环体” 
}
```

<<<<<<< HEAD
当 `condition` 为 `true` 时，执行循环体的 `code`。
=======
While the `condition` is truthy, the `code` from the loop body is executed.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

例如，以下将循环输出当 `i < 3` 时的 `i` 值：

```js run
let i = 0;
while (i < 3) { // 依次显示 0、1 和 2
  alert( i );
  i++;
}
```

循环体的单次执行叫作 **一次迭代**。上面示例中的循环进行了三次迭代。

<<<<<<< HEAD
如果上述示例中没有 `i++`，那么循环（理论上）会永远重复执行下去。实际上，浏览器提供了阻止这种循环的方法，我们可以通过终止进程，来停掉服务器端的 JavaScript。

任何表达式或变量都可以是循环条件，而不仅仅是比较。在 `while` 中的循环条件会被计算，计算结果会被转化为布尔值。

例如，`while (i != 0)` 可简写为 `while (i)`：
=======
If `i++` was missing from the example above, the loop would repeat (in theory) forever. In practice, the browser provides ways to stop such loops, and in server-side JavaScript, we can kill the process.

Any expression or variable can be a loop condition, not just comparisons: the condition is evaluated and converted to a boolean by `while`.

For instance, a shorter way to write `while (i != 0)` is `while (i)`:
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

```js run
let i = 3;
*!*
while (i) { // 当 i 变成 0 时，条件为 false，循环终止
*/!*
  alert( i );
  i--;
}
```

<<<<<<< HEAD
````smart header="单行循环体不需要大括号"
如果循环体只有一条语句，则可以省略大括号 `{…}`：
=======
````smart header="Curly braces are not required for a single-line body"
If the loop body has a single statement, we can omit the curly braces `{…}`:
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

```js run
let i = 3;
*!*
while (i) alert(i--);
*/!*
```
````

## "do..while" 循环

使用 `do..while` 语法可以将条件检查移至循环体 **下面**：

```js
do {
  // 循环体
} while (condition);
```

<<<<<<< HEAD
循环首先执行循环体，然后检查条件，当条件为真时，重复执行循环体。
=======
The loop will first execute the body, then check the condition, and, while it's truthy, execute it again and again.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

例如：

```js run
let i = 0;
do {
  alert( i );
  i++;
} while (i < 3);
```

<<<<<<< HEAD
这种形式的语法很少使用，除非你希望不管条件是否为真，循环体 **至少执行一次**。通常我们更倾向于使用另一个形式：`while(…) {…}`。
=======
This form of syntax should only be used when you want the body of the loop to execute **at least once** regardless of the condition being truthy. Usually, the other form is preferred: `while(…) {…}`.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

## "for" 循环

<<<<<<< HEAD
`for` 循环更加复杂，但它是最常使用的循环形式。
=======
The `for` loop is more complex, but it's also the most commonly used loop.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

`for` 循环看起来就像这样：

```js
for (begin; condition; step) {
  // ……循环体……
}
```

我们通过示例来了解一下这三个部分的含义。下述循环从 `i` 等于 `0` 到 `3`（但不包括 `3`）运行 `alert(i)`：

```js run
for (let i = 0; i < 3; i++) { // 结果为 0、1、2
  alert(i);
}
```

<<<<<<< HEAD
我们逐个部分分析 `for` 循环：

| 语句段 |             |                                                                            |
| ----- | ----------- |----------------------------------------------------------------------------|
| begin | `i = 0`     | 进入循环时执行一次。                                     |
| condition | `i < 3` | 在每次循环迭代之前检查，如果为 false，停止循环。          |
| body（循环体） | `alert(i)` | 条件为真时，重复运行。                        |
| step | `i++`        | 在每次循环体迭代后执行。 |

一般循环算法的工作原理如下：

=======
Let's examine the `for` statement part-by-part:

| part  |          |                                                                            |
|-------|----------|----------------------------------------------------------------------------|
| begin | `i = 0`    | Executes once upon entering the loop.                                      |
| condition | `i < 3`| Checked before every loop iteration. If false, the loop stops.              |
| body | `alert(i)`| Runs again and again while the condition is truthy.                         |
| step| `i++`      | Executes after the body on each iteration. |

The general loop algorithm works like this:

>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080
```
开始运行
→ (如果 condition 成立 → 运行 body 然后运行 step)
→ (如果 condition 成立 → 运行 body 然后运行 step)
→ (如果 condition 成立 → 运行 body 然后运行 step)
→ ...
```

<<<<<<< HEAD
所以，`begin` 执行一次，然后进行迭代：每次检查 `condition` 后，执行 `body` 和 `step`。

如果你这是第一次接触循环，那么回到这个例子，在一张纸上重现它逐步运行的过程，可能会对你有所帮助。

以下是在这个示例中发生的事：
=======
That is, `begin` executes once, and then it iterates: after each `condition` test, `body` and `step` are executed.

If you are new to loops, it could help to go back to the example and reproduce how it runs step-by-step on a piece of paper.

Here's exactly what happens in our case:
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

```js
// for (let i = 0; i < 3; i++) alert(i)

// 开始
let i = 0
// 如果条件为真，运行下一步
if (i < 3) { alert(i); i++ }
// 如果条件为真，运行下一步
if (i < 3) { alert(i); i++ }
// 如果条件为真，运行下一步
if (i < 3) { alert(i); i++ }
// ……结束，因为现在 i == 3
```

<<<<<<< HEAD
````smart header="内联变量声明"
这里“计数”变量 `i` 是在循环中声明的。这叫做“内联”变量声明。这样的变量只在循环中可见。
=======
````smart header="Inline variable declaration"
Here, the "counter" variable `i` is declared right in the loop. This is called an "inline" variable declaration. Such variables are visible only inside the loop.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

```js run
for (*!*let*/!* i = 0; i < 3; i++) {
  alert(i); // 0, 1, 2
}
alert(i); // 错误，没有这个变量。
```

<<<<<<< HEAD
除了定义一个变量，我们也可以使用现有的变量：
=======
Instead of defining a variable, we could use an existing one:
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

```js run
let i = 0;

for (i = 0; i < 3; i++) { // 使用现有的变量
  alert(i); // 0, 1, 2
}

alert(i); //3，可见，因为是在循环之外声明的
```

````


### 省略语句段

`for` 循环的任何语句段都可以被省略。

例如，如果我们在循环开始时不需要做任何事，我们就可以省略 `begin` 语句段。

就像这样：

```js run
let i = 0; // 我们已经声明了 i 并对它进行了赋值

for (; i < 3; i++) { // 不再需要 "begin" 语句段
  alert( i ); // 0, 1, 2
}
```

我们也可以移除 `step` 语句段：

```js run
let i = 0;

for (; i < 3;) {
  alert( i++ );
}
```

<<<<<<< HEAD
该循环与 `while (i < 3)` 等价。

实际上我们可以删除所有内容，从而创建一个无限循环：
=======
This makes the loop identical to `while (i < 3)`.

We can actually remove everything, creating an infinite loop:
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

```js
for (;;) {
  // 无限循环
}
```

<<<<<<< HEAD
请注意 `for` 的两个 `;` 必须存在，否则会出现语法错误。
=======
Please note that the two `for` semicolons `;` must be present. Otherwise, there would be a syntax error.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

## 跳出循环

<<<<<<< HEAD
通常条件为假时，循环会终止。

但我们随时都可以使用 `break` 指令强制退出。

例如，下面这个循环要求用户输入一系列数字，在输入的内容不是数字时“终止”循环。
=======
Normally, a loop exits when its condition becomes falsy.

But we can force the exit at any time using the special `break` directive.

For example, the loop below asks the user for a series of numbers, "breaking" when no number is entered:
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

```js run
let sum = 0;

while (true) {

  let value = +prompt("Enter a number", '');

*!*
  if (!value) break; // (*)
*/!*

  sum += value;

}
alert( 'Sum: ' + sum );
```

<<<<<<< HEAD
如果用户输入空行或取消输入，在 `(*)` 行的 `break` 指令会被激活。它立刻终止循环，将控制权传递给循环后的第一行，即，`alert`。

根据需要，"无限循环 + `break`" 的组合非常适用于不必在循环开始/结束时检查条件，但需要在中间甚至是主体的多个位置进行条件检查的情况。
=======
The `break` directive is activated at the line `(*)` if the user enters an empty line or cancels the input. It stops the loop immediately, passing control to the first line after the loop. Namely, `alert`.

The combination "infinite loop + `break` as needed" is great for situations when a loop's condition must be checked not in the beginning or end of the loop, but in the middle or even in several places of its body.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

## 继续下一次迭代 [#continue]

<<<<<<< HEAD
`continue` 指令是 `break` 的“轻量版”。它不会停掉整个循环。而是停止当前这一次迭代，并强制启动新一轮循环（如果条件允许的话）。

如果我们完成了当前的迭代，并且希望继续执行下一次迭代，我们就可以使用它。
=======
The `continue` directive is a "lighter version" of `break`. It doesn't stop the whole loop. Instead, it stops the current iteration and forces the loop to start a new one (if the condition allows).

We can use it if we're done with the current iteration and would like to move on to the next one.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

下面这个循环使用 `continue` 来只输出奇数：

```js run no-beautify
for (let i = 0; i < 10; i++) {

  //如果为真，跳过循环体的剩余部分。
  *!*if (i % 2 == 0) continue;*/!*

  alert(i); // 1，然后 3，5，7，9
}
```

<<<<<<< HEAD
对于偶数的 `i` 值，`continue` 指令会停止本次循环的继续执行，将控制权传递给下一次 `for` 循环的迭代（使用下一个数字）。因此 `alert` 仅被奇数值调用。

````smart header="`continue` 指令利于减少嵌套"
显示奇数的循环可以像下面这样：
=======
For even values of `i`, the `continue` directive stops executing the body and passes control to the next iteration of `for` (with the next number). So the `alert` is only called for odd values.

````smart header="The `continue` directive helps decrease nesting"
A loop that shows odd values could look like this:
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

```js run
for (let i = 0; i < 10; i++) {

  if (i % 2) {
    alert( i );
  }

}
```

<<<<<<< HEAD
从技术角度看，它与上一个示例完全相同。当然，我们可以将代码包装在 `if` 块而不使用 `continue`。

但在副作用方面，它多创建了一层嵌套（大括号内的 `alert` 调用）。如果 `if` 中代码有多行，则可能会降低代码整体的可读性。
````

````warn header="禁止 `break/continue` 在 ‘?’ 的右边"
请注意非表达式的语法结构不能与三元运算符 `?` 一起使用。特别是 `break/continue` 这样的指令是不允许这样使用的。
=======
From a technical point of view, this is identical to the example above. Surely, we can just wrap the code in an `if` block instead of using `continue`.

But as a side-effect, this created one more level of nesting (the `alert` call inside the curly braces). If the code inside of `if` is longer than a few lines, that may decrease the overall readability.
````

````warn header="No `break/continue` to the right side of '?'"
Please note that syntax constructs that are not expressions cannot be used with the ternary operator `?`. In particular, directives such as `break/continue` aren't allowed there.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

例如，我们使用如下代码：

```js
if (i > 5) {
  alert(i);
} else {
  continue;
}
```

<<<<<<< HEAD
……用问号重写：


```js no-beautify
(i > 5) ? alert(i) : *!*continue*/!*; // continue 不允许在这个位置
```

……代码会停止运行，并显示有语法错误。

这是不（建议）使用问号 `?` 操作符替代 `if` 语句的另一个原因。
=======
...and rewrite it using a question mark:


```js no-beautify
(i > 5) ? alert(i) : *!*continue*/!*; // continue isn't allowed here
```

...it stops working: there's a syntax error.

This is just another reason not to use the question mark operator `?` instead of `if`.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080
````

## break/continue 标签

有时候我们需要从一次从多层嵌套的循环中跳出来。

<<<<<<< HEAD
例如，下述代码中我们的循环使用了 `i` 和 `j`，从 `(0,0)` 到 `(3,3)` 提示坐标 `(i, j)`：
=======
For example, in the code below we loop over `i` and `j`, prompting for the coordinates `(i, j)` from `(0,0)` to `(2,2)`:
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

```js run no-beautify
for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Value at coords (${i},${j})`, '');

<<<<<<< HEAD
    // 如果我想从这里退出并直接执行 alert('Done!')
=======
    // what if we want to exit from here to Done (below)?
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080
  }
}

alert('Done!');
```

我们需要提供一种方法，以在用户取消输入时来停止这个过程。

<<<<<<< HEAD
在 `input` 之后的普通 `break` 只会打破内部循环。这还不够 —— 标签可以实现这一功能！
=======
The ordinary `break` after `input` would only break the inner loop. That's not sufficient--labels, come to the rescue!
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

**标签** 是在循环之前带有冒号的标识符：
```js
labelName: for (...) {
  ...
}
```

<<<<<<< HEAD
`break <labelName>` 语句跳出循环至标签处：
=======
The `break <labelName>` statement in the loop below breaks out to the label:
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

```js run no-beautify
*!*outer:*/!* for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Value at coords (${i},${j})`, '');

    // 如果是空字符串或被取消，则中断并跳出这两个循环。
    if (!input) *!*break outer*/!*; // (*)

    // 用得到的值做些事……
  }
}
alert('Done!');
```

<<<<<<< HEAD
上述代码中，`break outer` 向上寻找名为 `outer` 的标签并跳出当前循环。
=======
In the code above, `break outer` looks upwards for the label named `outer` and breaks out of that loop.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

因此，控制权直接从 `(*)` 转至 `alert('Done!')`。

我们还可以将标签移至单独一行：

```js no-beautify
outer:
for (let i = 0; i < 3; i++) { ... }
```

<<<<<<< HEAD
`continue` 指令也可以与标签一起使用。在这种情况下，执行跳转到标记循环的下一次迭代。

````warn header="标签并不允许“跳到”所有位置"
标签不允许我们跳到代码的任意位置。
=======
The `continue` directive can also be used with a label. In this case, code execution jumps to the next iteration of the labeled loop.

````warn header="Labels do not allow to \"jump\" anywhere"
Labels do not allow us to jump into an arbitrary place in the code.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

例如，这样做是不可能的：
```js
<<<<<<< HEAD
break label;  // 无法跳转到这个标签
=======
break label; // doesn't jumps to the label below
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080

label: for (...)
```

<<<<<<< HEAD
只有在循环内部才能调用 `break/continue`，并且标签必须位于指令上方的某个位置。 
=======
A call to `break/continue` is only possible from inside a loop and the label must be somewhere above the directive.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080
````

## 总结

我们学习了三种循环：

- `while` —— 每次迭代之前都要检查条件。
- `do..while` —— 每次迭代后都要检查条件。
- `for (;;)` —— 每次迭代之前都要检查条件，可以使用其他设置。

通常使用 `while(true)` 来构造“无限”循环。这样的循环和其他循环一样，都可以通过 `break` 指令来终止。

<<<<<<< HEAD
如果我们不想在当前迭代中做任何事，并且想要转移至下一次迭代，那么可以使用 `continue` 指令。

`break/continue` 支持循环前的标签。标签是 `break/continue` 跳出嵌套循环以转到外部的唯一方法。
=======
If we don't want to do anything in the current iteration and would like to forward to the next one, we can use the `continue` directive.

`break/continue` support labels before the loop. A label is the only way for `break/continue` to escape a nested loop to go to an outer one.
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080
