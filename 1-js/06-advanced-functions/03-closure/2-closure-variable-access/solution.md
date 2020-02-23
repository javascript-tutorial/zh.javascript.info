答案：**Pete**.

下方代码中的函数 `work()` 在其被创建的位置通过外部词法环境引用获取 `name`：

![](lexenv-nested-work.svg)

所以这里的结果是 `"Pete"`。

但如果在 `makeWorker()` 中没有 `let name`，那么将继续向外搜索并最终找到全局变量，正如我们可以从上图中看到的那样。在这种情况下，结果将是 `"John"`。
