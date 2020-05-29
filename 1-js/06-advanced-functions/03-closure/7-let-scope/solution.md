<<<<<<< HEAD
答案：**error**。

你运行一下试试：
=======
The result is: **error**.

Try running it:
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js run
let x = 1;

function func() {
*!*
  console.log(x); // ReferenceError: Cannot access 'x' before initialization
*/!*
  let x = 2;
}

func();
```

<<<<<<< HEAD
在这个例子中，我们可以观察到“不存在”的变量和“未初始化”的变量之间的特殊差异。

你可能已经在 [](info:closure) 中学过了，从程序执行进入代码块（或函数）的那一刻起，变量就开始进入“未初始化”状态。它一直保持未初始化状态，直至程序执行到相应的 `let` 语句。

换句话说，一个变量从技术的角度来讲是存在的，但是在 `let` 之前还不能使用。

下面的这段代码证实了这一点。
=======
In this example we can observe the peculiar difference between a "non-existing" and "unitialized" variable.

As you may have read in the article [](info:closure), a variable starts in the "uninitialized" state from the moment when the execution enters a code block (or a function). And it stays uninitalized until the corresponding `let` statement.

In other words, a variable technically exists, but can't be used before `let`.

The code above demonstrates it.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

```js
function func() {
*!*
<<<<<<< HEAD
  // 引擎从函数开始就知道局部变量 x，
  // 但是变量 x 一直处于“未初始化”（无法使用）的状态，直到结束 let（“死区”）
  // 因此答案是 error
=======
  // the local variable x is known to the engine from the beginning of the function,
  // but "unitialized" (unusable) until let ("dead zone")
  // hence the error
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
*/!*

  console.log(x); // ReferenceError: Cannot access 'x' before initialization

  let x = 2;
}
```

<<<<<<< HEAD
变量暂时无法使用的区域（从代码块的开始到 `let`）有时被称为“死区”。
=======
This zone of temporary unusability of a variable (from the beginning of the code block till `let`) is sometimes called the "dead zone".
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
