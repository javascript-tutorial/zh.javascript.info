# 检查 MAC 地址

网络接口的 [MAC 地址](https://en.wikipedia.org/wiki/MAC_address) 由 6 个以冒号分隔的两位十六进制数字组成。

例如：`subject:'01:32:54:67:89:AB'`。

编写一个检查字符串是否为 MAC 地址的正则表达式。

用例：
```js
let regexp = /你的正则表达式/;

alert( regexp.test('01:32:54:67:89:AB') ); // true

alert( regexp.test('0132546789AB') ); // false (没有冒号分隔)

alert( regexp.test('01:32:54:67:89') ); // false (5 个数字，必须为 6 个)

alert( regexp.test('01:32:54:67:89:ZZ') ) // false (尾部为 ZZ)
```
