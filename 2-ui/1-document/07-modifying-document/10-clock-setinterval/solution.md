首先，使用 HTML/CSS.

每个时间组件都限制在 `<span>`：

```html
<div id="clock">
  <span class="hour">hh</span>:<span class="min">mm</span>:<span class="sec">ss</span>
</div>
```

我们还会用 CSS 丰富样式。

`update` 会刷新时钟，它调用 `setInterval` 每秒刷新一次：

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

在这行 `(*)` 我们每秒检查当前时间。调用 `setInterval` 并不是完全可靠：它有可能发生延迟现象。

时钟管理函数：

```js
let timerId;

function clockStart() { // run the clock
  timerId = setInterval(update, 1000);
  update(); // (*)
}

function clockStop() {
  clearInterval(timerId);
  timerId = null;
}
```

请留意 `update()`，它不单在 `clockStart()` 被间隔器调用，也会在 `(*)` 立即调用一次。如果不是这样，只有在 `setInterval` 第一次执行周期时，才能看到时钟，在此之前时钟一直都是空的。
