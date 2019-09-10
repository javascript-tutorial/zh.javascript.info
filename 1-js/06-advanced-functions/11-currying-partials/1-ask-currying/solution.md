

1. 使用封装函数，箭头函数很简洁

    ```js 
    askPassword(() => user.login(true), () => user.login(false)); 
    ```

    现在它从外部变量中获得 `user`，正常运行。

2. 从 `user.login` 中创建偏函数，使用 `user` 作为上下文，并确定第一个参数：


    ```js 
    askPassword(user.login.bind(user, true), user.login.bind(user, false)); 
    ```
