为了找到所有字谜（anagram），让我们把每个单词打散为字母并进行排序。当字母被排序后，所有的字谜就都一样了。

例如：

```
nap, pan -> anp
ear, era, are -> aer
cheaters, hectares, teachers -> aceehrst
...
```

我们将使用进行字母排序后的单词的变体（variant）作为 map 的键，每个键仅对应存储一个值：

```js run
function aclean(arr) {
  let map = new Map();

  for (let word of arr) {
    // 将单词 split 成字母，对字母进行排序，之后再 join 回来
*!*
    let sorted = word.toLowerCase().split('').sort().join(''); // (*)
*/!*
    map.set(sorted, word);
  }

  return Array.from(map.values());
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) );
```

字母排序在 `(*)` 行以链式调用的方式完成。

为了方便，我们把它分解为多行：

```js
let sorted = word // PAN
  .toLowerCase() // pan
  .split('') // ['p','a','n']
  .sort() // ['a','n','p']
  .join(''); // anp
```

两个不同的单词 `'PAN'` 和 `'nap'` 得到了同样的字母排序形式 `'anp'`。

下一行是将单词放入 map：

```js
map.set(sorted, word);
```

如果我们再次遇到相同字母排序形式的单词，那么它将会覆盖 map 中有相同键的前一个值。因此，每个字母形式（译注：排序后的）最多只有一个单词。（译注：并且是每个字母形式中最靠后的那个值）

最后，`Array.from(map.values())` 将 map 的值迭代（我们不需要结果的键）为数组形式，并返回这个数组。

在这里，我们也可以使用普通对象（plain object）而不用 `Map`，因为键就是字符串。

下面是解决方案：

```js run demo
function aclean(arr) {
  let obj = {};

  for (let i = 0; i < arr.length; i++) {
    let sorted = arr[i].toLowerCase().split("").sort().join("");
    obj[sorted] = arr[i];
  }

  return Object.values(obj);
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) );
```
