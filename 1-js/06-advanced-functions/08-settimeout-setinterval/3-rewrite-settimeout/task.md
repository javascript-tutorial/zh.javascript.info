importance: 4

---

# 用 setInterval 重写 setTimeout

下面的函数用嵌套 `setTimeout` 将任务分成多个部分。

试试用 `setInterval` 进行重写：

```js run
let i = 0;

let start = Date.now();

function count() {

  if (i == 1000000000) {
    alert("Done in " + (Date.now() - start) + 'ms');
  } else {
    setTimeout(count, 0);
  }

  // 任务的一部分
  for(let j = 0; j < 1000000; j++) {
    i++;
  }

}

count();
```
