
# 对象的键、值、项

<<<<<<< HEAD:1-js/05-data-types/08-keys-values-entries/article.md
单个数据结构告一段落，下面我们让讨论如何迭代它们。
=======
Let's step away from the individual data structures and talk about the iterations over them.
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a:1-js/05-data-types/09-keys-values-entries/article.md

在前面的章节中，我们认识了 `map.keys()`，`map.values()`，`map.entries()`。

<<<<<<< HEAD:1-js/05-data-types/08-keys-values-entries/article.md
这些方法是通用的，有一个共同的约定来将它们用于各种数据结构。如果我们创建一个我们自己的数据结构，我们也应该实现这些方法。
=======
These methods are generic, there is a common agreement to use them for data structures. If we ever create a data structure of our own, we should implement them too.
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a:1-js/05-data-types/09-keys-values-entries/article.md

它们支持：

- `Map`
- `Set`
- `Array`（除了 `arr.values()`）

纯对象也支持类似的方法，但是语法上有一些不同

## Object.keys、values、entries 三个方法

对于纯对象，下列方法是可用的：

- [Object.keys(obj)](mdn:js/Object/keys) —— 返回一个包含该对象全部的键的数组。
- [Object.values(obj)](mdn:js/Object/values) —— 返回一个包含该对象全部的值的数组。
- [Object.entries(obj)](mdn:js/Object/entries) —— 返回一个包含该对象全部 [key, value] 键值对的数组。

<<<<<<< HEAD:1-js/05-data-types/08-keys-values-entries/article.md
... 但是请注意区别（比如说跟 map 的区别）：
=======
Please note the distinctions (compared to map for example):
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a:1-js/05-data-types/09-keys-values-entries/article.md

|             | Map              | Object       |
|-------------|------------------|--------------|
| 调用语法     | `map.keys()`  | `Object.keys(obj)`，而不是 `obj.keys()` |
| 返回值      | 可迭代项 |「真正的」数组   

第一个区别是在对象中我们的调用语法是 `Object.keys(obj)`，而不是 `obj.keys()`。

<<<<<<< HEAD:1-js/05-data-types/08-keys-values-entries/article.md
为什么会这样？主要原因是保持灵活。请记住，在 JavaScript 中对象是所有复杂数据结构的基础。所以我们可能有一个我们自己创建的对象，比如 `order`，它实现了自己的方法 `order.values()`。同时，我们依然可以对它调用 `Object.values(order)` 方法。
=======
Why so? The main reason is flexibility. Remember, objects are a base of all complex structures in JavaScript. So we may have an object of our own like `data` that implements its own `data.values()` method. And we still can call `Object.values(data)` on it.
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a:1-js/05-data-types/09-keys-values-entries/article.md

第二个区别是 `Object.*` 方法返回的是「真正的」数组对象，而不是可迭代项。这主要是历史原因。

举个例子：

```js
let user = {
  name: "John",
  age: 30
};
```

- `Object.keys(user) = ["name", "age"]`
- `Object.values(user) = ["John", 30]`
- `Object.entries(user) = [ ["name","John"], ["age",30] ]`

这里有一个使用 `Object.values` 来遍历属性值的例子：

```js run
let user = {
  name: "John",
  age: 30
};

// 遍历所有的值
for (let value of Object.values(user)) {
  alert(value); // John, then 30
}
```

<<<<<<< HEAD:1-js/05-data-types/08-keys-values-entries/article.md

## Object.keys/values/entries 忽略 Symbol 类型的属性

就像 `for..in` 循环，这些方法会忽略使用 `Symbol(...)` 作为键的属性。

通常这很方便。但是如果我们也想要获得 Symbol 类型的键，那么有另外不同的方法 [Object.getOwnPropertySymbols](mdn:js/Object/getOwnPropertySymbols)， 它会返回一个只包含 Symbol 类型的键的数组。同样，[Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) 方法会返回「所有」键。
=======
```warn header="Object.keys/values/entries ignore symbolic properties"
Just like a `for..in` loop, these methods ignore properties that use `Symbol(...)` as keys.

Usually that's convenient. But if we want symbolic keys too, then there's a separate method [Object.getOwnPropertySymbols](mdn:js/Object/getOwnPropertySymbols) that returns an array of only symbolic keys. Also, there exist a method [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) that returns *all* keys.
```


## Transforming objects

Objects lack many methods that exist for arrays, e.g. `map`, `filter` and others.

If we'd like to apply them, then we can use `Object.entries` followed `Object.fromEntries`:

1. Use `Object.entries(obj)` to get an array of key/value pairs from `obj`.
2. Use array methods on that array, e.g. `map`.
3. Use `Object.fromEntries(array)` on the resulting array to turn it back into an object.

For example, we have an object with prices, and would like to double them:

```js run
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

*!*
let doublePrices = Object.fromEntries(
  // convert to array, map, and then fromEntries gives back the object
  Object.entries(prices).map(([key, value]) => [key, value * 2])
);
*/!*

alert(doublePrices.meat); // 8
```   

It may look difficult from the first sight, but becomes easy to understand after you use it once or twice.

We can make powerful one-liners for more complex transforms this way. It's only important to keep balance, so that the code is still simple enough to understand it.
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a:1-js/05-data-types/09-keys-values-entries/article.md
