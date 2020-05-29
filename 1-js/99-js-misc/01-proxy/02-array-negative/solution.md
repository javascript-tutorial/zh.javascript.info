
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
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
      prop = +prop + target.length;
    }
    return Reflect.get(target, prop, receiver);
  }
});


alert(array[-1]); // 3
alert(array[-2]); // 2
```
