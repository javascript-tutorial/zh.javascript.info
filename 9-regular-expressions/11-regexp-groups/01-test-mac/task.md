# 检查 MAC 地址

网络接口的 [MAC 地址](https://en.wikipedia.org/wiki/MAC_address) 包含由冒号分隔的 6 个两位十六进制数字对。

例如：`subject:'01:32:54:67:89:AB'`。

创建一个正则表达式语句来检查给出的字符串是否为 MAC 地址。

用例：

```js
let regexp = /your regexp/;

alert( regexp.test('01:32:54:67:89:AB') ); // true

alert( regexp.test('0132546789AB') ); // false（没有冒号）

alert( regexp.test('01:32:54:67:89') ); // false (只有5个数字对，应为6个)

alert( regexp.test('01:32:54:67:89:ZZ') ) // false (最后的数字对为ZZ)
```
