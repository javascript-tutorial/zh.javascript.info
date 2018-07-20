importance: 5

---

# 哪一个处理器在运行？

变量中有一个按钮，上面没有处理器。

在下面代码之后单击哪些处理器会出现警报？

```js no-beautify
button.addEventListener("click", () => alert("1"));

button.removeEventListener("click", () => alert("1"));

button.onclick = () => alert(2);
```
