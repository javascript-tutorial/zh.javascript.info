# 查找完整标签

写出一个正则表达式，用于查找 `<style...>` 标签。它应该匹配完整的标签：该标签可能是没有属性的标签 `<style>` 或是有很多属性的标签 `<style type="..." id="...">`。

......同时正则表达式不应该匹配 `<styler>`！

举例如下：

```js
let reg = /your regexp/g;

alert( '<style> <styler> <style test="...">'.match(reg) ); // <style>, <style test="...">
```
