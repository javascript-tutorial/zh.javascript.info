
<<<<<<< HEAD
起始标签是 `pattern:\[(b|url|quote)\]`。

匹配字符串直到遇到结束标签 —— 模式 `pattern:[\s\S]*?` 匹配任意字符，包括换行和用于结束标记的反向引用。

完整模式为：`pattern:\[(b|url|quote)\][\s\S]*?\[/\1\]`。

运行代码如下：

```js run
let reg = /\[(b|url|quote)\][\s\S]*?\[\/\1\]/g;
=======
Opening tag is `pattern:\[(b|url|quote)\]`.

Then to find everything till the closing tag -- let's use the pattern `pattern:.*?` with flag `pattern:s` to match any character including the newline and then add a backreference to the closing tag.

The full pattern: `pattern:\[(b|url|quote)\].*?\[/\1\]`.

In action:

```js run
let regexp = /\[(b|url|quote)\].*?\[\/\1\]/gs;
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4

let str = `
  [b]hello![/b]
  [quote]
    [url]http://google.com[/url]
  [/quote]
`;

<<<<<<< HEAD
alert( str.match(reg) ); // [b]hello![/b],[quote][url]http://google.com[/url][/quote]
```

请注意我们要转义结束标签 `pattern:[/\1]` 中的斜杠，通常斜杠会关闭模式。
=======
alert( str.match(regexp) ); // [b]hello![/b],[quote][url]http://google.com[/url][/quote]
```

Please note that besides escaping `pattern:[` and `pattern:]`, we had to escape a slash for the closing tag `pattern:[\/\1]`, because normally the slash closes the pattern.
>>>>>>> d10b50ae7f67d91606a751926cb06aa06f10c1b4
