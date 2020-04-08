let isDragging = false;

document.addEventListener('mousedown', function(event) {

  let dragElement = event.target.closest('.draggable');

  if (!dragElement) return;

  event.preventDefault();

  dragElement.ondragstart = function() {
      return false;
  };

  let coords, shiftX, shiftY;

  startDrag(dragElement, event.clientX, event.clientY);

  function onMouseUp(event) {
    finishDrag();
  };

  function onMouseMove(event) {
    moveAt(event.clientX, event.clientY);
  }

  // 在拖动开始时：
  //   记住初始的移位
  //   将元素设置为 position:fixed，并将此元素移动到作为 body 的直接子元素
  function startDrag(element, clientX, clientY) {
    if(isDragging) {
      return;
    }

    isDragging = true;

    document.addEventListener('mousemove', onMouseMove);
    element.addEventListener('mouseup', onMouseUp);

    shiftX = clientX - element.getBoundingClientRect().left;
    shiftY = clientY - element.getBoundingClientRect().top;

    element.style.position = 'fixed';

    moveAt(clientX, clientY);
  };

  // 在最后，转换到绝对（absolute）坐标，以将元素固定在文档中
  function finishDrag() {
    if(!isDragging) {
      return;
    }

    isDragging = false;

    dragElement.style.top = parseInt(dragElement.style.top) + window.pageYOffset + 'px';
    dragElement.style.position = 'absolute';

    document.removeEventListener('mousemove', onMouseMove);
    dragElement.removeEventListener('mouseup', onMouseUp);
  }

  function moveAt(clientX, clientY) {
    // 新的窗口相对坐标
    let newX = clientX - shiftX;
    let newY = clientY - shiftY;

    // 检查新坐标是否在底部窗口边缘以下
    let newBottom = newY + dragElement.offsetHeight; // new bottom

    // 在窗口边缘以下？让我们滚动此页面
    if (newBottom > document.documentElement.clientHeight) {
      // 文档末端的窗口相对坐标
      let docBottom = document.documentElement.getBoundingClientRect().bottom;

      // 将文档向下滚动 10px 有一个问题
      // 它可以滚动到文档末尾之后
      // Math.min(how much left to the end, 10)
      let scrollY = Math.min(docBottom - newBottom, 10);

      // 计算是不精确的，可能会有舍入误差导致页面向上滚动
      // 这是不应该出现，我们在这儿解决它
      if (scrollY < 0) scrollY = 0;

      window.scrollBy(0, scrollY);

      // 快速移动鼠标将指针移至文档末端的外面
      // 如果发生这种情况 ——
      //  使用最大的可能距离来限制 newY（就是文档末端到顶端的距离）
      newY = Math.min(newY, document.documentElement.clientHeight - dragElement.offsetHeight);
    }

    // 检查新坐标是否在顶部窗口边缘上方（类似的逻辑）
    if (newY < 0) {
      // scroll up
      let scrollY = Math.min(-newY, 10);
      if (scrollY < 0) scrollY = 0; // 检查精度损失

      window.scrollBy(0, -scrollY);
      // 快速移动鼠标可以使指针超出文档的顶端
      newY = Math.max(newY, 0); // newY 不得小于 0
    }


    // 将 newX 限制在窗口范围内
    // 这里没有滚动，所以它很简单
    if (newX < 0) newX = 0;
    if (newX > document.documentElement.clientWidth - dragElement.offsetWidth) {
      newX = document.documentElement.clientWidth - dragElement.offsetWidth;
    }

    dragElement.style.left = newX + 'px';
    dragElement.style.top = newY + 'px';
  }

});
