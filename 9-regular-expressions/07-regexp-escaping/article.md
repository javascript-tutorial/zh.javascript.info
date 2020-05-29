<<<<<<< HEAD
# 转义，特殊字符
正如我们所看到的，一个反斜杠 `"\"` 是用来表示匹配字符类的。所以它是一个特殊字符。

还存在其它的特殊字符，这些字符在正则表达式中有特殊的含义。它们可以被用来做更加强大的搜索。

这里是包含所有特殊字符的列表：`pattern:[ \ ^ $ . | ? * + ( )`。

现在并不需要尝试去记住它们 —— 当我们分别处理其中的每一个时，你自然而然就会记住它们。

## 转义

如果要把特殊字符作为常规字符来使用，只需要在它前面加个反斜杠。

这种方式也被叫做“转义一个字符”。

比如说，我们需要找到一个点号 `pattern:'.'`。在一个正则表达式中一个点号意味着“除了换行符以外的任意字符”，所以如果我们想真正表示对“一个点号”查询的时候，可以在点号前加一个反斜杠。

```js run
alert( "Chapter 5.1".match(/\d\.\d/) ); // 5.1
```

括号也是特殊字符，所以如果我们想要在正则中查找它们，我们应该使用 `pattern:\(`。下面的例子会查找一个字符串 `"g()"`：
=======

# Escaping, special characters

As we've seen, a backslash `pattern:\` is used to denote character classes, e.g. `pattern:\d`. So it's a special character in regexps (just like in regular strings).

There are other special characters as well, that have special meaning in a regexp. They are used to do more powerful searches. Here's a full list of them: `pattern:[ \ ^ $ . | ? * + ( )`.

Don't try to remember the list -- soon we'll deal with each of them separately and you'll know them by heart automatically.

## Escaping

Let's say we want to find literally a dot. Not "any character", but just a dot.

To use a special character as a regular one, prepend it with a backslash: `pattern:\.`.

That's also called "escaping a character".

For example:
```js run
alert( "Chapter 5.1".match(/\d\.\d/) ); // 5.1 (match!)
alert( "Chapter 511".match(/\d\.\d/) ); // null (looking for a real dot \.)
```

Parentheses are also special characters, so if we want them, we should use `pattern:\(`. The example below looks for a string `"g()"`:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js run
alert( "function g()".match(/g\(\)/) ); // "g()"
```

<<<<<<< HEAD
如果我们想查找反斜杠 `\`，我们就应该使用两个反斜杠来查找：
=======
If we're looking for a backslash `\`, it's a special character in both regular strings and regexps, so we should double it.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js run
alert( "1\\2".match(/\\/) ); // '\'
```

<<<<<<< HEAD
## 一个斜杠

斜杠符号 `'/'` 并不是一个特殊符号，但是它被用于在 Javascript 中开启和关闭正则匹配：`pattern:/...pattern.../`，所以我们也应该转义它。

下面是查询斜杠 `'/'` 的表达式：
=======
## A slash

A slash symbol `'/'` is not a special character, but in JavaScript it is used to open and close the regexp: `pattern:/...pattern.../`, so we should escape it too.

Here's what a search for a slash `'/'` looks like:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js run
alert( "/".match(/\//) ); // '/'
```

<<<<<<< HEAD
从另一个方面看，如果使用另一种 `new RegExp` 方式就不需要转义斜杠：

```js run
alert( "/".match(new RegExp("/")) ); // '/'
```

## 使用 new RegExp 创建正则实例

如果我们使用 `new RegExp` 来创建一个正则表达式实例，那么我们需要对其做一些额外的转义。

比如说，考虑下面的示例：

```js run
let reg = new RegExp("\d\.\d");

alert( "Chapter 5.1".match(reg) ); // null
```

它并没有正常发挥作用，但是为什么呢？

原因就在于字符串转义规则。看下面的例子：
=======
On the other hand, if we're not using `pattern:/.../`, but create a regexp using `new RegExp`, then we don't need to escape it:

```js run
alert( "/".match(new RegExp("/")) ); // finds /
```

## new RegExp

If we are creating a regular expression with `new RegExp`, then we don't have to escape `/`, but need to do some other escaping.

For instance, consider this:

```js run
let regexp = new RegExp("\d\.\d");

alert( "Chapter 5.1".match(regexp) ); // null
```

The similar search in one of previous examples worked with `pattern:/\d\.\d/`, but `new RegExp("\d\.\d")` doesn't work, why?

The reason is that backslashes are "consumed" by a string. As we may recall, regular strings have their own special characters, such as `\n`, and a backslash is used for escaping.

Here's how "\d\.\d" is preceived:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js run
alert("\d\.\d"); // d.d
```

<<<<<<< HEAD
在字符串中的反斜杠表示转义或者类似 `\n` 这种只能在字符串中使用的特殊字符。这个引用会“消费”并且解释这些字符，比如说：

- `\n` —— 变成一个换行字符，
- `\u1234` —— 变成包含该码位的 Unicode 字符，
- 。。。其它有些并没有特殊的含义，就像 `\d` 或者 `\z`，碰到这种情况的话会把反斜杠移除。

所以调用 `new RegExp` 会获得一个没有反斜杠的字符串。

如果要修复这个问题，我们需要双斜杠，因为引用会把 `\\` 变为 `\`：
=======
String quotes "consume" backslashes and interpret them on their own, for instance:

- `\n` -- becomes a newline character,
- `\u1234` -- becomes the Unicode character with such code,
- ...And when there's no special meaning: like `pattern:\d` or `\z`, then the backslash is simply removed.

So `new RegExp` gets a string without backslashes. That's why the search doesn't work!

To fix it, we need to double backslashes, because string quotes turn `\\` into `\`:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js run
*!*
let regStr = "\\d\\.\\d";
*/!*
alert(regStr); // \d\.\d (correct now)

let regexp = new RegExp(regStr);

alert( "Chapter 5.1".match(regexp) ); // 5.1
```

## Summary

<<<<<<< HEAD
- 要在字面（意义）上搜索特殊字符 `pattern:[ \ ^ $ . | ? * + ( )`，我们需要在它们前面加上反斜杠 `\`（"转义它们"）。
- 如果我们在 `pattern:/.../` 内部（但不在 `new RegExp` 内部），还需要转义 `/`。
- 传递一个字符串（参数）给 `new RegExp` 时，我们需要双倍反斜杠 `\\`，因为字符串引号会消费其中的一个。
=======
- To search for special characters `pattern:[ \ ^ $ . | ? * + ( )` literally, we need to prepend them with a backslash `\` ("escape them").
- We also need to escape `/` if we're inside `pattern:/.../` (but not inside `new RegExp`).
- When passing a string `new RegExp`, we need to double backslashes `\\`, cause string quotes consume one of them.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
