importance: 4

---

# 哪个值才是 while？

对于每次循环，写出你认为会显示的值，然后与答案进行比较。

两次循环的 `alert` 值是否相同？

1. 前缀形式 `++i`:

    ```js
    let i = 0;
    while (++i < 5) alert( i );
    ```
2. 后缀形式 `i++`

    ```js
    let i = 0;
    while (i++ < 5) alert( i );
    ```
