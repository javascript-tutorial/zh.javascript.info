一个两位的十六进制数可以用 `pattern:[0-9a-f]{2}`（假设已设定修饰符 `pattern:i`）进行匹配。

我们需要匹配数字 `NN`，然后再重复 5 次 `:NN`（匹配更多数字）；

所以正则表达式为：`pattern:[0-9a-f]{2}(:[0-9a-f]{2}){5}`

现在让我们验证一下此匹配规则可以捕获整个文本：从开头开始，在结尾结束。这是通过将模式包装在 `pattern:^...$` 中实现的。

最终：

```js run
let regexp = /^[0-9a-f]{2}(:[0-9a-f]{2}){5}$/i;

alert( regexp.test('01:32:54:67:89:AB') ); // true

alert( regexp.test('0132546789AB') ); // false (没有分号分隔)

alert( regexp.test('01:32:54:67:89') ); // false (5 个数字，必须为 6 个)

alert( regexp.test('01:32:54:67:89:ZZ') ) // false (尾部为 ZZ)
```
