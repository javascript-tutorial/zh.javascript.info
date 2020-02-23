答案是：**0，1。**

函数 `counter` 和 `counter2` 是通过 `makeCounter` 的不同调用创建的。

因此，它们具有独立的外部词法环境，每一个都有自己的 `count`。
