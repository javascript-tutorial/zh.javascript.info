<<<<<<< HEAD
# 开发者控制台

代码是很容易出现错误的。你也很可能犯错误...... 哦，我在说什么？只要你是人，你一定会犯错误（在写代码的时候），除非你是[机器人](https://en.wikipedia.org/wiki/Bender_(Futurama))。

但在浏览器中，默认情况下用户是看不到错误的。所以，如果脚本中有错误，我们看不到是什么错误，更不能够修复它。

为了发现错误并获得一些与脚本相关且有用的信息，浏览器内置了“开发者工具”。

通常，开发者倾向于使用 Chrome 或 Firefox 进行开发，因为它们有最好的开发者工具。一些其他的浏览器也提供开发者工具，有时还具有一些特殊的功能，通常它们都是在追赶 Chrome 或 Firefox。所以大多数人都有“最喜欢”的浏览器，当遇到某个浏览器独有的问题的时候，人们就会切换到其他的浏览器。

开发者工具很强大，功能丰富。首先，我们将学习如何打开它们，查找错误和运行 JavaScript 命令。

## Google Chrome

打开网页 [bug.html](bug.html)。

在 JavaScript 代码中有一个错误。一般的访问者看不到这个错误，所以让我们打开开发者工具看看吧。

按下 `key:F12` 键，如果你使用 Mac，试试 `key:Cmd+Opt+J`。

开发者工具会被打开，Console 标签页是默认的标签页。

就像这样：

![chrome](chrome.png)

具体什么样，要看你的 Chrome 版本。它随着时间一直在变，但是都很类似。

- 在这我们能看到红色的错误提示信息。这个场景中，脚本里有一个未知的 “lalala” 命令。
- 在右边，有个可点击的链接 `bug.html:12`。这个链接会链接到错误发生的行号。

在错误信息的下方，有个 `>` 标志。它代表“命令行”，在“命令行”中，我们可以输入 JavaScript 命令，按下 `key:Enter` 来执行。

现在，我们能看到错误就够了。稍后，在 <info:debugging-chrome> 章节中，我们会重新更加深入地讨论开发者工具。

```smart header="多行输入"
通常，当我们向控制台输入一行代码后，按 `key:Enter`，这行代码就会立即执行。

如果想要插入多行代码，请按 `key:Shift+Enter` 来进行换行。这样就可以输入长片段的 JavaScript 代码了。
```

## Firefox、Edge 和其他浏览器

大多数其他的浏览器都是通过 `key:F12` 来打开开发者工具。

他们的外观和感觉都非常相似，一旦你学会了他们中的一个（可以先尝试 Chrome），其他的也就很快了。

## Safari

Safari（Mac 系统中的浏览器，Windows 和 Linux 系统不支持）有一点点不同。我们需要先开启“开发菜单”。

打开“偏好设置”，选择“高级”选项。选中最下方的那个选择框。

![safari](safari.png)

现在，我们通过 `key:Cmd+Opt+C` 就能打开或关闭控制台了。另外注意，有一个名字为“开发”的顶部菜单出现了。它有很多命令和选项。

## 总结

* 开发者工具允许我们查看错误、执行命令、检查变量等等。
* 在 Windows 系统中，可以通过 `key:F12` 开启开发者工具。Mac 系统下，Chrome 需要使用 `key:Cmd+Opt+J`，Safari 使用 `key:Cmd+Opt+C`（需要提前开启）。

现在我们的环境准备好了。下一章，我们将正式开始学习 JavaScript。
=======
# Developer console

Code is prone to errors. You will quite likely make errors... Oh, what am I talking about? You are *absolutely* going to make errors, at least if you're a human, not a [robot](https://en.wikipedia.org/wiki/Bender_(Futurama)).

But in the browser, users don't see errors by default. So, if something goes wrong in the script, we won't see what's broken and can't fix it.

To see errors and get a lot of other useful information about scripts, "developer tools" have been embedded in browsers.

Most developers lean towards Chrome or Firefox for development because those browsers have the best developer tools. Other browsers also provide developer tools, sometimes with special features, but are usually playing "catch-up" to Chrome or Firefox. So most developers have a "favorite" browser and switch to others if a problem is browser-specific.

Developer tools are potent; they have many features. To start, we'll learn how to open them, look at errors, and run JavaScript commands.

## Google Chrome

Open the page [bug.html](bug.html).

There's an error in the JavaScript code on it. It's hidden from a regular visitor's eyes, so let's open developer tools to see it.

Press `key:F12` or, if you're on Mac, then `key:Cmd+Opt+J`.

The developer tools will open on the Console tab by default.

It looks somewhat like this:

![chrome](chrome.png)

The exact look of developer tools depends on your version of Chrome. It changes from time to time but should be similar.

- Here we can see the red-colored error message. In this case, the script contains an unknown "lalala" command.
- On the right, there is a clickable link to the source `bug.html:12` with the line number where the error has occurred.

Below the error message, there is a blue `>` symbol. It marks a "command line" where we can type JavaScript commands. Press `key:Enter` to run them.

Now we can see errors, and that's enough for a start. We'll come back to developer tools later and cover debugging more in-depth in the chapter <info:debugging-chrome>.

```smart header="Multi-line input"
Usually, when we put a line of code into the console, and then press `key:Enter`, it executes.

To insert multiple lines, press `key:Shift+Enter`. This way one can enter long fragments of JavaScript code.
```

## Firefox, Edge, and others

Most other browsers use `key:F12` to open developer tools.

The look & feel of them is quite similar. Once you know how to use one of these tools (you can start with Chrome), you can easily switch to another.

## Safari

Safari (Mac browser, not supported by Windows/Linux) is a little bit special here. We need to enable the "Develop menu" first.

Open Preferences and go to the "Advanced" pane. There's a checkbox at the bottom:

![safari](safari.png)

Now `key:Cmd+Opt+C` can toggle the console. Also, note that the new top menu item named "Develop" has appeared. It has many commands and options.

## Summary

- Developer tools allow us to see errors, run commands, examine variables, and much more.
- They can be opened with `key:F12` for most browsers on Windows. Chrome for Mac needs `key:Cmd+Opt+J`, Safari: `key:Cmd+Opt+C` (need to enable first).

Now we have the environment ready. In the next section, we'll get down to JavaScript.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
