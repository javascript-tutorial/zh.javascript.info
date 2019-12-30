# Generators

<<<<<<< HEAD
通常情况下，函数都只会返回一个值或者什么也不返回。

Generators 可以按需一个个返回（“yield”）多个值，可以是无限数量个值。它们与 [iterables](info:iterable) 配合使用，可以轻松创建数据流。

## Generator 函数

要创建 generator，我们需要一个特殊的语法结构：`function*`，即所谓的“generator 函数”。

它看起来像这样：
=======
Regular functions return only one, single value (or nothing).

Generators can return ("yield") multiple values, one after another, on-demand. They work great with [iterables](info:iterable), allowing to create data streams with ease.

## Generator functions

To create a generator, we need a special syntax construct: `function*`, so-called "generator function".

It looks like this:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

```js
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}
```

<<<<<<< HEAD
“generator 函数”这个术语听起来有点误导，因为我们在调用它时候并不会执行代码。相反，他返回一个特殊的对象，我们称为“generator 对象”。

因此，它是一种“generator 构造器函数”。

```js
// “generator 函数”创建“generator 对象”
let generator = generateSequence();
```

`generator` 对象类似于“冻结函数调用（frozen function call）”：

![](generateSequence-1.svg)

在创建后，代码在一开始就暂停执行。

Generator 的主要方法是 `next()`。调用它后，就会恢复上面的执行过程直到最近的 `yield <value>` 语句。然后代码再次暂停执行，并将值返回到外部代码。

例如，这里我们创建了 generator 并获取其第一个 yielded 值：
=======
Generator functions behave differently from regular ones. When such function is called, it doesn't run its code. Instead it returns a special object, called "generator object", to manage the execution.

Here, take a look:

```js run
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

// "generator function" creates "generator object"
let generator = generateSequence();
*!*
alert(generator); // [object Generator]
*/!*
```

The function code execution hasn't started yet:

![](generateSequence-1.svg)

The main method of a generator is `next()`. When called, it runs the execution until the nearest `yield <value>` statement (`value` can be omitted, then it's `undefined`). Then the function execution pauses, and the yielded `value` is returned to the outer code.

The result of `next()` is always an object with two properties:
- `value`: the yielded value.
- `done`: `true` if the function code has finished, otherwise `false`.

For instance, here we create the generator and get its first yielded value:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

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
`next()` 的结果总是一个对象：
- `value`：yielded 值。
- `done`：如果代码没有执行完，其值为 `false`，否则就是 `true`。

截至目前，我们只获得了第一个值：

![](generateSequence-2.svg)

我们再次调用 `generator.next()`。代码恢复执行并返回下一个 `yield`：
=======
As of now, we got the first value only, and the function execution is on the second line:

![](generateSequence-2.svg)

Let's call `generator.next()` again. It resumes the code execution and returns the next `yield`:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

```js
let two = generator.next();

alert(JSON.stringify(two)); // {value: 2, done: false}
```

![](generateSequence-3.svg)

<<<<<<< HEAD
如果我们第三次调用上面代码，代码将会执行到 `return` 语句，此时将会完成这个函数的执行：
=======
And, if we call it a third time, the execution reaches the `return` statement that finishes the function:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

```js
let three = generator.next();

alert(JSON.stringify(three)); // {value: 3, *!*done: true*/!*}
```

![](generateSequence-4.svg)

<<<<<<< HEAD
现在，generator 已经执行完成了。我们通过 `done:true` 和处理的最终结果 `value:3` 可以看出来。

此时如果再调用 `generator.next()` 将不起任何作用。如果我们还是执行此语句，那么它将会返回相同的对象：`{done: true}`。

对于 generator 来说，没有办法去“回滚”它的操作。但是我们可以通过调用 `generateSequence()` 来创建另一个 generator。

到目前为止，最重要的是要理解 generator 函数与常规函数不同，generator 函数不运行代码。它们是作为“generator 工厂”。运行 `function*` 返回一个 generator，然后我们调用它获得需要的值。

```smart header="`function* f(…)` 或者 `function *f(…)`？"
这是一个小的书写习惯问题，两者的语法都是正确的。

但是通常首选第一种语法，因为星号 `*` 表示它是一个 generator 函数，它描述的是函数种类而不是名称，因此它仍应使用 `function` 关键字。
```

## Generators 是可迭代的

你可能通过 `next()` 方法了解到 generator 是[可迭代](info:iterable)的。

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

We can get loop over values by `for..of`:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

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
这样的方法看上去要比一个个调用 `.next().value` 好得多，不是吗？

……但是请注意：上面的迭代例子中，它先显示 `1`，然后是 `2`。它不会显示 `3`！

这是因为当 `done: true` 时，for-of 循环会忽略最后一个 `value`。因此，如果我们想要通过 `for..of` 循环显示所有结果，我们必须使用 `yield` 而不是 `return` 返回它们：
=======
Looks a lot nicer than calling `.next().value`, right?

...But please note: the example above shows `1`, then `2`, and that's all. It doesn't show `3`!

It's because `for..of` iteration ignores the last `value`, when `done: true`. So, if we want all results to be shown by `for..of`, we must return them with `yield`:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

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
当然，由于 generators 是可迭代的，我们可以调用所有相关的函数，例如：spread 操作 `...`：
=======
As generators are iterable, we can call all related functionality, e.g. the spread syntax `...`:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

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
在上面的代码中，`...generateSequence()` 将 iterable 转换为 item 的数组（关于 spread 操作可以参见相关章节 [](info:rest-parameters-spread-operator#spread-operator)）。

## 使用 generator 进行迭代

在前面章节，[](info:iterable) 我们创建了可迭代的 `range` 对象，它返回 `from..to` 的值。

现在，我们一起回忆下之前的代码：
=======
In the code above, `...generateSequence()` turns the iterable generator object into an array of items (read more about the spread syntax in the chapter [](info:rest-parameters-spread#spread-syntax))

## Using generators for iterables

Some time ago, in the chapter [](info:iterable) we created an iterable `range` object that returns values `from..to`.

Here, let's remember the code:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

```js run
let range = {
  from: 1,
  to: 5,

<<<<<<< HEAD
  // for..of range 在一开始就调用一次这个方法
  [Symbol.iterator]() {
    // ……它返回 iterator 对象：
    // 向前，for..of 仅适用于该对象，请求下一个值
=======
  // for..of range calls this method once in the very beginning
  [Symbol.iterator]() {
    // ...it returns the iterator object:
    // onward, for..of works only with that object, asking it for next values
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117
    return {
      current: this.from,
      last: this.to,

<<<<<<< HEAD
      // for..of 在每次迭代的时候都会调用 next() 
      next() {
        // 它应该返回对象 {done:.., value :...} 值
=======
      // next() is called on each iteration by the for..of loop
      next() {
        // it should return the value as an object {done:.., value :...}
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117
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
alert([...range]); // 1,2,3,4,5
```

使用 generator 来生成可迭代序列更简单，更优雅：

```js run
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

let sequence = [...generateSequence(1,5)];

alert(sequence); // 1, 2, 3, 4, 5
```

## 转换 Symbol.iterator 为 generator

我们可以通过提供一个 generator 作为 `Symbol.iterator` 来向任何自定义对象添加 generator-style 的迭代。

这是相同的 `range`，但是使用的是一个更紧凑的 iterator：
=======
// iteration over range returns numbers from range.from to range.to
alert([...range]); // 1,2,3,4,5
```

We can use a generator function for iteration by providing it as `Symbol.iterator`.

Here's the same `range`, but much more compact:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

```js run
let range = {
  from: 1,
  to: 5,

<<<<<<< HEAD
  *[Symbol.iterator]() { // [Symbol.iterator]: function*() 的简写形式
=======
  *[Symbol.iterator]() { // a shorthand for [Symbol.iterator]: function*()
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

alert( [...range] ); // 1,2,3,4,5
```

<<<<<<< HEAD
正常工作，因为 `range[Symbol.iterator]()` 现在返回一个 generator，而 generator 方法正是 `for..of` 所期待的：
- 它具有 `.next()` 方法
- 它以 `{value: ..., done: true/false}` 的形式返回值

当然，这不是巧合，Generators 被添加到 JavaScript 语言中时也考虑了 iterators，以便更容易实现。

带有 generator 的最后一个变体比 `range` 的原始可迭代代码简洁得多，并保持了相同的功能。

```smart header="Generators 可能永远 generate 值"
在上面的例子中，我们生成了有限序列，但是我们也可以创建一个生成无限序列的 generator，它可以一直 yield 值。例如，无序的伪随机数序列。

这种情况下的 `for..of` generator 需要一个 `break`（或者 `return`）语句，否则循环将永远重复并挂起。
```

## Generator 组合（composition）

Generator 组合是 generator 的一个特殊功能，它可以显式地将 generator “嵌入”到一起。

例如，我们想要生成一个序列：
- 数字 `0..9`（ASCII 可显示字符代码为 48..57），
- 后跟字母 `a..z`（ASCII 可显示字符代码为 65..90）
- 后跟大写字母 `A..Z`（ASCII 可显示字符代码为 97..122）

我们可以使用序列，比如通过从中选择字符来创建密码（也可以添加语法字符），但是我们先生成它。

我们已经有了 `function* generateSequence(start, end)`。让我们重复使用它来一个个地传递 3 个序列，它真是我们所需要的。

在普通函数中，为了将多个其他函数的结果组合到一起，我们先调用它们，然后将他们的结果存储起来，最后将它们合并到一起。

对于 generators，我们可以更好地去实现，就像这样：
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

```js
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}
```

Now we'd like to reuse it to generate a more complex sequence:
- first, digits `0..9` (with character codes 48..57),
- followed by uppercase alphabet letters `A..Z` (character codes 65..90)
- followed by lowercase alphabet letters `a..z` (character codes 97..122)

We can use this sequence e.g. to create passwords by selecting characters from it (could add syntax characters as well), but let's generate it first.

In a regular function, to combine results from multiple other functions, we call them, store the results, and then join at the end.

For generators, there's a special `yield*` syntax to "embed" (compose) one generator into another.

The composed generator:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

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
示例中的特殊 `yield*` 指令负责组合。它将执行**委托**给另一个 generator。或者简单来说就是 `yield* gen` 迭代 generator `gen` 并显式地将其 yield 结果转发到外部。好像这些值是由外部 generator yield 一样。

结果就像是我们从嵌套的 generators 内联的代码一样：
=======
The `yield*` directive *delegates* the execution to another generator. This term means that `yield* gen` iterates over the generator `gen` and transparently forwards its yields outside. As if the values were yielded by the outer generator.

The result is the same as if we inlined the code from nested generators:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

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
Generator 组合是将一个 generator 流插入到另一个 generator 的自然的方式。

即使来自嵌套 generator 的值的流是无限的，它也可以正常工作。它很简单，不需要使用额外的内存来存储中间结果。

## “yield” 双向路径（two-way road）

直到此时，generators 就像“固醇（steroids）上的 iterators”。这就是它经常被使用的方式。

但是实际上，generators 要更强大，更灵活。

这是因为 `yield` 是一个双向路径：它不仅向外面返回结果，而且可以传递 generator 内的值。

为此，我们应该使用参数 arg 调用 `generator.next(arg)`。这个参数就成了 `yield` 的结果。

我们来看一个例子：
=======
A generator composition is a natural way to insert a flow of one generator into another. It doesn't use extra memory to store intermediate results.

## "yield" is a two-way road

Until this moment, generators were similar to iterable objects, with a special syntax to generate values. But in fact they are much more powerful and flexible.

That's because `yield` is a two-way road: it not only returns the result outside, but also can pass the value inside the generator.

To do so, we should call `generator.next(arg)`, with an argument. That argument becomes the result of `yield`.

Let's see an example:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

```js run
function* gen() {
*!*
<<<<<<< HEAD
  // 向外部代码传递一个问题，然后等待答案
  let result = yield "2 + 2?"; // (*)
=======
  // Pass a question to the outer code and wait for an answer
  let result = yield "2 + 2 = ?"; // (*)
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117
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
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117
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

我们可以看到，与普通函数不同，generators 和调用代码可以通过传递 `next/yield` 中的值来交换结果。

为了使事情浅显易懂，我们来看另一个有更多调用的例子：

```js run
function* gen() {
  let ask1 = yield "2 + 2?";

  alert(ask1); // 4

  let ask2 = yield "3 * 3?"
=======
1. The first call `generator.next()` should be always made without an argument (the argument is ignored if passed). It starts the execution and returns the result of the first `yield "2+2=?"`. At this point the generator pauses the execution, while staying on the line `(*)`.
2. Then, as shown at the picture above, the result of `yield` gets into the `question` variable in the calling code.
3. On `generator.next(4)`, the generator resumes, and `4` gets in as the result: `let result = 4`.

Please note, the outer code does not have to immediately call`next(4)`. It may take time. That's not a problem: the generator will wait.

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
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

  alert(ask2); // 9
}

let generator = gen();

<<<<<<< HEAD
alert( generator.next().value ); // "2 + 2?"

alert( generator.next(4).value ); // "3 * 3?"
=======
alert( generator.next().value ); // "2 + 2 = ?"

alert( generator.next(4).value ); // "3 * 3 = ?"
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

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

要向 `yield` 传递错误，我们应该调用 `generator.throw(err)`。在那种情况下，`err` 与 `yield` 一起被抛出。

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
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

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
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117
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
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117
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
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117
}
*/!*
```

<<<<<<< HEAD
如果我们在那里捕获错误，那么像往常一样，它会转到外部代码（如果有的话），如果没有捕获，则会结束脚本。

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
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117
