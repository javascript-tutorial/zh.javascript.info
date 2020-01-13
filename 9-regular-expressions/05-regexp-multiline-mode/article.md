<<<<<<< HEAD
# Flag "m" — 多行模式

通过 flag `/.../m` 可以开启多行模式。

这仅仅会影响 `^` 和 `$` 锚符的行为。

在多行模式下，它们不仅仅匹配文本的开始与结束，还匹配每一行的开始与结束。

## 行的开头 ^

在这个有多行文本的例子中，正则表达式 `/^\d+/gm` 将匹配每一行的开头数字：
=======
# Multiline mode of anchors ^ $, flag "m"

The multiline mode is enabled by the flag `pattern:m`.

It only affects the behavior of `pattern:^` and `pattern:$`.

In the multiline mode they match not only at the beginning and the end of the string, but also at start/end of line.

## Searching at line start ^

In the example below the text has multiple lines. The pattern `pattern:/^\d/gm` takes a digit from the beginning of each line:
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874

```js run
let str = `1st place: Winnie
2nd place: Piglet
<<<<<<< HEAD
33rd place: Eeyore`;

*!*
alert( str.match(/^\d+/gm) ); // 1, 2, 33
*/!*
```

没有 flag  `/.../m` 时，仅仅是第一个数字被匹配到：

=======
3rd place: Eeyore`;

*!*
alert( str.match(/^\d/gm) ); // 1, 2, 3
*/!*
```

Without the flag `pattern:m` only the first digit is matched:
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874

```js run
let str = `1st place: Winnie
2nd place: Piglet
<<<<<<< HEAD
33rd place: Eeyore`;

*!*
alert( str.match(/^\d+/g) ); // 1
*/!*
```

这是因为默认情况下，锚符 `^` 仅仅匹配文本的开头，在多行模式下，它匹配行的开头。

正则表达式引擎将会在文本中查找以锚符 `^` 开始的字符串，我们找到之后继续匹配 `\d+` 模式。

## 行的结尾 $

美元符 `$` 行为也相似。

正则表达式 `\w+$ 会找到每一行的最后一个单词：

```js run
let str = `1st place: Winnie
2nd place: Piglet
33rd place: Eeyore`;

alert( str.match(/\w+$/gim) ); // Winnie,Piglet,Eeyore
```

没有 `/.../m` flag 的话，美元符 `$` 将会仅仅匹配整个文本的结尾，所以只有最后的一个单词会被找到。

## 锚符 ^$ 对比 \n

要寻找新的一行的话，我们不仅可以使用锚符 `^` 和 `$`，也可以使用批匹配符 `\n`。

它和锚符 `^` 和 `$` 的第一个不同点是它不像锚符那样，它会“消耗”掉 `\n` 并且将其（`\n`）加入到匹配结果中。

举个例子，我们在下面的代码中用它来替代 `$`：

```js run
let str = `1st place: Winnie
2nd place: Piglet
33rd place: Eeyore`;

alert( str.match(/\w+\n/gim) ); // Winnie\n,Piglet\n
```

这里，我们每次匹配到的时候都会被添加一个换行符。

还有一个不同点——换行符 `\n` 不会匹配字符串结尾。这就是为什么在上面的例子中 `Eeyore` 没有匹配到。

所以，通常情况下使用锚符更棒，用它匹配出来的结果更加接近我们想要的结果。
=======
3rd place: Eeyore`;

*!*
alert( str.match(/^\d/g) ); // 1
*/!*
```

That's because by default a caret `pattern:^` only matches at the beginning of the text, and in the multiline mode -- at the start of any line.

```smart
"Start of a line" formally means "immediately after a line break": the test  `pattern:^` in multiline mode matches at all positions preceeded by a newline character `\n`.

And at the text start.
```

## Searching at line end $

The dollar sign `pattern:$` behaves similarly.

The regular expression `pattern:\d$` finds the last digit in every line

```js run
let str = `Winnie: 1
Piglet: 2
Eeyore: 3`;

alert( str.match(/\d$/gm) ); // 1,2,3
```

Without the flag `m`, the dollar `pattern:$` would only match the end of the whole text, so only the very last digit would be found.

```smart
"End of a line" formally means "immediately before a line break": the test  `pattern:$` in multiline mode matches at all positions succeeded by a newline character `\n`.

And at the text end.
```

## Searching for \n instead of ^ $

To find a newline, we can use not only anchors `pattern:^` and `pattern:$`, but also the newline character `\n`.

What's the difference? Let's see an example.

Here we search for `pattern:\d\n` instead of `pattern:\d$`:

```js run
let str = `Winnie: 1
Piglet: 2
Eeyore: 3`;

alert( str.match(/\d\n/gm) ); // 1\n,2\n
```

As we can see, there are 2 matches instead of 3.

That's because there's no newline after `subject:3` (there's text end though, so it matches `pattern:$`).

Another difference: now every match includes a newline character `match:\n`. Unlike the anchors `pattern:^` `pattern:$`, that only test the condition (start/end of a line), `\n` is a character, so it becomes a part of the result.

So, a `\n` in the pattern is used when we need newline characters in the result, while anchors are used to find something at the beginning/end of a line.
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874
