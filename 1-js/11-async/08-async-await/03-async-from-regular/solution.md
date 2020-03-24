
<<<<<<< HEAD
在这种情况下，知道其内部工作原理会很有帮助。

只需要把 `async` 调用当作 promise 对待，并在它的后面加上 `.then` 即可：
=======
That's the case when knowing how it works inside is helpful.

Just treat `async` call as promise and attach `.then` to it:
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a
```js run
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
<<<<<<< HEAD
  // 1 秒后显示 10
=======
  // shows 10 after 1 second
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a
*!*
  wait().then(result => alert(result));
*/!*
}

f();
```
