答案是：`1` 。

```js run
let i = 3;

while (i) {
  alert( i-- );
}
```

每次循环迭代都将 `i` 减  `1`。当 `i=0` 时，检查 `while(i)` 停止循环。

因此，循环的步骤形成以下序列（“循环展开”）：

```js
let i = 3;

alert(i--); // shows 3, decreases i to 2

alert(i--) // shows 2, decreases i to 1

alert(i--) // shows 1, decreases i to 0

// done, while(i) check stops the loop
```
