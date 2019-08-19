我们通常用大写字母表示“硬编码”的常量。或者，换句话说，当值在执行之前被知道并直接写入代码中的时候。

在这个代码中 `birthday` 确信是这样的。因此我们可以使用大写。

<<<<<<< HEAD
在对照组中，`age` 是在运行时计算出的。今天我们有一个年龄，一年以后我们就会有另一个。它在某种意义上不会通过代码的执行而改变。但是相比 `birthday` 它是“少一些常量”的，它是计算出的，因此我们应该使用小写。
=======
In contrast, `age` is evaluated in run-time. Today we have one age, a year after we'll have another one. It is constant in a sense that it does not change through the code execution. But it is a bit "less of a constant" than `birthday`: it is calculated, so we should keep the lower case for it.
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923
