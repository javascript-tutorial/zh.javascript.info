# 无限回溯问题

有些正则表达式看起来简单，但会执行很长很长的时间，甚至会“挂起” JavaScript 引擎。

绝大多数开发者迟早会遇到这种行为。

典型的情况 —— 一个正则表达式有时候工作正常，但对于特定的字符串它会“挂起”占用 100% 的 CPU。

<<<<<<< HEAD:5-regular-expressions/15-regexp-infinite-backtracking-problem/article.md
这甚至可能是一个漏洞。例如，如果 JavaScript 运行在服务器上，并且它使用正则表达式来处理用户数据，那么这样的输入可能会拒绝服务。笔者亲自看到并报告过这些漏洞，即使对于众所周知且广泛使用的程序也是如此。
=======
In a web-browser it kills the page. Not a good thing for sure.

For server-side JavaScript it may become a vulnerability, and it uses regular expressions to process user data. Bad input will make the process hang, causing denial of service. The author personally saw and reported such vulnerabilities even for very well-known and widely used programs.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/15-regexp-infinite-backtracking-problem/article.md

所以这个问题是绝对值得解决的。

<<<<<<< HEAD:5-regular-expressions/15-regexp-infinite-backtracking-problem/article.md
## 实例
=======
## Introduction
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/15-regexp-infinite-backtracking-problem/article.md

计划将会是这样的：

1. 首先我们观察问题是如何出现的。
2. 然后我们简化场景并分析问题为什么会出现。
3. 然后我们修复它。

例如，让我们考虑在 HTML 中查找标签。

我们想要查找所有的标签，有或者没有属性 —— 比如 `<a href="..." class="doc" ...>`。我们需要正则表达式可靠地工作，因为 HMTL 是来自网络的并可能会很混乱。

特别的，我们需要匹配像 `<a test="<>" href="#">` —— 属性里有 `<` 和 `>` 的标签。这在 [HTML standard](https://html.spec.whatwg.org/multipage/syntax.html#syntax-attributes) 中是允许的。

<<<<<<< HEAD:5-regular-expressions/15-regexp-infinite-backtracking-problem/article.md
现在我们可以看到像 `<[^>]+>` 这样简单的正则表达式不起作用，因为它停在了第一个 `>`，我们需要忽略属性里的 `<>`。
=======
Now we can see that a simple regexp like `pattern:<[^>]+>` doesn't work, because it stops at the first `>`, and we need to ignore `<>` if inside an attribute.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/15-regexp-infinite-backtracking-problem/article.md

```js run
// 匹配没有抵达标签的末尾 —— 错误！
alert( '<a test="<>" href="#">'.match(/<[^>]+>/) ); // <a test="<>
```

<<<<<<< HEAD:5-regular-expressions/15-regexp-infinite-backtracking-problem/article.md
我们需要整个标签。

要正确处理这种情况我们需要一个更复杂的正则表达式。它将有 `<tag (key=value)*>` 这样的形式。

在正则表达式语言中是 `<\w+(\s*\w+=(\w+|"[^"]*")\s*)*>`：

1. `<\w+` —— 是标签的开始,
2. `(\s*\w+=(\w+|"[^"]*")\s*)*` —— 是一个任意数量的 `word=value` 对，其中值可以是单词 `\w+` 或者一个带引号的字符串 `"[^"]*"`。

这还不支持 HTML 语法的一些细节，例如在“单个”引号中的字符串，但它们可以以后添加，因此它们和现实生活有些接近。目前我们想要简单的正则表达式。

让我们实际操作一下：
=======
To correctly handle such situations we need a more complex regular expression. It will have the form  `pattern:<tag (key=value)*>`.

1. For the `tag` name: `pattern:\w+`,
2. For the `key` name: `pattern:\w+`,
3. And the `value`: a quoted string `pattern:"[^"]*"`.

If we substitute these into the pattern above and throw in some optional spaces `pattern:\s`, the full regexp becomes: `pattern:<\w+(\s*\w+="[^"]*"\s*)*>`.

That regexp is not perfect! It doesn't yet support all details of HTML, for instance unquoted values, and there are other ways to improve, but let's not add complexity. It will demonstrate the problem for us.

The regexp seems to work:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/15-regexp-infinite-backtracking-problem/article.md

```js run
let reg = /<\w+(\s*\w+="[^"]*"\s*)*>/g;

let str='...<a test="<>" href="#">... <b>...';

alert( str.match(reg) ); // <a test="<>" href="#">, <b>
```

<<<<<<< HEAD:5-regular-expressions/15-regexp-infinite-backtracking-problem/article.md
很好，它生效了。它找到了长标签 `<a test="<>" href="#">` 和短标签 `<b>`。

现在让我们看看问题。

如果你运行下面的示例，它可能会挂起浏览器（或任何运行的 JavaScript 引擎）：
=======
Great! It found both the long tag `match:<a test="<>" href="#">` and the short one `match:<b>`.

Now, that we've got a seemingly working solution, let's get to the infinite backtracking itself.

## Infinite backtracking

If you run our regexp on the input below, it may hang the browser (or another JavaScript host):
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/15-regexp-infinite-backtracking-problem/article.md

```js run
let reg = /<\w+(\s*\w+="[^"]*"\s*)*>/g;

let str = `<tag a="b"  a="b"  a="b"  a="b"  a="b"  a="b"  a="b"  a="b"
  a="b"  a="b"  a="b"  a="b"  a="b"  a="b"  a="b"  a="b"  a="b" a="b"  a="b"  a="b"  a="b"`;

*!*
<<<<<<< HEAD:5-regular-expressions/15-regexp-infinite-backtracking-problem/article.md
// 查询会耗费很长很长的时间
=======
// The search will take a long, long time
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/15-regexp-infinite-backtracking-problem/article.md
alert( str.match(reg) );
*/!*
```

<<<<<<< HEAD:5-regular-expressions/15-regexp-infinite-backtracking-problem/article.md
一些正则表达式引擎可以处理该搜索，但大多数都不行。

这是怎么回事？为什么在这么小的字符串上，一个简单的正则表达式会“挂起” ？

让我们通过删除标记和引用的字符串来简化场景。

这里我们只查看属性：
=======
Some regexp engines can handle that search, but most of them can't.

What's the matter? Why a simple regular expression "hangs" on such a small string?

Let's simplify the regexp by stripping the tag name and the quotes. So that we look only for `key=value` attributes: `pattern:<(\s*\w+=\w+\s*)*>`.

Unfortunately, the regexp still hangs:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/15-regexp-infinite-backtracking-problem/article.md

```js run
// 只查找用空格分隔的属性
let reg = /<(\s*\w+=\w+\s*)*>/g;

let str = `<a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b
  a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b`;

*!*
// 查询会耗费很长很长的时间
alert( str.match(reg) );
*/!*
```

<<<<<<< HEAD:5-regular-expressions/15-regexp-infinite-backtracking-problem/article.md
同样的问题仍然存在。

在这里，我们结束问题的演示，并开始研究发生了什么以及它为什么会挂起。

## 回溯
=======
Here we end the demo of the problem and start looking into what's going on, why it hangs and how to fix it.

## Detailed example
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/15-regexp-infinite-backtracking-problem/article.md

为了使问题更简单，我们考虑一下 `(\d+)*$`。

这个正则表达式也有同样的问题。在大多数正则表达式引擎中，搜索需要很长时间（小心 —— 会挂起）：

```js run
alert( '12345678901234567890123456789123456789z'.match(/(\d+)*$/) );
```

那么这个正则表达式有什么问题？

首先，有人可能注意到这个正则表达式有一点奇怪。量词 `*` 看起来是多余的。如果我们需要一个数字，我们可以使用 `\d+$`。

<<<<<<< HEAD:5-regular-expressions/15-regexp-infinite-backtracking-problem/article.md
实际上，正则表达式是人写的。但它缓慢的原因与我们上面看到的相同。所以让我们理解它，然后回到现实生活中的例子。
=======
Indeed, the regexp is artificial. But the reason why it is slow is the same as those we saw above. So let's understand it, and then the previous example will become obvious.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/15-regexp-infinite-backtracking-problem/article.md

在线路 `123456789z` 中搜索 `(\d+)*$` 期间发生了什么？

1. 首先，regexp 引擎试图找到一个数字 `\d+`。默认情况下，加号 `+` 是贪婪的，所以它消耗所有数字：

    ```
    \d+.......
    (123456789)z
    ```
<<<<<<< HEAD:5-regular-expressions/15-regexp-infinite-backtracking-problem/article.md
2. 然后它试图在括号周围应用星号 `(\d+)*`，但没有更多的数字，所以星号没有给出任何东西。

    然后该模式具有字符串结束锚 `$`，并且在文本中我们有 `z`。
=======
2. Then it tries to apply the star quantifier, but there are no more digits, so it the star doesn't give anything.

3. Then the pattern expects to see the string end `pattern:$`, and in the text we have `subject:z`, so there's no match:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/15-regexp-infinite-backtracking-problem/article.md

    ```
               X
    \d+........$
    (123456789)z
    ```

<<<<<<< HEAD:5-regular-expressions/15-regexp-infinite-backtracking-problem/article.md
    没有匹配！
3. 没有匹配，所以贪婪的量词 `+` 会减少重复次数（回溯）。

    现在 `\d+` 就不是所有数字了，而是除最后一个之外的所有数字：
=======
4. As there's no match, the greedy quantifier `pattern:+` decreases the count of repetitions (backtracks).

    Now `\d+` doesn't take all digits, but all except the last one:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/15-regexp-infinite-backtracking-problem/article.md
    ```
    \d+.......
    (12345678)9z
    ```
<<<<<<< HEAD:5-regular-expressions/15-regexp-infinite-backtracking-problem/article.md
4. 现在引擎尝试从新位置（`9`）继续搜索。

    起始的 `(\d+)*` 可以被应用上 —— 它给出了数字 `9`：
=======
5. Now the engine tries to continue the search from the new position (`9`).

    The star `pattern:(\d+)*` can be applied -- it gives the number `match:9`:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/15-regexp-infinite-backtracking-problem/article.md

    ```

    \d+.......\d+
    (12345678)(9)z
    ```

    引擎再次尝试匹配 `$`，但失败了，因为遇到 `z`：

    ```
                 X
    \d+.......\d+
    (12345678)(9)z
    ```

<<<<<<< HEAD:5-regular-expressions/15-regexp-infinite-backtracking-problem/article.md
    没有匹配，因此引擎将继续回溯。
5. 现在第一个数字 `\d+` 将会有 7 位数，字符串的其余部分 `89` 是第二个数字 `\d+`：
=======

5. There's no match, so the engine will continue backtracking, decreasing the number of repetitions for `pattern:\d+` down to 7 digits. So the rest of the string `subject:89` becomes the second `pattern:\d+`:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/15-regexp-infinite-backtracking-problem/article.md

    ```
                 X
    \d+......\d+
    (1234567)(89)z
    ```

    ...仍然无法匹配 `$`。

    搜索引擎会再次回溯。回溯通常是这样工作的：只要可以最后一个贪心量词会减少重复次数。然后先前的贪心量词减少，依此类推。在我们的例子中，最后一个贪心量词是第二个 `\d+`，从 `89` 变为 `8`，星号匹配到 `9`：
	
    ```
                   X
    \d+......\d+\d+
    (1234567)(8)(9)z
    ```
6. ...再次失败。第二个和第三个 `\d+` 回溯到最后，所以第一个量词缩短为匹配 `123456`，然后星号匹配剩余部分：

    ```
                 X
    \d+.......\d+
    (123456)(789)z
    ```

    再次失败。重复该过程：最后一个贪心量词释放一个字符（`9`）：

    ```
                   X
    \d+.....\d+ \d+
    (123456)(78)(9)z
    ```
7. ...然后继续。

正则表达式引擎遍历了 `123456789` 子序列的所有组合。它们是有很多的，这就是为什么它会花费这么长时间。

<<<<<<< HEAD:5-regular-expressions/15-regexp-infinite-backtracking-problem/article.md
一个聪明的家伙可能在这里会说：“回溯？让我们打开懒惰模式 —— 不再有回溯！”。

让我们用 `\d+?` 代替 `\d+`，看它是否生效（小心，会引起浏览器挂起）
=======
What to do?

Should we turn on the lazy mode?

Unfortunately, it doesn't: if we replace `pattern:\d+` with `pattern:\d+?`, that still hangs:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/15-regexp-infinite-backtracking-problem/article.md

```js run
// 非非非常慢
alert( '12345678901234567890123456789123456789z'.match(/(\d+?)*$/) );
```

<<<<<<< HEAD:5-regular-expressions/15-regexp-infinite-backtracking-problem/article.md
不，它没有（生效）。

惰性量词实际上是一样的，只是顺序相反。试想一下搜索引擎在这种情况下会怎么工作。
=======
Lazy quantifiers actually do the same, but in the reverse order.

Just think about how the search engine would work in this case.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/15-regexp-infinite-backtracking-problem/article.md

有些正则表达式引擎具有复杂的内置检查来检测无限回溯或其他方法来解决它们，但是没有通用的解决方案。

<<<<<<< HEAD:5-regular-expressions/15-regexp-infinite-backtracking-problem/article.md
在上面的例子中，当我们在字符串 `<a=b  a=b  a=b  a=b` 中查找 `<(\s*\w+=\w+\s*)*>` 时 —— 类似的情况发生了。

字符串最后没有包含 `>`，所以匹配是不可能的，但正则表达式引擎不知道这些。搜索回溯尝试 `(\s*\w+=\w+\s*)` 的不同组合：
=======
## Back to tags

In the example above, when we search `pattern:<(\s*\w+=\w+\s*)*>` in the string `subject:<a=b  a=b  a=b  a=b` -- the similar thing happens.

The string has no `>` at the end, so the match is impossible, but the regexp engine doesn't know about it. The search backtracks trying different combinations of `pattern:(\s*\w+=\w+\s*)`:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/15-regexp-infinite-backtracking-problem/article.md

```
(a=b a=b a=b) (a=b)
(a=b a=b) (a=b a=b)
(a=b) (a=b a=b a=b)
...
```

## 如何修复？

<<<<<<< HEAD:5-regular-expressions/15-regexp-infinite-backtracking-problem/article.md
问题 —— 即便我们不需要它们，回溯也有很多变种。

例如，在模式 `(\d+)*$` 中，我们（人类）可以轻易的看到 `(\d+)` 不需要回溯。

减少 `\d+` 的计数对匹配没有帮助，这两者没有区别：
=======
The backtracking checks many variants that are an obvious fail for a human.

For instance, in the pattern `pattern:(\d+)*$` a human can easily see that `pattern:(\d+)*` does not need to backtrack `pattern:+`. There's no difference between one or two `\d+`:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/15-regexp-infinite-backtracking-problem/article.md

```
\d+........
(123456789)z

\d+...\d+....
(1234)(56789)z
```

<<<<<<< HEAD:5-regular-expressions/15-regexp-infinite-backtracking-problem/article.md
让我们回到更现实生活中的例子：`<(\s*\w+=\w+\s*)*>`。我们想要查找键值对 `name=value`（尽可能多）。这里没有必要回溯。

换而言之，如果它找到很多 `name=value` 对然后找不到 `>`，那就没有必要减少重复次数。即使我们少匹配一对，它也不会给我们闭合的 `>`：
=======
Let's get back to more real-life example: `pattern:<(\s*\w+=\w+\s*)*>`. We want it to find pairs `name=value` (as many as it can).

What we would like to do is to forbid backtracking.

There's totally no need to decrease the number of repetitions.

In other words, if it found three `name=value` pairs and then can't find `>` after them, then there's no need to decrease the count of repetitions. There are definitely no `>` after those two (we backtracked one `name=value` pair, it's there):

```
(name=value) name=value
```
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/15-regexp-infinite-backtracking-problem/article.md

现代的正则表达式引擎支持所谓的“占有”量词。它们就像贪婪，但根本不回溯。很简单的，它们抓取尽可能多的东西，然后继续搜索。还有另一种叫做“原子组”的工具用来禁止括号内部的回溯。

不幸的是，JavaScript 对这两项功能都不支持。

<<<<<<< HEAD:5-regular-expressions/15-regexp-infinite-backtracking-problem/article.md
虽然我们可以使用前瞻来获得类似的效果。在文章[正则表达式: 使用前瞻模拟原子分组（和占有量词）](http://instanceof.me/post/52245507631/regex-emulate-atomic-grouping-with-lookahead)和[模拟原子组](http://blog.stevenlevithan.com/archives/mimic-atomic-groups)中更多关于占有量词和前瞻之间的关系。
=======
### Lookahead to the rescue

We can forbid backtracking using lookahead.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/15-regexp-infinite-backtracking-problem/article.md

在没有回溯的前提下尽可能多重复使用的模式是：`(?=(a+))\1`。

<<<<<<< HEAD:5-regular-expressions/15-regexp-infinite-backtracking-problem/article.md
换句话说，前瞻 `?=` 从当前位置查找最大 `a+` 的计数。然后他们被 `\1` 反向引用“消耗在结果中”。
=======
In other words:
- The lookahead `pattern:?=` looks for the maximal count `pattern:a+` from the current position.
- And then they are "consumed into the result" by the backreference `pattern:\1` (`pattern:\1` corresponds to the content of the second parentheses, that is `pattern:a+`).
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/15-regexp-infinite-backtracking-problem/article.md

这里没有回溯，因为前瞻不会回溯。如果它检索了 5 次 `a+` 并且进一步匹配失败，那么它不会回到 4。

<<<<<<< HEAD:5-regular-expressions/15-regexp-infinite-backtracking-problem/article.md
让我们修复本章开头的带有属性标签的正则表达式 `<\w+(\s*\w+=(\w+|"[^"]*")\s*)*>`。我们将使用前瞻来防止 `name=value` 对的回溯：
=======
```smart
There's more about the relation between possessive quantifiers and lookahead in articles [Regex: Emulate Atomic Grouping (and Possessive Quantifiers) with LookAhead](http://instanceof.me/post/52245507631/regex-emulate-atomic-grouping-with-lookahead) and [Mimicking Atomic Groups](http://blog.stevenlevithan.com/archives/mimic-atomic-groups).
```

So this trick makes the problem disappear.

Let's fix the regexp for a tag with attributes from the beginning of the chapter`pattern:<\w+(\s*\w+=(\w+|"[^"]*")\s*)*>`. We'll use lookahead to prevent backtracking of `name=value` pairs:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/15-regexp-infinite-backtracking-problem/article.md

```js run
// 搜索 name=value 的正则表达式
let attrReg = /(\s*\w+=(\w+|"[^"]*")\s*)/

<<<<<<< HEAD:5-regular-expressions/15-regexp-infinite-backtracking-problem/article.md
// 在标签正则表达式中使用
let reg = new RegExp('<\\w+(?=(' + attrReg.source + '*))\\1>', 'g');
=======
// use new RegExp to nicely insert its source into (?=(a+))\1
let fixedReg = new RegExp(`<\\w+(?=(${attrReg.source}*))\\1>`, 'g');
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/15-regexp-infinite-backtracking-problem/article.md

let goodInput = '...<a test="<>" href="#">... <b>...';

let badInput = `<tag a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b
  a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b`;

alert( goodInput.match(fixedReg) ); // <a test="<>" href="#">, <b>
alert( badInput.match(fixedReg) ); // null (no results, fast!)
```

<<<<<<< HEAD:5-regular-expressions/15-regexp-infinite-backtracking-problem/article.md
很好，它起作用了。我们找到一个长标签 `<a test="<>" href="#">` 和一个小标签 `<b>`，并且没有挂起引擎。
=======
Great, it works! We found both a long tag  `match:<a test="<>" href="#">` and a small one `match:<b>`, and (!) didn't hang the engine on the bad input.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/15-regexp-infinite-backtracking-problem/article.md

请留意 `attrReg.source` 属性。`RegExp` 对象提供对其源字符串的访问。当我们想要将一个正则表达式插入另一个正则表达式时，这很方便。
