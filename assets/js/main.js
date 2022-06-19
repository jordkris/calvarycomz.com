$(document).ready(function() {


    /* Navigation burger onclick side navigation show */
    $('.burger-container').on('click', function() {
        $('.main-navigation').toggle('slow');

        if ($('#myBtn').hasClass('change')) {
            $('body').addClass('stop-scroll');
        } else {
            $('body').removeClass('stop-scroll');
        }
    });

});



// var counta = 0;

// $(window).scroll(function(e){


// 	/* Onscroll number counter */
// 	var statisticNumbers = $('.single-count');
// 	if(statisticNumbers.length) {
// 		var oTop = statisticNumbers.offset().top - window.innerHeight;
// 		if (counta == 0 && $(window).scrollTop() > oTop) {
// 			$('.count').each(function() {
// 				var $this = $(this),
// 				countTo = $this.attr('data-count');
// 				$({
// 					countNum: $this.text()
// 				}).animate({
// 					countNum: countTo
// 				},

// 				{
// 					duration: 2000,
// 					easing: 'swing',
// 					step: function() {
// 						$this.text(Math.floor(this.countNum));
// 					},
// 					complete: function() {
// 						$this.text(this.countNum);
// 					}
// 				});
// 			});
// 			counta = 1;
// 		}
// 	}

// });