
# 粘性修饰符 "y"，在位置处搜索

`pattern:y` 修饰符让我们能够在源字符串中的指定位置进行搜索。

为了掌握 `pattern:y` 修饰符的使用方式，让我们来看一个实际的例子。

正则表达式的常见任务之一就是“词法分析”：例如我们得到了一个代码文本，我们需要找到它的结构元素。例如，HTML 有标签和特性（attribute），JavaScript 代码有函数、变量等。

编写词法分析器是一个特殊的领域，有自己的工具和算法，所以我们不做过多的深入，但有一个共同的任务：在给定的位置读取一些内容。

例如，我们有一个代码字符串 `subject:let varName = "value"`，我们需要从中读取变量名，这个变量名从位置 `4` 开始。

我们将使用正则表达式 `pattern:\w+` 来查找变量名。实际上，JavaScript 的变量名需要更复杂的正则表达式才能准确匹配，但在这里并不重要。

- 调用 `str.match(/\w+/)` 将只会找到该行中的第一个单词 (`let`)。不是这个。
- 我们可以添加修饰符 `pattern:g`。但是调用 `str.match(/\w+/g)` 会查找文本中的所有单词，而我们需要位置 `4` 的一个单词。同样，不是我们需要的。

**那么，如何在给定位置准确搜索正则表达式？**。

让我们尝试使用方法 `regexp.exec(str)`。

对于没有修饰符 `pattern:g` 和 `pattern:y` 的 `regexp`，此方法仅查找第一个匹配项，就像 `str.match(regexp)` 一样。

……但是如果有修饰符 `pattern:g`，那么它就会从存储在 `regexp.lastIndex` 属性中的位置开始在字符串 `str` 中进行搜索。如果找到匹配项，则将在匹配后立即将 `regexp.lastIndex` 设置为索引。

换句话说，`regexp.lastIndex` 作为搜索的起点，每个 `regexp.exec(str)` 调用都会将其重置为新值（“在最后一次匹配后”）。当然，这只是在有 `pattern:g` 修饰符的情况下才会这样。

因此，连续调用 `regexp.exec(str)` 会一个接一个地返回匹配。

以下是此类调用的示例：

```js run
let str = 'let varName'; // 让我们找出字符串中的所有单词
let regexp = /\w+/g;

alert(regexp.lastIndex); // 0 (初始值 lastIndex=0)

let word1 = regexp.exec(str);
alert(word1[0]); // let (第一个单词)
alert(regexp.lastIndex); // 3 (匹配后的位置)

let word2 = regexp.exec(str);
alert(word2[0]); // varName (第二个单词)
alert(regexp.lastIndex); // 11 (匹配后的位置)

let word3 = regexp.exec(str);
alert(word3); // null (没有更多匹配项)
alert(regexp.lastIndex); // 0 (搜索结束后重置索引)
```

我们可以通过循环获取所有匹配。

```js run
let str = 'let varName';
let regexp = /\w+/g;

let result;

while (result = regexp.exec(str)) {
  alert( `Found ${result[0]} at position ${result.index}` );
  // 在位置 0 发现了 let，然后
  // 在位置 4 发现 varName
}
```

`regexp.exec` 的这种使用方式可以作为 `str.matchAll` 方法的替代，可以对匹配过程进行更多控制。

让我们回到我们的任务。

我们可以手动将 `lastIndex` 设置为 `4`，从给定的位置开始搜索！

像这样：

```js run
let str = 'let varName = "value"';

let regexp = /\w+/g; // 没有修饰符 "g"，lastIndex 属性会被忽略

*!*
regexp.lastIndex = 4;
*/!*

let word = regexp.exec(str);
alert(word); // varName
```

哇塞！问题解决了！

我们从位置 `regexp.lastIndex = 4` 开始搜索 `pattern:\w+`。

结果是正确的。

……但是等等，没那么快。

请注意：`regexp.exec` 调用从位置 `lastIndex` 开始搜索，然后继续搜索。如果 `lastIndex` 位置没有单词，但单词在这之后的某个位置，那么单词也会被找到：

```js run
let str = 'let varName = "value"';

let regexp = /\w+/g;

*!*
// 从位置 3 开始搜索
regexp.lastIndex = 3;
*/!*

let word = regexp.exec(str); 
// 在位置 4 找到匹配项
alert(word[0]); // varName
alert(word.index); // 4
```

对于某些任务，包括词法分析，这是错误的。我们需要在文本的给定位置准确地找到匹配，而不是在它之后的某个位置。这就是修饰符 "y" 的用途。

**修饰符 `pattern:y` 使 `regexp.exec` 精确搜索位置 `lastIndex`，而不是“从”它开始。** 

下面是带有修饰符 `pattern:y` 的相同搜索：

```js run
let str = 'let varName = "value"';

let regexp = /\w+/y;

regexp.lastIndex = 3;
alert( regexp.exec(str) ); // null（位置 3 有一个空格，不是单词）

regexp.lastIndex = 4;
alert( regexp.exec(str) ); // varName（在位置 4 的单词）
```

正如我们所看到的，正则表达式 `pattern:/\w+/y` 在位置 `3` 处不匹配（不同于修饰符 `pattern:g`)，但在位置 `4` 处匹配。

这不仅是我们所需要的，当使用修饰符 `pattern:y` 时，还有一个重要的性能提升。

想象一下，我们有一个很长的文本，其中根本没有匹配项。然后使用修饰符 `pattern:g` 进行搜索，会一直搜索到文本的末尾，并且什么也找不到，这将比使用修饰符 `pattern:y` 的搜索花费更多的时间，后者只检查确切的位置。

在像词法分析这样的任务中，通常会在一个确切的位置进行多次搜索，以检查我们在那里有什么。使用修饰符 `pattern:y` 是正确实现和良好性能的关键。
