# RegExp 和 String 的方法

有两组方法可以处理正则表达式。

1. 首先，正则表达式是内置的 [RegExp](mdn:js/RegExp) 类的对象，它提供了许多方法。
2. 除此之外，正则字符串中的一些方法可以与regexp一起工作。

为了避免结构混乱，我们首先会单独讨论一些方法，然后再讨论通用任务的使用方法。

## str.search(reg)

在上一章节中我们已经见过这个方法了。它返回第一个匹配项所在的位置，如果没有找到则返回 `-1`。

```js run
let str = "A drop of ink may make a million think";

alert( str.search( *!*/a/i*/!* ) ); // 0（最开始的位置）
```

**重要提示：`search` 总是查找第一个匹配项。**

我们不能使用 `search` 来查找下一个匹配项的位置，没有这样的语法。但是还有其它方法可以做到。

## 没有“g”修饰符情况下的 str.match(reg)

`str.match` 方法的行为取决于是否有 `g` 修饰符。首先我们来看一下没有修饰符的情况。

`str.match(reg)` 只会查找第一个匹配项。

结果是一个数组，里面有该匹配项和额外的属性：

- `index` -- 匹配项在字符串中所处在的位置，
- `input` -- 原始字符串。

例如：

```js run
let str = "Fame is the thirst of youth";

let result = str.match( *!*/fame/i*/!* );

alert( result[0] );    // Fame（匹配项）
alert( result.index ); // 0（在最开始的位置 0）
alert( result.input ); // “Fame is the thirst of youth”（字符串本身）
```

该数组可能有不止一项元素。

**如果模式的一部分被括号 `(...)` 括起来了，那么这部分将会独占数组的一个元素。**

例如：

```js run
let str = "JavaScript is a programming language";

let result = str.match( *!*/JAVA(SCRIPT)/i*/!* );

alert( result[0] ); // JavaScript（整个匹配项）
alert( result[1] ); // script（对应括号里的匹配项）
alert( result.index ); // 0
alert( result.input ); // JavaScript is a programming language
```

由于 `i` 修饰符，搜索不区分大小写，因此它会找到 `match:JavaScript`。与 `pattern:SCRIPT` 相对应的匹配部分独占数组中的一项。

稍后我们会在 <info:regexp-groups> 章节继续讲述圆括号这部分。圆括号非常适合搜索和替换。

## 使用“g”修饰符的 str.match(reg)

当使用 `"g"` 修饰符的时候，`str.match` 就会返回由所有匹配项组成的数组。在数组中没有额外的属性，而且圆括号也不会创建任何元素。

例如：

```js run
let str = "HO-Ho-ho!";

let result = str.match( *!*/ho/ig*/!* );

alert( result ); // HO, Ho, ho（所有的匹配项，大小写不敏感）
```

使用括号也不会有什么改变：

```js run
let str = "HO-Ho-ho!";

let result = str.match( *!*/h(o)/ig*/!* );

alert( result ); // HO, Ho, ho
```

所以，使用 `g` 修饰符，`result` 就仅仅是一个由匹配项组成的数组。没有额外的属性。

如果我们想获取匹配项位置的更多信息，并且使用括号，那么我们应该使用下面将要提到的 [RegExp#exec](mdn:js/RegExp/exec) 方法。

````warn header="如果没有匹配项，那么调用 `match` 会返回 `null`"
请注意，这很重要。如果没有匹配项，结果不是一个空数组，而是 `null`。

记住这一点，避免发生下面的错误：

```js run
let str = "Hey-hey-hey!";

alert( str.match(/ho/gi).length ); // error! there's no length of null
```
````

## str.split(regexp|substr, limit)

使用 regexp（或子字符串）作为分隔符分隔字符串。

我们之前已经使用过 `split` 的字符串形式，像下面这样：

```js run
alert('12-34-56'.split('-')) // [12, 34, 56]
```

但是我们也可以传入一个正则表达式：

```js run
alert('12-34-56'.split(/-/)) // [12, 34, 56]
```

## str.replace(str|reg, str|func)

这简直是搜索和替换字符串的利器。

最简单的用处 — 搜索和替换子字符串，就像下面这样：

```js run
// 把横线替换成冒号
alert('12-34-56'.replace("-", ":")) // 12:34-56
```

当 `replace` 的第一个参数是字符串时，它只会查找第一个匹配项。

如果要找到所有的横线，我们不能使用字符串 `"-"`，而是 regexp `pattern:/-/g`，带上 `g` 修饰符。

```js run
// 用冒号替换所有的横线
alert( '12-34-56'.replace( *!*/-/g*/!*, ":" ) )  // 12:34:56
```

第二个参数是要替换的字符串。

我们可以在里面使用特殊符号：

| 符号 | 插入 |
|--------|--------|
|`$$`|`"$"` |
|`$&`|整个匹配项|
|<code>$&#096;</code>|匹配项前面的字符串部分|
|`$'`|匹配项后面的字符串部分|
|`$n`|如果 `n` 是一个 1-2 位的数字，那么这表示从左到右数第 n 个括号的内容|

在下面的例子中，使用 `$&` 将所有的 `"John"` 替换成 `"Mr.John"`：

```js run
let str = "John Doe, John Smith and John Bull.";

// 对于每个 John — 替换成 Mr.John
alert(str.replace(/John/g, 'Mr.$&'));
// "Mr.John Doe, Mr.John Smith and Mr.John Bull.";
```

圆括号通常与 `$1`，`$2` 一起使用，就像下面的例子：

```js run
let str = "John Smith";

alert(str.replace(/(John) (Smith)/, '$2, $1')) // Smith, John
```

**对于那些需要“智能”替换的场景，第二个参数可以是函数。**

它会在每次匹配时被调用，并且其返回值会替换掉匹配项。

例如：

```js run
let i = 0;

// 将每个“ho”都替换成函数所返回的结果
alert("HO-Ho-ho".replace(/ho/gi, function() {
  return ++i;
})); // 1-2-3
```

在上面的示例中，函数每次只返回下一个数字，但通常结果是基于匹配的。

调用该函数 `func(str, p1, p2, ..., pn, offset, s)` 的参数是：

1. `str` — 匹配项，
2. `p1, p2, ..., pn` — 圆括号里的内容（如果有的话），
3. `offset` — 匹配项所在的位置，
4. `s` — 源字符串。

如果在 regexp 中没有圆括号，那么该函数总是有 3 个参数：`func(str, offset, s)`。

下面的代码展示了匹配的所有信息：

```js run
// 显示并且替换所有的匹配项
function replacer(str, offset, s) {
  alert(`Found ${str} at position ${offset} in string ${s}`);
  return str.toLowerCase();
}

let result = "HO-Ho-ho".replace(/ho/gi, replacer);
alert( 'Result: ' + result ); // Result: ho-ho-ho

// shows each match:
// Found HO at position 0 in string HO-Ho-ho
// Found Ho at position 3 in string HO-Ho-ho
// Found ho at position 6 in string HO-Ho-ho
```

在下面的例子中，有两个圆括号，所以 `replacer` 有 5 个参数：`str` 是完全匹配项，然后是圆括号，然后是 `offset` 和 `s`：

```js run
function replacer(str, name, surname, offset, s) {
  // name is the first parentheses, surname is the second one
  return surname + ", " + name;
}

let str = "John Smith";

alert(str.replace(/(John) (Smith)/, replacer)) // Smith, John
```

使用函数赋予了我们终极替换大招，因为这能获取所有的匹配信息，并且能够访问外部变量，可以做任何事情。

## regexp.test(str)

让我们继续研究 `RegExp` 类的方法，它们可以被 regexp 自身调用。

`test` 方法查找任何符合的匹配，无论是否找到，都会返回 `true/false`。

所以这基本上和 `str.search(reg) != -1` 一样，例如：

```js run
let str = "I love JavaScript";

// 这两条语句是一样的
alert( *!*/love/i*/!*.test(str) ); // true
alert( str.search(*!*/love/i*/!*) != -1 ); // true
```

结果是 false 的例子：

```js run
let str = "Bla-bla-bla";

alert( *!*/love/i*/!*.test(str) ); // false
alert( str.search(*!*/love/i*/!*) != -1 ); // false
```

## regexp.exec(str)

我们已经见过这些搜索的方法：

- `search` — 查找匹配项所在的位置，
- `match` — 如果没有 `g` 修饰符，返回圆括号的第一个匹配项，
- `match` — 如果有 `g` 修饰符，返回所有匹配项，圆括号在此不生效。

`regexp.exec` 方法有点难用，但是它允许搜索所有的匹配项，包括圆括号和位置。

它的行为取决于 regexp 是否具有“g”修饰符。

- 如果没有 `g`，那么 `regexp.exec(str)` 返回第一个匹配项，也就是 `str.match(reg)`。
- 如果有 `g`，那么 `regexp.exec(str)` 返回第一个匹配项，然后在 `regexp.lastIndex` 里 **记住** 该匹配项结束的的位置。下一次调用从 `regexp.lastIndex` 开始搜索，并且返回下一个匹配项。如果再没有匹配项了，则 `regexp.exec` 返回 `null`，`regexp.lastIndex` 置为 `0`。

正如我们所见的，如果不使用 `g` 修饰符，则与 `str.match` 没有什么区别。

但是使用 `g` 修饰符，就能够获取所有的匹配项，以及其位置和圆括号组的信息。

下面的代码展示了 `regexp.exec` 是如何一个接一个进行调用的：

```js run
let str = "A lot about JavaScript at https://javascript.info";

let regexp = /JAVA(SCRIPT)/ig;

*!*
// 查找第一个匹配项
*/!*
let matchOne = regexp.exec(str);
alert( matchOne[0] ); // JavaScript
alert( matchOne[1] ); // script
alert( matchOne.index ); // 12（匹配项所在的位置）
alert( matchOne.input ); // 和 str 一样

alert( regexp.lastIndex ); // 22（匹配项结束的位置）

*!*
// 查找第二个匹配项
*/!*
let matchTwo = regexp.exec(str); // 继续从 regexp.lastIndex 开始搜索
alert( matchTwo[0] ); // javascript
alert( matchTwo[1] ); // script
alert( matchTwo.index ); // 34（匹配项所在的位置）
alert( matchTwo.input ); // 和 str 一样

alert( regexp.lastIndex ); // 44（匹配项结束的位置）

*!*
// 查找第三个匹配项
*/!*
let matchThree = regexp.exec(str); // 继续从 regexp.lastIndex 开始搜索
alert( matchThree ); // null（没有匹配项）

alert( regexp.lastIndex ); // 0（重置）
```

可见，每个 `regexp.exec` 调用都以”完整的格式“返回匹配项：一个由圆括号、`index` 和 `input` 属性组成的数组。

`regexp.exec` 的主要用例就是在循环中查找所有的匹配：

```js run
let str = 'A lot about JavaScript at https://javascript.info';

let regexp = /javascript/ig;

let result;

while (result = regexp.exec(str)) {
  alert( `Found ${result[0]} at ${result.index}` );
}
```

循环直到 `regexp.exec` 返回 `null` 时结束，也就意味着“没有更多的匹配项了”。

````smart header="从指定位置开始搜索"
我们可以强制 `regexp.exec` 从给定的位置开始搜索，只需要手动设置 `lastIndex`：

```js run
let str = 'A lot about JavaScript at https://javascript.info';

let regexp = /javascript/ig;
regexp.lastIndex = 30;

alert( regexp.exec(str).index ); // 34，搜索从位置 30 开始
```
````

## “y”修饰符 [#y-flag]

`y` 修饰符意味着搜索应该并且只能在属性 `regexp.lastIndex` 指定的位置查找匹配项。

也就是说，通常搜索是在整个字符串里搜索字符串 `pattern:/javascript/` 的。

但是当有了 `y` 修饰符，则只会在 `regexp.lastIndex`（默认是 `0`）指定的位置开始查找。

例如：

```js run
let str = "I love JavaScript!";

let reg = /javascript/iy;

alert( reg.lastIndex ); // 0（默认）
alert( str.match(reg) ); // null, 没有在位置 0 上找到匹配项

reg.lastIndex = 7;
alert( str.match(reg) ); // JavaScript（搜索正确，该单词确实在位置 7）

// 对于其它 reg.lastIndex，结果都为 null
```

regexp `pattern:/javascript/iy` 只有在我们设置 `reg.lastIndex=7` 的时候被找到，因为由于 `y` 修饰符，引擎只会尝试在 `reg.lastIndex` 这个特定的位置开始查找。

所以，这样做有何意义？我们在什么情况下会用到呢？

答案就是性能。

`y` 修饰符非常适合解析器 — 一种需要“读取”文本、构建内存语法结构或者从中执行操作的程序。为此，我们沿着文本移动，应用正则表达式，来看下一个是字符串、数字还是其它。

`y` 修饰符在给定位置应用一个正则表达式（或者会有很多，逐个进行），当我们理解了其中的内容后，就可以继续一步步检查文本。

在没有该修饰符的情况下，引擎总是会检查到文本的末尾，这需要花费时间，尤其是当文本很大的时候，解析器将会很慢。`y` 修饰符在这里使用则恰到好处。

## 总结，方法

如果我们按照这些方法在实际任务中的用途进行划分，则会更容易理解。

只查找第一个匹配项的：
: - 找到第一个匹配项的位置 — `str.search(reg)`。
- 找到完全匹配 — `str.match(reg)`。
- 检查是否有符合条件的匹配 — `regexp.test(str)`。
- 从指定位置查找匹配 — `regexp.exec(str)`，设置 `regexp.lastIndex` 位置。

查找全匹配：
: - 由匹配项组成的数组 — `str.match(reg)`, 使用 `g` 修饰符。
- 获取所有匹配项的完整信息 — `regexp.exec(str)`，在循环中使用 `g` 修饰符。

搜索然后替换：
: - 替换成另一个字符串或者函数返回的结果 — `str.replace(reg, str|func)`

拆分字符串：
: - `str.split(str|reg)`

我们还讨论了两个修饰符：

- `g` 修饰符查找所有的匹配项（全局搜索），
- `y` 修饰符在文本中的指定位置查找。

现在我们知道了这些方法，并且可以使用正则表达式了。但是我们需要学习它们的语法，所以我们继续下一章节。
