(function () {
	'use strict';

  let btn = document.querySelector('.menu-toggle');
  let nav = document.querySelector('.mobile-top');

  btn.addEventListener('click', function() {
      nav.classList.toggle('active');
      btn.classList.toggle('active-btn');
  });
})();