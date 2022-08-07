# 选择 (OR) |

选择是正则表达式中的一个术语，实际上是一个简单的“或”。

在正则表达式中，它用竖线 `pattern:|` 表示。

例如，我们想要找出编程语言：HTML、PHP、Java 或 JavaScript。

对应的正则表达式为：`pattern:html|php|java(script)?`。

用例如下：

```js run
let regexp = /html|php|css|java(script)?/gi;

let str = "First HTML appeared, then CSS, then JavaScript";

alert( str.match(regexp) ); // 'HTML', 'CSS', 'JavaScript'
```

我们看到过类似的东西 —— 方括号。它允许我们在多个字符中进行选择，例如 `pattern:gr[ae]y` 匹配 `match:gray` 或 `match:grey`。

方括号只允许字符或字符类。选择允许任何表达式。正则表达式 `pattern:A|B|C` 表示表达式 `A`、`B` 或 `C` 其一均可。

例如：

- `pattern:gr(a|e)y` 等同于 `pattern:gr[ae]y`。
- `pattern:gra|ey` 表示 `match:gra` 或 `match:ey`。

要将选择应用于模式中一部分内容的选择，我们可以将其括在括号中：
- `pattern:I love HTML|CSS` 匹配 `match:I love HTML` 或 `match:CSS`。
- `pattern:I love (HTML|CSS)` 匹配 `match:I love HTML` 或 `match:I love CSS`。

## 示例：用于时间匹配的正则表达式

在之前的章节中有个任务是构建用于查找形如 `hh:mm` 的时间字符串，例如 `12:00`。但是简单的 `pattern:\d\d:\d\d` 太模糊了。它也会匹配 `25:99`（因为 25 和 99 都与模式匹配，但这不是有效的时间）。

如何构建更好的模式？

我们可以应用更精细的匹配。首先，对于时间：

- 如果第一位数是 `0` 或 `1`，那么下一位数可以是任何数值：`pattern:[01]\d`。
- 否则，如果第一位数是 `2`，那么下一位数必须是 `pattern:[0-3]`。
- 不允许其他的首位数。

我们可以使用选择在正则表达式中编写这两种变体：`pattern:[01]\d|2[0-3]`。

接下来，分钟必须为从 `00` 到 `59` 的数。写成正则表达式即为 `pattern:[0-5]\d`：第一个数字 `0-5`，然后是任何数字。

如果我们将小时和分钟的正则表达式组合在一起，我们会得到：`pattern:[01]\d|2[0-3]:[0-5]\d`

我们差不多完成了，但有一个问题。选择 `pattern:|` 现在恰好位于 `pattern:[01]\d` 和 `pattern:2[0-3]:[0-5]\d` 之间。

也就是说：它只匹配符号左侧或右侧任一表达式。

```
[01]\d  |  2[0-3]:[0-5]\d
```

此模式查找 `pattern:[01]\d` 或 `pattern:2[0-3]:[0-5]\d`。

但这是错误的，应该只在正则表达式的“小时”部分使用选择，以允许 `pattern:[01]\d` 或 `pattern:2[0-3]`。让我们通过将“小时”括在括号中来纠正这个问题：`pattern:([01]\d|2[0-3]):[0-5]\d`

最终的解决方案：

```js run
let regexp = /([01]\d|2[0-3]):[0-5]\d/g;

alert("00:00 10:10 23:59 25:99 1:2".match(regexp)); // 00:00,10:10,23:59
```
