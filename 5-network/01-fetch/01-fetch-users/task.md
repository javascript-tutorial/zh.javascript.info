# 从 GitHub fetch 用户信息

创建一个异步函数 `getUsers(names)`，该函数接受 GitHub 登录名数组作为输入，查询 GitHub 以获取有关这些用户的信息，并返回 GitHub 用户数组。

带有给定 `USERNAME` 的用户信息的 GitHub 网址是：`https://api.github.com/users/USERNAME`。

沙箱中有一个测试用例。

重要的细节：

1. 对每一个用户都应该有一个 `fetch` 请求。
2. 请求不应该相互等待。以便能够尽快获取到数据。
3. 如果任何一个请求失败了，或者没有这个用户，则函数应该返回 `null` 到结果数组中。
