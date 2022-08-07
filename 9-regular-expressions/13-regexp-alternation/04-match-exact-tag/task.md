# 查找完整标签

写出一个正则表达式，用于查找 `<style...>` 标签。它应该匹配完整的标签：该标签可能没有特性（attributes）`<style>`，也可能有很多特性 `<style type="..." id="...">`。

……同时正则表达式不应该匹配 `<styler>`！

例如：

```js
let regexp = /你的正则表达式/g;

alert( '<style> <styler> <style test="...">'.match(regexp) ); // <style>, <style test="...">
```
