前两个 `case` 分别执行各自的代码，第三个 `case` 会和下一个 `case` 一起执行：

```js run
let a = +prompt('a?', '');

switch (a) {
  case 0:
    alert( 0 );
    break;

  case 1:
    alert( 1 );
    break;

  case 2:
  case 3:
    alert( '2,3' );
*!*
    break;
*/!*
}
```

请注意：最后的 `break` 不是必须的。但是为了让代码可扩展我们要把它加上。

有可能之后我们想要再添加一个 `case`，例如 `case 4`。如果我们忘记在它之前添加一个 break，那么在 case 3 结束时会出现错误。所以这是一种保险。

