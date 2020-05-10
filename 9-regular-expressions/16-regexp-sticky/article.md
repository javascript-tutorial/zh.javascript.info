
# 粘性标志 "y"，在位置搜索

`pattern:y` 标志允许在源字符串中的指定位置执行搜索。

为了掌握 `pattern:y` 标志的用例，看看它有多好，让我们来探讨一个实际的用例。
d
regexps的常见任务之一是＂词法分析＂：我们得到一个文本，比如说在程序设计语言中，我们得到一个文本，然后分析它的结构元素。

例如，HTML有标签和属性，JavaScript代码有函数、变量等。

编写词法分析器是一个特殊的领域，有自己的工具和算法，所以我们就不深究了，但有一个共同的任务：在给定的位置读出一些东西。

例如，我们有一个代码字符串 `subject:let varName = "value"`，我们需要从其中读取变量名，这个变量名从位置 `4` 开始。

我们用regexp `pattern:\w+` 来查找变量名。实际上，JavaScript的变量名需要更复杂的regexp来进行准确的匹配，但在这里并不重要。

调用 `str.match(/\w+/)` 将只找到该行中的第一个单词。或者是所有带标记 `pattern:g` 的单词。但我们只需要在位置 `4` 位置的一个词。

要从给定位置搜索，我们可以使用方法 `regexp.exec(str)`。

如果 `regexp` 没有标志 `pattern:g` 或 `pattern:y`，那么这个方法就可以寻找字符串 `str` 中的第一个匹配，就像 `str.match(regexp)` 一样。这种简单的无标志的情况我们在这里并不感兴趣。

如果有标志 `pattern:g`，那么它就会在字符串 `str` 中执行搜索，从存储在 `regexp lastIndex` 属性中的位置开始。如果发现匹配，则将 `regexp.lastIndex` 设置为匹配后的索引。

当一个regexp被创建时，它的 `lastIndex` 是 `0`。

因此，连续调用 `regexp.exec(str)` 会一个接一个地返回匹配。

一个例子（用标志 `pattern:g` ）。

```js运行
let str = 'let varName';

let regexp = ///w+/g;
alert(regexp.lastIndex); /// 0 (最初lastIndex=0)

let word1 = regexp.exec(str);
alert(word1[0]); /// let (1st word)
alert(regexp.lastIndex); //3 (比赛后的位置)

let word2 = regexp.exec(str);
alert(word2[0]); /// varName (第二个单词)
alert(regexp.lastIndex); // 11 (比赛后的位置)

let word3 = regexp.exec(str);
alert(word3); /// null (没有更多的匹配)
alert(regexp.lastIndex); /// 0 (搜索结束时重置)
```

每个匹配都会以数组和附加属性的形式返回。

我们可以在循环中得到所有的匹配。

```js run
let str = 'let varName';
let regexp = //w+/g;

let result.exec(str); let result;

while (result = regexp.exec(str)) {
  alert( `Found ${result[0]}} at position ${result.index}` );
  // 在位置 0 发现 let, 然后
  // 在位置 4 发现 varName
}
```

`regexp.exec` 是 `str.matchAll` 方法的替代方法。

与其他方法不同，我们可以设置自己的 "lastIndex"，从给定位置开始搜索。

例如，让我们从位置 `4` 开始寻找一个单词。

```js run
let str = 'let varName = "value"';

let regexp = //w+/g; //如果没有标志 "g"，属性lastIndex会被忽略

*!*
regexp.lastIndex = 4;
*/!*

let word = regexp.exec(str);
alert(word); /// varName
```

我们从位置 `regexp.lastIndex = 4` 开始搜索 `pattern:w+`。

请注意：搜索从位置 `lastIndex` 开始，然后再往前走。如果在 `lastIndex` 位置上没有词，但它在后面的某个地方，那么它就会被找到。

```js run
let str = 'let varName = "value"';

let regexp = //w+/g;

*!*
regexp.lastIndex = 3;
*/!*

let word = regexp.exec(str);
alert(word[0]); /// varName
alert(word.index); // 4
```

...所以，用标志 `pattern:g` 属性 `lastIndex` 设置搜索的起始位置。

**标记 `pattern:y` 使 `regexp.exec` 正好在`lastIndex` 位置，而不是在它之前，而不是在它之后。

下面是使用标志 `pattern:y` 进行同样的搜索。

```js运行
let str = 'let varName = "value"';

let regexp = //w+/y;

regexp.lastIndex = 3;
alert( regexp.exec(str) ); /// null (位置3有一个空格，不是单词)

regexp.lastIndex = 4;
alert( regexp.exec(str) ); /// varName (word at position 4)
```

我们可以看到，regexp `pattern://w+/y` 在位置 `3` 处不匹配(不像标志 `pattern:g` )，而是在位置 `4` 处匹配。

想象一下，我们有一个长的文本，而里面根本没有匹配。那么用标志 `pattern:g` 搜索将一直到文本的最后，这将比用标志 `pattern:y` 搜索要花费更多的时间。

在像词法分析这样的任务中，通常会有很多搜索在一个确切的位置。使用标志 `pattern:y` 是获得良好性能的关键。