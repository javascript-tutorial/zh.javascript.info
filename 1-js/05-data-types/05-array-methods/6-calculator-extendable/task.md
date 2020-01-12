importance: 5

---

# 创建一个可扩展的 calculator

创建一个构造函数 `Calculator`，创建可扩展的 calculator 对象。

该任务由两部分组成。

1. 首先，实现 `calculate(str)` 方法，接受像 `"1 + 2"` 这样格式为“数字 运算符 数字”（以空格分隔）的字符串，并返回结果。该方法需要能够理解加号 `+` 和减号 `-`。

    用法示例：

    ```js
    let calc = new Calculator;

    alert( calc.calculate("3 + 7") ); // 10
    ```
2. 然后添加 calculator 的新操作方法 `addOperator(name, func)`。它需要运算符 `name` 和实现它的双参数函数 `func(a,b)`。

    例如，我们添加乘法 `*`，除法 `/` 和求幂 `**`：

    ```js
    let powerCalc = new Calculator;
    powerCalc.addMethod("*", (a, b) => a * b);
    powerCalc.addMethod("/", (a, b) => a / b);
    powerCalc.addMethod("**", (a, b) => a ** b);

    let result = powerCalc.calculate("2 ** 3");
    alert( result ); // 8
    ```

- 此任务中没有括号或复杂的表达式。
- 数字和运算符用一个空格分隔。
- 你可以自行选择是否添加错误处理。
