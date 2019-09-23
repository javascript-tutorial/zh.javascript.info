<<<<<<< HEAD:1-js/05-data-types/07-map-set-weakmap-weakset/04-recipients-read/solution.md
明智的选择是 `WeakSet`：
=======
Let's store read messages in `WeakSet`:
>>>>>>> 4d654318ccb6d37d6cefc9b859cf111ff3c96b27:1-js/05-data-types/08-weakmap-weakset/01-recipients-read/solution.md

```js
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];

let readMessages = new WeakSet();

// 两个消息已读
readMessages.add(messages[0]);
readMessages.add(messages[1]);
// readMessages 包含两个元素

// ...让我们再读一遍第一条消息！
readMessages.add(messages[0]);
// readMessages 仍然有两个不重复的元素

// 回答：message[0] 已读？
alert("Read message 0: " + readMessages.has(messages[0])); // true

messages.shift();
// 现在 readMessages 有一个元素（技术上来说内存可能稍后被清理）
```

`WeakSet` 允许存储一系列的消息并且很容易就能检查它包含的消息是否还存在。

<<<<<<< HEAD:1-js/05-data-types/07-map-set-weakmap-weakset/04-recipients-read/solution.md
它会自动清理自身。但是作为交换，我们不能对它进行迭代。我们不能直接获取所有已读消息。但是我们可以通过迭代所有消息然后找出存在于 set 的那些消息来完成这个功能。

附：如果消息被其他代码管理，那么仅为了自己的功能给每个消息添加一个属性也许会很危险，但是我们可以将它改为 symbol 来规避冲突。
=======
It cleans up itself automatically. The tradeoff is that we can't iterate over it,  can't get "all read messages" from it directly. But we can do it by iterating over all messages and filtering those that are in the set.

Another, different solution could be to add a property like `message.isRead=true` to a message after it's read. As messages objects are managed by another code, that's generally discouraged, but we can use a symbolic property to avoid conflicts.
>>>>>>> 4d654318ccb6d37d6cefc9b859cf111ff3c96b27:1-js/05-data-types/08-weakmap-weakset/01-recipients-read/solution.md

像这样：
```js
// the symbolic property is only known to our code
let isRead = Symbol("isRead");
messages[0][isRead] = true;
```

<<<<<<< HEAD:1-js/05-data-types/07-map-set-weakmap-weakset/04-recipients-read/solution.md
现在即使其他人的代码使用 `for..in` 循环消息的属性，我们的秘密标识也不会出现。
=======
Now third-party code probably won't see our extra property.

Although symbols allow to lower the probability of problems, using `WeakSet` is better from the architectural point of view.
>>>>>>> 4d654318ccb6d37d6cefc9b859cf111ff3c96b27:1-js/05-data-types/08-weakmap-weakset/01-recipients-read/solution.md
