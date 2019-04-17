
模式的开头显而易见：`pattern:<style`。

...然而不能简单地写出 `pattern:<style.*?>` 这样的表达式，因为会同时匹配 `match:<styler>`。

要么匹配 `match:<style` 后的一个空格，然后匹配任意内容；要么直接匹配结束符号 `match:>`。

最终的正则表达式为：`pattern:<style(>|\s.*?>)`。

运行代码如下：

```js run
let reg = /<style(>|\s.*?>)/g;

alert( '<style> <styler> <style test="...">'.match(reg) ); // <style>, <style test="...">
```
