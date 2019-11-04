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
>>>>>>> ec21af8aef6930388c06ee4cd8f8f6769f9d305b
