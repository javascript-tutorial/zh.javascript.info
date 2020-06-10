# 空位合并运算符 '??'

[recent browser="new"]

空位合并运算符 `??` 提供了一种简短的语法，用于从列表中选择第一个不是 null 或 undefined 的变量。

`a ?? b` 的结果是:
- 如果 `a` 不是 `null` 或 `undefined` ，则结果是 `a`
- 否则结果是 `b`

因此, `x = a ?? b` 是以下表达式的简写:

```js
x = (a !== null && a !== undefined) ? a : b;
```

这里有一个比较长的例子。

假设我们有几个变量 `firstName`、`lastName` 或 `nickName`，它们都是可选的。

让我们选择有值的那一个变量并显示出来 (如果都没有值，则显示 "Anonymous"):

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// 显示第一个不是 null 或 undefined 的变量
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
```

## 与 || 比较

空位合并运算符和或操作符 `||` 非常相似。其实，我们可以把上面的代码中的 `??` 替换为 `||`，得到的结果是一样的。

重要的区别是:
- `||` 返回第一个 *truthy* 值。（ *truthy* 是指：用逻辑判断时会返回 true 的值）
- `??` 返回第一个 *defined* 值。（ *defined* 是指：不是 null 或 undefined的值）

当我们想将 `null/undefined` 与 `0` 区别对待时，这一点非常重要。

举个例子:

```js
height = height ?? 100;
```

如果 `height` 未定义，将 `height` 设置为 `100` 。如果 `height` 是 `0` ，则维持原值不变。

让我们将其与 `||` 比较:

```js run
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
```

这个例子里，`height || 100` 将零高度与 `null` 、`undefined` 或任何其他 falsy 值一样视为未设置值，以上结果取决于某些不正确的使用场景。（ *falsy* 是指：用逻辑判断时会返回 false 的值）

`height ?? 100` 只有在 `height` 是 `null` 或 `undefined` 的情况下才返回 `100`.

## 优先级

`??` 运算符的优先级相当低: 在[MDN table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table)中是 `7`

这比大多数运算符低，比 `=` 和 `?` 高一点。

所以，如果我们需要在复杂表达式中使用 `??` ，那么可以考虑加括号：

```js run
let height = null;
let width = null;

// 重要: 使用括号
let area = (height ?? 100) * (width ?? 50);

alert(area); // 5000
```

否则，如果我们省略了括号，那么 `*` 的优先级较高，将优先执行，效果和下面的表达式一样:

```js
// 不正确的
let area = height ?? (100 * width) ?? 50;
```

还有一个相关的语言层面的限制。为了安全起见，禁止将 `??` 操作符 与 `||` 或 `&&` 操作符一起使用。

下面的代码会触发一个语法错误：

```js run
let x = 1 && 2 ?? 3; // 语法错误
```

这个限制肯定是值得商榷的，但由于某种原因，它被添加到了语言规范中。

可以显式地使用括号来修复这个问题：

```js run
let x = (1 && 2) ?? 3; // 有效
alert(x); // 2
```

## 总结

- 空位合并运算符`??`提供了一种简短的语法，用于从列表中选择第一个不是 null 或 undefined 的变量。

    它用于为变量分配默认值：:

    ```js
    // 当height是 null 或者 undefined 时，设置其默认值为100
    height = height ?? 100;
    ```

- `??` 运算符优先级较低, 略高于 `?` 和 `=`。
- 没有明确的括号，禁止与 `||` 或 `&&` 一起使用。
