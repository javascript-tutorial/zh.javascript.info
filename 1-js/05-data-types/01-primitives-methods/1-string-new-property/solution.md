
试试运行：

```js run
let str = "Hello";

str.test = 5; // (*)

alert(str.test);
```

<<<<<<< HEAD
这里有两种结果：

1. `undefined`
2. 报错。
=======
Depending on whether you have `use strict` or not, the result may be:
1. `undefined` (no strict mode)
2. An error (strict mode).
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

在 `(*)` 的那一行到底发生了什么呢：

<<<<<<< HEAD
1. 当访问 `str` 的属性时，创建一个“包装对象”。
2. 当对属性进行操作的时候。这个对象获得了 `test` 属性。
3. 操作结束，“包装对象”消失。

在最后一行，对字符串上的新的包装对象的每个对象操作，`str` 不再追踪这个属性。

一些浏览器进一步限制程序员，并且不允许将属性分配给基本类型。这就是为什么它有点远离规范，但在实践中我们却可以在 `(*)` 行看到错误。
=======
1. When a property of `str` is accessed, a "wrapper object" is created.
2. In strict mode, writing into it is an error.
3. Otherwise, the operation with the property is carried on, the object gets the `test` property, but after that the "wrapper object" disappears.

So, without strict mode, in the last line `str` has no trace of the property.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

**这个例子清楚地表明，基本类型不是对象。**

<<<<<<< HEAD
基本类型不能存储数据。

所有的属性/方法操作都是在临时对象的帮助下执行的。

=======
They can't store additional data.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd
