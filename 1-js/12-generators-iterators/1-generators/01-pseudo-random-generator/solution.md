```js run demo
function* pseudoRandom(seed) {
  let value = seed;

  while(true) {
    value = value * 16807 % 2147483647
    yield value;
  }

};

let generator = pseudoRandom(1);

alert(generator.next().value); // 16807
alert(generator.next().value); // 282475249
alert(generator.next().value); // 1622650073
```

<<<<<<< HEAD
请注意，上面的代码也可以用普通函数来实现，就像这样：
=======
Please note, the same can be done with a regular function, like this:
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

```js run
function pseudoRandom(seed) {
  let value = seed;

  return function() {
    value = value * 16807 % 2147483647;
    return value;
  }
}

let generator = pseudoRandom(1);

alert(generator()); // 16807
alert(generator()); // 282475249
alert(generator()); // 1622650073
```

<<<<<<< HEAD
这也能正常工作。但是这样我们就不能用 `for..of` 来迭代，也不能用 generator 组合了，这样的形式可能在其他地方很有用。
=======
That also works. But then we lose ability to iterate with `for..of` and to use generator composition, that may be useful elsewhere.
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054
