**答案： `rabbit`。**

这是因为 `this` 是“点”之前对象，因此 `rabbit.eat()` 修改了 `rabbit`。

属性查找和执行是两件不同的事情。
`rabbit.eat` 方法在原型中被第一个找到，然后执行 `this=rabbit`。
