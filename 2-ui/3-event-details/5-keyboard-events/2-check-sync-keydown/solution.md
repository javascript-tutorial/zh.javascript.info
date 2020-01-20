
我们应该使用两个处理器：`document.onkeydown` 和 `document.onkeyup`。

<<<<<<< HEAD
`pressed` 集合应该保存当前按下的键。
=======
Let's create a set `pressed = new Set()` to keep currently pressed keys.
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912

第一个处理器添加（键）到它里面，而第二个处理器从它里面移除（键）。我们每一次都会在 `keydown` 上检查按压的键是否充足，如果是，则执行函数。
