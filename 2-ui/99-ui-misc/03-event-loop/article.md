
<<<<<<< HEAD
# 事件循环：微任务和宏任务

浏览器中 JavaScript 的执行流程和 Node.js 中的流程都是基于 **事件循环** 的。

理解事件循环的工作方式对于代码优化很重要，有时对于正确的架构也很重要。

在本章中，我们首先介绍有关事物工作方式的理论细节，然后介绍该知识的实际应用。

## 事件循环

**事件循环** 的概念非常简单。它是一个在 JavaScript 引擎等待任务，执行任务和进入休眠状态等待更多任务这几个状态之间转换的无限循环。

引擎的一般算法：

1. 当有任务时：
    - 从最先进入的任务开始执行。
2. 休眠直到出现任务，然后转到第 1 步。

当我们浏览一个网页时就是上述这种形式。JavaScript 引擎大多数时候不执行任何操作，仅在脚本/处理程序/事件激活时执行。

任务示例：

- 当外部脚本 `<script src="...">` 加载完成时，任务就是执行它。
- 当用户移动鼠标时，任务就是派生出 `mousemove` 事件和执行处理程序。
- 当安排的（scheduled）`setTimeout` 时间到达时，任务就是执行其回调。
- ……诸如此类。

设置任务 —— 引擎处理它们 —— 然后等待更多任务（即休眠，几乎不消耗 CPU 资源）。

一个任务到来时，引擎可能正处于繁忙状态，那么这个任务就会被排入队列。

多个任务组成了一个队列，即所谓的“宏任务队列”（v8 术语）：

![](eventLoop.svg)

例如，当引擎正在忙于执行一段 `script` 时，用户可能会移动鼠标而产生 `mousemove` 事件，`setTimeout` 或许也刚好到期，以及其他任务，这些任务组成了一个队列，如上图所示。

队列中的任务基于“先进先出”的原则执行。当浏览器引擎执行完 `script` 后，它会处理 `mousemove` 事件，然后处理 `setTimeout` 处理程序，依此类推。

到目前为止，很简单，对吧？

两个细节：
1. 引擎执行任务时永远不会进行渲染（render）。如果任务执行需要很长一段时间也没关系。仅在任务完成后才会绘制对 DOM 的更改。
2. 如果一项任务执行花费的时间过长，浏览器将无法执行其他任务，无法处理用户事件，因此，在一定时间后浏览器会在整个页面抛出一个如“页面未响应”之类的警报，建议你终止这个任务。这种情况常发生在有大量复杂的计算或导致死循环的程序错误时。

以上是理论知识。现在，让我们来看看如何应用这些知识。

## 用例 1：拆分 CPU 过载任务

假设我们有一个 CPU 过载任务。

例如，语法高亮（用来给本页面中的示例代码着色）是相当耗费 CPU 资源的任务。为了高亮显示代码，它执行分析，创建很多着了色的元素，然后将它们添加到文档中 —— 对于文本量大的文档来说，需要耗费很长时间。

当引擎忙于语法高亮时，它就无法处理其他 DOM 相关的工作，例如处理用户事件等。它甚至可能会导致浏览器“中断（hiccup）”甚至“挂起（hang）”一段时间，这是不可接受的。

我们可以通过将大任务拆分成多个小任务来避免这个问题。高亮显示前 100 行，然后使用 `setTimeout`（延时参数为 0）来安排（schedule）后 100 行的高亮显示，依此类推。

为了演示这种方法，简单起见，让我们写一个从 `1` 数到 `1000000000` 的函数，而不写文本高亮。

如果你运行下面这段代码，你会看到引擎会“挂起”一段时间。对于服务端 JS 来说这显而易见，并且如果你在浏览器中运行它，尝试点击页面上其他按钮时，你会发现在计数结束之前不会处理其他事件。
=======
# Event loop: microtasks and macrotasks

Browser JavaScript execution flow, as well as in Node.js, is based on an *event loop*.

Understanding how event loop works is important for optimizations, and sometimes for the right architecture.

In this chapter we first cover theoretical details about how things work, and then see practical applications of that knowledge.

## Event Loop

The concept of *event loop* is very simple. There's an endless loop, when JavaScript engine waits for tasks, executes them and then sleeps waiting for more tasks.

The general algorithm of the engine:

1. While there are tasks:
    - execute them, starting with the oldest task.
2. Sleep until a task appears, then go to 1.

That's a formalization for what we see when browsing a page. JavaScript engine does nothing most of the time, only runs if a script/handler/event activates.

Examples of tasks:

- When an external script `<script src="...">` loads, the task is to execute it.
- When a user moves their mouse, the task is to dispatch `mousemove` event and execute handlers.
- When the time is due for a scheduled `setTimeout`, the task is to run its callback.
- ...and so on.

Tasks are set -- the engine handles them -- then waits for more tasks (while sleeping and consuming close to zero CPU).

It may happen that a task comes while the engine is busy, then it's enqueued.

The tasks form a queue, so-called "macrotask queue" (v8 term):

![](eventLoop.svg)

For instance, while the engine is busy executing a `script`, a user may move their mouse causing `mousemove`, and `setTimeout` may be due and so on, these tasks form a queue, as illustrated on the picture above.

Tasks from the queue are processed on "first come – first served" basis. When the engine browser is done with the `script`, it handles `mousemove` event, then `setTimeout` handler, and so on.

So far, quite simple, right?

Two more details:
1. Rendering never happens while the engine executes a task. Doesn't matter if the task takes a long time. Changes to DOM are painted only after the task is complete.
2. If a task takes too long, the browser can't do other tasks, process user events, so after a time it raises an alert like "Page Unresponsive" suggesting to kill the task with the whole page. That happens when there are a lot of complex calculations or a programming error leading to infinite loop.

That was a theory. Now let's see how we can apply that knowledge.

## Use-case 1: splitting CPU-hungry tasks

Let's say we have a CPU-hungry task.

For example, syntax-highlighting (used to colorize code examples on this page) is quite CPU-heavy. To highlight the code, it performs the analysis, creates many colored elements, adds them to the document -- for a large amount of text that takes a lot of time.

While the engine is busy with syntax highlighting, it can't do other DOM-related stuff, process user events, etc. It may even cause the browser to "hiccup" or even "hang" for a bit, which is unacceptable.

We can avoid problems by splitting the big task into pieces. Highlight first 100 lines, then schedule `setTimeout` (with zero-delay) for the next 100 lines, and so on.

To demonstrate this approach, for the sake of simplicity, instead of text-highlighting, let's take a function that counts from `1` to `1000000000`.

If you run the code below, the engine will "hang" for some time. For server-side JS that's clearly noticeable, and if you are running it in-browser, then try to click other buttons on the page -- you'll see that no other events get handled until the counting finishes.
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

```js run
let i = 0;

let start = Date.now();

function count() {

<<<<<<< HEAD
  // 做一个繁重的任务
=======
  // do a heavy job
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8
  for (let j = 0; j < 1e9; j++) {
    i++;
  }

  alert("Done in " + (Date.now() - start) + 'ms');
}

count();
```

<<<<<<< HEAD
浏览器甚至可能会显示一个“脚本执行时间过长”的警告。

让我们使用嵌套的 `setTimeout` 调用来拆分这个任务：
=======
The browser may even show a "the script takes too long" warning.

Let's split the job using nested `setTimeout` calls:
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

```js run
let i = 0;

let start = Date.now();

function count() {

<<<<<<< HEAD
  // 做繁重的任务的一部分 (*)
=======
  // do a piece of the heavy job (*)
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8
  do {
    i++;
  } while (i % 1e6 != 0);

  if (i == 1e9) {
    alert("Done in " + (Date.now() - start) + 'ms');
  } else {
<<<<<<< HEAD
    setTimeout(count); // 安排（schedule）新的调用 (**)
=======
    setTimeout(count); // schedule the new call (**)
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8
  }

}

count();
```

<<<<<<< HEAD
现在，浏览器界面在“计数”过程中可以正常使用。

单次执行 `count` 会完成工作 `(*)` 的一部分，，然后根据需要重新安排（schedule）自身的执行 `(**)`：

1. 首先执行计数：`i=1...1000000`。
2. 然后执行计数：`i=1000001..2000000`。
3. ……以此类推。

现在，如果在引擎忙于执行第一部分时出现了一个新的副任务（例如 `onclick` 事件），则该任务会被排入队列，然后在第一部分执行结束时，并在下一部分开始执行前，会执行该副任务。周期性地在两次 `count` 执行期间返回事件循环，这为 JavaScript 引擎提供了足够的“空气”来执行其他操作，以响应其他的用户行为。

值得注意的是这两种变体 —— 是否使用了 `setTimeout` 对任务进行拆分 —— 在执行速度上是相当的。在执行计数的总耗时上没有多少差异。

为了使两者耗时更接近，让我们来做一个改进。

我们将要把调度（scheduling）移动到 `count()` 的开头：
=======
Now the browser interface is fully functional during the "counting" process.

A single run of `count` does a part of the job `(*)`, and then re-schedules itself `(**)` if needed:

1. First run counts: `i=1...1000000`.
2. Second run counts: `i=1000001..2000000`.
3. ...and so on.

Now, if a new side task (e.g. `onclick` event) appears while the engine is busy executing part 1, it gets queued and then executes when part 1 finished, before the next part. Periodic returns to the event loop between `count` executions provide just enough "air" for the JavaScript engine to do something else, to react to other user actions.

The notable thing is that both variants -- with and without splitting the job by `setTimeout` -- are comparable in speed. There's not much difference in the overall counting time.

To make them closer, let's make an improvement.

We'll move the scheduling to the beginning of the `count()`:
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

```js run
let i = 0;

let start = Date.now();

function count() {

<<<<<<< HEAD
  // 将调度（scheduling）移动到开头
  if (i < 1e9 - 1e6) {
    setTimeout(count); // 安排（schedule）新的调用
=======
  // move the scheduling to the beginning
  if (i < 1e9 - 1e6) {
    setTimeout(count); // schedule the new call
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8
  }

  do {
    i++;
  } while (i % 1e6 != 0);

  if (i == 1e9) {
    alert("Done in " + (Date.now() - start) + 'ms');
  }

}

count();
```

<<<<<<< HEAD
现在，当我们开始调用 `count()` 时，会看到我们需要对 `count()` 进行更多调用，我们就会在工作前立即安排（schedule）它。

如果你运行它，你很容易注意到它花费的时间明显减少了。

为什么？

这很简单：你应该还记得，多个嵌套的 `setTimeout` 调用在浏览器中的最小延迟为 4ms。即使我们设置了 `0`，但还是 `4ms`（或者更久一些）。所以我们安排（schedule）得越早，运行速度也就越快。

最后，我们将一个繁重的任务拆分成了几部分，现在它不会阻塞用户界面了。而且其总耗时并不会长很多。

## 用例 2：进度指示

对浏览器脚本中的过载型任务进行拆分的另一个好处是，我们可以显示进度指示。

通常，浏览器会在当前执行的代码完成后进行渲染（render）。任务的执行是否会花费很长时间对此没有影响。对 DOM 的更改只有在任务完成后才会被绘制。

从一方面讲，这非常好，因为我们的函数可能会创建很多元素，将它们一个接一个地插入到文档中，并更改其样式 —— 访问者不会看到任何未完成的“中间态”内容。很重要，对吧？

这是一个示例，对 `i` 的更改在该函数完成前不会显示出来，所以我们将只会看到最后的值：
=======
Now when we start to `count()` and see that we'll need to `count()` more, we schedule that immediately, before doing the job.

If you run it, it's easy to notice that it takes significantly less time.

Why?  

That's simple: as you remember, there's the in-browser minimal delay of 4ms for many nested `setTimeout` calls. Even if we set `0`, it's `4ms` (or a bit more). So the earlier we schedule it - the faster it runs.

Finally, we've split a CPU-hungry task into parts - now it doesn't block the user interface. And its overall execution time isn't much longer.

## Use case 2: progress indication

Another benefit of splitting heavy tasks for browser scripts is that we can show progress indication.

Usually the browser renders after the currently running code is complete. Doesn't matter if the task takes a long time. Changes to DOM are painted only after the task is finished.

On one hand, that's great, because our function may create many elements, add them one-by-one to the document and change their styles -- the visitor won't see any "intermediate", unfinished state. An important thing, right?

Here's the demo, the changes to `i` won't show up until the function finishes, so we'll see only the last value:
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8


```html run
<div id="progress"></div>

<script>

  function count() {
    for (let i = 0; i < 1e6; i++) {
      i++;
      progress.innerHTML = i;
    }
  }

  count();
</script>
```

<<<<<<< HEAD
……但是我们也可能想在任务执行期间展示一些东西，例如进度条。

如果我们使用 `setTimeout` 将繁重的任务拆分成几部分，那么变化就会被在它们之间绘制出来。

这看起来更好看：
=======
...But we also may want to show something during the task, e.g. a progress bar.

If we split the heavy task into pieces using `setTimeout`, then changes are painted out in-between them.

This looks prettier:
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

```html run
<div id="progress"></div>

<script>
  let i = 0;

  function count() {

<<<<<<< HEAD
    // 做繁重的任务的一部分 (*)
=======
    // do a piece of the heavy job (*)
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8
    do {
      i++;
      progress.innerHTML = i;
    } while (i % 1e3 != 0);

    if (i < 1e7) {
      setTimeout(count);
    }

  }

  count();
</script>
```

<<<<<<< HEAD
现在 `div` 显示了 `i` 的值的增长，这就是进度条的一种。


## 用例 3：在事件之后做一些事情

在事件处理程序中，我们可能会决定推迟某些行为，直到事件冒泡并在所有级别上得到处理后。我们可以通过将该代码包装到零延迟的 `setTimeout` 中来做到这一点。

在 <info:dispatch-events> 一章中，我们看到过这样一个例子：自定义事件 `menu-open` 被在 `setTimeout` 中分派（dispatched），所以它在 `click` 事件被处理完成之后发生。
=======
Now the `<div>` shows increasing values of `i`, a kind of a progress bar.


## Use case 3: doing something after the event

In an event handler we may decide to postpone some actions until the event bubbled up and was handled on all levels. We can do that by wrapping the code in zero delay `setTimeout`.

In the chapter <info:dispatch-events> we saw an example: custom event `menu-open` is dispatched in `setTimeout`, so that it happens after the "click" event is fully handled.
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

```js
menu.onclick = function() {
  // ...

<<<<<<< HEAD
  // 创建一个具有被点击的菜单项的数据的自定义事件
=======
  // create a custom event with the clicked menu item data
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8
  let customEvent = new CustomEvent("menu-open", {
    bubbles: true
  });

<<<<<<< HEAD
  // 异步分派（dispatch）自定义事件
=======
  // dispatch the custom event asynchronously
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8
  setTimeout(() => menu.dispatchEvent(customEvent));
};
```

<<<<<<< HEAD
## 宏任务和微任务

除了本章中所讲的 **宏任务（macrotask）** 外，还有在 <info:microtask-queue> 一章中提到的 **微任务（microtask）**。

微任务仅来自于我们的代码。它们通常是由 promise 创建的：对 `.then/catch/finally` 处理程序的执行会成为微任务。微任务也被用于 `await` 的“幕后”，因为它是 promise 处理的另一种形式。

还有一个特殊的函数 `queueMicrotask(func)`，它对 `func` 进行排队，以在微任务队列中执行。

**每个宏任务之后，引擎会立即执行微任务队列中的所有任务，然后再执行其他的宏任务，或渲染，或进行其他任何操作。**

例如，看看下面这个示例：
=======
## Macrotasks and Microtasks

Along with *macrotasks*, described in this chapter, there exist *microtasks*, mentioned in the chapter <info:microtask-queue>.

Microtasks come solely from our code. They are usually created by promises: an execution of `.then/catch/finally` handler becomes a microtask. Microtasks are used "under the cover" of `await` as well, as it's another form of promise handling.

There's also a special function `queueMicrotask(func)` that queues `func` for execution in the microtask queue.

**Immediately after every *macrotask*, the engine executes all tasks from *microtask* queue, prior to running any other macrotasks or rendering or anything else.**

For instance, take a look:
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

```js run
setTimeout(() => alert("timeout"));

Promise.resolve()
  .then(() => alert("promise"));

alert("code");
```

<<<<<<< HEAD
这里的执行顺序是怎样的？

1. `code` 首先显示，因为它是常规的同步调用。
2. `promise` 第二个出现，因为 `then` 会通过微任务队列，并在当前代码之后执行。
3. `timeout` 最后显示，因为它是一个宏任务。

更详细的事件循环图示如下（顺序是从上到下，即：首先是脚本，然后是微任务，渲染等）：

![](eventLoop-full.svg)

微任务会在执行任何其他事件处理，或渲染，或执行任何其他宏任务之前完成。

这很重要，因为它确保了微任务之间的应用程序环境基本相同（没有鼠标坐标更改，没有新的网络数据等）。

如果我们想要异步执行（在当前代码之后）一个函数，但是要在更改被渲染或新事件被处理之前执行，那么我们可以使用 `queueMicrotask` 来对其进行安排（schedule）。

这是一个与前面那个例子类似的，带有“计数进度条”的示例，但是它使用了 `queueMicrotask` 而不是 `setTimeout`。你可以看到它在最后才渲染。就像写的是同步代码一样：
=======
What's going to be the order here?

1. `code` shows first, because it's a regular synchronous call.
2. `promise` shows second, because `.then` passes through the microtask queue, and runs after the current code.
3. `timeout` shows last, because it's a macrotask.

The richer event loop picture looks like this (order is from top to bottom, that is: the script first, then microtasks, rendering and so on):

![](eventLoop-full.svg)

All microtasks are completed before any other event handling or rendering or any other macrotask takes place.

That's important, as it guarantees that the application environment is basically the same (no mouse coordinate changes, no new network data, etc) between microtasks.

If we'd like to execute a function asynchronously (after the current code), but before changes are rendered or new events handled, we can schedule it with `queueMicrotask`.

Here's an example with "counting progress bar", similar to the one shown previously, but `queueMicrotask` is used instead of `setTimeout`. You can see that it renders at the very end. Just like the synchronous code:
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8

```html run
<div id="progress"></div>

<script>
  let i = 0;

  function count() {

<<<<<<< HEAD
    // 做繁重的任务的一部分 (*)
=======
    // do a piece of the heavy job (*)
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8
    do {
      i++;
      progress.innerHTML = i;
    } while (i % 1e3 != 0);

    if (i < 1e6) {
  *!*
      queueMicrotask(count);
  */!*
    }

  }

  count();
</script>
```

<<<<<<< HEAD
## 总结

事件循环的更详细的算法（尽管与 [规范](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model) 相比仍然是简化过的）：

1. 从 **宏任务** 队列（例如 "script"）中出队（dequeue）并执行最早的任务。
2. 执行所有 **微任务**：
    - 当微任务队列非空时：
        - 出队（dequeue）并执行最早的微任务。
3. 执行渲染，如果有。
4. 如果宏任务队列为空，则休眠直到出现宏任务。
5. 转到步骤 1。

安排（schedule）一个新的 **宏任务**：
- 使用零延迟的 `setTimeout(f)`。

它可被用于将繁重的计算任务拆分成多个部分，以使浏览器能够对用户事件作出反应，并在任务的各部分之间显示任务进度。

此外，也被用于在事件处理程序中，将一个行为（action）安排（schedule）在事件被完全处理（冒泡完成）后。

安排一个新的 **微任务**：
- 使用 `queueMicrotask(f)`。
- promise 处理程序也会通过微任务队列。

在微任务之间没有 UI 或网络事件的处理：它们一个立即接一个地执行。

所以，我们可以使用 `queueMicrotask` 来在保持环境状态一致的情况下，异步地执行一个函数。

```smart header="Web Workers"
对于不应该阻塞事件循环的耗时长的繁重计算任务，我们可以使用 [Web Workers](https://html.spec.whatwg.org/multipage/workers.html)。

这是在另一个并行线程中运行代码的方式。

Web Workers 可以与主线程交换消息，但是它们具有自己的变量和事件循环。

Web Workers 没有访问 DOM 的权限，因此，它们对于同时使用多个 CPU 内核的计算非常有用。
=======
## Summary

The more detailed algorithm of the event loop (though still simplified compare to the [specification](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model)):

1. Dequeue and run the oldest task from the *macrotask* queue (e.g. "script").
2. Execute all *microtasks*:
    - While the microtask queue is not empty:
        - Dequeue and run the oldest microtask.
3. Render changes if any.
4. If the macrotask queue is empty, wait till a macrotask appears.
5. Go to step 1.

To schedule a new *macrotask*:
- Use zero delayed `setTimeout(f)`.

That may be used to split a big calculation-heavy task into pieces, for the browser to be able to react on user events and show progress between them.

Also, used in event handlers to schedule an action after the event is fully handled (bubbling done).

To schedule a new *microtask*
- Use `queueMicrotask(f)`.
- Also promise handlers go through the microtask queue.

There's no UI or network event handling between microtasks: they run immediately one after another.

So one may want to `queueMicrotask` to execute a function asynchronously, but within the environment state.

```smart header="Web Workers"
For long heavy calculations that shouldn't block the event loop, we can use [Web Workers](https://html.spec.whatwg.org/multipage/workers.html).

That's a way to run code in another, parallel thread.

Web Workers can exchange messages with the main process, but they have their own variables, and their own event loop.

Web Workers do not have access to DOM, so they are useful, mainly, for calculations, to use multiple CPU cores simultaneously.
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8
```
