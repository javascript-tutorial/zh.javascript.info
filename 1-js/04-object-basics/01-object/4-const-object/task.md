importance: 5

---

# 不可变对象

<<<<<<< HEAD
有可能改变 `const` 修饰的对象吗, 你怎么看呢？
=======
Is it possible to change an object declared with `const`? What do you think?
>>>>>>> 027933531e121650120f7e8385f691de99af12d2

```js
const user = {
  name: "John"
};

*!*
// 这样可以吗？
user.name = "Pete";
*/!*
```
