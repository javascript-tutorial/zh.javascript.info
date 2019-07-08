<<<<<<< HEAD
1. 是的，这是真的。`elem.lastChild` 一直是最后一个元素，它就没有 `nextSibling` ，所有如果存在子节点，这个问题的答案就是正确。
2. 不，这是错的，因为  `elem.children[0]` 是元素中的第一个子元素。但是或许有非元素的节点在它之前。所以 `previousSibling` 或许是一个文本节点。

请注意，对于这两种情况，如果没有子节点就会出现错误。比如说如果 `elem.lastChild` 是 `null`，我们就访问不到 `elem.lastChild.nextSibling`。
=======
1. Yes, true. The element `elem.lastChild` is always the last one, it has no `nextSibling`.
2. No, wrong, because `elem.children[0]` is the first child *among elements*. But there may exist non-element nodes before it. So `previousSibling` may be a text node. Also, if there are no children, then trying to access `elem.children[0]`

Please note: for both cases if there are no children, then there will be an error.

If there are no children, `elem.lastChild` is `null`, so we can't access `elem.lastChild.nextSibling`. And the collection `elem.children` is empty (like an empty array `[]`).
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d
