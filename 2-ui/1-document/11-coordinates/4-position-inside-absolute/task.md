importance: 5

---

# 把注释放在元素内部（使用绝对坐标）

扩展上一个任务 <info:task/position-at-absolute>：把函数 `positionAt(anchor, position, elem)` 改为在 `anchor` 内部插入 `elem` 元素。

`position` 的新值：

- `top-out`，`right-out`，`bottom-out` — 和之前一样工作，它们把 `elem` 插入 `anchor` 的上/中/下。
- `top-in`，`right-in`，`bottom-in` — 把 `elem` 插入 `anchor` 元素内部：将之放在内部的上/中/下边界。

比如说：

```js
// 在 blockquote 上面显示注释
positionAt(blockquote, "top-out", note);

// 在 blockquote 内部的上边界显示注释
positionAt(blockquote, "top-in", note);
```

结果是：

[iframe src="solution" height="310" border="1" link]

可以使用任务 <info:task/position-at-absolute> 的解决方案作为源代码。
