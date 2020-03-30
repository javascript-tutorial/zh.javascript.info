实现的方式有很多种。

以下列举的是其中一些方法：

```js
// 1. 带有 id="age-table" 的表格。
let table = document.getElementById('age-table')

// 2. 表格内的所有 label 元素
table.getElementsByTagName('label')
// 或
document.querySelectorAll('#age-table label')

// 3. 表格中的第一个 td（带有 "Age" 字段）
table.rows[0].cells[0]
// 或
table.getElementsByTagName('td')[0]
// 或
table.querySelector('td')

// 4. 带有 name="search" 的 form。
// 假设文档中只有一个 name="search" 的元素
let form = document.getElementsByName('search')[0]
// 或者，专门对于 form
document.querySelector('form[name="search"]')

// 5. 表单中的第一个 input
form.getElementsByTagName('input')[0]
// 或
form.querySelector('input')

// 6. 表单中的最后一个 input
let inputs = form.querySelectorAll('input') // 查找所有 input
inputs[inputs.length-1] // 取出最后一个
```
