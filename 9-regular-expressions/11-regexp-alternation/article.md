# 选择（OR）|

选择是正则表达式中的一个术语，实际上是一个简单的“或”。

在正则表达式中，它用竖线 `pattern:|` 表示。

例如，我们需要找出编程语言：HTML、PHP、Java 或 JavaScript。

对应的正则表达式为：`pattern:html|php|java(script)?`。

用例如下：

```js run
let reg = /html|php|css|java(script)?/gi;

let str = "First HTML appeared, then CSS, then JavaScript";

alert( str.match(reg) ); // 'HTML', 'CSS', 'JavaScript'
```

我们已知的一个相似符号 —— 方括号。就允许在许多字符中进行选择，例如 `pattern:gr[ae]y` 匹配 `match:gray` 或 `match:grey`。

<<<<<<< HEAD:5-regular-expressions/11-regexp-alternation/article.md
选择符号并非在字符级别生效，而是在表达式级别。正则表达式 `pattern:A|B|C` 意思是命中 `A`、`B` 或 `C` 其一均可。
=======
Square brackets allow only characters or character sets. Alternation allows any expressions. A regexp `pattern:A|B|C` means one of expressions `A`, `B` or `C`.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:9-regular-expressions/11-regexp-alternation/article.md

例如：

<<<<<<< HEAD:5-regular-expressions/11-regexp-alternation/article.md
- `pattern:gr(a|e)y` 严格等同 `pattern:gr[ae]y`。
- `pattern:gra|ey` 匹配 "gra" or "ey"。
=======
- `pattern:gr(a|e)y` means exactly the same as `pattern:gr[ae]y`.
- `pattern:gra|ey` means `match:gra` or `match:ey`.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:9-regular-expressions/11-regexp-alternation/article.md

我们通常用圆括号把模式中的选择部分括起来，像这样 `pattern:before(XXX|YYY)after`。

## 时间正则表达式

<<<<<<< HEAD:5-regular-expressions/11-regexp-alternation/article.md
在之前的章节中有个任务是构建用于查找形如 `hh:mm` 的时间字符串，例如 `12:00`。但是简单的 `pattern:\d\d:\d\d` 过于模糊。它同时匹配 `25:99`。
=======
In previous chapters there was a task to build a regexp for searching time in the form `hh:mm`, for instance `12:00`. But a simple `pattern:\d\d:\d\d` is too vague. It accepts `25:99` as the time (99 seconds is valid, but shouldn't be).
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:9-regular-expressions/11-regexp-alternation/article.md

如何构建更优的正则表达式？

<<<<<<< HEAD:5-regular-expressions/11-regexp-alternation/article.md
我们可以应用到更多的严格匹配结果中：

- 首个匹配数字必须是 `0` 或 `1`，同时其后还要跟随任一数字。
- 或者是数字 `2` 之后跟随 `pattern:[0-3]`。
=======
We can apply more careful matching. First, the hours:

- If the first digit is `0` or `1`, then the next digit can by anything.
- Or, if the first digit is `2`, then the next must be `pattern:[0-3]`.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:9-regular-expressions/11-regexp-alternation/article.md

构建正则表达式：`pattern:[01]\d|2[0-3]`。

<<<<<<< HEAD:5-regular-expressions/11-regexp-alternation/article.md
接着可以添加冒号和分钟的部分。

分钟的部分必须在 `0` 到 `59` 区间，在正则表达式语言中含义为首个匹配数字 `pattern:[0-5]` 其后跟随任一数字 `\d`。
=======
Next, the minutes must be from `0` to `59`. In the regexp language that means `pattern:[0-5]\d`: the first digit `0-5`, and then any digit.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:9-regular-expressions/11-regexp-alternation/article.md

把他们拼接在一起形成最终的模式 `pattern:[01]\d|2[0-3]:[0-5]\d`。

<<<<<<< HEAD:5-regular-expressions/11-regexp-alternation/article.md
快大功告成了，但仍然存在一个问题。选择符 `|` 在 `pattern:[01]\d` 和 `pattern:2[0-3]:[0-5]\d` 之间。这是错误的，因为它只匹配符号左侧或右侧任一表达式。


```js run
let reg = /[01]\d|2[0-3]:[0-5]\d/g;

alert("12".match(reg)); // 12 (matched [01]\d)
```

这个错误相当明显，但也是初学正则表达式的常见错误。

我们需要添加一个插入语用于匹配时钟：`[01]\d` 或 `2[0-3]`。
=======
We're almost done, but there's a problem. The alternation `pattern:|` now happens to be between `pattern:[01]\d` and `pattern:2[0-3]:[0-5]\d`.

That's wrong, as it should be applied only to hours `[01]\d` OR `2[0-3]`. That's a common mistake when starting to work with regular expressions.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:9-regular-expressions/11-regexp-alternation/article.md

以下为正确版本：

```js run
let reg = /([01]\d|2[0-3]):[0-5]\d/g;

alert("00:00 10:10 23:59 25:99 1:2".match(reg)); // 00:00,10:10,23:59
```
