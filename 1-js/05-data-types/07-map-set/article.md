
<<<<<<< HEAD
# Map and Set（映射和集合）

我们已经了解过以下复杂数据结构:

- 存储键集合的对象.
- 存储有序集合的数组.

但在我们的开发中并它不能满足需求。这就是为什么 `Map` 和 `Set` 也存在的原因.

## Map

[Map](mdn:js/Map) 是一个含有数据的键的集合， 跟普通的 `Object` 一样. 但是它们最大的差别是 `Map` 允许键是任何类型。

它的方法和属性如下:

- `new Map()` - 创建一个空集合。
- `map.set(key, value)` - 存储含有值的键。
- `map.get(key)` - 根据键来返回值, 如果 `key` 不在 `map` 里将会返回 `undefined`。
- `map.has(key)` - 如果 `key` 存在则返回 `true`, 否则返回 `false`。
- `map.delete(key)` - 根据键来删除值。
- `map.clear()` - 清空集合。
- `map.size` - 返回当前全部元素的数量。

举个例子:
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
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912

```js run
let map = new Map();

<<<<<<< HEAD
map.set('1', 'str1');   // 字符串键
map.set(1, 'num1');     // 数字键
map.set(true, 'bool1'); // 布尔值键

// 还记得常规对象吗? 它会把键转化为字符串
// Map 会保持类型, 所以下面这两个结果不同:
=======
map.set('1', 'str1');   // a string key
map.set(1, 'num1');     // a numeric key
map.set(true, 'bool1'); // a boolean key

// remember the regular Object? it would convert keys to string
// Map keeps the type, so these two are different:
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
alert( map.get(1)   ); // 'num1'
alert( map.get('1') ); // 'str1'

alert( map.size ); // 3
```

<<<<<<< HEAD
如我们所见，与对象不同，键（key）不会转换为字符串。键可以是任何类型。

**Map 还可以使用对象作为键**

例如:
=======
As we can see, unlike objects, keys are not converted to strings. Any type of key is possible.

```smart header="`map[key]` isn't the right way to use a `Map`"
Although `map[key]` also works, e.g. we can set `map[key] = 2`, this is treating `map` as a plain JavaScript object, so it implies all corresponding limitations (no object keys and so on).

So we should use `map` methods: `set`, `get` and so on.
```

**Map can also use objects as keys.**

For instance:
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912

```js run
let john = { name: "John" };

<<<<<<< HEAD
// 我们先存储每个游客的来访次数
let visitsCountMap = new Map();

// john 已经在集合里了
=======
// for every user, let's store their visits count
let visitsCountMap = new Map();

// john is the key for the map
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
visitsCountMap.set(john, 123);

alert( visitsCountMap.get(john) ); // 123
```

<<<<<<< HEAD
使用对象作为键是 `Map` 最值得注意和重要的功能之一。对于字符串键，`Object`（普通对象）能正常使用，但对于对象键则不能。
  
我们来尝试一下:
=======
Using objects as keys is one of most notable and important `Map` features. For string keys, `Object` can be fine, but not for object keys.

Let's try:
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912

```js run
let john = { name: "John" };

let visitsCountObj = {}; // try to use an object

visitsCountObj[john] = 123; // try to use john object as the key

*!*
// That's what got written!
alert( visitsCountObj["[object Object]"] ); // 123
*/!*
```

<<<<<<< HEAD
当 `visitsCountObj` 是一个普通对象的时候, 它会转化所有的键, `john` 被转化为字符串, 所以我们得到字符键 `"[object Object]"`. 很明显这不是我们要的结果.

```smart header="`Map` 是怎么比较键的？"

为了测试键的一致性, `Map` 使用 [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero)算法。 它大致上使用严格全等 `===`， 但不同的是 `NaN` 被看成是等于 `NaN`。 所以 `NaN` 也可以被用作键.

这个算法不能被改变或者自定义。

```

````smart header="链式调用"

每一次调用 `map.set` 都会返回集合本身， 所以我们可以使用:
=======
As `visitsCountObj` is an object, it converts all keys, such as `john` to strings, so we've got the string key `"[object Object]"`. Definitely not what we want.

```smart header="How `Map` compares keys"
To test keys for equivalence, `Map` uses the algorithm [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero). It is roughly the same as strict equality `===`, but the difference is that `NaN` is considered equal to `NaN`. So `NaN` can be used as the key as well.

This algorithm can't be changed or customized.
```

````smart header="Chaining"
Every `map.set` call returns the map itself, so we can "chain" the calls:
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912

```js
map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');
```
````


<<<<<<< HEAD
## `Map` 迭代

如果要在 `map` 里使用循环, 可以使用以下三个方法:

- `map.keys()` - 返回键名的遍历器，
- `map.values()` - 返回键值的遍历器，
- `map.entries()` - 返回实体 `[key, value]` 的遍历器，默认在 `for..of` 中使用。

例如:
=======
## Iteration over Map

For looping over a `map`, there are 3 methods:

- `map.keys()` -- returns an iterable for keys,
- `map.values()` -- returns an iterable for values,
- `map.entries()` -- returns an iterable for entries `[key, value]`, it's used by default in `for..of`.

For instance:
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912

```js run
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);

<<<<<<< HEAD
// 迭代键（vegetables）
=======
// iterate over keys (vegetables)
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // cucumber, tomatoes, onion
}

<<<<<<< HEAD
// 迭代值 (amounts)
=======
// iterate over values (amounts)
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
for (let amount of recipeMap.values()) {
  alert(amount); // 500, 350, 50
}

<<<<<<< HEAD
// 迭代 [key, value] 对
for (let entry of recipeMap) { // 效果跟 recipeMap.entries() 相同
=======
// iterate over [key, value] entries
for (let entry of recipeMap) { // the same as of recipeMap.entries()
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
  alert(entry); // cucumber,500 (and so on)
}
```

<<<<<<< HEAD
```smart header="按顺序插入"

迭代的顺序与插入键的顺序相同。 `Map` 会保持相同的顺序,不像普通 `Object` 不保证顺序.
```

除此之外, `Map` 有个内建 `forEach` 方法, 跟 `Array` 一样:

```js
// 对每个 (key, value) 对运行 forEach 函数
=======
```smart header="The insertion order is used"
The iteration goes in the same order as the values were inserted. `Map` preserves this order, unlike a regular `Object`.
```

Besides that, `Map` has a built-in `forEach` method, similar to `Array`:

```js
// runs the function for each (key, value) pair
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
recipeMap.forEach( (value, key, map) => {
  alert(`${key}: ${value}`); // cucumber: 500 etc
});
```

<<<<<<< HEAD
## Object.entries: 把对象转化为 `map`

 当 `Map` 被创建之后, 我们可以传入带有键值对的数组 (或其它可迭代的对象) 来进行初始化, 像这样:

```js run
// 包含 [key, value] 对的数组
=======
## Object.entries: Map from Object

When a `Map` is created, we can pass an array (or another iterable) with key/value pairs for initialization, like this:

```js run
// array of [key, value] pairs
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
let map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);

alert( map.get('1') ); // str1
```

<<<<<<< HEAD
如果我们有个纯对象, 并且想利用这个纯对象来创建 `Map`, 可以使用内建方法 [Object.entries(obj)](mdn:js/Object/entries)，它返回一个具有相同格式的并且带有键值对的数组对象。

所以可以像下面这样利用一个对象来创建 `map`
=======
If we have a plain object, and we'd like to create a `Map` from it, then we can use built-in method [Object.entries(obj)](mdn:js/Object/entries) that returns an array of key/value pairs for an object exactly in that format.

So we can create a map from an object like this:
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912

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
这里，`Object.entries` 返回一个含有键值对的数组：`[ ["name","John"], ["age", 30] ]`。这就是 `Map` 所需要的参数格式。


## Object.fromEntries：把 `map` 转化为对象

我们刚刚已经利用 `Object.entries(obj)` 把一个纯对象转化成 `Map`

`Object.fromEntries` 方法的作用是相反的: 给定一个具有 `[key, value]` 对的数组, 它会根据给定数组生成对象:
=======
Here, `Object.entries` returns the array of key/value pairs: `[ ["name","John"], ["age", 30] ]`. That's what `Map` needs.


## Object.fromEntries: Object from Map

We've just seen how to create `Map` from a plain object with `Object.entries(obj)`.

There's `Object.fromEntries` method that does the reverse: given an array of `[key, value]` pairs, it creates an object from them:
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912

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
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912

alert(prices.orange); // 2
```

<<<<<<< HEAD
我们可以使用 `Object.fromEntries` 从 `Map` 中得到一个纯对象。

例如， 我们存了数据在 `Map` 中, 但是我们需要把它转给需要纯对象的第三方代码 。

我们来开始:
=======
We can use `Object.fromEntries` to get an plain object from `Map`.

E.g. we store the data in a `Map`, but we need to pass it to a 3rd-party code that expects a plain object.

Here we go:
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912

```js run
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

*!*
let obj = Object.fromEntries(map.entries()); // make a plain object (*)
*/!*

// done!
// obj = { banana: 1, orange: 2, meat: 4 }

alert(obj.orange); // 2
```

<<<<<<< HEAD
调用 `map.entries()` 将返回含有键值对的数组, 这刚好是 `Object.fromEntries` 所需要的格式.

我们可以把带 `(*)` 这一行变得更短:

=======
A call to `map.entries()` returns an array of key/value pairs, exactly in the right format for `Object.fromEntries`.

We could also make line `(*)` shorter:
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
```js
let obj = Object.fromEntries(map); // omit .entries()
```

<<<<<<< HEAD
上面的代码作用也是一样的, 因为 `Object.fromEntries` 需要一个可迭代对象作为参数， 而一定是数组. `map` 的标准迭代会返回跟 `map.entries()` 一样的键值对. 所以我们可以获得一个与 `Map` 一样具有键值对的纯对象。

## Set

`Set` 是一个特别的类型集合 - "值的集合" (没有键 )，它的每一个值只出现一次。

它的主要方法如下:

- `new Set(iterable)` - 创建一个 `set`, 如果提供一个 `iterable` 对象（通常是数组），将会从数组里面复制值到 `set` 里面去。
- `set.add(value)` - 添加一个值，返回 set 本身
- `set.delete(value)` - 删除值, 如果 `value` 在调用的时候值存在则返回 `true` ，否则返回 `false`。
- `set.has(value)` - 如果 `value` 存在 set 里面则返回 `true`, 否则返回 `false`。
- `set.clear()` - 移除 set 里面的所有成员。
- `set.size` - 返回元素数量。

它的主要特点是重复使用同一个值调用 `set.add(value)` 并不会发生什么改变。 这就是 `Set` 里面的每一个值只出现一次的原因。

例如, 我们有游客来访， 需要记住他们每一个人. 但是已经访问过的旅客会导致重复记录. 每个游客必须只被 "counted" 一次.

`Set` 可以帮助我们解决这个问题:
=======
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
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912

```js run
let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

<<<<<<< HEAD
// visits, 一些访客来访好几次
=======
// visits, some users come multiple times
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

<<<<<<< HEAD
// set 只保留那个游客第一次来的次数
alert( set.size ); // 3

for (let user of set) {
  alert(user.name); // John (然后 Pete 最后是 Mary)
}
```

使用 `Set` 的场景可以是一个用户数组， 并且每次插入的时候检查重复的的代码也可以使用 [arr.find](mdn:js/Array/find)。但是这样会是性能变的更差，因为这个方法会遍历整个数组来检查每个元素。 `Set` 有更好的内部优化 - 独一无二的检查.

##  Set 迭代

我们可以在 `Set` 中使用 `for..of`和 `forEach` 它们两者之一来循环 :
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
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912

```js run
let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) alert(value);

<<<<<<< HEAD
// 跟 forEach 方法相同:
=======
// the same with forEach:
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
set.forEach((value, valueAgain, set) => {
  alert(value);
});
```

<<<<<<< HEAD
注意到一件有趣的事情。`forEach` 的回调函数有三个参数：一个 `value`，然后是 *相同值* `valueAgain`，最后才是目标对象本身，的确，相同的值在参数里出现了两次。

那是为了兼容 `Map` 在回调里传入 `forEach` 函数后有三个参数。 当然这看起来有点奇怪。但是这对在特定情况下比如使用 `Set` 代替 `Map`的时候有帮助，反之亦然。

类似于 `Map`，在 `Set`里用于迭代的方法也被支持：
- `set.keys()` - 返回一个包含值的可迭代对象,
- `set.values()` - 跟 `set.keys()` 作用相同, 为了兼容 `Map`,
- `set.entries()` - 返回一个包含 `[value, value]` 对的可迭代对象 , 它的存在也是为了兼容 `Map`.

## 总结

`Map` - 是一个键值集合.

方法和属性如下:

- `new Map([iterable])` - 创建空的 map, 可选的带有 `[key,value]` 对的`iterable` (例如数组) 对象来进行初始化 。
- `map.set(key, value)` - 存储对应的键值。
- `map.get(key)` - 根据键来返回值, 如果键不存在 map 里就返回 `undefined`。
- `map.has(key)` - 如果 `key` 存在则返回 `true` , 否则返回 `false`。
- `map.delete(key)` - 删除指定键值。
- `map.clear()` - 清空 map 。
- `map.size` - 返回当前全部元素的数量。

跟普通对象 `Object` 最大的不同点是:

- 任何键，对象都可以被用作它的键，
- 有额外的方法, 和 `size` 属性。

`Set` - 是一个独一无二的值的集合.

方法和属性:

- `new Set([iterable])` - 创建空的 set , 可选的带有 `iterable` (例如数组) 对象来进行初始化。
- `set.add(value)` - 添加一个 value（如果存在则什么也不做）, 返回 set 本身。
- `set.delete(value)` - 删除 value , 如果在调用的时候存在则返回 `true`, 否则返回 `false`。
- `set.has(value)` - 如果则返回 `true`, 否则返回 `false`。
- `set.clear()` - 清空 set。
- `set.size` - 返回当前全部元素的数量。

在 `Map` 和 `Set` 里迭代总是按照插入的顺序来执行的，所以我们不能说这些集合是无序的，但是我们不能对元素进行重新排序，也不能直接按其顺序来获取元素。
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
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
