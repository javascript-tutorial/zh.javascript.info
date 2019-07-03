
# "new Function" 语法

JavaScript 有多种创建函数的方法，其中有一种方法虽然不太常用，但在一些情况下它是解决问题的不二法门。

## 语法介绍

你可以这样创建一个函数：

```js
let func = new Function ([arg1, arg2, ...argN], functionBody);
```

<<<<<<< HEAD
即在创建函数时，先传入函数所需的参数（准确地说是形参名），最后传入函数的函数体。传入的所有参数均为字符串。
=======
The function is created with the arguments `arg1...argN` and the given `functionBody`.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

下面这个例子可以帮助你理解创建语法，它创建了一个包含两个入参的函数：

```js run
let sum = new Function('a', 'b', 'return a + b');

alert( sum(1, 2) ); // 3
```

<<<<<<< HEAD
如果创建出的新函数没有任何入参，那么创建函数时你只需要传入一个参数，即描述新函数中函数体的字符串：
=======
And here there's a function without arguments, with only the function body:
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

```js run
let sayHi = new Function('alert("Hello")');

sayHi(); // Hello
```

<<<<<<< HEAD
与已知方法相比这种方法最大的不同是，它是在运行时使用描述函数的字符串来创建函数的。 
=======
The major difference from other ways we've seen is that the function is created literally from a string, that is passed at run time.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

之前的各种声明方法都需要我们 —— 程序员，在脚本中编写各个函数的代码。

但是 `new Function` 允许我们把字符串变为函数，所以现在我们完全可以从服务器获取并执行一个新的函数：

```js
let str = ... receive the code from a server dynamically ...

let func = new Function(str);
func();
```

<<<<<<< HEAD
使用 `new Function` 创建函数的应用场景非常特殊，比如需要从服务器获取代码或者动态地按模板编译函数时才会使用，在一般的程序开发中很少使用。
=======
It is used in very specific cases, like when we receive code from a server, or to dynamically compile a function from a template, in complex web-applications.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

## 闭包

通常，函数会使用一个特殊的属性 `[[Environment]]` 来记录函数创建时的环境，它具体指向了函数创建时的词法环境。

但是如果我们使用 `new Function` 创建函数，函数的 `[[Environment]]` 并不指向当前的词法环境，而是指向全局环境。

So, such function doesn't have access to outer variables, only to the global ones.

```js run

function getFunc() {
  let value = "test";

*!*
  let func = new Function('alert(value)');
*/!*

  return func;
}

getFunc()(); // error：value 未定义
```

与普通的函数创建相比较：

```js run
function getFunc() {
  let value = "test";

*!*
  let func = function() { alert(value); };
*/!*

  return func;
}

getFunc()(); // *!*"test"*/!*，变量值取自 getFunc 的词法环境
```

`new Function` 的这种特性看起来有点奇怪，不过在实战中却非常实用。

想象我们必须用字符串来创建一个函数。在编写脚本时我们不会知道新函数的代码（这也是为什么我们不用常规方法创建函数），我们只能在运行时从服务器或其他来源获取代码的内容。

我们的新函数需要和主脚本进行交互。

<<<<<<< HEAD
也许我们还希望新函数能够访问到外部作用域的变量？
=======
What if it could access the outer variables?
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

我们还会遇到这种问题，当发布 JavaScript 代码到生产环境时，我们会使用 *minifier* 压缩代码 —— 这是一个特别的程序，它会移除代码中多余的注释、空格等以减小文件 —— 更重要的是，它会用更短的字符重命名所有的局部变量。

举个例子，如果一个函数包含了 `let userName`，minifier 会把它替换为 `let a`（如果 a 已被使用便换其他字符），剩余的局部变量也会做类似的替换。一般来说这样的替换是安全的，毕竟这些变量是函数内的局部变量，它们不能被函数以外的表达式访问。同时，minifier 会替换函数内部所有使用了变量的代码。minifier 很聪明，它会分析代码的结构，而不是呆板地查找然后替换，因此它不会“破坏”你的程序。

<<<<<<< HEAD
但是在这种情况下，如果使 `new Function` 可以访问自身函数以外的变量，它也很有可能无法找到 `userName`，这是因为新函数的创建发生在代码压缩以后，变量名已经被替换了。

**即使我们可以在 `new Function` 中访问外部词法环境，我们也会受挫于 minifier。**

`new Function` 中这个不寻常的特性可以让我们少犯错误。

它“强迫”我们写出更好的代码。当我们需要向 `new Function` 创建出的新函数传递数据时，我们必须显式地通过参数进行传递。

我们的 "sum" 函数就正是这样：

```js run 
*!*
let sum = new Function('a', 'b', 'return a + b');
*/!*

let a = 1, b = 2;

*!*
// 外部值以参数形式传入函数
alert( sum(a, b) ); // 3
*/!*
```
=======
So if `new Function` had access to outer variables, it would be unable to find renamed  `userName`.

**If `new Function` had access to outer variables, it would have problems with minifiers.**

To pass something to a function, created as `new Function`, we should use its arguments.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

## 小结

语法：

```js
let func = new Function ([arg1, arg2, ...argN], functionBody);
```

<<<<<<< HEAD
由于历史原因，参数也可以按逗号分隔符的形式给出。 

以下三种形式表现一致：

```js 
new Function('a', 'b', 'return a + b'); // 基础语法
new Function('a,b', 'return a + b'); // 逗号分隔
new Function('a , b', 'return a + b'); // 逗号和空格分隔
=======
For historical reasons, arguments can also be given as a comma-separated list.

These three lines mean the same:

```js
new Function('a', 'b', 'return a + b'); // basic syntax
new Function('a,b', 'return a + b'); // comma-separated
new Function('a , b', 'return a + b'); // comma-separated with spaces
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af
```

使用 `new Function` 创建出来的函数，它的 `[[Environment]]` 指向全局词法环境，而不是函数所在的外部词法环境。因此，我们不能在新函数中直接使用外部变量。不过这样也挺好，这有助于减少我们代码中可能出现的错误。同时使用参数显式地传值也有助于维护良好的代码结构且避免了因使用 minifier 带来的问题。
