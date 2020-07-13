# setTimeout 中的错误

<<<<<<< HEAD:1-js/11-async/04-promise-error-handling/01-error-async/task.md
你怎么看？`.catch` 会被触发么？解释你的答案。
=======
What do you think? Will the `.catch` trigger? Explain your answer.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439:1-js/11-async/04-promise-error-handling/01-error-async/task.md

```js
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```
