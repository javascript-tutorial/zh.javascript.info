
起始标签是 `pattern:\[(b|url|quote)\]`。

匹配字符串直到遇到结束标签 —— 模式 `pattern:[\s\S]*?` 匹配任意字符，包括换行和用于结束标记的反向引用。

完整模式为：`pattern:\[(b|url|quote)\][\s\S]*?\[/\1\]`。

运行代码如下：

```js run
let reg = /\[(b|url|quote)\][\s\S]*?\[\/\1\]/g;

let str = `
  [b]hello![/b]
  [quote]
    [url]http://google.com[/url]
  [/quote]
`;

alert( str.match(reg) ); // [b]hello![/b],[quote][url]http://google.com[/url][/quote]
```

请注意我们要转义结束标签 `pattern:[/\1]` 中的斜杠，通常斜杠会关闭模式。
