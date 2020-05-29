<<<<<<< HEAD
# 集合和范围 [...]

在方括号 `[…]` 中的几个字符或者字符类意味着“搜索给定的字符中的任意一个”。

## 集合

比如说，`pattern:[eao]` 意味着查找在 3 个字符 `'a'`、`'e'` 或者 `'o' 中的任意一个。

这被叫做一个**集合**。集合可以在正则表达式中和其它常规字符一起使用。

```js run
// 查找 [t 或者 m]，然后再匹配 “op”
alert( "Mop top".match(/[tm]op/gi) ); // "Mop", "top"
```

请注意尽管在集合中有多个字符，但它们在匹配中只会对应其中的一个。

所以下面的示例并不会匹配上：

```js run
// 查找 “V”，然后匹配 [o 或者 i]，之后再匹配 “la”
alert( "Voila".match(/V[oi]la/) ); // null，并没有匹配上
```

这个模式会做以下假设：

- `pattern:V`，
- 然后匹配其中的**一个字符** `pattern:[oi]`，
- 然后匹配 `pattern:la`，

所以可以匹配上 `match:Vola` 或者 `match:Vila`。

## 范围

方括号也可以包含**字符范围**。

比如说，`pattern:[a-z]` 会匹配从 `a` 到 `z` 范围内的字母，`pattern:[0-5]` 表示从 `0` 到 `5` 的数字。

在下面的示例中，我们会查询首先匹配 `"x"` 字符，再匹配两个数字或者位于 `A` 到 `F` 范围内的字符。
=======
# Sets and ranges [...]

Several characters or character classes inside square brackets `[…]` mean to "search for any character among given".

## Sets

For instance, `pattern:[eao]` means any of the 3 characters: `'a'`, `'e'`, or `'o'`.

That's called a *set*. Sets can be used in a regexp along with regular characters:

```js run
// find [t or m], and then "op"
alert( "Mop top".match(/[tm]op/gi) ); // "Mop", "top"
```

Please note that although there are multiple characters in the set, they correspond to exactly one character in the match.

So the example below gives no matches:

```js run
// find "V", then [o or i], then "la"
alert( "Voila".match(/V[oi]la/) ); // null, no matches
```

The pattern searches for:

- `pattern:V`,
- then *one* of the letters `pattern:[oi]`,
- then `pattern:la`.

So there would be a match for `match:Vola` or `match:Vila`.

## Ranges

Square brackets may also contain *character ranges*.

For instance, `pattern:[a-z]` is a character in range from `a` to `z`, and `pattern:[0-5]` is a digit from `0` to `5`.

In the example below we're searching for `"x"` followed by two digits or letters from `A` to `F`:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js run
alert( "Exception 0xAF".match(/x[0-9A-F][0-9A-F]/g) ); // xAF
```

<<<<<<< HEAD
`pattern:[0-9A-F]` 表示两个范围：它搜索一个字符，满足数字 `0` 到 `9` 或字母 `A` 到 `F`。

如果我们还想查找小写字母，则可以添加范围 `a-f`：`pattern:[0-9A-Fa-f]`。或添加标志 `pattern:i`。

我们也可以在 `[…]` 里面使用字符类。

例如，如果我们想要查找单词字符 `pattern:\w` 或连字符 `pattern:-`，则该集合为 `pattern:[\w-]`。

也可以组合多个类，例如 `pattern:[\s\d]` 表示 “空格字符或数字”。

```smart header="字符类是某些字符集的简写"
例如：

* **\d** —— 和 `pattern:[0-9]` 相同，
* **\w** —— 和 `pattern:[a-zA-Z0-9_]` 相同，
* **\s** —— 和 `pattern:[\t\n\v\f\r ]` 外加少量罕见的 unicode 空格字符相同。
```

### 示例：多语言 \w

由于字符类 `pattern:\w` 是简写的 `pattern:[a-zA-Z0-9_]`，因此无法找到中文象形文字，西里尔字母等。

我们可以编写一个更通用的模式，该模式可以查找任何语言中的文字字符。这很容易想到就 Unicode 属性：`pattern:[\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]`。

让我们理解它。类似于 `pattern:\w`，我们在制作自己的一套字符集，包括以下 unicode 字符：

* `Alphabetic` (`Alpha`) —— 字母，
* `Mark` (`M`) —— 重读，
* `Decimal_Number` (`Nd`) —— 数字，
* `Connector_Punctuation` (`Pc`) —— 下划线 `'_'` 和类似的字符，
* `Join_Control` (`Join_C`) —— 两个特殊代码 `200c` and `200d`，用于连字，例如阿拉伯语。

使用示例：
=======
Here `pattern:[0-9A-F]` has two ranges: it searches for a character that is either a digit from `0` to `9` or a letter from `A` to `F`.

If we'd like to look for lowercase letters as well, we can add the range `a-f`: `pattern:[0-9A-Fa-f]`. Or add the flag `pattern:i`.

We can also use character classes inside `[…]`.

For instance, if we'd like to look for a wordly character `pattern:\w` or a hyphen `pattern:-`, then the set is `pattern:[\w-]`.

Combining multiple classes is also possible, e.g. `pattern:[\s\d]` means "a space character or a digit".

```smart header="Character classes are shorthands for certain character sets"
For instance:

- **\d** -- is the same as `pattern:[0-9]`,
- **\w** -- is the same as `pattern:[a-zA-Z0-9_]`,
- **\s** -- is the same as `pattern:[\t\n\v\f\r ]`, plus few other rare unicode space characters.
```

### Example: multi-language \w

As the character class `pattern:\w` is a shorthand for `pattern:[a-zA-Z0-9_]`, it can't find Chinese hieroglyphs, Cyrillic letters, etc.

We can write a more universal pattern, that looks for wordly characters in any language. That's easy with unicode properties: `pattern:[\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]`.

Let's decipher it. Similar to `pattern:\w`, we're making a set of our own that includes characters with following unicode properties:

- `Alphabetic` (`Alpha`) - for letters,
- `Mark` (`M`) - for accents,
- `Decimal_Number` (`Nd`) - for digits,
- `Connector_Punctuation` (`Pc`) - for the underscore `'_'` and similar characters,
- `Join_Control` (`Join_C`) - two special codes `200c` and `200d`, used in ligatures, e.g. in Arabic.

An example of use:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js run
let regexp = /[\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]/gu;

let str = `Hi 你好 12`;

// finds all letters and digits:
alert( str.match(regexp) ); // H,i,你,好,1,2
```

<<<<<<< HEAD
当然，我们可以编辑此模式：添加 unicode 属性或删除它们。文章 <info:regexp-unicode> 中包含了更多 Unicode 属性的细节。

```warn header="Edge 和 Firefox 不支持 Unicode 属性"
Edge 和 Firefox 尚未实现 Unicode 属性 `pattern:p{…}`。如果确实需要它们，可以使用库 [XRegExp](http://xregexp.com/)。

或者只使用我们想要的语言范围的字符，例如西里尔字母 `pattern:[а-я]`。
```

## 排除范围

除了普通的范围匹配，还有类似 `pattern:[^…]` 的“排除”范围匹配。

它们通过在匹配查询的开头添加插入符号 `^` 来表示，它会匹配所有**除了给定的字符**之外的任意字符。

比如说：

- `pattern:[^aeyo]` —— 匹配任何除了 `'a'`、`'e'`、`'y'` 或者 `'o'` 之外的字符。
- `pattern:[^0-9]` —— 匹配任何除了数字之外的字符，也可以使用 `\D` 来表示。
- `pattern:[^\s]` —— 匹配任何非空字符，也可以使用 `\S` 来表示。

下面的示例查询除了字母，数字和空格之外的任意字符：
=======
Of course, we can edit this pattern: add unicode properties or remove them. Unicode properties are covered in more details in the article <info:regexp-unicode>.

```warn header="Unicode properties aren't supported in Edge and Firefox"
Unicode properties `pattern:p{…}` are not yet implemented in Edge and Firefox. If we really need them, we can use library [XRegExp](http://xregexp.com/).

Or just use ranges of characters in a language that interests us, e.g.  `pattern:[а-я]` for Cyrillic letters.
```

## Excluding ranges

Besides normal ranges, there are "excluding" ranges that look like `pattern:[^…]`.

They are denoted by a caret character `^` at the start and match any character *except the given ones*.

For instance:

- `pattern:[^aeyo]` -- any character except  `'a'`, `'e'`, `'y'` or `'o'`.
- `pattern:[^0-9]` -- any character except a digit, the same as `pattern:\D`.
- `pattern:[^\s]` -- any non-space character, same as `\S`.

The example below looks for any characters except letters, digits and spaces:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js run
alert( "alice15@gmail.com".match(/[^\d\sA-Z]/gi) ); // @ and .
```

<<<<<<< HEAD
## 在 […] 中不转义

通常当我们的确需要查询点字符时，我们需要把它转义成像 `pattern:\.` 这样的形式。如果我们需要查询一个反斜杠，我们需要使用 `pattern:\\`。

在方括号表示中，绝大多数特殊字符可以在不转义的情况下使用：

- 表示一个点符号 `pattern:'.'`。
- 表示一个加号 `pattern:'+'`。
- 表示一个括号 `pattern:'( )'`。
- 在开头或者结尾表示一个破折号（在这些位置该符号表示的就不是一个范围） `pattern:'-'。
- 在不是开头的位置表示一个插入符号（在开头位置该符号表示的是排除）`pattern:'^'`。
- 表示一个开口的方括号符号 `pattern:'['`。

换句话说，除了在方括号中有特殊含义的字符外，其它所有特殊字符都是允许不添加反斜杠的。

一个在方括号中的点符号 `"."` 表示的就是一个点字符。查询模式 `pattern:[.,]` 将会寻找一个为点或者逗号的字符。

在下面的示例中，`pattern:[-().^+]` 会查找 `-().^+` 的其中任意一个字符：

```js run
// 并不需要转义
let reg = /[-().^+]/g;

alert( "1 + 2 - 3".match(reg) ); // 匹配 +，-
```

。。。但是如果你为了“以防万一”转义了它们，这也不会有任何问题：

```js run
//转义其中的所有字符
let reg = /[\-\(\)\.\^\+]/g;

alert( "1 + 2 - 3".match(reg) ); // 仍能正常工作：+，-
```

## 范围和标志“u”

如果集合中有代理对（surrogate pairs），则需要标志 `pattern:u` 以使其正常工作。

例如，让我们在字符串 `subject:𝒳` 中查找 `pattern:[𝒳𝒴]`：

```js run
alert( '𝒳'.match(/[𝒳𝒴]/) ); // 显示一个奇怪的字符，像 [?]
//（搜索执行不正确，返回了半个字符）
```

结果不正确，因为默认情况下正则表达式“不知道”代理对。

正则表达式引擎认为 `[𝒳𝒴]` —— 不是两个，而是四个字符：
1. `𝒳` `(1)` 的左半部分，
2. `𝒳` `(2)` 的右半部分，
3. `𝒴` `(3)` 的左半部分，
4. `𝒴` `(4)` 的右半部分。

我们可以看到他们的代码，如下所示：
=======
## Escaping in […]

Usually when we want to find exactly a special character, we need to escape it like `pattern:\.`. And if we need a backslash, then we use `pattern:\\`, and so on.

In square brackets we can use the vast majority of special characters without escaping:

- Symbols `pattern:. + ( )` never need escaping.
- A hyphen `pattern:-` is not escaped in the beginning or the end (where it does not define a range).
- A caret `pattern:^` is only escaped in the beginning (where it means exclusion).
- The closing square bracket `pattern:]` is always escaped (if we need to look for that symbol).

In other words, all special characters are allowed without escaping, except when they mean something for square brackets.

A dot `.` inside square brackets means just a dot. The pattern `pattern:[.,]` would look for one of characters: either a dot or a comma.

In the example below the regexp `pattern:[-().^+]` looks for one of the characters `-().^+`:

```js run
// No need to escape
let regexp = /[-().^+]/g;

alert( "1 + 2 - 3".match(regexp) ); // Matches +, -
```

...But if you decide to escape them "just in case", then there would be no harm:

```js run
// Escaped everything
let regexp = /[\-\(\)\.\^\+]/g;

alert( "1 + 2 - 3".match(regexp) ); // also works: +, -
```

## Ranges and flag "u"

If there are surrogate pairs in the set, flag `pattern:u` is required for them to work correctly.

For instance, let's look for `pattern:[𝒳𝒴]` in the string `subject:𝒳`:

```js run
alert( '𝒳'.match(/[𝒳𝒴]/) ); // shows a strange character, like [?]
// (the search was performed incorrectly, half-character returned)
```

The result is incorrect, because by default regular expressions "don't know" about surrogate pairs.

The regular expression engine thinks that `[𝒳𝒴]` -- are not two, but four characters:
1. left half of `𝒳` `(1)`,
2. right half of `𝒳` `(2)`,
3. left half of `𝒴` `(3)`,
4. right half of `𝒴` `(4)`.

We can see their codes like this:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js run
for(let i=0; i<'𝒳𝒴'.length; i++) {
  alert('𝒳𝒴'.charCodeAt(i)); // 55349, 56499, 55349, 56500
};
```

<<<<<<< HEAD
因此，以上示例查找并显示了 `𝒳` 的左半部分。

如果我们添加标志 `pattern:u`，那么行为将是正确的：
=======
So, the example above finds and shows the left half of `𝒳`.

If we add flag `pattern:u`, then the behavior will be correct:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js run
alert( '𝒳'.match(/[𝒳𝒴]/u) ); // 𝒳
```

<<<<<<< HEAD
当我们查找范围时也会出现类似的情况，就像 `[𝒳-𝒴]`。

如果我们忘记添加标志 `pattern:u`，则会出现错误：

```js run
'𝒳'.match(/[𝒳-𝒴]/); // 错误：无效的正则表达式
```

原因是，没有标志 `pattern:u` 的代理对被视为两个字符，因此 `[𝒳-𝒴]` 被解释为 `[<55349><56499>-<55349><56500>]`（每个代理对都替换为其代码）。现在很容易看出范围 `56499-55349` 是无效的：其起始代码 `56499` 大于终止代码 `55349`。这就是错误的原因。

使用标志 `pattern:u`，该模式可以正常匹配：

```js run
// 查找字符从 𝒳 到 𝒵
=======
The similar situation occurs when looking for a range, such as `[𝒳-𝒴]`.

If we forget to add flag `pattern:u`, there will be an error:

```js run
'𝒳'.match(/[𝒳-𝒴]/); // Error: Invalid regular expression
```

The reason is that without flag `pattern:u` surrogate pairs are perceived as two characters, so `[𝒳-𝒴]` is interpreted as `[<55349><56499>-<55349><56500>]` (every surrogate pair is replaced with its codes). Now it's easy to see that the range `56499-55349` is invalid: its starting code `56499` is greater than the end `55349`. That's the formal reason for the error.

With the flag `pattern:u` the pattern works correctly:

```js run
// look for characters from 𝒳 to 𝒵
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
alert( '𝒴'.match(/[𝒳-𝒵]/u) ); // 𝒴
```
