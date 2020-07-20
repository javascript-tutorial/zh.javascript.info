<<<<<<< HEAD
原因是 prompt 以字符串的形式返回用户的输入。

所以变量的值分别为 `"1"` 和 `"2"`。
=======
The reason is that prompt returns user input as a string.

So variables have values `"1"` and `"2"` respectively.
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

```js run
let a = "1"; // prompt("First number?", 1);
let b = "2"; // prompt("Second number?", 2);

alert(a + b); // 12
```

<<<<<<< HEAD
我们应该做的是，在 `+` 之前将字符串转换为数字。例如，使用 `Number()` 或在 `prompt` 前加 `+`。

例如，就在 `prompt` 之前加 `+`：
=======
What we should to is to convert strings to numbers before `+`. For example, using `Number()` or prepending them with `+`.

For example, right before `prompt`:
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

```js run
let a = +prompt("First number?", 1);
let b = +prompt("Second number?", 2);

alert(a + b); // 3
```

<<<<<<< HEAD
或在 `alert` 中：
=======
Or in the `alert`:
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

```js run
let a = prompt("First number?", 1);
let b = prompt("Second number?", 2);

alert(+a + +b); // 3
```

<<<<<<< HEAD
在最新的代码中，同时使用一元和二元的 `+`。看起来很有趣，不是吗？
=======
Using both unary and binary `+` in the latest code. Looks funny, doesn't it?
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc
