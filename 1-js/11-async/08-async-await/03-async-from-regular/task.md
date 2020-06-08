
<<<<<<< HEAD
# 在非 async 函数中调用 async 函数

我们有一个“普通”函数。如何在这个函数中调用 `async` 函数并使用其结果？
=======
# Call async from non-async

We have a "regular" function. How to call `async` from it and use its result?
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

```js
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
<<<<<<< HEAD
  // ...这里怎么写？
  // 我们需要调用 async wait() 并等待以拿到结果 10
  // 记住，我们不能使用 "await"
}
```

P.S. 这个任务其实很简单，但是对于 async/await 新手开发者来说，这个问题却很常见。
=======
  // ...what to write here?
  // we need to call async wait() and wait to get 10
  // remember, we can't use "await"
}
```

P.S. The task is technically very simple, but the question is quite common for developers new to async/await.
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8
