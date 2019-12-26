
# Map and Set（映射和集合）

我们已经了解过以下复杂数据结构:

- 存储键集合的对象.
- 存储有序集合的数组.

但在我们的开发中并它不能满足需求。这就是为什么 `Map` 和 `Set` 也存在的原因.

## Map

[Map](mdn:js/Map) 是一个含有数据的键的集合， 跟普通的 `Object` 一样. 但是它们最大的差别是 `Map` 允许键是任何类型。

它的方法和属性如下:

- `new Map()` -- 创建一个空集合。
- `map.set(key, value)` -- 存储含有值的键。
- `map.get(key)` -- 根据键来返回值, 如果 `key` 不在 `map`里将会返回 `undefined`。
- `map.has(key)` -- 如果 `key` 存在则返回 `true`, 否则返回 `false`。
- `map.delete(key)` -- 根据键来删除值。
- `map.clear()` -- 清空集合。
- `map.size` -- 返回当前全部元素的数量。

举个例子:

```js run
let map = new Map();

map.set('1', 'str1');   // 字符串键
map.set(1, 'num1');     // 数字键
map.set(true, 'bool1'); // 布尔值键

// 还记得常规对象吗? 它会把键转化为字符串
// Map 会保持类型, 所以下面这两个结果不同:
alert( map.get(1)   ); // 'num1'
alert( map.get('1') ); // 'str1'

alert( map.size ); // 3
```

正如我们看到的那样，`Map` 的键可以被转化为字符串而不是像普通对象那样不能转化， 任何类型的键都是可能的.

**Map 还可以使用对象作为键**

例如:

```js run
let john = { name: "John" };

// 我们先存储每个游客的来访次数
let visitsCountMap = new Map();

// john 已经在集合里了
visitsCountMap.set(john, 123);

alert( visitsCountMap.get(john) ); // 123
```

使用对象作为键是 `Map` 最出名也是最重要的特点. 对于字符键, `Object` （普通对象）能正常使用, 但是使用键就会产生意料之外的效果.

我们来尝试一下:

```js run
let john = { name: "John" };

let visitsCountObj = {}; // try to use an object

visitsCountObj[john] = 123; // try to use john object as the key

*!*
// That's what got written!
alert( visitsCountObj["[object Object]"] ); // 123
*/!*
```

当 `visitsCountObj` 是一个普通对象的时候, 它会转化所有的键, `john` 被转化为字符串, 所以我们得到字符键 `"[object Object]"`. 很明显这不是我们要的结果.

```smart header="`Map` 是怎么比较键的？"

为了测试键的一致性, `Map` 使用 [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero)算法。 它大致上使用严格全等 `===`， 但不同的是 `NaN` 被看成是等于 `NaN`。 所以 `NaN` 也可以被用作键.

这个算法不能被改变或者自定义。

```

````smart header="链式调用"

每一次调用 `map.set` 都会返回集合本身， 所以我们可以使用:

```js
map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');
```
````


## `Map` 迭代

如果要在 `map` 里使用循环, 可以使用以下三个方法:

- `map.keys()` -- returns an iterable for keys,
- `map.values()` -- returns an iterable for values,
- `map.entries()` -- returns an iterable for entries `[key, value]`, it's used by default in `for..of`.

例如:

```js run
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);

// 迭代键(vegetables)
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // cucumber, tomatoes, onion
}

// 迭代值 (amounts)
for (let amount of recipeMap.values()) {
  alert(amount); // 500, 350, 50
}

// 迭代 [key, value] 对
for (let entry of recipeMap) { // 效果跟 recipeMap.entries() 相同
  alert(entry); // cucumber,500 (and so on)
}
```

```smart header="按顺序插入"

迭代的顺序与插入键的顺序相同。 `Map`会保持相同的顺序,不像普通 `Object` 不保证顺序.
```

除此之外, `Map` 有个内建 `forEach` 方法, 跟 `Array` 一样:

```js
// 对每个 (key, value) 对运行 forEach 函数
recipeMap.forEach( (value, key, map) => {
  alert(`${key}: ${value}`); // cucumber: 500 etc
});
```

## Object.entries: 把对象转化为 `map`

 当 `Map` 被创建之后, 我们可以传入带有键值对的数组 (或其它可迭代的对象) 来进行初始化, 像这样:

```js run
// 包含 [key, value] 对的数组
let map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);

alert( map.get('1') ); // str1
```

如果我们有个纯对象, 并且想利用这个纯对象来创建 `Map` , 可以使用内建方法[Object.entries(obj)](mdn:js/Object/entries) ，它返回一个具有相同格式的并且带有键值对的数组对象。

所以可以像下面这样利用一个对象来创建 `map`

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

这里, `Object.entries` 返回一个含有键值对的数组: `[ ["name","John"], ["age", 30] ]`. 这就是 `Map` 所需要的参数格式.


## Object.fromEntries: 把 `map` 转化为对象

我们刚刚已经利用 `Object.entries(obj)` 把一个纯对象转化成 `Map`

`Object.fromEntries` 方法的作用是相反的: 给定一个具有 `[key, value]` 对的数组, 它会根据给定数组转化为 `Map`:

```js run
let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]);

// now prices = { banana: 1, orange: 2, meat: 4 }

alert(prices.orange); // 2
```

我们可以使用 `Object.fromEntries` 从 `Map` 中得到一个纯对象。

例如， 我们存了数据在 `Map` 中, 但是我们需要把它转给需要纯对象的第三方代码 。

我们来开始:

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

调用 `map.entries()` 将返回含有键值对的数组, 这刚好是 `Object.fromEntries` 所需要的格式.

我们可以把带 `(*)` 这一行变得更短:

```js
let obj = Object.fromEntries(map); // omit .entries()
```

上面的代码作用也是一样的, 因为 `Object.fromEntries` 需要一个可迭代对象作为参数， 而一定是数组. `map` 的标准迭代会返回跟 `map.entries()` 一样的键值对. 所以我们可以获得一个与 `Map` 一样具有键值对的纯对象。

## Set

`Set` 是一个特别的类型集合 - "值的集合" (没有键 )，它的每一个值只出现一次。

它的主要方法如下:

- `new Set(iterable)` -- 创建一个 `set`, 如果提供一个 `iterable` 对象 (通常是数组), 将会从数组里面复制值到 `set` 里面去。
- `set.add(value)` -- 添加一个值，返回 set 本身。
- `set.delete(value)` -- 删除值, 如果 `value` 在调用的时候值存在则返回 `true` ，否则返回 `false`。
- `set.has(value)` -- 如果 `value`存在 set 里面则返回 `true`, 否则返回 `false`。
- `set.clear()` -- 移除 set 里面的所有成员。
- `set.size` -- 返回元素数量。

它的主要特点是重复使用同一个值调用 `set.add(value)` 并不会发生什么改变。 这就是 `Set` 里面的每一个值只出现一次的原因。

例如, 我们有游客来访， 需要记住他们每一个人. 但是已经访问过的旅客会导致重复记录. 每个游客必须只被 "counted" 一次.

`Set` 可以帮助我们解决这个问题:

```js run
let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// visits, 一些访客来访好几次
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

// set 只保留那个游客第一次来的次数
alert( set.size ); // 3

for (let user of set) {
  alert(user.name); // John (然后 Pete 最后是 Mary)
}
```

使用 `Set` 的场景可以是一个用户数组， 并且每次插入的时候检查重复的的代码也可以使用 [arr.find](mdn:js/Array/find). 但是这样会是性能变的更差，因为这个方法会遍历整个数组来检查每个元素。 `Set` 有更好的内部优化 - 独一无二的检查.

##  Set 迭代

我们可以在 `Set` 中使用 `for..of`和  `forEach` 它们两者之一来循环 :

```js run
let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) alert(value);

// 跟 forEach 方法相同:
set.forEach((value, valueAgain, set) => {
  alert(value);
});
```

注意到一件有趣的事情. `forEach` 的回调函数有三个参数: 一个 `value`, 然后是 *相同值* `valueAgain`, 最后才是目标对象本身， 的确，相同的值在参数里出现了两次

那是为了兼容 `Map` 在回调里传入 `forEach` 函数后有三个参数。 当然这看起来有点奇怪。但是这对在特定情况下比如使用 `Set`代替 `Map`的时候有帮助，反之亦然。

类似于 `Map`，在 `Set`里用于迭代的方法也被支持：
- `set.keys()` -- 返回一个包含值的可迭代对象,
- `set.values()` -- 跟 `set.keys()` 作用相同, 为了兼容 `Map`,
- `set.entries()` -- 返回一个包含 `[value, value]` 对的可迭代对象 , 它的存在也是为了兼容 `Map`.

## 总结

`Map` -- 是一个键值集合.

方法和属性如下:

- `new Map([iterable])` -- 创建空的 map, 可选的带有 `[key,value]` 对的`iterable` (例如数组) 对象来进行初始化 。
- `map.set(key, value)` -- 存储对应的键值。
- `map.get(key)` -- 根据键来返回值, 如果键不存在 map 里就返回 `undefined`。
- `map.has(key)` -- 如果 `key` 存在则返回 `true` , 否则返回`false`。
- `map.delete(key)` -- 删除指定键值。
- `map.clear()` -- 清空 map 。
- `map.size` -- 返回当前全部元素的数量。

跟普通对象 `Object` 最大的不同点是:

- 任何键，对象都可以被用作它的键，
- 有额外的方法, 和 `size` 属性。

`Set` -- 是一个独一无二的值的集合.

方法和属性:

- `new Set([iterable])` -- 创建空的 set , 可选的带有 `iterable` (例如数组) 对象来进行初始化。
- `set.add(value)` -- 添加一个 value（如果存在则什么也不做）, 返回 set 本身。
- `set.delete(value)` -- 删除 value , 如果在调用的时候存在则返回 `true`, 否则返回 `false`。
- `set.has(value)` -- 如果则返回 `true`, 否则返回 `false`。
- `set.clear()` -- 清空 set。
- `set.size` -- 返回当前全部元素的数量。

在 `Map` 和 `Set` 里迭代总是按照插入的顺序来执行的，所以我们不能说这些集合是无序的，也不可以通过它的数量来记录元素或者直接获取一个元素。
