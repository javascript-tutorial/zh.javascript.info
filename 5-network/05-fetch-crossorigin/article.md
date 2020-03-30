<<<<<<< HEAD
# Fetch：跨源请求

如果我们对任意网站发起 `fetch` 请求，那可能会出现失败情况。

这里的核心概念是 *origin* —— 域（domain）/端口（port）/协议（protocol）的组合。

跨源请求 —— 那些发送到其他域（即使是子域）、协议或者端口 —— 要求服务端提供特殊的头。这个政策被称为“CORS”：跨域资源共享（Cross-Origin Resource Sharing）。

例如，我们尝试获取 `http://example.com`：
=======
# Fetch: Cross-Origin Requests

If we send a `fetch` request to another web-site, it will probably fail.

For instance, let's try fetching `http://example.com`:
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

```js run async
try {
  await fetch('http://example.com');
} catch(err) {
<<<<<<< HEAD
  alert(err); // 无法获取
}
```

不出意外，获取失败。

## 为什么？跨源请求简明史

因为跨源限制可以保护互联网免受恶意黑客攻击。

说真的，在这说点儿题外话，讲讲它的历史。

**多年来，来自某个网站的脚本无法访问另一个网站的内容。**

这个简单有力的规则是互联网安全的基础。例如，来自 `hacker.com` 页面的脚本无法访问 `gmail.com` 上的用户邮箱。基于这样的规则，人们感到很安全。

在那时候，JavaScript 只是一种装饰网页的玩具语言而已，它并没有任何特殊的执行网络请求的方法。

但是网络开发人员需要更多的控制权。人们发明了各种各样的技巧去突破它的限制。

### 使用 forms

其中一种和其他服务器通信的方法是提交一个 `<form>`。人们将它提交到 `<iframe>` ，目的只是为了仍然留在当前页面，像这样：

```html
<!-- form 目标 -->
=======
  alert(err); // Failed to fetch
}
```

Fetch fails, as expected.

The core concept here is *origin* -- a domain/port/protocol triplet.

Cross-origin requests -- those sent to another domain (even a subdomain) or protocol or port -- require special headers from the remote side.

That policy is called "CORS": Cross-Origin Resource Sharing.

## Why is CORS needed? A brief history

CORS exists to protect the internet from evil hackers.

Seriously. Let's make a very brief historical digression.

**For many years a script from one site could not access the content of another site.**

That simple, yet powerful rule was a foundation of the internet security. E.g. an evil script from website `hacker.com` could not access user's mailbox at website `gmail.com`. People felt safe.

JavaScript also did not have any special methods to perform network requests at that time. It was a toy language to decorate a web page.

But web developers demanded more power. A variety of tricks were invented to work around the limitation and make requests to other websites.

### Using forms

One way to communicate with another server was to submit a `<form>` there. People submitted it into `<iframe>`, just to stay on the current page, like this:

```html
<!-- form target -->
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648
*!*
<iframe name="iframe"></iframe>
*/!*

<<<<<<< HEAD
<!-- form 可以使用 JavaScript 动态生成并提交 -->
=======
<!-- a form could be dynamically generated and submited by JavaScript -->
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648
*!*
<form target="iframe" method="POST" action="http://another.com/…">
*/!*
  ...
</form>
```

<<<<<<< HEAD
因此，即使没有网络方法，它也可以向其他网站发起一个 GET/POST 请求。但是由于禁止从其他网页读取 `<iframe>` 的内容，因此就无法读取响应。

正如所见，forms 可以在任意位置发送数据，但是不能接受响应内容。确切地说，还是有一些技巧能够解决这个问题的（iframe 和页面中都需要添加特殊脚本），不过我们还是让这些老古董代码不要再出现了吧。

### 使用 scripts

另一个技巧是使用 `<script src="http://another.com/…">` 标签。脚本元素可以有来自任何域的任何 `src` 值。但同样 —— 无法访问此类脚本的原始内容。

如果 `another.com` 试图公开这种访问的数据，则使用所谓的“JSONP（JSON with padding）”协议。

假设我们需要以这种方式从 `http://another.com` 站点获取数据：

1. 首先，我们提前声明一个全局函数来接收数据，例如 `gotWeather`。

    ```js
    // 1. 声明处理数据的函数
    function gotWeather({ temperature, humidity }) {
      alert(`temperature: ${temperature}, humidity: ${humidity}`);
    }
    ```    
2. 然后我们创建属性为 `src="http://another.com/weather.json?callback=gotWeather"` 的 `<script>` 标签，请注意我们的函数名是作为它的 `callback` 参数。
=======
So, it was possible to make a GET/POST request to another site, even without networking methods, as forms can send data anywhere. But as it's forbidden to access the content of an `<iframe>` from another site, it wasn't possible to read the response.

To be precise, there were actually tricks for that, they required special scripts at both the iframe and the page. So the communication with the iframe was technically possible. Right now there's no point to go into details, let these dinosaurs rest in peace.

### Using scripts

Another trick was to use a `script` tag. A script could have any `src`, with any domain, like `<script src="http://another.com/…">`. It's possible to execute a script from any website.

If a website, e.g. `another.com` intended to expose data for this kind of access, then a so-called "JSONP (JSON with padding)" protocol was used.

Here's how it worked.

Let's say we, at our site, need to get the data from `http://another.com`, such as the weather:

1. First, in advance, we declare a global function to accept the data, e.g. `gotWeather`.

    ```js
    // 1. Declare the function to process the weather data
    function gotWeather({ temperature, humidity }) {
      alert(`temperature: ${temperature}, humidity: ${humidity}`);
    }
    ```
2. Then we make a `<script>` tag with `src="http://another.com/weather.json?callback=gotWeather"`, using the name of our function as the `callback` URL-parameter.
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

    ```js
    let script = document.createElement('script');
    script.src = `http://another.com/weather.json?callback=gotWeather`;
    document.body.append(script);
    ```
<<<<<<< HEAD
3. 服务器动态生成一个名为 `gotWeather(...)` 的脚本，脚本内包含我们想要接收的数据。
    ```js
    // 期望从服务器获取到的结果类似于此：
=======
3. The remote server `another.com` dynamically generates a script that calls `gotWeather(...)` with the data it wants us to receive.
    ```js
    // The expected answer from the server looks like this:
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648
    gotWeather({
      temperature: 25,
      humidity: 78
    });
    ```
<<<<<<< HEAD
4. 当远端脚本加载并执行的时候，`gotWeather` 函数被调用，并且因为它是我们的函数，我们就有需要的数据了。



这是可行的，并且不违反安全规定，因为双方网站都接受这种传递数据的方式。既然双方网站都同意这种行为，那么它肯定不是网络攻击了。现在仍然有提供这种访问的服务，因为即使是非常旧的浏览器也依然可行。

不久之后，出现了具体的网络处理方法，例如 `XMLHttpRequest`。

起初，跨源请求是被禁止的。但是由于长时间的讨论，跨源请求最终被允许：除非服务器明确允许，否则不会添加任何功能。

## 简单请求（Simple requests）

有两种跨域（cross-domain）请求：
1. 简单请求。
2. 除简单请求以外的其他请求。

顾名思义，简单请求很简单，所以我们先从它开始。

一个 [简单请求](http://www.w3.org/TR/cors/#terminology) 是指满足下列条件的请求：

1. [简单请求方法](http://www.w3.org/TR/cors/#simple-method)：GET, POST 或 HEAD
2. [简单请求头](http://www.w3.org/TR/cors/#simple-header) — 仅允许自定义下列请求头：
    - `Accept`，
    - `Accept-Language`，
    - `Content-Language`，
    - `Content-Type` 的值为 `application/x-www-form-urlencoded`， `multipart/form-data` 或 `text/plain`.

任何其他的请求都被视为“非简单请求（non-simple）”。例如，具有 `PUT` 方法或者 `API-Key` HTTP 头的请求就不是简单请求了。

**本质区别在于，可以使用 `<form>` 或者 `<script>` 进行“简单请求”，而无需任何特殊方法。**

所以，即使是非常旧的服务器也能很好地接收简单请求。

与此相反，使用非标准头，或者说比如 `DELETE` 这样的方法就不能以这种方式创建。在很长一段时间内，JavaScript 都不能建立这样的请求。所以，旧的服务器可能会认为此类请求来自具有特权的来源，“因为网页无法发送它们”。

当我们试图建立非简单请求时，浏览器发送一个特殊的“预检（preflight）”请求到服务器 —— 是否接受这类跨源请求吗？

并且，除非服务器明确通过头确认，否则非简单请求不会被发送。

现在，我们将详细介绍它们。所有这些都有一个目的 —— 那就是确保只有来自服务器的明确许可才能访问新的跨源功能。

## 用于简单请求的 CORS

如果一个请求是跨源的，浏览器始终会向其添加 `Origin` 头。

例如，如果我们从 `https://javascript.info/page` 请求 `https://anywhere.com/request`，请求头就类似于：

```
=======
4. When the remote script loads and executes, `gotWeather` runs, and, as it's our function, we have the data.

That works, and doesn't violate security, because both sides agreed to pass the data this way. And, when both sides agree, it's definitely not a hack. There are still services that provide such access, as it works even for very old browsers.

After a while, networking methods appeared in browser JavaScript.

At first, cross-origin requests were forbidden. But as a result of long discussions, cross-origin requests were allowed, but with any new capabilities requiring an explicit allowance by the server, expressed in special headers.

## Simple requests

There are two types of cross-origin requests:

1. Simple requests.
2. All the others.

Simple Requests are, well, simpler to make, so let's start with them.

A [simple request](http://www.w3.org/TR/cors/#terminology) is a request that satisfies two conditions:

1. [Simple method](http://www.w3.org/TR/cors/#simple-method): GET, POST or HEAD
2. [Simple headers](http://www.w3.org/TR/cors/#simple-header) -- the only allowed custom headers are:
    - `Accept`,
    - `Accept-Language`,
    - `Content-Language`,
    - `Content-Type` with the value `application/x-www-form-urlencoded`, `multipart/form-data` or `text/plain`.

Any other request is considered "non-simple". For instance, a request with `PUT` method or with an `API-Key` HTTP-header does not fit the limitations.

**The essential difference is that a "simple request" can be made with a `<form>` or a `<script>`, without any special methods.**

So, even a very old server should be ready to accept a simple request.

Contrary to that, requests with non-standard headers or e.g. method `DELETE` can't be created this way. For a long time JavaScript was unable to do such requests. So an old server may assume that such requests come from a privileged source, "because a webpage is unable to send them".

When we try to make a non-simple request, the browser sends a special "preflight" request that asks the server -- does it agree to accept such cross-origin requests, or not?

And, unless the server explicitly confirms that with headers, a non-simple request is not sent.

Now we'll go into details.

## CORS for simple requests

If a request is cross-origin, the browser always adds `Origin` header to it.

For instance, if we request `https://anywhere.com/request` from `https://javascript.info/page`, the headers will be like:

```http
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648
GET /request
Host: anywhere.com
*!*
Origin: https://javascript.info
*/!*
...
```

<<<<<<< HEAD
正如你所见，`Origin` 包含完整的源（domain/protocol/port），没有路径。

服务器可以检查 `Origin`，如果同意接受这样的请求，就会在响应中添加一个特殊的头 `Access-Control-Allow-Origin`。该头包含了允许的源（在我们示例中是 `https://javascript.info`），或者星号 `*`。然后响应成功，否则报错。

浏览器在这里扮演受信任的中间人角色：
1. 它确保通过跨域请求发送正确的 `Origin`。
2. 如果在响应中检查出正确的 `Access-Control-Allow-Origin`，如果是，则 JavaScript 能正常访问（目标资源），否则被禁止并报错。

![](xhr-another-domain.svg)

这是一个得到服务器许可的响应示例：
```
=======
As you can see, `Origin` header contains exactly the origin (domain/protocol/port), without a path.

The server can inspect the `Origin` and, if it agrees to accept such a request, adds a special header `Access-Control-Allow-Origin` to the response. That header should contain the allowed origin (in our case `https://javascript.info`), or a star `*`. Then the response is successful, otherwise an error.

The browser plays the role of a trusted mediator here:
1. It ensures that the correct `Origin` is sent with a cross-origin request.
2. It checks for permitting `Access-Control-Allow-Origin` in the response, if it exists, then JavaScript is allowed to access the response, otherwise it fails with an error.

![](xhr-another-domain.svg)

Here's an example of a permissive server response:
```http
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648
200 OK
Content-Type:text/html; charset=UTF-8
*!*
Access-Control-Allow-Origin: https://javascript.info
*/!*
```

<<<<<<< HEAD
## 响应头（Response headers）

对于跨源请求，默认情况下 JavaScript 只能访问“简单响应头”：
=======
## Response headers

For cross-origin request, by default JavaScript may only access so-called "simple" response headers:
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

- `Cache-Control`
- `Content-Language`
- `Content-Type`
- `Expires`
- `Last-Modified`
- `Pragma`

<<<<<<< HEAD
任何其他响应头都是禁止的。

```smart header="请注意：没有 `Content-Length`"
请注意：列表中没有 `Content-Length` 头！

这个头包含了完整响应长度。所以，如果我们想要追踪下载内容的进度百分比，则需要额外的权限才能访问该头（参见下文）。
```

要允许 JavaScript 访问任何其他响应头，服务器必须在响应头中列出 `Access-Control-Expose-Headers`。

例如：

```
=======
Accessing any other response header causes an error.

```smart
There's no `Content-Length` header in the list!

This header contains the full response length. So, if we're downloading something and would like to track the percentage of progress, then an additional permission is required to access that header (see below).
```

To grant JavaScript access to any other response header, the server must send  `Access-Control-Expose-Headers` header. It contains a comma-separated list of non-simple header names that should be made accessible.

For example:

```http
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648
200 OK
Content-Type:text/html; charset=UTF-8
Content-Length: 12345
API-Key: 2c9de507f2c54aa1
Access-Control-Allow-Origin: https://javascript.info
*!*
Access-Control-Expose-Headers: Content-Length,API-Key
*/!*
```

<<<<<<< HEAD
有了 `Access-Control-Expose-Headers` 响应头，脚本就有权限访问响应的 `Content-Length` 和 `API-Key` 头。


## "非简单" requests

我们可以使用任何 HTTP 方法：不仅仅是 `GET/POST`，也可以是 `PATCH`，`DELETE`  及其他。

之前，没有人能够设想网页能做出这样的请求。所以可能存在有些网络服务视非标准方法为一个信号：“这不是浏览器”。它们可以在检查访问权限时将其考虑在内。

因此，为了避免误解，任何“非标准”请求 —— 在过去无法完成，浏览器不会立即发出此类请求。在它发送请求前，会先发送“预检请求”来获取权限。

预检请求使用 `OPTIONS` 方法，并且没有 body。
- `Access-Control-Request-Method` 头带有请求方法。
- `Access-Control-Request-Headers` 头提供以逗号分隔的非简单 HTTP 头列表。

如果服务器同意请求，那么它响应状态码应该为 200，没有 body。

- 响应头 `Access-Control-Allow-Methods` 必须具有允许的方法。
- 响应头 `Access-Control-Allow-Headers` 必须具有允许的头列表。
- 另外，响应头 `Access-Control-Max-Age` 可以指定缓存此权限的秒数。因此，浏览器不必为满足给定权限的后续请求发送预检。

![](xhr-preflight.svg)

让我们用一个例子来一步步展示它是怎么工作的，对于跨域的 `PATCH` 请求（这个方法通常被用来上传数据）：
=======
With such `Access-Control-Expose-Headers` header, the script is allowed to read `Content-Length` and `API-Key` headers of the response.

## "Non-simple" requests

We can use any HTTP-method: not just `GET/POST`, but also `PATCH`, `DELETE` and others.

Some time ago no one could even imagine that a webpage could make such requests. So there may still exist webservices that treat a non-standard method as a signal: "That's not a browser". They can take it into account when checking access rights.

So, to avoid misunderstandings, any "non-simple" request -- that couldn't be done in the old times, the browser does not make such requests right away. Before it sends a preliminary, so-called "preflight" request, asking for permission.

A preflight request uses method `OPTIONS`, no body and two headers:

- `Access-Control-Request-Method` header has the method of the non-simple request.
- `Access-Control-Request-Headers` header provides a comma-separated list of its non-simple HTTP-headers.

If the server agrees to serve the requests, then it should respond with empty body, status 200 and headers:

- `Access-Control-Allow-Methods` must have the allowed method.
- `Access-Control-Allow-Headers` must have a list of allowed headers.
- Additionally, the header `Access-Control-Max-Age` may specify a number of seconds to cache the permissions. So the browser won't have to send a preflight for subsequent requests that satisfy given permissions.

![](xhr-preflight.svg)

Let's see how it works step-by-step on example, for a cross-origin `PATCH` request (this method is often used to update data):
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

```js
let response = await fetch('https://site.com/service.json', {
  method: 'PATCH',
  headers: {
<<<<<<< HEAD
    'Content-Type': 'application/json'  
=======
    'Content-Type': 'application/json',
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648
    'API-Key': 'secret'
  }
});
```

<<<<<<< HEAD
这里有三个理由解释为什么它不是一个简单请求（其实一个就够了）：
- 方法：`PATCH`
- `Content-Type` 不是这三个中的一个：`application/x-www-form-urlencoded`，`multipart/form-data`，`text/plain`。
- “非简单（Non-simple）” `API-Key` 头。

### Step 1 预检请求（preflight request）

在我们发送请求之前，浏览器自身会发送类似这样的预检请求：

```
=======
There are three reasons why the request is not simple (one is enough):
- Method `PATCH`
- `Content-Type` is not one of: `application/x-www-form-urlencoded`, `multipart/form-data`, `text/plain`.
- "Non-simple" `API-Key` header.

### Step 1 (preflight request)

Prior to sending such request, the browser, on its own, sends a preflight request that looks like this:

```http
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648
OPTIONS /service.json
Host: site.com
Origin: https://javascript.info
Access-Control-Request-Method: PATCH
Access-Control-Request-Headers: Content-Type,API-Key
```

<<<<<<< HEAD
- 方法：`OPTIONS`。
- 路径 —— 与主请求完全相同：`/service.json`。
- 特殊跨源头：
    - `Origin` —— 来源。
    - `Access-Control-Request-Method` —— 请求方法。
    - `Access-Control-Request-Headers` —— 以逗号分隔的“非简单”头列表。

### Step 2 预检响应（preflight response）

服务应响应状态 200 和响应头：
- `Access-Control-Allow-Methods: PATCH`
- `Access-Control-Allow-Headers: Content-Type,API-Key`.

这将允许后续通信，否则会触发错误。

如果服务器将来需要其他的方法和头，那么添加到列表中来提前允许它们是很有意义的：

```
=======
- Method: `OPTIONS`.
- The path -- exactly the same as the main request: `/service.json`.
- Cross-origin special headers:
    - `Origin` -- the source origin.
    - `Access-Control-Request-Method` -- requested method.
    - `Access-Control-Request-Headers` -- a comma-separated list of "non-simple" headers.

### Step 2 (preflight response)

The server should respond with status 200 and headers:
- `Access-Control-Allow-Methods: PATCH`
- `Access-Control-Allow-Headers: Content-Type,API-Key`.

That allows future communication, otherwise an error is triggered.

If the server expects other methods and headers in the future, it makes sense to allow them in advance by adding to the list:

```http
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648
200 OK
Access-Control-Allow-Methods: PUT,PATCH,DELETE
Access-Control-Allow-Headers: API-Key,Content-Type,If-Modified-Since,Cache-Control
Access-Control-Max-Age: 86400
```

<<<<<<< HEAD
现在，浏览器可以在允许的方法列表里找到 `PATCH`，并且这两个头也都在列表中，因此它发送主请求。

此外，预检请求会按指定时间缓存，由 `Access-Control-Max-Age` 头指定（86400 秒，一天），因此，后续请求将不会再发送预检请求。假设它们符合配额，它们将直接发送。

### Step 3 实际请求（actual request）

当预检请求成功后，浏览器将会发送实际请求。这里的流程和简单请求相同。

实际请求有 `Origin` 头（因为它是跨源的）：

```
=======
Now the browser can see that `PATCH` is in `Access-Control-Allow-Methods` and `Content-Type,API-Key` are in the list `Access-Control-Allow-Headers`, so it sends out the main request.

Besides, the preflight response is cached for time, specified by `Access-Control-Max-Age` header (86400 seconds, one day), so subsequent requests will not cause a preflight. Assuming that they fit the cached allowances, they will be sent directly.

### Step 3 (actual request)

When the preflight is successful, the browser now makes the main request. The algorithm here is the same as for simple requests.

The main request has `Origin` header (because it's cross-origin):

```http
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648
PATCH /service.json
Host: site.com
Content-Type: application/json
API-Key: secret
Origin: https://javascript.info
```

<<<<<<< HEAD
### Step 4 实际响应（actual response）

服务器记得要在 response 中添加 Access-Control-Allow-Origin，因为一次成功预检并不能解除潜在的风险：

```
Access-Control-Allow-Origin: https://javascript.info
```

现在所有事情都是正确的。JavaScript 可以读取完整的响应了。


## 凭据（Credentials）

默认情况下，跨源请求不会带来任何凭据（cookies 或者 HTTP 认证（HTTP authentication））。

这对于 HTTP 请求来说并不常见。通常，对 `http://site.com` 的请求附带来自该域的所有 cookies。但是对于 JavaScript 方法建立的跨源请求是个例外。

例如，`fetch('http://another.com')` 不会发送任何 cookies，甚至那些属于 `another.com` 域的 cookies。

为什么？

这是因为具有凭据的请求比匿名请求具有的权限更大。如果被允许，它授予 JavaScript 代表用户行为和访问敏感信息的全部权限。

服务器真的这么信任来自 `Origin` 的页面吗？是的，它必须明确地允许带有附加请求头凭据的请求。

要发送凭据，我们需要添加选项 `credentials: "include"`，就像这样：
=======
### Step 4 (actual response)

The server should not forget to add `Access-Control-Allow-Origin` to the main response. A successful preflight does not relieve from that:

```http
Access-Control-Allow-Origin: https://javascript.info
```

Then JavaScript is able to read the main server response.

```smart
Preflight request occurs "behind the scenes", it's invisible to JavaScript.

JavaScript only gets the response to the main request or an error if there's no server permission.
```

## Credentials

A cross-origin request by default does not bring any credentials (cookies or HTTP authentication).

That's uncommon for HTTP-requests. Usually, a request to `http://site.com` is accompanied by all cookies from that domain. But cross-origin requests made by JavaScript methods are an exception.

For example, `fetch('http://another.com')` does not send any cookies, even those  (!) that belong to `another.com` domain.

Why?

That's because a request with credentials is much more powerful than without them. If allowed, it grants JavaScript the full power to act on behalf of the user and access sensitive information using their credentials.

Does the server really trust the script that much? Then it must explicitly allow requests with credentials with an additional header.

To send credentials in `fetch`, we need to add the option `credentials: "include"`, like this:
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648

```js
fetch('http://another.com', {
  credentials: "include"
});
```

<<<<<<< HEAD
现在，`fetch` 会发送源自 `another.com` 的 cookies，但不会向该站点发出请求。

如果服务器想要接受带有凭据的请求，则除了 `Access-Control-Allow-Origin` 外，它还需要向响应头中添加 `Access-Control-Allow-Credentials: true`。

例如：

```
=======
Now `fetch` sends cookies originating from `another.com` without request to that site.

If the server agrees to accept the request *with credentials*, it should add a header `Access-Control-Allow-Credentials: true` to the response, in addition to `Access-Control-Allow-Origin`.

For example:

```http
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648
200 OK
Access-Control-Allow-Origin: https://javascript.info
Access-Control-Allow-Credentials: true
```

<<<<<<< HEAD
请注意：对于具有凭据的请求，禁止使用 `Access-Control-Allow-Origin` 为 `*`。它必须有一个确切的源，像上面一样。这是一项额外的安全措施，以确保服务器真正知道它信任谁。


## 总结

网络方法将跨源请求分为两类：“简单”请求和除“简单”请求之外其他的请求。

[简单请求](http://www.w3.org/TR/cors/#terminology) 必须满足下列条件：
- 方法：GET，POST 或 HEAD。
- 头 —— 我们仅能设置：
    - `Accept`
    - `Accept-Language`
    - `Content-Language`
    - `Content-Type` 的值为 `application/x-www-form-urlencoded`，`multipart/form-data` 或 `text/plain`。

简单请求和其他请求的本质区别在于，自古以来使用 `<form>` 或 `<script>` 标签就可以发送简单请求，而长期来浏览器都不能使用非简单请求。

所以，实际区别在于简单请求会使用 `Origin` 头并立即发送，而对于其他请求，浏览器会发出初步的预检请求，请求获得许可。

**对于简单请求：**

- → 浏览器发送带有源的 `Origin` 头。
- ← 对于没有凭据的请求（默认不发送），服务器应该设置：
    - `Access-Control-Allow-Origin` 为 `*` 或与 `Origin` 值相同
- ← 对于具有凭据的请求，服务器应该设置：
    - `Access-Control-Allow-Origin` 值与 `Origin` 相同
    - `Access-Control-Allow-Credentials` 为 `true`

此外，如果 JavaScript 期望访问非简单响应头：
- `Cache-Control`
- `Content-Language`
- `Content-Type`
- `Expires`
- `Last-Modified`
- `Pragma`

...服务器应列出 `Access-Control-Expose-Headers` 头中允许的那些。

**对于非简单请求，会在请求之前发出初步“预检”请求：

- → 浏览器发送 `OPTIONS` 请求到相同的 url，同时具有下列头：
    - `Access-Control-Request-Method` 请求方法。
    - `Access-Control-Request-Headers` 非简单请求头列表
- ← 服务器应该响应状态码为 200 和响应头：
    - `Access-Control-Allow-Methods` 具有一系列允许方法的列表，
    - `Access-Control-Allow-Headers` 具有一系列允许头的列表，
    - `Access-Control-Max-Age` 用指定数字来设置缓存权限的时间。
- 最后发出实际请求，应用先前的“简单”方案。
=======
Please note: `Access-Control-Allow-Origin` is prohibited from using a star `*` for requests with credentials. Like shown above, it must provide the exact origin there. That's an additional safety measure, to ensure that the server really knows who it trusts to make such requests.

## Summary

From the browser point of view, there are two kinds of cross-origin requests: "simple" and all the others.

[Simple requests](http://www.w3.org/TR/cors/#terminology) must satisfy the following conditions:
- Method: GET, POST or HEAD.
- Headers -- we can set only:
    - `Accept`
    - `Accept-Language`
    - `Content-Language`
    - `Content-Type` to the value `application/x-www-form-urlencoded`, `multipart/form-data` or `text/plain`.

The essential difference is that simple requests were doable since ancient times using `<form>` or `<script>` tags, while non-simple were impossible for browsers for a long time.

So, the practical difference is that simple requests are sent right away, with `Origin` header, while for the other ones the browser makes a preliminary "preflight" request, asking for permission.

**For simple requests:**

- → The browser sends `Origin` header with the origin.
- ← For requests without credentials (not sent default), the server should set:
    - `Access-Control-Allow-Origin` to `*` or same value as `Origin`
- ← For requests with credentials, the server should set:
    - `Access-Control-Allow-Origin` to same value as `Origin`
    - `Access-Control-Allow-Credentials` to `true`

Additionally, to grant JavaScript access to any response headers except `Cache-Control`,  `Content-Language`, `Content-Type`, `Expires`, `Last-Modified` or `Pragma`, the server should list the allowed ones in `Access-Control-Expose-Headers` header.

**For non-simple requests, a preliminary "preflight" request is issued before the requested one:**

- → The browser sends `OPTIONS` request to the same URL, with headers:
    - `Access-Control-Request-Method` has requested method.
    - `Access-Control-Request-Headers` lists non-simple requested headers.
- ← The server should respond with status 200 and headers:
    - `Access-Control-Allow-Methods` with a list of allowed methods,
    - `Access-Control-Allow-Headers` with a list of allowed headers,
    - `Access-Control-Max-Age` with a number of seconds to cache permissions.
- Then the actual request is sent, the previous "simple" scheme is applied.
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648
