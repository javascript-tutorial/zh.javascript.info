// 现在位于鼠标下方的 <td>（如果有）
let currentElem = null;

table.onmouseover = function(event) {
<<<<<<< HEAD
  // 在进入一个新的元素前，鼠标总是会先离开前一个元素
  // 如果设置了 currentElem，那么我们就没有鼠标所悬停在的前一个 <td>，
  // 忽略此事件
=======
  // before entering a new element, the mouse always leaves the previous one
  // if currentElem is set, we didn't leave the previous <td>,
  // that's a mouseover inside it, ignore the event
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8
  if (currentElem) return;

  let target = event.target.closest('td');

<<<<<<< HEAD
  // 我们移动到的不是一个 <td> —— 忽略
  if (!target) return;

  // 现在移动到了 <td> 上，但在处于了我们表格的外部（可能因为是嵌套的表格）
  // 忽略
  if (!table.contains(target)) return;

  // 给力！我们进入了一个新的 <td>
=======
  // we moved not into a <td> - ignore
  if (!target) return;

  // moved into <td>, but outside of our table (possible in case of nested tables)
  // ignore
  if (!table.contains(target)) return;

  // hooray! we entered a new <td>
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8
  currentElem = target;
  onEnter(currentElem);
};


table.onmouseout = function(event) {
<<<<<<< HEAD
  // 如果我们现在处于所有 <td> 的外部，则忽略此事件
  // 这可能是一个表格内的移动，但是在 <td> 外，
  // 例如从一个 <tr> 到另一个 <tr>
  if (!currentElem) return;

  // 我们将要离开这个元素 —— 去哪儿？可能是去一个后代？
  let relatedTarget = event.relatedTarget;

  while (relatedTarget) {
    // 到父链上并检查 —— 我们是否还在 currentElem 内
    // 然后发现，这只是一个内部移动 —— 忽略它
=======
  // if we're outside of any <td> now, then ignore the event
  // that's probably a move inside the table, but out of <td>,
  // e.g. from <tr> to another <tr>
  if (!currentElem) return;

  // we're leaving the element – where to? Maybe to a descendant?
  let relatedTarget = event.relatedTarget;

  while (relatedTarget) {
    // go up the parent chain and check – if we're still inside currentElem
    // then that's an internal transition – ignore it
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8
    if (relatedTarget == currentElem) return;

    relatedTarget = relatedTarget.parentNode;
  }

<<<<<<< HEAD
  // 我们离开了 <td>。真的。
=======
  // we left the <td>. really.
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8
  onLeave(currentElem);
  currentElem = null;
};

<<<<<<< HEAD
// 任何处理进入/离开一个元素的函数
function onEnter(elem) {
  elem.style.background = 'pink';

  // 在文本区域显示它
=======
// any functions to handle entering/leaving an element
function onEnter(elem) {
  elem.style.background = 'pink';

  // show that in textarea
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8
  text.value += `over -> ${currentElem.tagName}.${currentElem.className}\n`;
  text.scrollTop = 1e6;
}

function onLeave(elem) {
  elem.style.background = '';

<<<<<<< HEAD
  // 在文本区域显示它
=======
  // show that in textarea
>>>>>>> d35baee32dcce127a69325c274799bb81db1afd8
  text.value += `out <- ${elem.tagName}.${elem.className}\n`;
  text.scrollTop = 1e6;
}
