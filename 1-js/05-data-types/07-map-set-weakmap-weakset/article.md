
# Map、Set、WeakMap 和 WeakSet

现在，我们已经学习了下面的比较复杂的数据结构：

- 对象：存储键值对的集合。
- 数组：存储有序集合。

但是，实际应用时还是不够。这就是 `Map` 和 `Set` 存在的原因。

## Map

[Map](mdn:js/Map) 是一个键值对的集合，很像 `Object`。但主要的区别是，`Map` 允许所有数据类型作为键。

主要的方法包括：

- `new Map()` -- 创建 map。
- `map.set(key, value)` -- 根据键（key）存储值（value）。
- `map.get(key)` -- 根据键返回值，如果 map 中该键不存在，返回 `undefined`。
- `map.has(key)` -- 如果键存在，返回 `true`，否则返回 `false`。
- `map.delete(key)` -- 移除该键的值。
- `map.clear()` -- 清空 map
- `map.size` -- 返回当前元素个数。

例如：

```js run
let map = new Map();

map.set('1', 'str1');   // 字符串作为 key
map.set(1, 'num1');     // 数字作为 key
map.set(true, 'bool1'); // 布尔值作为 key

// 还记得普通对象 Object 吗？它将会吧所有的键转化为字符串类型
// 但是 Map 将会保留键的类型，所以下面这两个是不同的：
alert( map.get(1)   ); // 'num1'
alert( map.get('1') ); // 'str1'

alert( map.size ); // 3
```

正如我们所见，不像普通对象，键并没有被转化为字符串。任何类型的键都是可以的。

**Map 可以使用对象作为键。**

例如：
```js run
let john = { name: "John" };

<<<<<<< HEAD
// 存下每个用户的来访次数
=======
// for every user, let's store their visits count
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613
let visitsCountMap = new Map();

// john 是 map 的键
visitsCountMap.set(john, 123);

alert( visitsCountMap.get(john) ); // 123
```

可以将对象用作键是 `Map` 最显著最重要的特点。对于字符串类型的键，`Object` 可以适用，但是对于上面这个例子，把 `Map` 替换成普通的对象 `Object` 就很困难了。

在 `Map` 类型存在之前的时候，人们将唯一标识加入对象来达成 `Map` 的功能：

```js run
// 我们添加了一个 id 字段
let john = { name: "John", *!*id: 1*/!* };

let visitsCounts = {};

// 现在，通过 id 来保存值
visitsCounts[john.id] = 123;

alert( visitsCounts[john.id] ); // 123
```

...但是 `Map` 的写法更加优雅。


```smart header="How `Map` compares keys"
为了检测值是否相等，`Map` 使用了算法 [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero)。它大概就和严格等于号 `===` 相同，但区别是 `NaN` 等于 `NaN`。所以 `NaN` 也可以作为键。

该算法不能更改或用户定制。
```


````smart header="Chaining"

每次 `map.set` 的调用将会返回 map 自身，所以可以链式调用：

```js
map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');
```
````

## 将 Object 转化为 Map

当创建 `Map` 时，我们可以像这样传递一个数组（或其他可迭代对象）给构造函数：

```js
// [key, value] 键值对数组
let map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);
```

有一个内建方法 [Object.entries(obj)](mdn:js/Object/entries)，它可以返回一个对象的键值对数组，格式就和上面一样。

所以我们可以用一个对象来初始化一个 map，就像这样：

```js
let map = new Map(Object.entries({
  name: "John",
  age: 30
}));
```

这里，`Object.entries` 返回了键值对数组：`[ ["name","John"], ["age", 30] ]`。这正是 `Map` 需要的。

## 遍历 Map

有三种方法可以循环遍历 `map`：

- `map.keys()` -- 返回键的迭代器，
- `map.values()` -- 返回值的迭代器，
- `map.entries()` -- 返回 `[key, value]` 迭代器入口，`for..of` 循环会默认使用它。

例如：

```js run
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);

// 迭代键（vegetables）
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // cucumber, tomatoes, onion
}

// 迭代值（amounts）
for (let amount of recipeMap.values()) {
  alert(amount); // 500, 350, 50
}

// 迭代键值对 [key, value]
for (let entry of recipeMap) { // 和 recipeMap.entries() 一样
  alert(entry); // cucumber,500（等等）
}
```

```smart header="The insertion order is used"
和普通 `Object` 不同，迭代器的迭代顺序和值被插入的顺序一致，`Map` 会保留这个顺序。
```

另外，`Map` 有一个内建的 `forEach` 方法，和 `Array` 很像：

```js
// runs the function for each (key, value) pair 
recipeMap.forEach( (value, key, map) => {
  alert(`${key}: ${value}`); // cucumber: 500 等等
});
```


## Set

`Set` 是一个值的集合，这个集合中所有的值仅出现一次。

主要方法包括：

- `new Set(iterable)` -- 创建 set，利用数组来创建是可选的（任何可迭代对象都可以）。
- `set.add(value)` -- 添加值，返回 set 自身。
- `set.delete(value)` -- 删除值，如果该 `value` 在调用方法的时候存在则返回 `true` ，否则返回 `false`。
- `set.has(value)` -- 如果 set 中存在该值则返回 `true` ，否则返回 `false`。
- `set.clear()` -- 清空 set。
- `set.size` -- 元素个数。

例如，我们有访客登门，我们希望记住所有人。但是重复来访者并不应该有两份记录。一个访客必须只记录一次。

`Set` 就恰好是可以做到这个的数据结构：

```js run
let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// 访客，一些用户来了多次
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

// set 保证了值的唯一
alert( set.size ); // 3

for (let user of set) {
  alert(user.name); // John（然后是 Pete 和 Mary）
}
```

`Set` 的替换方案是使用用户数组，每次插入新元素时使用 [arr.find](mdn:js/Array/find) 方法检查用户编码是否重复。但是性能就会很差，因为这个方法会遍历整个数组，检查每个元素。而对于唯一性检查，`Set` 在内部优化得更好。

## Set 迭代

我们可以使用 `for..of` 或者 `forEach` 来循环查看 set：

```js run
let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) alert(value);

// 和 forEach 相同：
set.forEach((value, valueAgain, set) => {
  alert(value);
});
```

注意到这里有个有趣得事情。`forEach` 函数用于 `Set` 时有三个参数：value，然后又一个 value，之后是目标对象。确实，相同值的 value 在参数中出现了两次。

<<<<<<< HEAD
这是为了兼容 `Map`，它在使用 `forEach` 方法时也包括三个参数。
=======
That's for compatibility with `Map` where `forEach` has three arguments. Looks a bit strange, for sure. But may help to replace `Map` with `Set` in certain cases with ease, and vice versa.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

适用于 `Map` 的迭代方法 set 也同样支持：

- `set.keys()` -- 返回 set 中值的迭代对象，
- `set.values()` -- 和 `set.keys` 一样，为了兼容 `Map`，
- `set.entries()` -- 返回形如 `[value, value]` 的迭代对象，为了兼容 `Map` 而存在。

## WeakMap 和 WeakSet

`WeakSet` 是一种特殊的 `Set`，它不会阻止 JavaScript 将它的元素从内存中移除。`WeakMap` 和 `Map` 的区别也和上述一样。

正如我们在章节 <info:garbage-collection> 中了解到的，当该值可用（或可能需要）时，JavaScript 引擎将会把值缓存在内存中。

例如：
```js
let john = { name: "John" };

// 对象可被获取，john 是它的引用

// 覆盖引用
john = null;

*!*
// 对象将会从内存中移除
*/!*
```

通常情况下，当某数据存在于内存中时，对象的属性或者数组的元素或其他的数据结构将被认为是可以获取的并留存于内存。

<<<<<<< HEAD
在一个正常 `Map` 中，我们将某对象存储为键还是值并不重要。它将会被一直保留在内存中，就算已经没有指向它的引用。

例如：
=======
For instance, if we put an object into an array, then while the array is alive, the object will be alive as well, even if there are no other references to it.

Like this:

```js
let john = { name: "John" };

let array = [ john ];

john = null; // overwrite the reference

*!*
// john is stored inside the array, so it won't be garbage-collected
// we can get it as array[0]
*/!*
```

Or, if we use an object as the key in a regular `Map`, then while the `Map` exists, that object exists as well. It occupies memory and may not be garbage collected.

For instance:

>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613
```js
let john = { name: "John" };

let map = new Map();
map.set(john, "...");

john = null; // 覆盖引用

*!*
<<<<<<< HEAD
// john 被保存在 map 中
// 我们可以通过 map.keys() 得到它
=======
// john is stored inside the map,
// we can get it by using map.keys()
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613
*/!*
```

`WeakMap/WeakSet` are fundamentally different in this aspect. They do not prevent garbage-collection of key objects.

<<<<<<< HEAD
除了 `WeakMap/WeakSet`。

**`WeakMap/WeakSet` 不会阻止内存移除对象。**

我们从 `WeakMap` 开始。

它和 `Map` 的第一个区别是它的键必须是对象，不能是基础类型的值：
=======
Let's explain it starting with `WeakMap`.

The first difference from `Map` is that `WeakMap` keys must be objects, not primitive values:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

```js run
let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); // 运行正常（对象作为键）

*!*
<<<<<<< HEAD
weakMap.set("test", "Whoops"); // 错误，因为“test”是原始类型
=======
// can't use a string as the key
weakMap.set("test", "Whoops"); // Error, because "test" is not an object
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613
*/!*
```

现在，如果我们使用对象作为它的键，并且没有任何引用指向这个对象 —— 它将会自动被从内存中移除（也会从 map 中移除）。

```js
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // 覆盖引用

// john 从内存中移除了！
```

把它和上面普通 `Map` 的例子对比一下。现在，如果 `john` 仅作为 `WeakMap` 的键 —— 它将会被自动删除。

<<<<<<< HEAD
...并且 `WeakMap` 并不支持方法 `keys()`，`values()`，`entries()`，我们不能对它进行迭代。所以没有办法获取它的所有键值。
=======
`WeakMap` does not support iteration and methods `keys()`, `values()`, `entries()`, so there's no way to get all keys or values from it.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

`WeakMap` 仅有如下方法：

- `weakMap.get(key)`
- `weakMap.set(key, value)`
- `weakMap.delete(key)`
- `weakMap.has(key)`

<<<<<<< HEAD
为什么会有这些限制？这是处于一些技术原因。如果一个对象没有任何引用（就像上面代码中的 `john`），那么它将会被自动删除。但是从技术上讲，它没有完全指定**什么时候清理会发生**。

JavaScript 引擎将会决定何时清理。它可能会选择马上清理内存或者等待：当更多需要删除操作发生的时候再删除。所以，技术上说，目前 `WeakMap` 中元素个数并不可知。引擎可能已经清理，也可能没有，也可能只进行了部分的清理。处于这个原因，允许访问 `WeakMap` 整体的方法并不支持。
=======
Why such a limitation? That's for technical reasons. If an object has lost all other references (like `john` in the code above), then it is to be garbage-collected automatically. But technically it's not exactly specified *when the cleanup happens*.

The JavaScript engine decides that. It may choose to perform the memory cleanup immediately or to wait and do the cleaning later when more deletions happen. So, technically the current element count of a `WeakMap` is not known. The engine may have cleaned it up or not, or did it partially. For that reason, methods that access `WeakMap` as a whole are not supported.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

现在，我们在哪里需要这样的结构？

<<<<<<< HEAD
`WeakMap` 的目的是，我们可以当且仅当该对象存在时，为对象存储一些内容。但我们并不会因为存储了对象的一些内容，就强制对象一直保留在内存中。

```js
weakMap.put(john, "secret documents");
// 如果 john 不存在了，secret documents 也将会被销毁
```

当我们对对象有个主存储区，并且需要保存仅当对象活跃时候才相关的附加信息时，这一点就很有用了。
=======
The idea of `WeakMap` is that we can store something for an object that should exist only while the object exists. But we do not force the object to live by the mere fact that we store something for it.

```js
weakMap.set(john, "secret documents");
// if john dies, secret documents will be destroyed automatically
```

That's useful for situations when we have a main storage for the objects somewhere and need to keep additional information, that is only relevant while the object lives.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

让我们看一个例子。

<<<<<<< HEAD
例如，我们写了一段代码来保存每个用户的访问次数。信息保存在一个 map 中：用户是键，访问次数是值。当用户离开了，我们也就不再需要保存他的访问次数了。

有一个方法可以追踪离开的游客并手动清理记录：
=======
For instance, we have code that keeps a visit count for each user. The information is stored in a map: a user is the key and the visit count is the value. When a user leaves, we don't want to store their visit count anymore.

One way would be to keep track of users, and when they leave -- clean up the map manually:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

```js run
let john = { name: "John" };

// map: user => visits count
let visitsCountMap = new Map();

// john 是 map 的键
visitsCountMap.set(john, 123);

// 现在 john 离开了，我们不需要他了
john = null;

*!*
// 但是记录依旧在 map 中，我们需要清理它！
*/!*
alert( visitsCountMap.size ); // 1
<<<<<<< HEAD
// 它还在内存中，因为 Map 将它作为键
=======
// and john is also in the memory, because Map uses it as the key
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613
```

另一个方法是使用 `WeakMap`：

```js
let john = { name: "John" };

let visitsCountMap = new WeakMap();

visitsCountMap.set(john, 123);

// 现在 john 离开了，我们不需要他了
john = null;

// 除了 WeakMap 没有其他引用了，
// 所以这个对象会自动的从内存和 visitsCountMap 中删除
```

<<<<<<< HEAD
使用普通的 `Map`，用户离开后的数据清理是一很乏味的任务：我们不仅要从主存储区移除用户（可能是变量或者数组），还需要将附加的数据存储例如 `visitsCountMap` 也清除。当用户在代码的一个位置进行管理，而附加结构位于另一个位置，并且没有获取有关清除的信息这样的复杂的情况下，这种操作就很笨重。

`WeakMap` 能让事情简单很多，因为它能够自动清理。它里面诸如上面的例子中来访次数这样的信息，当且仅当对象键存在的时候才存在。
=======
With a regular `Map`, cleaning up after a user has left becomes a tedious task: we not only need to remove the user from its main storage (be it a variable or an array), but also need to clean up the additional stores like `visitsCountMap`. And it can become cumbersome in more complex cases when users are managed in one place of the code and the additional structure is in another place and is getting no information about removals.

```summary
`WeakMap` can make things simpler, because it is cleaned up automatically. The information in it like visits count in the example above lives only while the key object exists.
```
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

`WeakSet` 的行为类似：

<<<<<<< HEAD
- 它和 `Set` 类似，但是我们仅能将对象添加进 `WeakSet`（不可以是基础类型）
- 仅当对象存在其他位置的引用时它才存在于 set 中。
- 就像 `Set` 一样，它支持 `add`，`has` 和 `delete`，不支持 `size`，`keys()` 也不支持迭代器。

例如，我们可以用它来追踪一个项目是否被检查过：
=======
- It is analogous to `Set`, but we may only add objects to `WeakSet` (not primitives).
- An object exists in the set while it is reachable from somewhere else.
- Like `Set`, it supports `add`, `has` and `delete`, but not `size`, `keys()` and no iterations.

For instance, we can use it to keep track of whether a message is read:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

```js
let messages = [
    {text: "Hello", from: "John"},
    {text: "How goes?", from: "John"},
    {text: "See you soon", from: "Alice"}
];

// 用数组的元素来填充（3 个元素）
let unreadSet = new WeakSet(messages);

<<<<<<< HEAD
// 我们可以使用 unreadSet 来看一个 message 是否未读
alert(unreadSet.has(messages[1])); // true
// 读过之后就讲它从 set 中移除
=======
// use unreadSet to see whether a message is unread
alert(unreadSet.has(messages[1])); // true

// remove it from the set after reading
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613
unreadSet.delete(messages[1]); // true

// 当我们对消息列表做 shift 操作，set 就会自动清理
messages.shift();
<<<<<<< HEAD
// 不需要清理 unreadSet，它现在还有两个元素
// 可惜并没有方法可以获取元素数目，所以无法显示出来
```

`WeakMap` 和 `WeakSet` 最显著的限制就是没有迭代器，也不能获取当前所有内容。这可能会有点不方便，但是实际上并不妨碍 `WeakMap/WeakSet` 的主要任务 —— 作为对象的附加存储，该对象在其他位置被保存或管理。
=======

*!*
// no need to clean unreadSet, it now has 2 items
*/!*
// (though technically we don't know for sure when the JS engine clears it)
```

The most notable limitation of `WeakMap` and `WeakSet` is the absence of iterations, and inability to get all current content. That may appear inconvenient, but does not prevent `WeakMap/WeakSet` from doing their main job -- be an "additional" storage of data for objects which are stored/managed at another place.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

## 总结

<<<<<<< HEAD
- `Map` —— 是一个键值对集合
=======
Regular collections:
- `Map` -- is a collection of keyed values.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

    和普通 `Object` 的区别：

    - 对象可以作为键。
    - 迭代顺序是插入顺序。
    - 附加方便的方法，有 `size` 属性。

- `Set` —— 是一个包含不重复值的集合。

    - 和 array 不同，set 不允许元素重新排序。
    - 保持插入的顺序。

<<<<<<< HEAD
- `WeakMap` —— `Map` 的一个变体，仅允许对象作为键，并且当对象由于其他原因不可引用的时候将其删除。
=======
Collections that allow garbage-collection:

- `WeakMap` -- a variant of `Map` that allows only objects as keys and removes them once they become inaccessible by other means.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

    - 它不支持整体的操作：没有 `size` 属性，没有 `clear()` 方法，没有迭代器。

- `WeakSet` —— 是 `Set` 的一个变体，仅存储对象，并且当对象由于其他原因不可引用的时候将其删除。

    - 同样不支持 `size/clear()` 和迭代器。

<<<<<<< HEAD
`WeakMap` 和 `WeakSet` 被用作主要对象存储的次要数据结构补充。一旦对象从存储移除，那么存在于 `WeakMap/WeakSet` 的数据将会被自动清除。
=======
`WeakMap` and `WeakSet` are used as "secondary" data structures in addition to the "main" object storage. Once the object is removed from the main storage, if it is only found in the `WeakMap/WeakSet`, it will be cleaned up automatically.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613
