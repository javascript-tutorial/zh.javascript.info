让我们使用 `eval` 来计算数学表达式：

```js demo run
let expr = prompt("Type an arithmetic expression?", '2*3+2');

alert( eval(expr) );
```

用户可以输入任意文本或代码。

安全起见，并限制其仅进行算术运算，我们可以使用 [正则表达式](info:regular-expressions) 来检查 `expr`，以限制输入的内容只能包含数字和运算符。
