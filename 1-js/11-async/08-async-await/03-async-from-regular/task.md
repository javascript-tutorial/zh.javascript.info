
# Call async from non-async

<<<<<<< HEAD
我们在一个「普通的」函数中，如何调用另一个 `async` 函数并且拿到返回值？
=======
We have a "regular" function. How to call `async` from it and use its result?
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

```js
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
<<<<<<< HEAD
  // ...这里怎么写？
  // 我们需要调用 async wait() 等待并拿到结果 10
  // 记住, 我们不能使用 「await」
}
```

P.S. 这个任务很简单，但是对于 async/await 新手来说却很常见。
=======
  // ...what to write here?
  // we need to call async wait() and wait to get 10
  // remember, we can't use "await"
}
```

P.S. The task is technically very simple, but the question is quite common for developers new to async/await.
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca
