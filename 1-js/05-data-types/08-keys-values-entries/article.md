
# 对象的键、值、项

<<<<<<< HEAD
单个数据结构告一段落，下面我们让讨论如何迭代它们。
=======
Let's step away from the individual data structures and talk about the iterations over them.
>>>>>>> 027933531e121650120f7e8385f691de99af12d2

在前面的章节中，我们认识了 `map.keys()`，`map.values()`，`map.entries()`。

<<<<<<< HEAD
这些方法是通用的，有一个共同的约定来将它们用于各种数据结构。如果我们创建一个我们自己的数据结构，我们也应该实现这些方法。
=======
These methods are generic, there is a common agreement to use them for data structures. If we ever create a data structure of our own, we should implement them too.
>>>>>>> 027933531e121650120f7e8385f691de99af12d2

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

... 但是请注意区别（比如说跟 map 的区别）：

|             | Map              | Object       |
|-------------|------------------|--------------|
| 调用语法     | `map.keys()`  | `Object.keys(obj)`，而不是 `obj.keys()` |
| 返回值      | 可迭代项 |「真正的」数组   

第一个区别是在对象中我们的调用语法是 `Object.keys(obj)`，而不是 `obj.keys()`。

为什么会这样？主要原因是保持灵活。请记住，在 JavaScript 中对象是所有复杂数据结构的基础。所以我们可能有一个我们自己创建的对象，比如 `order`，它实现了自己的方法 `order.values()`。同时，我们依然可以对它调用 `Object.values(order)` 方法。

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

<<<<<<< HEAD

## Object.keys/values/entries 忽略 Symbol 类型的属性

就像 `for..in` 循环，这些方法会忽略使用 `Symbol(...)` 作为键的属性。

通常这很方便。但是如果我们也想要获得 Symbol 类型的键，那么有另外不同的方法 [Object.getOwnPropertySymbols](mdn:js/Object/getOwnPropertySymbols)， 它会返回一个只包含 Symbol 类型的键的数组。同样，[Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) 方法会返回「所有」键。
=======
```warn header="Object.keys/values/entries ignore symbolic properties"
Just like a `for..in` loop, these methods ignore properties that use `Symbol(...)` as keys.

Usually that's convenient. But if we want symbolic keys too, then there's a separate method [Object.getOwnPropertySymbols](mdn:js/Object/getOwnPropertySymbols) that returns an array of only symbolic keys. Also, there exist a method [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) that returns *all* keys.
```

## Object.fromEntries to transform objects

Sometimes we need to perform a transformation of an object to `Map` and back.

We already have `new Map(Object.entries(obj))` to make a `Map` from `obj`.

The syntax of `Object.fromEntries` does the reverse. Given an array of `[key, value]` pairs, it creates an object:

```js run
let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]);

// now prices = { banana: 1, orange: 2, meat: 4 }

alert(prices.orange); // 2
```

Let's see practical applications.

For example, we'd like to create a new object with double prices from the existing one.

For arrays, we have `.map` method that allows to transform an array, but nothing like that for objects.

So we can use a loop:

```js run
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

let doublePrices = {};
for(let [product, price] of Object.entries(prices)) {
  doublePrices[product] = price * 2;
}

alert(doublePrices.meat); // 8
```

...Or we can represent the object as an `Array` using `Object.entries`, then perform the operations with `map` (and potentially other array methods), and then go back using `Object.fromEntries`.

Let's do it for our object:

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

We also can use `fromEntries` to get an object from `Map`.

E.g. we have a `Map` of prices, but we need to pass it to a 3rd-party code that expects an object.

Here we go:

```js run
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

let obj = Object.fromEntries(map);

// now obj = { banana: 1, orange: 2, meat: 4 }

alert(obj.orange); // 2
```
>>>>>>> 027933531e121650120f7e8385f691de99af12d2
