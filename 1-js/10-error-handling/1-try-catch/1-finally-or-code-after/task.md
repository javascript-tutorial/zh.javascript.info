importance: 5

---

# 在 `finally` 中执行，还是在直接放在代码后面

比较下面两个代码片段。

1. 用 `finally` 执行 `try..catch` 之后的代码：

    ```js
    try {
      work work
    } catch (e) {
      handle errors
    } finally {
    *!*
      cleanup the working space
    */!*
    }
    ```
2. 第二个代码片段，把清空工作空间的代码放在 `try..catch` 之后，但并不包裹在 `finally` 里面。

    ```js
    try {
      work work
    } catch (e) {
      handle errors
    }

    *!*
    cleanup the working space
    */!*
    ```

<<<<<<< HEAD:1-js/08-error-handling/1-try-catch/1-finally-or-code-after/task.md
我们只是需要在代码执行完之后，清除工作空间，而不管是不是在执行的过程中遇到异常。
=======
We definitely need the cleanup after the work, doesn't matter if there was an error or not.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f:1-js/10-error-handling/1-try-catch/1-finally-or-code-after/task.md

那么，是用 `finally` 好呢还是两种方式都一样？如果哪种更好，请举例说明在什么情况下它会更好？
