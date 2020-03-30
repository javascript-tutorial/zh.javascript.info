
<<<<<<< HEAD
# 伪随机 generator

在很多地方我们都需要随机数据。

其中之一就是测试。我们可能需要随机数据：文本，数字等，以便很好地进行测试。

在 JavaScript 中，我们可以使用 `Math.random()`。但是如果什么地方出现了问题，我们希望能使用完全相同的数据进行重复测试。

为此，我们可以使用所谓的“种子伪随机（seeded pseudo-random）generator”。它们将“种子（seed）”作为第一个值，然后使用公式生成下一个值。以便相同的种子（seed）可以产出（yield）相同的序列，因此整个数据流很容易复现。我们只需要记住种子并重复它即可。

这样的公式的一个示例如下，它可以生成一些均匀分布的值：
=======
# Pseudo-random generator

There are many areas where we need random data.

One of them is testing. We may need random data: text, numbers, etc. to test things out well.

In JavaScript, we could use `Math.random()`. But if something goes wrong, we'd like to be able to repeat the test, using exactly the same data.

For that, so called "seeded pseudo-random generators" are used. They take a "seed", the first value, and then generate the next ones using a formula so that the same seed yields the same sequence, and hence the whole flow is easily reproducible. We only need to remember the seed to repeat it.

An example of such formula, that generates somewhat uniformly distributed values:
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

```
next = previous * 16807 % 2147483647
```

<<<<<<< HEAD
如果我们使用 `1` 作为种子，生成的值将会是：
1. `16807`
2. `282475249`
3. `1622650073`
4. ……等……

这里的任务是创建一个 generator 函数 `pseudoRandom(seed)`，它将 `seed` 作为参数并使用此公式创建 generator。

使用范例：
=======
If we use `1` as the seed, the values will be:
1. `16807`
2. `282475249`
3. `1622650073`
4. ...and so on...

The task is to create a generator function `pseudoRandom(seed)` that takes `seed` and creates the generator with this formula.

Usage example:
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

```js
let generator = pseudoRandom(1);

alert(generator.next().value); // 16807
alert(generator.next().value); // 282475249
alert(generator.next().value); // 1622650073
```
