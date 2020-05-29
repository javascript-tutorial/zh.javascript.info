
<<<<<<< HEAD
在这种情况下，知道其内部工作原理会很有帮助。

只需要把 `async` 调用当作 promise 对待，并在它的后面加上 `.then` 即可：
=======
That's the case when knowing how it works inside is helpful.

Just treat `async` call as promise and attach `.then` to it:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
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
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
*!*
  wait().then(result => alert(result));
*/!*
}

f();
```
