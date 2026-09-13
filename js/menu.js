(function () {
  var toggle = document.querySelector('.menu-toggle');
  var menu = document.getElementById('menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var aberto = menu.classList.toggle('aberto');
      toggle.setAttribute('aria-expanded', aberto ? 'true' : 'false');
    });
  }
  document.querySelectorAll('.tem-submenu > button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var exp = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', exp ? 'false' : 'true');
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('[aria-expanded="true"]').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
      if (menu) menu.classList.remove('aberto');
    }
  });
})();
