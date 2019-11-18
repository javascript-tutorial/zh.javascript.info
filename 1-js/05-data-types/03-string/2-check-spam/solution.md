<<<<<<< HEAD
为了使搜索不区分大小写，我们将字符串改为小写，然后搜索：
=======
To make the search case-insensitive, let's bring the string to lower case and then search:
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

```js run demo
function checkSpam(str) {
  let lowerStr = str.toLowerCase();

  return lowerStr.includes('viagra') || lowerStr.includes('xxx');
}

alert( checkSpam('buy ViAgRA now') );
alert( checkSpam('free xxxxx') );
alert( checkSpam("innocent rabbit") );
```

