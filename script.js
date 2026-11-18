// 041030.top v2 — 处理前/后切换 + 终端日志打字机（支持重播）
document.addEventListener('DOMContentLoaded', function () {
  var btns = document.querySelectorAll('.toggle-btn');
  var sheets = document.querySelectorAll('.sheet-card');
  btns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var view = btn.getAttribute('data-view');
      btns.forEach(function (b) {
        var active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      sheets.forEach(function (s) {
        s.classList.toggle('is-active', s.getAttribute('data-sheet') === view);
      });
    });
  });

  var lines = [
    '$ python clean_sales.py ./raw_20_stores --out ./交付汇总',
    '[读取] 扫描 20 个门店工作簿 ............ 完成',
    '[清洗] 定位第3行表头 / 剥离空行与手工合计行',
    '[去重] 发现并剔除重复订单 (SH1042等) ... 3 条',
    '[合并] 473 条有效明细 -> 总汇总表.xlsx',
    '[拆分] 按大区规则生成 5 份精排分表',
    '[对账] 总额 ¥163,139.00 · 误差 0.00 ✓ (耗时 1.42s)'
  ];
  var body = document.getElementById('termBody');
  var replayBtn = document.getElementById('termReplay');
  if (!body) return;
  var timers = [];

  function clearTimers() {
    while (timers.length) clearTimeout(timers.pop());
  }

  function typeLines() {
    clearTimers();
    body.textContent = '';
    var li = 0;
    function nextLine() {
      if (li >= lines.length) return;
      var line = lines[li];
      var span = document.createElement('span');
      if (line.indexOf('[对账]') === 0) span.className = 'ok';
      if (line.charAt(0) === '$') span.className = 'dim';
      body.appendChild(span);
      var ci = 0;
      function step() {
        span.textContent = line.slice(0, ++ci);
        if (ci < line.length) {
          timers.push(setTimeout(step, 14));
        } else {
          body.appendChild(document.createTextNode('\n'));
          li++;
          timers.push(setTimeout(nextLine, 150));
        }
      }
      step();
    }
    nextLine();
  }

  if (replayBtn) {
    replayBtn.addEventListener('click', typeLines);
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { typeLines(); io.disconnect(); }
    }, { threshold: 0.35 });
    io.observe(body);
  } else {
    typeLines();
  }
});
