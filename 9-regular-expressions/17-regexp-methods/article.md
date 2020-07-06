<<<<<<< HEAD
# 正则表达式（RegExp）和字符串（String）的方法

在本文中，我们将深入探讨与正则表达式配合使用的各种方法。

## str.match(regexp)

`str.match(regexp)` 方法在字符串 `str` 中找到匹配 `regexp` 的字符。

它有 3 种模式：

1. 如果 `regexp` 不带有 `pattern:g` 标记，则它以数组的形式返回第一个匹配项，其中包含分组和属性 `index`（匹配项的位置）、`input`（输入字符串，等于 `str `）：
=======
# Methods of RegExp and String

In this article we'll cover various methods that work with regexps in-depth.

## str.match(regexp)

The method `str.match(regexp)` finds matches for `regexp` in the string `str`.

It has 3 modes:

1. If the `regexp` doesn't have flag `pattern:g`, then it returns the first match as an array with capturing groups and properties `index` (position of the match), `input` (input string, equals `str`):
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

    ```js run
    let str = "I love JavaScript";

    let result = str.match(/Java(Script)/);

<<<<<<< HEAD
    alert( result[0] );     // JavaScript（完全匹配）
    alert( result[1] );     // Script（第一个分组）
    alert( result.length ); // 2

    // 其他信息：
    alert( result.index );  // 7（匹配位置）
    alert( result.input );  // I love JavaScript（源字符串）
    ```

2. 如果 `regexp` 带有 `pattern:g` 标记，则它将所有匹配项的数组作为字符串返回，而不包含分组和其他详细信息。
=======
    alert( result[0] );     // JavaScript (full match)
    alert( result[1] );     // Script (first capturing group)
    alert( result.length ); // 2

    // Additional information:
    alert( result.index );  // 0 (match position)
    alert( result.input );  // I love JavaScript (source string)
    ```

2. If the `regexp` has flag `pattern:g`, then it returns an array of all matches as strings, without capturing groups and other details.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
    ```js run
    let str = "I love JavaScript";

    let result = str.match(/Java(Script)/g);

    alert( result[0] ); // JavaScript
    alert( result.length ); // 1
    ```

<<<<<<< HEAD
3. 如果没有匹配项，则无论是否带有标记 `pattern:g` ，都将返回 `null`。

    这是一个重要的细微差别。如果没有匹配项，我们得到的不是一个空数组，而是 `null`。忘记这一点很容易出错，例如：
=======
3. If there are no matches, no matter if there's flag `pattern:g` or not, `null` is returned.

    That's an important nuance. If there are no matches, we don't get an empty array, but `null`. It's easy to make a mistake forgetting about it, e.g.:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

    ```js run
    let str = "I love JavaScript";

    let result = str.match(/HTML/);

    alert(result); // null
    alert(result.length); // Error: Cannot read property 'length' of null
    ```

<<<<<<< HEAD
    如果我们希望结果是一个数组，我们可以这样写：
=======
    If we want the result to be an array, we can write like this:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

    ```js
    let result = str.match(regexp) || [];
    ```

## str.matchAll(regexp)

[recent browser="new"]

<<<<<<< HEAD
方法 `str.matchAll(regexp)` 是 `str.match` “新改进的”变体。

它主要用来搜索所有组的所有匹配项。

与 `match` 相比有 3 个区别：

1. 它返回包含匹配项的可迭代对象，而不是数组。我们可以用 `Array.from` 从中得到一个常规数组。
2. 每个匹配项均以包含分组的数组形式返回（返回格式与不带 `pattern:g` 标记的 `str.match` 相同）。
3. 如果没有结果，则返回的不是 `null`，而是一个空的可迭代对象。

用法示例：
=======
The method `str.matchAll(regexp)` is a "newer, improved" variant of `str.match`.

It's used mainly to search for all matches with all groups.

There are 3 differences from `match`:

1. It returns an iterable object with matches instead of an array. We can make a regular array from it using `Array.from`.
2. Every match is returned as an array with capturing groups (the same format as `str.match` without flag `pattern:g`).
3. If there are no results, it returns not `null`, but an empty iterable object.

Usage example:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
let str = '<h1>Hello, world!</h1>';
let regexp = /<(.*?)>/g;

let matchAll = str.matchAll(regexp);

<<<<<<< HEAD
alert(matchAll); // [object RegExp String Iterator]，不是数组，而是一个可迭代对象

matchAll = Array.from(matchAll); // 现在返回的是数组
=======
alert(matchAll); // [object RegExp String Iterator], not array, but an iterable

matchAll = Array.from(matchAll); // array now
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

let firstMatch = matchAll[0];
alert( firstMatch[0] );  // <h1>
alert( firstMatch[1] );  // h1
alert( firstMatch.index );  // 0
alert( firstMatch.input );  // <h1>Hello, world!</h1>
```

<<<<<<< HEAD
如果我们用 `for..of` 来循环 `matchAll` 的匹配项，那么我们就不需要 `Array.from` 了，разумеется，ненужен。

## str.split(regexp|substr, limit)

使用正则表达式（或子字符串）作为分隔符来分割字符串。

我们可以用 `split` 来分割字符串，如下所示：

```js run
alert('12-34-56'.split('-')) // 数组 ['12', '34', '56']
```

但同样，我们也可以用正则表达式来做：

```js run
alert('12, 34, 56'.split(/,\s*/)) // 数组 ['12', '34', '56']
=======
If we use `for..of` to loop over `matchAll` matches, then we don't need `Array.from` any more.

## str.split(regexp|substr, limit)

Splits the string using the regexp (or a substring) as a delimiter.

We can use `split` with strings, like this:

```js run
alert('12-34-56'.split('-')) // array of [12, 34, 56]
```

But we can split by a regular expression, the same way:

```js run
alert('12, 34, 56'.split(/,\s*/)) // array of [12, 34, 56]
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
```

## str.search(regexp)

<<<<<<< HEAD
方法 `str.search(regexp)` 返回第一个匹配项的位置，如果未找到，则返回 `-1`：
=======
The method `str.search(regexp)` returns the position of the first match or `-1` if none found:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
let str = "A drop of ink may make a million think";

<<<<<<< HEAD
alert( str.search( /ink/i ) ); // 10（第一个匹配位置）
```

**重要限制：`search` 仅查找第一个匹配项。**

如果需要其他匹配项的位置，则应使用其他方法，例如用 `str.matchAll(regexp)` 查找所有位置。

## str.replace(str|regexp, str|func)

这是用于搜索和替换的通用方法，是最有用的方法之一。它是搜索和替换字符串的瑞士军刀。  

我们可以不用正则表达式来搜索和替换子字符串：

```js run
// 用冒号替换连字符
alert('12-34-56'.replace("-", ":")) // 12:34-56
```

不过有一个陷阱。

**当 `replace` 的第一个参数是字符串时，它仅替换第一个匹配项。**

您可以在上面的示例中看到：只有第一个 `"-"` 被 `":"` 替换了。

如要找到所有的连字符，我们不应该用字符串 `"-"`，而应使用带 `pattern:g` 标记的正则表达式 `pattern:/-/g`：

```js run
// 将连字符替换为冒号
alert( '12-34-56'.replace( *!*/-/g*/!*, ":" ) )  // 12:34:56
```

第二个参数是一个替代字符串。我们可以在其中使用特殊字符：

| 符号 | 替换字符串中的操作 |
|--------|--------|
|`$&`|插入整个匹配项|
|<code>$&#096;</code>|在匹配项之前插入字符串的一部分|
|`$'`|在匹配项之后插入字符串的一部分|
|`$n`|如果 `n` 是一个 1 到 2 位的数字，则插入第 n 个分组的内容，详见 [info:regexp-groups](info:regexp-groups)|
|`$<name>`|插入带有给定 `name` 的括号内的内容，详见 [info:regexp-groups](info:regexp-groups)|
|`$$`|插入字符 `$` |

例如：
=======
alert( str.search( /ink/i ) ); // 10 (first match position)
```

**The important limitation: `search` only finds the first match.**

If we need positions of further matches, we should use other means, such as finding them all with `str.matchAll(regexp)`.

## str.replace(str|regexp, str|func)

This is a generic method for searching and replacing, one of most useful ones. The swiss army knife for searching and replacing.  

We can use it without regexps, to search and replace a substring:

```js run
// replace a dash by a colon
alert('12-34-56'.replace("-", ":")) // 12:34-56
```

There's a pitfall though.

**When the first argument of `replace` is a string, it only replaces the first match.**

You can see that in the example above: only the first `"-"` is replaced by `":"`.

To find all hyphens, we need to use not the string `"-"`, but a regexp `pattern:/-/g`, with the obligatory `pattern:g` flag:

```js run
// replace all dashes by a colon
alert( '12-34-56'.replace( *!*/-/g*/!*, ":" ) )  // 12:34:56
```

The second argument is a replacement string. We can use special character in it:

| Symbols | Action in the replacement string |
|--------|--------|
|`$&`|inserts the whole match|
|<code>$&#096;</code>|inserts a part of the string before the match|
|`$'`|inserts a part of the string after the match|
|`$n`|if `n` is a 1-2 digit number, inserts the contents of n-th capturing group, for details see [](info:regexp-groups)|
|`$<name>`|inserts the contents of the parentheses with the given `name`, for details see [](info:regexp-groups)|
|`$$`|inserts character `$` |

For instance:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
let str = "John Smith";

<<<<<<< HEAD
// 交换名字和姓氏
alert(str.replace(/(john) (smith)/i, '$2, $1')) // Smith, John
```

**对于需要“智能”替换的场景，第二个参数可以是一个函数。**

每次匹配都会调用这个函数，并且返回的值将作为替换字符串插入。

该函数 `func(match, p1, p2, ..., pn, offset, input, groups)` 带参数调用：

1. `match` － 匹配项，
2. `p1, p2, ..., pn` － 分组的内容（如有），
3. `offset` － 匹配项的位置，
4. `input` － 源字符串，
5. `groups` － 所指定分组的对象。

如果正则表达式中没有括号，则只有 3 个参数：`func(str, offset, input)`。

例如，将所有匹配项都大写：
=======
// swap first and last name
alert(str.replace(/(john) (smith)/i, '$2, $1')) // Smith, John
```

**For situations that require "smart" replacements, the second argument can be a function.**

It will be called for each match, and the returned value will be inserted as a replacement.

The function is called with arguments `func(match, p1, p2, ..., pn, offset, input, groups)`:

1. `match` -- the match,
2. `p1, p2, ..., pn` -- contents of capturing groups (if there are any),
3. `offset` -- position of the match,
4. `input` -- the source string,
5. `groups` -- an object with named groups.

If there are no parentheses in the regexp, then there are only 3 arguments: `func(str, offset, input)`.

For example, let's uppercase all matches:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
let str = "html and css";

let result = str.replace(/html|css/gi, str => str.toUpperCase());

alert(result); // HTML and CSS
```

<<<<<<< HEAD
按其在字符串中的位置来替换每个匹配项：
=======
Replace each match by its position in the string:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
alert("Ho-Ho-ho".replace(/ho/gi, (match, offset) => offset)); // 0-3-6
```

<<<<<<< HEAD
在下面的示例中，有两对括号，因此将使用 5 个参数调用替换函数：第一个是完全匹配项，然后是 2 对括号，然后是匹配位置（在示例中未使用）和源字符串：
=======
In the example below there are two parentheses, so the replacement function is called with 5 arguments: the first is the full match, then 2 parentheses, and after it (not used in the example) the match position and the source string:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
let str = "John Smith";

let result = str.replace(/(\w+) (\w+)/, (match, name, surname) => `${surname}, ${name}`);

alert(result); // Smith, John
```

<<<<<<< HEAD
如果有许多组，用 rest 参数（...）可以很方便的访问：


Если в регулярном выражении много скобочных групп, то бывает удобно использовать остаточные аргументы для обращения к ним:
=======
If there are many groups, it's convenient to use rest parameters to access them:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
let str = "John Smith";

let result = str.replace(/(\w+) (\w+)/, (...match) => `${match[2]}, ${match[1]}`);

alert(result); // Smith, John
```

<<<<<<< HEAD
或者，如果我们使用的是命名组，则带有它们的 `groups` 对象始终是最后一个对象，因此我们可以这样获得它：
=======
Or, if we're using named groups, then `groups` object with them is always the last, so we can obtain it like this:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
let str = "John Smith";

let result = str.replace(/(?<name>\w+) (?<surname>\w+)/, (...match) => {
  let groups = match.pop();

  return `${groups.surname}, ${groups.name}`;
});

alert(result); // Smith, John
```

<<<<<<< HEAD
使用函数可以为我们提供终极替代功能，因为它可以获取匹配项的所有信息，可以访问外部变量，可以做任何事。

## regexp.exec(str)

`regexp.exec(str)` 方法返回字符串 `str` 中的 `regexp` 匹配项。与以前的方法不同，它是在正则表达式而不是字符串上调用的。

根据正则表达式是否带有标志 `pattern:g`，它的行为有所不同。

如果没有 `pattern:g`，那么 `regexp.exec(str)` 返回的第一个匹配与 `str.match(regexp)` 完全相同。这没什么新的变化。

但是，如果有标记 `pattern:g`，那么：
- 调用 `regexp.exec(str)` 会返回第一个匹配项，并将紧随其后的位置保存在属性 `regexp.lastIndex` 中。
-下一次同样的调用会从位置 `regexp.lastIndex` 开始搜索，返回下一个匹配项，并将其后的位置保存在 `regexp.lastIndex` 中。
- ...以此类推。
-如果没有匹配项，则 `regexp.exec` 返回 `null`，并将 `regexp.lastIndex` 重置为 `0`。

因此，重复调用会挨个返回所有的匹配项，属性 `regexp.lastIndex` 用来跟踪当前的搜索位置。

过去，在将 `str.matchAll` 方法添加到 `JavaScript` 之前，在循环中是通过调用 `regexp.exec` 来获取分组的所有匹配项：
=======
Using a function gives us the ultimate replacement power, because it gets all the information about the match, has access to outer variables and can do everything.

## regexp.exec(str)

The method `regexp.exec(str)` method returns a match for `regexp` in the string `str`.  Unlike previous methods, it's called on a regexp, not on a string.

It behaves differently depending on whether the regexp has flag `pattern:g`.

If there's no `pattern:g`, then `regexp.exec(str)` returns the first match exactly as  `str.match(regexp)`. This behavior doesn't bring anything new.

But if there's flag `pattern:g`, then:
- A call to `regexp.exec(str)` returns the first match and saves the position immediately after it in the property `regexp.lastIndex`.
- The next such call starts the search from position `regexp.lastIndex`, returns the next match and saves the position after it in `regexp.lastIndex`.
- ...And so on.
- If there are no matches, `regexp.exec` returns `null` and resets `regexp.lastIndex` to `0`.

So, repeated calls return all matches one after another, using property `regexp.lastIndex` to keep track of the current search position.

In the past, before the method `str.matchAll` was added to JavaScript, calls of `regexp.exec` were used in the loop to get all matches with groups:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
let str = 'More about JavaScript at https://javascript.info';
let regexp = /javascript/ig;

let result;

while (result = regexp.exec(str)) {
  alert( `Found ${result[0]} at position ${result.index}` );
<<<<<<< HEAD
  // Found JavaScript at position 11，然后
=======
  // Found JavaScript at position 11, then
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
  // Found javascript at position 33
}
```

<<<<<<< HEAD
这个现在也可以使用，尽管对于较新的浏览器来说，`str.matchAll` 通常更方便。

**我们可以通过手动设置 `lastIndex`，用 `regexp.exec` 从给定位置进行搜索。**

例如：
=======
This works now as well, although for newer browsers `str.matchAll` is usually more convenient.

**We can use `regexp.exec` to search from a given position by manually setting `lastIndex`.**

For instance:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
let str = 'Hello, world!';

<<<<<<< HEAD
let regexp = /\w+/g; // 带有标记 "g"，lastIndex 属性被忽略
regexp.lastIndex = 5; // 从第 5 个位置搜索（从逗号开始）
=======
let regexp = /\w+/g; // without flag "g", lastIndex property is ignored
regexp.lastIndex = 5; // search from 5th position (from the comma)
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

alert( regexp.exec(str) ); // world
```

<<<<<<< HEAD
如果正则表达式带有标记 `pattern:y`，则搜索将精确地在 `regexp.lastIndex` 位置执行，不会再继续了。

让我们将上例中的 `pattern:g` 标记替换为 `pattern:y`。现在没有找到匹配项了，因为在位置 `5` 处没有单词：
=======
If the regexp has flag `pattern:y`, then the search will be performed exactly at the  position `regexp.lastIndex`, not any further.

Let's replace flag `pattern:g` with `pattern:y` in the example above. There will be no matches, as there's no word at position `5`:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
let str = 'Hello, world!';

let regexp = /\w+/y;
<<<<<<< HEAD
regexp.lastIndex = 5; // 在位置 5 精确查找
=======
regexp.lastIndex = 5; // search exactly at position 5
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

alert( regexp.exec(str) ); // null
```

<<<<<<< HEAD
这个方法在某些场景下很方便，例如需要用正则表达式从字符串的精确位置来“读取”字符串（而不是其后的某处）。

## regexp.test(str)

方法 `regexp.test(str)` 查找匹配项，然后返回 `true/false` 表示是否存在。

例如：
=======
That's convenient for situations when we need to "read" something from the string by a regexp at the exact position, not somewhere further.

## regexp.test(str)

The method `regexp.test(str)` looks for a match and returns `true/false` whether it exists.

For instance:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
let str = "I love JavaScript";

<<<<<<< HEAD
// 这两个测试相同
=======
// these two tests do the same
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
alert( *!*/love/i*/!*.test(str) ); // true
alert( str.search(*!*/love/i*/!*) != -1 ); // true
```

<<<<<<< HEAD
一个反例：
=======
An example with the negative answer:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
let str = "Bla-bla-bla";

alert( *!*/love/i*/!*.test(str) ); // false
alert( str.search(*!*/love/i*/!*) != -1 ); // false
```

<<<<<<< HEAD
如果正则表达式带有标记 `pattern:g`，则 `regexp.test` 从  `regexp.lastIndex` 属性中查找，并更新此属性，就像 `regexp.exec` 一样。

因此，我们可以用它从给定位置进行搜索：
=======
If the regexp has flag `pattern:g`, then `regexp.test` looks from `regexp.lastIndex` property and updates this property, just like `regexp.exec`.

So we can use it to search from a given position:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
let regexp = /love/gi;

let str = "I love JavaScript";

<<<<<<< HEAD
// 从位置 10 开始：
regexp.lastIndex = 10;
alert( regexp.test(str) ); // false（无匹配）
```

````warn header="相同的全局正则表达式在不同的源字符串上测试可能会失败"
如果我们在不同的源字符串上应用相同的全局表达式，可能会出现错误的结果，因为 `regexp.test` 的调用会增加 `regexp.lastIndex` 属性值，因此在另一个字符串中的搜索可能是从非 0 位置开始的。

例如，这里我们在同一文本上调用 `regexp.test` 两次，而第二次调用失败了：

```js run
let regexp = /javascript/g;  // （新建 regexp：regexp.lastIndex=0)

alert( regexp.test("javascript") ); // true（现在 regexp.lastIndex=10）
alert( regexp.test("javascript") ); // false
```

这正是因为在第二个测试中 `regexp.lastIndex` 不为零。

如要解决这个问题，我们可以在每次搜索之前设置 `regexp.lastIndex = 0`。或者，不调用正则表达式的方法，而是使用字符串方法 `str.match/search/...`，这些方法不用 `lastIndex`。
=======
// start the search from position 10:
regexp.lastIndex = 10;
alert( regexp.test(str) ); // false (no match)
```

````warn header="Same global regexp tested repeatedly on different sources may fail"
If we apply the same global regexp to different inputs, it may lead to wrong result, because `regexp.test` call advances `regexp.lastIndex` property, so the search in another string may start from non-zero position.

For instance, here we call `regexp.test` twice on the same text, and the second time fails:

```js run
let regexp = /javascript/g;  // (regexp just created: regexp.lastIndex=0)

alert( regexp.test("javascript") ); // true (regexp.lastIndex=10 now)
alert( regexp.test("javascript") ); // false
```

That's exactly because `regexp.lastIndex` is non-zero in the second test.

To work around that, we can set `regexp.lastIndex = 0` before each search. Or instead of calling methods on regexp, use string methods `str.match/search/...`, they don't use `lastIndex`.
````
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
