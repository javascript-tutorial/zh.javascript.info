# Cookie，document.cookie

Cookie 是直接存储在浏览器中的一小串数据。它们是 HTTP 协议的一部分，由 [RFC 6265](https://tools.ietf.org/html/rfc6265) 规范定义。

Cookie 通常是由 Web 服务器使用响应 `Set-Cookie` HTTP-header 设置的。然后浏览器使用 `Cookie` HTTP-header 将它们自动添加到（几乎）每个对相同域的请求中。

最常见的用处之一就是身份验证：

1. 登录后，服务器在响应中使用 `Set-Cookie` HTTP-header 来设置具有唯一“会话标识符（session identifier）”的 cookie。
2. 下次如果请求是由相同域发起的，浏览器会使用 `Cookie` HTTP-header 通过网络发送 cookie。
3. 所以服务器知道是谁发起了请求。

我们还可以使用 `document.cookie` 属性从浏览器访问 cookie。

关于 cookie 及其选项，有很多棘手的事情。在本章中，我们将详细介绍它们。

## 从 document.cookie 中读取

```online
你的浏览器是否存储了本网站的任何 cookie？让我们来看看：
```

```offline
假设你在一个网站上，则可以看到来自该网站的 cookie，像这样：
```

```js run
// 在 javascript.info，我们使用谷歌分析来进行统计，
// 所以应该存在一些 cookie
alert( document.cookie ); // cookie1=value1; cookie2=value2;...
```


`document.cookie` 的值由 `name=value` 对组成，以 `; ` 分隔。每一个都是独立的 cookie。

为了找到一个特定的 cookie，我们可以以 `; ` 作为分隔，将 `document.cookie` 分开，然后找到对应的名字。我们可以使用正则表达式或者数组函数来实现。

我们把这个留给读者当作练习。此外，在本章的最后，你可以找到一些操作 cookie 的辅助函数。

## 写入 document.cookie

我们可以写入 `document.cookie`。但这不是一个数据属性，它是一个访问器（getter/setter）。对其的赋值操作会被特殊处理。

**对 `document.cookie` 的写入操作只会更新其中提到的 cookie，而不会涉及其他 cookie。**

例如，此调用设置了一个名称为 `user` 且值为 `John` 的 cookie：

```js run
document.cookie = "user=John"; // 只会更新名称为 user 的 cookie
alert(document.cookie); // 展示所有 cookie
```

如果你运行了上面这段代码，你会看到多个 cookie。这是因为 `document.cookie=` 操作不是重写整所有 cookie。它只设置代码中提到的 cookie `user`。

从技术上讲，cookie 的名称和值可以是任何字符，为了保持有效的格式，它们应该使用内建的 `encodeURIComponent` 函数对其进行转义：

```js run
// 特殊字符（空格），需要编码
let name = "my name";
let value = "John Smith"

// 将 cookie 编码为 my%20name=John%20Smith
document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

alert(document.cookie); // ...; my%20name=John%20Smith
```


```warn header="限制"
存在一些限制：
- `encodeURIComponent` 编码后的 `name=value` 对，大小不能超过 4KB。因此，我们不能在一个 cookie 中保存大的东西。
- 每个域的 cookie 总数不得超过 20+ 左右，具体限制取决于浏览器。
```

Cookie 有几个选项，其中很多都很重要，应该设置它。

选项被列在 `key=value` 之后，以 `;` 分隔，像这样：

```js run
document.cookie = "user=John; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT"
```

## path

- **`path=/mypath`**

url 路径前缀，该路径下的页面可以访问该 cookie。必须是绝对路径。默认为当前路径。

如果一个 cookie 带有 `path=/admin` 设置，那么该 cookie 在 `/admin` 和 `/admin/something` 下都是可见的，但是在 `/home` 或 `/adminpage` 下不可见。

通常，我们应该将 `path` 设置为根目录：`path=/`，以使 cookie 对此网站的所有页面可见。

## domain

- **`domain=site.com`**

可访问 cookie 的域。但是在实际中，有一些限制。我们无法设置任何域。

默认情况下，cookie 只有在设置的域下才能被访问到。所以，如果 cookie 设置在 `site.com` 下，我们在 `other.com` 下就无法获取它。

……但是棘手的是，我们在子域 `forum.site.com` 下也无法获取它！

```js
// 在 site.com
document.cookie = "user=John"

// 在 forum.site.com
alert(document.cookie); // 没有 user
```

**无法使 cookie 可以被从另一个二级域访问，因此，`other.com` 将永远不会收到设置在 `site.com` 的 cookie。**

这是一项安全限制，为了允许我们可以将敏感信息保存在 cookie 中。

……但是，如果我们想要批准像 `forum.site.com` 这样的子域访问 cookie，这是可以做到的。当我们设置一个在 `site.com` 的 cookie 时，我们应该将 `domain` 选项显式地设置为根域：`domain=site.com`：

```js
// 在 site.com
// 使 cookie 可以被在任何子域 *.site.com 访问：
document.cookie = "user=John; domain=site.com"

// 之后

// 在 forum.site.com
alert(document.cookie); // 有 cookie user=John
```

出于历史原因，`domain=.site.com`（`site.com` 前面有一个点符号）也以相同的方式工作，允许从子域访问 cookie。这是一个旧的表示法，如果我们需要支持非常旧的浏览器，则应该使用它。

所以，`domain` 选项允许设置一个可以在子域访问的 cookie。

## expires，max-age

默认情况下，如果一个 cookie 没有设置这两个参数中的任何一个，那么在关闭浏览器之后，它就会消失。此类 cookie 被称为 "session cookie”。

为了让 cookie 在浏览器关闭后仍然存在，我们可以设置 `expires` 或 `max-age` 选项中的一个。

- **`expires=Tue, 19 Jan 2038 03:14:07 GMT`**

cookie 的到期日期，那时浏览器会自动删除它。

日期必须完全采用 GMT 时区的这种格式。我们可以使用 `date.toUTCString` 来获取它。例如，我们可以将 cookie 设置为 1 天后过期。

```js
// 当前时间 +1 天
let date = new Date(Date.now() + 86400e3);
date = date.toUTCString();
document.cookie = "user=John; expires=" + date;
```

如果我们将 `expires` 设置为过去的时间，则 cookie 会被删除。

-  **`max-age=3600`**

`expires` 的替代选项，具指明 cookie 的过期时间距离当前时间的秒数。

如果为 0 或负数，则 cookie 会被删除：

```js
// cookie 会在一小时后失效
document.cookie = "user=John; max-age=3600";

// 删除 cookie（让它立即过期）
document.cookie = "user=John; max-age=0";
```

## secure

- **`secure`**

Cookie 应只能被通过 HTTPS 传输。

**默认情况下，如果我们在 `http://site.com` 上设置了 cookie，那么该 cookie 也会出现在 `https://site.com` 上，反之亦然。**

也就是说，cookie 是基于域的，它们不区分协议。

使用此选项，如果一个 cookie 是通过 `https://site.com` 设置的，那么它不会在相同域的 HTTP 环境下出现，例如 `http://site.com`。所以，如果一个 cookie 包含绝不应该通过未加密的 HTTP 协议发送的敏感内容，那么就应该设置这个选项。

```js
// 假设我们现在在 HTTPS 环境下
// 设置 cookie secure（只在 HTTPS 环境下可访问）
document.cookie = "user=John; secure";
```  

## samesite

这是另外一个关于安全的特性。它旨在防止 XSRF（跨网站请求伪造）攻击。

为了了解它是如何工作的，以及何时有用，让我们看一下 XSRF 攻击。

### XSRF 攻击

想象一下，你登录了 `bank.com` 网站。此时：你有了来自该网站的身份验证 cookie。你的浏览器会在每次请求时将其发送到 `bank.com`，以便识别你，并执行所有敏感的财务上的操作。

现在，在另外一个窗口中浏览网页时，你不小心访问了另一个网站 `evil.com`。该网站具有向 `bank.com` 网站提交一个具有启动与黑客账户交易的字段的表单 `<form action="https://bank.com/pay">` 的 JavaScript 代码。

你每次访问 `bank.com` 时，浏览器都会发送 cookie，即使该表单是从 `evil.com` 提交过来的。因此，银行会识别你的身份，并执行真实的付款。

![](cookie-xsrf.svg)

这就是“跨网站请求伪造（Cross-Site Request Forgery，简称 XSRF）”攻击。

当然，实际的银行会防止出现这种情况。所有由 `bank.com` 生成的表单都具有一个特殊的字段，即所谓的 “XSRF 保护 token”，恶意页面既不能生成，也不能从远程页面提取它（它可以在那里提交表单，但是无法获取数据）。并且，网站 `bank.com` 会对收到的每个表单都进行这种 token 的检查。

但是，实现这种防护需要花费时间：我们需要确保每个表单都具有 token 字段，并且还必须检查所有请求。

### 输入 cookie samesite 选项

Cookie 的 `samesite` 选项提供了另一种防止此类攻击的方式，（理论上）不需要要求 “XSRF 保护 token”。

它有两个可能的值：

- **`samesite=strict`（和没有值的 `samesite` 一样)**

如果用户来自同一网站之外，那么设置了 `samesite=strict` 的 cookie 永远不会被发送。

换句话说，无论用户是通过邮件链接还是从 `evil.com` 提交表单，或者进行了任何来自其他域下的操作，cookie 都不会被发送。

如果身份验证 cookie 具有 `samesite` 选项，那么 XSRF 攻击是没有机会成功的，因为来自 `evil.com` 的提交没有 cookie。因此，`bank.com` 将无法识别用户，也就不会继续进行付款。

这种保护是相当可靠的。只有来自 `bank.com` 的操作才会发送 `samesite` cookie，例如来自 `bank.com` 的另一页面的表单提交。

虽然，这样有一些不方便。

当用户通过合法的链接访问 `bank.com` 时，例如从他们自己的笔记，他们会感到惊讶，`bank.com` 无法识别他们的身份。实际上，在这种情况下不会发送 `samesite=strict` cookie。

我们可以通过使用两个 cookie 来解决这个问题：一个 cookie 用于“一般识别”，仅用于说 "Hello, John"，另一个带有 `samesite=strict` 的 cookie 用于进行数据更改的操作。这样，从网站外部来的用户会看到欢迎信息，但是支付操作必须是从银行网站启动的，这样第二个 cookie 才能被发送。

- **`samesite=lax`**

一种更轻松的方法，该方法还可以防止 XSRF 攻击，并且不会破坏用户体验。

宽松（lax）模式，和 `strict` 模式类似，当从外部来到网站，则禁止浏览器发送 cookie，但是增加了一个例外。

如果以下两个条件均成立，则会发送 `samesite=lax` cookie：
1. HTTP 方法是“安全的”（例如 GET 方法，而不是 POST）。

    所有安全的 HTTP 方法详见 [RFC7231 规范](https://tools.ietf.org/html/rfc7231)。基本上，这些都是用于读取而不是写入数据的方法。它们不得执行任何更改数据的操作。跟随链接始终是 GET，是安全的方法。

2. 该操作执行顶级导航（更改浏览器地址栏中的 URL）。

    这通常是成立的，但是如果导航是在一个 `<iframe>` 中执行的，那么它就不是顶级的。此外，用于网络请求的 JavaScript 方法不会执行任何导航，因此它们不适合。

所以，`samesite=lax` 所做的是基本上允许最常见的“去往 URL”操作具有 cookie。例如，从笔记本中打开网站链接就满足这些条件。

但是，任何更复杂的事儿，例如来自另一个网站的网络请求或表单提交都会丢失 cookie。

如果这种情况适合你，那么添加 `samesite=lax` 将不会破坏用户体验并且可以增加保护。

总体而言，`samesite` 是一个很好的选项，但是它有一个重要的缺点：
- `samesite` 会被到 2017 年左右的旧版本浏览器忽略（不兼容）。

**因此，如果我们仅依靠 `samesite` 提供保护，那么在旧版本的浏览器上将很容易受到攻击。**

但是，我们肯定可以将 `samesite` 与其他保护措施（例如 XSRF token）一起使用，例如 xsrf token，这样可以多增加一层保护，将来，当旧版本的浏览器淘汰时，我们可能就可以删除 xsrf token 这种方式了。

## httpOnly

这个选项和 JavaScript 没有关系，但是我们必须为了完整性也提一下它。

Web 服务器使用 `Set-Cookie` header 来设置 cookie。并且，它可以设置 `httpOnly` 选项。

这个选项禁止任何 JavaScript 访问 cookie。我们使用 `document.cookie` 看不到此类 cookie，也无法对此类 cookie 进行操作。

这是一种预防措施，当黑客将自己的 JavaScript 代码注入网页，并等待用户访问该页面时发起攻击，而这个选项可以防止此时的这种攻击。这应该是不可能发生的，黑客应该无法将他们的代码注入我们的网站，但是网站有可能存在 bug，使得黑客能够实现这样的操作。


通常来说，如果发生了这种情况，并且用户访问了带有黑客 JavaScript 代码的页面，黑客代码将执行并通过 `document.cookie` 获取到包含用户身份验证信息的 cookie。这就很糟糕了。

但是，如果 cookie 设置了 `httpOnly`，那么 `document.cookie` 则看不到 cookie，所以它受到了保护。

## 附录: Cookie 函数

这里有一组有关 cookie 操作的函数，比手动修改 `document.cookie` 方便得多。

有很多这种 cookie 库，所以这些函数只用于演示。虽然它们都能正常使用。


### getCookie(name)

获取 cookie 最简短的方式是使用 [正则表达式](info:regular-expressions)。

`getCookie(name)` 函数返回具有给定 `name` 的 cookie：

```js
// 返回具有给定 name 的 cookie，
// 如果没找到，则返回 undefined
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
```

这里的 `new RegExp` 是动态生成的，以匹配 `; name=<value>`。

请注意 cookie 的值是经过编码的，所以 `getCookie` 使用了内建方法 `decodeURIComponent` 函数对其进行解码。

### setCookie(name, value, options)

将 cookie `name` 设置为具有默认值 `path=/`（可以修改以添加其他默认值）和给定值 `value`：

```js run
function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    // 如果需要，可以在这里添加其他默认值
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

// 使用范例：
setCookie('user', 'John', {secure: true, 'max-age': 3600});
```

### deleteCookie(name)

要删除一个 cookie，我们可以给它设置一个负的过期时间来调用它：

```js
function deleteCookie(name) {
  setCookie(name, "", {
    'max-age': -1
  })
}
```

```warn header="更新或删除必须使用相同的路径和域"
请注意：当我们更新或删除一个 cookie 时，我们应该使用和设置 cookie 时相同的路径和域选项。
```

代码放在：[cookie.js](cookie.js)。


## 附录：第三方 cookie

如果 cookie 是由用户所访问的页面的域以外的域放置的，则称其为第三方 cookie。

例如：
1. `site.com` 网站的一个页面加载了另外一个网站的 banner：`<img src="https://ads.com/banner.png">`。
2. 与 banner 一起，`ads.com` 的远程服务器可能会设置带有 `id=1234` 这样的 cookie 的 `Set-Cookie` header。此类 cookie 源自 `ads.com` 域，并且仅在 `ads.com` 中可见：

    ![](cookie-third-party.svg)

3. 下次访问 `ads.com` 网站时，远程服务器获取 cookie `id` 并识别用户：

    ![](cookie-third-party-2.svg)

4. 更为重要的是，当用户从 `site.com` 网站跳转至另一个也带有 banner 的网站 `other.com` 时，`ads.com` 会获得该 cookie，因为它属于 `ads.com`，从而识别用户并在他在网站之间切换时对其进行跟踪：

    ![](cookie-third-party-3.svg)


由于它的性质，第三方 cookie 通常用于跟踪和广告服务。它们被绑定在原始域上，因此 `ads.com` 可以在不同网站之间跟踪同一用户，如果这些网站都可以访问 `ads.com` 的话。

当然，有些人不喜欢被跟踪，因此浏览器允许禁止此类 cookie。

此外，一些现代浏览器对此类 cookie 采取特殊策略：
- Safari 浏览器完全不允许第三方 cookie。
- Firefox 浏览器附带了一个第三方域的黑名单，它阻止了来自名单内的域的第三方 cookie。


```smart
如果我们加载了一个来自第三方域的脚本，例如 `<script src="https://google-analytics.com/analytics.js">`，并且该脚本使用 `document.cookie` 设置了 cookie，那么此类 cookie 就不是第三方的。

如果一个脚本设置了一个 cookie，那么无论脚本来自何处 —— 这个 cookie 都属于当前网页的域。
```

## 附录: GDPR

本主题和 JavaScript 无关，只是设置 cookie 时的一些注意事项。

欧洲有一项名为 GDPR 的立法，该法规针对网站尊重用户实施了一系列规则。其中之一就是需要明确的许可才可以跟踪用户的 cookie。

请注意，这仅与跟踪/识别/授权 cookie 有关。

所以，如果我们设置一个只保存了一些信息的 cookie，但是既不跟踪也不识别用户，那么我们可以自由地设置它。

但是，如果我们要设置带有身份验证会话（session）或跟踪 id 的 cookie，那么必须得到用户的允许。

网站为了遵循 GDPR 通常有两种做法。你一定已经在网站中看到过它们了：

1. 如果一个网站想要仅为已经经过身份验证的用户设置跟踪的 cookie。

    为此，注册表单中必须要有一个复选框，例如“接受隐私政策”（描述怎么使用 cookie），用户必须勾选它，然后网站就可以自由设置身份验证 cookie 了。

2. 如果一个网站想要为所有人设置跟踪的 cookie。

    为了合法地这样做，网站为每个新用户显示一个模态“初始屏幕”，并要求他们同意设置 cookie。之后网站就可以设置 cookie，并可以让用户看到网站内容了。不过，这可能会使新用户感到反感。没有人喜欢看到“必须点击”的模态初始屏幕而不是网站内容。但是 GDPR 要求必须得到用户明确地准许。


GDPR 不仅涉及 cookie，还涉及其他与隐私相关的问题，但这超出了我们的讨论范围。


## 总结

`document.cookie` 提供了对 cookie 的访问
- 写入操作只会修改其中提到的 cookie。
- name/value 必须被编码。
- 一个 cookie 最大为 4KB，每个网站最多有 20+ 个左右的 cookie（具体取决于浏览器）。

Cookie 选项：
- `path=/`，默认为当前路径，使 cookie 仅在该路径下可见。
- `domain=site.com`，默认 cookie 仅在当前域下可见，如果显式设置了域，可以使 cookie 在子域下也可见。
- `expires` 或 `max-age` 设置 cookie 过期时间，如果没有设置，则当浏览器关闭时 cookie 就失效了。
- `secure` 使 cookie 仅在 HTTPS 下有效。
- `samesite`，如果请求来自外部网站，禁止浏览器发送 cookie，这有助于防止 XSRF 攻击。

另外：
- 浏览器可能会禁用第三方 cookie，例如 Safari 浏览器默认禁止所有第三方 cookie。
- 在为欧盟公民设置跟踪 cookie 时，GDPR 要求必须得到用户明确许可。
