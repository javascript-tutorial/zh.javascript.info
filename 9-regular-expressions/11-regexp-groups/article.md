# 捕获组

模式的一部分可以用括号括起来 `pattern:(...)`。这称为“捕获组（capturing group）”。

这有两个影响：

1. 它允许将匹配的一部分作为结果数组中的单独项。
2. 如果我们将量词放在括号后，则它将括号视为一个整体。

## 示例

让我们看看在示例中的括号是如何工作的。

### 示例：gogogo

不带括号，模式 `pattern:go+` 表示 `subject:g` 字符，其后 `subject:o` 重复一次或多次。例如 `match:goooo` 或 `match:gooooooooo`。

括号将字符组合，所以 `pattern:(go)+` 匹配 `match:go`，`match:gogo`，`match:gogogo`等。

```js run
alert( 'Gogogo now!'.match(/(go)+/i) ); // "Gogogo"
```

### 示例：域名

让我们做些更复杂的事 —— 搜索域名的正则表达式。

例如：

```
mail.com
users.mail.com
smith.users.mail.com
```

正如我们所看到的，一个域名由重复的单词组成，每个单词后面有一个点，除了最后一个单词。

在正则表达式中是 `pattern:(\w+\.)+\w+`：

```js run
let regexp = /(\w+\.)+\w+/g;

alert( "site.com my.site.com".match(regexp) ); // site.com,my.site.com
```

搜索有效，但是该模式无法匹配带有连字符的域名，例如 my-site.com，因为连字符不属于 `pattern:\w` 类。

我们可以通过用 `pattern:[\w-]` 替换 `pattern:\w` 来匹配除最后一个的每个单词：`pattern:([\w-]+\.)+\w+`。

### 示例：email

前面的示例可以扩展。我们可以基于它为电子邮件创建一个正则表达式。

email 格式为：`name@domain`。名称可以是任何单词，可以使用连字符和点。在正则表达式中为 `pattern:[-.\w]+`。

模式：

```js run
let regexp = /[-.\w]+@([\w-]+\.)+[\w-]+/g;

alert("my@mail.com @ his@site.com.uk".match(regexp)); // my@mail.com, his@site.com.uk
```

该正则表达式并不完美的，但多数情况下都可以工作，并且有助于修复意外的错误类型。唯一真正可靠的 email 检查只能通过发送 email 来完成。

## 匹配括号中的内容

括号从左到右编号。正则引擎会记住它们各自匹配的内容，并允许在结果中获得它。

方法 `str.match(regexp)`，如果 `regexp` 没有 `g` 标志，将查找第一个匹配并将它作为一个数组返回：

1. 在索引 `0` 处：完全匹配。
2. 在索引 `1` 处：第一个括号的内容。
3. 在索引 `2` 处：第二个括号的内容。
4. …等等…

例如，我们想找到 HTML 标记 `pattern:<.*?>` 并进行处理。这将很方便的把标签内容（尖括号内的内容）放在单独的变量中。

让我们将内部内容包装在括号中，像这样：`pattern:<(.*?)>`。

现在，我们能在结果数组中获取标签的整体 `match:<h1>` 及其内容 `match:h1`：

```js run
let str = '<h1>Hello, world!</h1>';

let tag = str.match(/<(.*?)>/);

alert( tag[0] ); // <h1>
alert( tag[1] ); // h1
```

### 嵌套组

括号可以嵌套。在这种情况下，编号也从左到右。

例如，在搜索标签 `subject:<span class="my">` 时我们可能会对以下内容感兴趣：

1. 整个标签内容：`match:span class="my"`。
2. 标签名称：`match:span`。
3. 标签属性：`match:class="my"`。

让我们为它们添加括号：`pattern:<(([a-z]+)\s*([^>]*))>`。

这是它们的编号方式（从左到右，由左括号开始）：

![](regexp-nested-groups-pattern.svg)

实际上：

```js run
let str = '<span class="my">';

let regexp = /<(([a-z]+)\s*([^>]*))>/;

let result = str.match(regexp);
alert(result[0]); // <span class="my">
alert(result[1]); // span class="my"
alert(result[2]); // span
alert(result[3]); // class="my"
```

`result` 的零索引始终保持完全匹配。

然后按左括号将组从左到右编号。第一组返回为 `result[1]`。它包含了整个标签内容。

然后 `result[2]` 从第二个开始的括号中进入该组 `pattern:([a-z]+)` —— 标签名称，然后在 `result[3]` 标签中：`pattern:([^>]*)`。

字符串中每个组的内容：

![](regexp-nested-groups-matches.svg)

### 可选组

即使组是可选的并且在匹配项中不存在（例如，具有数量词 `pattern:(...)?`），也存在相应的 `result` 数组项，并且等于 `undefined`。

例如，让我们考虑正则 `pattern:a(z)?(c)?`。它寻找 `"a"` ，然后是可选的 `"z"`，然后是可选的 `"c"`。

如果我们在单个字母的字符串上运行 `subject:a`，则结果为：

```js run
let match = 'a'.match(/a(z)?(c)?/);

alert( match.length ); // 3
alert( match[0] ); // a（完全匹配）
alert( match[1] ); // undefined
alert( match[2] ); // undefined
```

数组的长度为 `3`，但所有组均为空。

这是字符串的一个更复杂的匹配 `subject:ac`：

```js run
let match = 'ac'.match(/a(z)?(c)?/)

alert( match.length ); // 3
alert( match[0] ); // ac（完全匹配）
alert( match[1] ); // undefined，因为 (z)? 没匹配项
alert( match[2] ); // c
```

数组长度是恒定的：`3`。但是对于组 `pattern:(z)?` 而言，什么都没有，所以结果是 `["ac", undefined, "c"]`。

## 搜索所有具有组的匹配项：matchAll

```warn header="`matchAll` 是一个新方法，可能需要使用 polyfill"
旧的浏览器不支持 `matchAll`。

可能需要一个 polyfill，例如 <https://github.com/ljharb/String.prototype.matchAll>.
```

当我们搜索所有匹配项（标志 `pattern:g`）时，`match` 方法不会返回组的内容。

例如，让我们查找字符串中的所有标签：

```js run
let str = '<h1> <h2>';

let tags = str.match(/<(.*?)>/g);

alert( tags ); // <h1>,<h2>
```

结果是一个匹配数组，但没有每个匹配项的详细信息。但是实际上，我们通常需要在结果中获取捕获组的内容。

要获取它们，我们应该使用方法 `str.matchAll(regexp)` 进行搜索。

在使用 `match` 很长一段时间后，它作为“新的改进版本”被加入到 JavaScript 中。

就像 `match` 一样，它寻找匹配项，但有 3 个区别：

1. 它返回的不是数组，而是一个可迭代的对象。
2. 当标志 `pattern:g` 存在时，它将每个匹配组作为一个数组返回。
3. 如果没有匹配项，则不返回 `null`，而是返回一个空的可迭代对象。

例如：

```js run
let results = '<h1> <h2>'.matchAll(/<(.*?)>/gi);

// results - is not an array, but an iterable object
alert(results); // [object RegExp String Iterator]

alert(results[0]); // undefined (*)

results = Array.from(results); // let's turn it into array

alert(results[0]); // <h1>,h1 (1st tag)
alert(results[1]); // <h2>,h2 (2nd tag)
```

我们可以看到，第一个区别非常重要，如 `(*)` 行所示。我们无法获得 `results[0]` 的匹配内容，因为该对象是伪数组。我们可以使用 `Array.from` 把它变成一个真正的 `Array`。在 Iterable（可迭代对象）<info:iterable>一文中有关于伪数组和可迭代对象的更多详细信息。

如果我们不需要遍历结果，则 `Array.from` 没有必要：

```js run
let results = '<h1> <h2>'.matchAll(/<(.*?)>/gi);

for(let result of results) {
  alert(result);
  // 第一个结果: <h1>,h1
  // 第二个结果: <h2>,h2
}
```

……或使用解构：

```js
let [tag1, tag2] = '<h1> <h2>'.matchAll(/<(.*?)>/gi);
```

由 `matchAll` 所返回的每个匹配，其格式与不带标志 `pattern:g` 的 `match` 所返回的格式相同：它是一个具有额外的 `index`（字符串中的匹配索引）属性和 `input`（源字符串）的数组：

```js run
let results = '<h1> <h2>'.matchAll(/<(.*?)>/gi);

let [tag1, tag2] = results;

alert( tag1[0] ); // <h1>
alert( tag1[1] ); // h1
alert( tag1.index ); // 0
alert( tag1.input ); // <h1> <h2>
```

```smart header="为什么 `matchAll` 的结果是可迭代对象而不是数组？"
为什么这个方法这样设计？原因很简单 — 为了优化。

调用 `matchAll` 不会执行搜索。相反，它返回一个可迭代的对象，最初没有结果。每当我们对它进行迭代时才会执行搜索，例如在循环中。

因此，这将根据需要找到尽可能多的结果，而不是全部。

例如，文本中可能有 100 个匹配项，但是在一个 `for..of` 循环中，我们已经找到了 5 个匹配项，然后觉得足够了并做出一个 `break`。这时引擎就不会花时间查找其他 95 个匹配。
```

## 命名组

用数字记录组很困难。对于简单模式，它是可行的，但对于更复杂的模式，计算括号很不方便。我们有一个更好的选择：给括号起个名字。

这是通过在开始括号之后立即放置 `pattern:?<name>` 来完成的。

例如，让我们查找 "year-month-day" 格式的日期：

```js run
*!*
let dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;
*/!*
let str = "2019-04-30";

let groups = str.match(dateRegexp).groups;

alert(groups.year); // 2019
alert(groups.month); // 04
alert(groups.day); // 30
```

如您所见，匹配的组在 `.groups` 属性中。

要查找所有日期，我们可以添加标志 `pattern:g`。

We'll also need `matchAll` to obtain full matches, together with groups:
我们还需要 `matchAll` 获取完整的组匹配：

```js run
let dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/g;

let str = "2019-10-30 2020-01-01";

let results = str.matchAll(dateRegexp);

for(let result of results) {
  let {year, month, day} = result.groups;

  alert(`${day}.${month}.${year}`);
  // 第一个 alert：30.10.2019
  // 第二个：01.01.2020
}
```

## 替换捕获组

方法 `str.replace(regexp, replacement)` 用 `replacement` 替换 `str` 中匹配 `regexp` 的所有捕获组。这使用 `pattern:$n` 来完成，其中 `pattern:n` 是组号。

例如，

```js run
let str = "John Bull";
let regexp = /(\w+) (\w+)/;

alert( str.replace(regexp, '$2, $1') ); // Bull, John
```

对于命名括号，引用为 `pattern:$<name>`。

例如，让我们将日期格式从 "year-month-day" 更改为 "day.month.year"：

```js run
let regexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/g;

let str = "2019-10-30, 2020-01-01";

alert( str.replace(regexp, '$<day>.$<month>.$<year>') );
// 30.10.2019, 01.01.2020
```

## 非捕获组 ?:

有时我们需要括号才能正确应用量词，但我们不希望它们的内容出现在结果中。

可以通过在开头添加 `pattern:?:` 来排除组。

例如，如果我们要查找 `pattern:(go)+`，但不希望括号内容（`go`）作为一个单独的数组项，则可以编写：`pattern:(?:go)+`。

在下面的示例中，我们仅将名称 `match:John` 作为匹配项的单独成员：

```js run
let str = "Gogogo John!";

*!*
// ?: 从捕获组中排除 'go'
let regexp = /(?:go)+ (\w+)/i;
*/!*

let result = str.match(regexp);

alert( result[0] ); // Gogogo John（完全匹配）
alert( result[1] ); // John
alert( result.length ); // 2（数组中没有更多项）
```

## 总结

括号将正则表达式的一部分组合在一起，以便量词可以整体应用。

括号组从左到右编号，可以选择用 `(?<name>...)` 命名。

可以在结果中获得按组匹配的内容：

* 方法 `str.match` 仅当不带标志 `pattern:g` 时返回捕获组。
* 方法 `str.matchAll` 始终返回捕获组。

如果括号没有名称，则匹配数组按编号提供其内容。命名括号还可使用属性 `groups`。

我们还可以使用 `str.replace` 来替换括号内容中的字符串：使用 `$n` 或者名称 `$<name>`。

可以通过在组的开头添加 `pattern:?:` 来排除编号组。当我们需要对整个组应用量词，但不希望将其作为结果数组中的单独项时这很有用。我们也不能在替换字符串时引用此类括号。
