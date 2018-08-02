importance: 5

---

# 扩展热键

创建一个 `runOnKeys(func, code1, code2, ... code_n)`，同时按下 `code1`、`code2`，...，`code_n` 键时，可以运行的函数 `func` 函数 `runOnKeys(func, code1, code2, ... code_n)`。

例如，当 `"Q"` 和 `"W"` 同时被按下时（在下面语言中，不管有没有 CapsLock）

```js no-beautify
runOnKeys(
  () => alert("Hello!"),
  "KeyQ",
  "KeyW"
);
```

[demo src="solution"]
