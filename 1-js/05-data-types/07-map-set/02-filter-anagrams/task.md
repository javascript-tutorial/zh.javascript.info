importance: 4

---

# 过滤字谜（anagrams）

[Anagrams](https://en.wikipedia.org/wiki/Anagram) 是具有相同数量相同字母但是顺序不同的单词。

例如：

```
nap - pan
ear - are - era
cheaters - hectares - teachers
```

写一个函数 `aclean(arr)`，它返回被清除了字谜（anagrams）的数组。

例如：

```js
let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) ); // "nap,teachers,ear" or "PAN,cheaters,era"
```

对于所有的字谜（anagram）组，都应该保留其中一个词，但保留的具体是哪一个并不重要。

