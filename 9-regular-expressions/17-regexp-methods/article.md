# 正则表达式（RegExp）和字符串（String）的方法

在本文中，我们将深入探讨与正则表达式配合使用的各种方法。

## str.match(regexp)

`str.match(regexp)` 方法在字符串 `str` 中找到匹配 `regexp` 的字符。

它有 3 种模式：

1. 如果 `regexp` 不带有 `pattern:g` 标记，则它以数组的形式返回第一个匹配项，其中包含分组和属性 `index`（匹配项的位置）、`input`（输入字符串，等于 `str `）：

    ```js run
    let str = "I love JavaScript";

    let result = str.match(/Java(Script)/);

    alert( result[0] );     // JavaScript（完全匹配）
    alert( result[1] );     // Script（第一个分组）
    alert( result.length ); // 2

    // 其他信息：
    alert( result.index );  // 7（匹配位置）
    alert( result.input );  // I love JavaScript（源字符串）
    ```

2. 如果 `regexp` 带有 `pattern:g` 标记，则它将所有匹配项的数组作为字符串返回，而不包含分组和其他详细信息。
    ```js run
    let str = "I love JavaScript";

    let result = str.match(/Java(Script)/g);

    alert( result[0] ); // JavaScript
    alert( result.length ); // 1
    ```

3. 如果没有匹配项，则无论是否带有标记 `pattern:g` ，都将返回 `null`。

    这是一个重要的细微差别。如果没有匹配项，我们得到的不是一个空数组，而是 `null`。忘记这一点很容易出错，例如：

    ```js run
    let str = "I love JavaScript";

    let result = str.match(/HTML/);

    alert(result); // null
    alert(result.length); // Error: Cannot read property 'length' of null
    ```

    如果我们希望结果是一个数组，我们可以这样写：

    ```js
    let result = str.match(regexp) || [];
    ```

## str.matchAll(regexp)

[recent browser="new"]

方法 `str.matchAll(regexp)` 是 `str.match` “新改进的”变体。

它主要用来搜索所有组的所有匹配项。

与 `match` 相比有 3 个区别：

1. 它返回包含匹配项的可迭代对象，而不是数组。我们可以用 `Array.from` 从中得到一个常规数组。
2. 每个匹配项均以包含分组的数组形式返回（返回格式与不带 `pattern:g` 标记的 `str.match` 相同）。
3. 如果没有结果，则返回的不是 `null`，而是一个空的可迭代对象。

用法示例：

```js run
let str = '<h1>Hello, world!</h1>';
let regexp = /<(.*?)>/g;

let matchAll = str.matchAll(regexp);

alert(matchAll); // [object RegExp String Iterator]，不是数组，而是一个可迭代对象

matchAll = Array.from(matchAll); // 现在返回的是数组

let firstMatch = matchAll[0];
alert( firstMatch[0] );  // <h1>
alert( firstMatch[1] );  // h1
alert( firstMatch.index );  // 0
alert( firstMatch.input );  // <h1>Hello, world!</h1>
```

如果我们用 `for..of` 来循环 `matchAll` 的匹配项，那么我们就不需要 `Array.from` 了。

## str.split(regexp|substr, limit)

使用正则表达式（或子字符串）作为分隔符来分割字符串。

我们可以用 `split` 来分割字符串，如下所示：

```js run
alert('12-34-56'.split('-')) // 数组 ['12', '34', '56']
```

但同样，我们也可以用正则表达式来做：

```js run
alert('12, 34, 56'.split(/,\s*/)) // 数组 ['12', '34', '56']
```

## str.search(regexp)

方法 `str.search(regexp)` 返回第一个匹配项的位置，如果未找到，则返回 `-1`：

```js run
let str = "A drop of ink may make a million think";

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

```js run
let str = "John Smith";

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

```js run
let str = "html and css";

let result = str.replace(/html|css/gi, str => str.toUpperCase());

alert(result); // HTML and CSS
```

按其在字符串中的位置来替换每个匹配项：

```js run
alert("Ho-Ho-ho".replace(/ho/gi, (match, offset) => offset)); // 0-3-6
```

在下面的示例中，有两对括号，因此将使用 5 个参数调用替换函数：第一个是完全匹配项，然后是 2 对括号，然后是匹配位置（在示例中未使用）和源字符串：

```js run
let str = "John Smith";

let result = str.replace(/(\w+) (\w+)/, (match, name, surname) => `${surname}, ${name}`);

alert(result); // Smith, John
```

如果有许多组，用 rest 参数（...）可以很方便的访问：

```js run
let str = "John Smith";

let result = str.replace(/(\w+) (\w+)/, (...match) => `${match[2]}, ${match[1]}`);

alert(result); // Smith, John
```

或者，如果我们使用的是命名组，则带有它们的 `groups` 对象始终是最后一个对象，因此我们可以这样获得它：

```js run
let str = "John Smith";

let result = str.replace(/(?<name>\w+) (?<surname>\w+)/, (...match) => {
  let groups = match.pop();

  return `${groups.surname}, ${groups.name}`;
});

alert(result); // Smith, John
```

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

```js run
let str = 'More about JavaScript at https://javascript.info';
let regexp = /javascript/ig;

let result;

while (result = regexp.exec(str)) {
  alert( `Found ${result[0]} at position ${result.index}` );
  // Found JavaScript at position 11，然后
  // Found javascript at position 33
}
```

这个现在也可以使用，尽管对于较新的浏览器来说，`str.matchAll` 通常更方便。

**我们可以通过手动设置 `lastIndex`，用 `regexp.exec` 从给定位置进行搜索。**

例如：

```js run
let str = 'Hello, world!';

let regexp = /\w+/g; // 带有标记 "g"，lastIndex 属性被忽略
regexp.lastIndex = 5; // 从第 5 个位置搜索（从逗号开始）

alert( regexp.exec(str) ); // world
```

如果正则表达式带有标记 `pattern:y`，则搜索将精确地在 `regexp.lastIndex` 位置执行，不会再继续了。

让我们将上例中的 `pattern:g` 标记替换为 `pattern:y`。现在没有找到匹配项了，因为在位置 `5` 处没有单词：

```js run
let str = 'Hello, world!';

let regexp = /\w+/y;
regexp.lastIndex = 5; // 在位置 5 精确查找

alert( regexp.exec(str) ); // null
```

这个方法在某些场景下很方便，例如需要用正则表达式从字符串的精确位置来“读取”字符串（而不是其后的某处）。

## regexp.test(str)

方法 `regexp.test(str)` 查找匹配项，然后返回 `true/false` 表示是否存在。

例如：

```js run
let str = "I love JavaScript";

// 这两个测试相同
alert( *!*/love/i*/!*.test(str) ); // true
alert( str.search(*!*/love/i*/!*) != -1 ); // true
```

一个反例：

```js run
let str = "Bla-bla-bla";

alert( *!*/love/i*/!*.test(str) ); // false
alert( str.search(*!*/love/i*/!*) != -1 ); // false
```

如果正则表达式带有标记 `pattern:g`，则 `regexp.test` 从  `regexp.lastIndex` 属性中查找，并更新此属性，就像 `regexp.exec` 一样。

因此，我们可以用它从给定位置进行搜索：

```js run
let regexp = /love/gi;

let str = "I love JavaScript";

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
