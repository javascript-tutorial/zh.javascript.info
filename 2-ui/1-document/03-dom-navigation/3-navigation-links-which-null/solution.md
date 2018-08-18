1. 是的，这是真的。`elem.lastChild` 一直是最后一个元素，它就没有 `nextSibling` ，所有如果存在子节点，这个问题的答案就是正确。
2. 不，这是错的，因为  `elem.children[0]` 是元素中的第一个子元素。但是或许有非元素的节点在它之前。所以 `previousSibling` 或许是一个文本节点。

请注意，对于这两种情况，如果没有子节点就会出现错误。比如说如果 `elem.lastChild` 是 `null`，我们就访问不到 `elem.lastChild.nextSibling`。
