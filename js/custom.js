(function () {
  'use strict';

  // Menu-toggle
  let btn = document.querySelector('.menu-toggle');
  let nav = document.querySelector('.panel-aside');

  btn.addEventListener('click', function() {
      nav.classList.toggle('active');
      btn.classList.toggle('active-btn');
  });

  // Smooth scroll
  let requestAnimationFrame = window.requestAnimationFrame ||
                              window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame ||
                              window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;

  let menu = document.querySelector('.menu'),
    items = menu.querySelectorAll('span'),
    containers = document.querySelectorAll('.content > .sect');

  let pageHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );

  menu.onclick = function(e) {
    if (e.target.tagName != 'SPAN') return;
    let current = switchLinks(e.target);
    selectContainer(current);
  }

  function switchLinks(el) {
    let current;
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
        let startY = container.getBoundingClientRect().top + 100,
            direction = (startY < 0) ? -1 : (startY > 0) ? 1 : 0;

        if (direction == 0) return;

        scroll(container, direction)
      }
    });
  }

  function scroll(el, direction) {
    let duration = 2000,
      start = new Date().getTime();

    let fn = function () {
      let top = el.getBoundingClientRect().top - 45,
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

  // Birthday
  function declOfNum(number, titles) {
    let cases = [2, 0, 1, 1, 1, 2];  
    return number + " " + titles[ (number % 100 > 4 && number % 100 < 20) ? 2 
      : cases[(number % 10 < 5) ? number % 10 : 5] ];  
  }

  function birthDateToAge(birthday) {
    let n = new Date(); 
    var birthday = new Date(birthday);
    let age = n.getFullYear() - birthday.getFullYear();
    return n.setFullYear(1972) < birthday.setFullYear(1972) ? age - 1 : age;
  }

  let year = ( declOfNum(birthDateToAge("1994-03-28"), ['год', 'года', 'лет']) );
  document.querySelector(".year").innerHTML = year;

  // Modal window
  // use library closest
  !function(e){"function"!=typeof e.matches&&(e.matches=e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||function(e){for(var t=this,o=(t.document||t.ownerDocument).querySelectorAll(e),n=0;o[n]&&o[n]!==t;)++n;return Boolean(o[n])}),"function"!=typeof e.closest&&(e.closest=function(e){for(var t=this;t&&1===t.nodeType;){if(t.matches(e))return t;t=t.parentNode}return null})}(window.Element.prototype);

  document.addEventListener('DOMContentLoaded', function() {

    let modalButtons = document.querySelectorAll('.js-open-modal');
    let overlay = document.querySelector('.js-overlay-modal');
    let closeButtons = document.querySelectorAll('.js-modal-close');

    modalButtons.forEach(function(item) {

      item.addEventListener('click', function(e) {
        e.preventDefault();

        let modalId = this.getAttribute('data-modal');
        let modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');

        modalElem.classList.add('active-modal');
        overlay.classList.add('active-modal');
    });
  });

  closeButtons.forEach(function(item) {

    item.addEventListener('click', function(e) {
      let parentModal = this.closest('.modal');

      parentModal.classList.remove('active-modal');
      overlay.classList.remove('active-modal');
    });

  });

  document.body.addEventListener('keyup', function (e) {
    let key = e.keyCode;

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

  // Scroll to up
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

  // Animation for button
  document.querySelector('.btn').onmousemove = e => {

    const x = e.pageX - e.target.offsetLeft;
    const y = e.pageY - e.target.offsetTop;

    e.target.style.setProperty('--x', `${x}px`);
    e.target.style.setProperty('--y', `${y}px`);

  };

})();