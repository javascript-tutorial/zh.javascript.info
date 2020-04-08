最大长度必须是 `maxlength`，因此为了给省略号留空间我们需要缩短它。

请注意，省略号实际上有一个单独的 unicode 字符，而不是三个点。

```js run demo
function truncate(str, maxlength) {
  return (str.length > maxlength) ?
    str.slice(0, maxlength - 1) + '…' : str;
}
```
