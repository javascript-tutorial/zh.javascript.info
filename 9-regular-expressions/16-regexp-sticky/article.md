
<<<<<<< HEAD
# 粘性标志 "y"，在位置处搜索

`pattern:y` 标志允许在源字符串中的指定位置执行搜索。

为了掌握 `pattern:y` 标志的用例，看看它有多好，让我们来探讨一个实际的用例。

regexps 的常见任务之一是＂词法分析＂：比如我们在程序设计语言中得到一个文本，然后分析它的结构元素。

例如，HTML 有标签和属性，JavaScript 代码有函数、变量等。

编写词法分析器是一个特殊的领域，有自己的工具和算法，所以我们就不深究了，但有一个共同的任务：在给定的位置读出一些东西。

例如，我们有一个代码字符串 `subject:let varName = "value"`，我们需要从其中读取变量名，这个变量名从位置 `4` 开始。

我们用 regexp `pattern:\w+` 来查找变量名。实际上，JavaScript 的变量名需要更复杂的 regexp 来进行准确的匹配，但在这里并不重要。

调用 `str.match(/\w+/)` 将只找到该行中的第一个单词。或者是所有带标记 `pattern:g` 的单词。但我们只需要在位置 `4` 的一个词。

要从给定位置搜索，我们可以使用方法 `regexp.exec(str)`。

如果 `regexp` 没有标志 `pattern:g` 或 `pattern:y`，那么这个方法就可以寻找字符串 `str` 中的第一个匹配，就像 `str.match(regexp)` 一样。这种简单的无标志的情况我们在这里并不感兴趣。

如果有标志 `pattern:g`，那么它就会在字符串 `str` 中执行搜索，从存储在 `regexp.lastIndex` 属性中的位置开始。如果发现匹配，则将 `regexp.lastIndex` 设置为匹配后的索引。

当一个 regexp 被创建时，它的 `lastIndex` 是 `0`。

因此，连续调用 `regexp.exec(str)` 会一个接一个地返回匹配。

一个例子（用标志 `pattern:g` ）：
=======
# Sticky flag "y", searching at position

The flag `pattern:y` allows to perform the search at the given position in the source string.

To grasp the use case of `pattern:y` flag, and see how great it is, let's explore a practical use case.

One of common tasks for regexps is "lexical analysis": we get a text, e.g. in a programming language, and analyze it for structural elements.

For instance, HTML has tags and attributes, JavaScript code has functions, variables, and so on.

Writing lexical analyzers is a special area, with its own tools and algorithms, so we don't go deep in there, but there's a common task: to read something at the given position.

E.g. we have a code string `subject:let varName = "value"`, and we need to read the variable name from it, that starts at position `4`.

We'll look for variable name using regexp `pattern:\w+`. Actually, JavaScript variable names need a bit more complex regexp for accurate matching, but here it doesn't matter.

A call to `str.match(/\w+/)` will find only the first word in the line. Or all words with the flag `pattern:g`. But we need only one word at position `4`.

To search from the given position, we can use method `regexp.exec(str)`.

If the `regexp` doesn't have flags `pattern:g` or `pattern:y`, then this method looks for the first match in the string `str`, exactly like `str.match(regexp)`. Such simple no-flags case doesn't interest us here.

If there's flag `pattern:g`, then it performs the search in the string `str`, starting from position stored in its `regexp.lastIndex` property. And, if it finds a match, then sets `regexp.lastIndex` to the index immediately after the match.

When a regexp is created, its `lastIndex` is `0`.

So, successive calls to `regexp.exec(str)` return matches one after another.

An example (with flag `pattern:g`):
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js run
let str = 'let varName';

let regexp = /\w+/g;
<<<<<<< HEAD
alert(regexp.lastIndex); // 0（最初 lastIndex=0）

let word1 = regexp.exec(str);
alert(word1[0]); // let（第一个单词）
alert(regexp.lastIndex); // 3（匹配后的位置）

let word2 = regexp.exec(str);
alert(word2[0]); // varName (第二个单词)
alert(regexp.lastIndex); // 11（匹配后的位置）

let word3 = regexp.exec(str);
alert(word3); // null（没有更多的匹配）
alert(regexp.lastIndex); // 0（搜索结束时重置）
```

每个匹配都会以数组形式返回，包含分组和附加属性。

我们可以在循环中得到所有的匹配。
=======
alert(regexp.lastIndex); // 0 (initially lastIndex=0)

let word1 = regexp.exec(str);
alert(word1[0]); // let (1st word)
alert(regexp.lastIndex); // 3 (position after the match)

let word2 = regexp.exec(str);
alert(word2[0]); // varName (2nd word)
alert(regexp.lastIndex); // 11 (position after the match)

let word3 = regexp.exec(str);
alert(word3); // null (no more matches)
alert(regexp.lastIndex); // 0 (resets at search end)
```

Every match is returned as an array with groups and additional properties.

We can get all matches in the loop:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js run
let str = 'let varName';
let regexp = /\w+/g;

let result;

while (result = regexp.exec(str)) {
<<<<<<< HEAD
  alert( `Found ${result[0]}} at position ${result.index}` );
  // 在位置 0 发现 let, 然后
  // 在位置 4 发现 varName
}
```

`regexp.exec` 是 `str.matchAll` 方法的替代方法。

与其他方法不同，我们可以设置自己的 `lastIndex`，从给定位置开始搜索。

例如，让我们从位置 `4` 开始寻找一个单词。
=======
  alert( `Found ${result[0]} at position ${result.index}` );
  // Found let at position 0, then
  // Found varName at position 4
}
```

Such use of `regexp.exec` is an alternative to method `str.matchAll`.

Unlike other methods, we can set our own `lastIndex`, to start the search from the given position.

For instance, let's find a word, starting from position `4`:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js run
let str = 'let varName = "value"';

<<<<<<< HEAD
let regexp = /\w+/g; // 如果没有标志 "g"，属性 lastIndex 会被忽略
=======
let regexp = /\w+/g; // without flag "g", property lastIndex is ignored
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

*!*
regexp.lastIndex = 4;
*/!*

let word = regexp.exec(str);
alert(word); // varName
```

<<<<<<< HEAD
我们从位置 `regexp.lastIndex = 4` 开始搜索 `pattern:w+`。

请注意：搜索从位置 `lastIndex` 开始，然后再往前走。如果在 `lastIndex` 位置上没有词，但它在后面的某个地方，那么它就会被找到：
=======
We performed a search of `pattern:\w+`, starting from position `regexp.lastIndex = 4`.

Please note: the search starts at position `lastIndex` and then goes further. If there's no word at position `lastIndex`, but it's somewhere after it, then it will be found:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js run
let str = 'let varName = "value"';

let regexp = /\w+/g;

*!*
regexp.lastIndex = 3;
*/!*

let word = regexp.exec(str);
alert(word[0]); // varName
alert(word.index); // 4
```

<<<<<<< HEAD
……所以，用标志 `pattern:g` 属性 `lastIndex` 设置搜索的起始位置。

**标记 `pattern:y` 使 `regexp.exec` 正好在 `lastIndex` 位置，而不是在它之前，也不是在它之后。

下面是使用标志 `pattern:y` 进行同样的搜索。
=======
...So, with flag `pattern:g` property `lastIndex` sets the starting position for the search.

**Flag `pattern:y` makes `regexp.exec` to look exactly at position `lastIndex`, not before, not after it.**

Here's the same search with flag `pattern:y`:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js run
let str = 'let varName = "value"';

let regexp = /\w+/y;

regexp.lastIndex = 3;
<<<<<<< HEAD
alert( regexp.exec(str) ); // null（位置 3 有一个空格，不是单词）

regexp.lastIndex = 4;
alert( regexp.exec(str) ); // varName（在位置 4 的单词）
```

我们可以看到，regexp `pattern:/\w+/y` 在位置 `3` 处不匹配(不同于标志 `pattern:g` )，而是在位置 `4` 处匹配。

想象一下，我们有一个长的文本，而里面根本没有匹配。那么用标志 `pattern:g` 搜索将一直到文本的最后，这将比用标志 `pattern:y` 搜索要花费更多的时间。

在像词法分析这样的任务中，通常在一个确切的位置会有很多搜索。使用标志 `pattern:y` 是获得良好性能的关键。
=======
alert( regexp.exec(str) ); // null (there's a space at position 3, not a word)

regexp.lastIndex = 4;
alert( regexp.exec(str) ); // varName (word at position 4)
```

As we can see, regexp `pattern:/\w+/y` doesn't match at position `3` (unlike the flag  `pattern:g`), but matches at position `4`.

Imagine, we have a long text, and there are no matches in it, at all. Then searching with flag `pattern:g` will go till the end of the text, and this will take significantly more time than the search with flag `pattern:y`.

In such tasks like lexical analysis, there are usually many searches at an exact position. Using flag `pattern:y` is the key for a good performance.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
