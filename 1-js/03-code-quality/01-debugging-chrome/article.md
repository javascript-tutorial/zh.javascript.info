# 在 Chrome 中调试

在编写更复杂的代码前，让我们先来聊聊调试吧。

[调试](https://en.wikipedia.org/wiki/Debugging) 是指在一个脚本中找出并修复错误的过程。所有的现代浏览器和大多数其他环境都支持调试工具 —— 开发者工具中的一个令调试更加容易的特殊用户界面。它也可以让我们一步步地跟踪代码并查看当前实际运行情况。

在这里我们将会使用 Chrome（谷歌浏览器），因为它拥有最丰富的功能，而其他大部分浏览器则具有类似的过程。

## “资源（sources）”面板

你的 Chrome 版本可能看起来有一点不同，但是它应该还是处于很明显的位置。

- 在 Chrome 中打开[示例页面](debugging/index.html)。
- 使用快捷键 `key:F12` (Mac: `key:Cmd+Opt+I`) 打开开发者工具。
- 选择 `sources（资源）` 面板。

如果你是第一次这么做，那你应该会看到下面这个样子：

![](chrome-open-sources.svg)

切换按钮 <span class="devtools" style="background-position:-172px -98px"></span> 会打开文件列表的选项卡。

让我们在预览树中点击和选择 `hello.js`。它应该会出现这个视图：

![](chrome-tabs.svg)

我们可以看到三个区域：

1. **资源区域（resources zone）** 列出了 html、javascript、css 和包括图片在内的页面需要的其他文件。Chrome 扩展的资源也会出现在这。
2. **源码区域（source zone）** 展示源码。
3. **信息和控制区域（Information and control zone）** 是用来调试的，我们很快就会来探讨它。

现在你可以再次点击切换按钮 <span class="devtools" style="background-position:-172px -122px"></span> 隐藏资源列表来给代码腾出一些空间。

## 控制台（Console）

如果我们按下 `key:Esc`，下面会出现一个控制台，我们可以输入一些命令然后按下 `key:Enter` 来执行。

语句执行之后，会将其结果显示在下面。

例如，`1+2` 将会返回 `3`，`hello("debugger")` 函数什么也不返回，因此结果是 `undefined`：

![](chrome-sources-console.svg)

## 断点（Breakpoints）

我们来看看 [示例页面](debugging/index.html) 发生了什么。在 `hello.js` 中，点击第 `4` 行。是的，就点击数字 `"4"` 上，不是点击代码。

恭喜你！你已经设置了一个断点。现在，请在第 `8` 行的数字上也点击一下。

看起来应该是这样的（蓝色是你应该点击的地方）：

![](chrome-sources-breakpoint.svg)

**断点** 是调试器会自动暂停 JavaScript 执行的地方。

当代码被暂停时，我们可以检查当前的变量、在控制台执行命令等等。换句话说，我们可以调试它。

我们总是可以在右侧的面板中找到断点的列表。当我们在数个文件中有许多断点时，这是非常有用的。它允许我们：
- 快速跳转至代码中的断点（通过点击右侧面板中的对应的断点）。
- 通过取消选中断点来临时禁用对应的断点。
- 通过右键单击并选择移除来删除一个断点。
- ……等等。

```smart header="条件断点"
在行号上 **右键单击** 允许你创建一个 **条件** 断点。只有当给定的表达式为真（即满足条件）时才会被触发。

当我们需要在特定的变量值或参数的情况下暂停程序执行时，这种调试方法就很有用了。
```

## Debugger 命令

我们也可以使用 `debugger` 命令来暂停代码，像这样：

```js
function hello(name) {
  let phrase = `Hello, ${name}!`;

*!*
  debugger;  // <-- 调试器会在这停止
*/!*

  say(phrase);
}
```

当我们在一个代码编辑器中并且不想切换到浏览器在开发者工具中查找脚本来设置断点时，这真的是非常方便。


## 暂停并查看

在我们的例子中，`hello()` 函数在页面加载期间被调用，因此激活调试器的最简单的方法（在我们已经设置了断点后）就是 —— 重新加载页面。因此让我们按下 `key:F5`（Windows，Linux）或 `key:Cmd+R`（Mac）吧。

设置断点之后，程序会在第 4 行暂停执行：

![](chrome-sources-debugger-pause.svg)

请打开右侧的信息下拉列表（箭头指示出的地方）。这里允许你查看当前的代码状态：

1. **`察看（Watch）` —— 显示各种表达式的当前值。**

    你可以点击加号 `+` 然后输入一个表达式。调试器将随时显示它的值，并在执行过程中自动重新计算。

2. **`调用栈（Call Stack）` —— 显示嵌套的调用链。**

    此时，调试器正在 `hello()` 的调用链中，被 `index.html` 中的一个脚本调用（这里没有函数，因此显示 "anonymous"）

    如果你点击了一个堆栈项，调试器将调到相应的代码那，并且还可以查看其所有的变量。
3. **`作用域（Scope）` —— 显示当前的变量。**

    `Local` 显示当前函数中的变量，你还可以在源代码中看到它们的值高亮显示了出来。

    `Global` 显示全局变量（任何函数外）。

    还有一个 `this` 关键字目前我们还没有学到，不过我们很快就会讨论它了。

## 跟踪执行

现在是 **跟踪** 脚本的时候了。

在右侧面板的顶部有一些按钮。让我们来使用它们吧。
<!-- https://github.com/ChromeDevTools/devtools-frontend/blob/master/front_end/Images/src/largeIcons.svg -->
<span class="devtools" style="background-position:-146px -168px"></span> —— “恢复（Resume）”：继续执行，快捷键 `key:F8`.
: 继续执行。如果没有其他另外的断点，那么程序就会继续执行，并且调试器不会再控制程序。

    如果我们点击一下之后我们会看到这样的情况：

    ![](chrome-sources-debugger-trace-1.svg)

    执行恢复，到了 `say()` 函数中的另外一个断点然后暂停在那里。看一下右边的 "Call stack"。它已经增加了一个调用信息。我们现在在 `say()` 里面。

<span class="devtools" style="background-position:-200px -190px"></span> —— “下一步（Step）”：运行下一条指令，快捷键 `key:F9`。
: 运行下一条语句。如果我们现在点击它，`alert` 会被显示出来。

    一次又一次点击此按钮会逐步运行脚本的所有语句。

<span class="devtools" style="background-position:-62px -192px"></span> -- “跨步（Step over）”：运行下一条指令，但 **不会进入到一个函数中**，快捷键 `key:F10`。
: 跟上一条命令“下一步（Step）”相似，但如果下一条语句是函数调用则表现不同。

    “下一步（Step）”命令进入函数内部并在第一行暂停执行，而“跨步（Step over）”不可视地执行函数调用，忽略了函数的内部（执行细节）。

    执行会在该函数执行后立即暂停。

    如果我们对该函数内部执行不感兴趣，这命令会很有用。

<span class="devtools" style="background-position:-4px -194px"></span> —— 步入（step into），快捷键 `key:F11`。
: 和“下一步（Step）”类似，但在异步函数调用情况下表现不同。如果你刚刚才开始学 JavaScript，那么你可以先忽略此差异，因为我们还没有用到异步调用。

    至于以后，请记住“下一步（Step）”命令会忽略异步方法，例如 `setTimeout`（约定的函数调用），它会过一段时间后再执行。而“步入（step into）”会进入到代码中并等待（如果需要）。浏览 [DevTools 手册](https://developers.google.com/web/updates/2018/01/devtools#async) 获取更多细节。

<span class="devtools" style="background-position:-104px -76px"></span> —— “步出（Step out）”: 继续执行到当前函数的末尾，快捷键 `key:Shift+F11`。
: 执行器将会停止在当前函数的最后一行。当我们使用 <span class="devtools" style="background-position:-200px -190px"></span> 偶然地进入到一个嵌套调用，但是我们又对这个函数不感兴趣时，我们想要尽可能的继续执行到最后的时候是非常方便的。

<span class="devtools" style="background-position:-61px -74px"></span> —— 启用/禁用所有的断点。
: 这个按钮不会影响程序的执行。只是一个对批量断点的开/关。

<span class="devtools" style="background-position:-264px -4px"></span> —— 发生错误时启用/禁用自动暂停。
: 当启动此功能并且开发者工具是打开着的时候，任意一个脚本的错误会导致自动暂停其执行。然后我们可以分析变量来看一下什么出错了。因此如果我们的脚本因为错误挂掉的时候，我们可以打开调试器，启用这个选项然后重载页面，查看一下哪里导致它挂掉了和当时的上下文是什么。

```smart header="继续到这"
在代码中的某一行上右键打开一个带有“继续到这里（Continue to here）”非常有用的选项的关联菜单（context menu）。

当你想要向前移动很多步但是又懒得设置一个断点时非常的方便。
```

## 日志记录

想要输出一些东西到控制台上？ `console.log` 函数可以满足你。

例如：将从 `0` 到 `4` 的值输出到控制台上：

```js run
// 打开控制台来查看
for (let i = 0; i < 5; i++) {
  console.log("value", i);
}
```

普通用户看不到这个输出，它是在控制台里面的。要想看到它 —— 要么打开开发者工具中的 Console（控制台）选项卡，要么在一个其他的选项卡中按下 `key:Esc`：这会在下方打开一个控制台。

如果我们在代码中有足够的日志记录，那么我们可以从记录中看到刚刚发生了什么，而不需要借助调试器。

## 总结

我们可以看到，有 3 种方式来暂停一个脚本：
1. 一个断点。
2. `debugger` 语句。
3. 一个错误（如果开发者工具是打开状态并且按钮 <span class="devtools" style="background-position:-90px -146px"></span> 是开启状态）。

当暂停时，我们就能进行调试 —— 检查变量，并逐步查看执行器在哪里出错了。

开发者工具中还有比这篇文章中更多的选项。完整的手册在 <https://developers.google.com/web/tools/chrome-devtools> 。

本章节中的信息足够开始调试了，但是以后，尤其是你做了大量关于浏览器的东西后，请你去（上面的链接里）查看开发者工具的更高级功能。

对了，你也可以点击开发者工具中的其他地方来看一下会显示什么。这可能是你学习开发者工具的最快的路线了。不要忘了还有右键单击和关联菜单哟。
