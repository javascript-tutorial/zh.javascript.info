
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
  alert(`Степень ${n} не поддерживается, только целая, большая 0`);
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74
} else {
  alert( pow(x, n) );
}
```
