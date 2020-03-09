# Generators

<<<<<<< HEAD
常规函数只会返回一个具体值（或者 `undefined`）。

而 Generators 可以按需逐个生成（“yield”）多个值。它们与 [iterables](info:iterable) 配合使用，可以轻松创建数据流。

## Generator 函数

要创建 generator，我们需要一个特殊的语法结构：`function*`，即所谓的“generator 函数”。

它看起来像这样：
=======
Regular functions return only one, single value (or nothing).

Generators can return ("yield") multiple values, one after another, on-demand. They work great with [iterables](info:iterable), allowing to create data streams with ease.

## Generator functions

To create a generator, we need a special syntax construct: `function*`, so-called "generator function".

It looks like this:
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

```js
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}
```

<<<<<<< HEAD
“generator 函数”与常规函数的运行表现有所不同，当执行“generator 函数”时，它并不直接执行完**函数体**的代码，而是返回一个特殊的对象，即“generator 对象”，来管理执行流程。

来打印一下这种对象：

```js
=======
Generator functions behave differently from regular ones. When such function is called, it doesn't run its code. Instead it returns a special object, called "generator object", to manage the execution.

Here, take a look:

```js run
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

<<<<<<< HEAD
// "generator function"（指 generateSequence()） 创建了一个 "generator 对象"
=======
// "generator function" creates "generator object"
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a
let generator = generateSequence();
*!*
alert(generator); // [object Generator]
*/!*
```

<<<<<<< HEAD
上面的代码中，**函数体**代码还没有开始执行:

![](generateSequence-1.svg)

generator 对象的主要方法是 `next()`。被调用时，它会恢复上面的执行过程直到最近的 `yield <value>` 语句（ `value` 可以省略，默认为 `undefined` ）。然后代码再次暂停执行，并将值返回给外部代码。

`next()` 调用结果总是一个包含两个属性的对象：
- `value`: “generator 函数”每次 **产出（yielded）** 的值。（译者注：yield翻译为产出，是为了配合 **生成器（generator）** 的语义。）
- `done`: `true` 表示“generator 函数”已经执行完成，否则为 `false`。

举个例子，下面我们创建一个 generator 并获取其第一个产出的值：
=======
The function code execution hasn't started yet:

![](generateSequence-1.svg)

The main method of a generator is `next()`. When called, it runs the execution until the nearest `yield <value>` statement (`value` can be omitted, then it's `undefined`). Then the function execution pauses, and the yielded `value` is returned to the outer code.

The result of `next()` is always an object with two properties:
- `value`: the yielded value.
- `done`: `true` if the function code has finished, otherwise `false`.

For instance, here we create the generator and get its first yielded value:
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

```js run
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

*!*
let one = generator.next();
*/!*

alert(JSON.stringify(one)); // {value: 1, done: false}
```

<<<<<<< HEAD
截至目前，我们只获得了第一个值，函数体停在了第二行：

![](generateSequence-2.svg)

再次调用 `generator.next()`。代码恢复执行并返回下一个 `yield` 的产出值：
=======
As of now, we got the first value only, and the function execution is on the second line:

![](generateSequence-2.svg)

Let's call `generator.next()` again. It resumes the code execution and returns the next `yield`:
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

```js
let two = generator.next();

alert(JSON.stringify(two)); // {value: 2, done: false}
```

![](generateSequence-3.svg)

<<<<<<< HEAD
如果我们第三次调用上面代码，代码将会执行到 `return` 语句，此时将会完成这个函数的执行：
=======
And, if we call it a third time, the execution reaches the `return` statement that finishes the function:
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

```js
let three = generator.next();

alert(JSON.stringify(three)); // {value: 3, *!*done: true*/!*}
```

![](generateSequence-4.svg)

<<<<<<< HEAD
我们通过 `done:true` 可以看出函数执行完成了，此时 `value:3` 作为函数执行的最终结果。

再调用 `generator.next()` 已经没有什么意义了。这将总是返回相同的对象：`{done: true}`。

```smart header="`function* f(…)` 或者 `function *f(…)`？"
这是一个小的书写习惯问题，两者的语法都是正确的。

但是通常首选第一种语法，因为星号 `*` 表示它是一个 generator 函数，它描述的是函数种类而不是名称，因此`*`应该和 `function` 关键字紧贴一起。
```

## Generators 是可迭代的

看到 `next()` 方法，或许你都猜到了 generator 是 [可迭代](info:iterable) 的。（译者注：`next()` 是 iterator 的必要方法）

我们可以通过 `for..of` 循环迭代所有值：
=======
Now the generator is done. We should see it from `done:true` and process `value:3` as the final result.

New calls to `generator.next()` don't make sense any more. If we do them, they return the same object: `{done: true}`.

```smart header="`function* f(…)` or `function *f(…)`?"
Both syntaxes are correct.

But usually the first syntax is preferred, as the star `*` denotes that it's a generator function, it describes the kind, not the name, so it should stick with the `function` keyword.
```

## Generators are iterable

As you probably already guessed looking at the `next()` method, generators are [iterable](info:iterable).

We can loop over their values using `for..of`:
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

```js run
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

for(let value of generator) {
  alert(value); // 1, then 2
}
```

<<<<<<< HEAD
`for ... of` 写法是不是比 `.next().value` 优雅多了？

……但是请注意：上面的迭代例子中，它先显示 `1`，然后是 `2`。它不会显示 `3`！

这是因为当 `done: true` 时，for-of 循环会忽略最后一个 `value`。因此，如果我们想要通过 `for..of` 循环显示所有结果时，我们必须使用 `yield` 而不是 `return`：
=======
Looks a lot nicer than calling `.next().value`, right?

...But please note: the example above shows `1`, then `2`, and that's all. It doesn't show `3`!

It's because `for..of` iteration ignores the last `value`, when `done: true`. So, if we want all results to be shown by `for..of`, we must return them with `yield`:
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

```js run
function* generateSequence() {
  yield 1;
  yield 2;
*!*
  yield 3;
*/!*
}

let generator = generateSequence();

for(let value of generator) {
  alert(value); // 1, then 2, then 3
}
```

<<<<<<< HEAD
由于 generators 是可迭代的，我们可以充分发挥 ES6 中 iterator 的特性，例如：spread 操作 `...`：
=======
As generators are iterable, we can call all related functionality, e.g. the spread syntax `...`:
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

```js run
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

let sequence = [0, ...generateSequence()];

alert(sequence); // 0, 1, 2, 3
```

<<<<<<< HEAD
在上面的代码中，`...generateSequence()` 将可迭代的“generator 对象”转换为了一个数组（关于 spread 操作可以参见相关章节 [](info:rest-parameters-spread-operator#spread-operator)）。

## 使用 generator 进行迭代

在前面章节，[](info:iterable) 我们创建了可迭代的 `range` 对象，它返回 `from..to` 的值。

现在，我们一起回忆下之前的代码：
=======
In the code above, `...generateSequence()` turns the iterable generator object into an array of items (read more about the spread syntax in the chapter [](info:rest-parameters-spread#spread-syntax))

## Using generators for iterables

Some time ago, in the chapter [](info:iterable) we created an iterable `range` object that returns values `from..to`.

Here, let's remember the code:
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

```js run
let range = {
  from: 1,
  to: 5,

<<<<<<< HEAD
  // for..of range 在一开始就调用一次这个方法
  [Symbol.iterator]() {
    // ……它返回 iterator 对象：
    // 后续的操作中， for..of 将只针对这个 iterator 对象，通过不断的调用 next() 来获取下一个值
=======
  // for..of range calls this method once in the very beginning
  [Symbol.iterator]() {
    // ...it returns the iterator object:
    // onward, for..of works only with that object, asking it for next values
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a
    return {
      current: this.from,
      last: this.to,

<<<<<<< HEAD
      // for..of 在每次迭代的时候都会调用 next() 
      next() {
        // 必须返回特定结构的对象： {done:.., value :...} 
=======
      // next() is called on each iteration by the for..of loop
      next() {
        // it should return the value as an object {done:.., value :...}
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

<<<<<<< HEAD
// 迭代整个 range 对象，返回从 `range.from` 到 `range.to` 范围的所有数字的数组。
alert([...range]); // 1,2,3,4,5
```

我们可以通过提供一个 generator 函数作为对象的 `Symbol.iterator` 来使任何对象可被迭代。

以下是使用的另一种更紧凑的写法的 `range` 对象：
=======
// iteration over range returns numbers from range.from to range.to
alert([...range]); // 1,2,3,4,5
```

We can use a generator function for iteration by providing it as `Symbol.iterator`.

Here's the same `range`, but much more compact:
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

```js run
let range = {
  from: 1,
  to: 5,

<<<<<<< HEAD
  *[Symbol.iterator]() { // [Symbol.iterator]: function*() 的简写形式
=======
  *[Symbol.iterator]() { // a shorthand for [Symbol.iterator]: function*()
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

alert( [...range] ); // 1,2,3,4,5
```

<<<<<<< HEAD
代码正常工作，因为 `range[Symbol.iterator]()` 现在返回一个 generator，而 generator 方法正是 `for..of` 所期望的：
- 它具有 `.next()` 方法
- 它以 `{value: ..., done: true/false}` 的形式返回值

当然，这不是巧合，Generators 被添加到 JavaScript 语言中时也考虑了 iterators，以便更容易实现。

带有 generator 的 `range` 对象比的原始可迭代代码简洁得多，还保持了功能的一致。

```smart header="Generators 可以永远产生值"
在上面的例子中，我们生成了有限序列，但是我们也可以创建一个生成无限序列的 generator，它可以一直 yield 值。例如，无序的伪随机数序列。

这种情况下的 `for..of` generator 需要一个 `break`（或者 `return`）语句，否则循环将永远重复并挂起。
```

## Generator 组合（composition）

Generator 组合是 generator 的一个特殊功能，它可以显式地将 generator “嵌入”到一起。

如下，我们有个生成数字序列的函数：
=======
That works, because `range[Symbol.iterator]()` now returns a generator, and generator methods are exactly what `for..of` expects:
- it has a `.next()` method
- that returns values in the form `{value: ..., done: true/false}`

That's not a coincidence, of course. Generators were added to JavaScript language with iterators in mind, to implement them easily.

The variant with a generator is much more concise than the original iterable code of `range`, and keeps the same functionality.

```smart header="Generators may generate values forever"
In the examples above we generated finite sequences, but we can also make a generator that yields values forever. For instance, an unending sequence of pseudo-random numbers.

That surely would require a `break` (or `return`) in `for..of` over such generator. Otherwise, the loop would repeat forever and hang.
```

## Generator composition

Generator composition is a special feature of generators that allows to transparently "embed" generators in each other.

For instance, we have a function that generates a sequence of numbers:
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

```js
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}
```

<<<<<<< HEAD
接着，我们复用这个函数来生成更加复杂的包含三部分的序列：
- 第一部分为数字 `0..9`（ASCII 可显示字符代码为 48..57），
- 第二部分为大写字母字母 `A..Z`（ASCII 可显示字符代码为 65..90）
- 第三部分为小写字母 `a...z`（ASCII 可显示字符代码为 97..122）

我们可以在这个序列中选择字符来创建密码（也可以添加其他特殊字符），现在先编写这个生成器。

在常规函数的调用中，为了组合多个函数的结果，我们需要先依次调用它们，并分别将他们的结果存储起来，最后统一将它们合并到一起。

对于 generators 而言，我们可以使用 `yield*` 这个语法来将一个 generator 嵌入（组合）到另一个 generator 中：

组合式 generator 的例子：
=======
Now we'd like to reuse it to generate a more complex sequence:
- first, digits `0..9` (with character codes 48..57),
- followed by uppercase alphabet letters `A..Z` (character codes 65..90)
- followed by lowercase alphabet letters `a..z` (character codes 97..122)

We can use this sequence e.g. to create passwords by selecting characters from it (could add syntax characters as well), but let's generate it first.

In a regular function, to combine results from multiple other functions, we call them, store the results, and then join at the end.

For generators, there's a special `yield*` syntax to "embed" (compose) one generator into another.

The composed generator:
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

```js run
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generatePasswordCodes() {

*!*
  // 0..9
  yield* generateSequence(48, 57);

  // A..Z
  yield* generateSequence(65, 90);

  // a..z
  yield* generateSequence(97, 122);
*/!*

}

let str = '';

for(let code of generatePasswordCodes()) {
  str += String.fromCharCode(code);
}

alert(str); // 0..9A..Za..z
```

<<<<<<< HEAD
示例中的 `yield*` 指令负责将执行**委托**给另一个 generator。或者简单来说就是 `yield* gen` 迭代了名为 `gen` 的 generator 并显式地将 `gen` yield 的结果转发到最外部。好像这些值是由外部的 generator yield 的一样。

执行结果和我们将嵌套的 generators 中的代码直接内联到外层generator一样：
=======
The `yield*` directive *delegates* the execution to another generator. This term means that `yield* gen` iterates over the generator `gen` and transparently forwards its yields outside. As if the values were yielded by the outer generator.

The result is the same as if we inlined the code from nested generators:
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

```js run
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generateAlphaNum() {

*!*
  // yield* generateSequence(48, 57);
  for (let i = 48; i <= 57; i++) yield i;

  // yield* generateSequence(65, 90);
  for (let i = 65; i <= 90; i++) yield i;

  // yield* generateSequence(97, 122);
  for (let i = 97; i <= 122; i++) yield i;
*/!*

}

let str = '';

for(let code of generateAlphaNum()) {
  str += String.fromCharCode(code);
}

alert(str); // 0..9A..Za..z
```

<<<<<<< HEAD
**Generator 组合**是将一个 generator 流自然地插入到另一个 generator 的方式。它不需要使用额外的内存来存储中间结果。

## “yield” 双向路径（two-way street）

目前看来，generators 和可迭代对象非常相似，仅仅是其产生 value 的语法有所不同。但实际上，generators 更加高效和灵活。

这是因为 `yield` 是一个双向路径：它不仅向外面返回结果，而且可以将外部的值传递到 generator 内。

调用 `generator.next(arg)`，我们就能将值 `arg` 传递到了 generator 内部。这个 `arg` 参数会变成 `yield` 语句的结果（返回值）。

我们来看一个例子：
=======
A generator composition is a natural way to insert a flow of one generator into another. It doesn't use extra memory to store intermediate results.

## "yield" is a two-way street

Until this moment, generators were similar to iterable objects, with a special syntax to generate values. But in fact they are much more powerful and flexible.

That's because `yield` is a two-way street: it not only returns the result to the outside, but also can pass the value inside the generator.

To do so, we should call `generator.next(arg)`, with an argument. That argument becomes the result of `yield`.

Let's see an example:
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

```js run
function* gen() {
*!*
<<<<<<< HEAD
  // 向外部代码传递一个问题，然后等待答案
  let result = yield "2 + 2?"; // (*)
=======
  // Pass a question to the outer code and wait for an answer
  let result = yield "2 + 2 = ?"; // (*)
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a
*/!*

  alert(result);
}

let generator = gen();

<<<<<<< HEAD
let question = generator.next().value; // <-- yield 返回结果

generator.next(4); // --> 向 generator 传入结果
=======
let question = generator.next().value; // <-- yield returns the value

generator.next(4); // --> pass the result into the generator  
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a
```

![](genYield2.svg)

<<<<<<< HEAD
1. 第一次调用 `generator.next()` 总是没有参数。它开始执行并返回第一个 `yield`（“2+2”）的结果。此时，generator 暂停执行过程（仍然在该行上）。
2. 然后，就像上面图片中显示的那样，`yield` 的结果进入调用代码的 `question` 变量。
3. 在 `generator.next(4)`，generator 恢复，结果为 `4`：`let result = 4`。

请注意，外部代码不必马上调用 `next(4)`。它可能需要一点时间来计算值是多少。这不是问题：generator 将会在调用的时候恢复。

下面是有效的代码：

```js
// 一段时间后恢复 generator
setTimeout(() => generator.next(4), 1000);
```

我们可以看到，与常规函数不同，generators 内部和外部调用环境可以通过 `next/yield` 来传递值，以交换结果。

为了使以上要点浅显易懂，我们来看另一个有更多调用的例子：

```js run
function* gen() {
  let ask1 = yield "2 + 2?";

  alert(ask1); // 4

  let ask2 = yield "3 * 3?"
=======
1. The first call `generator.next()` should be always made without an argument (the argument is ignored if passed). It starts the execution and returns the result of the first `yield "2+2=?"`. At this point the generator pauses the execution, while staying on the line `(*)`.
2. Then, as shown at the picture above, the result of `yield` gets into the `question` variable in the calling code.
3. On `generator.next(4)`, the generator resumes, and `4` gets in as the result: `let result = 4`.

Please note, the outer code does not have to immediately call `next(4)`. It may take time. That's not a problem: the generator will wait.

For instance:

```js
// resume the generator after some time
setTimeout(() => generator.next(4), 1000);
```

As we can see, unlike regular functions, a generator and the calling code can exchange results by passing values in `next/yield`.

To make things more obvious, here's another example, with more calls:

```js run
function* gen() {
  let ask1 = yield "2 + 2 = ?";

  alert(ask1); // 4

  let ask2 = yield "3 * 3 = ?"
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

  alert(ask2); // 9
}

let generator = gen();

<<<<<<< HEAD
alert( generator.next().value ); // "2 + 2?"

alert( generator.next(4).value ); // "3 * 3?"
=======
alert( generator.next().value ); // "2 + 2 = ?"

alert( generator.next(4).value ); // "3 * 3 = ?"
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

alert( generator.next(9).done ); // true
```

<<<<<<< HEAD
执行图：

![](genYield2-2.svg)

1. 第一个 `.next()` 开始执行……它到达第一个 `yield`。
2. 结果返回到外部代码中。
3. 第二个 `.next(4)` 将 `4` 作为第一个 `yield` 结果传递回 generator 并恢复执行过程。
4. ……此时到达第二个 `yield`，它变成了 generator 调用的结果。
5. 第三个 `next(9)` 将 `9` 作为第二个 `yield` 的结果传入 generator 并恢复执行过程，此时到达函数最底部，从而返回 `done: true`。

它就像“乒乓球”游戏。每个 `next(value)`（除了第一个）传递一个值到 generator，这变成了当前 `yield` 的结果，然后返回到下一个 `yield` 的结果。

## generator.throw

正如我们在上面例子中观察到的那样，外部代码可以将值传递到 generator，作为 `yield` 的结果。

……但是它也可以在那里发起（抛出）错误。这很自然，因为错误本身也是一种结果。

要向 `yield` 传递错误，我们应该调用 `generator.throw(err)`。然后，`err` 将在对应的 `yield` 那一行被抛出。

例如，`"2 + 2?"` 的 yield 导致一个错误：
=======
The execution picture:

![](genYield2-2.svg)

1. The first `.next()` starts the execution... It reaches the first `yield`.
2. The result is returned to the outer code.
3. The second `.next(4)` passes `4` back to the generator as the result of the first `yield`, and resumes the execution.
4. ...It reaches the second `yield`, that becomes the result of the generator call.
5. The third `next(9)` passes `9` into the generator as the result of the second `yield` and resumes the execution that reaches the end of the function, so `done: true`.

It's like a "ping-pong" game. Each `next(value)` (excluding the first one) passes a value into the generator, that becomes the result of the current `yield`, and then gets back the result of the next `yield`.

## generator.throw

As we observed in the examples above, the outer code may pass a value into the generator, as the result of `yield`.

...But it can also initiate (throw) an error there. That's natural, as an error is a kind of result.

To pass an error into a `yield`, we should call `generator.throw(err)`. In that case, the `err` is thrown in the line with that `yield`.

For instance, here the yield of `"2 + 2 = ?"` leads to an error:
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

```js run
function* gen() {
  try {
<<<<<<< HEAD
    let result = yield "2 + 2?"; // (1)

    alert("The execution does not reach here, because the exception is thrown above");
  } catch(e) {
    alert(e); // 显示错误
=======
    let result = yield "2 + 2 = ?"; // (1)

    alert("The execution does not reach here, because the exception is thrown above");
  } catch(e) {
    alert(e); // shows the error
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a
  }
}

let generator = gen();

let question = generator.next().value;

*!*
generator.throw(new Error("The answer is not found in my database")); // (2)
*/!*
```

<<<<<<< HEAD
在 `(2)` 行引入 generator 的错误导致 `(1)` 行 `yield` 出现异常。在上面例子中，`try..catch` 可以捕获并显示错误。

如果我们没有捕获它，就像其他的异常，它将从 generator “掉出”到调用代码中。

调用代码的当前行是 `generator.throw`，标记为 `(2)`。所以我们可以在这里捕获它，就像这样：

```js run
function* generate() {
  let result = yield "2 + 2?"; // 这行出错
=======
The error, thrown into the generator at line `(2)` leads to an exception in line `(1)` with `yield`. In the example above, `try..catch` catches it and shows it.

If we don't catch it, then just like any exception, it "falls out" the generator into the calling code.

The current line of the calling code is the line with `generator.throw`, labelled as `(2)`. So we can catch it here, like this:

```js run
function* generate() {
  let result = yield "2 + 2 = ?"; // Error in this line
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a
}

let generator = generate();

let question = generator.next().value;

*!*
try {
  generator.throw(new Error("The answer is not found in my database"));
} catch(e) {
<<<<<<< HEAD
  alert(e); // 显示错误
=======
  alert(e); // shows the error
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a
}
*/!*
```

<<<<<<< HEAD
通常，如果我们没有在那里捕获错误，它会将错误转到外部代码（如果有的话），如果外部也没有捕获错误，则会结束脚本。

## 总结

- Generators 是被 generator 函数 `function* f(…) {…}` 创建的。
- 在 generators（仅 generators）内部，存在 `yield` 操作。
- 外部代码和 generator 可能会通过调用 `next/yield` 交换结果。

在现代 JavaScript 中，generators 很少使用。但是有时候它们会被派上用场，因为函数在执行期间与调用代码交换数据的能力是十分独特的。当然，它们非常适合制作可迭代对象。

另外，在下一章我们将会学习 async generators，它们用于在 `for await ... of` 迭代中读取异步生成的数据流（例如，通过网络分页提取（paginated fetches over a network））。

在网络编程中，我们经常使用数据流，因此这是另一个非常重要的使用场景。
=======
If we don't catch the error there, then, as usual, it falls through to the outer calling code (if any) and, if uncaught, kills the script.

## Summary

- Generators are created by generator functions `function* f(…) {…}`.
- Inside generators (only) there exists a `yield` operator.
- The outer code and the generator may exchange results via `next/yield` calls.

In modern JavaScript, generators are rarely used. But sometimes they come in handy, because the ability of a function to exchange data with the calling code during the execution is quite unique. And, surely, they are great for making iterable objects.

Also, in the next chapter we'll learn async generators, which are used to read streams of asynchronously generated data (e.g paginated fetches over a network) in `for await ... of` loops.

In web-programming we often work with streamed data, so that's another very important use case.
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a
