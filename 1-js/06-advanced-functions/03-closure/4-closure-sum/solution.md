<<<<<<< HEAD
为了使第二个括号有效，第一个（括号）必须返回一个函数。
=======
For the second parentheses to work, the first ones must return a function.
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

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

