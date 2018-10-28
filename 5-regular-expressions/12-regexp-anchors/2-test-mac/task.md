# 检验 MAC 地址

作为互联网接口的 [MAC 地址](https://en.wikipedia.org/wiki/MAC_address) 包括了6个以冒号 `:` 分隔的两位十六进制数。

举个例子：`subject:'01:32:54:67:89:AB'`。

请写一个能检查所有 MAC 地址的正则表达式。

用法：
```js
let reg = /your regexp/;

alert( reg.test('01:32:54:67:89:AB') ); // true

alert( reg.test('0132546789AB') ); // false (缺少冒号)

alert( reg.test('01:32:54:67:89') ); // false (只有5个数字，必须是6个数字)

alert( reg.test('01:32:54:67:89:ZZ') ) // false (ZZ 不是合法的十六进制)
```

