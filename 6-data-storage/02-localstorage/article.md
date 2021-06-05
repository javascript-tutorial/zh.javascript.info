# LocalStorage，sessionStorage

Web 存储对象 `localStorage` 和 `sessionStorage` 允许我们在浏览器上保存键/值对。

它们有趣的是，在页面刷新后（对于 `sessionStorage`）甚至浏览器完全重启（对于 `localStorage`）后，数据仍然保留在浏览器中。我们很快就会看到。

我们已经有了 cookie。为什么还要其他存储对象呢？

- 与 cookie 不同，Web 存储对象不会随每个请求被发送到服务器。因此，我们可以保存更多数据。大多数浏览器都允许保存至少 2MB 的数据（或更多），并且具有用于配置数据的设置。
- 还有一点和 cookie 不同，服务器无法通过 HTTP header 操纵存储对象。一切都是在 JavaScript 中完成的。
- 存储绑定到源（域/协议/端口三者）。也就是说，不同协议或子域对应不同的存储对象，它们之间无法访问彼此数据。

两个存储对象都提供相同的方法和属性：

- `setItem(key, value)` —— 存储键/值对。
- `getItem(key)` —— 按照键获取值。
- `removeItem(key)` —— 删除键及其对应的值。
- `clear()` —— 删除所有数据。
- `key(index)` —— 获取该索引下的键名。
- `length` —— 存储的内容的长度。

正如你所看到的，它就像一个 `Map` 集合（`setItem/getItem/removeItem`），但也允许通过 `key(index)` 来按索引访问。

让我们看看它是如何工作的吧。

## localStorage 示例

`localStorage` 最主要的特点是：

- 在同源的所有标签页和窗口之间共享数据。
- 数据不会过期。它在浏览器重启甚至系统重启后仍然存在。

例如，如果你运行此代码……

```js run
localStorage.setItem('test', 1);
```

……然后关闭/重新打开浏览器，或者只是在不同的窗口打开同一页面，然后你可以这样获取它：

```js run
alert( localStorage.getItem('test') ); // 1
```

我们只需要在同一个源（域/端口/协议），URL 路径可以不同。

在所有同源的窗口之间，`localStorage` 数据可以共享。因此，如果我们在一个窗口中设置了数据，则在另一个窗口中也可以看到数据变化。

## 类对象形式访问

我们还可以像使用一个普通对象那样，读取/设置键，像这样：

```js run
// 设置 key
localStorage.test = 2;

// 获取 key
alert( localStorage.test ); // 2

// 删除 key
delete localStorage.test;
```

这是历史原因造成的，并且大多数情况下都可行，但通常不建议这样做，因为：

1. 如果键是由用户生成的，那么它可以是任何内容，例如 `length` 或 `toString`，也可以是 `localStorage` 的另一种内建方法。在这种情况下，`getItem/setItem` 可以正常工作，而类对象访问的方式则会失败：
    ```js run
    let key = 'length';
    localStorage[key] = 5; // Error，无法对 length 进行赋值
    ```

2. 有一个 `storage` 事件，在我们更改数据时会触发。但以类对象方式访问时，不会触发该事件。我们将在本章的后面看到。

## 遍历键

正如我们所看到的，这些方法提供了“按照键获取/设置/删除”的功能。但我们如何获取所有保存的值或键呢？

不幸的是，存储对象是不可迭代的。

一种方法是像遍历数组那样遍历它们：

```js run
for(let i = 0; i < localStorage.length; i++) {
  let key = localStorage.key(i);
  alert(`${key}: ${localStorage.getItem(key)}`);
}
```

另一个方式是使用 `for key in localStorage` 循环，就像处理常规对象一样。

它会遍历所有的键，但也会输出一些我们不需要的内建字段。

```js run
// 不好的尝试
for(let key in localStorage) {
  alert(key); // 显示 getItem，setItem 和其他内建的东西
}
```

……因此，我们需要使用 `hasOwnProperty` 检查来过滤掉原型中的字段：

```js run
for(let key in localStorage) {
  if (!localStorage.hasOwnProperty(key)) {
    continue; // 跳过像 "setItem"，"getItem" 等这样的键
  }
  alert(`${key}: ${localStorage.getItem(key)}`);
}
```

……或者，使用 `Object.keys` 获取只属于“自己”的键，然后如果需要，可以遍历它们：

```js run
let keys = Object.keys(localStorage);
for(let key of keys) {
  alert(`${key}: ${localStorage.getItem(key)}`);
}
```

后者有效，因为 `Object.keys` 只返回属于对象的键，会忽略原型上的。


## 仅字符串

请注意，键和值都必须是字符串。

如果是任何其他类型，例数字或对象，它会被自动转换为字符串。

```js run
localStorage.user = {name: "John"};
alert(localStorage.user); // [object Object]
```

我们可以使用 `JSON` 来存储对象：

```js run
localStorage.user = JSON.stringify({name: "John"});

// sometime later
let user = JSON.parse( localStorage.user );
alert( user.name ); // John
```

也可以对整个存储对象进行字符串化处理，例如出于调试目的：

```js run
// 为 JSON.stringify 增加了格式设置选项，以使对象看起来更美观
alert( JSON.stringify(localStorage, null, 2) );
```


## sessionStorage

`sessionStorage` 对象的使用频率比 `localStorage` 对象低得多。

属性和方法是相同的，但是它有更多的限制：

- `sessionStorage` 的数据只存在于当前浏览器标签页。
  - 具有相同页面的另一个标签页中将会有不同的存储。
  - 但是，它在同一标签页下的 iframe 之间是共享的（假如它们来自相同的源）。
- 数据在页面刷新后仍然保留，但在关闭/重新打开浏览器标签页后不会被保留。

让我们看看它的运行效果。

运行此代码……

```js run
sessionStorage.setItem('test', 1);
```

……然后刷新页面。这时你仍然可以获取到数据：

```js run
alert( sessionStorage.getItem('test') ); // after refresh: 1
```

……但是，如果你在另一个新的标签页中打开此页面，然后在新页面中再次运行上面这行代码，则会得到 `null`，表示“未找到数据”。

这是因为 `sessionStorage` 不仅绑定到源，还绑定在同一浏览器标签页。因此，`sessionStorage` 很少被使用。

## Storage 事件

当 `localStorage` 或 `sessionStorage` 中的数据更新后，[storage](https://www.w3.org/TR/webstorage/#the-storage-event) 事件就会触发，它具有以下属性：

- `key` —— 发生更改的数据的 `key`（如果调用的是 `.clear()` 方法，则为 `null`）。
- `oldValue` —— 旧值（如果是新增数据，则为 `null`）。
- `newValue` —— 新值（如果是删除数据，则为 `null`）。
- `url` —— 发生数据更新的文档的 url。
- `storageArea` —— 发生数据更新的 `localStorage` 或 `sessionStorage` 对象。

重要的是：该事件会在所有可访问到存储对象的 `window` 对象上触发，导致当前数据改变的 `window` 对象除外。

我们来详细解释一下。

想象一下，你有两个窗口，它们具有相同的页面。所以 `localStorage` 在它们之间是共享的。

```online
你可以想在浏览器的两个窗口中打开此页面来测试下面的代码。
```

如果两个窗口都在监听 `window.onstorage` 事件，那么每个窗口都会对另一个窗口中发生的更新作出反应。

```js run
// 在其他文档对同一存储进行更新时触发
window.onstorage = event => { // 等同于 window.addEventListener('storage', () => {
  if (event.key != 'now') return;
  alert(event.key + ':' + event.newValue + " at " + event.url);
};

localStorage.setItem('now', Date.now());
```

请注意，该事件还包含：`event.url` —— 发生数据更新的文档的 url。

并且，`event.storageArea` 包含存储对象 —— `sessionStorage` 和 `localStorage` 具有相同的事件，所以 `event.storageArea` 引用了被修改的对象。我们可能会想设置一些东西，以“响应”更改。

**这允许同源的不同窗口交换消息。**

现代浏览器还支持 [Broadcast channel API](mdn:/api/Broadcast_Channel_API)，这是用于同源窗口之间通信的特殊 API，它的功能更全，但被支持的情况不好。有一些库基于 `localStorage` 来 polyfill 该 API，使其可以用在任何地方。

## 总结

Web 存储对象 `localStorage` 和 `sessionStorage` 允许我们在浏览器中保存键/值对。
- `key` 和 `value` 都必须为字符串。
- 存储大小限制为 5MB+，具体取决于浏览器。
- 它们不会过期。
- 数据绑定到源（域/端口/协议）。

| `localStorage` | `sessionStorage` |
|----------------|------------------|
| 在同源的所有标签页和窗口之间共享数据 | 在当前浏览器标签页中可见，包括同源的 iframe |
| 浏览器重启后数据仍然保留 | 页面刷新后数据仍然保留（但标签页关闭后数据则不再保留） |

API：

- `setItem(key, value)` —— 存储键/值对。
- `getItem(key)` —— 按照键获取值。
- `removeItem(key)` —— 删除键及其对应的值。
- `clear()` —— 删除所有数据。
- `key(index)` —— 获取该索引下的键名。
- `length` —— 存储的内容的长度。
- 使用 `Object.keys` 来获取所有的键。
- 我们将键作为对象属性来访问，在这种情况下，不会触发 `storage` 事件。

Storage 事件：

- 在调用 `setItem`，`removeItem`，`clear` 方法后触发。
- 包含有关操作的所有数据（`key/oldValue/newValue`），文档 `url` 和存储对象 `storageArea`。
- 在所有可访问到存储对象的 `window` 对象上触发，导致当前数据改变的 `window` 对象除外（对于 `sessionStorage` 是在当前标签页下，对于 `localStorage` 是在全局，即所有同源的窗口）。
