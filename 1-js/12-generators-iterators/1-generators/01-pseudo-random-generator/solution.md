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

Please note, the same can be done with a regular function, like this:

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
That's fine for this context. But then we loose ability to iterate with `for..of` and to use generator composition, that may be useful elsewhere.
=======
That also works. But then we loose ability to iterate with `for..of` and to use generator composition, that may be useful elsewhere.
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74
