
我们应该使用两个处理器：`document.onkeydown` 和 `document.onkeyup`。

`pressed` 应该保持当前按下的键。

第一个处理器添加到它，而第二个处理器会将它移除。我们每一次会在 `keydown` 上检查按压的时间是否充足，如果充足，就会运行该函数。
