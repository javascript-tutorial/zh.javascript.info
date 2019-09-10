importance: 4

---

# 过滤 anagrams

[Anagrams](https://en.wikipedia.org/wiki/Anagram) 是有相同数量相同字母但是顺序不同的单词。

例如：

```
nap - pan
ear - are - era
cheaters - hectares - teachers
```

写一个函数 `aclean(arr)`，它返回的数组中 anagrams 被删除。

例如：

```js
let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) ); // "nap,teachers,ear" or "PAN,cheaters,era"
```

对于所有的 anagram 组，需要保留任意一个单词。

