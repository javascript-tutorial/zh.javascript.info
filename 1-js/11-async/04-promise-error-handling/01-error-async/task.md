# setTimeout 中的错误

<<<<<<< HEAD:1-js/11-async/04-promise-error-handling/01-error-async/task.md
你怎么看？`.catch` 会被触发么？解释你的答案。
=======
What do you think? Will the `.catch` trigger? Explain your answer.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9:1-js/11-async/04-promise-error-handling/01-error-async/task.md

```js
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```
