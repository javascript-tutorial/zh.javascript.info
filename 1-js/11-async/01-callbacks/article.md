

# 简介：回调

```warn header="我们在这里的示例中使用了浏览器方法"
为了演示回调、promise 和其他抽象概念的使用，我们将使用一些浏览器方法：具体地说，是加载脚本和执行简单的文档操作的方法。

如果你不熟悉这些方法，并且对它们在这些示例中的用法感到疑惑，那么你可能需要阅读本教程 [下一部分](/document) 中的几章。

但是，我们会尽全力使讲解变得更加清晰。在这儿不会有浏览器方面的真正复杂的东西。
```

JavaScipt 中的许多行为都是 **异步的**。换句话说，我们现在启动它们，但在稍后再完成。

例如，我们可以使用 `setTimeout` 来安排此类行为。

这儿有一些实际中的异步行为的示例，例如加载脚本和模块（我们将在后面的章节中介绍）。

让我们看一下函数 `loadScript(src)`，该函数使用给定的 `src` 加载脚本：

```js
function loadScript(src) {
  // 创建一个 <script> 标签，并将其附加到页面
  // 这将使得具有给定 src 的脚本开始加载，并在加载完成后运行
  let script = document.createElement('script');
  script.src = src;
  document.head.append(script);
}
```

它将带有给定 `src` 的新动态创建的标签 `<script src="…">` 附加到文档中。浏览器将自动开始加载它，并在加载完成后执行。

我们可以像这样使用这个函数：

```js
// 在给定路径下加载并执行脚本
loadScript('/my/script.js');
```

脚本是“异步”调用的，因为它从现在开始加载，但是在这个加载函数执行完成后才运行。

如果在 `loadScript(…)` 下面有任何其他代码，它们不会等到脚本加载完成才执行。

```js
loadScript('/my/script.js');
// loadScript 下面的代码
// 不会等到脚本加载完成才执行
// ...
```

假设我们需要在新脚本加载后立即使用它。它声明了新函数，我们想运行它们。

但如果我们在 `loadScript(…)` 调用后立即执行此操作，这将不会有效。

```js
loadScript('/my/script.js'); // 这个脚本有 "function newFunction() {…}"

*!*
newFunction(); // 没有这个函数！
*/!*
```

自然情况下，浏览器可能没有时间加载脚本。到目前为止，`loadScript` 函数并没有提供跟踪加载完成的方法。脚本加载并最终运行，仅此而已。但我们希望了解脚本何时加载完成，以使用其中的新函数和变量。

让我们添加一个 `callback` 函数作为 `loadScript` 的第二个参数，该函数应在脚本加载时执行：

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

现在，如果我们想调用该脚本中的新函数，我们应该将其写在回调函数中：

```js
loadScript('/my/script.js', function() {
  // 在脚本加载完成后，回调函数才会执行
  newFunction(); // 现在它工作了
  ...
});
```

这是我们的想法：第二个参数是一个函数（通常是匿名的）会在动作完成后被执行。

这是一个可运行的真实脚本示例：

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
  alert( _ ); // 在加载的脚本中声明的函数
});
*/!*
```

这被称为“基于回调”的异步编程风格。异步执行某些动作的函数，应该提供一个在函数完成时可以运行的 `callback` 参数。

我们 `loadScript` 中就是那么做的，但很明显这是一般性的方法。

## 在回调中回调

如何顺序加载两个脚本：先是第一个，然后是第二个？

最明显的方法是将第二个 `loadScript` 调用放在回调中，就像这样：

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

在外部 `loadScript` 完成时，内部回调就会被回调。

如果我们还想要一个脚本呢？

```js
loadScript('/my/script.js', function(script) {

  loadScript('/my/script2.js', function(script) {

*!*
    loadScript('/my/script3.js', function(script) {
      // ...在所有脚本被加载后继续操作
    });
*/!*

  })

});
```

因此，每一个动作都在回调内部。这对于新动作来说，非常好，但是其他动作却并不友好，因此我们接下来会看到一些此方法的变体。 

## 处理错误

上述示例中，我们并没有考虑错误因素。假如加载失败会如何？我们的回调应该可以立即对其做出响应。

这是可以跟踪错误的 `loadScript` 改进版：

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

成功时，调用 `callback(null, script)`，否则调用 `callback(error)`。

用法：
```js
loadScript('/my/script.js', function(error, script) {
  if (error) {
    // handle error
  } else {
    // 成功加载脚本
  }
});
```

再一次强调，我们使用的 `loadScript` 方法是非常常规的。它被称为 "error-first callback" 风格。

惯例是：
1. `callback` 的第一个参数是为了错误发生而保留的。一旦发生错误，`callback(err)` 就会被调用。
2. 第二个参数（如果有需要）用于成功的结果。此时 `callback(null, result1, result2…)` 将被调用。

因此单个 `callback` 函数可以同时具有报告错误以及传递返回结果的作用。

## 回调金字塔

从第一步可以看出，这是异步编码的一种可行性方案。的确如此，对于一个或两个的简单嵌套，这样的调用看起来非常好。

但对于一个接一个的多个异步动作，代码就会变成这样：

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
            // ...加载所有脚本后继续 (*)
  */!*
          }
        });

      }
    })
  }
});
```

上述代码中：
1. 我们加载 `1.js`，如果没有发生错误。
2. 我们加载 `2.js`，如果没有发生错误。
3. 我们加载 `3.js`，如果没有发生错误 —— 做其他操作 `(*)`。

如果嵌套变多，代码层次就会变深，维护难度也随之增加，尤其是如果我们有一个不是 `...` 的真实代码，就会包含更多的循环，条件语句等。

这有时称为“回调地狱”或者“回调金字塔”。

![](callback-hell.svg)

嵌套调用的“金字塔”在每一个异步动作中都会向右增长。很快就会失去控制。

因此这种编码方式并不可取。

我们可以通过为每个动作编写一个独立函数来解决这一问题，就像这样：

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
    // ...在所有脚本被加载后继续 (*)
  }
};
```

看到了么？效果一样，但是没有深层的嵌套了，因为我们使每个动作都有一个独立的顶层函数。

这很有效，但代码看起来就像是一个被分裂的表格。你可能注意到了，它的可读性非常差。在阅读时，需要在块之间切换。这非常不方便，尤其是不熟悉代码的读者，他们甚至不知道该跳转到何处。

名为 `step*` 的函数都是单一使用的，他们被创建的唯一作用就是避免“回调金字塔”。没有人会在动作链之外重复使用它们。因此这里的命名空间非常杂乱。

或许还有更好的方法。

幸运地是，有其他方法可以避免回调金字塔。其中一个最好的方法是使用 "promises"，我们将在下一章中详细描述。
