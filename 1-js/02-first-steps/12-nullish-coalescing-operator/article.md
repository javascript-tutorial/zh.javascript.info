# 空合并运算符 '??'

[recent browser="new"]

空合并运算符 `??` 提供了一种简短的语法用来获取列表中第一个已定义的变量。

`a ?? b` 的结果是:
- `a` 如果它不是 `null` 或 `undefined`,
- `b`, 其它情况。

所以, `x = a ?? b` 等同于

```js
x = (a !== null && a !== undefined) ? a : b;
```

下面是一个长一点的例子。

假设我们有一个用户，用变量 `firstName`, `lastName` 和 `nickName` 代表他的名字，姓氏和昵称。如果用户决定不输入，这些变量可能都未定义。

我们希望显示用户的名字为以上三个变量之一，或者 "Anonymous" 如果没有定义任何一个变量。

让我们使用 `??` 运算符选择第一个定义的变量：
 
```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// 显示第一个 not-null/undefined 变量值
*!*
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
*/!*
```

## 与 || 运算符比较

`||` 运算符可以与 `??` 运算符以同样的方式使用。实际上，我们可以用 `||` 替换上面示例中的 `??` 并得到相同的结果， 关于`||`运算符的介绍见 [前一章](info:logical-operators#or-finds-the-first-truthy-value).

两者重要的区别是：
- `||` 返回第一个 *真* 值。

- `??` 返回第一个 *已定义的* 值。

在我们处理 `null/undefined` 和 `0` 时，这个区别至关重要。

例如，观察下面的例子：

```js
height = height ?? 100;
```

如果 `height` 未定义，则会把 `100` 赋值给 `height` 。

让我们与 `||` 进行比较：

```js run
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
```

这里，`height || 100` 对 0 的处理等同于未定义，或任何取值为假的赋值。所以结果是 `100`。

`height ?? 100` 当且仅当 `height` 确实是 `null` 或 `undefined` 时返回 `100`。 所以 `alert` 按原样显示 height 的值为 `0`。

哪种行为更恰当取决于具体的用例。当0是height的一个合理取值时， `??` 运算符更合适。

## 优先级

`??` 运算符的优先级相当低： `7` 请参考 [MDN table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table)。

所以 `??` 运算符在大多数运算符之后被解释，但在 `=` 和 `?` 之前。

如果我们要用 `??` 在复合表达式中取值，需要考虑加括号：

```js run
let height = null;
let width = null;

// 重要：使用括号
let area = (height ?? 100) * (width ?? 50);

alert(area); // 5000
```

另外，如果我们忽略括号，因为 `*` 的优先级高于 `??` ，将优先执行。

所以运算过程等同于：

```js
// 或许不正确
let area = height ?? (100 * width) ?? 50;
```

这里还有一个语言级别的限制。

**出于安全因素，禁止将 `??` 与 `&&` 和 `||` 放在一起使用**

下列代码将导致一个语法错误：

```js run
let x = 1 && 2 ?? 3; // Syntax error
```

对这条限制存在争议，但它已经被加入语言规范用来避免编程错误，人们开始使用 `??` 替代 `||`。

可明确使用括号绕开这条限制：

```js run
*!*
let x = (1 && 2) ?? 3; // 起作用
*/!*

alert(x); // 2
```

## 总结

- 空合并运算符 `??` 提供了简洁的方式获取列表中"已定义的"值。

    它被用来为变量赋默认值

    ```js
    // set height=100, if height is null or undefined
    height = height ?? 100;
    ```

- `??` 运算符的优先级非常低，只略高于 `?` 和 `=`。
- 如不明确添加括号，不能与 `||` 或 `&&` 混用。
