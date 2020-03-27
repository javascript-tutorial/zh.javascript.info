
我们可以通过输出它，来看看它是属于哪个类的，像这样：

```js run
alert(document); // [object HTMLDocument]
```

或者：

```js run
alert(document.constructor.name); // HTMLDocument
```

因此，`document` 是 `HTMLDocument` 类的一个实例。

它位于 DOM 层次结构（hierarchy）中的什么位置？

是的，我们可以浏览规范，但是手动找出它会更快。

我们通过 `__proto__` 来遍历原型链。

正如我们所知道的，类的方法在 constructor 的 `prototype` 中。例如，`HTMLDocument.prototype` 有用于文档（document）的方法。

此外，在 `prototype` 中还有一个对构造函数的引用：

```js run
alert(HTMLDocument.prototype.constructor === HTMLDocument); // true
```

为了以字符串的形式获取一个类的 name，我们可以使用 `constructor.name`。让我们对整个 `document` 的原型链执行该操作，直到 class `Node`：

```js run
alert(HTMLDocument.prototype.constructor.name); // HTMLDocument
alert(HTMLDocument.prototype.__proto__.constructor.name); // Document
alert(HTMLDocument.prototype.__proto__.__proto__.constructor.name); // Node
```

这就是层次结构。

我们还可以使用 `console.dir(document)` 来检查对象，并通过打开 `__proto__` 来查看这些名称。控制台将它们从 `constructor` 内部取出来。
