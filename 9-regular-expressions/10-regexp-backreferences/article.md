<<<<<<< HEAD
# 反向引用：\n 和 $n

捕获组不仅能在结果中读取，也能在替换字符串，甚至模式中读取。

## 替换字符串中的组：$n

`replace` 方法中可以用 `$n` 在替换字符串中访问第 n 个捕获组。

例如：

```js run
let name = "John Smith";

name = name.replace(/(\w+) (\w+)/i, *!*"$2, $1"*/!*);
alert( name ); // Smith, John
```

这里替换字符串中的 `pattern:$1` 的意思是“在这里替换第一个捕获组的内容”，`pattern:$2` 的意思是“在这里替换第二个捕获组的内容”。

在替换字符串中引用组允许我们在替换时重用已存在的文本。

## 模式中的组：\n

在模式中，可以用 `\n` 引用组。

为了更好的说明，假设有一个任务。我们需要找出带引号的字符串：要么是单引号 `subject:'...'`，要么是双引号 `subject:"..."` —— 这两种类型都要找出来。

怎么查找这类引用组呢？

模式里要有两种引号：`pattern:['"](.*?)['"]`。匹配形如 `match:"..."` 和 `match:'...'` 的字符串，但当两类符号存在嵌套是，结果就不正确了，例如字符串 `subject:"She's the one!"`：

```js run
let str = "He said: \"She's the one!\".";
=======
# Backreferences in pattern: \n and \k

We can use the contents of capturing groups `(...)` not only in the result or in the replacement string, but also in the pattern itself.

## Backreference by number: \n

A group can be referenced in the pattern using `\n`, where `n` is the group number.

To make things clear let's consider a task.

We need to find a quoted string: either a single-quoted `subject:'...'` or a double-quoted `subject:"..."` -- both variants need to match.

How to look for them?

We can put both kinds of quotes in the square brackets: `pattern:['"](.*?)['"]`, but it would find strings with mixed quotes, like `match:"...'` and `match:'..."`. That would lead to incorrect matches when one quote appears inside other ones, like the string `subject:"She's the one!"`:

```js run
let str = `He said: "She's the one!".`;
>>>>>>> 027933531e121650120f7e8385f691de99af12d2

let reg = /['"](.*?)['"]/g;

// The result is not what we expect
alert( str.match(reg) ); // "She'
```

<<<<<<< HEAD
如你所见，这个模式发现了左双引号 `match:"`，然后匹配文本直到发现另一个引号 `match:'`，结束本次匹配。

为了确保模式匹配的右引号类型和左引号类型一致，可以将引号包裹成组并使用反向引用：

```js run
let str = "He said: \"She's the one!\".";

let reg = /(['"])(.*?)\1/g;
=======
As we can see, the pattern found an opening quote `match:"`, then the text is consumed lazily till the other quote `match:'`, that closes the match.

To make sure that the pattern looks for the closing quote exactly the same as the opening one, we can wrap it into a capturing group and use the backreference.

Here's the correct code:

```js run
let str = `He said: "She's the one!".`;

*!*
let reg = /(['"])(.*?)\1/g;
*/!*
>>>>>>> 027933531e121650120f7e8385f691de99af12d2

alert( str.match(reg) ); // "She's the one!"
```

<<<<<<< HEAD
现在一切搞定！正则表达式引擎匹配第一个引号 `pattern:(['"])` 时，记录 `pattern(...)` 的内容，这就是第一个捕获组。

`pattern:\1` 的含义是“找到与第一组相同的文本”。

请注意：

- 在替换字符串内部引用组的方式 —— `$1`，在模式中引用组的方式 —— `\1`。
- 在组内使用 `?:` 则无法引用到该组。正则表达式引擎不会记住被排除在捕获 `(?:...)` 之外的组。
=======
Now it works! The regular expression engine finds the first quote `pattern:(['"])` and remembers the content of `pattern:(...)`, that's the first capturing group.

Further in the pattern `pattern:\1` means "find the same text as in the first group", exactly the same quote in our case.

Please note:

- To reference a group inside a replacement string -- we use `$1`, while in the pattern -- a backslash `\1`.
- If we use `?:` in the group, then we can't reference it. Groups that are excluded from capturing `(?:...)` are not remembered by the engine.

## Backreference by name: `\k<name>`

For named groups, we can backreference by `\k<name>`.

The same example with the named group:

```js run
let str = `He said: "She's the one!".`;

*!*
let reg = /(?<quote>['"])(.*?)\k<quote>/g;
*/!*

alert( str.match(reg) ); // "She's the one!"
```
>>>>>>> 027933531e121650120f7e8385f691de99af12d2
