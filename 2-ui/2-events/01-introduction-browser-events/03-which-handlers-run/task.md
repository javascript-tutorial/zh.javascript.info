importance: 5

---

# 哪个处理程序会运行？

在变量中有一个按钮。它上面没有处理程序。

执行以下代码之后，哪些处理程序会在按钮被点击时运行？会显示哪些 alert？

```js no-beautify
button.addEventListener("click", () => alert("1"));

button.removeEventListener("click", () => alert("1"));

button.onclick = () => alert(2);
```
