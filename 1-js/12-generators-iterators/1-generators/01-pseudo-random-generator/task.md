
# 伪随机 generator

在很多地方我们都需要随机数据。

其中之一就是测试。我们可能需要随机数据：文本，数字等，以便很好地进行测试。

在 JavaScript 中，我们可以使用 `Math.random()`。但是如果什么地方出现了问题，我们希望能使用完全相同的数据进行重复测试。

为此，我们可以使用所谓的“种子伪随机（seeded pseudo-random）generator”。它们将“种子（seed）”作为第一个值，然后使用公式生成下一个值。以便相同的种子（seed）可以产出（yield）相同的序列，因此整个数据流很容易复现。我们只需要记住种子并重复它即可。

这样的公式的一个示例如下，它可以生成一些均匀分布的值：

```
next = previous * 16807 % 2147483647
```

如果我们使用 `1` 作为种子，生成的值将会是：
1. `16807`
2. `282475249`
3. `1622650073`
4. ……等……

这里的任务是创建一个 generator 函数 `pseudoRandom(seed)`，它将 `seed` 作为参数并使用此公式创建 generator。

使用范例：

```js
let generator = pseudoRandom(1);

alert(generator.next().value); // 16807
alert(generator.next().value); // 282475249
alert(generator.next().value); // 1622650073
```
