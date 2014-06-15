$(document).ready(function() {
	$('.hero-content h3').click(function() {
		subText = $(this).text();
		$(this).text(subText + "!!!");
	});

	var onHoverAction = function(event) {
		console.log('Hover action triggered.');
		$(this).animate({'margin-top': '10px'});
	};

	var offHoveraction = function(event) {
		console.log('Off-hover action triggered.');
		$(this).animate({'margin-top': '0px'});
	};

	$('.selling-points .point').hover(onHoverAction, offHoveraction);

});
3