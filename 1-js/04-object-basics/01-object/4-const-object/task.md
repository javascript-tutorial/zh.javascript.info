importance: 5

---

# 不可变对象

<<<<<<< HEAD
有可能改变 `const` 修饰的对象吗, 你怎么看呢？
=======
Is it possible to change an object declared with `const`? What do you think?
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

```js
const user = {
  name: "John"
};

*!*
// 这样可以吗？
user.name = "Pete";
*/!*
```
