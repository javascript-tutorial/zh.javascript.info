# Rest 参数与 Spread 操作符

在 JavaScript 中，很多内建函数都支持传入任意个参数。

例如：

- `Math.max(arg1, arg2, ..., argN)` —— 返回入参中的最大值。
- `Object.assign(dest, src1, ..., srcN)` —— 依次合并 `src1..N` 的属性到 `dest`。
- ...等等。

在本章中我们会学会如何编写实现上述功能的代码，更重要的是，我们要学会如何得心应手地处理及使用这些函数和数组。

## Rest 参数（剩余参数）`...`

在 JavaScript 中，无论函数定义了多少个形参，你都可以传入任意个实参进行调用。

如下：
```js run
function sum(a, b) {
  return a + b;
}

alert( sum(1, 2, 3, 4, 5) );
```

虽然这里不会因为传入“过多”的参数而报错，但是多余的参数也不会起任何作用，函数只会返回前两个参数相加的结果。

针对上例，我们可以在定义函数时使用 Rest 参数，Rest 参数的操作符表示为3个点 `...`。直白地讲，它的意思就是“把剩余的参数都放到一个数组中”。

举个例子，我们需要把所有的参数都放到数组 `args` 中：

```js run
function sumAll(...args) { // 数组变量名为 args
  let sum = 0;

  for (let arg of args) sum += arg;

  return sum;
}

alert( sumAll(1) ); // 1
alert( sumAll(1, 2) ); // 3
alert( sumAll(1, 2, 3) ); // 6
```

我们也可以显式地定义和取用前面部分的参数，而把后面部分的参数收集起来。

下面的例子即把前两个参数定义为变量，同时把剩余的参数收集到 `titles` 数组中：

```js run
function showName(firstName, lastName, ...titles) {
  alert( firstName + ' ' + lastName ); // Julius Caesar

  // titles 数组中包含了剩余的参数
  // 也就是有 titles = ["Consul", "Imperator"]
  alert( titles[0] ); // Consul
  alert( titles[1] ); // Imperator
  alert( titles.length ); // 2
}

showName("Julius", "Caesar", "Consul", "Imperator");
```

````warn header="Rest 参数必须放到参数列表的末尾"
Rest 参数会收集参数列表中剩余的所有参数，所以下面这种用法是行不通的：

```js
function f(arg1, ...rest, arg2) { // ...rest 后面还有个 arg2？！
  // error
}
```

`...rest` 必须是最后一个参数哦。
````

## "arguments" 变量

函数的上下文会提供一个非常特殊的类数组对象 `arguments`，所有的参数被按序放置。

例如：

```js run
function showName() {
  alert( arguments.length );
  alert( arguments[0] );
  alert( arguments[1] );

  // 它是可遍历的
  // for(let arg of arguments) alert(arg);
}

// 依次弹出提示：2，Julius，Caesar
showName("Julius", "Caesar");

// 依次弹出提示：1，Ilya，undefined（不存在第二个参数）
showName("Ilya");
```

在 JavaScript 引入 Rest 参数之前，无论入参数是多是少，想获取所有的入参只能使用 `arguments`。

时至今日，这仍是一个可用的方法。

即使 `arguments` 是一个类数组且可遍历的变量，但它终究不是数组。它没有数组原型链上的函数，我们没法直接调用诸如 `arguments.map(...)` 等这样的函数。

同样的，因为它总是包含所有的参数，我们并不能像使用 Rest 参数一样，期望它只截取入参的一部分。

因此如果你不想受困于以上“缺点”，那么赶紧使用 Rest 参数吧。

````smart header="箭头函数是没有 `\"arguments\"` 的"
如果我们在箭头函数中访问 `arguments`，此时的 `arguments` 并不属于箭头函数，而是属于箭头函数外部的“普通”函数。

请看下例：

```js run
function f() {
  let showArg = () => alert(arguments[0]);
  showArg();
}

f(1); // 1
```
我们已经知道箭头函数自身是没有 `this` 的，现在我们更进一步还知道它缺少 `arguments` 这个特殊的对象。

## Spread 操作符（展开操作符） [#spread-operator]

我们已经学会了如何把一系列的参数收集到数组中。

不过有时候我们也需要做与之相反的事情。

比如，内建函数 [Math.max](mdn:js/Math/max) 会返回参数中最大的值：

```js run
alert( Math.max(3, 5, 1) ); // 5
```

假如我们已有数组 `[3, 5, 1]`，我们该如何用它调用 `Math.max` 呢？

直接把数组“原样”传入是不会奏效的，因为 `Math.max` 期待你传入一系列的数值型参数，而不是单一的数组：

```js run
let arr = [3, 5, 1];

*!*
alert( Math.max(arr) ); // NaN
*/!*
```

毫无疑问我们不可能手动地去一一设置参数 `Math.max(arg[0], arg[1], arg[2])`，因为我们不确定需要设置多少个参数。待代码最终执行时，这个参数数组可能很大，也可能啥也没用。这样手动设置实为下策。

*Spread 操作符* 来拯救你了！它看起来和 Rest 参数操作符很像，都表示为 `...`，但是二者完全做了相反的事。

当在函数调用时使用 `...arr`，它会把可迭代的对象 `arr` “展开”为参数列表。

例如使用 `Math.max`：

```js run
let arr = [3, 5, 1];

alert( Math.max(...arr) ); // 5（Spread 操作符把数组转为参数列表）
```

我们同样可以传递多个被展开的迭代对象：

```js run
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(...arr1, ...arr2) ); // 8
```

我们甚至可以在普通的参数间使用展开操作符：


```js run
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(1, ...arr1, 2, ...arr2, 25) ); // 25
```

同样，我们可以使用 Spread 操作符合并数组：

```js run
let arr = [3, 5, 1];
let arr2 = [8, 9, 15];

*!*
let merged = [0, ...arr, 2, ...arr2];
*/!*

alert(merged); // 0,3,5,1,2,8,9,15（0，然后是 arr 的值，2，然后是 arr2 的值）
```

在上面的例子中，我们都是使用数组来讲解 Spread 操作符的，其实其他可遍历的对象也同样适用。

如下例所示，我们可以使用 Spread 操作符把字符串展开为字符数组：

```js run
let str = "Hello";

alert( [...str] ); // H,e,l,l,o
```

JavaScript 内部使用了遍历器来实现 Spread 操作符，因此使用 Spread 操作符展开对象与使用 `for..of` 遍历该对象是一致的。

所以，针对一个字符串，`for..of` 会逐位返回该字符串中的字符，`...str` 也同理会得到 `"H","e","l","l","o"` 这样的结果。再将上一步所得的字符串序列传入数组初始化操作符 `[...str]`，一个字符数组就这样生成了。

我们还可以使用 `Array.from` 实现上述功能，因为该操作符会将可遍历对象（如字符串）转换为数组：

```js run
let str = "Hello";

// Array.from 会将可遍历对象转为数组
alert( Array.from(str) ); // H,e,l,l,o
```

运行结果与 `[...str]` 结果一致。

不过需要注意的是使用 `Array.from(obj)` 和使用 `[...obj]` 还是存在细微差别：

- `Array.from` 同时适用于类数组对象和可遍历对象。
- Spread 操作符只能操作可遍历对象。

因此，若希望把一些“东西”转为数组，使用 `Array.from` 将更为通用。


## 小结

当我们在代码中遇到 `"..."` 时，它不是 Rest 参数就是 Spread 操作符。

我们可以使用下列方法区分二者：

- 若 `...` 出现在函数的参数列表，那它表示的就是 Rest 参数，它会把函数多余的实参收集到一个数组中。
- 若 `...` 出现在函数调用或类似的表达式中，那它就是 Spread 操作符，它会把一个数组展开为逗号分隔的元素列表。

使用场景：

- Rest 参数用于创建可接收任意个参数的函数。
- Spread 操作符可以在函数调用传参时，把含有参数的数组展开为函数需要的参数列表形式。

这两个操作符的出现方便了我们在参数数组和参数列表间来回转换。

“旧式”的 `arguments`（类数组对象）也依然能够帮助我们获取函数调用时的所有参数。
