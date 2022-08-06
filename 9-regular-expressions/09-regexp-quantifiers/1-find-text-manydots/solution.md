
答案：

```js run
let regexp = /\.{3,}/g;
alert( "Hello!... How goes?.....".match(regexp) ); // ..., .....
```

请注意，点（.）是一个特殊字符，所以我们必须对其进行转义，即将其插入为 `\.`。
