<<<<<<< HEAD
两位十六进制数的模式是 `[0-9a-f]{2}`（假设 `i` flag 已被启用）。

我们需要一个 `NN` 这种形式的数字，后面还需要五个 `:NN` 形式的数字。

最终的正则表达式是：`[0-9a-f]{2}(:[0-9a-f]{2}){5}`

现在让我们看看此模式如何匹配整个文本：从 `^` 处开始，到 `$` 这里结束。通过将匹配模式包裹在 `^...$` 来完成的。

最终结果：

```js run
let reg = /^[0-9a-fA-F]{2}(:[0-9a-fA-F]{2}){5}$/i;

alert( reg.test('01:32:54:67:89:AB') ); // true

alert( reg.test('0132546789AB') ); // false（缺少冒号）

alert( reg.test('01:32:54:67:89') ); // false（只有 5 个数字，必须是 6 个数字）

alert( reg.test('01:32:54:67:89:ZZ') ) // false（ZZ 不是合法的十六进制）
=======
A two-digit hex number is `pattern:[0-9a-f]{2}` (assuming the flag `pattern:i` is set).

We need that number `NN`, and then `:NN` repeated 5 times (more numbers);

The regexp is: `pattern:[0-9a-f]{2}(:[0-9a-f]{2}){5}`

Now let's show that the match should capture all the text: start at the beginning and end at the end. That's done by wrapping the pattern in `pattern:^...$`.

Finally:

```js run
let regexp = /^[0-9a-fA-F]{2}(:[0-9a-fA-F]{2}){5}$/i;

alert( regexp.test('01:32:54:67:89:AB') ); // true

alert( regexp.test('0132546789AB') ); // false (no colons)

alert( regexp.test('01:32:54:67:89') ); // false (5 numbers, need 6)

alert( regexp.test('01:32:54:67:89:ZZ') ) // false (ZZ in the end)
>>>>>>> 10c7807f49122f475f7cda5d07a324247091c080
```
