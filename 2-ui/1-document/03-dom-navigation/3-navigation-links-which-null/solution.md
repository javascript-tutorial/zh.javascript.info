<<<<<<< HEAD
1. 是的，这是真的。`elem.lastChild` 就是最后一个元素，它没有 `nextSibling`。
2. 不，这是错的，因为  `elem.children[0]` 是元素中的第一个子元素。但是在它前面可能存在非元素的节点。所以 `previousSibling` 可能是一个文本节点。

请注意，对于这两种情况，如果没有子节点，那么就会报错。

如果这里没有子节点，那么 `elem.lastChild` 是 `null`，所以我们就访问不到 `elem.lastChild.nextSibling`。并且 `elem.children` 是空的（像一个空数组一样 `[]`）。
=======
1. Yes, true. The element `elem.lastChild` is always the last one, it has no `nextSibling`.
2. No, wrong, because `elem.children[0]` is the first child *among elements*. But there may exist non-element nodes before it. So `previousSibling` may be a text node.

Please note: for both cases if there are no children, then there will be an error.

If there are no children, `elem.lastChild` is `null`, so we can't access `elem.lastChild.nextSibling`. And the collection `elem.children` is empty (like an empty array `[]`).
>>>>>>> 62299ed853674c4fd1427cd310516d5535bce648
