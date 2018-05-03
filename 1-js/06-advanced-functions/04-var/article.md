
# 旧时的 "var"

在前面的[变量](info:variables)那一章，我们讲到了变量声明的三种方式：

1. `let`
2. `const`
3. `var`

`let` 和 `const` 在词法环境中的行为完全一样。

但是 `var` 却是一头源自旧时代的怪兽。在现代脚本中一般不再使用，但它仍存在于陈旧的脚本里。

如果你不打算见识这样的脚本，你可以跳过或推迟阅读这一章，但是你有可能会踩到它的坑。

乍看之下，`var` 和 `let` 的行为相似，即声明变量：

```js run
function sayHi() {
  var phrase = "Hello"; // 局部变量，使用 "var"，而不是 "let"

  alert(phrase); // Hello
}

sayHi();

alert(phrase); // 报错：phrase is not defined
```

...但两者存在区别。

## "var" 没有块级作用域

用 `var` 声明的变量，不是函数范围就是全局的，它们在块内是可见的。

举个例子：

```js
if (true) {
  var test = true; // 用 "var" 而不是 "let"
}

*!*
alert(test); // true，变量在 if 结束后仍存在
*/!*
```

如果我们在第二行使用 `let test`，那么 `alert` 就无法访问到它。因为 `var` 忽略块级代码，所以我们得到了一个全局的 `test`。

循环也是这样，`var` 无法成为块级或循环局部：

```js
for (var i = 0; i < 10; i++) {
  // ...
}

*!*
alert(i); // 10, "i" 在循环结束后仍然可见，它是一个全局变量
*/!*
```

如果一段代码块位于函数内部，那么 `var` 会成为一个函数级的变量：

```js
function sayHi() {
  if (true) {
    var phrase = "Hello";
  }

  alert(phrase); // works
}

sayHi();
alert(phrase); // 报错：phrase is not defined
```

可以看到，`var` 穿透了 `if`、`for` 或其它块级代码。这是因为在早期的 JavaScript 里，块没有词法环境。而 `var` 就是对它的一个回忆。

## "var" 在函数开头被处理

`var` 声明在函数开始时处理（或者全局声明之于脚本开始）。

换言之，`var` 变量在函数开头被定义，无论定义在什么地方（假设定义不在嵌套函数里）。

如下代码：

```js
function sayHi() {
  phrase = "Hello";

  alert(phrase);

*!*
  var phrase;
*/!*
}
```

...它完全等同于这个（`var phrase` 上提）：

```js
function sayHi() {
*!*
  var phrase;
*/!*

  phrase = "Hello";

  alert(phrase);
}
```

...甚至是这种的（记住，代码块是会被忽略的）：

```js
function sayHi() {
  phrase = "Hello"; // (*)

  *!*
  if (false) {
    var phrase;
  }
  */!*

  alert(phrase);
}
```

这种行为一般称为「提升」，因为所有的 `var` 都会被「提升」到函数的顶部。

所以在上面的例子中，`if (false)` 分支永远都不会执行，但没关系，它里面的 `var` 会在函数开始时被处理，所以在执行 `(*)` 那行代码时，变量是存在的。

**声明会被提升，但是赋值不会。**

我们最好用例子来说明：

```js run
function sayHi() {
  alert(phrase);  

*!*
  var phrase = "Hello";
*/!*
}

sayHi();
```

`var phrase = "Hello"` 这行包含两个步骤：

1. 使用 `var` 声明变量；
2. 使用 `=` 给变量赋值。

声明在函数执行的开始进行（「提升」），但是赋值是在它出现的地方，所以代码实际上是这样工作的：

```js run
function sayHi() {
*!*
  var phrase; // 声明在开头工作……
*/!*

  alert(phrase); // undefined

*!*
  phrase = "Hello"; // ...赋值 - 当执行到这里时。
*/!*
}

sayHi();
```

因为所有的 `var` 声明都是在函数开头处理的，我们可以在任何地方引用它们，但是在它们被赋值之前都是 undefined。

上面两个例子中 `alert` 运行不会报错，因为变量 `phrase` 是存在的，但是它还没有被赋值，所以它表现为 `undefiend`。

## 总结

`var` 声明变量有两点主要区别：

1. 变量没有块作用域，它们在最小函数级可见；
2. 变量声明在函数开头处理。

涉及全局对象时，还有一个小的区别，我们会在下一章讲解。

这些区别实际上很多时候都不是好事。首先，我们无法创建块级局部变量。而且变量提升会造成更多的错误。所以，在新近的脚本里，`var` 就很少见了。
