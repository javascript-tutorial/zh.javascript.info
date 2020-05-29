<<<<<<< HEAD
让我们使用 `eval` 来计算数学表达式：
=======
Let's use `eval` to calculate the maths expression:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js demo run
let expr = prompt("Type an arithmetic expression?", '2*3+2');

alert( eval(expr) );
```

<<<<<<< HEAD
用户可以输入任意文本或代码。

安全起见，并限制其仅进行算术运算，我们可以使用 [正则表达式](info:regular-expressions) 来检查 `expr`，以限制输入的内容只能包含数字和运算符。
=======
The user can input any text or code though.

To make things safe, and limit it to arithmetics only, we can check the `expr` using a [regular expression](info:regular-expressions), so that it only may contain digits and operators.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
