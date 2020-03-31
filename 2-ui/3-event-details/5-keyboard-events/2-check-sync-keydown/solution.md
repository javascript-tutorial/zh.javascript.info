
我们应该使用两个处理程序：`document.onkeydown` 和 `document.onkeyup`。

让我们创建一个集合 `pressed = new Set()` 来保存当前被按下的键。

第一个处理程序把当前被按下的键添加到集合中，而第二个处理程序将被松开的按键从集合中移除。我们每次在 `keydown` 上检查我们是否按下了足够多的键，如果是，则运行函数 `func`。
