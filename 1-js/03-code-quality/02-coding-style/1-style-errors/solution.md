
你可以注意到以下几点：

```js no-beautify
<<<<<<< HEAD
function pow(x,n)  // <- 参数之间没有空格
{  // <- 大括号单独一行
  let result=1;   // <- = 号两边没有空格
  for(let i=0;i<n;i++) {result*=x;}   // <- 没有空格
  // { ... } 里面的内容应该在一个新行上
  return result;
}

let x=prompt("x?",''), n=prompt("n?",'') // <-- 从技术角度来看是可以的，
// 但是拆分成 2 行会更好，并且也没有空格和 ;
if (n<0)  // <- (n < 0) 里面没有空格，并且应该在前面加一个空行
{   // <- 大括号单独一行
  // 下面的一行太长了，或许拆分成 2 行更好
=======
function pow(x,n)  // <- no space between arguments
{  // <- figure bracket on a separate line
  let result=1;   // <- no spaces before or after =
  for(let i=0;i<n;i++) {result*=x;}   // <- no spaces
  // the contents of { ... } should be on a new line
  return result;
}

let x=prompt("x?",''), n=prompt("n?",'') // <-- technically possible,
// but better make it 2 lines, also there's no spaces and missing ;
if (n<0)  // <- no spaces inside (n < 0), and should be extra line above it
{   // <- figure bracket on a separate line
  // below - long lines can be split into multiple lines for improved readability
>>>>>>> 027933531e121650120f7e8385f691de99af12d2
  alert(`Power ${n} is not supported, please enter an integer number greater than zero`);
}
else // <- 可以像 "} else {" 这样写在一行上
{
<<<<<<< HEAD
  alert(pow(x,n))  // 没有空格和 ;
=======
  alert(pow(x,n))  // no spaces and missing ;
>>>>>>> 027933531e121650120f7e8385f691de99af12d2
}
```

修复的版本：

```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

let x = prompt("x?", "");
let n = prompt("n?", "");

if (n < 0) {
  alert(`Power ${n} is not supported,
    please enter an integer number greater than zero`);
} else {
  alert( pow(x, n) );
}
```
