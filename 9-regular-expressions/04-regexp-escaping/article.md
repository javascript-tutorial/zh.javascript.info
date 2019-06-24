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

As we've seen, a backslash `"\"` is used to denote character classes. So it's a special character in regexps (just like in a regular string).

There are other special characters as well, that have special meaning in a regexp. They are used to do more powerful searches. Here's a full list of them: `pattern:[ \ ^ $ . | ? * + ( )`.

Don't try to remember the list -- soon we'll deal with each of them separately and you'll know them by heart automatically.

## Escaping

Let's say we want to find a dot literally. Not "any character", but just a dot.

To use a special character as a regular one, prepend it with a backslash: `pattern:\.`.

That's also called "escaping a character".

For example:
```js run
alert( "Chapter 5.1".match(/\d\.\d/) ); // 5.1 (match!)
alert( "Chapter 511".match(/\d\.\d/) ); // null (looking for a real dot \.)
```

Parentheses are also special characters, so if we want them, we should use `pattern:\(`. The example below looks for a string `"g()"`:
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

```js run
alert( "function g()".match(/g\(\)/) ); // "g()"
```

<<<<<<< HEAD
如果我们想查找反斜杠 `\`，我们就应该使用两个反斜杠来查找：
=======
If we're looking for a backslash `\`, it's a special character in both regular strings and regexps, so we should double it.
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

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
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

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
=======
On the other hand, if we're not using `/.../`, but create a regexp using `new RegExp`, then we don't need to escape it:

```js run
alert( "/".match(new RegExp("/")) ); // '/'
```                                                                                                                                                                                   

## new RegExp

If we are creating a regular expression with `new RegExp`, then we don't have to escape `/`, but need to do some other escaping.

For instance, consider this:
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

```js run
let reg = new RegExp("\d\.\d");

alert( "Chapter 5.1".match(reg) ); // null
```

<<<<<<< HEAD
它并没有正常发挥作用，但是为什么呢？

原因就在于字符串转义规则。看下面的例子：
=======
The search worked with `pattern:/\d\.\d/`, but with `new RegExp("\d\.\d")` it doesn't work, why?

The reason is that backslashes are "consumed" by a string. Remember, regular strings have their own special characters like `\n`, and a backslash is used for escaping.

Please, take a look, what "\d\.\d" really is:
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

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
The quotes "consume" backslashes and interpret them, for instance:

- `\n` -- becomes a newline character,
- `\u1234` -- becomes the Unicode character with such code,
- ...And when there's no special meaning: like `\d` or `\z`, then the backslash is simply removed.

So the call to `new RegExp` gets a string without backslashes. That's why the search doesn't work!

To fix it, we need to double backslashes, because quotes turn `\\` into `\`:
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09

```js run
*!*
let regStr = "\\d\\.\\d";
*/!*
alert(regStr); // \d\.\d (correct now)

let reg = new RegExp(regStr);

alert( "Chapter 5.1".match(reg) ); // 5.1
```
<<<<<<< HEAD
=======

## Summary

- To search special characters `pattern:[ \ ^ $ . | ? * + ( )` literally, we need to prepend them with `\` ("escape them").
- We also need to escape `/` if we're inside `pattern:/.../` (but not inside `new RegExp`).
- When passing a string `new RegExp`, we need to double backslashes `\\`, cause strings consume one of them.
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09
