# 函数

我们经常需要在脚本的许多地方执行很相似的操作。

例如，当访问者登录、注销或者在其他地方时，我们需要显示一条好看的信息。

函数是程序的主要“构建模块”。函数使该段代码可以被调用很多次，而不需要写重复的代码。

我们已经看到了内置函数的示例，如 `alert(message)`、`prompt(message, default)` 和 `confirm(question)`。但我们也可以创建自己的函数。

## 函数声明

使用 **函数声明** 创建函数。

看起来就像这样：

```js
function showMessage() {
  alert( 'Hello everyone!' );
}
```

`function` 关键字首先出现，然后是 **函数名**，然后是括号之间的 **参数** 列表（用逗号分隔，在上述示例中为空），最后是花括号之间的代码（即“函数体”）。

```js
function name(parameters) {
  ...body...
}
```

我们的新函数可以通过名称调用：`showMessage()`。

例如：

```js run
function showMessage() {
  alert( 'Hello everyone!' );
}

*!*
showMessage();
showMessage();
*/!*
```

调用 `showMessage()` 执行函数的代码。这里我们会看到显示两次消息。

这个例子清楚地演示了函数的主要目的之一：避免代码重复。

如果我们需要更改消息或其显示方式，只需在一个地方修改代码：输出它的函数。

## 局部变量

在函数中声明的变量只在该函数内部可见。

例如：

```js run
function showMessage() {
*!*
  let message = "Hello, I'm JavaScript!"; // 局部变量
*/!*

  alert( message );
}

showMessage(); // Hello, I'm JavaScript!

alert( message ); // <-- 错误！变量是函数的局部变量
```

## 外部变量

函数也可以访问外部变量，例如：

```js run no-beautify
let *!*userName*/!* = 'John';

function showMessage() {
  let message = 'Hello, ' + *!*userName*/!*;
  alert(message);
}

showMessage(); // Hello, John
```

函数对外部变量拥有全部的访问权限。函数也可以修改外部变量。

例如：

```js run
let *!*userName*/!* = 'John';

function showMessage() {
  *!*userName*/!* = "Bob"; // (1) 改变外部变量

  let message = 'Hello, ' + *!*userName*/!*;
  alert(message);
}

alert( userName ); // *!*John*/!* 在函数调用之前

showMessage();

alert( userName ); // *!*Bob*/!*，值被函数修改了
```

只有在没有局部变量的情况下才会使用外部变量。

如果在函数内部声明了同名变量，那么函数会 **遮蔽** 外部变量。例如，在下面的代码中，函数使用局部的 `userName`，而外部变量被忽略：

```js run
let userName = 'John';

function showMessage() {
*!*
  let userName = "Bob"; // 声明一个局部变量
*/!*

  let message = 'Hello, ' + userName; // *!*Bob*/!*
  alert(message);
}

// 函数会创建并使用它自己的 userName
showMessage();

alert( userName ); // *!*John*/!*，未被更改，函数没有访问外部变量。
```

```smart header="全局变量"
任何函数之外声明的变量，例如上述代码中的外部变量 `userName`，都被称为 **全局** 变量。

全局变量在任意函数中都是可见的（除非被局部变量遮蔽）。

减少全局变量的使用是一种很好的做法。现代的代码有很少甚至没有全局变量。大多数变量存在于它们的函数中。但是有时候，全局变量能够用于存储项目级别的数据。
```

## 参数

我们可以使用参数（也称“函数参数”）来将任意数据传递给函数。

在如下示例中，函数有两个参数：`from` 和 `text`。

```js run
function showMessage(*!*from, text*/!*) { // 参数：from 和 text
  alert(from + ': ' + text);
}

*!*
showMessage('Ann', 'Hello!'); // Ann: Hello! (*)
showMessage('Ann', "What's up?"); // Ann: What's up? (**)
*/!*
```

当函数在 `(*)` 和 `(**)` 行中被调用时，给定值被复制到了局部变量 `from` 和 `text`。然后函数使用它们进行计算。

这里还有一个例子：我们有一个变量 `from`，并将它传递给函数。请注意：函数会修改 `from`，但在函数外部看不到更改，因为函数修改的是复制的变量值副本：


```js run
function showMessage(from, text) {

*!*
  from = '*' + from + '*'; // 让 "from" 看起来更优雅
*/!*

  alert( from + ': ' + text );
}

let from = "Ann";

showMessage(from, "Hello"); // *Ann*: Hello

// "from" 值相同，函数修改了一个局部的副本。
alert( from ); // Ann
```

## 默认值

如果未提供参数，那么其默认值则是 `undefined`。

例如，之前提到的函数 `showMessage(from, text)` 可以只使用一个参数调用：

```js
showMessage("Ann");
```

那不是错误，这样调用将输出 `"*Ann*: undefined"`。这里没有参数 `text`，所以程序假定 `text === undefined`。

如果我们想在本示例中设定“默认”的 `text`，那么我们可以在 `=` 之后指定它：

```js run
function showMessage(from, *!*text = "no text given"*/!*) {
  alert( from + ": " + text );
}

showMessage("Ann"); // Ann: no text given
```

现在如果 `text` 参数未被传递，它将会得到值 `"no text given"`。

这里 `"no text given"` 是一个字符串，但它可以是更复杂的表达式，并且只会在缺少参数时才会被计算和分配。所以，这也是可能的：

```js run
function showMessage(from, text = anotherFunction()) {
  // anotherFunction() 仅在没有给定 text 时执行
  // 其运行结果将成为 text 的值 
}
```

```smart header="默认参数的计算"
在 JavaScript 中，每次函数在没带个别参数的情况下被调用，默认参数会被计算出来。

在上面的例子中，每次 `showMessage()` 不带 `text` 参数被调用时，`anotherFunction()` 就会被调用。
```

### 后备的默认参数

有些时候，将参数默认值的设置放在函数执行（相较更后期）而不是函数声明的时候，也能行得通。

为了判断参数是否被省略掉，我们可以拿它跟 `undefined` 做比较：

```js run
function showMessage(text) {
*!*
  if (text === undefined) {
    text = 'empty message';
  }
*/!*

  alert(text);
}

showMessage(); // empty message
```

……或者我们可以使用 `||` 运算符：

```js
// 如果 "text" 参数被省略或者被传入空字符串，则赋值为 'empty'
function showMessage(text) {
  text = text || 'empty';
  ...
}
```

现代 JavaScript 引擎支持 [空值合并运算符](info:nullish-coalescing-operator) `??`，当可能遇到其他假值时它更有优势，如 `0` 会被视为正常值不被合并：

```js run
// 如果没有传入 "count" 参数，则显示 "unknown"
function showCount(count) {
  alert(count ?? "unknown");
}

showCount(0); // 0
showCount(null); // unknown
showCount(); // unknown
```

## 返回值

函数可以将一个值返回到调用代码中作为结果。

最简单的例子是将两个值相加的函数：

```js run no-beautify
function sum(a, b) {
  *!*return*/!* a + b;
}

let result = sum(1, 2);
alert( result ); // 3
```

指令 `return` 可以在函数的任意位置。当执行到达时，函数停止，并将值返回给调用代码（分配给上述代码中的 `result`）。

在一个函数中可能会出现很多次 `return`。例如：

```js run
function checkAge(age) {
  if (age >= 18) {
*!*
    return true;
*/!*
  } else {
*!*
    return confirm('Got a permission from the parents?');
*/!*
  }
}

let age = prompt('How old are you?', 18);

if ( checkAge(age) ) {
  alert( 'Access granted' );
} else {
  alert( 'Access denied' );
}
```

只使用 `return` 但没有返回值也是可行的。但这会导致函数立即退出。

例如：

```js
function showMovie(age) {
  if ( !checkAge(age) ) {
*!*
    return;
*/!*
  }

  alert( "Showing you the movie" ); // (*)
  // ...
}
```

在上述代码中，如果 `checkAge(age)` 返回 `false`，那么 `showMovie` 将不会运行到 `alert`。

````smart header="空值的 `return` 或没有 `return` 的函数返回值为 `undefined`"
如果函数无返回值，它就会像返回 `undefined` 一样：

```js run
function doNothing() { /* 没有代码 */ }

alert( doNothing() === undefined ); // true
```

空值的 `return` 和 `return undefined` 等效：

```js run
function doNothing() {
  return;
}

alert( doNothing() === undefined ); // true
```
````

````warn header="不要在 `return` 与返回值之间添加新行"
对于 `return` 的长表达式，可能你会很想将其放在单独一行，如下所示：

```js
return
 (some + long + expression + or + whatever * f(a) + f(b))
```
但这不行，因为 JavaScript 默认会在 `return` 之后加上分号。上面这段代码和下面这段代码运行流程相同：

```js
return*!*;*/!*
 (some + long + expression + or + whatever * f(a) + f(b))
```

因此，实际上它的返回值变成了空值。

如果我们想要将返回的表达式写成跨多行的形式，那么应该在 `return` 的同一行开始写此表达式。或者至少按照如下的方式放上左括号：

```js
return (
  some + long + expression
  + or +
  whatever * f(a) + f(b)
  )
```
然后它就能像我们预想的那样正常运行了。
````

## 函数命名 [#function-naming]

函数就是行为（action）。所以它们的名字通常是动词。它应该简短且尽可能准确地描述函数的作用。这样读代码的人就能清楚地知道这个函数的功能。

一种普遍的做法是用动词前缀来开始一个函数，这个前缀模糊地描述了这个行为。团队内部必须就前缀的含义达成一致。

例如，以 `"show"` 开头的函数通常会显示某些内容。

函数以 XX 开始……

- `"get…"` —— 返回一个值，
- `"calc…"` —— 计算某些内容，
- `"create…"` —— 创建某些内容，
- `"check…"` —— 检查某些内容并返回 boolean 值，等。

这类名字的示例：

```js no-beautify
showMessage(..)     // 显示信息
getAge(..)          // 返回 age（gets it somehow）
calcSum(..)         // 计算求和并返回结果
createForm(..)      // 创建表格（通常会返回它）
checkPermission(..) // 检查权限并返回 true/false
```

有了前缀，只需瞥一眼函数名，就可以了解它的功能是什么，返回什么样的值。

```smart header="一个函数 —— 一个行为"
一个函数应该只包含函数名所指定的功能，而不是做更多与函数名无关的功能。

两个独立的行为通常需要两个函数，即使它们通常被一起调用（在这种情况下，我们可以创建第三个函数来调用这两个函数）。

有几个违反这一规则的例子：

- `getAge` —— 如果它通过 `alert` 将 age 显示出来，那就有问题了（只应该是获取）。
- `createForm` —— 如果它包含修改文档的操作，例如向文档添加一个表单，那就有问题了（只应该创建表单并返回）。
- `checkPermission` —— 如果它显示 `access granted/denied` 消息，那就有问题了（只应执行检查并返回结果）。

这些例子假设函数名前缀具有通用的含义。你和你的团队可以自定义这些函数名前缀的含义，但是通常都没有太大的不同。无论怎样，你都应该对函数名前缀的含义、带特定前缀的函数可以做什么以及不可以做什么有深刻的了解。所有相同前缀的函数都应该遵守相同的规则。并且，团队成员应该形成共识。
```

```smart header="非常短的函数命名"
常用的函数有时会有**非常短**的名字。

例如，[jQuery](http://jquery.com) 框架用 `$` 定义一个函数。[LoDash](http://lodash.com/) 库的核心函数用 `_` 命名。

这些都是例外，一般而言，函数名应简明扼要且具有描述性。
```

## 函数 == 注释

函数应该简短且只有一个功能。如果这个函数功能复杂，那么把该函数拆分成几个小的函数是值得的。有时候遵循这个规则并不是那么容易，但这绝对是件好事。

一个单独的函数不仅更容易测试和调试 —— 它的存在本身就是一个很好的注释！

例如，比较如下两个函数 `showPrimes(n)`。它们的功能都是输出到 `n` 的 [素数](https://en.wikipedia.org/wiki/Prime_number)。

第一个变体使用了一个标签：

```js
function showPrimes(n) {
  nextPrime: for (let i = 2; i < n; i++) {

    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }

    alert( i ); // 一个素数
  }
}
```

第二个变体使用附加函数 `isPrime(n)` 来检验素数：

```js
function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    *!*if (!isPrime(i)) continue;*/!*

    alert(i);  // 一个素数
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if ( n % i == 0) return false;
  }
  return true;
}
```

第二个变体更容易理解，不是吗？我们通过函数名（`isPrime`）就可以看出函数的行为，而不需要通过代码。人们通常把这样的代码称为 **自描述**。

因此，即使我们不打算重用它们，也可以创建函数。函数可以让代码结构更清晰，可读性更强。

## 总结

函数声明方式如下所示：

```js
function name(parameters, delimited, by, comma) {
  /* code */
}
```

- 作为参数传递给函数的值，会被复制到函数的局部变量。
- 函数可以访问外部变量。但它只能从内到外起作用。函数外部的代码看不到函数内的局部变量。
- 函数可以返回值。如果没有返回值，则其返回的结果是 `undefined`。

为了使代码简洁易懂，建议在函数中主要使用局部变量和参数，而不是外部变量。

与不获取参数但将修改外部变量作为副作用的函数相比，获取参数、使用参数并返回结果的函数更容易理解。

函数命名：

- 函数名应该清楚地描述函数的功能。当我们在代码中看到一个函数调用时，一个好的函数名能够让我们马上知道这个函数的功能是什么，会返回什么。
- 一个函数是一个行为，所以函数名通常是动词。
- 目前有许多优秀的函数名前缀，如 `create…`、`show…`、`get…`、`check…` 等等。使用它们来提示函数的作用吧。

函数是脚本的主要构建块。现在我们已经介绍了基本知识，现在我们就可以开始创建和使用函数了。但这只是学习和使用函数的开始。我们将继续学习更多函数的相关知识，更深入地研究它们的先进特征。
