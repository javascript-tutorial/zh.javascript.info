importance: 5

---

# 对比 createTextNode、innerHTML 和 textContent

我们有一个空的 DOM 元素 `elem` 和一个字符串 `text`。

以下这三个命令行的结果是一样的吗？

1. `elem.append(document.createTextNode(text))`
2. `elem.innerHTML = text`
3. `elem.textContent = text`
