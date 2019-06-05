(function () {
	'use strict';

  //menu-toggle

  var btn = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.panel-aside');

  btn.addEventListener('click', function() {
      nav.classList.toggle('active');
      btn.classList.toggle('active-btn');
  });

  //smooth scroll

  var requestAnimationFrame = window.requestAnimationFrame ||
                              window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame ||
                              window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;

  var menu = document.querySelector('.menu'),
    items = menu.querySelectorAll('span'),
    containers = document.querySelectorAll('.content > .sect');

  var pageHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );

  menu.onclick = function(e) {
    if (e.target.tagName != 'SPAN') return;
    var current = switchLinks(e.target);
    selectContainer(current);
  }

  function switchLinks(el) {
    var current;
    [].forEach.call(items, function(item, index) {
      item.classList.remove('active');
      if (item === el) {
        item.classList.add('active');
        current = index;
      }
    });
    return current;
  }

  function selectContainer(current) {
    [].forEach.call(containers, function(container, index) {
      if (index == current) {
        var startY = container.getBoundingClientRect().top + 100,
            direction = (startY < 0) ? -1 : (startY > 0) ? 1 : 0;

        if (direction == 0) return;

        scroll(container, direction)
      }
    });
  }

  function scroll(el, direction) {
    var duration = 2000,
      start = new Date().getTime();

    var fn = function () {
      var top = el.getBoundingClientRect().top - 45,
          now = new Date().getTime() - start,
          result = Math.round(top * now / duration);

      result = (result > direction * top) ? top : (result == 0) ? direction : result;

      if (direction * top > 0 && (pageHeight - window.pageYOffset) > direction * document.documentElement.clientHeight) {
        window.scrollBy(0, result);
        requestAnimationFrame(fn);
      }
    }

    requestAnimationFrame(fn);
  }

  // modal window

  !function(e){"function"!=typeof e.matches&&(e.matches=e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||function(e){for(var t=this,o=(t.document||t.ownerDocument).querySelectorAll(e),n=0;o[n]&&o[n]!==t;)++n;return Boolean(o[n])}),"function"!=typeof e.closest&&(e.closest=function(e){for(var t=this;t&&1===t.nodeType;){if(t.matches(e))return t;t=t.parentNode}return null})}(window.Element.prototype);
  document.addEventListener('DOMContentLoaded', function() {

  var modalButtons = document.querySelectorAll('.js-open-modal'),
      overlay      = document.querySelector('.js-overlay-modal'),
      closeButtons = document.querySelectorAll('.js-modal-close');

  modalButtons.forEach(function(item){

    item.addEventListener('click', function(e) {
      e.preventDefault();

      var modalId = this.getAttribute('data-modal'),
      modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');
      modalElem.classList.add('active-modal');
      overlay.classList.add('active-modal');
    });

  });

  closeButtons.forEach(function(item){

    item.addEventListener('click', function(e) {
      var parentModal = this.closest('.modal');

      parentModal.classList.remove('active-modal');
      overlay.classList.remove('active-modal');
    });

  });

  document.body.addEventListener('keyup', function (e) {
    var key = e.keyCode;

    if (key == 27) {
      document.querySelector('.modal.active-modal').classList.remove('active-modal');
      document.querySelector('.overlay').classList.remove('active-modal');
    };
  }, false);

  overlay.addEventListener('click', function() {
    document.querySelector('.modal.active-modal').classList.remove('active-modal');
    this.classList.remove('active-modal');
  });

});

	//Scroll to up

  function trackScroll() {
    let scrolled = window.pageYOffset;
    let coords = document.documentElement.clientHeight;

    if (scrolled > coords) {
      goTopBtn.classList.add('back-top-show');
    }
    if (scrolled < coords) {
      goTopBtn.classList.remove('back-top-show');
    }
  }

  function backToTop() {
    if (window.pageYOffset > 0) {
      window.scrollBy(0, -25);
      setTimeout(backToTop, 0);
    }
  }

  let goTopBtn = document.querySelector('.back-top');

  window.addEventListener('scroll', trackScroll);
  goTopBtn.addEventListener('click', backToTop);

  //Animation for button

	document.querySelector('.btn').onmousemove = e => {

	  const x = e.pageX - e.target.offsetLeft;
	  const y = e.pageY - e.target.offsetTop;

	  e.target.style.setProperty('--x', `${x}px`);
	  e.target.style.setProperty('--y', `${y}px`);

	};

})();