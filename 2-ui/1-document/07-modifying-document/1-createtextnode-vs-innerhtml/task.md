importance: 5

---

# createTextNode vs innerHTML vs textContent

我们有一个空的 DOM 元素 `elem` 和一个字符串 `text`。

下面这 3 个命令中的哪些命令会执行完全相同的操作？

1. `elem.append(document.createTextNode(text))`
2. `elem.innerHTML = text`
3. `elem.textContent = text`
