<<<<<<< HEAD
# 从 GitHub fetch 用户信息

创建一个异步函数 `getUsers(names)`，该函数接受 GitHub 登录名数组作为输入，查询 GitHub 以获取有关这些用户的信息，并返回 GitHub 用户数组。

带有给定 `USERNAME` 的用户信息的 GitHub 网址是：`https://api.github.com/users/USERNAME`。

沙箱中有一个测试用例。

重要的细节：

1. 对每一个用户都应该有一个 `fetch` 请求。
2. 请求不应该相互等待。以便能够尽快获取到数据。
3. 如果任何一个请求失败了，或者没有这个用户，则函数应该返回 `null` 到结果数组中。
=======
# Fetch users from GitHub

Create an async function `getUsers(names)`, that gets an array of GitHub logins, fetches the users from GitHub and returns an array of GitHub users.

The GitHub url with user information for the given `USERNAME` is: `https://api.github.com/users/USERNAME`.

There's a test example in the sandbox.

Important details:

1. There should be one `fetch` request per user.
2. Requests shouldn't wait for each other. So that the data arrives as soon as possible.
3. If any request fails, or if there's no such user, the function should return `null` in the resulting array.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
