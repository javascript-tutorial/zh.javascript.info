
# 用箭头函数重写

<<<<<<< HEAD:1-js/02-first-steps/15-function-expressions-arrows/1-rewrite-arrow/task.md
用箭头函数重写下面的函数表达式：
=======
Replace Function Expressions with arrow functions in the code below:
>>>>>>> 79417c6e73645d37f184f0cc7e4bc3353e85224f:1-js/02-first-steps/16-arrow-functions-basics/1-rewrite-arrow/task.md

```js run
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

ask(
  "Do you agree?",
  function() { alert("You agreed."); },
  function() { alert("You canceled the execution."); }
);
```
