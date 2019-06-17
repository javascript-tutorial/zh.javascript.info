是的，这是可以的。

如果一个函数返回一个对象，那么 `new` 返回那个对象而不是 `this`。

<<<<<<< HEAD
所以他们可以，例如，返回相同的外部定义的对象 `obj`：
=======
So they can, for instance, return the same externally defined object `obj`:
>>>>>>> 027933531e121650120f7e8385f691de99af12d2

```js run no-beautify
let obj = {};

function A() { return obj; }
function B() { return obj; }

alert( new A() == new B() ); // true
```
