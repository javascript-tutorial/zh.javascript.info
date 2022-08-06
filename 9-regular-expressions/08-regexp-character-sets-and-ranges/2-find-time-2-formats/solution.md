答案：`pattern:\d\d[-:]\d\d`。

```js run
let regexp = /\d\d[-:]\d\d/g;
alert( "Breakfast at 09:00. Dinner at 21-30".match(regexp) ); // 09:00, 21-30
```

请注意，破折号 `pattern:'-'` 在方括号中有特殊含义，但只有当它位于其它字符之间而不是开头或结尾时这个含义才会起作用，所以我们不需要对其进行转义。
