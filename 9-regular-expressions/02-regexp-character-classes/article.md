<<<<<<< HEAD
# 字符类

考虑一个实际的任务 - 我们有一个电话号码，例如 `"+7(903)-123-45-67"`，我们需要将其转换为纯数字：`79035419441`。

为此，我们可以查找并删除所有非数字的内容。字符类可以帮助解决这个问题。

**字符类（Character classes）** 是一个特殊的符号，匹配特定集中的任何符号。

首先，让我们探索“数字”类。它写为 `pattern:\d`，对应于“任何一个数字”。

例如，让我们找到电话号码的第一个数字：
=======
# Character classes

Consider a practical task -- we have a phone number like `"+7(903)-123-45-67"`, and we need to turn it into pure numbers: `79031234567`.

To do so, we can find and remove anything that's not a number. Character classes can help with that.

A *character class* is a special notation that matches any symbol from a certain set.

For the start, let's explore the "digit" class. It's written as `pattern:\d` and corresponds to "any single digit".

For instance, the let's find the first digit in the phone number:
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

```js run
let str = "+7(903)-123-45-67";

let regexp = /\d/;

alert( str.match(regexp) ); // 7
```

<<<<<<< HEAD
如果没有标志 `pattern:g`，则正则表达式仅查找第一个匹配项，即第一个数字 `pattern:\d`。

让我们添加 `pattern:g`标志来查找所有数字：
=======
Without the flag `pattern:g`, the regular expression only looks for the first match, that is the first digit `pattern:\d`.

Let's add the `pattern:g` flag to find all digits:
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

```js run
let str = "+7(903)-123-45-67";

let regexp = /\d/g;

alert( str.match(regexp) ); // array of matches: 7,9,0,3,1,2,3,4,5,6,7

// let's make the digits-only phone number of them:
<<<<<<< HEAD
alert( str.match(regexp).join('') ); // 79035419441
```

这是数字的字符类。还有其他字符类。

最常用的是：

`pattern:\d`（"d" 来自 "digit"）
: 数字：从 `0` 到 `9` 的字符。

`pattern:\s`（"s" 来自 "space"）
: 空格符号：包括空格，制表符 `\t`，换行符 `\n` 和其他少数稀有字符，例如 `\v`，`\f` 和 `\r`。

`pattern:\w`（"w" 来自 "word"）
: “单字”字符：拉丁字母或数字或下划线 `_`。非拉丁字母（如西里尔字母或印地文）不属于 `pattern:\w`。

例如，`pattern:\d\s\w`表示“数字”，后跟“空格字符”，后跟“单字字符”，例如 `match:1 a`。

**正则表达式可能同时包含常规符号和字符类。**

例如，`pattern:CSS\d` 匹配字符串 `match:CSS` 与后面的数字：
=======
alert( str.match(regexp).join('') ); // 79031234567
```

That was a character class for digits. There are other character classes as well.

Most used are:

`pattern:\d` ("d" is from "digit")
: A digit: a character from `0` to `9`.

`pattern:\s` ("s" is from "space")
: A space symbol: includes spaces, tabs `\t`, newlines `\n` and few other rare characters, such as `\v`, `\f` and `\r`.

`pattern:\w` ("w" is from "word")
: A "wordly" character: either a letter of Latin alphabet or a digit or an underscore `_`. Non-Latin letters (like cyrillic or hindi) do not belong to `pattern:\w`.

For instance, `pattern:\d\s\w` means a "digit" followed by a "space character" followed by a "wordly character", such as `match:1 a`.

**A regexp may contain both regular symbols and character classes.**

For instance, `pattern:CSS\d` matches a string `match:CSS` with a digit after it:
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

```js run
let str = "Is there CSS4?";
let regexp = /CSS\d/

alert( str.match(regexp) ); // CSS4
```

<<<<<<< HEAD
我们还可以使用许多字符类：
=======
Also we can use many character classes:
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

```js run
alert( "I love HTML5!".match(/\s\w\w\w\w\d/) ); // ' HTML5'
```

<<<<<<< HEAD
匹配项（每个正则表达式字符类都有对应的结果字符）：

![](love-html5-classes.svg)

## 反向类

对于每个字符类，都有一个“反向类”，用相同的字母表示，但要以大写书写形式。

“反向”表示它与所有其他字符匹配，例如：

`pattern:\D`
: 非数字：除 `pattern:\d` 以外的任何字符，例如字母。

`pattern:\S`
: 非空格符号：除 `pattern:\s` 以外的任何字符，例如字母。

`pattern:\W`
: 非单字字符：除 `pattern:\w` 以外的任何字符，例如非拉丁字母或空格。

在这一章的开头，我们看到了如何从 `subject:+7(903)-123-45-67` 这样的字符串中创建一个只包含数字的电话号码: 找到所有的数字并将它们连接起来。
=======
The match (each regexp character class has the corresponding result character):

![](love-html5-classes.svg)

## Inverse classes

For every character class there exists an "inverse class", denoted with the same letter, but uppercased.

The "inverse" means that it matches all other characters, for instance:

`pattern:\D`
: Non-digit: any character except `pattern:\d`, for instance a letter.

`pattern:\S`
: Non-space: any character except `pattern:\s`, for instance a letter.

`pattern:\W`
: Non-wordly character: anything but `pattern:\w`, e.g a non-latin letter or a space.

In the beginning of the chapter we saw how to make a number-only phone number from a string like `subject:+7(903)-123-45-67`: find all digits and join them.
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

```js run
let str = "+7(903)-123-45-67";

alert( str.match(/\d/g).join('') ); // 79031234567
```

<<<<<<< HEAD
另一种快捷的替代方法是查找非数字 `pattern:\D` 并将其从字符串中删除：
=======
An alternative, shorter way is to find non-digits `pattern:\D` and remove them from the string:
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

```js run
let str = "+7(903)-123-45-67";

alert( str.replace(/\D/g, "") ); // 79031234567
```

<<<<<<< HEAD
## 点（.）是匹配“任何字符”

点 `pattern:.` 是一种特殊字符类，它与 “除换行符之外的任何字符” 匹配。

例如：
=======
## A dot is "any character"

A dot `pattern:.` is a special character class that matches "any character except a newline".

For instance:
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

```js run
alert( "Z".match(/./) ); // Z
```

<<<<<<< HEAD
或在正则表达式中间：
=======
Or in the middle of a regexp:
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

```js run
let regexp = /CS.4/;

alert( "CSS4".match(regexp) ); // CSS4
alert( "CS-4".match(regexp) ); // CS-4
alert( "CS 4".match(regexp) ); // CS 4 (space is also a character)
```

<<<<<<< HEAD
请注意，点表示“任何字符”，而不是“缺少字符”。必须有一个与之匹配的字符：
=======
Please note that a dot means "any character", but not the "absense of a character". There must be a character to match it:
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

```js run
alert( "CS4".match(/CS.4/) ); // null, no match because there's no character for the dot
```

<<<<<<< HEAD
### 带有“s”标志时点字符类严格匹配任何字符

默认情况下，点与换行符 `\n` 不匹配。

例如，正则表达式 `pattern:A.B` 匹配 `match:A`，然后匹配 `match:B` 和它们之间的任何字符，除了换行符`\n`：
=======
### Dot as literally any character with "s" flag

By default, a dot doesn't match the newline character `\n`.

For instance, the regexp `pattern:A.B` matches `match:A`, and then `match:B` with any character between them, except a newline `\n`:
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

```js run
alert( "A\nB".match(/A.B/) ); // null (no match)
```

<<<<<<< HEAD
在许多情况下，当我们希望用点来表示“任何字符”（包括换行符）时。

这就是标志 `pattern:s` 所做的。如果有一个正则表达式，则点 `pattern:.` 实际上匹配任何字符：
=======
There are many situations when we'd like a dot to mean literally "any character", newline included.

That's what flag `pattern:s` does. If a regexp has it, then a dot `pattern:.` matches literally any character:
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

```js run
alert( "A\nB".match(/A.B/s) ); // A\nB (match!)
```

<<<<<<< HEAD
````warn header="不支持 Firefox、IE、Edge"
使用前可从 <https://caniuse.com/#search=dotall> 确认以获得最新的支持状态。在撰写本文时，它不包括 Firefox、IE、Edge。

幸运的是，有一种替代方法可以在任何地方使用。我们可以使用诸如 `pattern:[\s\S]` 之类的正则表达式来匹配“任何字符”。
=======
````warn header="Not supported in Firefox, IE, Edge"
Check <https://caniuse.com/#search=dotall> for the most recent state of support. At the time of writing it doesn't include Firefox, IE, Edge.

Luckily, there's an alternative, that works everywhere. We can use a regexp like `pattern:[\s\S]` to match "any character".
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

```js run
alert( "A\nB".match(/A[\s\S]B/) ); // A\nB (match!)
```

<<<<<<< HEAD
模式 `pattern:[\s\S]` 从字面上说：“空格字符或非空格字符”。换句话说，“任何东西”。我们可以使用另一对互补的类，例如 `pattern:[\d\D]`。甚至是 `pattern:[^]` —— 意思是匹配任何字符，除了什么都没有。

如果我们希望两种“点”都使用相同的模式，也可以使用此技巧：实际的点 `pattern:.` 具有常规方式（“不包括换行符”）以及一种使用 `pattern:[\s\S]` 或类似形式匹配“任何字符”。
````

````warn header="注意空格"
通常我们很少注意空格。对我们来说，字符串 `subject:1-5` 和 `subject:1 - 5` 几乎相同。

但是，如果正则表达式未考虑空格，则可能无法正常工作。

让我们尝试查找由连字符（-）分隔的数字：
=======
The pattern `pattern:[\s\S]` literally says: "a space character OR not a space character". In other words, "anything". We could use another pair of complementary classes, such as `pattern:[\d\D]`, that doesn't matter. Or even the `pattern:[^]` -- as it means match any character except nothing.

Also we can use this trick if we want both kind of "dots" in the same pattern: the actual dot `pattern:.` behaving the regular way ("not including a newline"), and also a way to match "any character" with `pattern:[\s\S]` or alike.
````

````warn header="Pay attention to spaces"
Usually we pay little attention to spaces. For us strings `subject:1-5` and `subject:1 - 5` are nearly identical.

But if a regexp doesn't take spaces into account, it may fail to work.

Let's try to find digits separated by a hyphen:
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

```js run
alert( "1 - 5".match(/\d-\d/) ); // null, no match!
```

<<<<<<< HEAD
让我们修复一下，在正则表达式中添加空格：\ d-\ d`：
=======
Let's fix it adding spaces into the regexp `pattern:\d - \d`:
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

```js run
alert( "1 - 5".match(/\d - \d/) ); // 1 - 5, now it works
// or we can use \s class:
alert( "1 - 5".match(/\d\s-\s\d/) ); // 1 - 5, also works
```

<<<<<<< HEAD
**空格是一个字符。与其他字符同等重要。**

我们无法在正则表达式中添加或删除空格，并且期望能正常工作。

换句话说，在正则表达式中，所有字符都很重要，空格也很重要。
````

## 总结

存在以下字符类：

- `pattern:\d` —— 数字。
- `pattern:\D` —— 非数字。
- `pattern:\s` —— 空格符号，制表符，换行符。
- `pattern:\S` —— 除了 `pattern:\s` 。
- `pattern:\w` —— 拉丁字母，数字，下划线 `'_'`。
- `pattern:\W` —— 除了 `pattern:\w`。
- `pattern:.` —— 任何带有 `'s'` 标志的字符，否则为除换行符 `\n`之外的任何字符。

……但这还不是全部！

JavaScript 用于字符串的 Unicode 编码提供了许多字符属性，例如：这个字母属于哪一种语言（如果它是一个字母）？它是标点符号吗？等等。

我们也可以通过这些属性进行搜索。这需要标志 `pattern:u`，在下一篇文章中介绍。
=======
**A space is a character. Equal in importance with any other character.**

We can't add or remove spaces from a regular expression and expect to work the same.

In other words, in a regular expression all characters matter, spaces too.
````

## Summary

There exist following character classes:

- `pattern:\d` -- digits.
- `pattern:\D` -- non-digits.
- `pattern:\s` -- space symbols, tabs, newlines.
- `pattern:\S` -- all but `pattern:\s`.
- `pattern:\w` -- Latin letters, digits, underscore `'_'`.
- `pattern:\W` -- all but `pattern:\w`.
- `pattern:.` -- any character if with the regexp `'s'` flag, otherwise any except a newline `\n`.

...But that's not all!

Unicode encoding, used by JavaScript for strings, provides many properties for characters, like: which language the letter belongs to (if it's a letter) it is it a punctuation sign, etc.

We can search by these properties as well. That requires flag `pattern:u`, covered in the next article.
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6
