
试试运行一下：

```js run
let str = "Hello";

str.test = 5; // (*)

alert(str.test);
```

<<<<<<< HEAD
根据你是否开启了严格模式 `use strict`，会得到如下结果：
1. `undefined`（非严格模式）
2. 报错（严格模式）。
=======
Depending on whether you have `use strict` or not, the result may be:
1. `undefined` (no strict mode)
2. An error (strict mode).
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

为什么？让我们看看在 `(*)` 那一行到底发生了什么：

<<<<<<< HEAD
1. 当访问 `str` 的属性时，一个“对象包装器”被创建了。
2. 在严格模式下，向其写入内容会报错。
3. 否则，将继续执行带有属性的操作，该对象将获得 `test` 属性，但是此后，“对象包装器”将消失，因此在最后一行，`str` 并没有该属性的踪迹。

**这个例子清楚地表明，原始类型不是对象。**

它们不能存储额外的数据。
=======
1. When a property of `str` is accessed, a "wrapper object" is created.
2. In strict mode, writing into it is an error.
3. Otherwise, the operation with the property is carried on, the object gets the `test` property, but after that the "wrapper object" disappears, so in the last line `str` has no trace of the property.

**This example clearly shows that primitives are not objects.**

They can't store additional data.
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648
