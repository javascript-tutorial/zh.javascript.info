<<<<<<< HEAD
只需要遍历这个对象，如果对象存在任何属性则 `return false`。

```js
function isEmpty(obj) {
  for (let key in obj) {
    // 如果进到循环里面，说明有属性。
    return false;
  }
  return true;
}
```
=======
Just loop over the object and `return false` immediately if there's at least one property.
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
