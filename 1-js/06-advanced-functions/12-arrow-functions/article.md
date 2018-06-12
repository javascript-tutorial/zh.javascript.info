# 深入研究箭头函数

我们深入研究下箭头函数

箭头功能不仅仅是用来简写的快速方法。

JavaScript 充满了需要编写一个小函数其他地方执行的情况。

例如：

- `arr.forEach(func)` -- `forEach` 对每个数组元素执行 `func`。
- `setTimeout(func)` -- `func` 由内置调度程序执行。
- ......等等。

JavaScript 的精髓在于创建一个函数并将其传递到某个地方

在这种函数依赖当前上下文。

## 箭头功能没有 "this"

正如我们从 <info:object-methods> 一章所学的那样，箭头函数没有 `this`。如果访问 `this`，则从外部获取。

例如，我们可以用它在对象方法中迭代：

```js run
let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
*!*
    this.students.forEach(
      student => alert(this.title + ': ' + student)
    );
*/!*
  }
};

group.showList();
```

这里 `forEach` 中使用了箭头函数，所以 `this.title` 和外部方法 `showList` 完全一样。那就是：`group.title`。

如果我们使用正常函数，则会出现错误：

```js run
let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
*!*
    this.students.forEach(function(student) {
      // Error: Cannot read property 'title' of undefined
      alert(this.title + ': ' + student)
    });
*/!*
  }
};

group.showList();
```

报错是因为 `forEach` 默认情况下运行带 `this = undefined` 的函数，因此尝试访问是 `undefined.title`。

但箭头函数就没事，因为它们没有`this`。

```warn header="Arrow functions can't run with `new`"
不具有 `this` 自然意味着另一个限制：箭头函数不能用作构造函数。他们不能用 `new` 调用。
```

```smart header="Arrow functions VS bind"
箭头函数`=>` 和正常函数通过 `.bind(this)` 调用有一个微妙的区别:

- `.bind(this)` 创建该函数的 “绑定版本”。
- 箭头函数 `=>` 不会创建任何绑定。该函数根本没有 `this`。在外部上下文中，`this` 的查找与普通变量搜索完全相同。
```

## 箭头函数没有 "arguments"（参数）

箭头函数也没有 `arguments` 变量。

对于装饰者来说，这非常好，因为我们需要用当前的 `this` 和 `arguments` 转发一个调用。

例如， `defer(f, ms)` 得到一个函数，并返回一个包装函数，以`毫秒`为单位延迟调用：

```js run
function defer(f, ms) {
  return function() {
    setTimeout(() => f.apply(this, arguments), ms)
  };
}

function sayHi(who) {
  alert('Hello, ' + who);
}

let sayHiDeferred = defer(sayHi, 2000);
sayHiDeferred("John"); // 2秒后打印 Hello, John
```

没有箭头功能的情况如下所示：

```js
function defer(f, ms) {
  return function(...args) {
    let ctx = this;
    setTimeout(function() {
      return f.apply(ctx, args);
    }, ms);
  };
}
```

在这里，我们必须创建额外的变量 `args` 和` ctx`，以便 `setTimeout` 内部的函数可以接收它们。

## 总结

箭头函数：

- 没有 `this`。
- 没有 `arguments`。
- 不能使用 `new`。
- (他们也没有 `super`，我们将在这一章 <info:class-inheritance> 研究)。

所以它们适用于没有自己的“上下文”的短代码片段，比如在当前的代码大放光彩。
