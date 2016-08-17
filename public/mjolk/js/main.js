var images = [
	'1.jpg',
	'2.jpg',
	'3.jpg',
	'4.jpg',
	'5.png',
	'6.png',
	'7.jpg',
	'8.jpg',
	'9.jpg',
	'10.jpg',
	'11.gif',
	'12.jpg',
	'13.jpg',
	'14.jpg',
	'15.jpg',
	'16.jpg',
	'17.jpg',
];
var el = document.getElementById('images');

images.forEach(function(img){
	el.innerHTML += '<img class="img-responsive" src="mjolk/images/' + img + '">';
});
