请注意一些微妙的但是很重要的处理细节。我们没有在 `prompt` 输入后立即把 `value` 转换成数字，因为 `value = +value` 之后我们就不能辨认出哪些是空字符串（停止的信号）哪些是0（有效的数字），所以要放到后面再处理。

```js run demo
function sumInput() {
 
  let numbers = [];

  while (true) {

    let value = prompt("A number please?", 0);

    // 应该结束吗?
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

