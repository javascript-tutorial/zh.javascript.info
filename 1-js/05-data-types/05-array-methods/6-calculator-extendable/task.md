importance: 5

---

# 创建一个可扩展的 calculator

创建一个构造函数 `Calculator` 创建可扩展的 calculator 对象。

该任务由两部分组成。

1. 首先，实现 `calculate(str)` 方法，“NUMBER operator NUMBER”（空格分隔），其格式为“1 + 2”，并返回结果。所以要实现加`+`和减`-`。

    用法示例：

    ```js
    let calc = new Calculator;

    alert( calc.calculate("3 + 7") ); // 10
    ```
<<<<<<< HEAD:1-js/04-object-basics/06-constructor-new/4-calculator-extendable/task.md
2. 然后添加 calculate 新操作的方法 `addOperator(name, func)`。它需要运算符 `name` 和实现它的双参数函数 `func(a,b)`。
=======
2. Then add the method `addMethod(name, func)` that teaches the calculator a new operation. It takes the operator `name` and the two-argument function `func(a,b)` that implements it.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb:1-js/05-data-types/05-array-methods/6-calculator-extendable/task.md

    例如，我们添加乘法`*`，除法`/`和求幂`**`：

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
- 添加错误处理。
