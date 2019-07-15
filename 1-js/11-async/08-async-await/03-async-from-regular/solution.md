
<<<<<<< HEAD
这个例子告诉我们知道内部是如何运行的会很有帮助。

只需要把 `async` 函数返回值当成 promise，并且在后面加上 `.then` 即可：
=======
That's the case when knowing how it works inside is helpful.

Just treat `async` call as promise and attach `.then` to it:
>>>>>>> be342e50e3a3140014b508437afd940cd0439ab7
```js run
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
<<<<<<< HEAD
  // 一秒后显示 10
=======
  // shows 10 after 1 second
>>>>>>> be342e50e3a3140014b508437afd940cd0439ab7
*!*
  wait().then(result => alert(result));
*/!*
}

f();
```
