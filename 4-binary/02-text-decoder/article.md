<<<<<<< HEAD
# TextDecoder 和 TextEncoder

如果二进制数据实际上是一个字符串怎么办？例如，我们收到了一个包含文本数据的文件。

内建的 [TextDecoder](https://encoding.spec.whatwg.org/#interface-textdecoder) 对象在给定缓冲区（buffer）和编码格式（encoding）的情况下，能够将值读取到实际的 JavaScript 字符串中。

首先我们需要创建：
=======
# TextDecoder and TextEncoder

What if the binary data is actually a string? For instance, we received a file with textual data.

The build-in [TextDecoder](https://encoding.spec.whatwg.org/#interface-textdecoder) object allows to read the value into an actual JavaScript string, given the buffer and the encoding.

We first need to create it:
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8
```js
let decoder = new TextDecoder([label], [options]);
```

<<<<<<< HEAD
- **`label`** —— 编码格式，默认为 `utf-8`，但同时也支持 `big5`，`windows-1251` 等许多其他编码格式。
- **`options`** —— 可选对象：
  - **`fatal`** —— 布尔值，如果为 `true` 则为无效（不可解码）字符抛出异常，否则（默认）用字符 `\uFFFD` 替换无效字符。
  - **`ignoreBOM`** —— 布尔值，如果为 `true` 则 BOM（可选的字节顺序 unicode 标记），很少需要使用。

……然后解码：
=======
- **`label`** -- the encoding, `utf-8` by default, but `big5`, `windows-1251` and many other are also supported.
- **`options`** -- optional object:
  - **`fatal`** -- boolean, if `true` then throw an exception for invalid (non-decodable) characters, otherwise (default) replace them with character `\uFFFD`.
  - **`ignoreBOM`** -- boolean, if `true` then ignore BOM (an optional byte-order unicode mark), rarely needed.

...And then decode:
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8

```js
let str = decoder.decode([input], [options]);
```

<<<<<<< HEAD
- **`input`** —— 要被解码的 `BufferSource`。
- **`options`** —— 可选对象：
  - **`stream`** —— 对于解码流，为 true，则将传入的数据块（chunk）作为参数重复调用 `decoder`。在这种情况下，多字节的字符可能偶尔会在块与块之间被分割。这个选项告诉 `TextDecoder` 记住“未完成”的字符，并在下一个数据块来的时候进行解码。

例如：
=======
- **`input`** -- `BufferSource` to decode.
- **`options`** -- optional object:
  - **`stream`** -- true for decoding streams, when `decoder` is called repeatedly with incoming chunks of data. In that case a multi-byte character may occasionally split between chunks. This options tells `TextDecoder` to memorize "unfinished" characters and decode them when the next chunk comes.

For instance:
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8

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
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8


```js run
let uint8Array = new Uint8Array([0, 72, 101, 108, 108, 111, 0]);

<<<<<<< HEAD
// 该字符串位于中间
// 在不复制任何内容的前提下，创建一个新的视图
=======
// the string is in the middle
// create a new view over it, without copying anything
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8
let binaryString = uint8Array.subarray(1, -1);

alert( new TextDecoder().decode(binaryString) ); // Hello
```

## TextEncoder

<<<<<<< HEAD
[TextEncoder](https://encoding.spec.whatwg.org/#interface-textencoder) 做相反的事情 —— 将字符串转换为字节。

语法为：
=======
[TextEncoder](https://encoding.spec.whatwg.org/#interface-textencoder) does the reverse thing -- converts a string into bytes.

The syntax is:
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8

```js
let encoder = new TextEncoder();
```

<<<<<<< HEAD
只支持 `utf-8` 编码。

它有两种方法：
- **`encode(str)`** —— 从字符串返回 `Uint8Array`。
- **`encodeInto(str, destination)`** —— 将 `str` 编码到 `destination` 中，该目标必须为 `Uint8Array`。
=======
The only encoding it supports is "utf-8".

It has two methods:
- **`encode(str)`** -- returns `Uint8Array` from a string.
- **`encodeInto(str, destination)`** -- encodes `str` into `destination` that must be `Uint8Array`.
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8

```js run
let encoder = new TextEncoder();

let uint8Array = encoder.encode("Hello");
alert(uint8Array); // 72,101,108,108,111
```
