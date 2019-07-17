 # LocalStorage, sessionStorage

Web 存储对象 `localStorage` 和 `sessionStorage` 允许你在浏览器上保存键值对。

有趣的是，数据在页面刷新 (`sessionStorage`) 甚至浏览器完全重启 (`localStorage`) 后仍然保留。我们很快会看到。

我们已经有了 `cookies`。为什么还要额外的 web 存储对象？

- 与 `cookies` 不同，web 存储对象不会随着每次请求发送到服务端。因此，我们可以保存更多数据。大部分浏览器允许保存至少 2M 字节的数据 (或者更多)，并且是可配置的。
- 还有一点和 `cookies` 不同，服务端不能通过 HTTP 头部操作存储对象。一切都在 `JavaScript` 中完成。
- 存储对象的来源绑定在 `域/协议/端口 三者之一` 下，也就是说，不同协议或者子域保存不同的存储对象，它们不能相互访问数据。

两个存储对象都提供相同的方法和属性：

- `setItem(key, value)` -- 存储键值对。
- `getItem(key)` -- 根据键名获取相应的值。
- `removeItem(key)` -- 删除该键对应的键值对。
- `clear()` -- 清空存储。
- `key(index)` -- 获取该索引下的键名。
- `length` -- 存储对象的长度。

正如你所看到的，它就像一个 `Map` 收集器 (`setItem/getItem/removeItem`)。但是也保持着元素顺序，并且允许通过索引访问 `key(index)` 。

让我们看看它是如何工作的。

## localStorage 示例

`localStorage` 最主要的特点是：

- 来自同一来源的数据在所有标签和窗口之间共享。
- 数据不会过期。它在浏览器重启甚至系统重启后仍然保留。

例如，如果你运行此代码…

```js run
localStorage.setItem('test', 1);
```

然后关闭重新打开浏览器或者只是在不同的窗口打开同一页面，然后你就能看到：

```js run
alert( localStorage.getItem('test') ); // 1
```

我们只要求数据存储在同一域/端口/协议上，`url` 路径可以是不同的。

 `localStorage` 在相同来源下的所有窗口都是共享的。所以，如果我们在其中一个窗口设置了数据，在另外一个窗口中可以看到数据也发生了变化。


## 类似对象形式访问

我们也可以使用普通对象读取/设置键的方式，像这样：

```js run
// set key
localStorage.test = 2;

// get key
alert( localStorage.test ); // 2

// remove key
delete localStorage.test;
```

这是历史原因允许的，并且大部分是有效的。但是通常不推荐这种做法，有两个原因：

1. 如果键是由用户生成的，那么它可以是任何内容，例如 `length` 或 `toString`，或者是 `localStorage` 下其他的内置方法。在这种情况下，`getItem/setItem` 可以正常使用，类似对象访问的方式则会失败。
2. 有一个 `storage` 事件，在我们改变数据时会触发。但是以类似对象形式访问时，该事件不会触发。我们可以在本章节后面看到。

## 循环键

正如我们看到的，这些方法提供了按键获取/设置/删除的功能。但是我们怎么能够保存所有的值或者键呢？

不幸的是，存储对象不可迭代。

一种方法是在数组上循环遍历它们：

```js run
for(let i=0; i<localStorage.length; i++) {
  let key = localStorage.key(i);
  alert(`${key}: ${localStorage.getItem(key)}`);
}
```

另一个方法是使用 `for key in localStorage` 循环，就像我们循环普通对象一样。

它循环所有的键，但是也输出了我们不需要的的几个内置字段。

```js run
// bad try
for(let key in localStorage) {
  alert(key); // 显示 getItem，setItem 和其他内置函数
}
```

所以我们需要使用 `hasOwnProperty` 来过滤掉原型中的字段：

```js run
for(let key in localStorage) {
  if (!localStorage.hasOwnProperty(key)) {
    continue; // 跳过键，如 setItem，getItem 等
  }
  alert(`${key}: ${localStorage.getItem(key)}`);
}
```

或者使用 `Object.keys` 获取本身的键，然后根据需要循环它：

```js run
let keys = Object.keys(localStorage);
for(let key of keys) {
  alert(`${key}: ${localStorage.getItem(key)}`);
}
```

后者有效，因为 `Object.keys` 只返回属于对象的键，忽略原型。

## 只有字符串

请注意键和值都必须是字符串。

如果是其他类型，例如数字或对象，它将自动转换为字符串。

```js run
sessionStorage.user = {name: "John"};
alert(sessionStorage.user); // [object Object]
```

我们可以使用 `JSON` 来存储对象：

```js run
sessionStorage.user = JSON.stringify({name: "John"});

// sometime later
let user = JSON.parse( sessionStorage.user );
alert( user.name ); // John
```

为了调试的话，也可以将整个存储对象转为字符串。

```js run
// added formatting options to JSON.stringify to make the object look nicer
alert( JSON.stringify(localStorage, null, 2) );
```

## sessionStorage

 `sessionStorage` 的使用频率比 `localStorage` 少。

属性和方法是相同的，但是它具有更多的局限性：

- `sessionStorage` 只存在于当前浏览器标签页。
	- 具有相同页面的另外一个浏览器标签页中将会有不同的存储。
	- 但是它在当前标签页下的 `iframes` 之间是共享的(假如它们是同一来源)。
- 数据在页面刷新后还保留，但是在关闭重新打开浏览器标签页后不会被保留。

让我们看看它是怎么运行的。

运行此代码…

```js run
sessionStorage.setItem('test', 1);
```

然后刷新页面。这时候你还是可以获取到数据：

```js run
alert( sessionStorage.getItem('test') ); // after refresh: 1
```

但是如果你在新的标签页中打开此页面，然后在新的页面中运行以上代码，则会返回 `null`，意思是找不到数据。

这是因为是 `sessionStorage` 不仅仅要求数据同源，还需要在同一浏览器标签页下。因此，请谨慎使用 `sessionStorage`。

## Storage 事件

当 `localStorage` 或 `sessionStorage` 中的数据更新后，[storage 事件](https://www.w3.org/TR/webstorage/#the-storage-event)将会触发，具有以下特征：

- `key` — `key` 将会被改变(如果调用的是 `.clear()` 方法，`key` 会返回 `null`)。
- `oldValue` — 旧值(如果是新增 `key`，会返回 `null`)。
- `newValue` — 新值(如果是删除 `key`，会返回 `null`)。
- `url` — 数据发生更新时的文档链接。
- `storageArea` — 数据发生更新的任何一个 `localStorage` 或 `sessionStorage` 对象。

最重要的是：事件将会在所有能访问到当前存储对象的 `window` 下触发，除了当前触发了事件的 `window`。

我们来详细说明一下。

想象一下，你有两个两个窗口，每个窗口都有相同的页面。所以 `localStorage` 在它们之间是共享的。

```online
你可以在两个浏览器窗口中打开当前页面来测试下面的代码。
```

如果两个窗口都监听 `window.onstorage` 事件，那么每个窗口的事件将会在另外一个窗口中数据更新后被触发。

```js run
// 在另外一个具有相同存储对象更新后触发
window.onstorage = event => {
  if (event.key != 'now') return;
  alert(event.key + ':' + event.newValue + " at " + event.url);
};

localStorage.setItem('now', Date.now());
```

请注意，该事件还包括 `event.url` -- 数据更新时的文档链接。

此外，`event.storageArea` 还会返回存储对象 -- 因为 `sessionStorage` 和 `localStorage` 具有相同的事件，所以 `storageArea` 会返回数据更新了的那一个存储对象。为了响应数据更新，我们也许会在里面设置一些东西。

** 这允许来自相同来源的不同窗口交换消息。 **

现代浏览器还支持 [Broadcast channel API](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API)，这是用于同源窗口之间通信的特殊 API，它的功能更加全面，但是兼容性还不好。有一些库可以基于 `localStorage`  polyfill 该 API，使其可以用在任何地方。


## 总结

Web 存储对象 `localStorage` 和 `sessionStorage` 允许我们在浏览器中保存键值对。

- 所有的 `key` 和 `value` 都必须是字符串。
- 存储大小限制为 2mb+，取决于浏览器也会有所不同。
- 它们不会过期。
- 数据绑定在同一来源下（域名/端口/协议）。

| `localStorage` | `sessionStorage` |
|----------------|------------------|
| 在同源的所有标签页和窗口之间共享 | 在浏览器标签中可见，包括来自同一来源的iframe |
| 浏览器重启后数据仍然保留 | 页面刷新后数据仍然保留（不包括标签页关闭） |

API：

- `setItem(key, value)` -- 存储键值对。
- `getItem(key)` -- 根据键名获取相应的值。
- `removeItem(key)` -- 删除该键对应的键值对。
- `clear()` -- 清空存储。
- `key(index)` -- 获取该索引下的键名。
- `length` -- 存储对象的长度。
- 使用 `Object.keys` 获取所有的键。
- 假如我们使用对象属性的形式来访问键，则 `storage` 事件不会被触发。

Storage 事件：

- 在调用 `setItem`，`removeItem`，`clear`方法后触发。
- 包含有关操作，文档 `url` 和存储对象的所有数据。
- 在除当前触发了事件的对象以外所有能访问到存储对象的 `window` 对象上都会被触发（在 `sessionStorage` 有效范围的同一标签页下，在 `localStorage` 的有效范围下）。
