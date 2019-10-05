importance: 4

---

# 大写的常量？

检查下面的代码：

```js
const birthday = '18.04.1982';

const age = someCode(birthday);
```

这里我们有一个 `birthday` 日期常量和通过一些代码（为了保持简短这里没有提供，因为这些细节在这无关紧要）从 `birthday` 计算出的 `age` 常量。

对于 `birthday` 使用大写方式正确吗？那么 `age` 呢？或者两者都用？

```js
const BIRTHDAY = '18.04.1982'; // 使用大写？

const AGE = someCode(BIRTHDAY); // 使用大写？
```
