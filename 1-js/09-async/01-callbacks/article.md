

# Introduction: callbacks
# 简介：回调

Many actions in JavaScript are *asynchronous*.

JavaScript 中的许多操作都是*异步的*。

For instance, take a look at the function `loadScript(src)`:

例如，看一下 `loadScript(src)` 函数：

```js
function loadScript(src) {
  let script = document.createElement('script');
  script.src = src;
  document.head.append(script);
}
```

The purpose of the function is to load a new script. When it adds the `<script src="…">` to the document, the browser loads and executes it.

该函数的目的是加载一个新脚本。当它将 `<script src="…">` 添加到文档时，浏览器会加载并执行它。

We can use it like this:

我们可以像这样使用它：

```js
// loads and executes the script
// 加载并执行脚本
loadScript('/my/script.js');
```

The function is called "asynchronously," because the action (script loading) finishes not now, but later.

该函数被称为“异步地”，是因为操作（脚本加载）现在不会完成，但稍后会完成。

The call initiates the script loading, then the execution continues. While the script is loading, the code below may finish executing, and if the loading takes time, other scripts may run meanwhile too.

调用启动脚本加载，然后继续执行。在加载脚本时，下面的代码可能会完成执行，如果加载需要时间，其他脚本也可能同时运行。

```js
loadScript('/my/script.js');
// the code below loadScript doesn't wait for the script loading to finish
// 在 loadScript 下面的代码不会等待脚本加载完成
// ...
```

Now let's say we want to use the new script when it loads. It probably declares new functions, so we'd like to run them.

现在假设我们想在加载时使用新脚本。因为它可能声明了新的函数，所以我们想运行它们。

But if we do that immediately after the `loadScript(…)` call, that wouldn't work:

但是如果我们在 `loadScript(…)` 调用之后立即执行此操作，那将无效：

```js
loadScript('/my/script.js'); // the script has "function newFunction() {…}"
// 脚本中有 "function newFunction() {…}"

*!*
newFunction(); // no such function! 没有这个函数！
*/!*
```

Naturally, the browser probably didn't have time to load the script. So the immediate call to the new function fails. As of now, the `loadScript` function doesn't provide a way to track the load completion. The script loads and eventually runs, that's all. But we'd like to know when it happens, to use new functions and variables from that script.

当然，浏览器可能没有时间加载脚本，因此，立即调用新函数失败了。到目前为止，`loadScript` 函数没有提供一个判断加载完成的方法。脚本加载并最终运行，这就是全部，但我们想知道它何时发生，以便使用该脚本中的新函数和变量。

Let's add a `callback` function as a second argument to `loadScript` that should execute when the script loads:

让我们添加一个 `callback` 函数作为 `loadScript` 的第二个参数，它应该在脚本加载时执行：

```js
function loadScript(src, *!*callback*/!*) {
  let script = document.createElement('script');
  script.src = src;

*!*
  script.onload = () => callback(script);
*/!*

  document.head.append(script);
}
```

Now if we want to call new functions from the script, we should write that in the callback:

现在，如果我们想从脚本中调用新函数，我们应该在回调中编写它：

```js
loadScript('/my/script.js', function() {
  // the callback runs after the script is loaded
  // 回调在脚本加载后执行
  newFunction(); // so now it works 所以现在可以执行了
  ...
});
```

That's the idea: the second argument is a function (usually anonymous) that runs when the action is completed.

想法就是：第二个参数是一个在操作完成时运行的函数（通常是匿名的）。

Here's a runnable example with a real script:

这有一个带有真实脚本的可运行示例：

```js run
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  script.onload = () => callback(script);
  document.head.append(script);
}

*!*
loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
  alert(`Cool, the ${script.src} is loaded`);
  alert( _ ); // function declared in the loaded script 在加载的脚本中声明的函数
});
*/!*
```

That's called a "callback-based" style of asynchronous programming. A function that does something asynchronously should provide a `callback` argument where we put the function to run after it's complete.

这被称为“基于回调的”异步编程风格。一个异步执行某些函数的函数应该提供一个 `callback` 参数，我们将在它完成后运行函数。

Here we did it in `loadScript`, but of course, it's a general approach.

这里我们用 `loadScript` 来举例，但这当然也是一种通用的方法。

## Callback in callback

## 回调中的回调

How can we load two scripts sequentially: the first one, and then the second one after it?

我们怎样可以按顺序加载两个脚本：第一个脚本，然后是第二个脚本？

The natural solution would be to put the second `loadScript` call inside the callback, like this:

自然的解决方案是将第二个 `loadScript` 放在回调中调用，如下所示：

```js
loadScript('/my/script.js', function(script) {

  alert(`Cool, the ${script.src} is loaded, let's load one more`);

*!*
  loadScript('/my/script2.js', function(script) {
    alert(`Cool, the second script is loaded`);
  });
*/!*

});
```

After the outer `loadScript` is complete, the callback initiates the inner one.

在外部的 `loadScript` 完成后，回调启动内部的 `loadScript`。

What if we want one more script...?

如果我们想再增加一个脚本怎么办？

```js
loadScript('/my/script.js', function(script) {

  loadScript('/my/script2.js', function(script) {

*!*
    loadScript('/my/script3.js', function(script) {
      // ...continue after all scripts are loaded
      // ...所有脚本加载后继续
    });
*/!*

  })

});
```

So, every new action is inside a callback. That's fine for few actions, but not good for many, so we'll see other variants soon.

因此，每个新操作都在回调中。这对于少量操作来说很好，但数量多了并不好，所以我们很快就会看到其他变种。

## Handling errors

## 处理错误

In the above examples we didn't consider errors. What if the script loading fails? Our callback should be able to react on that.

在上面的例子中，我们没有考虑错误，如果脚本加载失败怎么办？我们的回调应该能够对此做出反应。

Here's an improved version of `loadScript` that tracks loading errors:

这是一个跟踪加载错误的 `loadScript` 的改进版本：

```js run
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

*!*
  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));
*/!*

  document.head.append(script);
}
```

It calls `callback(null, script)` for successful load and `callback(error)` otherwise.

它成功加载了就调用 `callback(null, script)`，否则调用 `callback(error)`。

The usage:
用法：
```js
loadScript('/my/script.js', function(error, script) {
  if (error) {
    // handle error 处理错误
  } else {
    // script loaded successfully 脚本成功加载了
  }
});
```

Once again, the recipe that we used for `loadScript` is actually quite common. It's called the "error-first callback" style.

我们用于 `loadScript` 的诀窍实际上很常见，它被称为“错误优先回调”风格。

The convention is:
1. The first argument of the `callback` is reserved for an error if it occurs. Then `callback(err)` is called.
2. The second argument (and the next ones if needed) are for the successful result. Then `callback(null, result1, result2…)` is called.

惯例是：
1. 如果发生错误，`callback` 的第一个参数将留给错误使用，则调用 `callback(err)`。
2. 第二个参数（以及下一个参数，如果需要的话）结果是成功的，则调用 `callback(null, result1, result2…)`。

So the single `callback` function is used both for reporting errors and passing back results.

因此单个 `callback` 函数既用于报告错误又用于传回结果。

## Pyramid of Doom

## 厄运金字塔

From the first look, it's a viable way of asynchronous coding. And indeed it is. For one or maybe two nested calls it looks fine.

第一眼看上去，它是一种可行的异步编写方式。事实确实如此，对于一两个嵌套调用，它看起来很好。

But for multiple asynchronous actions that follow one after another we'll have code like this:

但对于多个异步操作，一个接一个地跟在后面，我们将得到如下代码：

```js
loadScript('1.js', function(error, script) {

  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', function(error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript('3.js', function(error, script) {
          if (error) {
            handleError(error);
          } else {
  *!*
            // ...continue after all scripts are loaded (*)
            // ...所有脚本加载后继续 (*)
  */!*
          }
        });
      }
    })
  }
});
```

In the code above:
1. We load `1.js`, then if there's no error.
2. We load `2.js`, then if there's no error.
3. We load `3.js`, then if there's no error -- do something else `(*)`.

在上面的代码中:
1. 我们加载 `1.js`, 然后如果没有错误的话。
2. 我们加载 `2.js`, 然后如果没有错误的话。
3. 我们加载 `3.js`, 然后如果没有错误的话——做一些其他的事情 `(*)`.

As calls become more nested, the code becomes deeper and increasingly more difficult to manage, especially if we have a real code instead of `...`, that may include more loops, conditional statements and so on.

随着调用嵌套越来越多，代码层次会更深，管理也会越来越难，特别是如果我们使用真实的代码而不是 `...`，可能包括更多循环，条件语句等等。

That's sometimes called "callback hell" or "pyramid of doom."

这有时被称为“回调地狱”或“厄运金字塔”。

![](callback-hell.png)

The "pyramid" of nested calls grows to the right with every asynchronous action. Soon it spirals out of control.

嵌套调用的“金字塔”在每次异步操作时都会向右增长，很快它就失控了。

So this way of coding isn't very good.

所以这种编码方式不是很好。

We can try to alleviate the problem by making every action a standalone function, like this:

我们可以尝试通过使每个操作成为独立函数来缓解问题，如下所示：

```js
loadScript('1.js', step1);

function step1(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', step2);
  }
}

function step2(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('3.js', step3);
  }
}

function step3(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...continue after all scripts are loaded (*)
    // ...所有脚本加载后继续 (*)
  }
};
```

See? It does the same, and there's no deep nesting now because we made every action a separate top-level function.

看到了吗？它有相同的效果，但现在深层嵌套没有了，因为我们将每个操作都作为单独的顶级作用域函数。

It works, but the code looks like a torn apart spreadsheet. It's difficult to read, and you probably noticed that one needs to eye-jump between pieces while reading it. That's inconvenient, especially if the reader is not familiar with the code and doesn't know where to eye-jump.

它是有效的，但代码看起来像是一个撕裂的电子表格。它很难阅读，你可能已经注意到，在阅读时需要在各个部分之间跳跃。这很不方便，特别是如果读者不熟悉代码并且不知道在哪里跳跃。

Also, the functions named `step*` are all of single use, they are created only to avoid the "pyramid of doom." No one is going to reuse them outside of the action chain. So there's a bit of a namespace cluttering here.

此外，名为 `step*` 的函数都是单独使用的，它们的创建只是为了避免“厄运金字塔”，没有人会在操作链之外重复使用它们，所以这里的命名空间有一些混乱。

We'd like to have something better.

我们希望有更好的东西。

Luckily, there are other ways to avoid such pyramids. One of the best ways is to use "promises," described in the next chapter.

幸运的是，还有其他方法可以避免这种金字塔。最好的方法之一是使用下一章中描述的“Promises”。
