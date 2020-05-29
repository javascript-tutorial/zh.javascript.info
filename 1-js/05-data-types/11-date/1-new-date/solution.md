<<<<<<< HEAD
`new Date` 构造函数默认使用本地时区。所以唯一需要牢记的就是月份从 0 开始计数。

所以二月对应的数值是 1。
=======
The `new Date` constructor uses the local time zone. So the only important thing to remember is that months start from zero.

So February has number 1.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js run
let d = new Date(2012, 1, 20, 3, 12);
alert( d );
```
