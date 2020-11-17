
# 函数对象，NFE

我们已经知道，在 JavaScript 中，函数就是值。

JavaScript 中的每个值都有一种类型，那么函数是什么类型呢？

在 JavaScript 中，函数就是对象。

一个容易理解的方式是把函数想象成可被调用的“行为对象（action object）”。我们不仅可以调用它们，还能把它们当作对象来处理：增/删属性，按引用传递等。


## 属性 "name"

函数对象包含一些便于使用的属性。

比如，一个函数的名字可以通过属性 "name" 来访问：

```js run
function sayHi() {
  alert("Hi");
}

alert(sayHi.name); // sayHi
```

更有趣的是，名称赋值的逻辑很智能。即使函数被创建时没有名字，名称赋值的逻辑也能给它赋予一个正确的名字，然后进行赋值：

```js run
let sayHi = function() {
  alert("Hi");
};

alert(sayHi.name); // sayHi（有名字！）
```

当以默认值的方式完成了赋值时，它也有效：

```js run
function f(sayHi = function() {}) {
  alert(sayHi.name); // sayHi（生效了！）
}

f();
```

规范中把这种特性叫做「上下文命名」。如果函数自己没有提供，那么在赋值中，会根据上下文来推测一个。

对象方法也有名字：

```js run
let user = {

  sayHi() {
    // ...
  },

  sayBye: function() {
    // ...
  }

}

alert(user.sayHi.name); // sayHi
alert(user.sayBye.name); // sayBye
```

这没有什么神奇的。有时会出现无法推测名字的情况。此时，属性 `name` 会是空，像这样：

```js
// 函数是在数组中创建的
let arr = [function() {}];

alert( arr[0].name ); // <空字符串>
// 引擎无法设置正确的名字，所以没有值
```

而实际上，大多数函数都是有名字的。

## 属性 "length"

还有另一个内置属性 "length"，它返回函数入参的个数，比如：

```js run
function f1(a) {}
function f2(a, b) {}
function many(a, b, ...more) {}

alert(f1.length); // 1
alert(f2.length); // 2
alert(many.length); // 2
```

可以看到，rest 参数不参与计数。

属性 `length` 有时在操作其它函数的函数中用于做 [内省/运行时检查（introspection）](https://zh.wikipedia.org/wiki/内省_(计算机科学))。

比如，下面的代码中函数 `ask` 接受一个询问答案的参数 `question` 和可能包含任意数量 `handler` 的参数 `...handlers`。

当用户提供了自己的答案后，函数会调用那些 `handlers`。我们可以传入两种 `handlers`：

- 一种是无参函数，它仅在用户回答给出积极的答案时被调用。
- 一种是有参函数，它在两种情况都会被调用，并且返回一个答案。

为了正确地调用 `handler`，我们需要检查 `handler.length` 属性。

我们的想法是，我们用一个简单的无参数的 `handler` 语法来处理积极的回答（最常见的变体），但也要能够提供通用的 handler：

```js run
function ask(question, ...handlers) {
  let isYes = confirm(question);

  for(let handler of handlers) {
    if (handler.length == 0) {
      if (isYes) handler();
    } else {
      handler(isYes);
    }
  }

}

// 对于积极的回答，两个 handler 都会被调用
// 对于负面的回答，只有第二个 handler 被调用
ask("Question?", () => alert('You said yes'), result => alert(result));
```

这种特别的情况就是所谓的 [多态性](https://en.wikipedia.org/wiki/Polymorphism_(computer_science)) —— 根据参数的类型，或者根据在我们的具体情景下的 `length` 来做不同的处理。这种思想在 JavaScript 的库里有应用。

## 自定义属性

我们也可以添加我们自己的属性。

这里我们添加了 `counter` 属性，用来跟踪总的调用次数：

```js run
function sayHi() {
  alert("Hi");

  *!*
  // 计算调用次数
  sayHi.counter++;
  */!*
}
sayHi.counter = 0; // 初始值

sayHi(); // Hi
sayHi(); // Hi

alert( `Called ${sayHi.counter} times` ); // Called 2 times
```

```warn header="属性不是变量"
被赋值给函数的属性，比如 `sayHi.counter = 0`，**不会** 在函数内定义一个局部变量 `counter`。换句话说，属性 `counter` 和变量 `let counter` 是毫不相关的两个东西。

我们可以把函数当作对象，在它里面存储属性，但是这对它的执行没有任何影响。变量不是函数属性，反之亦然。它们之间是平行的。
```

函数属性有时会用来替代闭包。例如，我们可以使用函数属性将 <info:closure> 章节中 counter 函数的例子进行重写：

```js run
function makeCounter() {
  // 不需要这个了
  // let count = 0

  function counter() {
    return counter.count++;
  };

  counter.count = 0;

  return counter;
}

let counter = makeCounter();
alert( counter() ); // 0
alert( counter() ); // 1
```

现在 `count` 被直接存储在函数里，而不是它外部的词法环境。

那么它和闭包谁好谁赖？

两者最大的不同就是如果 `count` 的值位于外层（函数）变量中，那么外部的代码无法访问到它，只有嵌套的函数可以修改它。而如果它是绑定到函数的，那么就很容易：

```js run
function makeCounter() {

  function counter() {
    return counter.count++;
  };

  counter.count = 0;

  return counter;
}

let counter = makeCounter();

*!*
counter.count = 10;
alert( counter() ); // 10
*/!*
```

所以，选择哪种实现方式取决于我们的需求是什么。

## 命名函数表达式

命名函数表达式（NFE，Named Function Expression），指带有名字的函数表达式的术语。

例如，让我们写一个普通的函数表达式：

```js
let sayHi = function(who) {
  alert(`Hello, ${who}`);
};
```

然后给它加一个名字：

```js
let sayHi = function *!*func*/!*(who) {
  alert(`Hello, ${who}`);
};
```

我们这里得到了什么吗？为它添加一个 `"func"` 名字的目的是什么？

首先请注意，它仍然是一个函数表达式。在 `function` 后面加一个名字 `"func"` 没有使它成为一个函数声明，因为它仍然是作为赋值表达式中的一部分被创建的。

添加这个名字当然也没有打破任何东西。

函数依然可以通过 `sayHi()` 来调用：

```js run
let sayHi = function *!*func*/!*(who) {
  alert(`Hello, ${who}`);
};

sayHi("John"); // Hello, John
```

关于名字 `func` 有两个特殊的地方，这就是添加它的原因：

1. 它允许函数在内部引用自己。
2. 它在函数外是不可见的。

例如，下面的函数 `sayHi` 会在没有入参 `who` 时，以 `"Guest"` 为入参调用自己：

```js run
let sayHi = function *!*func*/!*(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    func("Guest"); // 使用 func 再次调用函数自身
*/!*
  }
};

sayHi(); // Hello, Guest

// 但这不工作：
func(); // Error, func is not defined（在函数外不可见）
```

我们为什么使用 `func` 呢？为什么不直接使用 `sayHi` 进行嵌套调用？


当然，在大多数情况下我们可以这样做：

```js
let sayHi = function(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    sayHi("Guest");
*/!*
  }
};
```

上面这段代码的问题在于 `sayHi` 的值可能会被函数外部的代码改变。如果该函数被赋值给另外一个变量（译注：也就是原变量被修改），那么函数就会开始报错：

```js run
let sayHi = function(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    sayHi("Guest"); // Error: sayHi is not a function
*/!*
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Error，嵌套调用 sayHi 不再有效！
```

发生这种情况是因为该函数从它的外部词法环境获取 `sayHi`。没有局部的 `sayHi` 了，所以使用外部变量。而当调用时，外部的 `sayHi` 是 `null`。

我们给函数表达式添加的可选的名字，正是用来解决这类问题的。

让我们使用它来修复我们的代码：

```js run
let sayHi = function *!*func*/!*(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    func("Guest"); // 现在一切正常
*/!*
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Hello, Guest（嵌套调用有效）
```

现在它可以正常运行了，因为名字 `func` 是函数局部域的。它不是从外部获取的（而且它对外部也是不可见的）。规范确保它只会引用当前函数。

外部代码仍然有该函数的 `sayHi` 或 `welcome` 变量。而且 `func` 是一个“内部函数名”，可用于函数在自身内部进行自调用。

```smart header="函数声明没有这个东西"
这里所讲的“内部名”特性只针对函数表达式，而不是函数声明。对于函数声明，没有用来添加“内部”名的语法。

有时，当我们需要一个可靠的内部名时，这就成为了你把函数声明重写成函数表达式的理由了。
```

## 总结

函数就是对象。

我们介绍了它们的一些属性：

- `name` —— 函数的名字。通常取自函数定义，但如果函数定义时没设定函数名，JavaScript 会尝试通过函数的上下文猜一个函数名（例如把赋值的变量名取为函数名）。
- `length` —— 函数定义时的入参的个数。Rest 参数不参与计数。

如果函数是通过函数表达式的形式被声明的（不是在主代码流里），并且附带了名字，那么它被称为命名函数表达式（Named Function Expression）。这个名字可以用于在该函数内部进行自调用，例如递归调用等。

此外，函数可以带有额外的属性。很多知名的 JavaScript 库都充分利用了这个功能。

它们创建一个“主”函数，然后给它附加很多其它“辅助”函数。例如，[jQuery](https://jquery.com) 库创建了一个名为 `$` 的函数。[lodash](https://lodash.com) 库创建一个 `_` 函数，然后为其添加了 `_.add`、`_.keyBy` 以及其它属性（想要了解更多内容，参查阅 [docs](https://lodash.com/docs)）。实际上，它们这么做是为了减少对全局空间的污染，这样一个库就只会有一个全局变量。这样就降低了命名冲突的可能性。

所以，一个函数本身可以完成一项有用的工作，还可以在自身的属性中附带许多其他功能。
