
<<<<<<< HEAD
# 计时器元素实例

我们已经创建了 `<time-formatted>` 元素用于展示格式化好的时间。

创建一个 `<live-timer>` 元素用于展示当前时间：
1. 这个元素应该在内部使用 `<time-formatted>`，不要重复实现这个元素的功能。
2. 每秒钟更新。
3. 每一秒钟都应该有一个自定义事件 `tick` 被生成，这个事件的 `event.detail` 属性带有当前日期。（参考章节 <info:dispatch-events> ）。

使用方式：
=======
# Live timer element

We already have `<time-formatted>` element to show a nicely formatted time.

Create `<live-timer>` element to show the current time:
1. It should use `<time-formatted>` internally, not duplicate its functionality.
2. Ticks (updates) every second.
3. For every tick, a custom event named `tick` should be generated, with the current date in `event.detail` (see chapter <info:dispatch-events>).

Usage:
>>>>>>> be342e50e3a3140014b508437afd940cd0439ab7

```html
<live-timer id="elem"></live-timer>

<script>
  elem.addEventListener('tick', event => console.log(event.detail));
</script>
```

<<<<<<< HEAD
例子：
=======
Demo:
>>>>>>> be342e50e3a3140014b508437afd940cd0439ab7

[iframe src="solution" height=40]
