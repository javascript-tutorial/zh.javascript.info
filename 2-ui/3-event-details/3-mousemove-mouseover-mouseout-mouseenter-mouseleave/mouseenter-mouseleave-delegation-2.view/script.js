// 现在位于鼠标下方的 <td>（如果有）
let currentElem = null;

table.onmouseover = function(event) {
  // 在进入一个新的元素前，鼠标总是会先离开前一个元素
  // 如果设置了 currentElem，那么我们就没有鼠标所悬停在的前一个 <td>，
  // 忽略此事件
  if (currentElem) return;

  let target = event.target.closest('td');

  // 我们移动到的不是一个 <td> —— 忽略
  if (!target) return;

  // 现在移动到了 <td> 上，但在处于了我们表格的外部（可能因为是嵌套的表格）
  // 忽略
  if (!table.contains(target)) return;

  // 给力！我们进入了一个新的 <td>
  currentElem = target;
  onEnter(currentElem);
};


table.onmouseout = function(event) {
  // 如果我们现在处于所有 <td> 的外部，则忽略此事件
  // 这可能是一个表格内的移动，但是在 <td> 外，
  // 例如从一个 <tr> 到另一个 <tr>
  if (!currentElem) return;

  // 我们将要离开这个元素 —— 去哪儿？可能是去一个后代？
  let relatedTarget = event.relatedTarget;

  while (relatedTarget) {
    // 到父链上并检查 —— 我们是否还在 currentElem 内
    // 然后发现，这只是一个内部移动 —— 忽略它
    if (relatedTarget == currentElem) return;

    relatedTarget = relatedTarget.parentNode;
  }

  // 我们离开了 <td>。真的。
  onLeave(currentElem);
  currentElem = null;
};

// 任何处理进入/离开一个元素的函数
function onEnter(elem) {
  elem.style.background = 'pink';

  // 在文本区域显示它
  text.value += `over -> ${currentElem.tagName}.${currentElem.className}\n`;
  text.scrollTop = 1e6;
}

function onLeave(elem) {
  elem.style.background = '';

  // 在文本区域显示它
  text.value += `out <- ${elem.tagName}.${elem.className}\n`;
  text.scrollTop = 1e6;
}
