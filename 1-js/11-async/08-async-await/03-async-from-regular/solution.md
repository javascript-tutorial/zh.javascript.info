
<<<<<<< HEAD
在这种情况下，知道其内部工作原理会很有帮助。

只需要把 `async` 调用当作 promise 对待，并在它的后面加上 `.then` 即可：
=======
That's the case when knowing how it works inside is helpful.

Just treat `async` call as promise and attach `.then` to it:
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa
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
>>>>>>> e4e6a50b5762dd5dc4c0f0c58f870c64be39dcfa
*!*
  wait().then(result => alert(result));
*/!*
}

f();
```
