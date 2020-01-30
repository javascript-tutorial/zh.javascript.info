# 锚点（Anchors)：字符串开始 ^ 和末尾 $

插入符号 `pattern:^` 和美元符号 `pattern:$` 在正则表达式中具有特殊的意义。它们被称为“锚点”。

插入符号 `pattern:^` 匹配文本开头，而美元符号 `pattern:$` － 则匹配文本末尾。

举个例子，让我们测试一下文本是否以 `Mary` 开头：

```js run
let str1 = "Mary had a little lamb";
alert( /^Mary/.test(str1) ); // true
```

该模式 `pattern:^Mary` 的意思是：字符串开始，接着是 “Mary”。

与此类似，我们可以用 `pattern:snow$` 来测试文本是否以 `snow` 结尾:

```js run
let str1 = "it's fleece was white as snow";
alert( /snow$/.test(str1) ); // true
```

在以上这些具体的例子中我们实际上可以用 `startsWith/endsWith` 来代替。正则表达式应该被用于更加复杂的测试中。

## 测试完全匹配

这两个锚点 `pattern:^...$` 放在一起常常被用于测试一个字符串是否完全匹配一个模式。比如，测试用户的输入是否符合正确的格式。

让我们测试一下一个字符串是否属于 `12:34` 格式的时间。即，两个数字，然后一个冒号，接着是另外两个数字。

用正则表达式来表示就是 `pattern:\d\d:\d\d`：

```js run
let goodInput = "12:34";
let badInput = "12:345";

let regexp = /^\d\d:\d\d$/;
alert( regexp.test(goodInput) ); // true
alert( regexp.test(badInput) ); // false
```

在这个例子中 `pattern:\d\d:\d\d` 所对应的匹配文本必须正好在文本开头 `pattern:^` 之后，而在这之后必须紧跟文本末尾 `pattern:$`。

整个字符串必须准确地符合这一个格式。如果其中有任何偏差或者额外的字符，结果将为 `false`。

当修饰符 `pattern:m` 出现时，锚点将会有不同的行为。我们将在后面学习到。

```smart header="锚点具有“零宽度”"
锚点 `pattern:^` 和 `pattern:$` 属于测试。它们的宽度为零。

换句话来说，它们并不匹配一个具体的字符，而是让正则引擎测试所表示的条件（文本开头/文本末尾）。
```
