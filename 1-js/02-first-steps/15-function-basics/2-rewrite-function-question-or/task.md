importance: 4

---

# 使用 '?' 或者 '||' 重写函数

如果参数 `age` 大于 `18`，那么下面的函数返回 `true`。

否则它将会要求进行确认，并返回确认结果：

```js
function checkAge(age) {
  if (age > 18) {
    return true;
  } else {
    return confirm('Do you have your parents permission to access this page?');
  }
}
```

重写这个函数并保证效果相同，不使用 `if`，且只需一行代码。

编写 `checkAge` 的两个变体：

1. 使用问号运算符 `?`
2. 使用或运算符 `||`
