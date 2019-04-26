# 字符集合

<<<<<<< HEAD:5-regular-expressions/03-regexp-character-classes/article.md
考虑一个实际的任务 —— 我们有一个电话号码 `"+7(903)-123-45-67"`，并且我们需要在这个字符串中找到所有的数字。其他的字符我们都不关心。

字符类是一种特殊符号，它匹配集合中的任何符号。 

举个例子，有一个 "数字" 类。它写作 `\d`。我们把它放进模式里，可以在搜索过程中匹配任何数字。

例如，正则表达式 `pattern:/\d/` 搜索单个数字：
=======
Consider a practical task -- we have a phone number `"+7(903)-123-45-67"`, and we need to turn it into pure numbers: `79035419441`.

To do so, we can find and remove anything that's not a number. Character classes can help with that.

A character class is a special notation that matches any symbol from a certain set.

For the start, let's explore a "digit" class. It's written as `\d`. We put it in the pattern, that means "any single digit".

For instance, the let's find the first digit in the phone number:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/03-regexp-character-classes/article.md

```js run
let str = "+7(903)-123-45-67";

let reg = /\d/;

alert( str.match(reg) ); // 7
```

<<<<<<< HEAD:5-regular-expressions/03-regexp-character-classes/article.md
上面的正则表达式例子没有指定全局属性，所以它只会搜索返回第一个匹配。

我们添加一个 `g` 标记来搜索所有数字：
=======
Without the flag `g`, the regular expression only looks for the first match, that is the first digit `\d`.

Let's add the `g` flag to find all digits:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/03-regexp-character-classes/article.md

```js run
let str = "+7(903)-123-45-67";

let reg = /\d/g;

<<<<<<< HEAD:5-regular-expressions/03-regexp-character-classes/article.md
alert( str.match(reg) ); // 匹配出的数组：7,9,0,3,1,2,3,4,5,6,7
```

## 最常使用的集合：\d \s \w
=======
alert( str.match(reg) ); // array of matches: 7,9,0,3,1,2,3,4,5,6,7

alert( str.match(reg).join('') ); // 79035419441
```
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/03-regexp-character-classes/article.md

刚才是数字的字符类。也有其他的字符类。

最常使用的有：

`\d`（"d" 来源于 "digit"）
: 一个数字：`0` 到 `9` 的一个字符。

`\s`（"s" 来源于 "space"）
: 一个空格符：包括空格，制表符和换行符。

`\w`（"w" 来源于 "word"）
: 一个单字字符：英语字母表中的一个字母或者一个数字或一个下划线。非英语字母（像西里尔字母或者印地语）不包含在 `\w` 里面。

<<<<<<< HEAD:5-regular-expressions/03-regexp-character-classes/article.md
举例来说，`pattern:\d\s\w` 是指一个数字后面跟着一个空格字符然后跟着一个语义字符，如 `"1 Z"`。

一个正则表达式可以同时包含普通字符和字符类。
=======
For instance, `pattern:\d\s\w` means a "digit" followed by a "space character" followed by a "wordly character", like `"1 a"`.

**A regexp may contain both regular symbols and character classes.**
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/03-regexp-character-classes/article.md

举个例子，`pattern:CSS\d` 匹配一个含有 `match:CSS` 且后面跟着一个数字的字符串。

```js run
let str = "CSS4 is cool";
let reg = /CSS\d/

alert( str.match(reg) ); // CSS4
```

我们也可以使用多个字符类。

```js run
alert( "I love HTML5!".match(/\s\w\w\w\w\d/) ); // 'HTML5'
```

该匹配为（每个字符类匹配出一个相应的结果字符）：

![](love-html5-classes.png)

## 单词边界：\b

<<<<<<< HEAD:5-regular-expressions/03-regexp-character-classes/article.md
单词边界 `pattern:\b` —— 是一个特殊的字符类。
=======
A word boundary `pattern:\b` -- is a special character class.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/03-regexp-character-classes/article.md

它表示的不是一个字符，而是字符间的边界。

举个例子，`pattern:\bJava\b` 能在字符串 `subject:Hello, Java!` 中匹配上 `match:Java`，但不能在 `subject:Hello, JavaScript!` 里匹配上。

```js run
alert( "Hello, Java!".match(/\bJava\b/) ); // Java
alert( "Hello, JavaScript!".match(/\bJava\b/) ); // null
```

<<<<<<< HEAD:5-regular-expressions/03-regexp-character-classes/article.md
某种意义上来说，边界具有“零宽度”，通常一个字符类表示结果中的一个字符（如一个字或一个数字），但在这个例子中不是。
=======
The boundary has "zero width" in a sense that usually a character class means a character in the result (like a wordly character or a digit), but not in this case.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/03-regexp-character-classes/article.md

边界是一个检测。

当正则表达式引擎在做搜索时，它会沿着字符串向前尝试找到匹配内容。在字符串的每个位置它（搜索引擎）都会尝试做匹配。

<<<<<<< HEAD:5-regular-expressions/03-regexp-character-classes/article.md
当一个模式中包含 `pattern:\b`，它检测字符串中的位置是否满足下面条件之一：

- 字符串开头，并且第一个字符串字符是 `\w`。
- 字符串结尾，并且最后一个字符串字符是 `\w`。
- 字符串内部：一边是 `\w`，另一边 —— 不是 `\w`。
=======
When the pattern contains `pattern:\b`, it tests that the position in string is a word boundary, that is one of three variants:

- Immediately before is `\w`, and immediately after -- not `\w`, or vise versa.
- At string start, and the first string character is `\w`.
- At string end, and the last string character is `\w`.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/03-regexp-character-classes/article.md

举个例子，在字符串 `subject:Hello, Java!` 中下面这些位置符合 `\b` 规则： 

![](hello-java-boundaries.png)

<<<<<<< HEAD:5-regular-expressions/03-regexp-character-classes/article.md
所以它将匹配 `pattern:\bHello\b` 和 `pattern:\bJava\b`，但不匹配 `pattern:\bHell\b`（因为 `l` 后面没有字边界）也不匹配 `Java!\b`（因为感叹号标识不是一个“字”字符，所以它后面也没有字边界）。
=======
So it matches `pattern:\bHello\b`, because:

1. At the beginning of the string the first `\b` test matches.
2. Then the word `Hello` matches.
3. Then `\b` matches, as we're between `o` and a space.

Pattern `pattern:\bJava\b` also matches. But not `pattern:\bHell\b` (because there's no word boundary after `l`) and not `Java!\b` (because the exclamation sign is not a wordly character, so there's no word boundary after it).

>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/03-regexp-character-classes/article.md

```js run
alert( "Hello, Java!".match(/\bHello\b/) ); // Hello
alert( "Hello, Java!".match(/\bJava\b/) );  // Java
alert( "Hello, Java!".match(/\bHell\b/) );  // null (no match)
alert( "Hello, Java!".match(/\bJava!\b/) ); // null (no match)
```

我们再一次查看发现 `pattern:\b` 会触发搜索引擎检查边界，所以 `pattern:Java\b` 仅在跟有一个字边界时找到 `match:Java`，并且不会在结果中添加一个字母。

通常我们使用 `\b` 寻找一个独立的英文字符。所以如果我们想要得到 `"Java"` 语言那么 `pattern:\bJava\b` 可以准确找到一个独立的单词，但作为`"JavaScript"` 的一部分时则会被忽略。

另一个例子：一个正则 `pattern:\b\d\d\b` 寻找单独的两位数字。换而言之，它要求在 `pattern:\d\d` 前后必须是一个不同于 `\w` 的标识（或者在字符串开头或结尾）。

```js run
alert( "1 23 456 78".match(/\b\d\d\b/g) ); // 23,78
```

```warn header="字符边界不适用于非英文字母"
字符边界校验 `\b` 用来检测 `\w` 和其他东西之间的一个边界。因为 `\w` 意味着一个英文单词（或一个数字或者一个下划线），所以这个检测对其他字符（像斯拉夫字母或者象形文字）不起作用。
```


<<<<<<< HEAD:5-regular-expressions/03-regexp-character-classes/article.md
## 反义集合

对于每一个字符类来说都存在其对应的“反义类”，用同样的单词表示，只不过是大写的。
=======
## Inverse classes

For every character class there exists an "inverse class", denoted with the same letter, but uppercased.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/03-regexp-character-classes/article.md

“反义”意味着它匹配所有其他字符，举例来说：

`\D`
: 非数字：除了 `\d` 的任何字符，例如一个字母。

`\S`
: 非空格：除了 `\s` 的任何字符，例如一个字母。

`\W`
: 非“字”字符：除了 `\w` 的任何东西。

`\B`
: 非边界：`\b` 的反向检测。

<<<<<<< HEAD:5-regular-expressions/03-regexp-character-classes/article.md
在章节的开头我们看到如何从电话 `subject:+7(903)-123-45-67` 中获取所有数字。让我们从字符串中获取一个“纯” 电话号码。
=======
In the beginning of the chapter we saw how to get all digits from the phone `subject:+7(903)-123-45-67`.

One way was to match all digits and join them:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/03-regexp-character-classes/article.md

```js run
let str = "+7(903)-123-45-67";

alert( str.match(/\d/g).join('') ); // 79031234567
```

<<<<<<< HEAD:5-regular-expressions/03-regexp-character-classes/article.md
另一个可选的方法是寻找所有非数字并且把他们从字符串中移除：
=======
An alternative, shorter way is to find non-digits `\D` and remove them from the string:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/03-regexp-character-classes/article.md


```js run
let str = "+7(903)-123-45-67";

alert( str.replace(/\D/g, "") ); // 79031234567
```

## 空格是正则字符

<<<<<<< HEAD:5-regular-expressions/03-regexp-character-classes/article.md
请注意正则表达式可以包含空格。他们被看作正则字符。  

通常我们不怎么注意空格。对于我们来说字符串 `subject:1-5` 和 `subject:1 - 5` 是几乎一样的。

但如果正则表达式不把空格纳入考量，它就不能工作了。
=======
Usually we pay little attention to spaces. For us strings `subject:1-5` and `subject:1 - 5` are nearly identical.

But if a regexp doesn't take spaces into account, it may fail to work.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/03-regexp-character-classes/article.md

让我们尝试查找被一个连接符分割的数字。

```js run
alert( "1 - 5".match(/\d-\d/) ); // null，不匹配！
```

<<<<<<< HEAD:5-regular-expressions/03-regexp-character-classes/article.md
我们在正则中加入空格修复它：
=======
Here we fix it by adding spaces into the regexp `pattern:\d - \d`:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/03-regexp-character-classes/article.md

```js run
alert( "1 - 5".match(/\d - \d/) ); // 1 - 5，现在生效了
```

<<<<<<< HEAD:5-regular-expressions/03-regexp-character-classes/article.md
当然，只有在需要匹配空格的时候才会用到它。多余的空格（就像任何多余的字符）会阻止匹配：
=======
**A space is a character. Equal in importance with any other character.**

Of course, spaces in a regexp are needed only if we look for them. Extra spaces (just like any other extra characters) may prevent a match:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/03-regexp-character-classes/article.md

```js run
alert( "1-5".match(/\d - \d/) ); // null, 因为字符串 1-5 没有空格
```

<<<<<<< HEAD:5-regular-expressions/03-regexp-character-classes/article.md
换而言之，正则表达式中所有字符都是有效的。空格也是。
=======
In other words, in a regular expression all characters matter, spaces too.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/03-regexp-character-classes/article.md

## 一个点号是任意字符

<<<<<<< HEAD:5-regular-expressions/03-regexp-character-classes/article.md
点号 `"."` 是一个特殊的字符类，可以匹配**换行符外的任意字符**。
=======
The dot `"."` is a special character class that matches "any character except a newline".
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/03-regexp-character-classes/article.md

举个例子：

```js run
alert( "Z".match(/./) ); // Z
```

或者在正则的中间：

```js run
let reg = /CS.4/;

alert( "CSS4".match(reg) ); // CSS4
alert( "CS-4".match(reg) ); // CS-4
alert( "CS 4".match(reg) ); // CS 4（空格也是一个字符）
```

请注意点号意味着“任何字符”，但不是“不存在的一个字符”。必须要有一个可以匹配的字符：

```js run
alert( "CS4".match(/CS.4/) ); // null，无匹配因为没有可供点号匹配的字符（译者注：“.”实际匹配了数字 “4”，正则最后的一个 “4” 才是无匹配项）
```

<<<<<<< HEAD:5-regular-expressions/03-regexp-character-classes/article.md
## 总结
=======
### The dotall "s" flag

Usually a dot doesn't match a newline character.

For instance, this doesn't match:

```js run
alert( "A\nB".match(/A.B/) ); // null (no match)

// a space character would match
// or a letter, but not \n
```

Sometimes it's inconvenient, we really want "any character", newline included.

That's what `s` flag does. If a regexp has it, then the dot `"."` match literally any character:

```js run
alert( "A\nB".match(/A.B/s) ); // A\nB (match!)
```

>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/03-regexp-character-classes/article.md

我们谈及的字符集合有：

<<<<<<< HEAD:5-regular-expressions/03-regexp-character-classes/article.md
- `\d` — 数字。
- `\D` — 非数字。
- `\s` — 空格标识，制表符，换行符。
- `\S` — 除了 `\s` 的所有。
- `\w` — 英文单词，数字，下划线 `'_'`。
- `\W` — 除了 `\w` 的所有。
- `'.'` — 除了一个换行符的任何字符。

如果我们想要检索一个像反斜杠或者一个点这样有特殊意义的字符，那么我们需要使用一个反斜杠 `pattern:\.` 进行转义。

请注意一个正则也可以包含像换行符 `\n` 这样特殊字符的字符串。这和字符类是没有冲突的，因为字符类是由其他字母组成的。
=======
There exist following character classes:

- `pattern:\d` -- digits.
- `pattern:\D` -- non-digits.
- `pattern:\s` -- space symbols, tabs, newlines.
- `pattern:\S` -- all but `pattern:\s`.
- `pattern:\w` -- English letters, digits, underscore `'_'`.
- `pattern:\W` -- all but `pattern:\w`.
- `pattern:.` -- any character if with the regexp `'s'` flag, otherwise any except a newline.

...But that's not all!

Modern JavaScript also allows to look for characters by their Unicode properties, for instance:

- A cyrillic letter is: `pattern:\p{Script=Cyrillic}` or `pattern:\p{sc=Cyrillic}`.
- A dash (be it a small hyphen `-` or a long dash `—`): `pattern:\p{Dash_Punctuation}` or `pattern:\p{pd}`.
- A currency symbol: `pattern:\p{Currency_Symbol}` or `pattern:\p{sc}`.
- ...And much more. Unicode has a lot of character categories that we can select from.

These patterns require `'u'` regexp flag to work. More about that in the chapter [](info:regexp-unicode).
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/03-regexp-character-classes/article.md
