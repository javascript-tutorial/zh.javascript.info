
这个例子告诉我们知道内部是如何运行的会很有帮助。

只需要把 `async` 函数返回值当成 promise，并且在后面加上 `.then` 即可：
```js run
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // 一秒后显示 10
*!*
  wait().then(result => alert(result));
*/!*
}

f();
```
