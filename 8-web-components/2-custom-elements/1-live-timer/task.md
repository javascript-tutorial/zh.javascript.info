
# 计时器元素实例

我们已经创建了 `<time-formatted>` 元素用于展示格式化好的时间。

创建一个 `<live-timer>` 元素用于展示当前时间：
1. 这个元素应该在内部使用 `<time-formatted>`，不要重复实现这个元素的功能。
2. 每秒钟更新。
3. 每一秒钟都应该有一个自定义事件 `tick` 被生成，这个事件的 `event.detail` 属性带有当前日期。（参考章节 <info:dispatch-events> ）。

使用方式：

```html
<live-timer id="elem"></live-timer>

<script>
  elem.addEventListener('tick', event => console.log(event.detail));
</script>
```

例子：

[iframe src="solution" height=40]
