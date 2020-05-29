
# Iterable object（可迭代对象）

<<<<<<< HEAD
**可迭代（Iterable）** 对象是数组的泛化。这个概念是说任何对象都可以被定制为可在 `for..of` 循环中使用的对象。

数组是可迭代的。但不仅仅是数组。很多其他内建对象也都是可迭代的。例如字符串也是可迭代的。

如果从技术上讲，对象不是数组，而是表示某物的集合（列表，集合），`for..of` 是一个能够遍历它的很好的语法，因此，让我们来看看如何使其发挥作用。
=======
*Iterable* objects is a generalization of arrays. That's a concept that allows us to make any object useable in a `for..of` loop.

Of course, Arrays are iterable. But there are many other built-in objects, that are iterable as well. For instance, strings are also iterable.

If an object isn't technically an array, but represents a collection (list, set) of something, then `for..of` is a great syntax to loop over it, so let's see how to make it work.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31


## Symbol.iterator

通过自己创建一个对象，我们就可以轻松地掌握可迭代的概念。

<<<<<<< HEAD
例如，我们有一个对象，它并不是数组，但是看上去很适合使用 `for..of` 循环。
=======
For instance, we have an object that is not an array, but looks suitable for `for..of`.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

比如一个 `range` 对象，它代表了一个数字区间：

```js
let range = {
  from: 1,
  to: 5
};

// 我们希望 for..of 这样运行：
// for(let num of range) ... num=1,2,3,4,5
```

为了让 `range` 对象可迭代（也就让 `for..of` 可以运行）我们需要为对象添加一个名为 `Symbol.iterator` 的方法（一个专门用于使对象可迭代的内置 symbol）。

<<<<<<< HEAD
1. 当 `for..of` 循环启动时，它会调用这个方法（如果没找到，就会报错）。这个方法必须返回一个 **迭代器（iterator）** —— 一个有 `next` 方法的对象。
2. 从此开始，`for..of` **仅适用于这个被返回的对象**。
3. 当 `for..of` 循环希望取得下一个数值，它就调用这个对象的 `next()` 方法。
4. `next()` 方法返回的结果的格式必须是 `{done: Boolean, value: any}`，当 `done=true` 时，表示迭代结束，否则 `value` 是下一个值。

这是带有注释的 `range` 的完整实现：
=======
1. When `for..of` starts, it calls that method once (or errors if not found). The method must return an *iterator* -- an object with the method `next`.
2. Onward, `for..of` works *only with that returned object*.
3. When `for..of` wants the next value, it calls `next()` on that object.
4. The result of `next()` must have the form `{done: Boolean, value: any}`, where `done=true`  means that the iteration is finished, otherwise `value` is the next value.

Here's the full implementation for `range` with remarks:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js run
let range = {
  from: 1,
  to: 5
};

// 1. for..of 调用首先会调用这个：
range[Symbol.iterator] = function() {

<<<<<<< HEAD
  // ……它返回迭代器对象（iterator object）：
  // 2. 接下来，for..of 仅与此迭代器一起工作，要求它提供下一个值
=======
  // ...it returns the iterator object:
  // 2. Onward, for..of works only with this iterator, asking it for next values
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
  return {
    current: this.from,
    last: this.to,      

    // 3. next() 在 for..of 的每一轮循环迭代中被调用
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
  alert(num); // 1, 然后是 2, 3, 4, 5
}
```

<<<<<<< HEAD
请注意可迭代对象的核心功能：关注点分离。

- `range` 自身没有 `next()` 方法。
- 相反，是通过调用 `range[Symbol.iterator]()` 创建了另一个对象，即所谓的“迭代器”对象，并且它的 `next` 会为迭代生成值。
=======
Please note the core feature of iterables: separation of concerns.

- The `range` itself does not have the `next()` method.
- Instead, another object, a so-called "iterator" is created by the call to `range[Symbol.iterator]()`, and its `next()` generates values for the iteration.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

因此，迭代器对象和与其进行迭代的对象是分开的。

从技术上说，我们可以将它们合并，并使用 `range` 自身作为迭代器来简化代码。

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
  alert(num); // 1, 然后是 2, 3, 4, 5
}
```

<<<<<<< HEAD
现在 `range[Symbol.iterator]()` 返回的是 `range` 对象自身：它包括了必需的 `next()` 方法，并通过 `this.current` 记忆了当前的迭代进程。这样更短，对吗？是的。有时这样也可以。

但缺点是，现在不可能同时在对象上运行两个 `for..of` 循环了：它们将共享迭代状态，因为只有一个迭代器，即对象本身。但是两个并行的 `for..of` 是很罕见的，即使在异步情况下。

```smart header="无穷迭代器（iterator）"
无穷迭代器也是可能的。例如，将 `range` 设置为 `range.to = Infinity`，这时 `range` 则成为了无穷迭代器。或者我们可以创建一个可迭代对象，它生成一个无穷伪随机数序列。也是可能的。
=======
Now `range[Symbol.iterator]()` returns the `range` object itself:  it has the necessary `next()` method and remembers the current iteration progress in `this.current`. Shorter? Yes. And sometimes that's fine too.

The downside is that now it's impossible to have two `for..of` loops running over the object simultaneously: they'll share the iteration state, because there's only one iterator -- the object itself. But two parallel for-ofs is a rare thing, even in async scenarios.

```smart header="Infinite iterators"
Infinite iterators are also possible. For instance, the `range` becomes infinite for `range.to = Infinity`. Or we can make an iterable object that generates an infinite sequence of pseudorandom numbers. Also can be useful.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

`next` 没有什么限制，它可以返回越来越多的值，这是正常的。

当然，迭代这种对象的 `for..of` 循环将不会停止。但是我们可以通过使用 `break` 来停止它。
```


## 字符串是可迭代的

数组和字符串是使用最广泛的内建可迭代对象。

对于一个字符串，`for..of` 遍历它的每个字符：

```js run
for (let char of "test") {
<<<<<<< HEAD
  // 触发 4 次，每个字符一次
=======
  // triggers 4 times: once for each character
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
  alert( char ); // t, then e, then s, then t
}
```

<<<<<<< HEAD
对于代理对（surrogate pairs），它也能正常工作！（译注：这里的代理对也就指的是 UTF-16 的扩展字符）
=======
And it works correctly with surrogate pairs!
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js run
let str = '𝒳😂';
for (let char of str) {
    alert( char ); // 𝒳，然后是 😂
}
```

<<<<<<< HEAD
## 显式调用迭代器

为了更深层地了解底层知识，让我们来看看如何显式地使用迭代器。

我们将会采用与 `for..of` 完全相同的方式遍历字符串，但使用的是直接调用。这段代码创建了一个字符串迭代器，并“手动”从中获取值。
=======
## Calling an iterator explicitly

For deeper understanding let's see how to use an iterator explicitly.

We'll iterate over a string in exactly the same way as `for..of`, but with direct calls. This code creates a string iterator and gets values from it "manually":
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js run
let str = "Hello";

// 和 for..of 做相同的事
// for (let char of str) alert(char);

*!*
let iterator = str[Symbol.iterator]();
*/!*

while (true) {
  let result = iterator.next();
  if (result.done) break;
  alert(result.value); // 一个接一个地输出字符
}
```

很少需要我们这样做，但是比 `for..of` 给了我们更多的控制权。例如，我们可以拆分迭代过程：迭代一部分，然后停止，做一些其他处理，然后再恢复迭代。

## 可迭代（iterable）和类数组（array-like） [#array-like]

有两个看起来很相似，但又有很大不同的正式术语。请你确保正确地掌握它们，以免造成混淆。

- **Iterable** 如上所述，是实现 `Symbol.iterator` 方法的对象。
- **Array-like** 是有索引和 `length` 属性的对象，所以它们看起来很像数组。

当我们将 JavaScript 用于编写在浏览器或其他环境中的实际任务时，我们可能会遇到可迭代对象或类数组对象，或两者兼有。

<<<<<<< HEAD
例如，字符串即是可迭代的（`for..of` 对它们有效），又是类数组的（它们有数值索引和 `length` 属性）。
=======
When we use JavaScript for practical tasks in browser or other environments, we may meet objects that are iterables or array-likes, or both.

For instance, strings are both iterable (`for..of` works on them) and array-like (they have numeric indexes and `length`).
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

但是一个可迭代对象也许不是类数组对象。反之亦然，类数组对象可能不可迭代。

例如，上面例子中的 `range` 是可迭代的，但并非类数组对象，因为它没有索引属性，也没有 `length` 属性。

下面这个对象则是类数组的，但是不可迭代：

```js run
let arrayLike = { // 有索引和 length 属性 => 类数组对象
  0: "Hello",
  1: "World",
  length: 2
};

*!*
// Error (no Symbol.iterator)
for (let item of arrayLike) {}
*/!*
```

<<<<<<< HEAD
可迭代对象和类数组对象通常都 **不是数组**，它们没有 `push` 和 `pop` 等方法。如果我们有一个这样的对象，并想像数组那样操作它，那就非常不方便。例如，我们想使用数组方法操作 `range`，应该如何实现呢？

## Array.from

有一个全局方法 [Array.from](mdn:js/Array/from) 可以接受一个可迭代或类数组的值，并从中获取一个“真正的”数组。然后我们就可以对其调用数组方法了。
=======
Both iterables and array-likes are usually *not arrays*, they don't have `push`, `pop` etc. That's rather inconvenient if we have such an object and want to work with it as with an array. E.g. we would like to work with `range` using array methods. How to achieve that?

## Array.from

There's a universal method [Array.from](mdn:js/Array/from) that takes an iterable or array-like value and makes a "real" `Array` from it. Then we can call array methods on it.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

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
alert(arr.pop()); // World（pop 方法有效）
```

<<<<<<< HEAD
在 `(*)` 行的 `Array.from` 方法接受对象，检查它是一个可迭代对象或类数组对象，然后创建一个新数组，并将该对象的所有元素复制到这个新数组。
=======
`Array.from` at the line `(*)` takes the object, examines it for being an iterable or array-like, then makes a new array and copies all items to it.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

如果是可迭代对象，也是同样：

```js
// 假设 range 来自上文的例子中
let arr = Array.from(range);
alert(arr); // 1,2,3,4,5 （数组的 toString 转化方法生效）
```

<<<<<<< HEAD
`Array.from` 的完整语法允许我们提供一个可选的“映射（mapping）”函数：
=======
The full syntax for `Array.from` also allows us to provide an optional "mapping" function:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
```js
Array.from(obj[, mapFn, thisArg])
```

<<<<<<< HEAD
可选的第二个参数 `mapFn` 可以是一个函数，该函数会在对象中的元素被添加到数组前，被应用于每个元素，此外 `thisArg` 允许我们为该函数设置 `this`。
=======
The optional second argument `mapFn` can be a function that will be applied to each element before adding it to the array, and `thisArg` allows us to set `this` for it.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

例如：

```js
// 假设 range 来自上文例子中

// 求每个数的平方
let arr = Array.from(range, num => num * num);

alert(arr); // 1,4,9,16,25
```

现在我们用 `Array.from` 将一个字符串转换为单个字符的数组：

```js run
let str = '𝒳😂';

// 将 str 拆分为字符数组
let chars = Array.from(str);

alert(chars[0]); // 𝒳
alert(chars[1]); // 😂
alert(chars.length); // 2
```

与 `str.split` 方法不同，它依赖于字符串的可迭代特性。因此，就像 `for..of` 一样，可以正确地处理代理对（surrogate pair）。（译注：代理对也就是 UTF-16 扩展字符。）

技术上来说，它和下文做了同样的事：

```js run
let str = '𝒳😂';

let chars = []; // Array.from 内部执行相同的循环
for (let char of str) {
  chars.push(char);
}

alert(chars);
```

<<<<<<< HEAD
……但 `Array.from` 精简很多。
=======
...But it is shorter.    
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

我们甚至可以基于 `Array.from` 创建代理感知（surrogate-aware）的`slice` 方法（译注：也就是能够处理 UTF-16 扩展字符的 `slice` 方法）：

```js run
function slice(str, start, end) {
  return Array.from(str).slice(start, end).join('');
}

let str = '𝒳😂𩷶';

alert( slice(str, 1, 3) ); // 😂𩷶

<<<<<<< HEAD
// 原生方法不支持识别代理对（译注：UTF-16 扩展字符）
alert( str.slice(1, 3) ); // 乱码（两个不同 UTF-16 扩展字符碎片拼接的结果）
=======
// the native method does not support surrogate pairs
alert( str.slice(1, 3) ); // garbage (two pieces from different surrogate pairs)
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
```


## 总结

可以应用 `for..of` 的对象被称为 **可迭代的**。

<<<<<<< HEAD
- 技术上来说，可迭代对象必须实现 `Symbol.iterator` 方法。
    - `obj[Symbol.iterator]` 的结果被称为 **迭代器（iterator）**。由它处理进一步的迭代过程。
    - 一个迭代器必须有 `next()` 方法，它返回一个 `{done: Boolean, value: any}` 对象，这里 `done:true` 表明迭代结束，否则 `value` 就是下一个值。
- `Symbol.iterator` 方法会被 `for..of` 自动调用，但我们也可以直接调用它。
- 内置的可迭代对象例如字符串和数组，都实现了 `Symbol.iterator`。
- 字符串迭代器能够识别代理对（surrogate pair）。（译注：代理对也就是 UTF-16 扩展字符。）
=======
- Technically, iterables must implement the method named `Symbol.iterator`.
    - The result of `obj[Symbol.iterator]` is called an *iterator*. It handles the further iteration process.
    - An iterator must have the method named `next()` that returns an object `{done: Boolean, value: any}`, here `done:true` denotes the end of the iteration process, otherwise the `value` is the next value.
- The `Symbol.iterator` method is called automatically by `for..of`, but we also can do it directly.
- Built-in iterables like strings or arrays, also implement `Symbol.iterator`.
- String iterator knows about surrogate pairs.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31


有索引属性和 `length` 属性的对象被称为 **类数组对象**。这种对象可能还具有其他属性和方法，但是没有数组的内建方法。

如果我们仔细研究一下规范 —— 就会发现大多数内建方法都假设它们需要处理的是可迭代对象或者类数组对象，而不是“真正的”数组，因为这样抽象度更高。

`Array.from(obj[, mapFn, thisArg])` 将可迭代对象或类数组对象 `obj` 转化为真正的数组 `Array`，然后我们就可以对它应用数组的方法。可选参数 `mapFn` 和 `thisArg` 允许我们将函数应用到每个元素。
