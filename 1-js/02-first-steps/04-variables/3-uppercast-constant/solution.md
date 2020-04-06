我们通常用大写字母表示“硬编码（hard-coded）”的常量。或者，换句话说就是，当值在执行之前或在被写入代码的时候，我们就知道值是什么了。

在这个代码中 `birthday` 确实是这样的。因此我们可以使用大写。

<<<<<<< HEAD
在对照组中，`age` 是在程序运行时计算出的。今天我们有一个年龄，一年以后我们就会有另一个。它在某种意义上不会随着代码的执行而改变。但与 `birthday` 相比，它还是有一定的可变性：它是计算出来的，因此我们应该使用小写。
=======
In contrast, `age` is evaluated in run-time. Today we have one age, a year after we'll have another one. It is constant in a sense that it does not change through the code execution. But it is a bit "less of a constant" than `birthday`: it is calculated, so we should keep the lower case for it.
>>>>>>> c89ddc5d92195e08e2c32e30526fdb755fec4622
