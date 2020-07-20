<<<<<<< HEAD
# 模式中的反向引用：\N 和 \k<name>

我们不仅可以在结果或替换字符串中使用捕获组 `pattern:(...)` 的内容，还可以在模式本身中使用它们。

## 按编号反向引用：\N

可以使用 `pattern:\N` 在模式中引用一个组，其中 `N` 是组号。

为了弄清那为什么有帮助，让我们考虑一项任务。

我们需要找到带引号的字符串：单引号 `subject:'...'` 或双引号 `subject:"..."`– 应匹配两种变体。

如何找到它们？

我们可以将两种引号放在方括号中：`pattern:['"](.*?)['"]`，但它会找到带有混合引号的字符串，例如 `match:"...'` 和 `match:'..."`。当一种引号出现在另一种引号内，比如在字符串 `subject:"She's the one!"` 中时，便会导致不正确的匹配：
=======
# Backreferences in pattern: \N and \k<name>

We can use the contents of capturing groups `pattern:(...)` not only in the result or in the replacement string, but also in the pattern itself.

## Backreference by number: \N

A group can be referenced in the pattern using `pattern:\N`, where `N` is the group number.

To make clear why that's helpful, let's consider a task.

We need to find quoted strings: either single-quoted `subject:'...'` or a double-quoted `subject:"..."` -- both variants should match.

How to find them?

We can put both kinds of quotes in the square brackets: `pattern:['"](.*?)['"]`, but it would find strings with mixed quotes, like `match:"...'` and `match:'..."`. That would lead to incorrect matches when one quote appears inside other ones, like in the string `subject:"She's the one!"`:
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

```js run
let str = `He said: "She's the one!".`;

let regexp = /['"](.*?)['"]/g;

<<<<<<< HEAD
// 不是我们想要的结果
alert( str.match(regexp) ); // "She'
```

如我们所见，该模式找到了一个开头的引号 `match:"`，然后文本被匹配，直到另一个引号 `match:'`，该匹配结束。

为了确保模式查找的结束引号与开始的引号完全相同，我们可以将其包装到捕获组中并对其进行反向引用：`pattern:(['"])(.*?)\1`。

这是正确的代码：
=======
// The result is not what we'd like to have
alert( str.match(regexp) ); // "She'
```

As we can see, the pattern found an opening quote `match:"`, then the text is consumed till the other quote `match:'`, that closes the match.

To make sure that the pattern looks for the closing quote exactly the same as the opening one, we can wrap it into a capturing group and backreference it: `pattern:(['"])(.*?)\1`.

Here's the correct code:
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

```js run
let str = `He said: "She's the one!".`;

*!*
let regexp = /(['"])(.*?)\1/g;
*/!*

alert( str.match(regexp) ); // "She's the one!"
```

<<<<<<< HEAD
现在可以了！正则表达式引擎会找到第一个引号 `pattern:(['"])` 并记住其内容。那是第一个捕获组。

`pattern:\1` 在模式中进一步的含义是“查找与第一（捕获）分组相同的文本”，在我们的示例中为完全相同的引号。

与此类似，`pattern:\2` 表示第二（捕获）分组的内容，`pattern:\3` – 第三分组，依此类推。

```smart
如果我们在组中使用 `?:`，那么我们将无法引用它。用 `(?:...)` 捕获的组被排除，引擎不会存储。
```

```warn header="不要搞混了： 在模式中用 `pattern:\1`，在替换项中用：`pattern:$1`"
在替换字符串中我们使用美元符号：`pattern:$1`，而在模式中 - 使用反斜杠 `pattern:\1`。
```

## 按命名反向引用：`\k<name>`

如果正则表达式中有很多括号对（注：捕获组），给它们起个名字方便引用。

要引用命名组，我们可以使用：`pattern:\k<name>`。

在下面的示例中引号组命名为 `pattern:?<quote>`，因此反向引用为  `pattern:\k<quote>`：
=======
Now it works! The regular expression engine finds the first quote `pattern:(['"])` and memorizes its content. That's the first capturing group.

Further in the pattern `pattern:\1` means "find the same text as in the first group", exactly the same quote in our case.

Similar to that, `pattern:\2` would mean the contents of the second group, `pattern:\3` - the 3rd group, and so on.

```smart
If we use `?:` in the group, then we can't reference it. Groups that are excluded from capturing `(?:...)` are not memorized by the engine.
```

```warn header="Don't mess up: in the pattern `pattern:\1`, in the replacement: `pattern:$1`"
In the replacement string we use a dollar sign: `pattern:$1`, while in the pattern - a backslash `pattern:\1`.
```

## Backreference by name: `\k<name>`

If a regexp has many parentheses, it's convenient to give them names.

To reference a named group we can use `pattern:\k<name>`.

In the example below the group with quotes is named `pattern:?<quote>`, so the backreference is `pattern:\k<quote>`:
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

```js run
let str = `He said: "She's the one!".`;

*!*
let regexp = /(?<quote>['"])(.*?)\k<quote>/g;
*/!*

alert( str.match(regexp) ); // "She's the one!"
```
