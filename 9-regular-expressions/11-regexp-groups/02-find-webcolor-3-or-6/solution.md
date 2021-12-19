查找 3 位长的颜色 `#abc` 的正则表达式：`pattern:/#[a-f0-9]{3}/i`。


我们可以再添加 3 位可选的十六进制数字。这样刚好，因为要匹配的颜色编码由 3 位或 6 位组成。


这里使用量词 `pattern:{1,2}`，所以正则表达式为 `pattern:/#([a-f0-9]{3}){1,2}/i`。


这里将模式 `pattern:[a-f0-9]{3}` 包裹在字符串中以应用量词 `pattern:{1,2}`。

实现：

```js run
let regexp = /#([a-f0-9]{3}){1,2}/gi;

let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert( str.match(regexp) ); // #3f3 #AA00ef #abc
```

这里存在一个小问题：上面的模式会匹配 `subject:#abcd` 中的 `match:#abc`。为避免这一问题我们可以在最后添加 `pattern:\b`。

```js run
let regexp = /#([a-f0-9]{3}){1,2}\b/gi;

let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert( str.match(regexp) ); // #3f3 #AA00ef
```
