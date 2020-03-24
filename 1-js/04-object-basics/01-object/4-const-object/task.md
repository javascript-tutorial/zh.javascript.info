importance: 5

---

# 不可变对象

<<<<<<< HEAD
有可能改变用 `const` 声明的对象吗？你怎么看？
=======
Is it possible to change an object declared with `const`? What do you think?
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a

```js
const user = {
  name: "John"
};

*!*
// 这样有效吗？
user.name = "Pete";
*/!*
```
