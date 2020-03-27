
在这种情况下，知道其内部工作原理会很有帮助。

只需要把 `async` 调用当作 promise 对待，并在它的后面加上 `.then` 即可：
```js run
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // 1 秒后显示 10
*!*
  wait().then(result => alert(result));
*/!*
}

f();
```
