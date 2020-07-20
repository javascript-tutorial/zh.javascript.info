
# 用箭头函数重写

<<<<<<< HEAD:1-js/02-first-steps/17-arrow-functions-basics/1-rewrite-arrow/task.md
用箭头函数重写下面的函数表达式：
=======
Replace Function Expressions with arrow functions in the code below:
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc:1-js/02-first-steps/17-arrow-functions-basics/1-rewrite-arrow/task.md

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
