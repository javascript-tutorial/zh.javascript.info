importance: 4

---

<<<<<<< HEAD
# 哪个值才是 while？

对于每次循环，写出你认为会显示的值，然后与答案进行比较。

两次循环的 `alert` 值是否相同？
=======
# Which values does the while loop show?

For every loop iteration, write down which value it outputs and then compare it with the solution.

Both loops `alert` the same values, or not?
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

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
