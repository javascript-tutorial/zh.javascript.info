importance: 5

---

# 不可变对象

有可能改变用 `const` 声明的对象吗？你怎么看？

```js
const user = {
  name: "John"
};

*!*
// 这样有效吗？
user.name = "Pete";
*/!*
```
