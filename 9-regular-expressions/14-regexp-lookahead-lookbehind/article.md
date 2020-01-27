<<<<<<< HEAD
# 前瞻断言与后瞻断言

有时候我们需要匹配后面跟着特定模式的一段模式。比如，我们要从 `subject:1 turkey costs 30€` 这段字符中匹配价格数值。

我们需要获取 `subject:€` 符号前面的数值（假设价格是整数）。

那就是前瞻断言要做的事情。

## 前瞻断言

语法为：`pattern:x(?=y)`，它表示 “匹配 `pattern:x`, 仅在后面是 `pattern:y` 的情况"”

那么对于一个后面跟着 `€` 的整数金额，它的正则表达式应该为：`pattern:\d+(?=€)`。
=======
# Lookahead and lookbehind

Sometimes we need to find only those matches for a pattern that are followed or preceeded by another pattern.

There's a special syntax for that, called "lookahead" and "lookbehind", together referred to as "lookaround".

For the start, let's find the price from the string like `subject:1 turkey costs 30€`. That is: a number, followed by `subject:€` sign.

## Lookahead

The syntax is: `pattern:X(?=Y)`, it means "look for `pattern:X`, but match only if followed by `pattern:Y`". There may be any pattern instead of `pattern:X` and `pattern:Y`.

For an integer number followed by `subject:€`, the regexp will be `pattern:\d+(?=€)`:
>>>>>>> ff042a03191dfad1268219ae78758193a5803b38

```js run
let str = "1 turkey costs 30€";

<<<<<<< HEAD
alert( str.match(/\d+(?=€)/) ); // 30 （正确地跳过了单个的数字 1）
```

让我们来看另一种情况：这次我们想要一个数量，它是一个不被 `subject:€` 跟着的数值。

这里就要用到前瞻否定断言了。

语法为：`pattern:x(?!y)`，意思是 "查找 `pattern:x`, 但是仅在不被 `pattern:y` 跟随的情况下匹配成功"。
=======
alert( str.match(/\d+(?=€)/) ); // 30, the number 1 is ignored, as it's not followed by €
```

Please note: the lookahead is merely a test, the contents of the parentheses `pattern:(?=...)` is not included in the result `match:30`.

When we look for `pattern:X(?=Y)`, the regular expression engine finds `pattern:X` and then checks if there's `pattern:Y` immediately after it. If it's not so, then the potential match is skipped, and the search continues.

More complex tests are possible, e.g. `pattern:X(?=Y)(?=Z)` means:

1. Find `pattern:X`.
2. Check if `pattern:Y` is immediately after `pattern:X` (skip if isn't).
3. Check if `pattern:Z` is immediately after `pattern:X` (skip if isn't).
4. If both tests passed, then it's the match.

In other words, such pattern means that we're looking for `pattern:X` followed by   `pattern:Y` and `pattern:Z` at the same time.

That's only possible if patterns `pattern:Y` and `pattern:Z` aren't mutually exclusive.

For example, `pattern:\d+(?=\s)(?=.*30)` looks for `pattern:\d+` only if it's followed by a space, and there's `30` somewhere after it:

```js run
let str = "1 turkey costs 30€";

alert( str.match(/\d+(?=\s)(?=.*30)/) ); // 1
```

In our string that exactly matches the number `1`.

## Negative lookahead

Let's say that we want a quantity instead, not a price from the same string. That's a number `pattern:\d+`, NOT followed by `subject:€`.

For that, a negative lookahead can be applied.

The syntax is: `pattern:X(?!Y)`, it means "search `pattern:X`, but only if not followed by `pattern:Y`".
>>>>>>> ff042a03191dfad1268219ae78758193a5803b38

```js run
let str = "2 turkeys cost 60€";

<<<<<<< HEAD
alert( str.match(/\d+(?!€)/) ); // 2（正确地跳过了价格）
```

## 后瞻断言

前瞻断言允许添加一个“后面要跟着什么”的条件判断。

后瞻断言也是类似的，只不过它是在相反的方向上进行条件判断。也就是说，它只允许匹配前面有特定字符串的模式。

语法为:
- 后瞻肯定断言：`pattern:(?<=y)x`, 匹配 `pattern:x`, 仅在前面是 `pattern:y` 的情况。
- 后瞻否定断言：`pattern:(?<!y)x`, 匹配 `pattern:x`, 仅在前面不是 `pattern:y` 的情况。

举个例子，让我们把价格换成美元。美元符号通常在数字之前，所以要查找 `$30` 我们将使用 `pattern:(?<=\$)\d+` —— 一个前面带 `subject:$` 的数值：
=======
alert( str.match(/\d+(?!€)/) ); // 2 (the price is skipped)
```

## Lookbehind

Lookahead allows to add a condition for "what follows".

Lookbehind is similar, but it looks behind. That is, it allows to match a pattern only if there's something before it.

The syntax is:
- Positive lookbehind: `pattern:(?<=Y)X`, matches `pattern:X`, but only if there's  `pattern:Y` before it.
- Negative lookbehind: `pattern:(?<!Y)X`, matches `pattern:X`, but only if there's no `pattern:Y` before it.

For example, let's change the price to US dollars. The dollar sign is usually before the number, so to look for `$30` we'll use `pattern:(?<=\$)\d+` -- an amount preceded by `subject:$`:
>>>>>>> ff042a03191dfad1268219ae78758193a5803b38

```js run
let str = "1 turkey costs $30";

<<<<<<< HEAD
alert( str.match(/(?<=\$)\d+/) ); // 30 （跳过了单个的数字 1）
```

另外，为了找到数量 —— 一个前面不带 `subject:$` 的数字，我们可以使用否定后瞻断言：`pattern:(?<!\$)\d+`
=======
// the dollar sign is escaped \$
alert( str.match(/(?<=\$)\d+/) ); // 30 (skipped the sole number)
```

And, if we need the quantity -- a number, not preceded by `subject:$`, then we can use a negative lookbehind `pattern:(?<!\$)\d+`:
>>>>>>> ff042a03191dfad1268219ae78758193a5803b38

```js run
let str = "2 turkeys cost $60";

<<<<<<< HEAD
alert( str.match(/(?<!\$)\d+/) ); // 2 (跳过了价格)
```

## 捕获组

一般来说，环视断言括号中（前瞻和后瞻的通用名称）的内容不会成为匹配到的一部分结果。

例如：在模式 `pattern:\d+(?!€)` 中，`pattern:€` 符号就不会出现在匹配结果中。

但是如果我们想要捕捉整个环视表达式或其中的一部分，那也是有可能的。只需要将其包裹在另加的括号中。

例如，这里货币符号 `pattern:(€|kr)` 和金额一起被捕获了：

```js run
let str = "1 turkey costs 30€";
let reg = /\d+(?=(€|kr))/; // €|kr 两边有额外的括号

alert( str.match(reg) ); // 30, €
```

后瞻断言也一样：

```js run
let str = "1 turkey costs $30";
let reg = /(?<=(\$|£))\d+/;

alert( str.match(reg) ); // 30, $
```

请注意，对于后瞻断言，顺序保持不变，尽管前瞻括号在主模式之前。

通常括号是从左到右编号，但是后瞻断言是一个例外，它总是在主模式之后被捕获。所以 `pattern:\d+` 的匹配会首先进入结果数组，然后是 `pattern:(\$|£)`。


## 总结

当我们想根据前面/后面的上下文筛选出一些东西的时候，前瞻断言和后瞻断言（通常被称为“环视断言”）对于简单的正则表达式就很有用。

有时我们可以手动处理来得到相同的结果，即：匹配所有，然后在循环中按上下文进行筛选。请记住，`str.matchAll` 和`reg.exec` 返回的匹配结果有 `.index` 属性，因此我们能知道它在文本中的确切位置。但通常正则表达式可以做得更好。

环视断言类型:

| 模式            | 类型             | 匹配 |
|--------------------|------------------|---------|
| `pattern:x(?=y)`   | 前瞻肯定断言 | `x` ，仅当后面跟着 `y` |
| `pattern:x(?!y)`   | 前瞻否定断言 | `x` ，仅当后面不跟 `y` |
| `pattern:(?<=y)x` |  后瞻肯定断言 | `x` ，仅当跟在 `y` 后面 |
| `pattern:(?<!y)x` | 后瞻否定断言 | `x` ，仅当不跟在 `y` 后面 |

前瞻断言也可用于禁用回溯。为什么它是需要的 - 请看下一章。
=======
alert( str.match(/(?<!\$)\d+/) ); // 2 (skipped the price)
```

## Capturing groups

Generally, the contents inside lookaround parentheses does not become a part of the result.

E.g. in the pattern `pattern:\d+(?=€)`, the `pattern:€` sign doesn't get captured as a part of the match. That's natural: we look for a number `pattern:\d+`, while `pattern:(?=€)` is just a test that it should be followed by `subject:€`.

But in some situations we might want to capture the lookaround expression as well, or a part of it. That's possible. Just wrap that part into additional parentheses.

In the example below the currency sign `pattern:(€|kr)` is captured, along with the amount:

```js run
let str = "1 turkey costs 30€";
let regexp = /\d+(?=(€|kr))/; // extra parentheses around €|kr

alert( str.match(regexp) ); // 30, €
```

And here's the same for lookbehind:

```js run
let str = "1 turkey costs $30";
let regexp = /(?<=(\$|£))\d+/;

alert( str.match(regexp) ); // 30, $
```

## Summary

Lookahead and lookbehind (commonly referred to as "lookaround") are useful when we'd like to match something depending on the context before/after it.

For simple regexps we can do the similar thing manually. That is: match everything, in any context, and then filter by context in the loop.

Remember, `str.match` (without flag `pattern:g`) and `str.matchAll` (always) return matches as arrays with `index` property, so we know where exactly in the text it is, and can check the context.

But generally lookaround is more convenient.

Lookaround types:

| Pattern            | type             | matches |
|--------------------|------------------|---------|
| `X(?=Y)`   | Positive lookahead | `pattern:X` if followed by `pattern:Y` |
| `X(?!Y)`   | Negative lookahead | `pattern:X` if not followed by `pattern:Y` |
| `(?<=Y)X` |  Positive lookbehind | `pattern:X` if after `pattern:Y` |
| `(?<!Y)X` | Negative lookbehind | `pattern:X` if not after `pattern:Y` |
>>>>>>> ff042a03191dfad1268219ae78758193a5803b38
