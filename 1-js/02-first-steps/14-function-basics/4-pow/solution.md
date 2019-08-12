
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
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca
} else {
  alert( pow(x, n) );
}
```
