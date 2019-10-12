# 文本解码器（TextDecoder） 和 文本编码器（TextEncoder）

如果二进制数据实际上是一个字符串怎么办？例如，我们收到了一个包含文本数据的文件。

内置的 [TextDecoder](https://encoding.spec.whatwg.org/#interface-textdecoder) 对象在给定缓冲区（buffer）和编码格式（encoding）的情况下，能够将值读取到实际的 JavaScript 字符串中。

首先我们需要创建：
```js
let decoder = new TextDecoder([label], [options]);
```

- **`label`** -- 编码格式，默认为 `utf-8`，但同时也支持 `big5`，`windows-1251` 等许多其他编码格式。
- **`options`** -- 可选对象：
  - **`fatal`** -- 布林值，如果为 `true` 则抛出无效（不可解码）字符异常，否则（默认）替换为字符 `\uFFFD`。
  - **`ignoreBOM`** -- 布林值，如果为 `true` 则忽略字节顺序标记（BOM）（可选的字节顺序统一码（Unicode）标记），极少情况会需要。

...... 然后开始解码：

```js
let str = decoder.decode([input], [options]);
```

- **`input`** -- 对 `BufferSource` 进行解码。
- **`options`** -- 可选对象：
  - **`stream`** -- 当传入数据块时 `decoder` 被重复调用，则解码流为true。这种情况下，多字节的字符可能偶尔会在块与块之间被分割。这个选项告诉 `TextDecoder` 去记住 “未完成” 的字符并且在下一个数据块来的时候进行解码。

例如：

```js run
let uint8Array = new Uint8Array([72, 101, 108, 108, 111]);

alert( new TextDecoder().decode(uint8Array) ); // Hello
```


```js run
let uint8Array = new Uint8Array([228, 189, 160, 229, 165, 189]);

alert( new TextDecoder().decode(uint8Array) ); // 你好
```

我们可以通过为其创建子数组视图来解码部分缓冲区：


```js run
let uint8Array = new Uint8Array([0, 72, 101, 108, 108, 111, 0]);

// 该字符串位于中间
// 在不复制任何内容的前提下，创建一个新的视图
let binaryString = uint8Array.subarray(1, -1);

alert( new TextDecoder().decode(binaryString) ); // Hello
```

## 文本编码器

[TextEncoder](https://encoding.spec.whatwg.org/#interface-textencoder) 做了相反的事情 -- 将字符串转换为字节。

语法为：

```js run
let encoder = new TextEncoder();
```

仅支持的编码格式为 `utf-8` 。

它有两种方法：
- **`encode(str)`** -- 从字符串中返回 `Uint8Array` 。
- **`encodeInto(str, destination)`** -- 将 `str` 编码为 `destination`，该目标必须为 `Uint8Array`。

```js run
let encoder = new TextEncoder();

let uint8Array = encoder.encode("Hello");
alert(uint8Array); // 72,101,108,108,111
```
