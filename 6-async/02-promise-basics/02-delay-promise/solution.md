```js run
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

delay(3000).then(() => alert('runs after 3 seconds'));
```

请注意，在此任务中 `resolve` 是无参调用。我们不应该从 `delay` 中返回任何值。只要确保会延迟即可。
