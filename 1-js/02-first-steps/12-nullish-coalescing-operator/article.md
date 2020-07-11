# 空值合并操作符 '??'(Nullish coalescing operator '??')

[recent browser="new"]

空值合并操作符 `??` 提供了一种简短的语法，用于从列表中选择第一个不是 null 或 undefined 的变量。

`a ?? b` 的结果是:
- 如果 `a` 不是 `null` 或 `undefined` ，则结果是 `a`
- 否则结果是 `b`

因此, `x = a ?? b` 是以下表达式的简写:

```js
x = (a !== null && a !== undefined) ? a : b;
```

这里有一个比较长的例子。

假设，我们有一个用户，变量 `firstName`、`lastName` 和 `nickName` 分别对应用户的名字、姓氏和昵称，如果用户不给这些变量输入任何值，那么这些变量都可能是未定义的。

我们想要显示用户的名称：显示这三个变量中的一个，如果都没有设置值，则显示 "Anonymous"。

让我们使用 `??` 操作符来选择第一个定义了值的变量：

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// 显示第一个不是 null/undefined 的值
*!*
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
*/!*
```

## 与 || 比较

或操作符 `||` 的使用方式和 `??` 一样。事实上，我们可以把上面的代码中的 `??` 替换为 `||`，正如[上一章](info:logical-operators#or-finds-the-first-truthy-value)描述的那样，替换后我们能得到的相同的结果。

重要的区别是:
- `||` 返回第一个 *truthy* 值。（ *truthy* 是指：用逻辑判断时会返回 true 的值）
- `??` 返回第一个 *defined* 值。（ *defined* 是指：不是 null 或 undefined 的值）

当我们想将 `null/undefined` 与 `0` 区别对待时，这一点非常重要。

举个例子，考虑下面这种情况:

```js
height = height ?? 100;
```

代码中的 `height` 如果未定义，将其设置为 `100` 。

让我们将其与 `||` 比较:

```js run
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
```

这个例子里，`height || 100` 将高度 `0` 与 `null`、`undefined` 以及任何其他 falsy 值一样视为未定义值，因此得到的结果是 `100`。（ *falsy* 是指：用逻辑判断时会返回 false 的值）

`height ?? 100` 仅当 `height` 准确的等于 `null` 或 `undefined` 时才返回 `100` 。

哪种行为更好取决于特定的使用场景。当高度 `0` 为有效值时，最好使用 `??`。

## 优先级

`??` 运算符的优先级相当低: 在 [MDN table](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table) 中是 `7`。

因此 `??` 的优先级比大多数运算符低，比 `=` 和 `?` 高。

如果我们需要在复杂表达式中使用 `??`，那么可以考虑加括号：

```js run
let height = null;
let width = null;

// 重要: 使用括号
let area = (height ?? 100) * (width ?? 50);

alert(area); // 5000
```

否则，如果我们省略了括号，`*` 的优先级比 `??` 高，会优先执行。

效果和下面的表达式一样:

```js
// 可能不正确的
let area = height ?? (100 * width) ?? 50;
```

还有一个相关的语言层面的限制。

**出于安全原因，禁止将 `??` 操作符 与 `||` 或 `&&` 操作符一起使用。

下面的代码会触发一个语法错误：

```js run
let x = 1 && 2 ?? 3; // 语法错误
```

这个限制无疑是值得商榷的，但是为了避免在人们从 `||` 转向 `??` 时发生程序错误，它被添加到了语言规范中。

可以显式地使用括号来解决这个问题：

```js run
*!*
let x = (1 && 2) ?? 3; // 有效
*/!*

alert(x); // 2
```

## 总结

- 空值合并操作符 `??` 提供了一种简短的语法，用于从列表中选择第一个不是 null 或 undefined 的变量。

    它用于为变量分配默认值：

    ```js
    // 当 height 是 null 或者 undefined 时，设置其默认值为 100
    height = height ?? 100;
    ```

- `??` 运算符优先级较低, 略高于 `?` 和 `=`。
- 没有明确的括号，禁止将其与 `||` 或 `&&` 一起使用。
