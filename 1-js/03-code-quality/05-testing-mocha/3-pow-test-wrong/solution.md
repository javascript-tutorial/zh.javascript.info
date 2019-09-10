这些测试代码演示了开发人员在编写测试代码时遇到的一些疑惑。

我们这里实际上有三条测试，但是用了一个函数来放置 3 个断言语句。

有时用这种方式编写会更容易，但是如果发生错误，那么出错的情况就不那么明显了。

如果在复杂的执行流程中发生了一个错误，那么我们必须在那找出数据。 我们实际上必须**调试测试**。

将测试分成多个具有明确输入和输出的 `it` 代码块中会更好。

像是这样：
```js
describe("Raises x to power n", function() {
  it("5 in the power of 1 equals 5", function() {
    assert.equal(pow(5, 1), 5);
  });

  it("5 in the power of 2 equals 25", function() {
    assert.equal(pow(5, 2), 25);
  });

  it("5 in the power of 3 equals 125", function() {
    assert.equal(pow(5, 3), 125);
  });
});
```

我们使用 `describe` 和一组 `it` 代码块替换掉了单个的 `it`。现在，如果某个测试失败了，我们会清楚地看到数据是什么。

此外，我们可以通过编写`it.only` 而不是 `it` 来隔离单个测试并以独立模式运行它：


```js
describe("Raises x to power n", function() {
  it("5 in the power of 1 equals 5", function() {
    assert.equal(pow(5, 1), 5);
  });

*!*
  // Mocha 将只运行这个代码块
  it.only("5 in the power of 2 equals 25", function() {
    assert.equal(pow(5, 2), 25);
  });
*/!*

  it("5 in the power of 3 equals 125", function() {
    assert.equal(pow(5, 3), 125);
  });
});
```
