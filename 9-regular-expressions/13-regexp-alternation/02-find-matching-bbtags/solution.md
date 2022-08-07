
起始标签是 `pattern:\[(b|url|quote)\]`。

匹配字符串直到遇到结束标签 —— 让我们使用模式 `pattern:.*?` 和修饰符 `pattern:s` 来匹配包括换行符在内的任何字符，然后向结束标签添加反向引用。

完整模式为：`pattern:\[(b|url|quote)\].*?\[/\1]`。

代码运行如下：

```js run
let regexp = /\[(b|url|quote)].*?\[\/\1]/gs;

let str = `
  [b]hello![/b]
  [quote]
    [url]http://google.com[/url]
  [/quote]
`;

alert( str.match(regexp) ); // [b]hello![/b],[quote][url]http://google.com[/url][/quote]
```

请注意，除了转义 `pattern:[` 之外，我们还必须为结束标签 `pattern:[\/\1]` 转义一个斜线，因为通常斜线会关闭模式。
