# RegExp 和 String 的方法

有两组方法可以处理正则表达式。

1. 首先，正则表达式是内置的 [RegExp](mdn:js/RegExp) 类的对象，它提供了许多方法。
2. 除此之外，正则字符串中的一些方法可以与regexp一起工作。

由于结构有些混乱，所以我们首先会单独讨论一些方法，然后再讨论通用任务的使用方法。

## str.search(reg)

在上一章节中我们已经见过这个方法了。它返回第一个匹配项的位置，如果没有找到则返回 `-1`。

```js run
let str = "A drop of ink may make a million think";

alert( str.search( *!*/a/i*/!* ) ); // 0（最开始的位置）
```

**重要提示：`search` 总是查找第一个匹配项**

我们不能使用 `search` 来查找下一个匹配项的位置，没有这样的语法。但是还有其它方法可以做到。

## 没有”g“修饰符情况下的 str.match(reg)

`str.match` 方法的表现取决于是否有 `g` 修饰符。首先我们来看一下没有修饰符的情况。

`str.match(reg)` 只会查找第一个匹配项。

结果是一个数组，里面有该匹配项和额外的属性：

- `index` -- 匹配项在字符串中所处在的位置，
- `input` -- 原始字符串。

例如：

```js run
let str = "Fame is the thirst of youth";

let result = str.match( *!*/fame/i*/!* );

alert( result[0] );    // Fame（匹配项）
alert( result.index ); // 0（在最开始的位置0）
alert( result.input ); // “Fame is the thirst of youth”（字符串本身）
```

该数组可能有不止一项元素。

**如果模式的一部分被括号 `(...)` 括起来了，那么它将成为数组的单独元素。**

例如：

```js run
let str = "JavaScript is a programming language";

let result = str.match( *!*/JAVA(SCRIPT)/i*/!* );

alert( result[0] ); // JavaScript（整个匹配项）
alert( result[1] ); // script（对应括号里的匹配项）
alert( result.index ); // 0
alert( result.input ); // JavaScript is a programming language
```

由于 `i` 修饰符，搜索不区分大小写，因此它会找到 `match:JavaScript`。与 `pattern:SCRIPT` 相对应的匹配部分成为了一个单独的数组项。

稍后我们会在 <info:regexp-groups> 章节回到括号这部分。括号非常适合搜索和替换。

## 使用“g”修饰符的 str.match(reg)

当使用 `"g"` 修饰符的时候，`str.match` 就会返回由所有匹配项组成的数组。在数组中没有额外的属性，而且括号也不会创建任何元素。

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

最简单的使用 -- 搜索和替换子字符串，就像下面这样：

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
|`$n`|如果 `n` 是一个1-2位的数字，那么这表示从左到右数第n个括号的内容|

在下面的例子中，使用 `$&` 将所有的 `"John"` 替换成 `"Mr.John"`：

```js run
let str = "John Doe, John Smith and John Bull.";

// 对于每个 John - 替换成 Mr.John
alert(str.replace(/John/g, 'Mr.$&'));
// "Mr.John Doe, Mr.John Smith and Mr.John Bull.";
```

圆括号通常与 `$1`, `$2` 一起使用，就像下面的例子：

```js run
let str = "John Smith";

alert(str.replace(/(John) (Smith)/, '$2, $1')) // Smith, John
```

**对于那些需要“智能”替换的场景，第二个参数可以是函数。**

它会被每个匹配项所调用，并且其结果会被作为替换插入进来。

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

1. `str` -- 匹配项，
2. `p1, p2, ..., pn` -- 圆括号里的内容（如果有的话），
3. `offset` -- 匹配项所在的位置，
4. `s` -- 源字符串。

如果在 regexp 中没有圆括号，那么该函数始终有3个参数：`func(str, offset, s)`。

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

- `search` -- 查找匹配项所在的位置，
- `match` -- 如果没有 `g` 修饰符，返回圆括号的第一个匹配项，
- `match` -- 如果有 `g` 修饰符，返回所有匹配项，圆括号在此不生效。

`regexp.exec` 方法有点难用，但是它允许搜索所有的匹配项，包括圆括号和位置。

它的行为取决于 regexp 是否具有“g”修饰符。

- 如果没有 `g`，那么 `regexp.exec(str)` 返回第一个匹配项，也就是 `str.match(reg)`。
- 如果有 `g`，那么 `regexp.exec(str)` 返回第一个匹配项，然后在 `regexp.lastIndex` 里 **记住** 该匹配项结束的的位置。下一次调用从 `regexp.lastIndex` 开始搜索，并且返回下一个匹配项。如果再没有匹配项了，则 `regexp.exec` 返回 `null`，`regexp.lastIndex` 置为 `0`。

正如我们所见的，如果我们不使用 `g` 修饰符，则与 `str.match` 没有什么区别。

但是使用 `g` 修饰符，能够获取所有的匹配项，带着其位置和圆括号组的信息。

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

可见，每个 `regexp.exec` 调用都以”完整的格式“返回匹配项：一个由圆括号、`index`和 `input` 属性组成的数组。

`regexp.exec` 的主要用例就是在循环中查找所有的匹配：

```js run
let str = 'A lot about JavaScript at https://javascript.info';

let regexp = /javascript/ig;

let result;

while (result = regexp.exec(str)) {
  alert( `Found ${result[0]} at ${result.index}` );
}
```

The loop continues until `regexp.exec` returns `null` that means "no more matches".
循环直到 `regexp.exec` 返回 `null` 时结束，也就意味着“没有更多的匹配项了”。

````smart header="从指定位置开始搜索"
我们可以强制 `regexp.exec` 从给定的位置开始搜索，只需要手动设置 `lastIndex`：

```js run
let str = 'A lot about JavaScript at https://javascript.info';

let regexp = /javascript/ig;
regexp.lastIndex = 30;

alert( regexp.exec(str).index ); // 34, 搜索从位置30开始
```
````

## “y”修饰符 [#y-flag]

`y` 修饰符意味着搜索应该在属性 `regexp.lastIndex` 指定的位置查找匹配项，并且只能是这个位置。

也就是说，通常搜索是在整个字符串里搜索字符串 `pattern:/javascript/`的。

但是当有了 `y` 修饰符，则只会在 `regexp.lastIndex`（默认是 `0`）指定的位置开始查找。

例如：

```js run
let str = "I love JavaScript!";

let reg = /javascript/iy;

alert( reg.lastIndex ); // 0（默认）
alert( str.match(reg) ); // null, 但是不位置0

reg.lastIndex = 7;
alert( str.match(reg) ); // JavaScript（搜索正确，该单词确实在位置7）

// 对于其它 reg.lastIndex，结果都为 null
```

The regexp `pattern:/javascript/iy` can only be found if we set `reg.lastIndex=7`, because due to `y` flag the engine only tries to find it in the single place within a string -- from the `reg.lastIndex` position.

So, what's the point? Where do we apply that?

The reason is performance.

The `y` flag works great for parsers -- programs that need to "read" the text and build in-memory syntax structure or perform actions from it. For that we move along the text and apply regular expressions to see what we have next: a string? A number? Something else?

The `y` flag allows to apply a regular expression (or many of them one-by-one) exactly at the given position and when we understand what's there, we can move on -- step by step examining the text.

Without the flag the regexp engine always searches till the end of the text, that takes time, especially if the text is large. So our parser would be very slow. The `y` flag is exactly the right thing here.

## Summary, recipes

Methods become much easier to understand if we separate them by their use in real-life tasks.

To search for the first match only:
: - Find the position of the first match -- `str.search(reg)`.
- Find the full match -- `str.match(reg)`.
- Check if there's a match -- `regexp.test(str)`.
- Find the match from the given position -- `regexp.exec(str)`, set `regexp.lastIndex` to position.

To search for all matches:
: - An array of matches -- `str.match(reg)`, the regexp with `g` flag.
- Get all matches with full information about each one -- `regexp.exec(str)` with `g` flag in the loop.

To search and replace:
: - Replace with another string or a function result -- `str.replace(reg, str|func)`

To split the string:
: - `str.split(str|reg)`

We also covered two flags:

- The `g` flag to find all matches (global search),
- The `y` flag to search at exactly the given position inside the text.

Now we know the methods and can use regular expressions. But we need to learn their syntax, so let's move on.
