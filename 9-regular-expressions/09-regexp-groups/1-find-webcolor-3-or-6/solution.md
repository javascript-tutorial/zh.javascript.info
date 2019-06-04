查找三位颜色 `#abc` 的正则表达式为：`pattern:/#[a-f0-9]{3}/i`。

我们可以添加额外三位 16 进制数，不多也不少。这三位可能有，也可能没有。

最简单的方式 —— 直接附加上去：`pattern:/#[a-f0-9]{3}([a-f0-9]{3})?/i`。

但是，还有一种更讨巧的方法：`pattern:/#([a-f0-9]{3}){1,2}/i`。

<<<<<<< HEAD:5-regular-expressions/09-regexp-groups/1-find-webcolor-3-or-6/solution.md
这里我们把正则 `pattern:[a-f0-9]{3}` 放置在括号内，并且应用量词 `pattern:{1,2}`。
=======
Here the regexp `pattern:[a-f0-9]{3}` is in parentheses to apply the quantifier `pattern:{1,2}` to it as a whole.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb:9-regular-expressions/09-regexp-groups/1-find-webcolor-3-or-6/solution.md

实际操作：

```js run
let reg = /#([a-f0-9]{3}){1,2}/gi;

let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert( str.match(reg) ); // #3f3 #AA00ef #abc
```

<<<<<<< HEAD:5-regular-expressions/09-regexp-groups/1-find-webcolor-3-or-6/solution.md
不过这里有个小问题：这个模式会在 `subject:#abcd` 中找到 `match:#abc`。为了避免这种情况，我们可以在最后加上 `pattern:\b`：
=======
There's a minor problem here: the pattern found `match:#abc` in `subject:#abcd`. To prevent that we can add `pattern:\b` to the end:
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb:9-regular-expressions/09-regexp-groups/1-find-webcolor-3-or-6/solution.md

```js run
let reg = /#([a-f0-9]{3}){1,2}\b/gi;

let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert( str.match(reg) ); // #3f3 #AA00ef
```
