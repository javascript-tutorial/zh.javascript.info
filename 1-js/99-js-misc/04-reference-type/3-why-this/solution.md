
这里是解析。

1. 它是一个常规的方法调用。

<<<<<<< HEAD:1-js/04-object-basics/04-object-methods/3-why-this/solution.md
2. 同样，括号没有改变执行的顺序，点符号总是先执行。
=======
2. The same, parentheses do not change the order of operations here, the dot is first anyway.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9:1-js/99-js-misc/04-reference-type/3-why-this/solution.md

3. 这里我们有一个更复杂的 `(expression).method()` 调用。这个调用就像被分成了两行（代码）一样：

    ```js no-beautify
    f = obj.go; // 计算函数表达式
    f();        // 调用
    ```

    这里的 `f()` 是作为一个没有（设定）`this` 的函数执行的。

4. 与 `(3)` 相类似，在点符号 `.` 的左边也有一个表达式。

要解释 `(3)` 和 `(4)` 得到这种结果的原因，我们需要回顾一下属性访问器（点符号或方括号）返回的是引用类型的值。

除了方法调用之外的任何操作（如赋值 `=` 或 `||`），都会把它转换为一个不包含允许设置 `this` 信息的普通值。
