# 日期和时间

让我一起探讨一个新的内置对象：[日期](mdn:js/Date)。该对象存储日期、时间以及提供管理它们的方法。

<<<<<<< HEAD
举个例子，我们可以使用它来存储创建、修改事件的时间，或者用来度量时间开销，再或者用来打印当前时间。
=======
For instance, we can use it to store creation/modification times, to measure time, or just to print out the current date.
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

## 创建

创建一个新的 `Date` 对象，只需要调用 `new Date()`，附加下列参数中的其中一个：

`new Date()`
: 不带参数 —— 创建一个表示当前日期和时间的 `Date` 对象：

    ```js run
    let now = new Date();
    alert( now ); // 显示当前的日期/时间
    ```

`new Date(milliseconds)`
: 创建一个 `Date` 对象，参数是从 1970-01-01 00:00:00 UTC+0 开始所经过的毫秒（一秒的千分之一）数。

    ```js run
    // 0 表示 01.01.1970 UTC+0
    let Jan01_1970 = new Date(0);
    alert( Jan01_1970 );

    // 增加 24 小时，得到 02.01.1970 UTC+0
    let Jan02_1970 = new Date(24 * 3600 * 1000);
    alert( Jan02_1970 );
    ```

    传入的参数是自 1970-01-01 00:00:00 开始计算的毫秒数，被称为**时间戳**。

    这是一种日期的轻量级表示方法。我们通常使用时间戳来创建一个日期，比如 `new Date(timestamp)`，以及使用 `date.getTime()` 来将现有的 `Date` 对象转化为时间戳（下面将提到）。

`new Date(datestring)`
: 如果只有一个参数，并且是字符串，那么该参数会通过 `Date.parse` 算法解析（下面会提到）。


    ```js run
    let date = new Date("2017-01-26");
    alert(date);
    // The time is not set, so it's assumed to be midnight GMT and
    // is adjusted according to the timezone the code is run in
    // So the result could be
    // Thu Jan 26 2017 11:00:00 GMT+1100 (Australian Eastern Daylight Time)
    // or
    // Wed Jan 25 2017 16:00:00 GMT-0800 (Pacific Standard Time)
    ```

`new Date(year, month, date, hours, minutes, seconds, ms)`
<<<<<<< HEAD
: 创建一个 Date 对象，参数是当地时区的日期组合信息。只有前两个参数是必须的。

    注意：
=======
: Create the date with the given components in the local time zone. Only the first two arguments are obligatory.
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

    - `year` 必须是四位数：`2013` 是合法的，`98` 是不合法的。
    - `month` 计数从 `0` （一月） 开始，到 `11` （12月）。
    - `date` 是当月的具体某一天，如果缺失，默认是 `1`。
    - 如果 `hours/minutes/seconds/ms` 缺失的话，它们默认值是 `0`。

    举个例子：

    ```js
    new Date(2011, 0, 1, 0, 0, 0, 0); // // 1 Jan 2011, 00:00:00
    new Date(2011, 0, 1); // 同样，时分秒等默认为 0
    ```

    时间度量最小精确到 1 毫秒（千分之一秒）：

    ```js run
    let date = new Date(2011, 0, 1, 2, 3, 4, 567);
    alert( date ); // 1.01.2011, 02:03:04.567
    ```

## 访问日期组件

<<<<<<< HEAD
从 `Date` 对象中访问年、月等信息有很多种方式。通过分类可以很容易记忆。
=======
There are methods to access the year, month and so on from the `Date` object:
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

[getFullYear()](mdn:js/Date/getFullYear)
: 获取年份（4 位数）

[getMonth()](mdn:js/Date/getMonth)
: 获取月份**从 0 到 11**。

[getDate()](mdn:js/Date/getDate)
: 获取当月的日期，从 1 到 31，这个方法名称可能看起来有些令人疑惑。

[getHours()](mdn:js/Date/getHours), [getMinutes()](mdn:js/Date/getMinutes), [getSeconds()](mdn:js/Date/getSeconds), [getMilliseconds()](mdn:js/Date/getMilliseconds)
: 获取相应的时间信息。

```warn header="不是 `getYear()`，而是 `getFullYear()`"
很多 JavaScript 引擎都实现了一个非标准化的方法 `getYear()`，这个方法不建议使用。它有可能返回 2 位的年份信息。请不要使用它。获取年份，使用 `getFullYear()`。
```

另外，我们还可以获取一周中的第几天：

[getDay()](mdn:js/Date/getDay)
: 获取一周中的第几天，从 `0`（星期天）到 `6` （星期六）。第一天始终是星期天，在某些国家可能不是这样的习惯，但是这不能被改变。

**以上所有的方法返回的信息都是基于当地时区的。**

当然，也有与之对应的 UTC 版本方法，它们会返回基于 UTC+0 时区的天数、月份、年份等等信息：[getUTCFullYear()](mdn:js/Date/getUTCFullYear)， [getUTCMonth()](mdn:js/Date/getUTCMonth)， [getUTCDay()](mdn:js/Date/getUTCDay)。只需要在 `"get"` 之后插入 `"UTC"`。

如果你当地时区相对于 UTC 有偏移，那么下面代码会显示不同的小时数：

```js run
//  当前日期
let date = new Date();

// 当地时区的小时数
alert( date.getHours() );

// 在 UTC+0 时区的小时数（非夏令时的伦敦时间）
alert( date.getUTCHours() );
```

<<<<<<< HEAD
在以上给出的方法中，有两个与众不同的，它们没有 UTC 版本：
=======
Besides the given methods, there are two special ones that do not have a UTC-variant:
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

[getTime()](mdn:js/Date/getTime)
: 返回日期的时间戳 —— 从 1970-1-1 00:00:00 UTC+0 开始的毫秒数。

[getTimezoneOffset()](mdn:js/Date/getTimezoneOffset)
: 返回时区偏移数，以分钟为单位：

    ```js run
    // 如果你在时区 UTC-1，输出 60
    // 如果你在时区 UTC+3，输出 -180
    alert( new Date().getTimezoneOffset() );

    ```

## 设置日期信息

以下方法可以设置日期/时间信息：

- [`setFullYear(year [, month, date])`](mdn:js/Date/setFullYear)
- [`setMonth(month [, date])`](mdn:js/Date/setMonth)
- [`setDate(date)`](mdn:js/Date/setDate)
- [`setHours(hour [, min, sec, ms])`](mdn:js/Date/setHours)
- [`setMinutes(min [, sec, ms])`](mdn:js/Date/setMinutes)
- [`setSeconds(sec [, ms])`](mdn:js/Date/setSeconds)
- [`setMilliseconds(ms)`](mdn:js/Date/setMilliseconds)
- [`setTime(milliseconds)`](mdn:js/Date/setTime) （使用自 1970-01-01 00:00:00 UTC+0 开始的毫秒数来设置整个日期对象）

以上方法除了 `setTime()` 都有 UTC 版本，比如 `setUTCHours()`。

我们可以看到，有些方法可以一次性设置多个信息，比如 `setHours`。另外，在这些方法中没有提到的信息将不会被修改。

举个例子：

```js run
let today = new Date();

today.setHours(0);
alert(today); // 日期依然是今天，只不过小时数改为 0

today.setHours(0, 0, 0, 0);
alert(today); // 日期依然是今天，时间为 00:00:00。
```

## 自动校准

**自动校准**是 `Date` 对象一个非常方便的特性。我们可以设置超范围的数值，它会自动校准。

举个例子：

```js run
let date = new Date(2013, 0, *!*32*/!*); // 32 Jan 2013 ?!?
alert(date); // ...是 1st Feb 2013!
```

超出范围的日期信息会被自动分配。

假设我们要在日期「2016 年 2 月 28 日」上再加 2 天。结果可能是「3 月 2 日」或者「3 月 1 日」，原因是闰年的存在。但是我们不需要去考虑这些，直接加两天，剩下的 `Date` 对象会帮我们处理：

```js run
let date = new Date(2016, 1, 28);
*!*
date.setDate(date.getDate() + 2);
*/!*

alert( date ); // 2016 年 3 月 1 日
```

这个特性经常被用来获取一段时间后的日期信息。举个例子，我们想得到「当前日期 70 秒之后的日期」：

```js run
let date = new Date();
date.setSeconds(date.getSeconds() + 70);

alert( date ); // 显示正确的日期信息
```

我们可以设置 0 甚至 负值。举个例子：

```js run
let date = new Date(2016, 0, 2); // 2016 年 1 月 2 日

date.setDate(1); // 设置为当月的第一天
alert( date );

date.setDate(0); // 天数最小可以设置为 1，所以这里设置为上一月的最后一天
alert( date ); // 2015 年 12 月 31 日
```

## 日期转化为数字，日期差值

当 `Date` 对象转化为数字时，得到的是对应的时间戳，相当于 `date.getTime()`：

```js run
let date = new Date();
alert(+date); // 以毫秒为单位的数值，相当于 date.getTime()
```

有一个重要的副作用：日期可以相减，它们相减的结果是以毫秒为单位。

这个作用可以用来做时间度量：

```js run
<<<<<<< HEAD
let start = new Date(); // 起始时间
=======
let start = new Date(); // start measuring time
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

// 做一些操作
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

<<<<<<< HEAD
let end = new Date(); // 结束时间
=======
let end = new Date(); // end measuring time
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

alert( `The loop took ${end - start} ms` );
```

## Date.now()

<<<<<<< HEAD
如果我们仅仅想要度量时间间隔，我们不需要整个 `Date` 对象。
=======
If we only want to measure time, we don't need the `Date` object.
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

有一个特殊的方法 `Date.now()`，它会返回当前的时间戳。

它相当于  `new Date().getTime()`，但它不会在中间创建一个 `Date` 对象。因此它更快，而且不会对垃圾处理造成额外的压力。

这种方法很多时候因为方便而被采用，又或者从性能上考虑，像 JavaScript 中的游戏以及其他的特殊应用。

因此这样做可能会更好：

```js run
*!*
let start = Date.now(); // 从 1979-01-01 00:00:00 开始至今的时间戳
*/!*

// do the job
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

*!*
let end = Date.now(); // 操作完成后，得到这一时刻的时间戳
*/!*

alert( `The loop took ${end - start} ms` ); // 相减的是时间戳，而不是日期
```

## 基准

如果我们想要为一个很耗 CPU 性能的函数提供一个可靠的基准，我们应该小心一点。

举个例子：我们想判断两个计算日期差值的函数，那个更快？

Such performance measurements are often called "benchmarks".

```js
// 我们有 date1 和 date2，哪个函数会更快返回两者的时间差？
function diffSubtract(date1, date2) {
  return date2 - date1;
}

// or
function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}
```

两个函数做的事情完全相同，但是其中一个明确使用 `date.getTime()` 来获取毫秒形式的日期，另外一个依赖「日期-数字」的转化。它们的结果是一致的。

那么，哪个更快呢？

<<<<<<< HEAD
首先想到的方法是：分别运行它们很多次，然后计算各自的时间差。在我们的例子中，函数非常简单，所以我们需要运行 100000 次左右。
=======
The first idea may be to run them many times in a row and measure the time difference. For our case, functions are very simple, so we have to do it at least 100000 times.
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

让我们开始测量：

```js run
function diffSubtract(date1, date2) {
  return date2 - date1;
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

alert( 'Time of diffSubtract: ' + bench(diffSubtract) + 'ms' );
alert( 'Time of diffGetTime: ' + bench(diffGetTime) + 'ms' );
```

哇！使用 `getTime()` 这种方式快得多！原因是它没有类型转化，这样对引擎优化来说更加简单。

好，我们得到了结论，但是这并不是一个很好的基准例子。

<<<<<<< HEAD
想象一下当运行 `bench(diffSubtract)` 的同时，CPU 还在并行处理其他事务。然而，运行 `bench(diffGetTime)` 的时候，并行处理的事务完成了。
=======
Imagine that at the time of running `bench(diffSubtract)` CPU was doing something in parallel, and it was taking resources. And by the time of running `bench(diffGetTime)` that work has finished.
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

这是一个对于现代多进程操作系统来说，毫不夸张的场景。

结果就是，第一个函数相比于第二个，缺少 CPU 资源，这可能导致错误的结论。

**为了得到更加可靠的基准，所有的时间间隔需要多次返回。**

下面是示范代码：

```js run
function diffSubtract(date1, date2) {
  return date2 - date1;
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

let time1 = 0;
let time2 = 0;

*!*
// 交替运行 bench(upperSlice) 和 bench(upperLoop) 10 次
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
*/!*

alert( 'Total time for diffSubtract: ' + time1 );
alert( 'Total time for diffGetTime: ' + time2 );
```

现代的 JavaScript 引擎的先进优化策略只对执行很多次的 "hot code" 有效（对于执行很少次数的代码没有必要优化）。因此，以上的例子中，第一部分不会被优化，我们可能需要增加一个升温步骤：

```js
// 主循环中增加「升温」环节
bench(diffSubtract);
bench(diffGetTime);

// 开始度量
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
```

<<<<<<< HEAD
```warn header="做微度量时请小心"
现代的 JavaScript 引擎会做很多优化。相对于「正常情况」，它们可能会改变「人为测试」的结果，特别是我们度量的目标很细微。因此，如果你想好好了解一下性能，请学习 JavaScript 引擎的工作原理。在那之后，你可能再也不需要微度量了。
=======
```warn header="Be careful doing microbenchmarking"
Modern JavaScript engines perform many optimizations. They may tweak results of "artificial tests" compared to "normal usage", especially when we benchmark something very small, such as how an operator works, or a built-in function. So if you seriously want to understand performance, then please study how the JavaScript engine works. And then you probably won't need microbenchmarks at all.
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

关于 V8 引擎的大量文章，点击：<http://mrale.ph>.
```

## 对一个字符串使用 Date.parse

[Date.parse(str)](mdn:js/Date/parse) 方法可以从一个字符串中读取日期。

字符串的格式是：`YYYY-MM-DDTHH:mm:ss.sssZ`，其中：

- `YYYY-MM-DD` —— 日期：年-月-日。
- 字符串 `"T"` 是一个分隔符。
- `HH:mm:ss.sss` —— 时间：小时，分钟，秒，毫秒。
- 可选字符 `'Z'` 代表时区。单个字符 `Z` 代表 UTC+0。

简短形式也是可以的，比如 `YYYY-MM-DD` 或者 `YYYY-MM` 又或者 `YYYY`。

`Date.parse(str)` 方法会转化一个特定格式的字符串，返回一个时间戳（自 1970-01-01 00:00:00 起的毫秒数），如果格式不正确，返回 `NaN`。

举个例子：

```js run
let ms = Date.parse('2012-01-26T13:51:50.417-07:00');

alert(ms); // 1327611110417  (时间戳)
```

我们可以通过时间戳来立即创建一个 `new Date` 对象戳：

```js run
let date = new Date( Date.parse('2012-01-26T13:51:50.417-07:00') );

alert(date);  
```

## 小结

- 在 JavaScript 中，日期和时间使用 [Date](mdn:js/Date) 对象来表示。不能只创建日期，或者只创建时间，`Date` 对象总是两个都创建。
- 月份从 0 开始计数（对，一月是 0）。
- 一周的某一天 `getDay()` 同样从 0 开始计算（0 代表星期天）。
- 当超出范围的信息被设置时，`Date` 会做自我校准。这一点对于日/月/小时 的加减很有效。
- 日期可以相减，得到的是两者的差值，用毫秒表示。因为当转化为数字时，`Date` 对象变为时间戳。
- 使用 `Date.now()` 可以更快地得到当前时间的时间戳。

和其他语言不同，JavaScript 中时间戳是用毫秒表示，而不是秒。

<<<<<<< HEAD
同样，有时候我们会需要更加精准的时间度量。JavaScript 自身并不能度量微秒（一秒的百万分之一），但很多环境会提供。举个例子：浏览器拥有 [performance.now()](mdn:api/Performance/now) 方法来提供页面加载的微秒数（毫秒的小数点再右移三位）：
=======
Sometimes we need more precise time measurements. JavaScript itself does not have a way to measure time in microseconds (1 millionth of a second), but most environments provide it. For instance, browser has [performance.now()](mdn:api/Performance/now) that gives the number of milliseconds from the start of page loading with microsecond precision (3 digits after the point):
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

```js run
alert(`Loading started ${performance.now()}ms ago`);
// 得到 "Loading started 34731.26000000001ms ago"
// .26 is 微秒(260 微秒)
// 小数点后超过 3 位是错误，只有前三位是正确的
```

<<<<<<< HEAD
Node.JS 拥有 `microtime` 模块以及其他方法。从技术上来说，任何设备和环境都允许获取更精确的数值，不只是 `Date` 对象。
=======
Node.js has `microtime` module and other ways. Technically, any device and environment allows to get more precision, it's just not in `Date`.
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d
