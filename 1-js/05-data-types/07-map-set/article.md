
<<<<<<< HEAD
# Map and Set（映射和集合）

我们已经了解了以下复杂的数据结构：

- 存储带键的数据（keyed）集合的对象。
- 存储有序集合的数组。

但这还不足以应对现实情况。这就是为什么存在 `Map` 和 `Set`。

## Map

[Map](mdn:js/Map) 是一个带键的数据项的集合，就像一个 `Object` 一样。 但是它们最大的差别是 `Map` 允许任何类型的键（key）。

它的方法和属性如下：

- `new Map()` － 创建 map。
- `map.set(key, value)` － 根据键存储值。
- `map.get(key)` － 根据键来返回值，如果 `map` 中不存在对应的 `key`，则返回 `undefined`。
- `map.has(key)` － 如果 `key` 存在则返回 `true`，否则返回 `false`。
- `map.delete(key)` － 删除指定键的值。
- `map.clear()` － 清空 map。
- `map.size` － 返回当前元素个数。

举个例子：
=======
# Map and Set

Now we've learned about the following complex data structures:

- Objects for storing keyed collections.
- Arrays for storing ordered collections.

But that's not enough for real life. That's why `Map` and `Set` also exist.

## Map

[Map](mdn:js/Map) is a collection of keyed data items, just like an `Object`. But the main difference is that `Map` allows keys of any type.

Methods and properties are:

- `new Map()` -- creates the map.
- `map.set(key, value)` -- stores the value by the key.
- `map.get(key)` -- returns the value by the key, `undefined` if `key` doesn't exist in map.
- `map.has(key)` -- returns `true` if the `key` exists, `false` otherwise.
- `map.delete(key)` -- removes the value by the key.
- `map.clear()` -- removes everything from the map.
- `map.size` -- returns the current element count.

For instance:
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

```js run
let map = new Map();

<<<<<<< HEAD
map.set('1', 'str1');   // 字符串键
map.set(1, 'num1');     // 数字键
map.set(true, 'bool1'); // 布尔值键

// 还记得普通的 Object 吗? 它会将键转化为字符串
// Map 则会保留键的类型，所以下面这两个结果不同：
=======
map.set('1', 'str1');   // a string key
map.set(1, 'num1');     // a numeric key
map.set(true, 'bool1'); // a boolean key

// remember the regular Object? it would convert keys to string
// Map keeps the type, so these two are different:
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a
alert( map.get(1)   ); // 'num1'
alert( map.get('1') ); // 'str1'

alert( map.size ); // 3
```

<<<<<<< HEAD
如我们所见，与对象不同，键不会被转换成字符串。键可以是任何类型。

```smart header="`map[key]` 不是使用 `Map` 的正确方式"
虽然 `map[key]` 也有效，例如我们可以设置 `map[key] = 2`，这样会将 `map` 视为 JavaScript 的 plain object，因此它暗含了所有相应的限制（没有对象键等）。

所以我们应该使用 `map` 方法：`set` 和 `get` 等。
```

**Map 还可以使用对象作为键。**

例如：
=======
As we can see, unlike objects, keys are not converted to strings. Any type of key is possible.

```smart header="`map[key]` isn't the right way to use a `Map`"
Although `map[key]` also works, e.g. we can set `map[key] = 2`, this is treating `map` as a plain JavaScript object, so it implies all corresponding limitations (no object keys and so on).

So we should use `map` methods: `set`, `get` and so on.
```

**Map can also use objects as keys.**

For instance:
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

```js run
let john = { name: "John" };

<<<<<<< HEAD
// 存储每个用户的来访次数
let visitsCountMap = new Map();

// john 是 Map 中的键
=======
// for every user, let's store their visits count
let visitsCountMap = new Map();

// john is the key for the map
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a
visitsCountMap.set(john, 123);

alert( visitsCountMap.get(john) ); // 123
```

<<<<<<< HEAD
使用对象作为键是 `Map` 最值得注意和重要的功能之一。对于字符串键，`Object`（普通对象）也能正常使用，但对于对象键则不行。
  
我们来尝试一下：
=======
Using objects as keys is one of most notable and important `Map` features. For string keys, `Object` can be fine, but not for object keys.

Let's try:
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

```js run
let john = { name: "John" };

<<<<<<< HEAD
let visitsCountObj = {}; // 尝试使用对象

visitsCountObj[john] = 123; // 尝试将 john 对象作为键

*!*
// 是写成了这样!
=======
let visitsCountObj = {}; // try to use an object

visitsCountObj[john] = 123; // try to use john object as the key

*!*
// That's what got written!
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a
alert( visitsCountObj["[object Object]"] ); // 123
*/!*
```

<<<<<<< HEAD
因为 `visitsCountObj` 是一个对象，它会将所有的键如 `john` 转换为字符串，所以我们得到字符串键 `"[object Object]"`。这显然不是我们想要的结果。

```smart header="`Map` 是怎么比较键的？"
`Map` 使用 [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero) 算法来比较键是否相等。它和严格等于 `===` 差不多，但区别是 `NaN` 被看成是等于 `NaN`。所以 `NaN` 也可以被用作键。

这个算法不能被改变或者自定义。
```

````smart header="链式调用"
每一次 `map.set` 调用都会返回 map 本身，所以我们可以进行“链式”调用：
=======
As `visitsCountObj` is an object, it converts all keys, such as `john` to strings, so we've got the string key `"[object Object]"`. Definitely not what we want.

```smart header="How `Map` compares keys"
To test keys for equivalence, `Map` uses the algorithm [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero). It is roughly the same as strict equality `===`, but the difference is that `NaN` is considered equal to `NaN`. So `NaN` can be used as the key as well.

This algorithm can't be changed or customized.
```

````smart header="Chaining"
Every `map.set` call returns the map itself, so we can "chain" the calls:
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

```js
map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');
```
````


<<<<<<< HEAD
## Map 迭代

如果要在 `map` 里使用循环，可以使用以下三个方法：

- `map.keys()` － 遍历并返回所有的键（returns an iterable for keys），
- `map.values()` － 遍历并返回所有的值（returns an iterable for values），
- `map.entries()` － 遍历并返回所有的实体（returns an iterable for entries）`[key, value]`，`for..of` 在默认情况下使用的就是这个。

例如：
=======
## Iteration over Map

For looping over a `map`, there are 3 methods:

- `map.keys()` -- returns an iterable for keys,
- `map.values()` -- returns an iterable for values,
- `map.entries()` -- returns an iterable for entries `[key, value]`, it's used by default in `for..of`.

For instance:
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

```js run
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);

<<<<<<< HEAD
// 遍历所有的键（vegetables）
=======
// iterate over keys (vegetables)
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // cucumber, tomatoes, onion
}

<<<<<<< HEAD
// 遍历所有的值（amounts）
=======
// iterate over values (amounts)
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a
for (let amount of recipeMap.values()) {
  alert(amount); // 500, 350, 50
}

<<<<<<< HEAD
// 遍历所有的实体 [key, value]
for (let entry of recipeMap) { // 与 recipeMap.entries() 相同
=======
// iterate over [key, value] entries
for (let entry of recipeMap) { // the same as of recipeMap.entries()
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a
  alert(entry); // cucumber,500 (and so on)
}
```

<<<<<<< HEAD
```smart header="使用插入顺序"
迭代的顺序与插入值的顺序相同。与普通的 `Object` 不同，`Map` 保留了此顺序。
```

除此之外，`Map` 有内置的 `forEach` 方法，与 `Array` 类似：

```js
// 对每个键值对 (key, value) 运行 forEach 函数
=======
```smart header="The insertion order is used"
The iteration goes in the same order as the values were inserted. `Map` preserves this order, unlike a regular `Object`.
```

Besides that, `Map` has a built-in `forEach` method, similar to `Array`:

```js
// runs the function for each (key, value) pair
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a
recipeMap.forEach( (value, key, map) => {
  alert(`${key}: ${value}`); // cucumber: 500 etc
});
```

<<<<<<< HEAD
## Object.entries：从对象创建 Map

当创建一个 `Map` 后，我们可以传入一个带有键值对的数组（或其它可迭代对象）来进行初始化，如下所示：

```js run
// 键值对 [key, value] 数组
=======
## Object.entries: Map from Object

When a `Map` is created, we can pass an array (or another iterable) with key/value pairs for initialization, like this:

```js run
// array of [key, value] pairs
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a
let map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);

alert( map.get('1') ); // str1
```

<<<<<<< HEAD
如果我们想从一个已有的普通对象（plain object）来创建一个 `Map`，那么我们可以使用内建方法 [Object.entries(obj)](mdn:js/Object/entries)，该返回对象的键/值对数组，该数组格式完全按照 `Map` 所需的格式。

所以可以像下面这样从一个对象创建一个 Map：
=======
If we have a plain object, and we'd like to create a `Map` from it, then we can use built-in method [Object.entries(obj)](mdn:js/Object/entries) that returns an array of key/value pairs for an object exactly in that format.

So we can create a map from an object like this:
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

```js run
let obj = {
  name: "John",
  age: 30
};

*!*
let map = new Map(Object.entries(obj));
*/!*

alert( map.get('name') ); // John
```

<<<<<<< HEAD
这里，`Object.entries` 返回键/值对数组：`[ ["name","John"], ["age", 30] ]`。这就是 `Map` 所需要的格式。


## Object.fromEntries：从 Map 创建对象

我们刚刚已经学习了如何使用 `Object.entries(obj)` 从普通对象（plain object）创建 `Map`。

`Object.fromEntries` 方法的作用是相反的：给定一个具有 `[key, value]` 键值对的数组，它会根据给定数组创建一个对象：
=======
Here, `Object.entries` returns the array of key/value pairs: `[ ["name","John"], ["age", 30] ]`. That's what `Map` needs.


## Object.fromEntries: Object from Map

We've just seen how to create `Map` from a plain object with `Object.entries(obj)`.

There's `Object.fromEntries` method that does the reverse: given an array of `[key, value]` pairs, it creates an object from them:
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

```js run
let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]);

<<<<<<< HEAD
// 现在 prices = { banana: 1, orange: 2, meat: 4 }
=======
// now prices = { banana: 1, orange: 2, meat: 4 }
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

alert(prices.orange); // 2
```

<<<<<<< HEAD
我们可以使用 `Object.fromEntries` 从 `Map` 得到一个普通对象（plain object）。

例如，我们在 `Map` 中存储了一些数据，但是我们需要把这些数据传给需要普通对象（plain object）的第三方代码。

我们来开始：
=======
We can use `Object.fromEntries` to get an plain object from `Map`.

E.g. we store the data in a `Map`, but we need to pass it to a 3rd-party code that expects a plain object.

Here we go:
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

```js run
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

*!*
<<<<<<< HEAD
let obj = Object.fromEntries(map.entries()); // 创建一个普通对象（plain object）(*)
*/!*

// 完成了！
=======
let obj = Object.fromEntries(map.entries()); // make a plain object (*)
*/!*

// done!
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a
// obj = { banana: 1, orange: 2, meat: 4 }

alert(obj.orange); // 2
```

<<<<<<< HEAD
调用 `map.entries()` 将返回键/值对数组，这刚好是 `Object.fromEntries` 所需要的格式。

我们可以把带 `(*)` 这一行写得更短：
```js
let obj = Object.fromEntries(map); // 省掉 .entries()
```

上面的代码作用也是一样的，因为 `Object.fromEntries` 期望得到一个可迭代对象作为参数，而不一定是数组。并且 `map` 的标准迭代会返回跟 `map.entries()` 一样的键/值对。因此，我们可以获得一个普通对象（plain object），其键/值对与 `map` 相同。

## Set

`Set` 是一个特殊的类型集合 － “值的集合”（没有键），它的每一个值只能出现一次。

它的主要方法如下：

- `new Set(iterable)` － 创建一个 `set`，如果提供了一个 `iterable` 对象（通常是数组），将会从数组里面复制值到 `set` 中。
- `set.add(value)` － 添加一个值，返回 set 本身
- `set.delete(value)` － 删除值，如果 `value` 在这个方法调用的时候存在则返回 `true` ，否则返回 `false`。
- `set.has(value)` － 如果 `value` 在 set 中，返回 `true`，否则返回 `false`。
- `set.clear()` － 清空 set。
- `set.size` － 返回元素个数。

它的主要特点是，重复使用同一个值调用 `set.add(value)` 并不会发生什么改变。这就是 `Set` 里面的每一个值只出现一次的原因。

例如，我们有客人来访，我们想记住他们每一个人。但是已经来访过的客人再次来访，不应造成重复记录。每个访客必须只被“计数”一次。

`Set` 可以帮助我们解决这个问题：
=======
A call to `map.entries()` returns an array of key/value pairs, exactly in the right format for `Object.fromEntries`.

We could also make line `(*)` shorter:
```js
let obj = Object.fromEntries(map); // omit .entries()
```

That's the same, because `Object.fromEntries` expects an iterable object as the argument. Not necessarily an array. And the standard iteration for `map` returns same key/value pairs as `map.entries()`. So we get a plain object with same key/values as the `map`.

## Set

A `Set` is a special type collection - "set of values" (without keys), where each value may occur only once.

Its main methods are:

- `new Set(iterable)` -- creates the set, and if an `iterable` object is provided (usually an array), copies values from it into the set.
- `set.add(value)` -- adds a value, returns the set itself.
- `set.delete(value)` -- removes the value, returns `true` if `value` existed at the moment of the call, otherwise `false`.
- `set.has(value)` -- returns `true` if the value exists in the set, otherwise `false`.
- `set.clear()` -- removes everything from the set.
- `set.size` -- is the elements count.

The main feature is that repeated calls of `set.add(value)` with the same value don't do anything. That's the reason why each value appears in a `Set` only once.

For example, we have visitors coming, and we'd like to remember everyone. But repeated visits should not lead to duplicates. A visitor must be "counted" only once.

`Set` is just the right thing for that:
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

```js run
let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

<<<<<<< HEAD
// visits，一些访客来访好几次
=======
// visits, some users come multiple times
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

<<<<<<< HEAD
// set 只保留不重复的值
alert( set.size ); // 3

for (let user of set) {
  alert(user.name); // John（然后 Pete 和 Mary）
}
```

`Set` 的替代方法可以是一个用户数组，用 [arr.find](mdn:js/Array/find) 在每次插入值时检查是否重复。但是这样性能会很差，因为这个方法会遍历整个数组来检查每个元素。`Set` 内部对唯一性检查进行了更好的优化。

##  Set 迭代（iteration）

我们可以使用 `for..of` 或 `forEach` 来遍历 Set：
=======
// set keeps only unique values
alert( set.size ); // 3

for (let user of set) {
  alert(user.name); // John (then Pete and Mary)
}
```

The alternative to `Set` could be an array of users, and the code to check for duplicates on every insertion using [arr.find](mdn:js/Array/find). But the performance would be much worse, because this method walks through the whole array checking every element. `Set` is much better optimized internally for uniqueness checks.

## Iteration over Set

We can loop over a set either with `for..of` or using `forEach`:
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

```js run
let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) alert(value);

<<<<<<< HEAD
// 与 forEach 相同：
=======
// the same with forEach:
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a
set.forEach((value, valueAgain, set) => {
  alert(value);
});
```

<<<<<<< HEAD
注意一件有趣的事儿。`forEach` 的回调函数有三个参数：一个 `value`，然后是 **同一个值** `valueAgain`，最后是目标对象。没错，同一个值在参数里出现了两次。

`forEach` 的回调函数有三个参数，是为了与 `Map` 兼容。当然，这看起来确实有些奇怪。但是这对在特定情况下轻松地用 `Set` 代替 `Map` 很有帮助，反之亦然。

`Map` 中用于迭代的方法在 `Set` 中也同样支持：

- `set.keys()` － 遍历并返回所有的值（returns an iterable object for values），
- `set.values()` － 与 `set.keys()` 作用相同，这是为了兼容 `Map`，
- `set.entries()` － 遍历并返回所有的实体（returns an iterable object for entries）`[value, value]`，它的存在也是为了兼容 `Map`。

## 总结

`Map` － 是一个带键的数据项的集合。

方法和属性如下：

- `new Map([iterable])` － 创建 map，可选择带有 `[key,value]` 对的 `iterable`（例如数组）来进行初始化。
- `map.set(key, value)` － 根据键存储值。
- `map.get(key)` － 根据键来返回值，如果 `map` 中不存在对应的 `key`，则返回 `undefined`。
- `map.has(key)` － 如果 `key` 存在则返回 `true`，否则返回 `false`。
- `map.delete(key)` － 删除指定键的值。
- `map.clear()` － 清空 map 。
- `map.size` － 返回当前元素个数。

与普通对象 `Object` 的不同点：

- 任何键、对象都可以作为键。
- 有其他的便捷方法，如 `size` 属性。

`Set` － 是一组唯一值的集合。

方法和属性：

- `new Set([iterable])` － 创建 set，可选择带有 `iterable`（例如数组）来进行初始化。
- `set.add(value)` － 添加一个值（如果 `value` 存在则不做任何修改），返回 set 本身。
- `set.delete(value)` － 删除值，如果 `value` 在这个方法调用的时候存在则返回 `true` ，否则返回 `false`。
- `set.has(value)` － 如果 `value` 在 set 中，返回 `true`，否则返回 `false`。
- `set.clear()` － 清空 set。
- `set.size` － 元素的个数。

在 `Map` 和 `Set` 中迭代总是按照值插入的顺序进行的，所以我们不能说这些集合是无序的，但是我们不能对元素进行重新排序，也不能直接按其编号来获取元素。
=======
Note the funny thing. The callback function passed in `forEach` has 3 arguments: a `value`, then *the same value* `valueAgain`, and then the target object. Indeed, the same value appears in the arguments twice.

That's for compatibility with `Map` where the callback passed `forEach` has three arguments. Looks a bit strange, for sure. But may help to replace `Map` with `Set` in certain cases with ease, and vice versa.

The same methods `Map` has for iterators are also supported:

- `set.keys()` -- returns an iterable object for values,
- `set.values()` -- same as `set.keys()`, for compatibility with `Map`,
- `set.entries()` -- returns an iterable object for entries `[value, value]`, exists for compatibility with `Map`.

## Summary

`Map` -- is a collection of keyed values.

Methods and properties:

- `new Map([iterable])` -- creates the map, with optional `iterable` (e.g. array) of `[key,value]` pairs for initialization.
- `map.set(key, value)` -- stores the value by the key.
- `map.get(key)` -- returns the value by the key, `undefined` if `key` doesn't exist in map.
- `map.has(key)` -- returns `true` if the `key` exists, `false` otherwise.
- `map.delete(key)` -- removes the value by the key.
- `map.clear()` -- removes everything from the map.
- `map.size` -- returns the current element count.

The differences from a regular `Object`:

- Any keys, objects can be keys.
- Additional convenient methods, the `size` property.

`Set` -- is a collection of unique values.

Methods and properties:

- `new Set([iterable])` -- creates the set, with optional `iterable` (e.g. array) of values for initialization.
- `set.add(value)` -- adds a value (does nothing if `value` exists), returns the set itself.
- `set.delete(value)` -- removes the value, returns `true` if `value` existed at the moment of the call, otherwise `false`.
- `set.has(value)` -- returns `true` if the value exists in the set, otherwise `false`.
- `set.clear()` -- removes everything from the set.
- `set.size` -- is the elements count.

Iteration over `Map` and `Set` is always in the insertion order, so we can't say that these collections are unordered, but we can't reorder elements or directly get an element by its number.
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a
