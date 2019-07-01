<<<<<<< HEAD
回顾之前的问题，我们用 `pattern:-?\d+(\.\d+)?` 来匹配数字。

`pattern:[-+*/]` 匹配运算符。我们把 `pattern:-` 放在最前面，因为如果放在中间的话，则表示字符范围，这并不是我们想要的。

注意，在 JavaScript 中，`pattern:/.../` 中的 `/` 需要被转义。

我们需要匹配一个数字、一个运算符，还有另一个数字。除此以外，还有它们之间可能存在的空格。

完整的正则表达式为：`pattern:-?\d+(\.\d+)?\s*[-+*/]\s*-?\d+(\.\d+)?`。

为了将得到的结果转化为数组，我们须将所需的数据：数字及运算符，包裹在括号中，对应的表达式为：`pattern:(-?\d+(\.\d+)?)\s*([-+*/])\s*(-?\d+(\.\d+)?)`。

实际操作：
=======
A regexp for a number is: `pattern:-?\d+(\.\d+)?`. We created it in previous tasks.

An operator is `pattern:[-+*/]`.

Please note:
- Here the dash `pattern:-` goes first in the brackets, because in the middle it would mean a character range, while we just want a character `-`.
- A slash `/` should be escaped inside a JavaScript regexp `pattern:/.../`, we'll do that later.

We need a number, an operator, and then another number. And optional spaces between them.

The full regular expression: `pattern:-?\d+(\.\d+)?\s*[-+*/]\s*-?\d+(\.\d+)?`.

To get a result as an array let's put parentheses around the data that we need: numbers and the operator: `pattern:(-?\d+(\.\d+)?)\s*([-+*/])\s*(-?\d+(\.\d+)?)`.

In action:
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

```js run
let reg = /(-?\d+(\.\d+)?)\s*([-+*\/])\s*(-?\d+(\.\d+)?)/;

alert( "1.2 + 12".match(reg) );
```

<<<<<<< HEAD
结果包括：

- `result[0] == "1.2 + 12"`（完整匹配）
- `result[1] == "1"`（第一个捕获组）
- `result[2] == ".2"`（第二个捕获组 —— 小数部分）
- `result[3] == "+"`（...）
- `result[4] == "12"`（...）
- `result[5] == undefined`（最后一个小数部分不存在，因此为 undefined）

我们只需要数字和运算符，不需要小数部分。

因此，我们可以加上 `pattern:?:` 来去除多余的捕获组，例如：`pattern:(?:\.\d+)?`。

最终答案：
=======
The result includes:

- `result[0] == "1.2 + 12"` (full match)
- `result[1] == "1.2"` (first group `(-?\d+(\.\d+)?)` -- the first number, including the decimal part)
- `result[2] == ".2"` (second group`(\.\d+)?` -- the first decimal part)
- `result[3] == "+"` (third group `([-+*\/])` -- the operator)
- `result[4] == "12"` (forth group `(-?\d+(\.\d+)?)` -- the second number)
- `result[5] == undefined` (fifth group `(\.\d+)?` -- the last decimal part is absent, so it's undefined)

We only want the numbers and the operator, without the full match or the decimal parts.

The full match (the arrays first item) can be removed by shifting the array `pattern:result.shift()`.

The decimal groups can be removed by making them into non-capturing groups, by adding `pattern:?:` to the beginning: `pattern:(?:\.\d+)?`.

The final solution:
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

```js run
function parse(expr) {
  let reg = /(-?\d+(?:\.\d+)?)\s*([-+*\/])\s*(-?\d+(?:\.\d+)?)/;

  let result = expr.match(reg);

<<<<<<< HEAD
  if (!result) return;
=======
  if (!result) return [];
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd
  result.shift();

  return result;
}

alert( parse("-1.23 * 3.45") );  // -1.23, *, 3.45
```
