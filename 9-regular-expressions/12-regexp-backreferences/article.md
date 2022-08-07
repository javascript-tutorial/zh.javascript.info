# 模式中的反向引用：\N 和 \k<name>

我们不仅可以在结果或替换字符串中使用捕获组 `pattern:(...)` 的内容，还可以在模式本身中使用它们。

## 按编号反向引用：\N

可以使用 `pattern:\N` 在模式中引用一个组，其中 `N` 是组号。

为了弄清这有什么用，让我们考虑一个任务。

我们需要找到带引号的字符串：单引号 `subject:'...'` 或双引号 `subject:"..."` —— 应匹配这两种变体。

如何找到它们？

我们可以将两种引号都放在方括号中：`pattern:['"](.*?)['"]`，但它会找到带有混合引号的字符串，例如 `match:"...'` 和 `match:'..."`。当一种引号出现在另一种引号内，比如在字符串 `subject:"She's the one!"` 中时，便会导致不正确的匹配：

```js run
let str = `He said: "She's the one!".`;

let regexp = /['"](.*?)['"]/g;

// 不是我们想要的结果
alert( str.match(regexp) ); // "She'
```

正如我们所看到的，该模式找到了一个开头的引号 `match:"`，然后文本被匹配，直到另一个引号 `match:'`，该匹配结束。

为了确保模式查找的结束引号与开始的引号完全相同，我们可以将其包装到捕获组中并对其进行反向引用：`pattern:(['"])(.*?)\1`。

这是正确的代码：

```js run
let str = `He said: "She's the one!".`;

*!*
let regexp = /(['"])(.*?)\1/g;
*/!*

alert( str.match(regexp) ); // "She's the one!"
```

现在可以了！正则表达式引擎会找到第一个引号 `pattern:(['"])` 并记住其内容。那是第一个捕获组。

在模式中 `pattern:\1` 表示“找到与第一组相同的文本”，在我们的示例中为完全相同的引号。

与此类似，`pattern:\2` 表示第二组的内容，`pattern:\3` —— 第三分组，依此类推。

```smart
如果我们在捕获组中使用 `?:`，那么我们将无法引用它。用 `(?:...)` 捕获的组被排除，引擎不会记住它。
```

```warn header="不要搞混了：在模式中用 `pattern:\1`，在替换项中用：`pattern:$1`"
在替换字符串中我们使用美元符号：`pattern:$1`，而在模式中 —— 使用反斜杠 `pattern:\1`。
```

## 按命名反向引用：`\k<name>`

如果一个正则表达式中有很多括号，给它们起个名字会便于引用。

要引用命名的捕获组，我们可以使用：`pattern:\k<name>`。

在下面的示例中，带引号的组被命名为 `pattern:?<quote>`，因此反向引用为 `pattern:\k<quote>`：

```js run
let str = `He said: "She's the one!".`;

*!*
let regexp = /(?<quote>['"])(.*?)\k<quote>/g;
*/!*

alert( str.match(regexp) ); // "She's the one!"
```
