
<<<<<<< HEAD
这个例子告诉我们知道内部是如何运行的会很有帮助。

只需要把 `async` 函数返回值当成 promise，并且在后面加上 `.then` 即可：
=======
That's the case when knowing how it works inside is helpful.

Just treat `async` call as promise and attach `.then` to it:
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a
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
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a
*!*
  wait().then(result => alert(result));
*/!*
}

f();
```
