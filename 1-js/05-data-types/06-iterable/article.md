
# Iterables（可迭代对象）

**Iterable** （可迭代对象）是数组的泛化。这个概念是说任何对象都可在 `for..of` 循环中使用。

<<<<<<< HEAD
数组本身就是可迭代的。但不仅仅是数组。字符串也可以迭代，很多其他内建对象也都可以迭代。

在核心 JavaScript 中，可迭代对象用途广泛。我们将会看到，很多内建的操作和方法都依赖于它。
=======
Of course, Arrays are iterable. But there are many other built-in objects, that are iterable as well. For instance, Strings are iterable also. As we'll see, many built-in operators and methods rely on them.

If an object represents a collection (list, set) of something, then `for..of` is a great syntax to loop over it, so let's see how to make it work.

>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

## Symbol.iterator

通过自己创建一个可迭代对象，我们就可以很容易的掌握它的概念。

例如，我们有一个对象，它并不是数组，但是看上去很适合使用 `for..of` 循环。

比如一个 `range` 对象，代表了一个数字区间：

```js
let range = {
  from: 1,
  to: 5
};

// 我们希望 for..of 这样运行：
// for(let num of range) ... num=1,2,3,4,5
```

为了让 `range` 对象可迭代（也就让 `for..of` 可以运行）我们需要为对象添加一个名为 `Symbol.iterator` 的方法（一个特殊的内置标记）。

<<<<<<< HEAD
- 当 `for..of` 循环开始，它将会调用这个方法（如果没找到，就会报错）。
- 这个方法必须返回一个迭代器 —— 一个有 `next` 方法的对象。
- 当 `for..of` 循环希望取得下一个数值，它就调用这个对象的 `next()` 方法。
- `next()` 返回结果的格式必须是 `{done: Boolean, value: any}`，当 `done=true` 时，表示迭代结束，否则 `value` 必须是一个未被迭代的新值。
=======
1. When `for..of` starts, it calls that method once (or errors if not found). The method must return an *iterator* -- an object with the method `next`.
2. Onward, `for..of` works *only with that returned object*.
3. When `for..of` wants the next value, it calls `next()` on that object.
4. The result of `next()` must have the form `{done: Boolean, value: any}`, where `done=true`  means that the iteration is finished, otherwise `value` must be the new value.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

这是 `range` 的全部实现：

```js run
let range = {
  from: 1,
  to: 5
};

// 1. 使用 for..of 将会首先调用它：
range[Symbol.iterator] = function() {

<<<<<<< HEAD
  // 2. ...它返回一个迭代器：
=======
  // ...it returns the iterator object:
  // 2. Onward, for..of works only with this iterator, asking it for next values
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb
  return {
    current: this.from,
    last: this.to,      

    // 3. next() 将在 for..of 的每一轮循环迭代中被调用
    next() {
      // 4. 它将会返回 {done:.., value :...} 格式的对象
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
  };
};

// 现在它可以运行了！
for (let num of range) {
  alert(num); // 1, 然后 2, 3, 4, 5
}
```

<<<<<<< HEAD
这段代码中有几点需要着重关注：

- `range` 自身没有 `next()` 方法。
- 相反，是调用 `range[Symbol.iterator]()` 时将会被创建的另一个所谓的“迭代器”对象，将会处理迭代操作。
=======
Please note the core feature of iterables: an important separation of concerns:

- The `range` itself does not have the `next()` method.
- Instead, another object, a so-called "iterator" is created by the call to `range[Symbol.iterator]()`, and it handles the whole iteration.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

所以，迭代器对象和迭代的对象其实是分离的。

技术上说，我们可以将它们合并，用 `range` 自身作为迭代器来简化代码。

就像这样：

```js run
let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  },

  next() {
    if (this.current <= this.to) {
      return { done: false, value: this.current++ };
    } else {
      return { done: true };
    }
  }
};

for (let num of range) {
  alert(num); // 1, 然后 2, 3, 4, 5
}
```

<<<<<<< HEAD
现在 `range[Symbol.iterator]()` 返回了 `range` 对象自身：它包括了必需的 `next()` 方法并通过 `this.current` 记忆了当前迭代进程。有时候，这样也可以。但缺点是，现在不可能同时在 `range` 上运行两个 `for..of` 循环了：这两个循环将会共享迭代状态，因为仅有一个迭代器 —— 也就是对象自身。

```smart header="Infinite iterators"
无穷迭代也是可行的。例如，`range` 设置为 `range.to = Infinity` 则成为无穷迭代。或者我们可以创建一个可迭代对象，它生成一个伪随机数无穷序列。也是可用的。
=======
Now `range[Symbol.iterator]()` returns the `range` object itself:  it has the necessary `next()` method and remembers the current iteration progress in `this.current`. Shorter? Yes. And sometimes that's fine too.

The downside is that now it's impossible to have two `for..of` loops running over the object simultaneously: they'll share the iteration state, because there's only one iterator -- the object itself. But two parallel for-ofs is a rare thing, even in async scenarios.

```smart header="Infinite iterators"
Infinite iterators are also possible. For instance, the `range` becomes infinite for `range.to = Infinity`. Or we can make an iterable object that generates an infinite sequence of pseudorandom numbers. Also can be useful.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

`next` 没有什么限制，它可以返回越来越多的值，这也很常见。

当然，迭代这种对象的 `for..of` 循环将不会停止。但是我们可以通过使用 `break` 来打断它。
```


## 字符串可迭代

数组和字符串是应用最广泛的内建可迭代对象。

对于一个字符串，`for..of` 循环它的每个字符：

```js run
for (let char of "test") {
<<<<<<< HEAD
  alert( char ); // t，然后 e，然后 s，然后 t
}
```

对于 UTF-16 的扩展字符，它也能正常工作！
=======
  // triggers 4 times: once for each character
  alert( char ); // t, then e, then s, then t
}
```

And it works correctly with surrogate pairs!
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

```js run
let str = '𝒳😂';
for (let char of str) {
    alert( char ); // 𝒳，然后 😂
}
```

## 显式调用迭代器

通常情况下，迭代器的内部函数对外部代码是隐藏的。`for..of` 循环可以工作，就是代码需要了解的所有内容了。

但是为了更深层的了解知识概念，我们来看看如何显式的创建迭代器。

<<<<<<< HEAD
我们将会采用与 `for..of` 一样的方法迭代字符串，但是是直接的调用。这段代码将会获取字符串的迭代器，然后“手动”调用它。
=======
We'll iterate over a string in exactlly the same way as `for..of`, but with direct calls. This code creates a string iterator and gets values from it "manually":
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

```js run
let str = "Hello";

// 和下面代码完成的功能一致
// for (let char of str) alert(char);

let iterator = str[Symbol.iterator]();

while (true) {
  let result = iterator.next();
  if (result.done) break;
  alert(result.value); // 一个一个输出字符
}
```

很少需要我们这样做，但是却给我们比 `for..of` 对迭代过程更多的控制。例如，我们可以将迭代过程分散开：迭代一部分，然后停止，做一些其他处理，然后在稍后恢复迭代。

## 可迭代对象和类数组对象 [#array-like]

这两个正式的术语很相似，但是却非常不同。请你确保良好的掌握它们，并避免混淆。

- **Iterables** 是应用于 `Symbol.iterator` 方法的对象，像上文所述。
- **Array-likes** 是有索引和 `length` 属性的对象，所以它们很像数组。

<<<<<<< HEAD
很自然的，这些属性都可以结合起来。例如，字符串既是可迭代对象（`for..of` 可以迭代字符串）也是类数组对象（它们有数字索引也有 `length` 属性）。
=======
When we use JavaScript for practical tasks in browser or other environments, we may meet objects that are iterables or array-likes, or both.

For instance, strings are both iterable (`for..of` works on them) and array-like (they have numeric indexes and `length`).
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

但是一个可迭代对象也许不是类数组对象。反之亦然，一个类数组对象可能也不可迭代。

例如，上面例子中的 `range` 是可迭代的，但并非类数组对象，因为它没有索引属性，也没有 `length` 属性。

这个对象则是类数组的，但是不可迭代：

```js run
let arrayLike = { // 有索引和长度 => 类数组对象
  0: "Hello",
  1: "World",
  length: 2
};

*!*
// 错误（没有 Symbol.iterator）
for (let item of arrayLike) {}
*/!*
```

<<<<<<< HEAD
它们有什么共同点？可迭代对象和类数组对象通常都不是数组，他们没有 `push`，`pop` 等等方法。如果我们有一个这样的对象并且想像数组那样操作它，这就有些不方便了。

## Array.from

有一个全局方法 [Array.from](mdn:js/Array/from) 可以把它们全都结合起来。它以一个可迭代对象或者类数组对象作为参数并返回一个真正的 `Array` 数组。然后我们就可以用该对象调用数组的方法了。
=======
Both iterables and array-likes are usually *not arrays*, they don't have `push`, `pop` etc. That's rather inconvenient if we have such an object and want to work with it as with an array. E.g. we would like to work with `range` using array methods. How to achieve that?

## Array.from

There's a universal method [Array.from](mdn:js/Array/from) that takes an iterable or array-like value and makes a "real" `Array` from it. Then we can call array methods on it.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

例如：

```js run
let arrayLike = {
  0: "Hello",
  1: "World",
  length: 2
};

*!*
let arr = Array.from(arrayLike); // (*)
*/!*
alert(arr.pop()); // World（pop 方法生效）
```

在行 `(*)`，`Array.from` 方法以一个对象为参数，检测到它是一个可迭代对象或类数组对象，然后将它转化为一个新的数组并将所有元素拷贝进去。

如果是可迭代对象，也是同样：

```js
// 假设 range 来自上文例子中
let arr = Array.from(range);
alert(arr); // 1,2,3,4,5 （数组的 toString 转化函数生效）
```

`Array.from` 的完整语法允许提供一个可选的 "mapping"（映射）函数：
```js
Array.from(obj[, mapFn, thisArg])
```

<<<<<<< HEAD
第二个参数 `mapFn` 应是一个在元素被添加到数组前，施加于每个元素的方法，`thisArg` 允许设置方法的 `this` 对象。
=======
The optional second argument `mapFn` can be a function that will be applied to each element before adding to the array, and `thisArg` allows to set `this` for it.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

例如：

```js
// 假设 range 来自上文例子中

// 求每个数的平方
let arr = Array.from(range, num => num * num);

alert(arr); // 1,4,9,16,25
```

现在我们用 `Array.from` 将一个字符串转化为单个字符的数组：

```js run
let str = '𝒳😂';

// 将 str 拆分为字符数组
let chars = Array.from(str);

alert(chars[0]); // 𝒳
alert(chars[1]); // 😂
alert(chars.length); // 2
```

不像 `str.split` 方法，上文的方法依赖于字符串的可迭代特性，所以就像 `for..of` 一样，能正确的处理 UTF-16 扩展字符。

技术上来说，它和下文做了同样的事：

```js run
let str = '𝒳😂';

let chars = []; // Array.from 内部完成了同样的循环
for (let char of str) {
  chars.push(char);
}

alert(chars);
```

...但是精简很多。

我们甚至可以基于 `Array.from` 创建能处理 UTF-16 扩展字符的 `slice` 方法：

```js run
function slice(str, start, end) {
  return Array.from(str).slice(start, end).join('');
}

let str = '𝒳😂𩷶';

alert( slice(str, 1, 3) ); // 😂𩷶

// 原生方法不支持识别 UTF-16 扩展字符
alert( str.slice(1, 3) ); // 乱码（两个不同 UTF-16 扩展字符碎片拼接的结果）
```


## 总结

可以应用 `for..of` 的对象被称为**可迭代的**。

- 技术上来说，可迭代对象必须实现方法 `Symbol.iterator`。
    - `obj[Symbol.iterator]` 的结果被称为**迭代器**。由它处理更深入的迭代过程。
    - 一个迭代器必须有 `next()` 方法，它返回一个 `{done: Boolean, value: any}`，这里 `done:true` 表明迭代结束，否则 `value` 就是下一个值。
- `Symbol.iterator` 方法会被 `for..of` 自动调用，但我们也可以直接调用。
- 内置的可迭代对象例如字符串和数组，都实现了 `Symbol.iterator`。
- 字符串迭代器能够识别 UTF-16 扩展字符。


有索引属性和 `length` 属性的对象被称为**类数组对象**。这种对象也许也有其他属性和方法，但是没有数组的内建方法。

如果我们深入了解规范 —— 我们将会发现大部分内建方法都假设它们需要处理可迭代对象或者类数组对象，而不是真正的数组，因为这样抽象度更高。

`Array.from(obj[, mapFn, thisArg])` 将可迭代对象或类数组对象 `obj` 转化为真正的 `Array` 数组，然后我们就可以对它应用数组的方法。可选参数 `mapFn` 和 `thisArg` 允许我们对每个元素都应用一个函数。
