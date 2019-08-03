
# 伪随机（Pseudo-random）generator

在许多场合下我们都需要随机数据。

其中之一就是用于测试。我们可能需要随机数据：文本，数字等以便很好的测试。

在 JavaScript 中，我们可以使用 `Math.random()`。但是如果出现问题，我们希望能使用完全相同的数据再重复进行测试。

为此，我们使用所谓的“种子伪随机（seeded pseudo-random）generators”。它们采用“种子”，即第一个值，然后使用公式生成下一个值。因此相同的种子 yield 相同的序列，整个数据流很容易复现。我们只需要记住种子并重复它即可。

一个公式示例如下，它生成一些统一分布的值：

```
next = previous * 16807 % 2147483647
```

如果我们使用 `1` 作为种子，它的值将会是：
1. `16807`
2. `282475249`
3. `1622650073`
4. ……等等……

那么，这里的任务是创建一个 generator 函数 `pseudoRandom(seed)`，它将 `seed` 作为参数然后以这个公式创建 generator。

使用范例：

```js
let generator = pseudoRandom(1);

alert(generator.next().value); // 16807
alert(generator.next().value); // 282475249
alert(generator.next().value); // 1622650073
```
