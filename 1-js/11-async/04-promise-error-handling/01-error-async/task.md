# setTimeout 中的错误

<<<<<<< HEAD:6-async/03-promise-chaining/02-error-async/task.md
你认为 `.catch` 会不会触发？请解释一下？
=======
What do you think? Will the `.catch` trigger? Explain your answer.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb:1-js/11-async/04-promise-error-handling/01-error-async/task.md

```js
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```
