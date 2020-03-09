<<<<<<< HEAD
我们需要找到注释的起始位置 `match:<!--`，然后获取字符直到注释的末尾 `match:-->`。

首先想到的是 `pattern:<!--.*?-->` —— 惰性量词使得点（.）停在 `match:-->` 之前。

但是在 Javascript 中，一个点（.）表示除换行符之外的任意字符。所以这是无法匹配多行注释的。

我们可以用 `pattern:[\s\S]`，而不是用点（.）来匹配“任何东西”：

```js run
let reg = /<!--[\s\S]*?-->/g;
=======
We need to find the beginning of the comment `match:<!--`, then everything till the end of `match:-->`.

An acceptable variant is `pattern:<!--.*?-->` -- the lazy quantifier makes the dot stop right before `match:-->`. We also need to add flag `pattern:s` for the dot to include newlines.

Otherwise multiline comments won't be found:

```js run
let regexp = /<!--.*?-->/gs;
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

let str = `... <!-- My -- comment
 test --> ..  <!----> ..
`;

<<<<<<< HEAD
alert( str.match(reg) ); // '<!-- My -- comment \n test -->', '<!---->'
=======
alert( str.match(regexp) ); // '<!-- My -- comment \n test -->', '<!---->'
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a
```
