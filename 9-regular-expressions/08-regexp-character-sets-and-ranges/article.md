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

```js run
alert( "Exception 0xAF".match(/x[0-9A-F][0-9A-F]/g) ); // xAF
```

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

```js run
let regexp = /[\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]/gu;

let str = `Hi 你好 12`;

// finds all letters and digits:
alert( str.match(regexp) ); // H,i,你,好,1,2
```

Of course, we can edit this pattern: add unicode properties or remove them. Unicode properties are covered in more details in the article <info:regexp-unicode>.

```warn header="Unicode properties aren't supported in Edge and Firefox"
Unicode properties `pattern:p{…}` are not yet implemented in Edge and Firefox. If we really need them, we can use library [XRegExp](http://xregexp.com/).

Or just use ranges of characters in a language that interests us, e.g.  `pattern:[а-я]` for Cyrillic letters.
```

## 排除范围

除了普通的范围匹配，还有类似 `pattern:[^…]` 的“排除”范围匹配。

它们通过在匹配查询的开头添加插入符号 `^` 来表示，它会匹配所有**除了给定的字符**之外的任意字符。

比如说：

- `pattern:[^aeyo]` —— 匹配任何除了 `'a'`、`'e'`、`'y'` 或者 `'o'` 之外的字符。
- `pattern:[^0-9]` —— 匹配任何除了数字之外的字符，也可以使用 `\D` 来表示。
- `pattern:[^\s]` —— 匹配任何非空字符，也可以使用 `\S` 来表示。

下面的示例查询除了字母，数字和空格之外的任意字符：

```js run
alert( "alice15@gmail.com".match(/[^\d\sA-Z]/gi) ); // @ and .
```

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

```js run
for(let i=0; i<'𝒳𝒴'.length; i++) {
  alert('𝒳𝒴'.charCodeAt(i)); // 55349, 56499, 55349, 56500
};
```

So, the example above finds and shows the left half of `𝒳`.

If we add flag `pattern:u`, then the behavior will be correct:

```js run
alert( '𝒳'.match(/[𝒳𝒴]/u) ); // 𝒳
```

The similar situation occurs when looking for a range, such as `[𝒳-𝒴]`.

If we forget to add flag `pattern:u`, there will be an error:

```js run
'𝒳'.match(/[𝒳-𝒴]/); // Error: Invalid regular expression
```

The reason is that without flag `pattern:u` surrogate pairs are perceived as two characters, so `[𝒳-𝒴]` is interpreted as `[<55349><56499>-<55349><56500>]` (every surrogate pair is replaced with its codes). Now it's easy to see that the range `56499-55349` is invalid: its starting code `56499` is greater than the end `55349`. That's the formal reason for the error.

With the flag `pattern:u` the pattern works correctly:

```js run
// look for characters from 𝒳 to 𝒵
alert( '𝒴'.match(/[𝒳-𝒵]/u) ); // 𝒴
```
