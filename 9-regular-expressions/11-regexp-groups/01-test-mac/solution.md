一个两位的十六进制匹配串是`pattern:[0-9a-f]{2}`（假设已设置标志`pattern:i`）。

我们需要匹配数字对 `NN`，然后再重复匹配5次 `:NN`；

所以正则表达式为：`pattern:[0-9a-f]{2}(:[0-9a-f]{2}){5}`

现在我们需要这个匹配捕获整个文本：从文本开始直到结束。这里通过把模式包裹在 `pattern:^...$` 中实现。

最终：

```js run
let regexp = /^[0-9a-fA-F]{2}(:[0-9a-fA-F]{2}){5}$/i;

alert( regexp.test('01:32:54:67:89:AB') ); // true

alert( regexp.test('0132546789AB') ); // false (没有冒号)

alert( regexp.test('01:32:54:67:89') ); // false (只有5个数字对，应为6个)

alert( regexp.test('01:32:54:67:89:ZZ') ) // false (最后的数字对为ZZ)
```
