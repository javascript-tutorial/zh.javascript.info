importance: 5

---

# 不可变对象

<<<<<<< HEAD
有可能改变用 `const` 声明的对象吗？你怎么看？
=======
Is it possible to change an object declared with `const`? What do you think?
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874

```js
const user = {
  name: "John"
};

*!*
// 这样有效吗？
user.name = "Pete";
*/!*
```
