# Rest 参数与 Spread 语法

在 JavaScript 中，很多内建函数都支持传入任意数量的参数。

例如：

- `Math.max(arg1, arg2, ..., argN)` —— 返回参数中的最大值。
- `Object.assign(dest, src1, ..., srcN)` —— 依次将属性从 `src1..N` 复制到 `dest`。
- ……等。

在本章中，我们将学习如何编写支持传入任意数量参数的函数，以及如何将数组作为参数传递给这类函数。

## Rest 参数 `...`

在 JavaScript 中，无论函数是如何定义的，你都可以在调用它时传入任意数量的参数。

例如：
```js run
function sum(a, b) {
  return a + b;
}

alert( sum(1, 2, 3, 4, 5) );
```

虽然这里这个函数不会因为传入过多的参数而报错。但是，当然，只有前两个参数被求和了。

我们可以在函数定义中声明一个数组来收集参数。语法是这样的：`...变量名`，这将会声明一个数组并指定其名称，其中存有剩余的参数。这三个点的语义就是“收集剩余的参数并存进指定数组中”。

例如，我们需要把所有的参数都放到数组 `args` 中：

```js run
function sumAll(...args) { // 数组名为 args
  let sum = 0;

  for (let arg of args) sum += arg;

  return sum;
}

alert( sumAll(1) ); // 1
alert( sumAll(1, 2) ); // 3
alert( sumAll(1, 2, 3) ); // 6
```

我们也可以正常地声明一些参数，并将剩余的参数收进数组中。

下面这个函数声明了两个参数，并把剩余的参数收集到 `titles` 数组中：

```js run
function showName(firstName, lastName, ...titles) {
  alert( firstName + ' ' + lastName ); // Julius Caesar

  // 剩余的参数被放入 titles 数组中
  // i.e. titles = ["Consul", "Imperator"]
  alert( titles[0] ); // Consul
  alert( titles[1] ); // Imperator
  alert( titles.length ); // 2
}

showName("Julius", "Caesar", "Consul", "Imperator");
```

````warn header="Rest 参数必须放到参数列表的末尾"
Rest 参数会收集剩余的所有参数，因此下面这种用法没有意义，并且会导致错误：

```js
function f(arg1, ...rest, arg2) { // arg2 在 ...rest 后面？！
  // error
}
```

`...rest` 必须写在参数列表最后。
````

## "arguments" 变量

有一个名为 `arguments` 的特殊类数组对象可以在函数中被访问，该对象以参数在列表中的位置作为键，存储所有参数。

例如：

```js run
function showName() {
  alert( arguments.length );
  alert( arguments[0] );
  alert( arguments[1] );

  // 它是可遍历的
  // for(let arg of arguments) alert(arg);
}

// 依次显示：2，Julius，Caesar
showName("Julius", "Caesar");

// 依次显示：1，Ilya，undefined（没有第二个参数）
showName("Ilya");
```

在过去，JavaScript 中不支持 rest 参数语法，而使用 `arguments` 是获取函数所有参数的唯一方法。为了支持以前的代码，这种写法仍然有效。

这种写法有其缺点。尽管 `arguments` 是一个类数组，也是可迭代对象，但它终究不是数组。它不支持数组方法，因此我们不能调用 `arguments.map(...)` 等方法。

此外，它始终包含所有参数，我们不能像使用 rest 参数那样只截取参数的一部分。

因此当我们需要这些功能时，最好使用 rest 参数。

````smart header="箭头函数没有 `\"arguments\"`"
如果我们在箭头函数中访问 `arguments`，访问到的 `arguments` 并不属于箭头函数，而是调用箭头函数的外部“普通”函数。

举个例子：

```js run
function f() {
  let showArg = () => alert(arguments[0]);
  showArg();
}

f(1); // 1
```

我们已经知道，箭头函数没有自身的 `this`。现在我们知道了它们也没有特殊的 `arguments` 对象。
````


## Spread 语法 [#spread-syntax]

我们刚刚看到了如何从参数列表中获取数组。

有时候我们也需要做与之相反的事。

例如，内建函数 [Math.max](mdn:js/Math/max) 会返回参数中最大的值：

```js run
alert( Math.max(3, 5, 1) ); // 5
```

如果我们有一个数组 `[3, 5, 1]`，我们该如何用它调用 `Math.max` 呢？

直接传入这个数组是不会奏效的，因为 `Math.max` 期望一列数值型的参数，而不是一个数组：

```js run
let arr = [3, 5, 1];

*!*
alert( Math.max(arr) ); // NaN
*/!*
```

毫无疑问，我们不能手动展开 `arg` 数组传入，例如 `Math.max(arg[0], arg[1], arg[2])` 。我们不确定有多少个参数————在代码执行时，参数数组中可能有很多个元素，也可能一个都没有。而且，这样的代码难以阅读。

**Spread 语法** 可以解决这个问题。它看起来和 rest 参数很像，也使用 `...`，但是二者的用途完全相反。

当在函数调用中使用 `...arr` 时，它会把可迭代对象 `arr` “展开”到参数列表中。

以 `Math.max` 为例：

```js run
let arr = [3, 5, 1];

alert( Math.max(...arr) ); // 5（spread 语法把数组转换为参数列表）
```

我们还可以通过这种方式传入多个可迭代对象：

```js run
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(...arr1, ...arr2) ); // 8
```

我们甚至还可以将 spread 语法与常规参数结合使用：


```js run
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(1, ...arr1, 2, ...arr2, 25) ); // 25
```

并且，我们还可以使用 spread 语法来合并数组：

```js run
let arr = [3, 5, 1];
let arr2 = [8, 9, 15];

*!*
let merged = [0, ...arr, 2, ...arr2];
*/!*

alert(merged); // 0,3,5,1,2,8,9,15（0，然后是 arr，然后是 2，然后是 arr2）
```

在上面的示例中，我们使用 spread 语法展开了一些数组。其实任何可迭代对象都可以使用 spread 语法展开。

例如，在这儿我们使用 spread 语法将字符串转换为字符数组：

```js run
let str = "Hello";

alert( [...str] ); // H,e,l,l,o
```

Spread 语法内部使用了迭代器来收集元素，与 `for..of` 的方式相同。

因此，对于一个字符串，`for..of` 会逐个返回该字符串中的字符，`...str` 也同理会得到 `"H","e","l","l","o"` 这样的结果。随后，字符列表被传递给数组初始化器 `[...str]`。

对于这个特定任务，我们还可以使用 `Array.from` 来完成，因为该方法会将一个可迭代对象（如字符串）转换为数组：

```js run
let str = "Hello";

// Array.from 将可迭代对象转换为数组
alert( Array.from(str) ); // H,e,l,l,o
```

运行结果与 `[...str]` 相同。

注意 `Array.from(obj)` 和 `[...obj]` 存在一个细微的差别：

- `Array.from` 适用于类数组对象也适用于可迭代对象。
- Spread 语法只适用于可迭代对象。

因此，对于将一些“东西”转换为数组的任务，`Array.from` 往往更通用。


## 复制 array/object

还记得我们 [之前讲过的](info:object-copy#ke-long-yu-he-bing-objectassign) `Object.assign()` 吗？

使用 spread 语法也可以做同样的事情（译注：也就是进行浅拷贝）。

```js run
let arr = [1, 2, 3];

*!*
let arrCopy = [...arr]; // 将数组 spread 到参数列表中
                        // 然后将结果放到一个新数组
*/!*

// 两个数组中的内容相同吗？
alert(JSON.stringify(arr) === JSON.stringify(arrCopy)); // true

// 两个数组相等吗？
alert(arr === arrCopy); // false（它们的引用是不同的）

// 修改我们初始的数组不会修改副本：
arr.push(4);
alert(arr); // 1, 2, 3, 4
alert(arrCopy); // 1, 2, 3
```

并且，也可以通过相同的方式来复制一个对象：

```js run
let obj = { a: 1, b: 2, c: 3 };

*!*
let objCopy = { ...obj }; // 将对象 spread 到参数列表中
                          // 然后将结果返回到一个新对象
*/!*

// 两个对象中的内容相同吗？
alert(JSON.stringify(obj) === JSON.stringify(objCopy)); // true

// 两个对象相等吗？
alert(obj === objCopy); // false (not same reference)

// 修改我们初始的对象不会修改副本：
obj.d = 4;
alert(JSON.stringify(obj)); // {"a":1,"b":2,"c":3,"d":4}
alert(JSON.stringify(objCopy)); // {"a":1,"b":2,"c":3}
```

这种方式比使用 `let arrCopy = Object.assign([], arr)` 复制数组，或使用 `let objCopy = Object.assign({}, obj)` 复制对象来说更为简便。因此，只要情况允许，我们倾向于使用它。


## 总结

当我们在代码中看到 `"..."` 时，它要么是 rest 参数，要么是 spread 语法。

有一个简单的方法可以区分它们：

- 若 `...` 出现在函数参数列表的最后，那么它就是 rest 参数，它会把参数列表中剩余的参数收集到一个数组中。
- 若 `...` 出现在函数调用或类似的表达式中，那它就是 spread 语法，它会把一个数组展开为列表。

使用场景：

- Rest 参数用于创建可接受任意数量参数的函数。
- Spread 语法用于将数组传递给通常需要含有许多参数的函数。

我们可以使用这两种语法轻松地互相转换列表与参数数组。

旧式的 `arguments`（类数组且可迭代的对象）也依然能够帮助我们获取函数调用中的所有参数。
