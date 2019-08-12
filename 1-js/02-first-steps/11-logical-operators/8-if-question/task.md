importance: 5

---

# 一个关于 "if" 的问题

下面哪一个 `alert` 将会被执行？

<<<<<<< HEAD
`if(...)` 语句内表达式的结果是什么？
=======
What will the results of the expressions be inside `if(...)`?
>>>>>>> 5cb9760abb8499bf1e99042d866c3c1db8cd61ca

```js
if (-1 || 0) alert( 'first' );
if (-1 && 0) alert( 'second' );
if (null || -1 && 1) alert( 'third' );
```

