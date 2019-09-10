
Solution:

```js run
let reg = /\.{3,}/g;
alert( "Hello!... How goes?.....".match(reg) ); // ..., .....
```

需要注意的是，点号（.）是一个特殊字符，因此我们需要将其转义并作为 `\.` 插入语句。
