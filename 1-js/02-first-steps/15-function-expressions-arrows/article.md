# 函数表达式和箭头函数

JavaScript 中，函数虽然不是万能的，它却是一个特殊的值。

下面的语法我们通常叫**函数声明**：

```js
function sayHi() {
  alert( "Hello" );
}
```

下面是另一种创建函数的方法叫**函数表达式**。

通常会写成这样：

```js
let sayHi = function() {
  alert( "Hello" );
};
```

在这里，函数被创建并像其他赋值一样，明确的分配给了一个变量。不管函数如何定义，它只是一个存储在变量中的值 `sayHi`。

这两段示例代码的意思是一样的：“创建一个函数，并把它存进变量 `sayHi`”。

我们还可以用 `alert` 打印这个变量值：

```js run
function sayHi() {
  alert( "Hello" );
}

*!*
alert( sayHi ); // 查看函数代码
*/!*
```

注意，最后一行代码并没有运行函数，因为 `sayHi` 后没有括号。在其他语言中，只要提到函数的名称都会导致它调用执行，但 JavaScript 可不是这样。

JavaScript 中，函数是一个值，所以我们可以把它当成值对待。上面代码显示了一段字符串值，即函数的源码。

的确，在某种意义上说一个函数是一个特殊值，我们可以像 `sayHi()` 这样调用它。

但它依然是一个值，所以我们可以像使用其他类型的值一样使用它。

我们可以复制函数到其他变量：

```js run no-beautify
function sayHi() {   // (1) 创建
  alert( "Hello" );
}

let func = sayHi;    // (2) 复制

func(); // Hello     // (3) 运行复制的值（正常运行）！
sayHi(); // Hello    //     这里也能运行（为什么不行呢）
```

上段代码发生的细节：

1. `(1)` 中声明创建了函数，并把它放入变量 `sayHi`。
2. `(2)` 复制进变量 `func`。请注意：`sayHi` 旁边没有括号。如果有括号，`func = sayHi()` 会把 `sayHi()` 的调用结果写进`func`, 而不是 `sayHi` **函数**本身。
3. 现在调用 `sayHi()` 和 `func()`。

注意这里的第一行我们用函数表达式声明 `sayHi`：

```js
let sayHi = function() {
  alert( "Hello" );
};

let func = sayHi;
// ...
```

这两种声明的函数是一样的。


````smart header="为很么在末尾会有个分号？"
你可能想知道，为什么函数表达式结尾有一个 `;`，而函数声明没有：

```js
function sayHi() {
  // ...
}

let sayHi = function() {
  // ...
}*!*;*/!*
```

答案很简单：
- 在代码块的结尾是不需要 `;`，像 `if { ... }`，`for {  }`，`function f { }` 等语法结构后面都不用加。
- 函数表达式通常这样声明： `let sayHi = ...;`，作为一个变量。它不是代码块而是一段赋值语句。不管什么值，建议在语句结尾处建议使用分号 `;`。所以这里的分号与函数表达式本身没有任何关系，它只是终止了语句。
````

## 回调函数

让我们来看更多例子，使用函数表达式以值的方式传递函数。

我们写一个包含三个参数的函数 `ask(question, yes, no)`：

`question`
: question 文本

`yes`
: 当回答 "Yes" 时候运行的脚本

`no`
: 当回答 "No" 时候运行的脚本

函数需要提出 `question`（问题），依赖用户的回答, 调用 `yes()` 或 `no()`：

```js run
*!*
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}
*/!*

function showOk() {
  alert( "You agreed." );
}

function showCancel() {
  alert( "You canceled the execution." );
}

// 用法：函数 showOk 与 showCancel 作为参数传入到 ask
ask("Do you agree?", showOk, showCancel);
```

实际开发中，类似的函数是很常见的。现实生活中的实现与上述示例之间的主要区别在于，现实生活中的功能使用更复杂的方式与用户进行交互，而不是简单 `confirm`（确认）。在浏览器中，这样的功能通常会绘制一个漂亮的问题窗口。但这是另一回事。

`ask` 参数调用**回调函数**或只是**回调**。

我们的想法是，我们传递一个函数，并希望稍后在必要时回调它。在我们的例子中，`showOk` 对应回答 "yes" 的回调，`showCancel` 对应回答“否”。

我们可以用函数表达式简写：

```js run no-beautify
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

*!*
ask(
  "Do you agree?",
  function() { alert("You agreed."); },
  function() { alert("You canceled the execution."); }
);
*/!*
```

这里函数直接写在 `ask(...)` 调用。他们没有名字，所以叫**匿名函数**。在 `ask` 外无法访问（因为没有分配变量），不过我们就是想要这样。

这样看起来舒服, 这就是 JavaScript 神奇的地方。

```smart header="一个函数是表示一个“动作（action）”的值"
字符串或数字等常规值视为**数据（data）**。

函数可以视为一个**动作**。

我们可以在变量之间传递他们，并在需要时运行。
```


## 函数表达式 vs 函数声明

让我们来阐述函数声明和表达式之间的关键区别。

首先是语法：如何在代码中区分它们

- **函数声明：** 函数在主代码流中单独声明。

    ```js
    // 函数声明
    function sum(a, b) {
      return a + b;
    }
    ```
- **函数表达式：** 一个函数，在一个表达式中或另一个语法结构中创建。这里，该函数在赋值表达式 `=` 右侧创建：
    
    ```js
    // 函数表达式
    let sum = function(a, b) {
      return a + b;
    };
    ```

细微差别是在 JavaScript 引擎中在**什么时候**创建函数。

**函数表达式在执行到达时创建，并只有从那时起才可用。**

一旦执行到赋值表达式 `let sum = function…` 的右侧，此函数就会被创建并从此可以使用（复制，调用等）。

函数声明则不同。

**使用函数声明可使它的调用先于声明。**

例如，一个全局函数声明无论在哪里，它都在整个脚本中可见。

那是因为内部的算法。当 JavaScript **准备**运行脚本或代码块时，它首先在其中查找函数声明并创建函数。我们可以将其视为“初始化阶段”。

在处理完所有函数声明后，代码才被执行。所以它能够使用这些函数。

例如下面的代码会正常工作：

```js run refresh untrusted
*!*
sayHi("John"); // Hello, John
*/!*

function sayHi(name) {
  alert( `Hello, ${name}` );
}
```

函数声明 `sayHi` 是在 JavaScript 准备启动脚本时被创建并在所有地方可见。

……如果它是一个函数表达式，它就不会工作：

```js run refresh untrusted
*!*
sayHi("John"); // error!
*/!*

let sayHi = function(name) {  // (*) no magic any more
  alert( `Hello, ${name}` );
};
```

函数表达式执行到时才会创建，只会发生在 `(*)` 行。为时已晚。

函数声明另外一个特别的功能是它们的块级作用域。

**严格模式下，当一个函数声明在一个代码块内运行时，它在该块内的任何地方都是可见的。但块外则相反。**

例如，让我们想象我们需要声明一个函数 `welcome()` 依赖 `age` 这个我们在运行时获得并在之后有可能用到的变量。

如果我们使用函数声明，以下代码不能如愿工作：

```js run
let age = prompt("What is your age?", 18);

// 利用条件判断来声明函数
if (age < 18) {

  function welcome() {
    alert("Hello!");
  }

} else {

  function welcome() {
    alert("Greetings!");
  }

}

// ……稍后使用
*!*
welcome(); // Error: welcome is not defined
*/!*
```

这是因为函数声明只在它所在的代码块中可见。

又如：

```js run
let age = 16; // 拿 16 作为例子

if (age < 18) {
*!*
  welcome();               // \   (运行)
*/!*
                           //  |
  function welcome() {     //  |  
    alert("Hello!");       //  |  函数声明可以在块内任意位置声明
  }                        //  |  
                           //  |
*!*
  welcome();               // /   (运行)
*/!*

} else {

  function welcome() {
    alert("Greetings!");
  }
}

// 在这里，我们在花括号外侧调用函数，
// 所以我们看不到它们内部的函数声明。

*!*
welcome(); // Error: welcome is not defined
*/!*
```

怎么样才能使 `welcome` 在 `if` 外可见？

正确的做法是使用函数表达式并将 `welcome` 赋值给在 `if` 之外声明的变量，并具有正确的可见性.

以下的代码如愿运行：

```js run
let age = prompt("What is your age?", 18);

let welcome;

if (age < 18) {

  welcome = function() {
    alert("Hello!");
  };

} else {

  welcome = function() {
    alert("Greetings!");
  };

}

*!*
welcome(); // ok now
*/!*
```

或者我们可以使用问号运算符 `?` 来进一步简化它：

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  function() { alert("Hello!"); } :
  function() { alert("Greetings!"); };

*!*
welcome(); // ok now
*/!*
```


```smart header="怎么选择函数声明和函数表达式？"
作为一个经验，当我们需要声明一个函数时，首先要考虑的是函数声明语法，这是我们之前使用的语法。它给如何组织我们的代码提供了更多的自由，因为我们可以在声明它们之前调用这些函数。

在代码中查找 `function f(…) {…}` 比 `let f = function(…) {…}` 更容易。

……但是，如果函数声明由于某种原因不适合我们（我们已经看到上面的例子），那么应该使用函数表达式。
```


## 箭头函数 [#箭头函数]

创建函数还有一个非常简单和简洁的语法，通常比函数表达式更好。它被称为“箭头函数”，因为它看起来像这样：


```js
let func = (arg1, arg2, ...argN) => expression
```

……这样会创建一个函数 `func` 参数是 `arg1..argN`，运行右侧 `expression` 并返回结果。

换句话说，它大致与以下相同：

```js
let func = function(arg1, arg2, ...argN) {
  return expression;
}
```

……但是更加精简。

看一个例子：

```js run
let sum = (a, b) => a + b;

/* 箭头函数更短：

let sum = function(a, b) {
  return a + b;
};
*/

alert( sum(1, 2) ); // 3

```

如果我们只有一个参数，那么括号可以省略，甚至更短：

```js run
// 跟这个一样
// let double = function(n) { return n * 2 }
*!*
let double = n => n * 2;
*/!*

alert( double(3) ); // 6
```

如果没有参数，括号应该是空的（但它们应该存在）：

```js run
let sayHi = () => alert("Hello!");

sayHi();
```

箭头函数的使用方式与函数表达式相同。

例如，这里是重写 `welcome()` 的例子:

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  () => alert('Hello') :
  () => alert("Greetings!");

welcome(); // ok now
```

箭头函数在刚开始使用时可能不熟悉也不便于阅读，但是当我们习惯这种结构之后，情况会迅速改变。

当我们懒得写很多单词时，它们对于简单的单行动作非常方便。

```smart header="多行箭头函数"

上面的例子是获取左边的参数 `=>` 并用它们运行右边的表达式。

有时我们需要一些更复杂的东西，比如多个表达式或语句。这也是可能的，但我们应该把它们装在花括号里。然后在他们内部使用正常的 `return`。

像这样：

```js run
let sum = (a, b) => {  // 花括号打开多线功能
  let result = a + b;
*!*
  return result; // 如果我们使用花括号，使用返回来获得结果
*/!*
};

alert( sum(1, 2) ); // 3
```

```smart header="更多介绍"
我们在这里简短地称赞了箭头功能。但那不是全部！箭头功能还有其他有趣的功能。稍后我们将在 <info:arrow-functions> 一章中学习它们。

目前，我们已经可以将它们用于单行动作和回调。
```

## 总结

- 函数是值。他们可以在代码的任何地方分配，复制或声明。
- 如果函数在主代码流中声明为单独的语句，那就称为“函数声明”。
- 如果该函数是作为表达式的一部分创建的，则称其为“函数表达式”。
- 函数声明在代码块执行之前处理。它们在代码块中随处调用。
- 函数表达式在执行流程到时创建。

在大多数情况下，当我们需要声明一个函数时，函数声明是可取的，因为它在声明本身之前是可见的。这给了我们更多的代码组织的灵活性，并且通常更具可读性。

所以我们应该只在函数声明不适合任务时才使用函数表达式。在本章中我们已经看到了几个例子，并且将来会看到更多的例子。

箭头函数非常适合单行调用，以下是其两个特点。

1. 没有大括号：`(...args) => expression` —— 右侧是一个表达式：该函数对其进行运行并返回结果。
2. 有大括号：`(...args) => { body }` —— 括号允许我们在函数中写入多个语句，但是我们需要一个显式的 `return` 来返回一些东西。
