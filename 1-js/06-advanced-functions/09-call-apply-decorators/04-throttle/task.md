importance: 5

---

# 节流装饰器

创建一个“节流”装饰器 `throttle(f, ms)` —— 返回一个包装器，每隔 “ms” 毫秒将调用最多传递给 `f` 一次。那些属于“冷却”时期的调用被忽略了。

**与**`debounce` **的区别 —— 如果被忽略的调用是冷却期间的最后一次，那么它会在延迟结束时执行。**

让我们检查一下真实应用程序，以便更好地理解这个需求，并了解它的来源。

**例如，我们想要跟踪鼠标移动。**

<<<<<<< HEAD
在浏览器中，我们可以设置一个函数，鼠标的每次微小的运动都执行，并在移动时获取指针位置。在活动鼠标使用期间，此功能通常非常频繁地运行，可以是每秒 100 次（每 10 毫秒）。
=======
In browser we can setup a function to run at every mouse movement and get the pointer location as it moves. During an active mouse usage, this function usually runs very frequently, can be something like 100 times per second (every 10 ms).
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

**跟踪功能应更新网页上的一些信息。**

更新函数 `update()` 太重了，无法在每次微小动作上执行。每 100 毫秒更频繁地制作一次也没有任何意义。 

<<<<<<< HEAD
因此我们将 `throttle(update, 100)` 指定为在每次鼠标移动时运行的函数，而不是原始的 `update()`。装饰器将经常调用，但 `update()` 最多每 100ms 调用一次。
=======
So we'll wrap it into the decorator: use `throttle(update, 100)` as the function to run on each mouse move instead of the original `update()`. The decorator will be called often, but `update()` will be called at maximum once per 100ms.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

在视觉上，它看起来像这样：

<<<<<<< HEAD
1. 对于第一个鼠标移动，装饰变体将调用传递给 `update`。这很重要，用户会立即看到我们对他行动的反应。
2. 然后当鼠标移动时，直到 “100ms” 没有任何反应。装饰的变体忽略了调用。
3. 在 `100ms`  结束时 - 最后一个坐标发生了一次 `update`。
4. 然后，最后，鼠标停在某处。装饰的变体等到 `100ms`到期，然后用最后一个坐标运行 `update`。因此，也许最重要的是处理最终的鼠标坐标。
=======
1. For the first mouse movement the decorated variant passes the call to `update`. That's important, the user sees our reaction to their move immediately.
2. Then as the mouse moves on, until `100ms` nothing happens. The decorated variant ignores calls.
3. At the end of `100ms` -- one more `update` happens with the last coordinates. 
4. Then, finally, the mouse stops somewhere. The decorated variant waits until `100ms` expire and then runs `update` with last coordinates. So, perhaps the most important, the final mouse coordinates are processed.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

一个代码示例：

```js
function f(a) {
  console.log(a)
};

// f1000 passes calls to f at maximum once per 1000 ms
let f1000 = throttle(f, 1000);

f1000(1); // shows 1
f1000(2); // (throttling, 1000ms not out yet)
f1000(3); // (throttling, 1000ms not out yet)

// when 1000 ms time out...
// ...outputs 3, intermediate value 2 was ignored
```

附：参数和传递给 `f1000` 的上下文 `this` 应该传递给原始的 `f`。
