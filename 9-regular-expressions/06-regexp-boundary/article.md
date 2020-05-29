<<<<<<< HEAD
# 词边界：\b

词边界 `pattern:\b` 是一种检查，就像 `pattern:^` 和 `pattern:$` 一样。

当正则表达式引擎（实现搜索正则表达式的程序模块）遇到 `pattern:\b` 时，它会检查字符串中的位置是否是词边界。

有三种不同的位置可作为词边界：

- 在字符串开头，如果第一个字符是单词字符 `pattern:\w`。
- 在字符串中的两个字符之间，其中一个是单词字符 `pattern:\w`，另一个不是。
- 在字符串末尾，如果最后一个字符是单词字符 `pattern:\w`。

例如，可以在 `subject:Hello, Java!` 中找到匹配 `pattern:\bJava\b` 的单词，其中 `subject:Java` 是一个独立的单词，而在 `subject:Hello, JavaScript!` 中则不行。
=======
# Word boundary: \b

A word boundary `pattern:\b` is a test, just like `pattern:^` and `pattern:$`.

When the regexp engine (program module that implements searching for regexps) comes across `pattern:\b`, it checks that the position in the string is a word boundary.

There are three different positions that qualify as word boundaries:

- At string start, if the first string character is a word character `pattern:\w`.
- Between two characters in the string, where one is a word character `pattern:\w` and the other is not.
- At string end, if the last string character is a word character `pattern:\w`.

For instance, regexp `pattern:\bJava\b` will be found in `subject:Hello, Java!`, where `subject:Java` is a standalone word, but not in `subject:Hello, JavaScript!`.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js run
alert( "Hello, Java!".match(/\bJava\b/) ); // Java
alert( "Hello, JavaScript!".match(/\bJava\b/) ); // null
```

<<<<<<< HEAD
在字符串 `subject:Hello, Java!` 中，以下位置对应于 `pattern:\b`：

![](hello-java-boundaries.svg)

因此，它与模式 `pattern:\bHello\b` 相匹配，因为：

1. 字符串的开头符合第一种检查 `pattern:\b`。
2. 然后匹配了单词 `pattern:Hello`。
3. 然后与 `pattern:\b` 再次匹配，因为我们在 `subject:o` 和一个空格之间。

模式 `pattern:\bJava\b` 也同样匹配。但 `pattern:\bHell\b`（因为 `l` 之后没有词边界）和 `Java!\b`（因为感叹号不是单词 `pattern:\w`，所以其后没有词边界）却不匹配。
=======
In the string `subject:Hello, Java!` following positions correspond to `pattern:\b`:

![](hello-java-boundaries.svg)

So, it matches the pattern `pattern:\bHello\b`, because:

1. At the beginning of the string matches the first test `pattern:\b`.
2. Then matches the word `pattern:Hello`.
3. Then the test `pattern:\b` matches again, as we're between `subject:o` and a space.

The pattern `pattern:\bHello\b` would also match. But not `pattern:\bHell\b` (because there's no word boundary after `l`) and not `Java!\b` (because the exclamation sign is not a wordly character `pattern:\w`, so there's no word boundary after it).
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js run
alert( "Hello, Java!".match(/\bHello\b/) ); // Hello
alert( "Hello, Java!".match(/\bJava\b/) );  // Java
alert( "Hello, Java!".match(/\bHell\b/) );  // null (no match)
alert( "Hello, Java!".match(/\bJava!\b/) ); // null (no match)
```

<<<<<<< HEAD
`pattern:\b` 既可以用于单词，也可以用于数字。

例如，模式 `pattern:\b\d\d\b` 查找独立的两位数。换句话说，它查找的是两位数，其周围是与 `pattern:\w` 不同的字符，例如空格或标点符号（或文本开头/结尾）。
=======
We can use `pattern:\b` not only with words, but with digits as well.

For example, the pattern `pattern:\b\d\d\b` looks for standalone 2-digit numbers. In other words, it looks for 2-digit numbers that are surrounded by characters different from `pattern:\w`, such as spaces or punctuation (or text start/end).
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js run
alert( "1 23 456 78".match(/\b\d\d\b/g) ); // 23,78
alert( "12,34,56".match(/\b\d\d\b/g) ); // 12,34,56
```

<<<<<<< HEAD
```warn header="词边界 `pattern:\b` 不适用于非拉丁字母"
词边界测试 `pattern:\b` 检查位置的一侧是否匹配 `pattern:\w`，而另一侧则不匹配 "`pattern:\w`"。

但是，`pattern:\w` 表示拉丁字母 `a-z`（或数字或下划线），因此此检查不适用于其他字符，如西里尔字母（cyrillic letters）或象形文字（hieroglyphs）。
=======
```warn header="Word boundary `pattern:\b` doesn't work for non-latin alphabets"
The word boundary test `pattern:\b` checks that there should be `pattern:\w` on the one side from the position and "not `pattern:\w`" - on the other side.

But `pattern:\w` means a latin letter `a-z` (or a digit or an underscore), so the test doesn't work for other characters, e.g. cyrillic letters or hieroglyphs.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
```
