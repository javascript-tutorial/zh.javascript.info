importance: 4

---

# 使用 '?' 或者 '||' 重写函数

如果参数 `age` 大于是 `18`，则以下函数返回 `true`。

否则，它将请求确认并返回其结果。

```js
function checkAge(age) {
  if (age > 18) {
    return true;
  } else {
    return confirm('Do you have your parents permission to access this page?');
  }
}
```

重写它，以便在一行中执行相同的操作，但不使用 `if`。

制作 `checkAge` 的两个变体：

1. 使用 `?` 运算符标记一个问题
2. 使用 OR `||`
