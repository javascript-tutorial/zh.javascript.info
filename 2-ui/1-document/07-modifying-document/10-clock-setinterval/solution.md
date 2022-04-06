首先，让我们编写 HTML/CSS。

时间的每个组件都有其自己的 `<span>`，那将会看起来很棒：

```html
<div id="clock">
  <span class="hour">hh</span>:<span class="min">mm</span>:<span class="sec">ss</span>
</div>
```

另外，我们需要使用 CSS 为它们着色。

函数 `update` 会刷新时钟，由 `setInterval` 每秒调用一次：

```js
function update() {
  let clock = document.getElementById('clock');
*!*
  let date = new Date(); // (*)
*/!*
  let hours = date.getHours();
  if (hours < 10) hours = '0' + hours;
  clock.children[0].innerHTML = hours;

  let minutes = date.getMinutes();
  if (minutes < 10) minutes = '0' + minutes;
  clock.children[1].innerHTML = minutes;

  let seconds = date.getSeconds();
  if (seconds < 10) seconds = '0' + seconds;
  clock.children[2].innerHTML = seconds;
}
```

在 `(*)` 行中，我们每次都检查当前时间。`setInterval` 调用并不可靠：它们可能会发生延迟现象。

时钟管理函数：

```js
let timerId;

function clockStart() { // 运行时钟
  if (!timerId) { // 仅当时钟停止时 setInterval
    timerId = setInterval(update, 1000);
  }
  update(); // (*)
}

function clockStop() {
  clearInterval(timerId);
  timerId = null; // (**)
}
```

请注意，`update()` 不仅在 `clockStart()` 中被调度，而且还立即在 `(*)` 行运行。否则，访问者将不得不等到 `setInterval` 第一次执行。在那之前，时钟将是空的。

此外，在 `clockStart()` 中仅当时钟未运行时才进行 setInterval 也是至关重要的。否则多次点击 Start 按钮会设置多个并发的间隔。更糟糕的是 —— 我们只会保留最后一个时间间隔的 `timerID`，失去对所有其他时间间隔的引用。那我们就再也无法停止时钟了！请注意，当时钟停止时，我们需要在 `(**)` 行这样清除 `timerID`，以便可以通过执行 `clockStart()` 再次启动时钟。
