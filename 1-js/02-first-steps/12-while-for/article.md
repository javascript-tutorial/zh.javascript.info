# 循环：while 和 for

我们经常需要连续多次执行类似的操作。

例如，我们需要从列表中逐个输出商品时，或者对从 1 到 10 的每个数字运行相同的代码时。

**循环**是一种多次重复运行同一部分代码的方法。

## "while" 循环

`while` 循环有如下语法：

```js
while (condition) {
  // 代码
  // 所谓的“循环体” 
}
```

当 `condition` 为 `true`时，执行来自循环体的 `code`。

例如，以下将循环输出当 `i < 3` 时的 `i`：

```js run
let i = 0;
while (i < 3) { // 结果分别是 0、1、2
  alert( i );
  i++;
}
```

循环体的单次执行叫作**一次迭代**。上面示例中的循环进行三次迭代。

如果上述示例中没有 `i++`，那么循环（理论上）会永远重复。实际上，浏览器提供了阻止这种循环的方法，对于服务器端 JavaScript，我们可以终止该过程。

任何表达式或变量都可以是循环条件，而不仅仅是比较。对它们进行计算，并通过 `while` 将其结果转化为布尔值。

例如，`while (i != 0)` 可简写为 `while (i)`：

```js run
let i = 3;
*!*
while (i) { // 当 i 变成 0 时，条件为 false，循环终止
*/!*
  alert( i );
  i--;
}
```

````smart header="Brackets are not required for a single-line body"
如果循环体只有一条语句，则可以省略括号 `{…}`：

```js run
let i = 3;
*!*
while (i) alert(i--);
*/!*
```
````

## "do..while" 循环

使用 `do..while` 语法可以将条件检查移至循环体**下面**：

```js
do {
  // 循环体
} while (condition);
```

循环首先执行循环体，然后检查条件，当条件为真时，重复执行循环体。

例如：

```js run
let i = 0;
do {
  alert( i );
  i++;
} while (i < 3);
```

这种形式的语法很少使用，除非您希望不管条件是否为真，循环体**至少执行一次**。通常其他形式是首选：`while(…) {…}`。

## "for" 循环

`for` 循环是最常使用的。

看起来就像这样：

```js
for (begin; condition; step) {
  // ... loop body ...
}
```

我们通过示例来了解这部分的含义。下述循环运行从 `i` 等于 `0` 到 `3`（但不包括 `3`）的 `alert(i)`：

```js run
for (let i = 0; i < 3; i++) { // 结果为 0、1、2
  alert(i);
}
```

我们逐部分地检查 `for` 语句：

| 部分 |          |                                                                            |
| -----|----------|----------------------------------------------------------------------------|
| 开始 | `i = 0`    | 进入循环时执行一次。                                     |
| 条件 | `i < 3`| 在每次循环迭代之前检查，如果失败，循环停止。          |
| 步骤 | `i++`      | 在每次迭代后执行主体，但在条件检查之前执行。 |
| 主体 | `alert(i)`| 条件为真时，重复运行。                        |


一般循环算法的工作原理如下：
```
Run begin
→ (if condition → run body and run step)
→ (if condition → run body and run step)
→ (if condition → run body and run step)
→ ...
```

如果您是循环方面的小白，那么回到这个例子，在一张纸上重现它逐步运行的过程，可能会对你有所帮助。

以下是我们示例中发生的情况：

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
// ...结束，因为现在 i == 3
```

````smart header="Inline variable declaration"
这里“计数”变量 `i` 在循环中声明。这叫做“内联”变量声明。这样的变量只在循环中可见。

```js run
for (*!*let*/!* i = 0; i < 3; i++) {
  alert(i); // 0, 1, 2
}
alert(i); // 错误，没有这个变量。
```

我们可以使用现有的变量而不是定义变量：

```js run
let i = 0;

for (i = 0; i < 3; i++) { // 使用现有变量
  alert(i); // 0, 1, 2
}

alert(i); //3，可见，因为在循环之外声明
```

````


### 跳过

`for` 循环的任何部分都可以被跳过。

例如，如果我们在循环开始时不需要做任何事，我们可以省略 `begin` 部分。

就像这样：

```js run
let i = 0; // 我们已经声明并分配了

for (; i < 3; i++) { // "begin" 部分不再需要
  alert( i ); // 0, 1, 2
}
```

我们也可以移除 `step` 部分：

```js run
let i = 0;

for (; i < 3;) {
  alert( i++ );
}
```

该循环与 `while (i < 3)` 等价。

实际上我们可以删除所有内容，从而创建一个无限循环：

```js
for (;;) {
  // 无限循环
}
```

请注意 `for` 的两个 `;` 必须存在，否则会出现语法错误。

## 跳出循环

通常条件为假时，循环会终止。

但我们随时都可以强制退出，因为有一个特殊的 `break` 指令可以做到这一点。

例如，下诉循环要求用户输入一系列数字，但会在没有数字输入时候“终止”。

```js
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

如果用户输入空行或取消输入，在 `(*)` 行 `break` 指令会被激活。它立刻终止循环，将控制权传递给循环后的第一行，即，`alert`。

根据需要，"无限循环 + `break`" 的组合非常适用于不必在循环开始/结束时检查条件，但在中间甚至是主体的多个位置进行检查的情况。

## 继续下一次迭代 [#continue]

`continue` 指令是 `break` 的“轻量版”。这并不能阻止整个循环。相反，它将停止当前的迭代，并强制启动新一轮循环（如果条件允许的话）。

如果我们完成了当前的迭代，并且希望继续执行下一次迭代，我们就可以使用它。

下述循环使用 `continue` 只输出奇数：

```js run no-beautify
for (let i = 0; i < 10; i++) {

  //如果为真，跳过循环体的剩余部分。
  *!*if (i % 2 == 0) continue;*/!*

  alert(i); // 1、3、5、7、9
}
```

对于偶数的 `i`，`continue` 指令停止执行，将控制权传递给下一次 `for`（使用下一个数字）的迭代。因此 `alert` 仅被奇数值调用。

````smart header="The directive `continue` helps to decrease nesting level"
显示奇数的循环如下所示：

```js
for (let i = 0; i < 10; i++) {

  if (i % 2) {
    alert( i );
  }

}
```

从技术角度看，它与上述示例完全相同。当然，我们可以将代码包装在 `if` 块而不是 `continue` 块。

但作为副作用，我们还有一个嵌套级别（花括号内的 `alert` 调用）。如果 `if` 中代码超过几行，则可能会降低总体可读性。
````

````warn header="No `break/continue` to the right side of '?'"
请注意非表达式的语法结构不能与三元运算符 `?` 一起使用。特别是 `break/continue` 这样的指令是不被允许使用的。

例如，我们使用如下代码：

```js
if (i > 5) {
  alert(i);
} else {
  continue;
}
```

...然后用问号重写：


```js no-beautify
(i > 5) ? alert(i) : *!*continue*/!*; // continue not allowed here
```

...然后会停止运行。这样的代码将给出语法错误：


这只是不适用 `?` 而不是 `if` 的另一个原因。
````

## break/continue 标签

有时候我们需要从多个嵌套循环中跳出来。

例如，下诉代码中我们的循环使用 `i` 和 `j`，提示坐标 `(i, j)` 从 `(0,0)` 到 `(3,3)`：

```js run no-beautify
for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Value at coords (${i},${j})`, '');

    // 如果我想从这里退出并结束（如下所示）？

  }
}

alert('Done!');
```

如果用户取消输入，我们需要另一种方法来停止这个过程。

在 `input` 之后的普通 `break` 只会打破内部循环。这还不够。标签可以拯救。

**标签**是在循环之前带有冒号的标识符：
```js
labelName: for (...) {
  ...
}
```

`break <labelName>` 语句跳出循环至标签处。

就像这样：

```js run no-beautify
*!*outer:*/!* for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Value at coords (${i},${j})`, '');

    // 如果是空字符串或已取消，则中断这两个循环。
    if (!input) *!*break outer*/!*; // (*)

    // 做些有价值的事
  }
}
alert('Done!');
```

上述代码中，`break outer` 向上寻找名为 `outer` 的标签并跳出当前循环。

因此，控制权直接从 `(*)` 转至 `alert('Done!')`。

我们还可以将标签转移至另一行：

```js no-beautify
outer:
for (let i = 0; i < 3; i++) { ... }
```

`continue` 指令也可以与标签一起使用。在这种情况下，执行跳转到标记循环的下一次迭代。

````warn header="Labels are not a \"goto\""
标签不允许我们跳到任意代码位置。

例如，这样做是不可能的：
```js
break label;  // 跳转到标签？不。

label: for (...)
```

只有在循环内部才能调用 `break/continue`，并且标签必须位于指令上方的某个位置。 
````

## 总结

我们讨论了三种类型的循环：

- `while` —— 每次迭代之前都要检查条件。
- `do..while` —— 每次迭代后都要检查条件。
- `for (;;)` —— 每次迭代之前都要检查条件，可以使用其他设置。

通常使用 `while(true)` 来构造“无限”循环。这样的循环就像任何其他循环一样，可以通过 `break` 指令来终止。

如果我们不想在当前迭代中做任何事，并且想要转移至下一次迭代，那么 `continue` 指令就会执行它。

`break/continue` 支持循环前的标签。标签是 `break/continue` 避免嵌套并转到外部循环的唯一方法。
