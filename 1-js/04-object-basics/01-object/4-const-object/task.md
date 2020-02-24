importance: 5

---

# 不可变对象

<<<<<<< HEAD
有可能改变用 `const` 声明的对象吗？你怎么看？
=======
Is it possible to change an object declared with `const`? What do you think?
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

```js
const user = {
  name: "John"
};

*!*
// 这样有效吗？
user.name = "Pete";
*/!*
```
