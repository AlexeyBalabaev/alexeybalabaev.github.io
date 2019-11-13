$(document).ready(function() {
	$('.popup-youtube').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,

		fixedContentPos: false
	});

	$('.image-popup-no-margins').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: false,
		fixedContentPos: true,
		mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
		image: {
			verticalFit: true
		},
		zoom: {
			enabled: true,
			duration: 300 // don't foget to change the duration also in CSS
		}
	});

	$('.comment-box').slick({
	  slidesToShow: 4,
	  slidesToScroll: 1,
	  autoplay: true,
	  autoplaySpeed: 7000,
	  prevArrow: '<button type="button" class="slick-prev"><img src="image/prev.png" alt=""></button>',
		nextArrow: '<button type="button" class="slick-next"><img src="image/next.png" alt=""></button>',
		responsive: [
		{
			breakpoint: 960,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
				autoplaySpeed: 10000
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2
			}
		}
		]
	});

	const $menu = $('.menu-toggle');

	$(document).mouseup(e => {
		if (!$menu.is(e.target) && $menu.has(e.target).length === 0) {
			$menu.removeClass('is-active');
		}
	});

	$(".nav-list__item--link").on('click', () => {
    $menu.removeClass('is-active');
	});

	$('.nav-button').on('click', () => {
		$menu.toggleClass('is-active');
	});


});