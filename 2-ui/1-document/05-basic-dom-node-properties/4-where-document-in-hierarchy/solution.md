
通过输出它，我们可以看到它属于哪个类，比如：

```js run
alert(document); // [object HTMLDocument]
```

或者：

```js run
alert(document.constructor.name); // HTMLDocument
```

因此 `document` 是 `HTMLDocument` 类的一个实例。

它在等级体系中的地位如何？ 

是的，我们可以浏览说明书，但手动会更快。

我们通过 `__proto__` 来遍历原型链中的方法。

正如我们所知道的，类的方法在构造函数的 `prototype` 中。例如 `HTMLDocument.prototype` 有用于文档的方法。

此外，在 `prototype` 中还有对构造函数的引用：

```js run
alert(HTMLDocument.prototype.constructor === HTMLDocument); // true
```

<<<<<<< HEAD
对于所有原型中的内置类，有一个 `constructor` 引用，我们可以获取 `constructor.name` 来查看类名。我们为 `document` 原型链中的所有对象执行以下操作：
=======
To get a name of the class as a string, we can use `constructor.name`. Let's do it for the whole `document` prototype chain, till class `Node`:
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

```js run
alert(HTMLDocument.prototype.constructor.name); // HTMLDocument
alert(HTMLDocument.prototype.__proto__.constructor.name); // Document
alert(HTMLDocument.prototype.__proto__.__proto__.constructor.name); // Node
```

我们还可以使用 `console.dir(document)` 来检查对象，并通过打开 `__proto__` 来查看这些名称。控制台将它们从 `constructor` 内部取出。
