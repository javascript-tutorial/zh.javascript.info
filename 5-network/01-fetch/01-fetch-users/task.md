# 从 GitHub fetch 用户信息

创建能从一组 GitHub 用户数组获取一组数据的异步函数 `getUsers(names)`，从 GitHub 获取用户信息并返回一组 GitHub 用户信息的数组。

给定 `USERNAME` 的用户信息的 GitHub 网址是：`https://api.github.com/users/USERNAME`。

Sandbox 里有一个测试范例。

总要细节：

1. 每一个用户都应该有一个 `fetch` 请求，并且请求是独立的不用彼此等待。因此数据能尽快获取到。
2. 如果任意一个请求失败了，或者没有这个用户，函数应该返回 `null` 到最终结果数组中。
