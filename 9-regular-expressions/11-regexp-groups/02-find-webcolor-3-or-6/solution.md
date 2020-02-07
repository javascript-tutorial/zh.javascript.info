查找三位颜色 `#abc` 的正则表达式为：`pattern:/#[a-f0-9]{3}/i`。

我们可以添加额外三位 16 进制数，不多也不少。这三位可能有，也可能没有。

最简单的方式 —— 直接附加上去：`pattern:/#[a-f0-9]{3}([a-f0-9]{3})?/i`。

但是，还有一种更讨巧的方法：`pattern:/#([a-f0-9]{3}){1,2}/i`。

这里我们把正则 `pattern:[a-f0-9]{3}` 放置在括号内，并且应用量词 `pattern:{1,2}`。

实际操作：

```js run
let reg = /#([a-f0-9]{3}){1,2}/gi;

let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert( str.match(reg) ); // #3f3 #AA0ef #abc
```

不过这里有个小问题：这个模式会在 `subject:#abcd` 中找到 `match:#abc`。为了避免这种情况，我们可以在最后加上 `pattern:\b`：

```js run
let reg = /#([a-f0-9]{3}){1,2}\b/gi;

let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert( str.match(reg) ); // #3f3 #AA00ef
```
