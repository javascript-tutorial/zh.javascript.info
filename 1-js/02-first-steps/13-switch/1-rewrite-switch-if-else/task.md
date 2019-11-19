importance: 5

---

# 将 "switch" 结构重写为 "if" 结构

将下面 `switch` 结构的代码写成 `if..else` 结构：

```js
switch (browser) {
  case 'Edge':
    alert( "You've got the Edge!" );
    break;

  case 'Chrome':
  case 'Firefox':
  case 'Safari':
  case 'Opera':
    alert( 'Okay we support these browsers too' );
    break;

  default:
    alert( 'We hope that this page looks ok!' );
}
```

