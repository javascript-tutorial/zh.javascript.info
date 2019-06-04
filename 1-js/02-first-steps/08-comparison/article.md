# 值的比较

<<<<<<< HEAD
在 JavaScript 中，我们可以使用一些熟知的数学符号进行值的比较：

- 大于 / 小于：<code>a &gt; b</code>，<code>a &lt; b</code>。
- 大于等于 / 小于等于：<code>a &gt;= b</code>，<code>a &lt;= b</code>。
- 检测两个值的相等写为 `a == b`（注意表达式中是两个等号 `=`，若写为单个等号 `a = b` 则表示赋值）。
- 检测两个值的不等，在数学中使用 <code>&ne;</code> 符号，而在 JavaScript 中则通过在赋值符号前增加叹号表示：<code>a != b</code>。
=======
We know many comparison operators from maths:

- Greater/less than: <code>a &gt; b</code>, <code>a &lt; b</code>.
- Greater/less than or equals: <code>a &gt;= b</code>, <code>a &lt;= b</code>.
- Equals: `a == b` (please note the double equals sign `=`. A single symbol `a = b` would mean an assignment).
- Not equals. In maths the notation is <code>&ne;</code>, but in JavaScript it's written as an assignment with an exclamation sign before it: <code>a != b</code>.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

## 比较结果为 Boolean 类型

<<<<<<< HEAD
和其他操作符一样，比较操作符也会有返回值，其类型为布尔值（Boolean）。

- `true` —— 表示“yes（是）”，“correct（正确）”或“the truth（真理）”。
- `false` ——  表示“no（否）”，“wrong（错误）”或“a lie（谎言）”。
=======
Like all other operators, a comparison returns a value. In this case, the value is a boolean.

- `true` -- means "yes", "correct" or "the truth".
- `false` -- means "no", "wrong" or "not the truth".
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

示例：

```js run
alert( 2 > 1 );  // true（正确）
alert( 2 == 1 ); // false（错误）
alert( 2 != 1 ); // true（正确）
```

和其他类型的值一样，比较的结果可以被赋值给任意变量：

```js run
let result = 5 > 4; // 把比较的结果赋值给 result
alert( result ); // true
```

## 字符串间的比较

<<<<<<< HEAD
在比较字符串的大小时，会使用“字典”或“词典”顺序进行判定。
=======
To see whether a string is greater than another, JavaScript uses the so-called "dictionary" or "lexicographical" order.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

换言之，字符串是按字符（母）逐个进行比较的。

示例：

```js run
alert( 'Z' > 'A' ); // true
alert( 'Glow' > 'Glee' ); // true
alert( 'Bee' > 'Be' ); // true
```

字符串间的比较算法非常简单：

<<<<<<< HEAD
1. 首先比较两个字符串的首位字符大小。
2. 如果一方字符较大（或较小），则该字符串大于（或小于）另一个字符串。算法结束。
3. 否则，两个字符串中的字符相等，继续取出各自的后一位字符进行比较。
4. 重复上述步骤进行比较，直到某字符串率先用完所有字符。
5. 如果两个字符串同时用完字符，那么它们被判定为相等，否则未结束（还有未比较的字符）的字符串更大。

在上面的例子中，`'Z' > 'A'` 在算法的第 1 步就得到了返回结果。

字符串 `"Glow"` 和 `"Glee"` 会按字符逐个进行比较：
=======
1. Compare the first character of both strings.
2. If the first character from the first string is greater (or less) than the other string's, then the first string is greater (or less) than the second. We're done.
3. Otherwise, if both strings' first characters are the same, compare the second characters the same way.
4. Repeat until the end of either string.
5. If both strings end at the same length, then they are equal. Otherwise, the longer string is greater.

In the examples above, the comparison `'Z' > 'A'` gets to a result at the first step while the strings `"Glow"` and `"Glee"` are compared character-by-character:
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

1. `G` 和 `G` 相等。
2. `l` 和 `l` 相等。
3. `o` 比 `e` 大，算法停止，第一个字符串大于第二个。

<<<<<<< HEAD
```smart header="非真正的字典顺序，而是 Unicode 编码顺序"
在上面的算法中，比较大小的逻辑与字典或电话簿中的排序很像，但也不完全相同。

比如说，算法中的比较对大小写是敏感的。大写的 `"A"` 并不等于小写的 `"a"`。哪一个更大呢？实际上小写的 `"a"` 更大。至于原因嘛，这是因为在内部的编码表中（Unicode），小写字母的字符索引更大。我们会在 <info:string> 这章讨论更多关于字符串的细节。
=======
```smart header="Not a real dictionary, but Unicode order"
The comparison algorithm given above is roughly equivalent to the one used in dictionaries or phone books, but it's not exactly the same.

For instance, case matters. A capital letter `"A"` is not equal to the lowercase `"a"`. Which one is greater? The lowercase `"a"`. Why? Because the lowercase character has a greater index in the internal encoding table JavaScript uses (Unicode). We'll get back to specific details and consequences of this in the chapter <info:string>.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb
```

## 不同类型间的比较

<<<<<<< HEAD
当不同类型的值进行比较时，它们会首先被转为数字（number）再判定大小。
=======
When comparing values of different types, JavaScript converts the values to numbers.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

示例：

```js run
alert( '2' > 1 ); // true，字符串 '2' 会被转为数字 2
alert( '01' == 1 ); // true，字符串 '01' 会被转为数字 1
```

<<<<<<< HEAD
对于布尔类型，`true` 会被转为 `1`、`false` 转为 `0`，即有：
=======
For boolean values, `true` becomes `1` and `false` becomes `0`. 

For example:
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

```js run
alert( true == 1 ); // true
alert( false == 0 ); // true
```

````smart header="一个有趣的现象"
有时候，以下两种情况会同时发生：

- 若直接比较两个值，其结果是相等的。
- 若把两个值转为布尔值，它们可能得出完全相反的结果，即 `true` 和 `false`。

示例：

```js run
let a = 0;
alert( Boolean(a) ); // false

let b = "0";
alert( Boolean(b) ); // true

alert(a == b); // true!
```

<<<<<<< HEAD
对于 JavaScript 而言这种现象蛮正常的，因为它会把待比较的值转为数字后再做比较（因此 `"0"` 变成了 `0` ）。若只是将一个变量转为 `Boolean`，则会使用其他的类型转换规则。
=======
From JavaScript's standpoint, this result is quite normal. An equality check converts values using the numeric conversion (hence `"0"` becomes `0`), while the explicit `Boolean` conversion uses another set of rules.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb
````

## 严格相等

<<<<<<< HEAD
普通的相等性检查 `==` 存在一个问题，它不能区分出 `0` 和 `false`：
=======
A regular equality check `==` has a problem. It cannot differentiate `0` from `false`:
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

```js run
alert( 0 == false ); // true
```

<<<<<<< HEAD
也同样无法区分空字符串和 `false`：
=======
The same thing happens with an empty string:
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

```js run
alert( '' == false ); // true
```

<<<<<<< HEAD
这是因为在比较不同类型的值时，处于相等判断符号 `==` 两侧的值会被转换为数字的原因。空字符串和 `false` 也是如此，转换后它们都等于 0。
=======
This happens because operands of different types are converted to numbers by the equality operator `==`. An empty string, just like `false`, becomes a zero.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

如果我们需要区分 `0` 和 `false`，该怎么做呢？

**严格相等操作符 `===` 在进行比较时不会做任何的类型转换。**

换句话说，如果 `a` 和 `b` 属于不同的数据类型，那么 `a === b` 不会做任何的类型转换而立刻返回 `false`。

让我们试试：

```js run
alert( 0 === false ); // false，比较不同类型的值
```

<<<<<<< HEAD
同样的，与“不相等”符号 `!=` 类似，“严格不相等”表示为 `!==`。

严格相等的操作符虽然略为冗长，但是它很清楚地显示了比较的意图，降低你犯错的可能性。
=======
There is also a "strict non-equality" operator `!==` analogous to `!=`.

The strict equality operator is a bit longer to write, but makes it obvious what's going on and leaves less room for errors.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

## 涉及 null 和 undefined 的比较

让我们看看更多的边缘案例。

<<<<<<< HEAD
当使用 `null` 或 `undefined` 与其他值进行比较时，其返回结果常常出乎你的意料。


当使用严格相等 `===` 比较二者时：
它们是不相等的，因为它们属于不同的类型。
=======
There's a non-intuitive behavior when `null` or `undefined` are compared to other values.


For a strict equality check `===`
: These values are different, because each of them is a different type.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

```js run
alert( null === undefined ); // false
```

当使用非严格相等 `==` 比较二者时：
JavaScript 存在一个专属的规则，会判定它们互等。而它们就像“一对恋人”，仅仅等于（非严格相等下）对方而不等于其他任何的值。

```js run
alert( null == undefined ); // true
```

<<<<<<< HEAD
当使用数学式或其他比较方法 `< > <= >=` 时：
`null/undefined` 的值会被转换为数字：`null` 转为 `0`，`undefined` 转为 `NaN`。

下面让我们看看，这些规则会带来什么有趣的现象。同时更重要的是，我们需要从中学会如何远离这些特性带来的“陷阱”。
=======
For maths and other comparisons `< > <= >=`
: `null/undefined` are converted to numbers: `null` becomes `0`, while `undefined` becomes `NaN`.

Now let's see some funny things that happen when we apply these rules. And, what's more important, how to not fall into a trap with them.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

### 奇怪的结果：null vs 0

通过比较 `null` 和 0 可得：

```js run
alert( null > 0 );  // (1) false
alert( null == 0 ); // (2) false
alert( null >= 0 ); // (3) *!*true*/!*
```

<<<<<<< HEAD
是的，上面的结果完全打破了你对数学的认识。在最后一行代码显示“`null` 大于等于 0”的情况下，前两行代码中一定会有一个是正确的，然而事实表明它们的结果都是 false。

为什么会出现这种反常结果，这是因为相等性检测 `==` 和普通比较符 `> < >= <=` 的代码逻辑是相互独立的。进行值的比较会把 `null` 转为数字，因此它被转为了 `0`。这就是为什么（3）中 `null >= 0` 返回 true，（1）中 `null > 0` 返回 false。

另一方面，`undefined` 和 `null` 在相等性检测 `==` 中不会进行任何的类型转换，它们有自己独立的比较规则，所以除了它们之间互等外不会等于任何其他的值。这就解释了为什么（2）中 `null == 0` 会返回 false。
=======
Mathematically, that's strange. The last result states that "`null` is greater than or equal to zero", so in one of the comparisons above it must be `true`, but they are both false.

The reason is that an equality check `==` and comparisons `> < >= <=` work differently. Comparisons convert `null` to a number, treating it as `0`. That's why (3) `null >= 0` is true and (1) `null > 0` is false.

On the other hand, the equality check `==` for `undefined` and `null` is defined such that, without any conversions, they equal each other and don't equal anything else. That's why (2) `null == 0` is false.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

### “拒不合作”的 undefined

<<<<<<< HEAD
`undefined` 不应该参与任何值的比较：
=======
The value `undefined` shouldn't be compared to other values:
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

```js run
alert( undefined > 0 ); // false (1)
alert( undefined < 0 ); // false (2)
alert( undefined == 0 ); // false (3)
```

<<<<<<< HEAD
为何它看起来如此厌恶 0？无论怎么比较双方其结果总是返回 false！

原因如下：

- `(1)` 和 `(2)` 中返回 `false` 是因为 `undefined` 在比较中被转换为了 `NaN`，而 `NaN` 是一个特殊的数值型取值，它与任何值进行比较都会返回 `false`。
- `(3)` 中返回 `false` 是因为这是一个相等性检测，而 `undefined` 只与 `null` 相等。
=======
Why does it dislike zero so much? Always false!

We get these results because:

- Comparisons `(1)` and `(2)` return `false` because `undefined` gets converted to `NaN` and `NaN` is a special numeric value which returns `false` for all comparisons.
- The equality check `(3)` returns `false` because `undefined` only equals `null`, `undefined`, and no other value.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

### 规避错误

<<<<<<< HEAD
我们为何要研究以上示例？我们需要时刻记得这些古怪的规则吗？不，并不需要。虽然这些规则随着使用都会烂熟于胸，但是我们需要遵循更为可靠的方法来避免潜在的问题。
=======
Why did we go over these examples? Should we remember these peculiarities all the time? Well, not really. Actually, these tricky things will gradually become familiar over time, but there's a solid way to evade problems with them:
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

除了严格相等 `===` 外，其他凡是有 `undefined/null` 参与的比较，我们都需要额外 “关照”。

<<<<<<< HEAD
除非你非常清楚自己在做什么，否则永远不要使用 `>= > < <=` 去比较一个可能为 `null/undefined` 的变量。对于取值可能是 `null/undefined` 的变量，请按需要分别检查它的取值情况。
=======
Don't use comparisons `>= > < <=` with a variable which may be `null/undefined`, unless you're really sure of what you're doing. If a variable can have these values, check for them separately.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

## 小结

<<<<<<< HEAD
- 比较操作符始终返回逻辑值。
- 字符串间按“词典”顺序逐字符比较大小。
- 当待比较的值类型不同时，它们会被转为数字（不包括严格相等检测）进行比较。
- 在非严格相等 `==` 下，`null` 和 `undefined` 相等且各自不等于任何其他的值。
- 在使用 `>` 或 `<` 进行比较时，需要注意变量可能为 `null/undefined` 的情况。比较好的方法是单独检查变量是否等于 `null/undefined`。
=======
- Comparison operators return a boolean value.
- Strings are compared letter-by-letter in the "dictionary" order.
- When values of different types are compared, they get converted to numbers (with the exclusion of a strict equality check).
- The values `null` and `undefined` equal `==` each other and do not equal any other value.
- Be careful when using comparisons like `>` or `<` with variables that can occasionally be `null/undefined`. Checking for `null/undefined` separately is a good idea.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb
