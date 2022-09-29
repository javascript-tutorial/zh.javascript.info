# 锚点 ^ $ 的多行模式，修饰符 "m"

多行模式由修饰符 `pattern:m` 启用。

它只影响 `pattern:^` 和 `pattern:$` 的行为。

在多行模式下，它们不仅仅匹配文本的开始与末尾，还匹配每一行的开始与末尾。

## 搜索行的开头 ^

在这个有多行文本的例子中，模式 `/^\d/gm` 将从每行的开头取一个数字：

```js run
let str = `1st place: Winnie
2nd place: Piglet
3rd place: Eeyore`;

*!*
console.log( str.match(/^\d/gm) ); // 1, 2, 3
*/!*
```

没有修饰符 `pattern:m` 时，仅会匹配第一个数字：

```js run
let str = `1st place: Winnie
2nd place: Piglet
3rd place: Eeyore`;

*!*
console.log( str.match(/^\d/g) ); // 1
*/!*
```

这是因为默认情况下，锚点 `^` 仅匹配文本的开头，在多行模式下，它匹配行的开头。

```smart
“行的开头”表示“就在换行符之后”：多行模式下的测试 `pattern:^` 匹配所有以换行符 `\n` 开头的位置。

以及在文本开始的位置。
```

## 搜索行的末尾 $

美元符 `pattern:$` 的行为也类似。

正则表达式 `pattern:\d$` 寻找每行的最后一个数字

```js run
let str = `Winnie: 1
Piglet: 2
Eeyore: 3`;

console.log( str.match(/\d$/gm) ); // 1,2,3
```

没有修饰符 `pattern:m`，那么美元符 `pattern:$` 将只会匹配整个文本的末尾，所以只有最后一个数字会被匹配。

```smart
“行的末尾”表示“就在换行符之前”：多行模式下的测试 `pattern:$` 匹配所有以换行符 `\n` 结尾的位置。

以及在文本末尾的位置。
```

## 搜索 \n 而不是 ^ $

要寻找新的一行，我们不仅可以使用锚点 `pattern:^` 和 `pattern:$`，也可以使用换行符 `\n`。

区别是什么？让我们看个例子。

在这里我们使用 `pattern:\d\n` 进行搜索，而不是使用 `pattern:\d$`：

```js run
let str = `Winnie: 1
Piglet: 2
Eeyore: 3`;

console.log( str.match(/\d\n/g) ); // 1\n,2\n
```

正如我们所看到的，这里找到了 2 个匹配项而不是 3 个。

这是因为在 `subject:3` 之后没有换行符（但是有文本末尾，所以它匹配 `pattern:$`）。

另一个区别是，现在每个匹配项都包含一个换行符 `match:\n`。与锚点 `pattern:^` `pattern:$` 不同，锚点只测试条件（行的开始/末尾），而 `\n` 是一个字符，因此它成为了结果的一部分。

因此，当我们需要结果中有换行符时，使用 `\n`。而锚点则用于在行的开头/末尾查找某些内容。
