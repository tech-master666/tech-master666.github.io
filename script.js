// 点击案例图放大查看，再点任意处关闭
document.addEventListener('DOMContentLoaded', function () {
  var img = document.querySelector('.shot img');
  if (!img) return;
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', function () {
    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(10,16,30,.9);display:flex;align-items:center;justify-content:center;z-index:99;cursor:zoom-out;padding:16px';
    var big = document.createElement('img');
    big.src = img.src;
    big.alt = img.alt;
    big.style.cssText = 'max-width:100%;max-height:100%;border-radius:8px';
    overlay.appendChild(big);
    overlay.addEventListener('click', function () { overlay.remove(); });
    document.body.appendChild(overlay);
  });
});
