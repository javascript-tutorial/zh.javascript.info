importance: 5

---

# 使用 finally 还是直接放在代码后面？

比较下面两个代码片段。

1. 第一个代码片段，使用 `finally` 在 `try..catch` 之后执行代码：

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
2. 第二个代码片段，将清空工作空间的代码放在了 `try..catch` 之后：

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

我们肯定需要在工作后进行清理，无论工作过程中是否有 error 都不影响。

在这儿使用 `finally` 更有优势，还是说两个代码片段效果一样？如果在这儿有这样的优势，如果需要，请举例说明。
