请注意这个解决方案的细微但是很重要的细节。我们没有在 `prompt` 后立即把 `value` 转换成数字，因为在执行 `value = +value` 之后，就没办法区分出空字符串（中断标志）和数字 0（合法输入）了，所以要放到后面再处理。

```js run demo
function sumInput() {
 
  let numbers = [];

  while (true) {

    let value = prompt("A number please?", 0);

    // 应该结束了吗？
    if (value === "" || value === null || !isFinite(value)) break;

    numbers.push(+value);
  }

  let sum = 0;
  for (let number of numbers) {
    sum += number;
  }
  return sum;
}

alert( sumInput() ); 
```

