<<<<<<< HEAD
答案：**Pete**.

下方代码中的函数 `work()` 在其被创建的位置通过外部词法环境引用获取 `name`：

![](lexenv-nested-work.svg)

所以这里的结果是 `"Pete"`。

但如果在 `makeWorker()` 中没有 `let name`，那么将继续向外搜索并最终找到全局变量，正如我们可以从上图中看到的那样。在这种情况下，结果将是 `"John"`。
=======
The answer is: **Pete**.

The `work()` function in the code below gets `name` from the place of its origin through the outer lexical environment reference:

![](lexenv-nested-work.svg)

So, the result is `"Pete"` here.

But if there were no `let name` in `makeWorker()`, then the search would go outside and take the global variable as we can see from the chain above. In that case the result would be `"John"`.
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a
