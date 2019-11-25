<<<<<<< HEAD
遍历一个对象，如果对象存在任何属性则 `return false`。

```js
function isEmpty(obj) {
  for (let key in obj) {
    return false;
  }
  return true;
}
```
=======
Just loop over the object and `return false` immediately if there's at least one property.
>>>>>>> 79417c6e73645d37f184f0cc7e4bc3353e85224f
