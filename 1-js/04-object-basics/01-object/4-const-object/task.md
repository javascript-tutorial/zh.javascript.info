importance: 5

---

# 不可变对象

<<<<<<< HEAD
有可能改变用 `const` 声明的对象吗？你怎么看？
=======
Is it possible to change an object declared with `const`? What do you think?
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a

```js
const user = {
  name: "John"
};

*!*
// 这样有效吗？
user.name = "Pete";
*/!*
```
