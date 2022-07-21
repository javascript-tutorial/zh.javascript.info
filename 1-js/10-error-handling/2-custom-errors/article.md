# 自定义 Error，扩展 Error

当我们在开发某些东西时，经常会需要我们自己的 error 类来反映在我们的任务中可能出错的特定任务。对于网络操作中的 error，我们需要 `HttpError`，对于数据库操作中的 error，我们需要 `DbError`，对于搜索操作中的 error，我们需要 `NotFoundError`，等等。

我们自定义的 error 应该支持基本的 error 的属性，例如 `message`，`name`，并且最好还有 `stack`。但是它们也可能会有其他属于它们自己的属性，例如，`HttpError` 对象可能会有一个 `statusCode` 属性，属性值可能为 `404`、`403` 或 `500` 等。

JavaScript 允许将 `throw` 与任何参数一起使用，所以从技术上讲，我们自定义的 error 不需要从 `Error` 中继承。但是，如果我们继承，那么就可以使用 `obj instanceof Error` 来识别 error 对象。因此，最好继承它。

随着开发的应用程序的增长，我们自己的 error 自然会形成形成一个层次结构（hierarchy）。例如，`HttpTimeoutError` 可能继承自 `HttpError`，等等。

## 扩展 Error

例如，让我们考虑一个函数 `readUser(json)`，该函数应该读取带有用户数据的 JSON。

这里是一个可用的 `json` 的例子：
```js
let json = `{ "name": "John", "age": 30 }`;
```

在函数内部，我们将使用 `JSON.parse`。如果它接收到格式不正确的 `json`，就会抛出 `SyntaxError`。但是，即使 `json` 在语法上是正确的，也不意味着该数据是有效的用户数据，对吧？因为它可能丢失了某些必要的数据。例如，对用户来说，必不可少的是 `name` 和 `age` 属性。

我们的函数 `readUser(json)` 不仅会读取 JSON，还会检查（“验证”）数据。如果没有所必须的字段，或者（字段的）格式错误，那么就会出现一个 error。并且这些并不是 `SyntaxError`，因为这些数据在语法上是正确的，这些是另一种错误。我们称之为 `ValidationError`，并为之创建一个类。这种类型的错误也应该包含有关违规字段的信息。

我们的 `ValidationError` 类应该继承自 `Error` 类。

`Error` 类是内建的，但这是其近似代码，所以我们可以了解我们要扩展的内容：

```js
// JavaScript 自身定义的内建的 Error 类的“伪代码”
class Error {
  constructor(message) {
    this.message = message;
    this.name = "Error"; // (不同的内建 error 类有不同的名字)
    this.stack = <call stack>; // 非标准的，但大多数环境都支持它
  }
}
```

现在让我们从其中继承 `ValidationError`，并尝试进行运行：

```js run untrusted
*!*
class ValidationError extends Error {
*/!*
  constructor(message) {
    super(message); // (1)
    this.name = "ValidationError"; // (2)
  }
}

function test() {
  throw new ValidationError("Whoops!");
}

try {
  test();
} catch(err) {
  alert(err.message); // Whoops!
  alert(err.name); // ValidationError
  alert(err.stack); // 一个嵌套调用的列表，每个调用都有对应的行号
}
```

请注意：在 `(1)` 行中我们调用了父类的 constructor。JavaScript 要求我们在子类的 constructor 中调用 `super`，所以这是必须的。父类的 constructor 设置了 `message` 属性。

父类的 constructor 还将 `name` 属性的值设置为了 `"Error"`，所以在 `(2)` 行中，我们将其重置为了右边的值。

让我们尝试在 `readUser(json)` 中使用它吧：

```js run
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

// 用法
function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new ValidationError("No field: age");
  }
  if (!user.name) {
    throw new ValidationError("No field: name");
  }

  return user;
}

// try..catch 的工作示例

try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
*!*
    alert("Invalid data: " + err.message); // Invalid data: No field: name
*/!*
  } else if (err instanceof SyntaxError) { // (*)
    alert("JSON Syntax Error: " + err.message);
  } else {
    throw err; // 未知的 error，再次抛出 (**)
  }
}
```

上面代码中的 `try..catch` 块既处理我们的 `ValidationError` 又处理来自 `JSON.parse` 的内建 `SyntaxError`。

请看一下我们是如何使用 `instanceof` 来检查 `(*)` 行中的特定错误类型的。

我们也可以看看 `err.name`，像这样：

```js
// ...
// instead of (err instanceof SyntaxError)
} else if (err.name == "SyntaxError") { // (*)
// ...
```

使用 `instanceof` 的版本要好得多，因为将来我们会对 `ValidationError` 进行扩展，创建它的子类型，例如 `PropertyRequiredError`。而 `instanceof` 检查对于新的继承类也适用。所以这是面向未来的做法。

还有一点很重要，在 `catch` 遇到了未知的错误，它会在 `(**)` 行将该错误再次抛出。`catch` 块只知道如何处理 validation 错误和语法错误，而其他错误（由代码中的拼写错误或其他未知原因导致的）应该被扔出（fall through）。

## 深入继承

`ValidationError` 类是非常通用的。很多东西都可能出错。对象的属性可能缺失或者属性可能有格式错误（例如 `age` 属性的值为一个字符串而不是数字）。让我们针对缺少属性的错误来制作一个更具体的 `PropertyRequiredError` 类。它将携带有关缺少的属性的相关信息。

```js run
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

*!*
class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("No property: " + property);
    this.name = "PropertyRequiredError";
    this.property = property;
  }
}
*/!*

// 用法
function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new PropertyRequiredError("age");
  }
  if (!user.name) {
    throw new PropertyRequiredError("name");
  }

  return user;
}

// try..catch 的工作示例

try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
*!*
    alert("Invalid data: " + err.message); // Invalid data: No property: name
    alert(err.name); // PropertyRequiredError
    alert(err.property); // name
*/!*
  } else if (err instanceof SyntaxError) {
    alert("JSON Syntax Error: " + err.message);
  } else {
    throw err; // 为止 error，将其再次抛出
  }
}
```

这个新的类 `PropertyRequiredError` 使用起来很简单：我们只需要传递属性名：`new PropertyRequiredError(property)`。人类可读的 `message` 是由 constructor 生成的。

请注意，在 `PropertyRequiredError` constructor 中的 `this.name` 是通过手动重新赋值的。这可能会变得有些乏味 —— 在每个自定义 error 类中都要进行 `this.name = <class name>` 赋值操作。我们可以通过创建自己的“基础错误（basic error）”类来避免这种情况，该类进行了 `this.name = this.constructor.name` 赋值。然后让所有我们自定义的 error 都从这个“基础错误”类进行继承。

让我们称之为 `MyError`。

这是带有 `MyError` 以及其他自定义的 error 类的代码，已进行简化：

```js run
class MyError extends Error {
  constructor(message) {
    super(message);
*!*
    this.name = this.constructor.name;
*/!*
  }
}

class ValidationError extends MyError { }

class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("No property: " + property);
    this.property = property;
  }
}

// name 是对的
alert( new PropertyRequiredError("field").name ); // PropertyRequiredError
```

现在自定义的 error 短了很多，特别是 `ValidationError`，因为我们摆脱了 constructor 中的 `"this.name = ..."` 这一行。

## 包装异常

在上面代码中的函数 `readUser` 的目的就是“读取用户数据”。在这个过程中可能会出现不同类型的 error。目前我们有了 `SyntaxError` 和 `ValidationError`，但是将来，函数 `readUser` 可能会不断壮大，并可能会产生其他类型的 error。

调用 `readUser` 的代码应该处理这些 error。现在它在 `catch` 块中使用了多个 `if` 语句来检查 error 类，处理已知的 error，并再次抛出未知的 error。

该方案是这样的：

```js
try {
  ...
  readUser()  // 潜在的 error 源
  ...
} catch (err) {
  if (err instanceof ValidationError) {
    // 处理 validation error
  } else if (err instanceof SyntaxError) {
    // 处理 syntax error
  } else {
    throw err; // 未知 error，再次抛出它
  }
}
```

在上面的代码中，我们可以看到两种类型的 error，但是可以有更多。

如果 `readUser` 函数会产生多种 error，那么我们应该问问自己：我们是否真的想每次都一一检查所有的 error 类型？

通常答案是 "No"：我们希望能够“比它高一个级别”。我们只想知道这里是否是“数据读取异常” —— 为什么发生了这样的 error 通常是无关紧要的（error 信息描述了它）。或者，如果我们有一种方式能够获取 error 的详细信息那就更好了，但前提是我们需要。

我们所描述的这项技术被称为“包装异常”。

1. 我们将创建一个新的类 `ReadError` 来表示一般的“数据读取” error。
2. 函数`readUser` 将捕获内部发生的数据读取 error，例如 `ValidationError` 和 `SyntaxError`，并生成一个 `ReadError` 来进行替代。
3. 对象 `ReadError` 会把对原始 error 的引用保存在其 `cause` 属性中。

之后，调用 `readUser` 的代码只需要检查 `ReadError`，而不必检查每种数据读取 error。并且，如果需要更多 error 细节，那么可以检查 `readUser` 的 `cause` 属性。

下面的代码定义了 `ReadError`，并在 `readUser` 和 `try..catch` 中演示了其用法：

```js run
class ReadError extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = 'ReadError';
  }
}

class ValidationError extends Error { /*...*/ }
class PropertyRequiredError extends ValidationError { /* ... */ }

function validateUser(user) {
  if (!user.age) {
    throw new PropertyRequiredError("age");
  }

  if (!user.name) {
    throw new PropertyRequiredError("name");
  }
}

function readUser(json) {
  let user;

  try {
    user = JSON.parse(json);
  } catch (err) {
*!*
    if (err instanceof SyntaxError) {
      throw new ReadError("Syntax Error", err);
    } else {
      throw err;
    }
*/!*
  }

  try {
    validateUser(user);
  } catch (err) {
*!*
    if (err instanceof ValidationError) {
      throw new ReadError("Validation Error", err);
    } else {
      throw err;
    }
*/!*
  }

}

try {
  readUser('{bad json}');
} catch (e) {
  if (e instanceof ReadError) {
*!*
    alert(e);
    // Original error: SyntaxError: Unexpected token b in JSON at position 1
    alert("Original error: " + e.cause);
*/!*
  } else {
    throw e;
  }
}
```

在上面的代码中，`readUser` 正如所描述的那样正常工作 —— 捕获语法和验证（validation）错误，并抛出 `ReadError`（对于未知错误将照常再次抛出）。

所以外部代码检查 `instanceof ReadError`，并且它的确是。不必列出所有可能的 error 类型。

这种方法被称为“包装异常（wrapping exceptions）”，因为我们将“低级别”的异常“包装”到了更抽象的 `ReadError` 中。它被广泛应用于面向对象的编程中。

## 总结

- 我们可以正常地从 `Error` 和其他内建的 error 类中进行继承，。我们只需要注意 `name` 属性以及不要忘了调用 `super`。
- 我们可以使用 `instanceof` 来检查特定的 error。但有时我们有来自第三方库的 error 对象，并且在这儿没有简单的方法来获取它的类。那么可以将 `name` 属性用于这一类的检查。
- 包装异常是一项广泛应用的技术：用于处理低级别异常并创建高级别 error 而不是各种低级别 error 的函数。在上面的示例中，低级别异常有时会成为该对象的属性，例如 `err.cause`，但这不是严格要求的。
