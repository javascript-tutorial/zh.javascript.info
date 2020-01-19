# 词边界：\b

词边界 `pattern:\b` 是一种检查，就像 `pattern:^` 和 `pattern:$` 一样。

当正则表达式引擎（实现搜索正则表达式的程序模块）遇到 `pattern:\b` 时，它会检查字符串中的位置是否是词边界。

有三种不同的位置可作为词边界：

- 在字符串开头，如果第一个字符是单词字符 `pattern:\w`。
- 在字符串中的两个字符之间，其中一个是单词字符 `pattern:\w`，另一个不是。
- 在字符串末尾，如果最后一个字符是单词字符 `pattern:\w`。

例如，可以在 `subject:Hello, Java!` 中找到匹配 `pattern:\bJava\b` 的单词，其中 `subject:Java` 是一个独立的单词，而在 `subject:Hello, JavaScript!` 中则不行。

```js run
alert( "Hello, Java!".match(/\bJava\b/) ); // Java
alert( "Hello, JavaScript!".match(/\bJava\b/) ); // null
```

在字符串 `subject:Hello, Java!` 中，以下位置对应于 `pattern:\b`：

![](hello-java-boundaries.svg)

因此，它与模式 `pattern:\bHello\b` 相匹配，因为：

1. 字符串的开头符合第一种检查 `pattern:\b`。
2. 然后匹配了单词 `pattern:Hello`。
3. 然后与 `pattern:\b` 再次匹配，因为我们在 `subject:o` 和一个空格之间。

模式 `pattern:\bJava\b` 也同样匹配。但 `pattern:\bHell\b`（因为 `l` 之后没有词边界）和 `Java!\b`（因为感叹号不是单词 `pattern:\w`，所以其后没有词边界）却不匹配。

```js run
alert( "Hello, Java!".match(/\bHello\b/) ); // Hello
alert( "Hello, Java!".match(/\bJava\b/) );  // Java
alert( "Hello, Java!".match(/\bHell\b/) );  // null (no match)
alert( "Hello, Java!".match(/\bJava!\b/) ); // null (no match)
```

`pattern:\b` 既可以用于单词，也可以用于数字。

例如，模式 `pattern:\b\d\d\b` 查找独立的两位数。换句话说，它查找的是两位数，其周围是与 `pattern:\w` 不同的字符，例如空格或标点符号（或文本开头/结尾）。

```js run
alert( "1 23 456 78".match(/\b\d\d\b/g) ); // 23,78
alert( "12,34,56".match(/\b\d\d\b/g) ); // 12,34,56
```

```warn header="词边界 `pattern:\b` 不适用于非拉丁字母"
词边界测试 `pattern:\b` 检查位置的一侧是否匹配 `pattern:\w`，而另一侧则不匹配 "`pattern:\w`"。

但是，`pattern:\w` 表示拉丁字母 `a-z`（或数字或下划线），因此此检查不适用于其他字符，如西里尔字母（cyrillic letters）或象形文字（hieroglyphs）。
```
