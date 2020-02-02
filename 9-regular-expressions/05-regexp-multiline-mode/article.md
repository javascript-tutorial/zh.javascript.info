# Flag "m" — 多行模式

通过 flag `/.../m` 可以开启多行模式。

这仅仅会影响 `^` 和 `$` 锚符的行为。

在多行模式下，它们不仅仅匹配文本的开始与结束，还匹配每一行的开始与结束。

## 行的开头 ^

在这个有多行文本的例子中，正则表达式 `/^\d+/gm` 将匹配每一行的开头数字：

```js run
let str = `1st place: Winnie
2nd place: Piglet
33rd place: Eeyore`;

*!*
alert( str.match(/^\d+/gm) ); // 1, 2, 33
*/!*
```

没有 flag  `/.../m` 时，仅仅是第一个数字被匹配到：


```js run
let str = `1st place: Winnie
2nd place: Piglet
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

要寻找新的一行的话，我们不仅可以使用锚符 `^` 和 `$`，也可以使用换行符 `\n`。

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
