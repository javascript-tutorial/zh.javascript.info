importance: 5

---

# 扩展热键

创建一个 `runOnKeys(func, code1, code2, ... code_n)` 函数，在同时按下 `code1, code2, ... code_n` 键时运行函数 `func`。

例如，当按键 `"Q"` 和 `"W"` 被一起按下时（任何语言中，无论是否 CapsLock），下面的代码将显示 `alert`：

```js no-beautify
runOnKeys(
  () => alert("Hello!"),
  "KeyQ",
  "KeyW"
);
```

[demo src="solution"]
