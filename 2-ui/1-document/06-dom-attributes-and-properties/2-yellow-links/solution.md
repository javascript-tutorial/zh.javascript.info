
首先，我们需要找到所有外部引用。

这里有两种办法。

第一种是使用 `document.querySelectorAll('a')` 然后过滤出我们需要的那部分：

```js
let links = document.querySelectorAll('a');

for (let link of links) {
*!*
  let href = link.getAttribute('href');
*/!*
  if (!href) continue; // no attribute

  if (!href.includes('://')) continue; // no protocol

  if (href.startsWith('http://internal.com')) continue; // internal

  link.style.color = 'orange';
}
```

请注意：我们用的是 `link.getAttribute('href')`。而不是 `link.href`，因为我们需要的是 HTML 上的值。

……除此之外，有一个更简便的方式是利用 CSS 选择器的伪类选择器：

```js
// 查找所有 href 中包含 :// 的链接
// 但 href 不是以 http://internal.com 开头
let selector = 'a[href*="://"]:not([href^="http://internal.com"])';
let links = document.querySelectorAll(selector);

links.forEach(link => link.style.color = 'orange');
```
