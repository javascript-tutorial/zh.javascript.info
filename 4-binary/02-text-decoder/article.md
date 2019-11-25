<<<<<<< HEAD
# 文本解码器（TextDecoder） 和 文本编码器（TextEncoder）

如果二进制数据实际上是一个字符串怎么办？例如，我们收到了一个包含文本数据的文件。

内置的 [TextDecoder](https://encoding.spec.whatwg.org/#interface-textdecoder) 对象在给定缓冲区（buffer）和编码格式（encoding）的情况下，能够将值读取到实际的 JavaScript 字符串中。

首先我们需要创建：
=======
# TextDecoder and TextEncoder

What if the binary data is actually a string? For instance, we received a file with textual data.

The build-in [TextDecoder](https://encoding.spec.whatwg.org/#interface-textdecoder) object allows to read the value into an actual JavaScript string, given the buffer and the encoding.

We first need to create it:
>>>>>>> 79417c6e73645d37f184f0cc7e4bc3353e85224f
```js
let decoder = new TextDecoder([label], [options]);
```

<<<<<<< HEAD
- **`label`** -- 编码格式，默认为 `utf-8`，但同时也支持 `big5`，`windows-1251` 等许多其他编码格式。
- **`options`** -- 可选对象：
  - **`fatal`** -- 布尔值，如果为 `true` 则抛出无效（不可解码）字符异常，否则（默认）替换为字符 `\uFFFD`。
  - **`ignoreBOM`** -- 布尔值，如果为 `true` 则忽略字节顺序标记（BOM）（可选的字节顺序统一码（Unicode）标记），极少情况会需要。

…… 然后开始解码：
=======
- **`label`** -- the encoding, `utf-8` by default, but `big5`, `windows-1251` and many other are also supported.
- **`options`** -- optional object:
  - **`fatal`** -- boolean, if `true` then throw an exception for invalid (non-decodable) characters, otherwise (default) replace them with character `\uFFFD`.
  - **`ignoreBOM`** -- boolean, if `true` then ignore BOM (an optional byte-order unicode mark), rarely needed.

...And then decode:
>>>>>>> 79417c6e73645d37f184f0cc7e4bc3353e85224f

```js
let str = decoder.decode([input], [options]);
```

<<<<<<< HEAD
- **`input`** -- 要被解码的 `BufferSource` 。
- **`options`** -- 可选对象：
  - **`stream`** -- true 为解码流（streams），这时候 decoder 会以传入的数据块（chunks）为参数被重复调用。这种情况下，多字节的字符可能偶尔会在块与块之间被分割。这个选项告诉 `TextDecoder` 去记住 “未完成” 的字符并且在下一个数据块来的时候进行解码。

例如：
=======
- **`input`** -- `BufferSource` to decode.
- **`options`** -- optional object:
  - **`stream`** -- true for decoding streams, when `decoder` is called repeatedly with incoming chunks of data. In that case a multi-byte character may occasionally split between chunks. This options tells `TextDecoder` to memorize "unfinished" characters and decode them when the next chunk comes.

For instance:
>>>>>>> 79417c6e73645d37f184f0cc7e4bc3353e85224f

```js run
let uint8Array = new Uint8Array([72, 101, 108, 108, 111]);

alert( new TextDecoder().decode(uint8Array) ); // Hello
```


```js run
let uint8Array = new Uint8Array([228, 189, 160, 229, 165, 189]);

alert( new TextDecoder().decode(uint8Array) ); // 你好
```

<<<<<<< HEAD
我们可以通过为其创建子数组视图来解码部分缓冲区：
=======
We can decode a part of the buffer by creating a subarray view for it:
>>>>>>> 79417c6e73645d37f184f0cc7e4bc3353e85224f


```js run
let uint8Array = new Uint8Array([0, 72, 101, 108, 108, 111, 0]);

<<<<<<< HEAD
// 该字符串位于中间
// 在不复制任何内容的前提下，创建一个新的视图
=======
// the string is in the middle
// create a new view over it, without copying anything
>>>>>>> 79417c6e73645d37f184f0cc7e4bc3353e85224f
let binaryString = uint8Array.subarray(1, -1);

alert( new TextDecoder().decode(binaryString) ); // Hello
```

<<<<<<< HEAD
## 文本编码器

[TextEncoder](https://encoding.spec.whatwg.org/#interface-textencoder) 做了相反的事情 -- 将字符串转换为字节。

语法为：
=======
## TextEncoder

[TextEncoder](https://encoding.spec.whatwg.org/#interface-textencoder) does the reverse thing -- converts a string into bytes.

The syntax is:
>>>>>>> 79417c6e73645d37f184f0cc7e4bc3353e85224f

```js run
let encoder = new TextEncoder();
```

<<<<<<< HEAD
支持的编码格式只有 `utf-8` 。

它有两种方法：
- **`encode(str)`** -- 返回一个字符串被转换得到的 `Uint8Array`。
- **`encodeInto(str, destination)`** -- 将 `str` 编码到 `destination`中，该目标必须为 `Uint8Array`。
=======
The only encoding it supports is "utf-8".

It has two methods:
- **`encode(str)`** -- returns `Uint8Array` from a string.
- **`encodeInto(str, destination)`** -- encodes `str` into `destination` that must be `Uint8Array`.
>>>>>>> 79417c6e73645d37f184f0cc7e4bc3353e85224f

```js run
let encoder = new TextEncoder();

let uint8Array = encoder.encode("Hello");
alert(uint8Array); // 72,101,108,108,111
```
