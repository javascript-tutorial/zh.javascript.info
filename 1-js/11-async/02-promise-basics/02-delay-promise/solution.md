```js run
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

delay(3000).then(() => alert('runs after 3 seconds'));
```

请注意，在此任务中 `resolve` 是不带参数调用的。我们不从 `delay` 中返回任何值，只是确保延迟即可。
