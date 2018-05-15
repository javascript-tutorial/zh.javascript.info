明智的选择是 `WeakSet`：

```js
let messages = [
    {text: "Hello", from: "John"},
    {text: "How goes?", from: "John"},
    {text: "See you soon", from: "Alice"}
];

let readMessages = new WeakSet();

// 两个信息已读
readMessages.add(messages[0]);
readMessages.add(messages[1]);
// readMessages 包含两个元素

// ...让我们再读一遍第一条信息！
readMessages.add(messages[0]);
// readMessages 仍然有两个不重复的元素

// 回答：message[0] 已读？
alert("Read message 0: " + readMessages.has(messages[0])); // true

messages.shift();
// 现在 readMessages 有一个元素（技术上来说内存可能稍后被清理）
```

`WeakSet` 允许存储一系列的信息并且很容易就能检查它包含的信息是否存在。

它会自动清理自身。但是作为交换，我们不能对它进行迭代。我们不能直接获取所有已读信息。但是我们可以通过迭代所有信息然后找出存在于 set 的那些信息来完成这个功能。

附：如果信息被其他代码管理，那么仅为了自己的功能给每个信息添加一个属性也许会很危险，但是我们可以将它改为 symbol 来规避冲突。

像这样：
```js
// the symbolic property is only known to our code
let isRead = Symbol("isRead");
messages[0][isRead] = true;
```

现在即使其他人的代码使用 `for..in` 循环信息的属性，我们的秘密标识也不会出现。
