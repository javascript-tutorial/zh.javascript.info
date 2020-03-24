实现的方式有很多种。

以下列举的是其中一些方法：

```js
// 1. 带有 id="age-table" 的表格。
let table = document.getElementById('age-table')

// 2. 表格内的所有 label 元素
table.getElementsByTagName('label')
// 或
document.querySelectorAll('#age-table label')

<<<<<<< HEAD
// 3. 表格中的第一个 td（带有 "Age" 字段）
=======
// 3. The first td in that table (with the word "Age")
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a
table.rows[0].cells[0]
// 或
table.getElementsByTagName('td')[0]
// 或
table.querySelector('td')

<<<<<<< HEAD
// 4. 带有 name="search" 的 form。
// 假设文档中只有一个 name="search" 的元素
=======
// 4. The form with the name "search"
// assuming there's only one element with name="search" in the document
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a
let form = document.getElementsByName('search')[0]
// 或者，专门对于 form
document.querySelector('form[name="search"]')

<<<<<<< HEAD
// 5. 表单中的第一个 input
form.getElementsByTagName('input')[0]
// 或
form.querySelector('input')

// 6. 表单中的最后一个 input
let inputs = form.querySelectorAll('input') // 查找所有 input
inputs[inputs.length-1] // 取出最后一个
=======
// 5. The first input in that form.
form.getElementsByTagName('input')[0]
// or
form.querySelector('input')

// 6. The last input in that form
let inputs = form.querySelectorAll('input') // find all inputs
inputs[inputs.length-1] // take the last one
>>>>>>> 162280b6d238ce32bbd8ff7a3f7992be82c2311a
```
