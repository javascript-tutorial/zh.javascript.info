importance: 4

---

# "if" 重构为 "switch" 结构

用 `switch` 重写以下代码：

```js run
let a = +prompt('a?', '');

if (a == 0) {
  alert( 0 );
}
if (a == 1) {
  alert( 1 );
}

if (a == 2 || a == 3) {
  alert( '2,3' );
}
```

