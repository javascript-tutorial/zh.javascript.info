<<<<<<< HEAD:1-js/06-advanced-functions/03-closure/4-closure-sum/solution.md
为了使第二个括号有效，第一个（括号）必须返回一个函数。
=======
For the second parentheses to work, the first ones must return a function.
>>>>>>> 9acc1302a14a3bbabbc9bf95d04581094bd0f1a8:1-js/06-advanced-functions/03-closure/6-closure-sum/solution.md

就像这样：

```js run
function sum(a) {

  return function(b) {
    return a + b; // 从外部词法环境获得 "a"
  };

}

alert( sum(1)(2) ); // 3
alert( sum(5)(-1) ); // 4
```

