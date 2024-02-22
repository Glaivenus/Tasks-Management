document.addEventListener('DOMContentLoaded', function() {
  var draggables = document.querySelectorAll('.draggable');

  draggables.forEach(function(draggable) {
    var dragHandle = draggable.querySelector('.drag-handle');
    var active = false;
    var currentX;
    var currentY;
    var initialX;
    var initialY;
    var xOffset = 0;
    var yOffset = 0;

    dragHandle.addEventListener('mousedown', dragStart, false);
    dragHandle.addEventListener('touchstart', dragStart, false); // 添加对触摸开始的监听
    document.addEventListener('mouseup', dragEnd, false);
    document.addEventListener('touchend', dragEnd, false); // 添加对触摸结束的监听
    document.addEventListener('mousemove', drag, false);
    document.addEventListener('touchmove', drag, false); // 添加对触摸移动的监听

    function dragStart(e) {
      if (e.type === 'touchstart') { // 处理触摸事件
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
      } else { // 处理鼠标事件
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
      }

      if (e.target === dragHandle) {
        active = true;
      }
    }

    function dragEnd(e) {
      initialX = currentX;
      initialY = currentY;
      active = false;
    }

    function drag(e) {
      if (active) {
        e.preventDefault();
        
        if (e.type === 'touchmove') { // 处理触摸移动
          currentX = e.touches[0].clientX - initialX;
          currentY = e.touches[0].clientY - initialY;
        } else { // 处理鼠标移动
          currentX = e.clientX - initialX;
          currentY = e.clientY - initialY;
        }
        
        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, currentY, draggable);
      }
    }

    function setTranslate(xPos, yPos, el) {
      el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }
  });
});
