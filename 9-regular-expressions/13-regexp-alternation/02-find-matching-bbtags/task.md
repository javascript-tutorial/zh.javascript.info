# 查找 bbtag 对

“bb-tag” 形如 `[tag]...[/tag]`，`tag` 匹配 `b`、`url` 或 `quote` 中之一。

例如：
```
[b]text[/b]
[url]http://google.com[/url]
```

BB-tags 可以嵌套。但标签不能自嵌套，比如：

```
可以：
[url] [b]http://google.com[/b] [/url]
[quote] [b]text[/b] [/quote]

不可以：
[b][b]text[/b][/b]
```

标签可以包含换行，通常：

```
[quote]
  [b]text[/b]
[/quote]
```

构造一个正则表达式用于查找所有 BB-tags 及其内容。

例如：

```js
let regexp = /your regexp/flags;

let str = "..[url]http://google.com[/url]..";
alert( str.match(regexp) ); // [url]http://google.com[/url]
```

如果标签嵌套，那么我们需要记录匹配的外层标签（如果需要，我们可以继续在其内容中搜索）：

```js
let regexp = /你的正则表达式/flags;

let str = "..[url][b]http://google.com[/b][/url]..";
alert( str.match(regexp) ); // [url][b]http://google.com[/b][/url]
```
