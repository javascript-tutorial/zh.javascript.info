1. 使用包装（wapper）函数，箭头函数很简洁：

   ```js
   askPassword(
     () => user.login(true),
     () => user.login(false)
   );
   ```

   现在它从外部变量中获得了 `user`，然后以常规方式运行它。

2. 或者从 `user.login` 创建一个部分应用函数，该函数使用 `user` 作为上下文，并具有正确的第一个参数：

   ```js
   askPassword(user.login.bind(user, true), user.login.bind(user, false));
   ```
