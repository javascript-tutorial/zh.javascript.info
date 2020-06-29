
```js run
let array = [1, 2, 3];

array = new Proxy(array, {
  get(target, prop, receiver) {
    if (prop < 0) {
<<<<<<< HEAD
      // 即使我们像 arr[1] 这样访问它
      // prop 是一个字符串，所以我们需要将其转换成数字
=======
      // even if we access it like arr[1]
      // prop is a string, so need to convert it to number
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8
      prop = +prop + target.length;
    }
    return Reflect.get(target, prop, receiver);
  }
});


alert(array[-1]); // 3
alert(array[-2]); // 2
```
