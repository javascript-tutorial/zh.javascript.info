
<<<<<<< HEAD
# 事件循环：微任务和宏任务

JavaScript 在浏览器里的执行流程跟在 Node.js 中一样，是基于**事件循环**的。

理解事件循环如何运行对于代码优化是重要的，有时对于正确的架构也很重要。

在本章中我们首先覆盖关于这个事情是如何运作的理论细节，然后看看这个知识的实际应用。

## 事件循环

**事件循环**的概念非常简单。它是一个在 JavaScript 引擎等待任务、执行任务和休眠等待更多任务这几个状态之间的无穷无尽的循环。

执行引擎通用的算法：

1. 当有任务时：
    - 从最先进入的任务开始执行
2. 休眠到有新的任务进入，然后到第 1 步

当我们浏览一个网页时就是上述这种形式。JavaScript 引擎大多数时候什么也不做，只在一个脚本、处理函数或者事件被激活时运行。

任务举例：

- 当外部脚本 `<script src="...">` 加载进来时，任务就是执行它。
- 当用户移动鼠标时，任务就是派发出 `mousemove` 事件和执行处理函数。
- 当定时器 `setTimeout` 到期时，任务就是运行其回调。
- ……诸如此类。

任务队列就是一个集合，引擎来处理它们，然后等待更多的任务（即休眠，几乎不消耗 CPU 资源）。

一个任务到来时引擎可能正处于运行状态，那么这个任务就被入队。

多个任务组成了一个队列，命名为“宏任务队列”（v8 术语）：

![](eventLoop.svg)

例如，当引擎忙于执行一段 `script` 时，还可能有用户移动鼠标产生了 `mousemove` 事件，`setTimeout` 或许也刚好到期等这些事件，这些任务组成一个队列，如上图所示。

队列里的任务执行基于“先进先出”原则。当浏览器引擎执行完 `script`，然后来处理 `mousemove` 事件，然后再执行 `setTimeout`  的执行函数，诸如此类。

到目前为止很简单，是吧？

两个更细节的点：
1. 当引擎处理任务时不会执行渲染。如果执行需要很长一段时间也是如此。对于 DOM 的修改只有当任务执行完成才会被绘制。
2. 如果一个任务执行时间过长，浏览器无法处理其他任务，在一定时间后就会在整个页面抛出一个如“页面未响应”的警示建议终止这个任务。这样的场景经常发生在很多复杂计算或者程序错误执行到死循环里。

这样我们有了一个理论，接下来我们来应用所学到的知识。

## 用例 1：拆分 CPU 耗费型任务

假如我们有一个 CPU 耗费型任务。

例如，语法高亮（用来给本示例页面代码上色）是相当繁重的 CPU 任务。为了高亮代码，它执行分析，创造了很多上色后的元素，并把它们添加到页面文档中，这样长文本就会消耗很多的时间。

当引擎忙于语法高亮时，它就无法处理其他 DOM 相关的事情，执行用户的事件等。这样或许会导致浏览器“中断”甚至是“挂起”一段时间，这没法接受。

我们可以拆分大任务为小片任务来规避问题。高亮前 100 行，然后设定 `setTimeout`（延时参数为 0）来高亮另外的 100 行，以此类推。

为了演示此方法，从简洁性上考虑，我们用从 `1` 数到 `1000000000` 的函数来代替语法高亮。

如果你运行如下代码，引擎会"挂起"一段时间。对于服务端 JS 这会显而易见，当运行在浏览器上，尝试点击页面上其他按钮时，你会注意到没有任何其他的事件被执行知道数数函数执行完成。
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

For example, syntax-highlighting (used to colorize code examples on this page) is quite CPU-heavy. To highlight the code, it performs the analysis, creates many colored elements, adds them to the document -- for a big text that takes a lot of time.

While the engine is busy with syntax highlighting, it can't do other DOM-related stuff, process user events, etc. It may even cause the browser to "hiccup" or even "hang" for a bit, which is unacceptable.

We can evade problems by splitting the big task into pieces. Highlight first 100 lines, then schedule `setTimeout` (with zero-delay) another 100 lines, and so on.

To demonstrate the approach, for the sake of simplicity, instead of syntax-highlighting let's take a function that counts from `1` to `1000000000`.

If you run the code below, the engine will "hang" for some time. For server-side JS that's clearly noticeable, and if you are running it in-browser, then try to click other buttons on the page -- you'll see that no other events get handled until the counting finishes.
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a

```js run
let i = 0;

let start = Date.now();

function count() {

<<<<<<< HEAD
  // 执行了一些繁重的任务
=======
  // do a heavy job
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a
  for (let j = 0; j < 1e9; j++) {
    i++;
  }

  alert("Done in " + (Date.now() - start) + 'ms');
}

count();
<<<<<<< HEAD

```

浏览器甚至可能会出现“脚本执行时间过长”的警告。

让我们用嵌套的 `setTimeout` 拆分这个任务：
=======
```

The browser may even show "the script takes too long" warning.

Let's split the job using nested `setTimeout`:
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a

```js run
let i = 0;

let start = Date.now();

function count() {

<<<<<<< HEAD
  // 做一个繁重工作的一部分 (*)
=======
  // do a piece of the heavy job (*)
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a
  do {
    i++;
  } while (i % 1e6 != 0);

  if (i == 1e9) {
    alert("Done in " + (Date.now() - start) + 'ms');
  } else {
<<<<<<< HEAD
    setTimeout(count); // 计划新的调用 (**)
=======
    setTimeout(count); // schedule the new call (**)
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a
  }

}

count();
<<<<<<< HEAD

```

现在浏览器界面在数数执行过程中是完全可用的。

单次运行 `count` 做了一部分工作 `(*)`，然后如果必要的话，重新计划自身的执行 `(**)`：

1. 首先运行数数：`i=1...1000000`。
2. 然后运行数数：`i=1000001..2000000`。
3. 以此类推。

现在，如果一个任务（例如 `onclick` 事件）在引擎忙着执行第一步的时候同时发生，它就会入队然后在第一步执行完成后且第二步之前执行。周期性地在 `count` 的执行返回到事件循环，为 JavaScript 引擎提供了足够的“空间”来做别的事情，比如对用户的行为作出反应。 

需要关注的是两者变体 —— 有和没有用 `setTimeout` 拆分任务 —— 在执行速度上是相当的。在执行数数的总耗时是没有多少差异的。

为了使两者耗时更接近，我们来做一个改进。

我们把定时任务放在 `count()` 的一开始：
=======
```

Now the browser interface is fully functional during the "counting" process.

A single run of `count` does a part of the job `(*)`, and then re-schedules itself `(**)` if needed:

1. First run counts: `i=1...1000000`.
2. Second run counts: `i=1000001..2000000`.
3. ...and so on.

Now, if a new side task (e.g. `onclick` event) appears while the engine is busy executing part 1, it gets queued and then executes when part 1 finished, before the next part. Periodic returns to event loop between `count` executions provide just enough "air" for the JavaScript engine to do something else, to react on other user actions.

The notable thing is that both variants -- with and without splitting the job by `setTimeout` -- are comparable in speed. There's no much difference in the overall counting time.

To make them closer, let's make an improvement.

We'll move the scheduling in the beginning of the `count()`:
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a

```js run
let i = 0;

let start = Date.now();

function count() {

<<<<<<< HEAD
  // 移动定时任务到开始处
  if (i < 1e9 - 1e6) {
    setTimeout(count); // 定时发起新的调用
=======
  // move the scheduling at the beginning
  if (i < 1e9 - 1e6) {
    setTimeout(count); // schedule the new call
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a
  }

  do {
    i++;
  } while (i % 1e6 != 0);

  if (i == 1e9) {
    alert("Done in " + (Date.now() - start) + 'ms');
  }

}

count();
<<<<<<< HEAD

```

现在我们开始调用 `count()`，在发现我们还将需要调用 `count()` 时，就在做具体的任务之前立即定时。

如果你运行它，会注意到耗时明显减少。

为什么？

很简单：你应该还记得，浏览器执行多个嵌套的 `setTimeout` 调用最小延时 4ms。即使设置了 `0` 还是 `4ms`（或者更久一些）。所以我们早一点定时，它就会运行地快一些。

最后，我们拆分 CPU 耗费型任务为几部分，现在它不会阻塞用户的界面了。 而且总耗时并不会多很多。

## 用例 2：进度指示器

另外一个给浏览器脚本拆分繁重任务的好处是我们可以展示进度指示器。

通常浏览器会在当前运行的代码完成后执行渲染。如果一个任务耗时很久也是这样。对 DOM 的修改只有在任务结束后才会被绘制。

从一方面讲，这非常好，因为我们的函数可能创造出很多的元素，把它们挨个地插入到文档中然后改变它们的样式 —— 页面访问者就不会看到任何的 “中间态”，也就是未完成的状态。很重要，对吧？

这是一个样例，`i` 的改变在函数结束前不会有变化，所以我们只会看到最后的值：
=======
```

Now when we start to `count()` and see that we'll need to `count()` more, we schedule that immediately, before doing the job.

If you run it, it's easy to notice that it takes significantly less time.

Why?  

That's simple: as you remember, there's the in-browser minimal delay of 4ms for many nested `setTimeout` calls. Even if we set `0`, it's `4ms` (or a bit more). So the earlier we schedule it - the faster it runs.

Finally, we've split a CPU-hungry task into parts - now it doesn't block the user interface. And its overall execution time isn't much longer.

## Use case 2: progress indication

Another benefit of splitting heavy tasks for browser scripts is that we can show progress indication.

Usually the browser renders after the currently running code is complete. Doesn't matter if the task takes a long time. Changes to DOM are painted only after the task is finished.

From one hand, that's great, because our function may create many elements, add them one-by-one to the document and change their styles -- the visitor won't see any "intermediate", unfinished state. An important thing, right?

Here's the demo, the changes to `i` won't show up until the function finishes, so we'll see only the last value:

>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a

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
<<<<<<< HEAD

```

……但是我们可能会想要在执行任务期间展示一些东西，例如进度条。

如果我们用 `setTimeout` 拆分繁重任务为小片段，值的改变就会在它们之间被绘制。

这样看起来好多了：
=======
```

...But we also may want to show something during the task, e.g. a progress bar.

If we split the heavy task into pieces using `setTimeout`, then changes are painted out in-between them.

This looks prettier:
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a

```html run
<div id="progress"></div>

<script>
  let i = 0;

  function count() {

<<<<<<< HEAD
    // 执行一些繁重的工作 (*)
=======
    // do a piece of the heavy job (*)
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a
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
<<<<<<< HEAD
``` 

现在 `div` 展示了 `i` 的值的增长，跟进度条很类似了。

## 用例 3：在事件之后做一些事情

在事件处理中我们可能要延期一些行为的执行，直到事件冒泡完成并被所有层级接手和处理之后。我们可以把这部分代码放在 0 延迟的 `setTimeout`。

在[生成自定义事件](https://zh.javascript.info/dispatch-events)章节中，我们看到这样一个例子：自定义事件 `menu-open` 在 `setTimeout` 中被派发，所以它发生在“click”事件被完全处理后。
=======
```

Now the `<div>` shows increasing values of `i`, a kind of a progress bar.


## Use case 3: doing something after the event

In an event handler we may decide to postpone some actions until the event bubbled up and was handled on all levels. We can do that by wrapping the code in zero delay `setTimeout`.

In the chapter <info:dispatch-events> we saw an example: custom event `menu-open` is dispatched in `setTimeout`, so that it happens after the "click" event is fully handled.
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a

```js
menu.onclick = function() {
  // ...

<<<<<<< HEAD
  // 创建一个附带被点击菜单项数据的自定义事件
=======
  // create a custom event with the clicked menu item data
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a
  let customEvent = new CustomEvent("menu-open", {
    bubbles: true
  });

<<<<<<< HEAD
  // 异步派发自定义事件
=======
  // dispatch the custom event asynchronously
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a
  setTimeout(() => menu.dispatchEvent(customEvent));
};
```

<<<<<<< HEAD
## 宏任务和微任务

伴随本章描述的**宏任务**还存在着**微任务**，在章节[微任务](https://zh.javascript.info/microtask-queue)有提及到。

微任务仅仅由我们的代码产生。它们通常由 promises 生成：对于 `.then/catch/finally` 的处理函数变成了一个微任务。微任务通常"隐藏在" `await` 下，因为它也是另一种处理 promise 的形式。

有一个特殊的函数 `queueMicrotask(func)`，可以将 `func` 加入到微任务队列来执行。

**在每个宏任务之后，引擎立即执行所有微任务队列中的任务，比任何其他的宏任务或者渲染或者其他事情都要优先。**

来看看例子：
=======
## Macrotasks and Microtasks

Along with *macrotasks*, described in this chapter, there exist *microtasks*, mentioned in the chapter <info:microtask-queue>.

Microtasks come solely from our code. They are usually created by promises: an execution of `.then/catch/finally` handler becomes a microtask. Microtasks are used "under the cover" of `await` as well, as it's another form of promise handling.

There's also a special function `queueMicrotask(func)` that queues `func` for execution in the microtask queue.

**Immediately after every *macrotask*, the engine executes all tasks from *microtask* queue, prior to running any other macrotasks or rendering or anything else.**

For instance, take a look:
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a

```js run
setTimeout(() => alert("timeout"));

Promise.resolve()
  .then(() => alert("promise"));

alert("code");
```

<<<<<<< HEAD
这里的执行顺序是什么呢？

1. `code` 首先出现，因为它是常规的同步调用。
2. `promise` 第二个出现，因为 `then` 从微任务队列中来，在当前代码之后执行。
3. `timeout` 最后出现，因为它是一个宏任务。

更详细的事件循环图如下：

![](eventLoop-full.svg)

**所有的微任务在任何其他的事件处理或者渲染或者任何其他的宏任务发生之前完成调用。**

这非常重要，因为它保证了微任务中的程序运行环境基本一致（没有鼠标位置改变，没有新的网络返回数据，等等）。

如果我们想要异步执行（在当前代码之后）一个函数，但是要在修改被渲染或者新的事件被处理之前，我们可以用 `queueMicrotask` 来定时执行。

还是跟前面的类似的“数数型进度展示条”的例子，不同的是用 `queueMicrotask` 来代替 `setTimeout`。你可以看到它在最后才渲染。就像写的是同步代码：
=======
What's going to be the order here?

1. `code` shows first, because it's a regular synchronous call.
2. `promise` shows second, because `.then` passes through the microtask queue, and runs after the current code.
3. `timeout` shows last, because it's a macrotask.

The richer event loop picture looks like this:

![](eventLoop-full.svg)

**All microtasks are completed before any other event handling or rendering or any other macrotask takes place.**

That's important, as it guarantees that the application environment is basically the same (no mouse coordinate changes, no new network data, etc) between microtasks.

If we'd like to execute a function asynchronously (after the current code), but before changes are rendered or new events handled, we can schedule it with `queueMicrotask`.

Here's an example with "counting progress bar", similar to the one shown previously, but `queueMicrotask` is used instead of `setTimeout`. You can see that it renders at the very end. Just like the synchronous code:
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a

```html run
<div id="progress"></div>

<script>
  let i = 0;

  function count() {

<<<<<<< HEAD
    // 执行一些繁重的工作 (*)
=======
    // do a piece of the heavy job (*)
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a
    do {
      i++;
      progress.innerHTML = i;
    } while (i % 1e3 != 0);

    if (i < 1e6) {
<<<<<<< HEAD
      queueMicrotask(count);
=======
  *!*
      queueMicrotask(count);
  */!*
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a
    }

  }

  count();
</script>
```

<<<<<<< HEAD
## 总结

更具体的事件循环的算法（尽管跟[标准](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model)相比是简化过的）：

1. 从**宏任务**队列出列并执行最前面的任务（比如“script”）。
2. 执行所有的**微任务**：
    - 当微任务队列非空时：
        - 出列并运行最前面的微任务。
3. 如有需要执行渲染。
4. 如果宏任务队列为空，休眠直到一个宏任务出现。
5. 到步骤 1 中。

计划一个新的**宏任务**：
- 使用 0 延时的 `setTimeout(f)`。

它被用来拆分一个计算耗费型任务为小片段，使浏览器可以对用户行为作出反馈和展示计算的进度。

也被用在事件处理函数中来定时执行一个行为，在当前事件被完全处理（冒泡结束）之后。

计划一个新的**微任务**：
- 使用 `queueMicrotask(f)`。
- promise 的处理函数也是进入到微任务队列。

在微任务中间没有 UI 或者网络事件的处理：它们一个接一个地立即执行。

所以我们可以用 `queueMicrotask` 来异步地执行函数，但是保持环境状态的一致。

```smart header="Web Workers"
为了繁重任务不至于阻塞事件循环，我们可以用 [Web Workers](https://html.spec.whatwg.org/multipage/workers.html)。

这是一个在平行线程中运行代码的办法。

Web Workers 可以跟主线程交换信息，但是它们可以有自己的变量和自己的事件循环。

Web Workers 无权访问 DOM，所以它们主要在计算上有用，用来使用多核 CPU 同时执行的能力。
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

Web Workers do not have access to DOM, so they are useful, mainly, for calculations, to use multiplle CPU cores simultaneously.
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a
```
