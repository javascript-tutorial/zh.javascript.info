importance: 5

---

# 截断文本

创建函数 `truncate(str, maxlength)` 来检查 `str` 的长度，如果超过 `maxlength` —— 应使用 `"…"` 来代替 `str` 的结尾部分，长度仍然等于 `maxlength`。

函数的结果应该是截断后的文本（如果需要的话）。

例如：

```js
truncate("What I'd like to tell on this topic is:", 20) = "What I'd like to te…"

truncate("Hi everyone!", 20) = "Hi everyone!"
```
