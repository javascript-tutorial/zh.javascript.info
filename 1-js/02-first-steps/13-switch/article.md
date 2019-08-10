# "switch" 语句

`switch` 语句可以替代多个 `if` 判断。

`switch` 语句为多分支选择的情况提供了一个更具描述性的方式。

## 语法

`switch` 语句有至少一个 `case` 代码块和一个可选的 `default` 代码块。

就像这样：

```js no-beautify
switch(x) {
  case 'value1':  // if (x === 'value1')
    ...
    [break]

  case 'value2':  // if (x === 'value2')
    ...
    [break]

  default:
    ...
    [break]
}
```

- 比较 `x` 值与第一个 `case`（也就是 `value1`）是否严格相等，然后比较第二个 `case`（`value2`）以此类推。
- 如果相等，`switch` 语句就执行相应 `case` 下的代码块，直到遇到最靠近的 `break` 语句（或者直到 `switch` 语句末尾）。
- 如果没有符合的 case，`default` 代码块就会被执行（如果 `default` 存在）。

## 举个例子

`switch` 例子（被执行的代码高亮）：

```js run
let a = 2 + 2;

switch (a) {
  case 3:
    alert( 'Too small' );
    break;
*!*
  case 4:
    alert( 'Exactly!' );
    break;
*/!*
  case 5:
    alert( 'Too large' );
    break;
  default:
    alert( "I don't know such values" );
}
```

这里的 `switch` 从第一个 `case` 分支比较 `a` 的值，值为 `3` 匹配失败。

然后比较 `4`。匹配，所以从 `case 4` 开始执行直到遇到最近的 `break`。

**如果没有 `break`，不经过任何检查就会继续执行下一个 `case`**

无 `break` 的例子：

```js run
let a = 2 + 2;

switch (a) {
  case 3:
    alert( 'Too small' );
*!*
  case 4:
    alert( 'Exactly!' );
  case 5:
    alert( 'Too big' );
  default:
    alert( "I don't know such values" );
*/!*
}
```

在上面的例子中我们会看到连续执行的三个 `alert`：

```js
alert( 'Exactly!' );
alert( 'Too big' );
alert( "I don't know such values" );
```

````smart header="任何表达式都可以是 `switch/case` 的参数"
`switch` 和 `case` 都允许任意表达式。

比如：

```js run
let a = "1";
let b = 0;

switch (+a) {
*!*
  case b + 1:
    alert("this runs, because +a is 1, exactly equals b+1");
    break;
*/!*

  default:
    alert("this doesn't run");
}
```
这里 `+a` 返回 `1`，这个值跟 `case` 中 `b + 1` 相比较，然后对应代码被执行。
````

## "case" 分组

共享同一段代码的几个 `case` 分支会被分在一组：

比如，如果我们想让 `case 3` 和 `case 5` 执行同样的代码：

```js run no-beautify
let a = 2 + 2;

switch (a) {
  case 4:
    alert('Right!');
    break;

*!*
  case 3:                    // (*) 下面这两个 case 被分在一组
  case 5:
    alert('Wrong!');
    alert("Why don't you take a math class?");
    break;
*/!*

  default:
    alert('The result is strange. Really.');
}
```

现在 `3` 和 `5` 都显示相同的信息。

在没有 `break` 的情况下，`switch/case` 会对 case“分组”。因为没有 `break`，`case 3` 会从 `(*)` 行执行到 `case 5`。

## 类型很关键

强调一下，这里的相等是严格相等。被比较的值必须是相同类型的才能匹配。

比如，我们来看下面的代码：

```js run
let arg = prompt("Enter a value?")
switch (arg) {
  case '0':
  case '1':
    alert( 'One or zero' );
    break;

  case '2':
    alert( 'Two' );
    break;

  case 3:
    alert( 'Never executes!' );
    break;
  default:
    alert( 'An unknown value' )
}
```

1. 在 prompt 对话框输入 `0`、`1`，第一个 `alert` 弹出。
2. 输入 `2`，第二个 `alert` 弹出。 
3. 但是输入 `3`，因为 `prompt` 的结果是字符串类型的 `"3"`，不是严格相等于数字类型的 `3`，所以 `case 3` 不会执行！最后`default` 分支会执行。 
