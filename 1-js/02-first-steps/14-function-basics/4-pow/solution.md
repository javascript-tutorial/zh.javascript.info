
```js run demo
function pow(x, n) {
  let result = x;

  for (let i = 1; i < n; i++) {
    result *= x;
  }

  return result;
}

let x = prompt("x?", '');
let n = prompt("n?", '');

if (n < 1) {
<<<<<<< HEAD
  alert(`Power ${n} is not supported,
    use an integer greater than 0`);
=======
  alert(`Power ${n} is not supported, use a positive integer`);
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a
} else {
  alert( pow(x, n) );
}
```
