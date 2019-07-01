该任务演示在比较中 postfix/prefix 形式如何导致不同的结果。

1. **从 1 到 4**

    ```js run
    let i = 0;
    while (++i < 5) alert( i );
    ```

<<<<<<< HEAD
    第一个值是 `i=1`，因为 `++i` 首先递增 `i` 然后返回新值。因此先比较 `1 < 5` 然后 `alert` 显示 `1`。

    然后按照 `2,3,4…` —— 数值一个接着一个出现。比较总是使用递增值，因为 `++` 在变量前。

    最终，`i=4` 递增到 `5`，当比较 `while(5 < 5)` 失败时，循环停止。所以没有显示 `5`。  
    
2. **从 1 到 5**
=======
    The first value is `i = 1`, because `++i` first increments `i` and then returns the new value. So the first comparison is `1 < 5` and the `alert` shows `1`.

    Then follow `2, 3, 4…` -- the values show up one after another. The comparison always uses the incremented value, because `++` is before the variable.

    Finally, `i = 4` is incremented to `5`, the comparison `while(5 < 5)` fails, and the loop stops. So `5` is not shown.
2. **From 1 to 5**
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

    ```js run
    let i = 0;
    while (i++ < 5) alert( i );
    ```

<<<<<<< HEAD
    第一个值也是 `i=1`。后缀形式 `i++` 递增 `i` 然后返回**旧**值，因此比较 `i++ < 5` 将使用 `i=0` （与 `++i < 5` 不同）。

    但 `alert` 调用是独立的。这是在递增和比较之后执行的另一条语句。因此它得到了当前的 `i=1`。

    接下来是 `2,3,4…`

    我们在 `i=4` 时暂停，前缀形式 `++i` 会递增并在比较中使用 `5`。但我们这里还有后缀形式 `i++`。因此，它将 `i` 递增到 `5`，但返回旧值。因此实际比较的是 `while(4 < 5)` —— true，控制继续执行 `alert`。

    `i=5` 是最后一个值，因为下一步 `while(5 < 5)` 为 false。
=======
    The first value is again `i = 1`. The postfix form of `i++` increments `i` and then returns the *old* value, so the comparison `i++ < 5` will use `i = 0` (contrary to `++i < 5`).

    But the `alert` call is separate. It's another statement which executes after the increment and the comparison. So it gets the current `i = 1`.

    Then follow `2, 3, 4…`

    Let's stop on `i = 4`. The prefix form `++i` would increment it and use `5` in the comparison. But here we have the postfix form `i++`. So it increments `i` to `5`, but returns the old value. Hence the comparison is actually `while(4 < 5)` -- true, and the control goes on to `alert`.

    The value `i = 5` is the last one, because on the next step `while(5 < 5)` is false.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd
