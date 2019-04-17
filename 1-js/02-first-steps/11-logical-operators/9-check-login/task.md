importance: 3

---

# 登陆验证

实现使用 `prompt` 进行登陆校验的代码。

如果访问者输入 `"Admin"`，那么使用 `prompt` 引导获取密码，如果输入的用户名为空或者按下了 `key:Esc` 键 — 显示 "Canceled"，如果是其他字符串 — 显示 "I don't know you"。

密码的校验规则如下：

- 如果输入的是 "TheMaster"，显示 "Welcome!"，
- 其他字符串 — 显示 "Wrong password"，
- 空字符串或取消了输入，显示 "Canceled."。

流程图：

![](ifelse_task.png)

请使用嵌套的 `if` 块。注意代码整体的可读性。

<<<<<<< HEAD:1-js/02-first-steps/10-ifelse/4-check-login/task.md
提示：将空字符串输入，prompt 会获取到一个空字符串 `''`。Prompt 运行过程中，按下 `key:ESC` 键会得到 `null`。
=======
Hint:  passing an empty input to a prompt returns an empty string `''`. Pressing `key:ESC` during a prompt returns `null`.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:1-js/02-first-steps/11-logical-operators/9-check-login/task.md

[示例]
