
# 在非 async 函数中调用 async 函数

我们有一个“普通”函数。如何在这个函数中调用 `async` 函数并使用其结果？

```js
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // ...这里怎么写？
  // 我们需要调用 async wait() 并等待以拿到结果 10
  // 记住，我们不能使用 "await"
}
```

P.S. 这个任务其实很简单，但是对于 async/await 新手开发者来说，这个问题却很常见。
