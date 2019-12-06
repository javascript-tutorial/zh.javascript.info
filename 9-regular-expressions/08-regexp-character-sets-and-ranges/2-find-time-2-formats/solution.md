答案：`pattern:\d\d[-:]\d\d`。

```js run
let reg = /\d\d[-:]\d\d/g;
alert( "Breakfast at 09:00. Dinner at 21-30".match(reg) ); // 09:00, 21-30
```

请注意，破折号 `pattern:'-'` 在方括号中有特殊含义，但这个含义只有当它位于其它字符之间而不是开头或结尾时才会发生作用，所以我们并不需要转义它。
