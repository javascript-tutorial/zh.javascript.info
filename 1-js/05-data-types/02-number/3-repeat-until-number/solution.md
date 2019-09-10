
```js run demo
function readNumber() {
  let num;

  do {
    num = prompt("Enter a number please?", 0);
  } while ( !isFinite(num) );

  if (num === null || num === '') return null;
  
  return +num;
}

alert(`Read: ${readNumber()}`);
```

该解决方案有点复杂，可能是因为我们需要处理 null/空行。

所以我们实际上接受输入，直到它成为“常规数字”。null（取消）和空行都适合该条件，因为在数字形式中它们是 `0`。

在我们停止之后，我们需要专门处理 null 和空行（返回 null），因为将它们转换为数字将返回 `0`。
