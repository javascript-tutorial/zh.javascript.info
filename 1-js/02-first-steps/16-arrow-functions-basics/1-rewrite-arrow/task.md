<<<<<<< HEAD:1-js/02-first-steps/16-arrow-functions-basics/1-rewrite-arrow/task.md

# 用箭头函数重写

用箭头函数重写下面的函数表达式：

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
=======

# Rewrite with arrow functions

Replace Function Expressions with arrow functions in the code below:

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
>>>>>>> 524d59884650be539544c34f71d821432b7280fd:1-js/02-first-steps/16-arrow-functions-basics/1-rewrite-arrow/task.md
