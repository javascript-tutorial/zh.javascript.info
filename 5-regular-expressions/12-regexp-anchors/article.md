# 字符串的开始符 ^ 和结束符 $

脱字符 `'^'` 和美元符 `'$'` 在正则表达式中有特殊的含义，它们被叫做 “锚”。

脱字符 `^` 匹配文本的开始，而美元符 `$`——匹配文本的结束。

举个例子，让我们来匹配以 `Mary`开头的文本：

```js run
let str1 = "Mary had a little lamb, it's fleece was white as snow";
let str2 = 'Everywhere Mary went, the lamp was sure to go';

alert( /^Mary/.test(str1) ); // true
alert( /^Mary/.test(str2) ); // false
```

这个正则表达式 `^Mary` 意味着（匹配的是）：“字符串的开始然后是 Mary”。

现在让我们匹配所有以一个 email 结尾的文本：

为了去匹配一个 email，我们可以使用 `pattern:[-.\w]+@([\w-]+\.)+[\w-]{2,20}` 这个正则表达式，它不是完美的，但是大多数情况下都可以正常工作。

为了匹配以 email 结尾的文本，让我们给这个正则表达式添加一个 `$` 吧：

```js run
let reg = /[-.\w]+@([\w-]+\.)+[\w-]{2,20}$/g;

let str1 = 'My email is mail@site.com';
let str2 = 'Everywhere Mary went, the lamp was sure to go';

alert( reg.test(str1) ); // true
alert( reg.test(str2) ); // false
```

我们可以同时使用这两个符号来去检查字符串是不是完全匹配正则表达式的模式。这经常用于信息校验。

举个例子，我们想去确认一个 `字符串` 是以 `#` 加上6个十六进制数字所表示颜色。这个颜色字符串的模式是 `pattern:#[0-9a-f]{6}`。

要检查 *整个字符串* 完全匹配正则表达式的模式，我们用添加 `^...$` 的方法：

```js run
let str = "#abcdef";

alert( /^#[0-9a-f]{6}$/i.test(str) ); // true
```

正则表达式的引擎将会先校验文本的开始，然后是颜色字符串，最后立刻校验文本的结束。这样子正是我们所想要的。

```smart header="锚的长度为零"
锚就像 `\b` 一样，是测试时的一个字符，他们没有长度。

换句话说，它们不会检验到一个字符，但是它们会去限制正则表达式的引擎去检查（除字符外的）其它性质（例如文本开头/结尾）。
```

这些锚的性质会在正则表达式有一个 `m`（多行模式）flag 时改变。我们将会在下一章讨论它。
