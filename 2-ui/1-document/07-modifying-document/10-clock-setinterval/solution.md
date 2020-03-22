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
  timerId = setInterval(update, 1000);
  update(); // (*)
}

function clockStop() {
  clearInterval(timerId);
  timerId = null;
}
```

请注意，`update()` 不仅在 `clockStart()` 中被调度，而且还立即在 `(*)` 行运行。否则，访问者将不得不等到 `setInterval` 第一次执行。在那之前，时钟将是空的。
