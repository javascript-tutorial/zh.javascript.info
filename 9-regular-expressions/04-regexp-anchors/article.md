# 锚点（Anchors)：字符串开始 ^ 和末尾 $

插入符号 `pattern:^` 和美元符号 `pattern:$` 在正则表达式中具有特殊的含义。它们被称为“锚点”。

插入符号 `pattern:^` 匹配文本开头，而美元符号 `pattern:$` 则匹配文本末尾。

举个例子，让我们测试一下文本是否以 `Mary` 开头：

```js run
let str1 = "Mary had a little lamb";
alert( /^Mary/.test(str1) ); // true
```

该模式 `pattern:^Mary` 表示：字符串开始，紧接着就是 "Mary"。

与此类似，我们可以用 `pattern:snow$` 来测试文本是否以 `snow` 结尾：

```js run
let str1 = "it's fleece was white as snow";
alert( /snow$/.test(str1) ); // true
```

在以上这些特殊的例子中我们实际上可以用 `startsWith/endsWith` 来代替。正则表达式应该被用于更加复杂的测试。

## 测试完全匹配

这两个锚点 `pattern:^...$` 放在一起通常被用于测试一个字符串是否完全匹配一个模式。例如，检查用户输入的格式是否正确。

让我们测试一个字符串是否是 `12:34` 格式的时间。即，两位数，然后是一个冒号，接着是另一个两位数。

用正则表达式来表示就是 `pattern:\d\d:\d\d`：

```js run
let goodInput = "12:34";
let badInput = "12:345";

let regexp = /^\d\d:\d\d$/;
alert( regexp.test(goodInput) ); // true
alert( regexp.test(badInput) ); // false
```

在这个例子中 `pattern:\d\d:\d\d` 所对应的匹配项必须正好在文本 `pattern:^` 的开头之后开始，并且结尾 `pattern:$` 必须紧跟其后。

整个字符串必须完全符合这个格式。如果其中有任何偏差或额外的字符，结果将为 `false`。

如果有修饰符 `pattern:m`，那么锚点的行为将会不同。我们将在下一篇文章中学习这一点。

```smart header="锚点“宽度”为零"
锚点 `pattern:^` 和 `pattern:$` 属于测试。它们的宽度为零。

换句话说，它们并不匹配一个具体的字符，而是让正则引擎测试所表示的条件（文本开头/文本末尾）。
```
