importance: 5

---

# 一个关于 "if" 的问题

下面哪一个 `alert` 将会被执行？

<<<<<<< HEAD
`if(...)` 语句内表达式的结果是什么？
=======
What will the results of the expressions be inside `if(...)`?
>>>>>>> 027933531e121650120f7e8385f691de99af12d2

```js
if (-1 || 0) alert( 'first' );
if (-1 && 0) alert( 'second' );
if (null || -1 && 1) alert( 'third' );
```

