

```js no-beautify
5 > 4 → true
"apple" > "pineapple" → false
"2" > "12" → true
undefined == null → true
undefined === null → false
null == "\n0\n" → false
null === +"\n0\n" → false
```

参考答案：

<<<<<<< HEAD
1. 数字间比较大小，显然得 true。
2. 按词典顺序比较，得 false。
3. 与第 2 题同理，首位字符 `"2"` 大于 `"1"`。
4. `null` 只与 `undefined` 互等。
5. 严格相等模式下，类型不同得 false。
6. 与第 4 题同理，`null` 只与 `undefined` 相等。
7. 不同类型严格不相等。
=======
1. Obviously, true.
2. Dictionary comparison, hence false.
3. Again, dictionary comparison, first char of `"2"` is greater than the first char of `"1"`.
4. Values `null` and `undefined` equal each other only.
5. Strict equality is strict. Different types from both sides lead to false.
6. Similar to `(4)`, `null` only equals `undefined`.
7. Strict equality of different types.
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea
