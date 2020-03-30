importance: 5

---

# 把 note 放在元素内部（absolute）

扩展上一个任务 <info:task/position-at-absolute>：教函数 `positionAt(anchor, position, elem)` 把 `elem` 插入到 `anchor` 内部。

`position` 的新值：

- `top-out`，`right-out`，`bottom-out` — 和之前一样工作，它们把 `elem` 插入到 `anchor` 的上方/右侧/下方。
- `top-in`，`right-in`，`bottom-in` — 把 `elem` 插入到 `anchor` 内部：将其粘贴到上/右/下边缘。

例如：

```js
// 在 blockquote 上方显示 note
positionAt(blockquote, "top-out", note);

// 在 blockquote 内部的上边缘显示 note
positionAt(blockquote, "top-in", note);
```

结果：

[iframe src="solution" height="310" border="1" link]

可以以上一个任务 <info:task/position-at-absolute> 的解决方案为基础。
