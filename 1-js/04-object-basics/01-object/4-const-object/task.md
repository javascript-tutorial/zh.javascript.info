importance: 5

---

# 不可变对象

<<<<<<< HEAD
有可能改变 `const` 修饰的对象吗, 你怎么看呢？
=======
Is it possible to change an object declared with `const`? What do you think?
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac

```js
const user = {
  name: "John"
};

*!*
// 这样可以吗？
user.name = "Pete";
*/!*
```
