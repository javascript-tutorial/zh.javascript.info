最大长度必须是 `maxlength`，因此为了给省略号留空间我们需要缩短它。

注意省略号实际上有一个 unicode 字符，而不仅仅是三个点。

```js run
function truncate(str, maxlength) {
  return (str.length > maxlength) ? 
    str.slice(0, maxlength - 1) + '…' : str;
}
```

