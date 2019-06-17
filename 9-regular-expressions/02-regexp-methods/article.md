<<<<<<< HEAD
# RegExp 和 String 的方法

有两组方法可以处理正则表达式。

1. 首先，正则表达式是内置的 [RegExp](mdn:js/RegExp) 类的对象，它提供了许多方法。
2. 除此之外，正则字符串中的一些方法可以与regexp一起工作。

为了避免结构混乱，我们首先会单独讨论一些方法，然后再讨论通用任务的使用方法。

## str.search(reg)

在上一章节中我们已经见过这个方法了。它返回第一个匹配项所在的位置，如果没有找到则返回 `-1`。
=======
# Methods of RegExp and String

There are two sets of methods to deal with regular expressions.

1. First, regular expressions are objects of the built-in [RegExp](mdn:js/RegExp) class, it provides many methods.
2. Besides that, there are methods in regular strings can work with regexps.


## Recipes

Which method to use depends on what we'd like to do.

Methods become much easier to understand if we separate them by their use in real-life tasks.

So, here are general recipes, the details to follow:

**To search for all matches:**

Use regexp `g` flag and:
- Get a flat array of matches -- `str.match(reg)`
- Get an array or matches with details -- `str.matchAll(reg)`.

**To search for the first match only:**
- Get the full first match -- `str.match(reg)` (without `g` flag).
- Get the string position of the first match -- `str.search(reg)`.
- Check if there's a match -- `regexp.test(str)`.
- Find the match from the given position -- `regexp.exec(str)` (set `regexp.lastIndex` to position).

**To replace all matches:**
- Replace with another string or a function result -- `str.replace(reg, str|func)`

**To split the string by a separator:**
- `str.split(str|reg)`

Now you can continue reading this chapter to get the details about every method... But if you're reading for the first time, then you probably want to know more about regexps. So you can move to the next chapter, and then return here if something about a method is unclear.

## str.search(reg)

We've seen this method already. It returns the position of the first match or `-1` if none found:
>>>>>>> 027933531e121650120f7e8385f691de99af12d2

```js run
let str = "A drop of ink may make a million think";

<<<<<<< HEAD
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
=======
alert( str.search( *!*/a/i*/!* ) ); // 0 (first match at zero position)
```

**The important limitation: `search` only finds  the first match.**

We can't find next matches using `search`, there's just no syntax for that. But there are other methods that can.

## str.match(reg), no "g" flag

The behavior of `str.match` varies depending on whether `reg` has `g` flag or not.

First, if there's no `g` flag, then `str.match(reg)` looks for the first match only.

The result is an array with that match and additional properties:

- `index` -- the position of the match inside the string,
- `input` -- the subject string.

For instance:
>>>>>>> 027933531e121650120f7e8385f691de99af12d2

```js run
let str = "Fame is the thirst of youth";

let result = str.match( *!*/fame/i*/!* );

<<<<<<< HEAD
alert( result[0] );    // Fame（匹配项）
alert( result.index ); // 0（在最开始的位置 0）
alert( result.input ); // “Fame is the thirst of youth”（字符串本身）
```

该数组可能有不止一项元素。

**如果模式的一部分被括号 `(...)` 括起来了，那么这部分将会独占数组的一个元素。**

例如：
=======
alert( result[0] );    // Fame (the match)
alert( result.index ); // 0 (at the zero position)
alert( result.input ); // "Fame is the thirst of youth" (the string)
```

A match result may have more than one element.

**If a part of the pattern is delimited by parentheses `(...)`, then it becomes a separate element in the array.**

If parentheses have a name, designated by `(?<name>...)` at their start, then `result.groups[name]` has the content. We'll see that later in the chapter [about groups](info:regexp-groups).

For instance:
>>>>>>> 027933531e121650120f7e8385f691de99af12d2

```js run
let str = "JavaScript is a programming language";

let result = str.match( *!*/JAVA(SCRIPT)/i*/!* );

<<<<<<< HEAD
alert( result[0] ); // JavaScript（整个匹配项）
alert( result[1] ); // script（对应括号里的匹配项）
=======
alert( result[0] ); // JavaScript (the whole match)
alert( result[1] ); // script (the part of the match that corresponds to the parentheses)
>>>>>>> 027933531e121650120f7e8385f691de99af12d2
alert( result.index ); // 0
alert( result.input ); // JavaScript is a programming language
```

<<<<<<< HEAD
由于 `i` 修饰符，搜索不区分大小写，因此它会找到 `match:JavaScript`。与 `pattern:SCRIPT` 相对应的匹配部分独占数组中的一项。

稍后我们会在 <info:regexp-groups> 章节继续讲述圆括号这部分。圆括号非常适合搜索和替换。

## 使用“g”修饰符的 str.match(reg)

当使用 `"g"` 修饰符的时候，`str.match` 就会返回由所有匹配项组成的数组。在数组中没有额外的属性，而且圆括号也不会创建任何元素。

例如：
=======
Due to the `i` flag the search is case-insensitive, so it finds `match:JavaScript`. The part of the match that corresponds to `pattern:SCRIPT` becomes a separate array item.

So, this method is used to find one full match with all details.


## str.match(reg) with "g" flag

When there's a `"g"` flag, then `str.match` returns an array of all matches. There are no additional properties in that array, and parentheses do not create any elements.

For instance:
>>>>>>> 027933531e121650120f7e8385f691de99af12d2

```js run
let str = "HO-Ho-ho!";

let result = str.match( *!*/ho/ig*/!* );

<<<<<<< HEAD
alert( result ); // HO, Ho, ho（所有的匹配项，大小写不敏感）
```

使用括号也不会有什么改变：
=======
alert( result ); // HO, Ho, ho (array of 3 matches, case-insensitive)
```

Parentheses do not change anything, here we go:
>>>>>>> 027933531e121650120f7e8385f691de99af12d2

```js run
let str = "HO-Ho-ho!";

let result = str.match( *!*/h(o)/ig*/!* );

alert( result ); // HO, Ho, ho
```

<<<<<<< HEAD
所以，使用 `g` 修饰符，`result` 就仅仅是一个由匹配项组成的数组。没有额外的属性。

如果我们想获取匹配项位置的更多信息，并且使用括号，那么我们应该使用下面将要提到的 [RegExp#exec](mdn:js/RegExp/exec) 方法。

````warn header="如果没有匹配项，那么调用 `match` 会返回 `null`"
请注意，这很重要。如果没有匹配项，结果不是一个空数组，而是 `null`。

记住这一点，避免发生下面的错误：
=======
**So, with `g` flag `str.match` returns a simple array of all matches, without details.**

If we want to get information about match positions and contents of parentheses then we should use `matchAll`  method that we'll cover below.

````warn header="If there are no matches, `str.match` returns `null`"
Please note, that's important. If there are no matches, the result is not an empty array, but `null`.

Keep that in mind to evade pitfalls like this:
>>>>>>> 027933531e121650120f7e8385f691de99af12d2

```js run
let str = "Hey-hey-hey!";

<<<<<<< HEAD
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
=======
alert( str.match(/Z/g).length ); // Error: Cannot read property 'length' of null
```

Here `str.match(/Z/g)` is `null`, it has no `length` property.
````

## str.matchAll(regexp)

The method `str.matchAll(regexp)` is used to find all matches with all details.

For instance:

```js run
let str = "Javascript or JavaScript? Should we uppercase 'S'?";

let result = str.matchAll( *!*/java(script)/ig*/!* );

let [match1, match2] = result;

alert( match1[0] ); // Javascript (the whole match)
alert( match1[1] ); // script (the part of the match that corresponds to the parentheses)
alert( match1.index ); // 0
alert( match1.input ); // = str (the whole original string)

alert( match2[0] ); // JavaScript (the whole match)
alert( match2[1] ); // Script (the part of the match that corresponds to the parentheses)
alert( match2.index ); // 14
alert( match2.input ); // = str (the whole original string)
```

````warn header="`matchAll` returns an iterable, not array"
For instance, if we try to get the first match by index, it won't work:

```js run
let str = "Javascript or JavaScript??";

let result = str.matchAll( /javascript/ig );

*!*
alert(result[0]); // undefined (?! there must be a match)
*/!*
```

The reason is that the iterator is not an array. We need to run `Array.from(result)` on it, or use `for..of` loop to get matches.

In practice, if we need all matches, then `for..of` works, so it's not a problem.

And, to get only few matches, we can use destructuring:

```js run
let str = "Javascript or JavaScript??";

*!*
let [firstMatch] = str.matchAll( /javascript/ig );
*/!*

alert(firstMatch); // Javascript
```
````

```warn header="`matchAll` is supernew, may need a polyfill"
The method may not work in old browsers. A polyfill might be needed (this site uses core-js).

Or you could make a loop with `regexp.exec`, explained below.
```

## str.split(regexp|substr, limit)

Splits the string using the regexp (or a substring) as a delimiter.

We already used `split` with strings, like this:

```js run
alert('12-34-56'.split('-')) // array of [12, 34, 56]
```

But we can split by a regular expression, the same way:

```js run
alert('12-34-56'.split(/-/)) // array of [12, 34, 56]
>>>>>>> 027933531e121650120f7e8385f691de99af12d2
```

## str.replace(str|reg, str|func)

<<<<<<< HEAD
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
=======
This is a generic method for searching and replacing, one of most useful ones. The swiss army knife for searching and replacing.  

We can use it without regexps, to search and replace a substring:

```js run
// replace a dash by a colon
alert('12-34-56'.replace("-", ":")) // 12:34-56
```

There's a pitfall though.

**When the first argument of `replace` is a string, it only looks for the first match.**

You can see that in the example above: only the first `"-"` is replaced by `":"`.

To find all dashes, we need to use not the string `"-"`, but a regexp `pattern:/-/g`, with an obligatory `g` flag:

```js run
// replace all dashes by a colon
alert( '12-34-56'.replace( *!*/-/g*/!*, ":" ) )  // 12:34:56
```

The second argument is a replacement string. We can use special characters in it:

| Symbol | Inserts |
|--------|--------|
|`$$`|`"$"` |
|`$&`|the whole match|
|<code>$&#096;</code>|a part of the string before the match|
|`$'`|a part of the string after the match|
|`$n`|if `n` is a 1-2 digit number, then it means the contents of n-th parentheses counting from left to right, otherwise it means a parentheses with the given name |


For instance if we use `$&` in the replacement string, that means "put the whole match here".

Let's use it to prepend all entries of `"John"` with `"Mr."`:

```js run
let str = "John Doe, John Smith and John Bull";

// for each John - replace it with Mr. and then John
alert(str.replace(/John/g, 'Mr.$&'));  // Mr.John Doe, Mr.John Smith and Mr.John Bull
```

Quite often we'd like to reuse parts of the source string, recombine them in the replacement or wrap into something.

To do so, we should:
1. First, mark the parts by parentheses in regexp.
2. Use `$1`, `$2` (and so on) in the replacement string to get the content matched by 1st, 2nd and so on parentheses.

For instance:
>>>>>>> 027933531e121650120f7e8385f691de99af12d2

```js run
let str = "John Smith";

<<<<<<< HEAD
alert(str.replace(/(John) (Smith)/, '$2, $1')) // Smith, John
```

**对于那些需要“智能”替换的场景，第二个参数可以是函数。**

它会在每次匹配时被调用，并且其返回值会替换掉匹配项。

例如：
=======
// swap first and last name
alert(str.replace(/(john) (smith)/i, '$2, $1')) // Smith, John
```

**For situations that require "smart" replacements, the second argument can be a function.**

It will be called for each match, and its result will be inserted as a replacement.

For instance:
>>>>>>> 027933531e121650120f7e8385f691de99af12d2

```js run
let i = 0;

<<<<<<< HEAD
// 将每个“ho”都替换成函数所返回的结果
=======
// replace each "ho" by the result of the function
>>>>>>> 027933531e121650120f7e8385f691de99af12d2
alert("HO-Ho-ho".replace(/ho/gi, function() {
  return ++i;
})); // 1-2-3
```

<<<<<<< HEAD
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
=======
In the example above the function just returns the next number every time, but usually the result is based on the match.

The function is called with arguments `func(str, p1, p2, ..., pn, offset, input, groups)`:

1. `str` -- the match,
2. `p1, p2, ..., pn` -- contents of parentheses (if there are any),
3. `offset` -- position of the match,
4. `input` -- the source string,
5. `groups` -- an object with named groups (see chapter [](info:regexp-groups)).

If there are no parentheses in the regexp, then there are only 3 arguments: `func(str, offset, input)`.

Let's use it to show full information about matches:

```js run
// show and replace all matches
function replacer(str, offset, input) {
  alert(`Found ${str} at position ${offset} in string ${input}`);
>>>>>>> 027933531e121650120f7e8385f691de99af12d2
  return str.toLowerCase();
}

let result = "HO-Ho-ho".replace(/ho/gi, replacer);
alert( 'Result: ' + result ); // Result: ho-ho-ho

// shows each match:
// Found HO at position 0 in string HO-Ho-ho
// Found Ho at position 3 in string HO-Ho-ho
// Found ho at position 6 in string HO-Ho-ho
```

<<<<<<< HEAD
在下面的例子中，有两个圆括号，所以 `replacer` 有 5 个参数：`str` 是完全匹配项，然后是圆括号，然后是 `offset` 和 `s`：

```js run
function replacer(str, name, surname, offset, s) {
=======
In the example below there are two parentheses, so `replacer` is called with 5 arguments: `str` is the full match, then parentheses, and then `offset` and `input`:

```js run
function replacer(str, name, surname, offset, input) {
>>>>>>> 027933531e121650120f7e8385f691de99af12d2
  // name is the first parentheses, surname is the second one
  return surname + ", " + name;
}

let str = "John Smith";

alert(str.replace(/(John) (Smith)/, replacer)) // Smith, John
```

<<<<<<< HEAD
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
=======
Using a function gives us the ultimate replacement power, because it gets all the information about the match, has access to outer variables and can do everything.

## regexp.exec(str)

We've already seen these searching methods:

- `search` -- looks for the position of the match,
- `match` -- if there's no `g` flag, returns the first match with parentheses and all details,
- `match` -- if there's a `g` flag -- returns all matches, without details parentheses,
- `matchAll` -- returns all matches with details.

The `regexp.exec` method is the most flexible searching method of all. Unlike previous methods, `exec` should be called on a regexp, rather than on a string.

It behaves differently depending on whether the regexp has the `g` flag.

If there's no `g`, then `regexp.exec(str)` returns the first match, exactly as `str.match(reg)`. Such behavior does not give us anything new.

But if there's `g`, then:
- `regexp.exec(str)` returns the first match and *remembers* the position after it in `regexp.lastIndex` property.
- The next call starts to search from `regexp.lastIndex` and returns the next match.
- If there are no more matches then `regexp.exec` returns `null` and `regexp.lastIndex` is set to `0`.

We could use it to get all matches with their positions and parentheses groups in a loop, instead of `matchAll`:
>>>>>>> 027933531e121650120f7e8385f691de99af12d2

```js run
let str = 'A lot about JavaScript at https://javascript.info';

let regexp = /javascript/ig;

let result;

while (result = regexp.exec(str)) {
  alert( `Found ${result[0]} at ${result.index}` );
<<<<<<< HEAD
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
=======
  // shows: Found JavaScript at 12, then:
  // shows: Found javascript at 34
}
```

Surely, `matchAll` does the same, at least for modern browsers. But what `matchAll` can't do -- is to search from a given position.

Let's search from position `13`. What we need is to assign `regexp.lastIndex=13` and call `regexp.exec`:

```js run
let str = "A lot about JavaScript at https://javascript.info";

let regexp = /javascript/ig;
*!*
regexp.lastIndex = 13;
*/!*

let result;

while (result = regexp.exec(str)) {
  alert( `Found ${result[0]} at ${result.index}` );
  // shows: Found javascript at 34
}
```

Now, starting from the given position `13`, there's only one match.


## regexp.test(str)

The method `regexp.test(str)` looks for a match and returns `true/false` whether it finds it.

For instance:

```js run
let str = "I love JavaScript";

// these two tests do the same
alert( *!*/love/i*/!*.test(str) ); // true
alert( str.search(*!*/love/i*/!*) != -1 ); // true
```

An example with the negative answer:

```js run
let str = "Bla-bla-bla";

alert( *!*/love/i*/!*.test(str) ); // false
alert( str.search(*!*/love/i*/!*) != -1 ); // false
```

If the regexp has `'g'` flag, then `regexp.test` advances `regexp.lastIndex` property, just like `regexp.exec`.

So we can use it to search from a given position:

```js run
let regexp = /love/gi;

let str = "I love JavaScript";

// start the search from position 10:
regexp.lastIndex = 10
alert( regexp.test(str) ); // false (no match)
```



````warn header="Same global regexp tested repeatedly may fail to match"
If we apply the same global regexp to different inputs, it may lead to wrong result, because `regexp.test` call advances `regexp.lastIndex` property, so the search in another string may start from non-zero position.

For instance, here we call `regexp.test` twice on the same text, and the second time fails:

```js run
let regexp = /javascript/g;  // (regexp just created: regexp.lastIndex=0)

alert( regexp.test("javascript") ); // true (regexp.lastIndex=10 now)
alert( regexp.test("javascript") ); // false
```

That's exactly because `regexp.lastIndex` is non-zero on the second test.

To work around that, one could use non-global regexps or re-adjust `regexp.lastIndex=0` before a new search.
````

## Summary

There's a variety of many methods on both regexps and strings.

Their abilities and methods overlap quite a bit, we can do the same by different calls. Sometimes that may cause confusion when starting to learn the language.

Then please refer to the recipes at the beginning of this chapter, as they provide solutions for the majority of regexp-related tasks.
>>>>>>> 027933531e121650120f7e8385f691de99af12d2
