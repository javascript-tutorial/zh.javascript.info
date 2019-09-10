# 查询引用字符串

构建一个正则表达式用于匹配双引号内的字符串 `subject:"..."`。

最重要的部分是字符串应该支持转义，正如 JavaScript 字符串的行为一样。例如，引号可以插入为 `subject:\"`，换行符为 `subject:\n`，斜杠本身为 `subject:\\`。

```js
let str = "Just like \"here\".";
```

对我们来说，重要的是转义的引号 `subject:\"` 不会结束字符串匹配。

所以，我们应该匹配两个引号之间的内容，且忽略中间转义的引号。

这是任务的关键部分，否则这个任务就没什么意思了。

匹配字符串示例：
```js
.. *!*"test me"*/!* ..  
.. *!*"Say \"Hello\"!"*/!* ... (escaped quotes inside)
.. *!*"\\"*/!* ..  (double slash inside)
.. *!*"\\ \""*/!* ..  (double slash and an escaped quote inside)
```

在 JavaScript 中，双斜杠用于把斜杠转义为字符串，如下所示：

```js run
let str = ' .. "test me" .. "Say \\"Hello\\"!" .. "\\\\ \\"" .. ';

// the in-memory string
alert(str); //  .. "test me" .. "Say \"Hello\"!" .. "\\ \"" ..
```
