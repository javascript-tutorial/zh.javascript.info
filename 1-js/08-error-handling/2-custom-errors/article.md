# 自定义以及继承错误

当我们在进行开发的时候，通常需要属于我们自己的错误类来反映任务中可能出现的特殊情况。对于网络操作错误，我们需要 `HttpError`，对于数据库操作错误，我们需要 `DbError`，对于搜索操作错误，我们需要 `NotFoundError`，等等。

我们自定义的错误应该具有基本的错误属性，例如 `message`，`name` 以及更加详细的 `stack`。但是它们也会有属于自己的属性。举个例子，`HttpError`对象会有一个 `statusCode` 属性，取值可能为 `404`、`403` 或 `500` 等。

JavaScript 允许我们在使用 `throw` 时带任何参数，所以从技术层面上说，我们自定义的错误不需要继承 `Error` 类，但如果我们继承了这个类，就能使用 `obj instanceof Error` 来鉴别错误对象，所以我们最好继承它。

在我们进行开发时，我们自己的异常类通常是有层次结构的，例如 `HttpTimeoutError` 可能继承自 `HttpError` 等。

## 可扩展错误

让我们用一个能够读取用户数据的函数 `readUser(json)` 来作为例子。

这里是一个可用的 `json` 的例子：
```js
let json = `{ "name": "John", "age": 30 }`;
```

在这里面，我们使用 `JSON.parse`。如果它接收到错误的 `json`，就会抛出 `SyntaxError`。

但即使是格式正确的 `json`，也并不表示它就是可用的，对吧？它有可能会遗漏一些必要的数据。例如，缺失了对用户有必要的 `name` 和 `age` 属性。

函数 `readUser(json)` 不仅会读取 JSON，也会检查（验证）数据。如果没有所需要的属性，或者格式不正确，就会发生错误。而这不是 `SyntaxError`，因为数据在语法上时正确的，但是有其他的错误。我们称之为 `ValidationError` 并且为之创建一个类。这种类型的错误也应该承载缺少的字段的信息。

我们的 `ValidationError` 类应该继承自内置的 `Error` 类。

 `Error` 类是内置的，但是我们需要看一下大致的代码，来理解我们需要扩展什么。

代码如下：

```js
// The "pseudocode" for the built-in Error class defined by JavaScript itself
class Error {
  constructor(message) {
    this.message = message;
    this.name = "Error"; // (different names for different built-in error classes)
    this.stack = <nested calls>; // non-standard, but most environments support it
  }
}
```

现在让我们开始用 `ValidationError` 来进行继承：

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
  alert(err.stack); // a list of nested calls with line numbers for each
}
```

来看看构造器：

1. 行 `(1)` 被称为父类构造器。JavaScript 需要我们在子类构造器中调用 `super`，这是强制性的。父类构造器设定 `message` 属性。
2. 父类构造器也设定 `name` 的值为 `"Error"`，所以在行 `(2)` 我们将其重置为正确的值

让我们用 `readUser(json)` 来试试：

```js run
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

// Usage
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

// Working example with try..catch

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
    throw err; // unknown error, rethrow it (**)
  }
}
```

 `try..catch` 代码块处理 `ValidationError` 和来自 `JSON.parse` 的内置 `SyntaxError`。

接下来看看我们是如何使用 `instanceof` 来检测行 `(*)` 中的特定错误类型。

也看看 `err.name`，就像这样：

```js
// ...
// instead of (err instanceof SyntaxError)
} else if (err.name == "SyntaxError") { // (*)
// ...
```  

使用 `instanceof` 的做法会好很多，因为我们在以后会扩展 `ValidationError`，创造一个它的子类型，例如  `PropertyRequiredError`。而 `instanceof` 对于新的继承类也适用。所以这是个长远的保证。

还有一点很重要，在 `catch` 语句捕捉到未知的错误时，它会在抛出行 `(**)` 处重新抛出，`catch` 语句仅仅知道如何处理验证和语法错误，而其他错误不应该被捕获。

## 更进一步的继承

 `ValidationError` 类是十分通用的。因此可能会在某些方面出错。属性可能缺失，格式可能发生错误（例如 `age` 属性的值为一个字符串）。让我们来创造一个更加具体的类 `PropertyRequiredError`，为属性缺失的错误而量身定做的。它将会承载属性缺失的相关信息。

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

// Usage
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

// Working example with try..catch

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
    throw err; // unknown error, rethrow it
  }
}
```

这个 `PropertyRequiredError` 十分容易上手：我们只需要传递属性名：`new PropertyRequiredError(property)`。易懂的 `message` 属性将会由构造器提供。

需要注意的是，在 `PropertyRequiredError` 构造器中的 `this.name` 是再次进行手动赋值的。这可能会造成冗余 —— 在创建每个自定义错误的时候都要进行赋值 `this.name = <class name>`。但这并不是唯一的办法。我们可以创建自己的“基础异常”类，通过将 `this.constructor.name` 赋值给 `this.name` 来卸下我们肩上的负担，然后再进行继承。

我们称其为 `MyError`。

这是 `MyError` 以及其他自定义错误类的代码：

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

// name is correct
alert( new PropertyRequiredError("field").name ); // PropertyRequiredError
```

现在的自定义错误更加的简洁，特别是 `ValidationError`，我们在其构造器中删除了 `"this.name = ..."` 这一行。

## 包装异常

上述代码中的函数 `readUser` 的目的就是“读取用户数据”，对吧？在此过程中可能会出现多个不同类型的异常，目前我们有 `SyntaxError` 和 `ValidationError`，但在将来，函数 `readUser` 将会不断壮大，新添加的代码或许会导致其他类型的异常。

调用函数 `readUser` 的代码要能够处理这些异常。现在它在 `catch` 语句块中使用多个 `if` 语句来检测不同类型的异常以及抛出未知异常。但如果函数 `readUser` 抛出了多种异常 —— 我们扪心自问：我们真的需要一个接一个地处理它抛出的异常吗？

答案是 “No”：外部代码想要比其他代码更高一级。它想要一些类似于关于数据读取的异常，其错误描述信息通常是不相关的。或者，如果能有一种获取异常的细节的办法就更好了，但这仅限于我们需要的时候。

所以，我们创建一个 `ReadError` 类来表现上述的异常。如果在函数 `readUser` 中发生了异常，我们会将其捕获，并生成 `ReadError`。我们同时也会在其 `cause` 属性中保留对原始异常的引用。那么外部的代码就只需要检测 `ReadError`。

下面的代码定义 `ReadError` 以及演示如何 `readUser` 和 `try..catch` 中使用它：

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

上述代码中， `readUser` 正如描述的一样正常工作 —— 捕获语法以及验证的异常并且使用抛出 `ReadError` 异常用来代替之前的行为（未知的异常依旧重新抛出）。

所以外部代码负责检测 `instanceof ReadError`，不必列出所有可能的异常类型。

这种途径称为“包装异常”，因为我们将“低级别的异常”包装为 `ReadError`，这会使得调用代码更加的抽象和方便。它在面向对象编程中被广泛使用。

## 总结

- 我们能够继承 `Error` 以及其他内置的类，只需要注意 `name` 属性以及调用 `super`。
- 大多数时候，我们应该使用 `instanceof` 来检测一些特定的异常。它也能够在继承中使用。但有时我们会发现来自第三方库的异常，并且不容易得到它的类。那么 `name` 属性就可用于这一类的检测。
- 包装异常是一种广泛应用的技术，当一个函数处理低级别的异常时，用一个高级别的对象来报告错误。低级别的异常有时会变成这个对象的属性，就像上面例子中的 `err.cause`，但这不是严格的要求。
