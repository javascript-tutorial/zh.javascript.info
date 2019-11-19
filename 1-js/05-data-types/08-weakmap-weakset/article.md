# WeakMap and WeakSet
我们从前面的[垃圾回收](<info:garbage-collection>)章节中知道，JavaScript 引擎在内存充足的情况下（或者可能被使用完）存储一个值

例如:
```js
let john = { name: "John" };

// 该对象能被访问, john 是它的引用

// 覆盖引用
john = null;

*!*
// 该对象将会从内存中被清除
*/!*
```

通常，当对象的属性或者数组的元或者其它数据结构被认为是可访问的，并在该数据结构处于内存中时驻留在内存中。

例如, 如果把一个对象放入到数组中去, 然后当数组留存在内存中时，甚至该对象在没有其它引用的情况下依旧也是可访问的 。

就像这样:

```js
let john = { name: "John" };

let array = [ john ];

john = null; // 覆盖引用

*!*
// john 被存储在数组里, 所以它不会被垃圾回收机制回收
// 我们可以通过 array[0] 来访问
*/!*
```

类似地, 如果我们只用对象作为常规 `Map` 的键的时候, 然后当 `Map` 存在时, 那个对象也是存在的. 它会占用内存并且可能不会被（垃圾回收机制）回收.

For instance:

```js
let john = { name: "John" };

let map = new Map();
map.set(john, "...");

john = null; // 覆盖引用

*!*
// john 被存在 map 里面了,
// 我们可以使用 map.keys() 来得到它
*/!*
```

`WeakMap` 在这方面有着根本的区别。它不会阻止垃圾回收对关键对象进行回收操作。

让我们来看看例子里究竟是什么意思

## WeakMap

相对于 `Map` ，`WeakMap` 的第一个不同点就是它键必须是对象，不能是原始值

```js run
let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); // 正常 (键对象)

*!*
// 不能使用一个字符串作为键
weakMap.set("test", "Whoops"); // 错误, 因为 "test" 不是一个对象
*/!*
```

现在, 如果我们在 weakMap 里使用对象作为键，并且当这个对象没有其它引用 -- 该对象将会从内存中被自动清除 ( map 也类似) 。

```js
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // 覆盖引用

// john 从内存中被移除！
```

Compare it with the regular `Map` example above. Now if `john` only exists as the key of `WeakMap` -- it will be automatically deleted from the map (and memory).

`WeakMap` does not support iteration and methods `keys()`, `values()`, `entries()`, so there's no way to get all keys or values from it.

`WeakMap` has only the following methods:

- `weakMap.get(key)`
- `weakMap.set(key, value)`
- `weakMap.delete(key)`
- `weakMap.has(key)`

Why such a limitation? That's for technical reasons. If an object has lost all other references (like `john` in the code above), then it is to be garbage-collected automatically. But technically it's not exactly specified *when the cleanup happens*.

The JavaScript engine decides that. It may choose to perform the memory cleanup immediately or to wait and do the cleaning later when more deletions happen. So, technically the current element count of a `WeakMap` is not known. The engine may have cleaned it up or not, or did it partially. For that reason, methods that access all keys/values are not supported.

Now where do we need such data structure?

## Use case: additional data

The main area of application for `WeakMap` is an *additional data storage*.

If we're working with an object that "belongs" to another code, maybe even a third-party library, and would like to store some data associated with it, that should only exist while the object is alive - then `WeakMap` is exactly what's needed.

We put the data to a `WeakMap`, using the object as the key, and when the object is garbage collected, that data will automatically disappear as well.

```js
weakMap.set(john, "secret documents");
// if john dies, secret documents will be destroyed automatically
```

Let's look at an example.

For instance, we have code that keeps a visit count for users. The information is stored in a map: a user object is the key and the visit count is the value. When a user leaves (its object gets garbage collected), we don't want to store their visit count anymore.

Here's an example of a counting function with `Map`:

```js
// 📁 visitsCount.js
let visitsCountMap = new Map(); // map: user => visits count

// increase the visits count
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

And here's another part of the code, maybe another file using it:

```js
// 📁 main.js
let john = { name: "John" };

countUser(john); // count his visits
countUser(john);

// later john leaves us
john = null;
```

Now `john` object should be garbage collected, but remains in memory, as it's a key in `visitsCountMap`.

We need to clean `visitsCountMap` when we remove users, otherwise it will grow in memory indefinitely. Such cleaning can become a tedious task in complex architectures.

We can avoid it by switching to `WeakMap` instead:

```js
// 📁 visitsCount.js
let visitsCountMap = new WeakMap(); // weakmap: user => visits count

// increase the visits count
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

Now we don't have to clean `visitsCountMap`. After `john` object becomes unreachable by all means except as a key of `WeakMap`, it gets removed from memory, along with the information by that key from `WeakMap`.

## Use case: caching

Another common example is caching: when a function result should be remembered ("cached"), so that future calls on the same object reuse it.

We can use `Map` to store results, like this:

```js run
// 📁 cache.js
let cache = new Map();

// calculate and remember the result
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* calculations of the result for */ obj;

    cache.set(obj, result);
  }

  return cache.get(obj);
}

*!*
// Now we use process() in another file:
*/!*

// 📁 main.js
let obj = {/* let's say we have an object */};

let result1 = process(obj); // calculated

// ...later, from another place of the code...
let result2 = process(obj); // remembered result taken from cache

// ...later, when the object is not needed any more:
obj = null;

alert(cache.size); // 1 (Ouch! The object is still in cache, taking memory!)
```

For multiple calls of `process(obj)` with the same object, it only calculates the result the first time, and then just takes it from `cache`. The downside is that we need to clean `cache` when the object is not needed any more.

If we replace `Map` with `WeakMap`, then this problem disappears: the cached result will be removed from memory automatically after the object gets garbage collected.

```js run
// 📁 cache.js
*!*
let cache = new WeakMap();
*/!*

// calculate and remember the result
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* calculate the result for */ obj;

    cache.set(obj, result);
  }

  return cache.get(obj);
}

// 📁 main.js
let obj = {/* some object */};

let result1 = process(obj);
let result2 = process(obj);

// ...later, when the object is not needed any more:
obj = null;

// Can't get cache.size, as it's a WeakMap,
// but it's 0 or soon be 0
// When obj gets garbage collected, cached data will be removed as well
```

## WeakSet

`WeakSet` behaves similarly:

- It is analogous to `Set`, but we may only add objects to `WeakSet` (not primitives).
- An object exists in the set while it is reachable from somewhere else.
- Like `Set`, it supports `add`, `has` and `delete`, but not `size`, `keys()` and no iterations.

Being "weak", it also serves as an additional storage. But not for an arbitrary data, but rather for "yes/no" facts. A membership in `WeakSet` may mean something about the object.

For instance, we can add users to `WeakSet` to keep track of those who visited our site:

```js run
let visitedSet = new WeakSet();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

visitedSet.add(john); // John visited us
visitedSet.add(pete); // Then Pete
visitedSet.add(john); // John again

// visitedSet has 2 users now

// check if John visited?
alert(visitedSet.has(john)); // true

// check if Mary visited?
alert(visitedSet.has(mary)); // false

john = null;

// visitedSet will be cleaned automatically
```

The most notable limitation of `WeakMap` and `WeakSet` is the absence of iterations, and inability to get all current content. That may appear inconvenient, but does not prevent `WeakMap/WeakSet` from doing their main job -- be an "additional" storage of data for objects which are stored/managed at another place.

## Summary

`WeakMap` is `Map`-like collection that allows only objects as keys and removes them together with associated value once they become inaccessible by other means.

`WeakSet` is `Set`-like collection that stores only objects and removes them once they become inaccessible by other means.

Both of them do not support methods and properties that refer to all keys or their count. Only individual operations are allowed.

`WeakMap` and `WeakSet` are used as "secondary" data structures in addition to the "main" object storage. Once the object is removed from the main storage, if it is only found as the key of `WeakMap` or in a `WeakSet`, it will be cleaned up automatically.