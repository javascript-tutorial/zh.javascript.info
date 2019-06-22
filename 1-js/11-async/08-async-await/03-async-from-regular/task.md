
# Call async from non-async

我们在一个「普通的」函数中，如何调用另一个 `async` 函数并且拿到返回值？

```js
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // ...这里怎么写?
  // 我们需要调用 async wait() 等待并拿到结果 10
  // 记住, 我们不能使用 「await」
}
```

P.S. 这个任务很简单，但是对于 async/await 新手来说却很常见。
