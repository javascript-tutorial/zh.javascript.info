
首先，我们需要找到所有外部链接。

这里有两种方式。

第一种是使用 `document.querySelectorAll('a')` 找到所有链接，然后过滤出我们需要的部分：

```js
let links = document.querySelectorAll('a');

for (let link of links) {
*!*
  let href = link.getAttribute('href');
*/!*
  if (!href) continue; // 没有特性

  if (!href.includes('://')) continue; // 没有协议

  if (href.startsWith('http://internal.com')) continue; // 内部的

  link.style.color = 'orange';
}
```

请注意：我们用的是 `link.getAttribute('href')`。而不是 `link.href`，因为我们需要的是来自 HTML 的值。

……另一种更简单的方法，是使用 CSS 选择器进行检查：

```js
// 查找所有 href 中包含 :// 的链接
// 但 href 不是以 http://internal.com 开头
let selector = 'a[href*="://"]:not([href^="http://internal.com"])';
let links = document.querySelectorAll(selector);

links.forEach(link => link.style.color = 'orange');
```
