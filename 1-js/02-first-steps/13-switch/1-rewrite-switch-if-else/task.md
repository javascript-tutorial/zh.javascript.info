importance: 5

---

# "switch" 重构为 "if" 结构

对应以下 `switch`，使用 `if..else` 编写代码：

```js
switch (browser) {
  case 'Edge':
    alert( "У вас браузер Edge!" );
    break;

  case 'Chrome':
  case 'Firefox':
  case 'Safari':
  case 'Opera':
    alert( 'Мы поддерживаем и эти браузеры' );
    break;

  default:
    alert( 'Надеемся, что эта страница выглядит хорошо!' );
}
```
