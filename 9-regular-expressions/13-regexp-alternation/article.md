<<<<<<< HEAD
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

选择符号并非在字符级别生效，而是在表达式级别。正则表达式 `pattern:A|B|C` 意思是命中 `A`、`B` 或 `C` 其一均可。

例如：

- `pattern:gr(a|e)y` 严格等同 `pattern:gr[ae]y`。
- `pattern:gra|ey` 匹配 "gra" or "ey"。

我们通常用圆括号把模式中的选择部分括起来，像这样 `pattern:before(XXX|YYY)after`。

## 时间正则表达式

在之前的章节中有个任务是构建用于查找形如 `hh:mm` 的时间字符串，例如 `12:00`。但是简单的 `pattern:\d\d:\d\d` 过于模糊。它同时匹配 `25:99`。

如何构建更优的正则表达式？

我们可以应用到更多的严格匹配结果中：

- 首个匹配数字必须是 `0` 或 `1`，同时其后还要跟随任一数字。
- 或者是数字 `2` 之后跟随 `pattern:[0-3]`。

构建正则表达式：`pattern:[01]\d|2[0-3]`。

接着可以添加冒号和分钟的部分。

分钟的部分必须在 `0` 到 `59` 区间，在正则表达式语言中含义为首个匹配数字 `pattern:[0-5]` 其后跟随任一数字 `\d`。

把他们拼接在一起形成最终的模式 `pattern:[01]\d|2[0-3]:[0-5]\d`。

快大功告成了，但仍然存在一个问题。选择符 `|` 在 `pattern:[01]\d` 和 `pattern:2[0-3]:[0-5]\d` 之间。这是错误的，因为它只匹配符号左侧或右侧任一表达式。


```js run
let reg = /[01]\d|2[0-3]:[0-5]\d/g;

alert("12".match(reg)); // 12 (matched [01]\d)
```

这个错误相当明显，但也是初学正则表达式的常见错误。

我们需要添加一个插入语用于匹配时钟：`[01]\d` 或 `2[0-3]`。

以下为正确版本：

```js run
let reg = /([01]\d|2[0-3]):[0-5]\d/g;

alert("00:00 10:10 23:59 25:99 1:2".match(reg)); // 00:00,10:10,23:59
=======
# Alternation (OR) |

Alternation is the term in regular expression that is actually a simple "OR".

In a regular expression it is denoted with a vertical line character `pattern:|`.

For instance, we need to find programming languages: HTML, PHP, Java or JavaScript.

The corresponding regexp: `pattern:html|php|java(script)?`.

A usage example:

```js run
let regexp = /html|php|css|java(script)?/gi;

let str = "First HTML appeared, then CSS, then JavaScript";

alert( str.match(regexp) ); // 'HTML', 'CSS', 'JavaScript'
```

We already saw a similar thing -- square brackets. They allow to choose between multiple characters, for instance `pattern:gr[ae]y` matches `match:gray` or `match:grey`.

Square brackets allow only characters or character sets. Alternation allows any expressions. A regexp `pattern:A|B|C` means one of expressions `A`, `B` or `C`.

For instance:

- `pattern:gr(a|e)y` means exactly the same as `pattern:gr[ae]y`.
- `pattern:gra|ey` means `match:gra` or `match:ey`.

To apply alternation to a chosen part of the pattern, we can enclose it in parentheses:
- `pattern:I love HTML|CSS` matches `match:I love HTML` or `match:CSS`.
- `pattern:I love (HTML|CSS)` matches `match:I love HTML` or `match:I love CSS`.

## Example: regexp for time

In previous articles there was a task to build a regexp for searching time in the form `hh:mm`, for instance `12:00`. But a simple `pattern:\d\d:\d\d` is too vague. It accepts `25:99` as the time (as 99 seconds match the pattern, but that time is invalid).

How can we make a better pattern?

We can use more careful matching. First, the hours:

- If the first digit is `0` or `1`, then the next digit can be any: `pattern:[01]\d`.
- Otherwise, if the first digit is `2`, then the next must be `pattern:[0-3]`.
- (no other first digit is allowed)

We can write both variants in a regexp using alternation: `pattern:[01]\d|2[0-3]`.

Next, minutes must be from `00` to `59`. In the regular expression language that can be written as `pattern:[0-5]\d`: the first digit `0-5`, and then any digit.

If we glue minutes and seconds together, we get the pattern: `pattern:[01]\d|2[0-3]:[0-5]\d`.

We're almost done, but there's a problem. The alternation `pattern:|` now happens to be between `pattern:[01]\d` and `pattern:2[0-3]:[0-5]\d`.

That is: minutes are added to the second alternation variant, here's a clear picture:

```
[01]\d  |  2[0-3]:[0-5]\d
```

That pattern looks for `pattern:[01]\d` or `pattern:2[0-3]:[0-5]\d`.

But that's wrong, the alternation should only be used in the "hours" part of the regular expression, to allow `pattern:[01]\d` OR `pattern:2[0-3]`. Let's correct that by enclosing "hours" into parentheses: `pattern:([01]\d|2[0-3]):[0-5]\d`.

The final solution:

```js run
let regexp = /([01]\d|2[0-3]):[0-5]\d/g;

alert("00:00 10:10 23:59 25:99 1:2".match(regexp)); // 00:00,10:10,23:59
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
```
