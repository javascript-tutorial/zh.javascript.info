# 空值合并运算符 '??'

[recent browser="new"]

在本文中，我们将值既不是 `null` 也不是 `undefined` 的表达式称为“已定义的（defined）”。

空值合并运算符（nullish coalescing operator）的写法为两个问号 `??`。

`a ?? b` 的结果是：
- 如果 `a` 是已定义的，则结果为 `a`，
- 如果 `a` 不是已定义的，则结果为 `b`。


换句话说，如果第一个参数不是 `null/undefined`，则 `??` 返回第一个参数。否则，返回第二个参数。

空值合并运算符并不是什么全新的东西。它只是一种获得两者中的第一个“已定义的”值的不错的语法。

我们可以使用我们已知的运算符重写 `result = a ?? b`，像这样：

```js
result = (a !== null && a !== undefined) ? a : b;
```

通常 `??` 的使用场景是，为可能是未定义的变量提供一个默认值。

例如，在这里，如果 `user` 是未定义的，我们则显示 `Anonymous`：

```js run
let user;

alert(user ?? "Anonymous"); // Anonymous
```

当然，如果 `user` 的值为除 `null/undefined` 外的任意值，那么我们看到的将是它：

```js run
let user = "John";

alert(user ?? "Anonymous"); // John
```

我们还可以使用 `??` 序列从一系列的值中选择出第一个非 `null/undefined` 的值。

假设我们在变量 `firstName`、`lastName` 或 `nickName` 中存储着一个用户的数据。如果用户决定不输入值，则所有这些变量的值都可能是未定义的。

我们想使用这些变量之一显示用户名，如果这些变量的值都是未定义的，则显示 "Anonymous"。

让我们使用 `??` 运算符来实现这一需求：

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// 显示第一个已定义的值：
*!*
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
*/!*
```

## 与 || 比较

或运算符 `||` 可以以与 `??` 运算符相同的方式使用。像我们在 [上一章](info:logical-operators#or-finds-the-first-truthy-value) 所讲的那样。

例如，在上面的代码中，我们可以用 `||` 替换掉 `??`，也可以获得相同的结果：

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// 显示第一个真值：
*!*
alert(firstName || lastName || nickName || "Anonymous"); // Supercoder
*/!*
```

或 `||` 运算符自 JavaScript 诞生就存在，因此开发者长期将其用于这种目的。

另一方面，空值合并运算符 `??` 是最近才被添加到 JavaScript 中的，它的出现是因为人们对 `||` 不太满意。

它们之间重要的区别是：
- `||` 返回第一个 **真** 值。
- `??` 返回第一个 **已定义的** 值。

换句话说，`||` 无法区分 `false`、`0`、空字符串 `""` 和 `null/undefined`。它们都一样 —— 假值（falsy values）。如果其中任何一个是 `||` 的第一个参数，那么我们将得到第二个参数作为结果。

不过在实际中，我们可能只想在变量的值为 `null/undefined` 时使用默认值。也就是说，当该值确实未知或未被设置时。

例如，考虑下面这种情况：

```js run
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
```

- `height || 100` 首先会检查 `height` 是否为一个假值，发现它确实是。
    - 所以，结果为第二个参数，`100`。
- `height ?? 100` 首先会检查 `height` 是否为 `null/undefined`，发现它不是。
    - 所以，结果为 `height` 的原始值，`0`。

如果高度 `0` 为有效值，则不应将其替换为默认值，所以 `??` 能够得出正确的结果。

## 优先级

`??` 运算符的优先级相当低：在 [MDN table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table) 中为 `5`。因此，`??` 在 `=` 和 `?` 之前计算，但在大多数其他运算符（例如，`+` 和 `*`）之后计算。

因此，如果我们需要在还有其他运算符的表达式中使用 `??` 进行取值，需要考虑加括号：

```js run
let height = null;
let width = null;

// 重要：使用括号
let area = (height ?? 100) * (width ?? 50);

alert(area); // 5000
```

否则，如果我们省略了括号，则由于 `*` 的优先级比 `??` 高，它会先执行，进而导致错误的结果。

```js
// 没有括号
let area = height ?? 100 * width ?? 50;

// ……与下面这行代码的计算方式相同（应该不是我们所期望的）：
let area = height ?? (100 * width) ?? 50;
```

### ?? 与 && 或 || 一起使用

出于安全原因，JavaScript 禁止将 `??` 运算符与 `&&` 和 `||` 运算符一起使用，除非使用括号明确指定了优先级。

下面的代码会触发一个语法错误：

```js run
let x = 1 && 2 ?? 3; // Syntax error
```

这个限制无疑是值得商榷的，但它被添加到语言规范中是为了避免人们从 `||` 切换到 `??` 时的编程错误。

可以明确地使用括号来解决这个问题：

```js run
*!*
let x = (1 && 2) ?? 3; // 正常工作了
*/!*

alert(x); // 2
```

## 总结

- 空值合并运算符 `??` 提供了一种从列表中选择第一个“已定义的”值的简便方式。

    它被用于为变量分配默认值：

    ```js
    // 当 height 的值为 null 或 undefined 时，将 height 的值设置为 100
    height = height ?? 100;
    ```

- `??` 运算符的优先级非常低，仅略高于 `?` 和 `=`，因此在表达式中使用它时请考虑添加括号。
- 如果没有明确添加括号，不能将其与 `||` 或 `&&` 一起使用。
