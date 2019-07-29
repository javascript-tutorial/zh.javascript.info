为了精确实现 `switch` 的功能，`if` 必须使用严格相等 `'==='`。

对于给定的字符串，一个简单的 `'=='` 也可以。

```js no-beautify
if(browser == 'Edge') {
  alert("У вас браузер Edge!");
} else if (browser == 'Chrome'
 || browser == 'Firefox'
 || browser == 'Safari'
 || browser == 'Opera') {
  alert( 'Мы поддерживаем и эти браузерыo' );
} else {
  alert( 'Надеемся, что эта страница выглядит хорошо!' );
}
```

请注意：`browser == 'Chrome' || browser == 'Firefox' …` 结构分成多行更容易阅读。

但 `switch` 结构更清晰明了。
