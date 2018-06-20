
# 对象的键、值、项

单个数据结构告一段落，下面我们让讨论如何迭代它们。

在前面的章节中，我们认识了 `map.keys()`，`map.value()`，`map.entries()`。

这些方法是广义的，对于数据结构，我们约定俗成使用它们。如果我们曾经自己创建过数据结构，我们也应该实现过它们。

它们支持：

- `Map`
- `Set`
- `Array` （除了 `arr.values()`）

纯对象也支持这些方法，但是语法上有一些不同

## Object.keys、values、entries 三个方法

对于纯对象，下列方法是可用的：

- [Object.keys(obj)](mdn:js/Object/keys) —— 返回包含所有键的数组。
- [Object.values(obj)](mdn:js/Object/values) —— 返回包含所有值的数组。
- [Object.entries(obj)](mdn:js/Object/entries) —— 返回包含所有 `[key, value]` 键值对的数组。

... 但是请注意区别（比如说跟 map 的区别）：

|             | Map              | Object       |
|-------------|------------------|--------------|
| 调用语法     | `map.keys()`  | `Object.keys(obj)`，而不是 `obj.keys()` |
| 返回值      | 可迭代项 |「真正的」数组   

第一个区别是在对象中我们的调用语法是 `Object.key(obj)`，而不是 `obj.key()`。

为什么会这样？主要原因是弹性化。请记住，在 JavaScript 中对象是所有复杂数据结构的基础。因此我们可能自己创建一个对象，比如 `order`，然后实现它自己的方法 `order.values()`。那么，我们依然可以对它调用 `Object.values(order)` 方法。

第二个区别是 `Object.*` 方法返回的是「真正的」数组对象，而不是可迭代项。这主要是历史原因。

举个例子：

```js
let user = {
  name: "John",
  age: 30
};
```

- `Object.keys(user) = [name, age]`
- `Object.values(user) = ["John", 30]`
- `Object.entries(user) = [ ["name","John"], ["age",30] ]`

下面这个例子中，使用了 `Object.values` 在属性值上做循环操作：

```js run
let user = {
  name: "John",
  age: 30
};

// 循环所有的值
for (let value of Object.values(user)) {
  alert(value); // John, then 30
}
```

## Object.keys/values/entries 忽略 Symbol 类型的属性

就像 `for..in` 循环，这些方法会忽略使用 `Symbol(...)` 作为键的属性。

通常这很方便。但是如果我们也想要获得 Symbol 类型的键，那么有另外不同的方法 [Object.getOwnPropertySymbols](mdn:js/Object/getOwnPropertySymbols) 它会返回一个只包含 Symbol 类型的键的数组。同样，[Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) 返回「所有」键。
