importance: 5

---

# 创建 new Accumulator

创建一个构造函数 `Accumulator(startingValue)`。

它创建的对象应该：

- 将“当前 value”存储在属性 `value` 中。起始值被设置为构造函数 `startingValue` 的参数。
- `read()` 方法应该使用 `prompt` 来读取一个新的数字并将其添加到 `value` 中。

换句话说，`value` 属性是所有用户输入值与初始值 `startingValue` 的总和。

这里是代码的演示：

```js
let accumulator = new Accumulator(1); // 初始 value 1
accumulator.read(); // 添加用户输入 value
accumulator.read(); // 添加用户输入 value
alert(accumulator.value); // 显示这些值的总和
```

[demo]
