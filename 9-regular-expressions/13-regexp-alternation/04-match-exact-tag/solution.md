
模式的开头很明显：`pattern:<style`。

……但我们不能简单地将表达式写为 `pattern:<style.*?>`，因为会匹配上 `match:<styler>`。

我们要匹配的是在 `match:<style` 之后紧跟着一个空格然后是可选的其他内容，或者直接是闭标签 `match:>`。

写成正则表达式即为：`pattern:<style(>|\s.*?>)`。

代码运行如下：

```js run
let regexp = /<style(>|\s.*?>)/g;

alert( '<style> <styler> <style test="...">'.match(regexp) ); // <style>, <style test="...">
```
