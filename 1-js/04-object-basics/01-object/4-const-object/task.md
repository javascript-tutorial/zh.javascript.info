importance: 5

---

# 不可变对象

有可能改变`const`修饰的对象吗, 你怎么看呢？

```js
const user = {
  name: "John"
};

*!*
// 这样可以吗？
user.name = "Pete";
*/!*
```
