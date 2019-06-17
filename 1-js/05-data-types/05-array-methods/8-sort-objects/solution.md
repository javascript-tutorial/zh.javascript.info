```js run no-beautify
function sortByAge(arr) {
  arr.sort((a, b) => a.age > b.age ? 1 : -1);
}

let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let arr = [ pete, john, mary ];

sortByAge(arr);

<<<<<<< HEAD
// 现在排序是：[john, mary, pete]
=======
// now sorted is: [john, mary, pete]
alert(arr[0].name); // John
>>>>>>> 027933531e121650120f7e8385f691de99af12d2
alert(arr[1].name); // Mary
alert(arr[2].name); // Pete
```
