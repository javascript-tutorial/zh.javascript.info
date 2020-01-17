为了找到所有 anagrams，让我们把每个单词打散为字母并排序。当单词有序后，所有的 anagrams 都一样。

例如：

```
nap, pan -> anp
ear, era, are -> aer
cheaters, hectares, teachers -> aceehrst
...
```

我们将会使用排序后字母的变量作为 map 的键，为每一个键仅保存一个值：

```js run
function aclean(arr) {
  let map = new Map();

  for (let word of arr) {
    // 将单词打散为字母，排序然后拼接回来
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

字母排序在行 `(*)` 以链式调用的方式完成。

为了方便，我们把它分解为多行：

```js
let sorted = word // PAN
  .toLowerCase() // pan
  .split('') // ['p','a','n']
  .sort() // ['a','n','p']
  .join(''); // anp
```

两个不同的单词 `'PAN'` 和 `'nap'` 得到了同样的字母排序格式 `'anp'`。

下一行将单词放入 map：

```js
map.set(sorted, word);
```

如果我们遇到了一个有相同字母排序格式的单词，那么他就会覆盖 map 中相同键的前一个值。所以我们将总会得到每个字母格式下最靠后的单词。

最后 `Array.from(map.values())` 将 map 的值迭代（我们不需要结果的键）然后返回数组集合。

这里我们也可以使用一般的对象而不用 `Map`，因为键就是字符串。

这就是答案：

```js run
function aclean(arr) {
  let obj = {};

  for (let i = 0; i < arr.length; i++) {
    let sorted = arr[i].toLowerCase().split("").sort().join("");
    obj[sorted] = arr[i];
  }

  return Array.from(Object.values(obj));
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) );
```
