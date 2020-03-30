
# "new Function" 语法

还有一种创建函数的方法。它很少被使用，但有些时候只能选择它。

## 语法

创建函数的语法：

```js
let func = new Function ([arg1, arg2, ...argN], functionBody);
```

<<<<<<< HEAD
该函数是通过使用参数 `arg1...argN` 和给定的 `functionBody` 创建的。
=======
The function is created with the arguments `arg1...argN` and the given `functionBody`.
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

下面这个例子可以帮助你理解创建语法。这是一个带有两个参数的函数：

```js run
let sum = new Function('a', 'b', 'return a + b');

alert( sum(1, 2) ); // 3
```

<<<<<<< HEAD
这里有一个没有参数的函数，只有函数体：
=======
And here there's a function without arguments, with only the function body:
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

```js run
let sayHi = new Function('alert("Hello")');

sayHi(); // Hello
```

<<<<<<< HEAD
与我们已知的其他方法相比，这种方法最大的不同在于，它实际上是通过运行时通过参数传递过来的字符串创建的。
=======
The major difference from other ways we've seen is that the function is created literally from a string, that is passed at run time.
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

以前的所有声明方法都需要我们 —— 程序员，在脚本中编写函数的代码。

但是 `new Function` 允许我们将任意字符串变为函数。例如，我们可以从服务器接收一个新的函数并执行它：

```js
let str = ... 动态地接收来自服务器的代码 ...

let func = new Function(str);
func();
```

<<<<<<< HEAD
使用 `new Function` 创建函数的应用场景非常特殊，比如在复杂的 Web 应用程序中，我们需要从服务器获取代码或者动态地从模板编译函数时才会使用。
=======
It is used in very specific cases, like when we receive code from a server, or to dynamically compile a function from a template, in complex web-applications.
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

## 闭包

<<<<<<< HEAD
通常，闭包是指使用一个特殊的属性 `[[Environment]]` 来记录函数自身的创建时的环境的函数。它具体指向了函数创建时的词法环境。（我们在 <info:closure> 一章中对此进行了详细的讲解）。

但是如果我们使用 `new Function` 创建一个函数，那么该函数的 `[[Environment]]` 并不指向当前的词法环境，而是指向全局环境。

因此，此类函数无法访问外部（outer）变量，只能访问全局变量。
=======
Usually, a function remembers where it was born in the special property `[[Environment]]`. It references the Lexical Environment from where it's created  (we covered that in the chapter <info:closure>).

But when a function is created using `new Function`, its `[[Environment]]` is set to reference not the current Lexical Environment, but the global one.

So, such function doesn't have access to outer variables, only to the global ones.
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

```js run
function getFunc() {
  let value = "test";

*!*
  let func = new Function('alert(value)');
*/!*

  return func;
}

getFunc()(); // error: value is not defined
```

将其与常规行为进行比较：

```js run
function getFunc() {
  let value = "test";

*!*
  let func = function() { alert(value); };
*/!*

  return func;
}

getFunc()(); // *!*"test"*/!*，从 getFunc 的词法环境中获取的
```

<<<<<<< HEAD
`new Function` 的这种特性看起来有点奇怪，不过在实际中却非常实用。
=======
This special feature of `new Function` looks strange, but appears very useful in practice.

Imagine that we must create a function from a string. The code of that function is not known at the time of writing the script (that's why we don't use regular functions), but will be known in the process of execution. We may receive it from the server or from another source.

Our new function needs to interact with the main script.

What if it could access the outer variables?
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

想象以下我们必须通过一个字符串来创建一个函数。在编写脚本时我们不会知道该函数的代码（这也就是为什么我们不用常规方法创建函数），但在执行过程中会知道了。我们可能会从服务器或其他来源获取它。

我们的新函数需要和主脚本进行交互。

<<<<<<< HEAD
如果这个函数能够访问外部（outer）变量会怎么样？

问题在于，在将 JavaScript 发布到生产环境之前，需要使用 **压缩程序（minifier）** 对其进行压缩 —— 一个特殊的程序，通过删除多余的注释和空格等压缩代码 —— 更重要的是，将局部变量命名为较短的变量。

例如，如果一个函数有 `let userName`，压缩程序会把它替换为 `let a`（如果 a 已被占用了，那就使用其他字符），剩余的局部变量也会被进行类似的替换。一般来说这样的替换是安全的，毕竟这些变量是函数内的局部变量，函数外的任何东西都无法访问它。在函数内部，压缩程序会替换所有使用了使用了这些变量的代码。压缩程序很聪明，它会分析代码的结构，而不是呆板地查找然后替换，因此它不会“破坏”你的程序。

但是在这种情况下，如果使 `new Function` 可以访问自身函数以外的变量，它也很有可能无法找到重命名的 `userName`，这是因为新函数的创建发生在代码压缩以后，变量名已经被替换了。

**即使我们可以在 `new Function` 中访问外部词法环境，我们也会受挫于压缩程序。**

此外，这样的代码在架构上很差并且容易出错。

当我们需要向 `new Function` 创建出的新函数传递数据时，我们必须显式地通过参数进行传递。
=======
So if `new Function` had access to outer variables, it would be unable to find renamed  `userName`.

**If `new Function` had access to outer variables, it would have problems with minifiers.**

Besides, such code would be architecturally bad and prone to errors.

To pass something to a function, created as `new Function`, we should use its arguments.
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

## 总结

语法：

```js
let func = new Function ([arg1, arg2, ...argN], functionBody);
```

<<<<<<< HEAD
由于历史原因，参数也可以按逗号分隔符的形式给出。 

以下三种声明的含义相同：

```js 
new Function('a', 'b', 'return a + b'); // 基础语法
new Function('a,b', 'return a + b'); // 逗号分隔
new Function('a , b', 'return a + b'); // 逗号和空格分隔
```

使用 `new Function` 创建的函数，它的 `[[Environment]]` 指向全局词法环境，而不是函数所在的外部词法环境。因此，我们不能在 `new Function` 中直接使用外部变量。不过这样是好事，这有助于降低我们代码出错的可能。并且，从代码架构上讲，显式地使用参数传值是一种更好的方法，并且避免了与使用压缩程序而产生冲突的问题。
=======
For historical reasons, arguments can also be given as a comma-separated list.

These three declarations mean the same:

```js
new Function('a', 'b', 'return a + b'); // basic syntax
new Function('a,b', 'return a + b'); // comma-separated
new Function('a , b', 'return a + b'); // comma-separated with spaces
```

Functions created with `new Function`, have `[[Environment]]` referencing the global Lexical Environment, not the outer one. Hence, they cannot use outer variables. But that's actually good, because it insures us from errors. Passing parameters explicitly is a much better method architecturally and causes no problems with minifiers.
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648
