# Cookies, document.cookie

cookies 是直接保存在浏览器上的小数据串。它们是 HTTP 协议的一部分，由 [RFC 6265](https://tools.ietf.org/html/rfc6265) 规范定义。

大多数情况下，cookies 是由 web 服务器设置的。然后它们会自动添加到相同域名下的每次请求中。

最常见的用处之一是身份验证：

1. 登录后，服务端通过 `Set-Cookie` 在响应的 HTTP-header 中设置了一个带有 "会话标识符" 的 cookie。
2. 下次如果相同域名发起了请求，浏览器会发送带有 `Cookie` 的 HTTP-header。
3. 所以服务端知道是谁发起了请求。

我们还可以使用 `document.cookie` 属性在浏览器上访问 cookies。

有关 cookies 和它们的选项有很多棘手的事情。在本章节中，我们将会详细介绍。

## 从 document.cookie 中读取

```online
你在这个网站上有 cookies 吗？让我们来看看：
```

```offline
假设你在网站上可以看到 cookies，像这样：
```

```js run
// 在 javascript.info，我们使用谷歌分析来统计，
// 所以应该存在一些 cookies
alert( document.cookie ); // cookie1=value1; cookie2=value2;...
```


`document.cookie` 的值由一个个 `name=value` 组成，以 `; ` 相隔。每一个都是独立的 cookie。

为了找到一个特定的 cookie，我们可以通过 `; ` 截取 `document.cookie`，然后找到合适的名字。我们可以使用正则表达式或者数组的方法来实现。

我们把这个留给读者当作练习。此外，在本章节的结尾，你可以找到一些操作 cookies 的辅助函数。

## 写入 document.cookie

我们可以写入 `document.cookie`。但是这不是一个数据属性，它是一个访问者（getter/setter）。赋值操作会被特殊处理。

**浏览器的 `document.cookie` 写入操作只会更新已存在的 cookies，而不会影响其他 cookies。**

例如，这里设置了一个名称为 `user` 和值为 `John` 的 cookie：

```js run
document.cookie = "user=John"; // 只会更新名称为 user 的 cookie
alert(document.cookie); // 展示所有 cookies
```

如果你运行了代码，你很可能会看到多个 cookies。这是因为 `document.cookie=` 操作不是重写整个 cookies。它只设置代码中提到的 cookie `user`。

从技术层面看，cookie 的名称和值能是任何字符，为了保持格式有效，它们应该使用 `encodeURIComponent` 内置方法来编码一下：

```js run
// 特殊字符（空白符），需要编码
let name = "my name";
let value = "John Smith"

// 编码后变成 my%20name=John%20Smith
document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

alert(document.cookie); // ...; my%20name=John%20Smith
```


```warn header="局限性"
存在一些局限性：
- `encodeURIComponent` 编码后的 `name=value` 对，大小不能超过 4kb。所以我们不能在一个 cookie 中保存大数据。
- 每个域名下所有 cookies 的总数限制在 20 几个，实际的限制数量取决于浏览器。
```

cookies 有好几个选项，很多选项都很重要并且应该设置它。

选项列在 `key=value` 后面，使用 `;` 间隔，像这样：

```js run
document.cookie = "user=John; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT"
```

## path

- **`path=/mypath`**

可访问到 cookie 的 url 路径前缀。必须是绝对路径。默认值为当前路径。

如果一个 cookie 设置了 `path=/admin`，那么在 `/admin` 和 `/admin/something` 下都是可见的，但是在 `/home` 或 `/adminpage` 下不可见。

通常，我们设置 `path=/` 来允许网站下所有页面访问 cookie。

## domain

- **`domain=site.com`**

可访问到 cookie 的域名。但是在实践中，存在局限性。我们不能设置任何域名。

默认情况下，cookie 只能在设置的域名下才能访问到。所以，如果 cookie 设置在 `site.com` 下，我们不能在任何其他域名下（`other.com`）访问它。

……但是棘手的是，我们在子域名下同样不能获取到 cookie（`forum.site.com`）！

```js
// 在 site.com
document.cookie = "user=John"

// 在 forum.site.com
alert(document.cookie); // 没有 user
```

**让 cookie 在另外一个二级域名下可以访问到是没有办法的，所以其他域名 `other.com` 将不会接收到设置在 `site.com` 的 cookie。**

这是一个安全限制，为了允许我们可以在 cookie 中保存敏感信息。

……但是如果我们想要批准像 `forum.site.com` 这样的子域名访问，这是可以做到的。我们应该明确设置 `domain` 选项为根域名：`domain=site.com`：

```js
// 在 site.com 中
// 使 cookie 在其任何子域名下可以访问：
document.cookie = "user=John; domain=site.com"

// 之后

// 在 forum.site.com
alert(document.cookie); // 也存在 user
```

因为历史原因，`domain=.site.com`（以点开头）也可以正常使用，最好添加点来支持老版本的浏览器。

所以，`domain` 选项允许子域名访问 cookie。

## expires, max-age

默认情况下，如果一个 cookie 没有设置这两个参数中的任何一个，那么在浏览器关闭后，它就会消失。此类 cookies 被称为 "session cookies”。

为了让 cookies 在浏览器关闭后仍然存在，我们可以设置 `expires` 或 `max-age` 其中一个选项。

- **`expires=Tue, 19 Jan 2038 03:14:07 GMT`**

cookie 过期日期，当到了过期时间浏览器会自动删除它。

日期必须是这种格式，GMT 时区。我们可以使用 `date.toUTCString` 方法得到。举个例子，我们可以设置 cookie 在 1 天后过期。

```js
// 在当前时间上加 1 天
let date = new Date(Date.now() + 86400e3);
date = date.toUTCString();
document.cookie = "user=John; expires=" + date;
```

如果我们设置 `expires` 为已经过去的时间，cookie 会被删除。

-  **`max-age=3600`**

一个可以替代 `expires` 的选项，具体说明 cookie 的过期时间距离当前时间的秒数。

如果是 0 或者负数，cookie 会被删除：

```js
// 1 小时后 cookie 会失效
document.cookie = "user=John; max-age=3600";

// 删除 cookie (让 cookie 马上过期)
document.cookie = "user=John; max-age=0";
```  

## secure

- **`secure`**

cookie 应仅在 HTTPS 环境下传输。

**默认情况下，如果我们在 `http://site.com` 设置了 cookie，然后 cookie 在 `https://site.com` 中也会出现，反之亦然。**

也就是说，cookies 是基于域名的，它们不是通过协议来区分的。

有了这个选项，如果一个 cookie 通过 `https://site.com` 设置，然后它不会在相同域名的 HTTP 环境下出现，例如 `http://site.com`。所以，如果一个 cookie 存有敏感内容，不应该在不安全的 HTTP 环境下发送，此时这个选项就派上用场了。

```js
// 假设我们现在在 HTTPS 环境下
// 设置 cookie secure（只在 HTTPS 环境下传输）
document.cookie = "user=John; secure";
```  

## samesite

这是另外一个关于安全的选项，为了防止 XSRF（跨站点请求伪造）攻击。

为了理解它什么时候起效，我们来介绍下以下的攻击情况。

### XSRF 攻击

想象一下，你登录了 `bank.com` 网站。此时：你有了该站点的身份验证 cookie。你的浏览器会随着每次请求把它发送到 `bank.com`，因此，`bank.com` 承认你的身份和你做出的所有敏感经济操作。

现在，在另外一个窗口浏览网页时，你偶然访问了另外一个网站 `evil.com`，该网站有 JavaScript 代码提交了一个表单 `<form action="https://bank.com/pay">` 到 `bank.com`，提交的表单字段能够开始一笔到黑客账户的交易。

你每次访问 `bank.com` 时 cookie 都会发送，即使表单在 `evil.com` 上提交。所以银行识别你的身份并实际执行付款。

![](cookie-xsrf.svg)

这就被称为一个跨站点请求伪造（Cross-Site Request Forgery，简称 XSRF）攻击。

当然，真正的银行会防止出现这种情况。所有 `bank.com` 生成的表单都有一个特殊的字段，所谓的 "xsrf 保护令牌”，邪恶页面既不能生成或者从远程页面获取（它可以在那里提交表单，但是无法获取数据）。而且站点 `bank.com` 每次都会检查收到的表单上的令牌。

但这种防护需要时间来实现：我们需要确保每个表单都有 token 字段，而且必须检查所有的请求。

### 输入 cookie samesite 选项

cookie 的 `samesite` 选项提供了另一种防止此类攻击的方法，（理论上）应该不需要 "xsrf 保护令牌”。

它有两个可选的值：

- **`samesite=strict` (和 `samesite` 没有值一样)**

如果用户来自同一站点之外，那么设置了 `samesite=strict` 的 cookie 永远不会发送。

换句话说，无论用户是跟踪邮件链接或从 `evil.com` 提交表单，或者来自其他域名下的任何操作，cookie 都不会发送。

如果身份验证的 cookies 存在 `samesite` 选项，XSRF 攻击是没有机会成功的，因为 `evil.com` 发起的提交没有 cookies。所以 `bank.com` 无法识别用户，并且不会继续付款。

保护非常有效。只有来自 `bank.com` 的操作才会发送 `samesite` cookie，例如来自 `bank.com` 上另一页面的表单发送。

虽然，这样有一点点不方便。

当用户跟随合法链接来到 `bank.com`，例如他们自己的笔记，他们会感到惊讶，`bank.com` 不能识别他们的身份。实际上，在这种情况下 `samesite=strict` cookies 不会发送。

我们可以使用两个 cookies 来解决这个问题：一个 cookie 用来 "大致识别"，仅用来说 "Hello, John"，另外一个带有 `samesite=strict` 的 cookie 用来验证数据改变的操作。然后来自外部网站的用户会看到欢迎页面，但必须在银行的网站上发起付款，为了第二个 cookie 能被发送。

- **`samesite=lax`**

一种更轻松的方法也能防止 XSRF 攻击并且不会破坏用户体验。

lax 模式，和 `strict` 模式类似，禁止浏览器发送来自外部网站的 cookie，但是增加了一个例外。

`samesite=lax` cookie 在以下两个条件都成立时会被发送：
1. HTTP 方法是安全的（例如 GET 方法，不是 POST）。

    所有安全的 HTTP 方法列表可以看 [RFC7231 规范](https://tools.ietf.org/html/rfc7231)。基本上，这些都是只能用来读取数据但是不能写入数据的方法。他们不能执行任何更改数据的操作。以下链接都是 GET 安全方法。

2. 操作执行顶级导航（在浏览器地址栏中改变 URL）。

    这通常是正确的，但是如果导航是在一个 `<iframe>` 中执行，那么它不是顶级的。此外，JavaScript 的网络请求不执行任何导航，因为它们不适合。

所以，`samesite=lax` 基本上允许最常见的跳转 URL 的操作来获取 cookie。例如，在符合条件的笔记中打开网站链接。

但是任何更复杂的事，比如来自另一网站的网络请求或表单提交都会丢失 cookie。

如果这种情况适合你，那么添加 `samesite=lax` 将不会破坏用户体验并且可以增加保护。

总体来看，`samesite` 是一个很好的选项，但是它有一个重要的缺点：
- `samesite` 会被老版本的浏览器忽略（不兼容），2017 年左右。

**所以如果我们完全依赖 `samesite` 提供保护，那么老版本的浏览器是容易受到攻击的。**

但是我们肯定可以同时使用 `samesite` 和其他的保护措施，例如 xsrf tokens，这样可以增加多一层保护，将来，当老版本的浏览器淘汰时，我们可能会丢弃 xsrf tokens 这种方式。

## httpOnly

这个选项和 JavaScript 没有关系，但是为了完整性我们也提一下它。

web 服务器使用 `Set-Cookie` 标头来设置 cookie。它可以设置 `httpOnly` 这个选项。

这个选项禁止任何 JavaScript 操作访问 cookie。我们使用 `document.cookie` 不能看到 cookie 或操作 cookie。

这被用作预防措施，以保护黑客将自己的 JavaScript 代码注入页面并等待用户访问页面时发起的攻击。这应该是不可能发生的，黑客应该不可能将他们的代码注入我们的网站，但是网站有可能存在漏洞让黑客利用来实现这样的操作。


通常来说，如果发生了这种情况，并且让用户访问了带有黑客 JavaScript 代码的页面，黑客代码执行并获取到 `document.cookie` 包括用户身份验证的 cookie。这样就很糟糕了。

但是如果 cookie 设置了 `httpOnly`，然后 `document.cookie` 不能看到这个 cookie，所以它是受保护的。

## 附录: Cookie 函数

这里有一小组有关 cookies 操作的函数，比 `document.cookie` 手动修改更加方便。

有很多这种 cookie 库，所以这些函数只用于演示。虽然它们都能正常使用。


### getCookie(name)

获取 cookie 最简短的方式是使用 [正则表达式](info:regular-expressions)。

`getCookie(name)` 函数返回该 `name` 对应的 cookie：

```js
// 返回该 `name` 对应的 cookie,
// 如果没找到返回 undefined
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
```

这里的 `new RegExp` 是动态生成的，为了匹配 `; name=<value>`。

请注意 cookie 的值是经过编码的，所以 `getCookie` 使用内置方法 `decodeURIComponent` 来解码。

### setCookie(name, value, options)

使用给定的 `value` 设置 `name` cookie，默认值是 `path=/`（可以修改或添加其他默认值）：

```js run
function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    // 如果需要的话，在这里添加其他默认值
    ...options
  };

  if (options.expires.toUTCString) {
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

// 使用举例：
setCookie('user', 'John', {secure: true, 'max-age': 3600});
```

### deleteCookie(name)

要删除 cookie，我们可以给它设置一个负数的过期时间：

```js
function deleteCookie(name) {
  setCookie(name, "", {
    'max-age': -1
  })
}
```

```warn header="Updating or deleting must use same path and domain"
请注意：当我们更新或者删除一个 cookie 时，我们应该使用和设置 cookie 时相同的路径和域名选项。
```

代码放在: [cookie.js](cookie.js).


## 附录：第三方 cookies

如果 cookie 在用户正在访问的页面外的域名网站设置，则被称为第三方 cookie。

例如：
1. `site.com` 网站的一个页面加载了另外一个网站的 banner：`<img src="https://ads.com/banner.png">`。
2. 和 banner 一起，`ads.com` 的远程服务器可能设置 `Set-Cookie` 标头比如 `id=1234`。此类 cookie 源自 `ads.com` 域名，并且只在 `ads.com` 下是可见的：

    ![](cookie-third-party.svg)

3. 下次访问 `ads.com` 网站时，远程服务器获取 `id` cookie 并且识别用户身份。

    ![](cookie-third-party-2.svg)

4. 更为重要的是，当用户从 `site.com` 网站移动到另外一个带有 banner 的 `other.com` 上时，然后 `ads.com` 获取它所属的 cookie，从而识别用户身份并跟踪他在网站之间跳转：

    ![](cookie-third-party-3.svg)


由于它的性质，第三方 cookies 传统上用于跟踪和广告服务。它们绑定在原始域名上，因此 `ads.com` 可以跟踪到不同站点下的相同用户，如果他们访问的话。

当然，一些用户不喜欢被跟踪，所以浏览器禁止此类 cookies。

此外，一些现代浏览器对此类 cookies 采用特殊策略：
- Safari 浏览器根本不允许第三方 cookies。
- Firefox 浏览器附带一个第三方域名的黑名单，可以阻止第三方 cookies。


```smart
如果我们加载了一段第三方域的脚本，例如 `<script src="https://google-analytics.com/analytics.js">`，并且这段脚本使用 `document.cookie` 设置了 cookie，然后此类 cookie 不是第三方。

如果脚本设置了一个 cookie，那么无论脚本来自何处 —— 这个 cookie 都属于当前网页的域下。
```

## 附录: GDPR

本主题和 JavaScript 无关，只是设置 cookies 时的一些注意事项。

欧洲有一项名为 GDPR 的立法，它对网站实施一套尊重用户隐私的规则。其中一条规则是要求用户明确许可了才可以跟踪 cookies。

请注意，这只是关于跟踪/识别/授权 cookies。

所以，如果我们设置一个只保存了一些信息的 cookie，但是既不跟踪也不识别用户，那么我们可以自由的设置它。

但是如果我们要设置带有身份验证的 cookie 或跟踪 id，那么必须得到用户允许。

网站在遵循 GDPR 下通常有两种做法。你应该已经在网站中看到过它们了：

1. 如果一个网站想要为已经经过身份验证的用户设置跟踪 cookies。

    为此，注册表格必须要有一个选择框，例如“接受隐私政策”（描述怎么使用 cookie），用户必须勾选它，然后网站才可以自由设置身份验证 cookies。

2. 如果一个网站想要为每个人设置跟踪 cookies。

    为了合法实现，网站为新用户显示一个模态框，然后要求他们同意设置 cookies。然后网站才设置 cookie 并且让用户看到网站内容。虽然这对新用户来说可能是令人不安的。没有人喜欢看到 "必须点击" 的模态框而不是网站内容。但是 GDPR 要求得到用户明确的同意。


GDPR 不仅只涉及 cookie，还涉及其他与隐私相关的问题，但这超出了我们的讨论范围。


## 总结

`document.cookie` 提供了对 cookies 的访问
- 写入操作只会修改其中存在的 cookie。
- name/value 必须编码。
- 一个 cookie 最大 4kb，每个网站最多 20+ 个 cookies（取决于浏览器）。

Cookie 选项：
- `path=/`，默认为当前路径，使 cookie 仅在该路径下可见。
- `domain=site.com`，默认 cookie 仅在当前域名下可见，如果明确设置了域名，可以让 cookie 在子域名下也可见。
- `expires` 或 `max-age` 设置 cookie 过期时间，如果没有设置，则当浏览器关闭时 cookie 就失效了。
- `secure` 使 cookie 仅在 HTTPS 下有效。
- `samesite` 如果请求来自外部网站，禁止浏览器发送 cookie，这样有助于防止 XSRF 攻击。

另外：
- 浏览器可能会禁用第三方 cookies，例如 Safari 浏览器默认就会这样做。
- 在为欧洲人民设置跟踪 cookie 时，GDPR 要求得到用户明确许可。
