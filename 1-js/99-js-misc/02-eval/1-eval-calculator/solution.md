让我们用`eval`函数来计算数学表达式：

```js demo run
let expr = prompt("Type an arithmetic expression?", '2*3+2');

alert( eval(expr) );
```

不过，用户也可以输入文本或者代码。

安全起见，我们可以用 [regular expression](info:regular-expressions) 来检查`eval`函数以限制用户只能输入算数表达式，这样输入的内容只能包含数字和运算符。