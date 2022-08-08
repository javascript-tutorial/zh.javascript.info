# 前瞻断言与后瞻断言

有时我们只需要为一个模式找到那些在另一个模式之后或之前的匹配项。

有一种特殊的语法，称为“前瞻断言（lookahead）”和“后瞻断言（lookbehind）”。

首先，让我们从字符串中查找价格，例如 `subject:1 turkey costs 30€`。即：一个数字，后跟`subject:€`符号。

## 前瞻断言

语法为：`pattern:x(?=y)`，它表示“仅在后面是 `pattern:Y` 时匹配 `pattern:X`”。There may be any pattern instead of `pattern:X` and `pattern:Y`.

那么对于一个后面跟着 `€` 的整数，正则表达式应该为：`pattern:\d+(?=€)`。

```js run
let str = "1 turkey costs 30€";

alert( str.match(/\d+(?=€)/) ); // 30，数字 1 被忽略了，因为它后面没有 €
```

请注意：前瞻断言只是一个测试，括号 `pattern:(?=...)` 中的内容不包含在匹配结果 `match:30` 中。

当我们查找 `pattern:X(?=Y)` 时，正则表达式引擎会找到 `pattern:X`，然后检查其后是否有 `pattern:Y`。如果没有，则跳过潜在匹配，并继续搜索。

更复杂的测试也是可能的，例如 `pattern:X(?=Y)(?=Z)` 表示：

1. 寻找 `pattern:X`。
2. 检查 `pattern:Y` 是否紧跟在 `pattern:X` 之后（如果不是则跳过）。
3. 检查 `pattern:Z` 是否也在 `pattern:X` 之后（如果不是则跳过）。
4. 如果两个测试都通过了，那么 `pattern:X` 是匹配的，否则继续搜索。 

换句话说，这样的模式意味着我们同时在寻找 `pattern:X` 后跟 `pattern:Y` 和 `pattern:Z`。

这只有在模式 `pattern:Y` 和 `pattern:Z` 不是互斥的情况下才可行。

例如，`pattern:\d+(?=\s)(?=.*30)` 查找后跟着空格 `pattern:(?=\s)` 的 `pattern:\d+`，并且有 ` 30` 在它之后的某个地方 `pattern:(?=.*30)`：

```js run
let str = "1 turkey costs 30€";

alert( str.match(/\d+(?=\s)(?=.*30)/) ); // 1
```

在我们给出的字符串中，与数字 `1` 完全匹配。

## 否定的前瞻断言

假设我们想要一个数量，而不是来自同一字符串的价格。那是一个数字 `pattern:\d+`，后面不是 `subject:€`。

为此，我们可以使用否定的前瞻断言。

语法是：`pattern:X(?!Y)`，意思是“搜索 `pattern:X`，但前提是后面没有 `pattern:Y`”。

```js run
let str = "2 turkeys cost 60€";

alert( str.match(/\d+\b(?!€)/g) ); // 2（价格不匹配）
```

## 后瞻断言

```warn header="后瞻断言的浏览器兼容情况"
请注意：非 V8 引擎的浏览器不支持后瞻断言，例如 Safari、Internet Explorer。
```

前瞻断言允许添加一个“后面要跟着什么”的条件判断。

后瞻断言也类似，只不过它是在相反的方向上进行条件判断。也就是说，它只允许匹配前面有特定字符串的模式。

语法为如下：
- 肯定的后瞻断言：`pattern:(?<=Y)X`，匹配 `pattern:X`，仅在前面是 `pattern:Y` 的情况下。
- 否定的后瞻断言：`pattern:(?<!Y)X`，匹配 `pattern:X`，仅在前面不是 `pattern:Y` 的情况下。

例如，让我们把价格换成美元。美元符号通常在数字前面，所以要查找 `$30` 我们将使用 `pattern:(?<=\$)\d+` —— 一个前面带 `subject:$` 的数值：

```js run
let str = "1 turkey costs $30";

// 美元符号被转义 \$
alert( str.match(/(?<=\$)\d+/) ); // 30（跳过了仅仅是数字的值）
```

如果我们需要找到量词 —— 一个前面不带 `subject:$` 的数字，我们可以使用否定的后瞻断言：`pattern:(?<!\$)\d+`

```js run
let str = "2 turkeys cost $60";

alert( str.match(/(?<!\$)\b\d+/g) ); // 2（价格不匹配）
```

## 捕获组

一般来说，前瞻断言和后瞻断言括号中的内容不会成为结果的一部分。

例如，在模式 `pattern:\d+(?!€)` 中，`pattern:€` 符号就不会出现在匹配结果中。这是很自然的事：我们寻找一个数字 `pattern:\d+`，而 `pattern:(?=€)` 只是一个测试，表示要匹配的数字后面应该紧跟着 `subject:€` 字符。

但在某些情况下，我们可能还想捕获前瞻断言和后瞻断言所匹配的内容，或者部分内容。这也是可行的。只需要将该部分包装在额外的括号中。

在下面的示例中，货币符号 `pattern:(€|kr)` 和金额一起被捕获了：

```js run
let str = "1 turkey costs 30€";
let regexp = /\d+(?=(€|kr))/; // €|kr 两侧有额外的括号

alert( str.match(regexp) ); // 30, €
```

后瞻断言也一样：

```js run
let str = "1 turkey costs $30";
let regexp = /(?<=(\$|£))\d+/;

alert( str.match(regexp) ); // 30, $
```

## 总结

当我们想根据前面/后面的上下文匹配某些内容的时候，前瞻断言和后瞻断言（通常被称为“环视断言”）很有用。

对于简单的正则表达式，我们可以手动执行类似的操作。即：不管上下文，匹配所有可匹配的内容，然后在循环中根据上下文进行过滤。

请记住，`str.match`（没有修饰符 `pattern:g`）和 `str.matchAll`（总是）将匹配项作为具有 `index` 属性的数组返回，因此我们知道它在文本中的确切位置，并且可以检查上下文。

但通常环视断言更方便。

环视断言类型：

| 模式            | 类型             | 匹配 |
|--------------------|------------------|---------|
| `X(?=Y)`   | 肯定的前瞻断言 | `pattern:X` 后紧跟着 `pattern:Y` |
| `X(?!Y)`   | 否定的前瞻断言 | `pattern:X` 后没紧跟着 `pattern:Y` |
| `(?<=Y)X` |  肯定的后瞻断言 | `pattern:X` 紧跟在 `pattern:Y` 后面 |
| `(?<!Y)X` | 否定的后瞻断言 | `pattern:X` 没紧跟在 `pattern:Y` 后面 |
