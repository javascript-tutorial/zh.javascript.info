importance: 4

---

# 是否需要 “else”？

如果参数 `age` 大于 `18`，那么以下函数将返回 `true`。

否则它会要求确认并返回结果：

```js
function checkAge(age) {
  if (age > 18) {
    return true;
*!*
  } else {
    // ...
    return confirm('Did parents allow you?');
  }
*/!*
}
```

如果 `else` 被删除，函数的工作方式会不同吗？

```js
function checkAge(age) {
  if (age > 18) {
    return true;
  }
*!*
  // ...
  return confirm('Did parents allow you?');
*/!*
}
```

这两个变体的行为是否有区别？
