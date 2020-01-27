<<<<<<< HEAD
`new Date` 构造函数默认使用当地时区。所以唯一需要牢记的是月份从 0 开始计数。

所以二月对应的数值是 1。
=======
The `new Date` constructor uses the local time zone. So the only important thing to remember is that months start from zero.

So February has number 1.
>>>>>>> ff042a03191dfad1268219ae78758193a5803b38

```js run
let d = new Date(2012, 1, 20, 3, 12);
alert( d );
```
