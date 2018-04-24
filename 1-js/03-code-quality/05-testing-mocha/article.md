# 使用 mocha 进行自动化测试

自动化测试在任务中将会被进一步使用。

它实际上是一个开发者的“教育最低限度”的一部分。

## 为什么我们需要测试？

当我们在写一个函数时，我们通常可以想象出它应该做什么：哪些参数会给出哪些结果。

在开发期间，我们可以通过运行程序来检查它并将结果与预期进行比较。例如，我们可以在控制台中这么做。

如果出了问题 —— 那么我们会修复代码，然后再一次运行并检查结果 —— 直到它工作为止。

但这样的手动“重新运行”是不完美的。

**当通过手动重新运行来测试代码时，很容易漏掉一些东西。**

例如，我们要创建一个函数 `f`。写一写代码，然后测试：`f(1)` 可以执行，但是 `f(2)` 不执行。我们修复了一下代码，现在 `f(2)` 可以执行了。看起来已经搞定了？但是我们忘了重新测试 `f(1)`。这样有可能会导致一个错误。

这是非常典型的。当我们在开发一些东西时，我们会保留很多可能需要的用例和想法。但是不要想着程序员在每一次改变之后都去检查所有的案例。所以很容易造成修复了一个问题却造成另一个问题的情况。

**自动化测试意味着除了代码之外，测试是单独写的。它们可以很容易地执行，并检查所有的主要用例。**

## 行为驱动开发（BDD）

我们来使用一种名为[行为驱动开发](http://en.wikipedia.org/wiki/Behavior-driven_development)或简而言之 BDD 的技术。许多项目都采用这种方法。BDD 不仅仅是测试，还包含更多东西。

**BDD 包含了三部分：测试、文档和示例。**

说的已经足够了，让我们来看一下例子吧。

## 开发中的 “pow”：规范

我们想要创建一个函数 `pow(x, n)` 来计算 `x` 的整数 `n` 次幂。我们假设 `n≥0`。

这个任务只是一个例子：JavaScript 中有一个 `**` 操作符可以做到。但是在这里我们专注于可以很好的应用于更复杂任务的开发流程上。

在创建函数 `pow` 的代码之前，我们可以想象函数应该做什么并且描述出来。

这样的描述被称作**规范**，看起来像这样：

```js
describe("pow", function() {

  it("raises to n-th power", function() {
    assert.equal(pow(2, 3), 8);
  });

});
```

一个规范包含三个主要的模块，你可以在上面看到。

`describe("title", function() { ... })`
: 表示我们正在描述的功能是什么。用于组织 "工人（workers）" -- `it` 代码块。在我们的例子中我们正在描述函数 `pow`。

`it("title", function() { ... })`
: `it` 里面的 "title" 中我们以**人类可读**的方式描述特定的用例，第二个参数是一个测试它的函数。

`assert.equal(value1, value2)`
: `it` 块中的代码。如果实现是正确的，它应该在执行的时候不产生任何错误。

    `assert.*` 函数用于检查 `pow` 是否按照预期工作。在这里我们使用了其中之一 —— `assert.equal`，它会比较参数，如果它们不相等则会抛出一个错误。这里它检查了 `pow(2, 3)` 的值是否等于 `8`。

    还有其他类型的比较和检查方法，我们以后将会了解到。

## 开发流程

开发流程通常看起来像这样：

1. 编写初始规范，测试最基本的功能。
2. 创建一个最初始实现。
3. 检查它是否工作，我们运行测试框架 [Mocha](http://mochajs.org/)（很快会有更多细节）来运行测试。错误会被显示出来。我们持续修正直到一切都能工作。
4. 现在我们有一个基于测试的能工作的初步实现。
5. 我们增加更多的用例到规范中，或许目前的程序实现还不支持。测试从失败开始。
6. 进行第 3 步，更新程序直到测试不会抛出错我。
7. 重复第 3 步到第 6 步，直到功能完善。

如此来看，开发是**迭代**的。我们写规范，实现它，确保测试通过，然后写更多的测试来确保它们工作等等。最后，我们有了一个能工作的实现和针对它的测试。

在我们的案例中，第一步已经完成了：针对 `pow` 我们有一个初始规范。因此让我们来实现它吧。但在此之前，让我们做一个针对规范的“零”运行，只是为了看到测试正在运行（它们都会失败）。

## 行为规范

在本教程中，我们将使用以下 JavaScript 库进行测试：

- [Mocha](http://mochajs.org/) —— 核心框架：提供了包括 `describe` 和 `it` 的通用型测试函数和运行测试的主函数。
- [Chai](http://chaijs.com) —— 提供很多断言支持的库。它可以用很多不同的断言。现在我们只需要用 `assert.equal`。
- [Sinon](http://sinonjs.org/) —— 用于监视函数、模拟内置函数和其他函数的库，我们稍后会用到它。

这些库都同时适用于浏览器端和服务器端。这里我们使用浏览器端。

包含这些框架和 `pow` 规范的完整的 HTML 页面：

```html src="index.html"
```

该页面可分为四部分：

1. `<head>` -- 为测试添加第三方库和样式文件。
2. `<script>` 包含测试函数，在我们的例子中 --和 `pow` 相关的代码。
3. 测试代码 -- 我们的案例中包含上面 `describe("pow", ...)` 那些代码的 `test.js`。
4. HTML 元素 `<div id="mocha">` 将会被 Mocha 用来输出结果。
5. 测试将以 `mocha.run()` 命令开始。

结果：

[iframe height=250 src="pow-1" border=1 edit]

到目前为止，测试失败了，出现了一个错误。这是合乎逻辑的：我们在 `pow` 是一个空函数，因此 `pow(2,3)` 返回了 `undefined` 而不是 `8`。

未来，我们会注意到有更高级的测试工具，像是 [karma](https://karma-runner.github.io/) 或其他的。因此设置很多不同的测试通常来说不是一个问题。

## 初始实现

为了可以通过测试，让我们来简单的实现一下 `pow`：

```js
function pow() {
  return 8; // :) 我们作弊啦！
}
```

哇哦，现在它可以工作了。

[iframe height=250 src="pow-min" border=1 edit]

## 改进规范

我们所做的这些 —— 绝对是在作弊。函数是不起作用的：尝试计算 `pow(3,4)` 的话就会得到一个不正确的结果，但是测试却通过了。

...但是这个情况却是相当典型的，在实际中有可能会发生的。测试通过了，但是函数却是错误的。我们的规范是不完善的。我们需要给它添加更多的测试用例。

这里我们又加了一个测试来看看是否是 `pow(3, 4) = 81`。

我们可以选择两种方式中的任意一种来组织测试代码：

1. 第一种 —— 在同一个 `it` 中再添加一个 `assert`：

    ```js
    describe("pow", function() {

      it("raises to n-th power", function() {
        assert.equal(pow(2, 3), 8);
    *!*
        assert.equal(pow(3, 4), 81);
    */!*
      });

    });
    ```
2. 第二种 —— 写两个测试：

    ```js
    describe("pow", function() {

      it("2 raised to power 3 is 8", function() {
        assert.equal(pow(2, 3), 8);
      });

      it("3 raised to power 3 is 27", function() {
        assert.equal(pow(3, 3), 27);
      });

    });
    ```

主要的区别是，当 `assert` 触发一个错误时，`it` 代码块会立即终止。因此，在第一种方式中如果第一个 `assert` 失败了，我们将永远不会看到第二个 `assert` 的结果。

保持测试代码的分离有助于获得更多关于正在发生的事情的信息，因此第二种方式更好一点。

除此之外，还有一个规范值得遵循。

**一个测试检测一个东西。**

如果我们检查一下测试代码发现在其中有两个相互独立的检测 —— 最好将它拆分成两个更简单的。

因此让我们继续使用第二种方式：

结果：

[iframe height=250 src="pow-2" edit border="1"]

我们可以猜想出，第二条测试失败了。当然啦，我们的函数总会返回 `8`，而 `assert` 期望的是 `27`。

## 改进实现

让我们写一些更加真实的代码来通过测试吧：

```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

为了确保函数可以很好地工作，我们来使用更多值测试它吧。除了手动的编写 `it` 代码块，我们可以使用 `for` 来生成他们：

```js
describe("pow", function() {

  function makeTest(x) {
    let expected = x * x * x;
    it(`${x} in the power 3 is ${expected}`, function() {
      assert.equal(pow(x, 3), expected);
    });
  }

  for (let x = 1; x <= 5; x++) {
    makeTest(x);
  }

});
```

结果：

[iframe height=250 src="pow-3" edit border="1"]

## 嵌套描述

我们打算添加更多的测试。但在此之前，我们需要注意到辅助函数 `makeTest` 和 `for` 应该被组合到一起。我们在其他代码中不需要 `makeTest`，它是在 `for` 中需要：他们公共的任务就是 `pow` 怎么提高给定的数值。

使用嵌套的 `describe` 来进行分组：

```js
describe("pow", function() {

*!*
  describe("raises x to power n", function() {
*/!*

    function makeTest(x) {
      let expected = x * x * x;
      it(`${x} in the power 3 is ${expected}`, function() {
        assert.equal(pow(x, 3), expected);
      });
    }

    for (let x = 1; x <= 5; x++) {
      makeTest(x);
    }

*!*
  });
*/!*

  // ...可以在这里写更多的测试代码，describe 和 it 都可以添加。
});
```

嵌套的 `describe` 为测试代码定义了一个新的 "subgroup"。 在输出中我们可以看到带有标题的缩进：

[iframe height=250 src="pow-4" edit border="1"]

在未来我们可以在顶级域中添加更多的 `it` 和 `describe` 以及它们自身的辅助函数，它们不会看到 `makeTest`。

````smart header="`before/after` and `beforeEach/afterEach`"
我们可以设置 `before/after` 函数来在运行测试之前/之后执行。也可以使用 `beforeEach/afterEach` 在执行**每一个** `it` 之前/之后执行。

例如：

```js no-beautify
describe("test", function() {

  before(() => alert("Testing started – before all tests"));
  after(() => alert("Testing finished – after all tests"));

  beforeEach(() => alert("Before a test – enter a test"));
  afterEach(() => alert("After a test – exit a test"));

  it('test 1', () => alert(1));
  it('test 2', () => alert(2));

});
```

运行顺序将为：

```
Testing started – before all tests (before)
Before a test – enter a test (beforeEach)
1
After a test – exit a test   (afterEach)
Before a test – enter a test (beforeEach)
2
After a test – exit a test   (afterEach)
Testing finished – after all tests (after)
```

[edit src="beforeafter" title="Open the example in the sandbox."]

通常地，`beforeEach/afterEach` (`before/each`) 用于初始化，清零计数器或做一些介于每个测试（或测试组）之间的事情。
````

## 延伸的规范

`pow` 的基础功能已经完成了。第一次迭代开发完成啦。当我们庆祝和喝香槟之后，让我们继续改进它吧。

正如它所说，函数 `pow(x, n)` 意味着使用正整数 `n` 来执行的。

如果要表示一个数学错误，JavaScript 函数通常会返回 `NaN`。让我们对于无效的 `n` 做同样的事情吧。

让我们首先将这个行为加到规范中(!)：

```js
describe("pow", function() {

  // ...

  it("for negative n the result is NaN", function() {
*!*
    assert.isNaN(pow(2, -1));
*/!*
  });

  it("for non-integer n the result is NaN", function() {
*!*
    assert.isNaN(pow(2, 1.5));
*/!*
  });

});
```

新测试的结果：

[iframe height=530 src="pow-nan" edit border="1"]

新加的测试失败了，因为我们的实现方式是不支持它们的。这就是 BDD 的做法：我们首先写一些失败的测试，然后去实现它们。

```smart header="Other assertions"

请注意断言语句 `assert.isNaN`：它用来检测 `NaN`。

在 Chai 中也有其他的断言，例如：

- `assert.equal(value1, value2)` —— 检测相等 `value1 == value2`。
- `assert.strictEqual(value1, value2)` —— 检测严格相等 `value1 === value2`。
- `assert.notEqual`, `assert.notStrictEqual` —— 刚好和上面做相反的检查。
- `assert.isTrue(value)` —— 检查 `value === true`。
- `assert.isFalse(value)` —— 检查 `value === false`。
- ...完整的列表在 [docs](http://chaijs.com/api/assert/)。
```

因此我们应该给 `pow` 再加几行：

```js
function pow(x, n) {
*!*
  if (n < 0) return NaN;
  if (Math.round(n) != n) return NaN;
*/!*

  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

现在它可以工作了，所有的测试也都通过了：

[iframe height=300 src="pow-full" edit border="1"]

[edit src="pow-full" title="Open the full final example in the sandbox."]

## 总结

在 BDD 中，规范先行，实现在后。最后我们同时拥有了规范和代码。

规范可以通过三种方式使用：

1. **测试** 保证代码正确工作。
2. **文档** —— `describe` 的标题以及 `it` 告诉我们函数做了什么。
3. **案例** —— 测试实际工作的例子显示了一个函数可以怎样被使用。

有了规范，我们可以安全地改进、修改甚至重写函数，并确保它仍然正确地工作。

这在一个函数会在多个地方使用的大型项目中尤其重要。当我们改变这样一个函数时，没有办法手动检查每个使用它们的地方是否仍旧正确。

如果没有测试，人们有两个办法：

1. 进行改变，不管其他的东西。然后我们的用户会发现 bug 并将其报告。如果我们能负担得起的话。
2. 如果错误比较严重，人们会变得害怕修改这样的函数。然后它就会越来越陈旧，长满了蜘蛛网，没有人会去触碰它，这样很不好。

**自动化测试过的代码刚好与其相反！**

如果这个项目被测试代码覆盖了，就不会出现这种问题。我们可以运行测试，并在几秒钟内看到大量的检查。

**另外，一个有良好测试的代码通常都有更好的架构。**

当然了，这是因为很容易可以修改和改进它。但不仅如此。

为了编写测试，代码应该以这样一种方式被组织起来 —— 每一个函数都有一个可被明确描述的任务，定义良好的输入和输出。这意味着从一开始就是一个好的架构。

在现实生活中有时候可能并不容易。有时很难在实际代码之前编写规范，因为还不清楚它应该如何表现。但一般来说，编写测试使得开发更快更稳定。

## 现在是什么？

在本教程后面，您将遇到许多包含了测试的任务。所以你会看到更多实用的例子。

编写测试需要良好的 JavaScript 知识。但我们刚刚开始学习它。因此，为了解决所有问题，现在您不需要编写测试，但是你应该已经能够阅读它们，即使它们比本章中的更复杂一些。
