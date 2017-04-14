jQuery(function($) {

	$('.carousel').bcSwipe({ threshold: 50 });

	//Preloader
	var preloader = $('.preloader');

	var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};


if(played()==0 && !isMobile.any()){
	var video = document.getElementById('myvideo').src="images/Glitch_Zoom.mp4";
	document.getElementById('myvideo').addEventListener('ended',myHandler,false);
    function myHandler(e) {
			var delayMillis = 1500; //1 second
				//console.log("first time");
				setTimeout(function(){ preloader.remove(); setTimeout(function(){ document.getElementById("header").style.backgroundImage = "url('images/header_anm.gif')"; document.getElementById("myLogo").className  = "logo pull-left animated pulse"; },500);},delayMillis);
				}
		}
	else{
		if(isMobile.any()){
			//console.log("mobile device");
		}
				//console.log("not first time");
				preloader.remove();
				//This used to cause the top header animations on mobile
				//setTimeout(function(){ document.getElementById("header").style.backgroundImage = "url('images/header_anm.gif')"; document.getElementById("myLogo").className  = "logo pull-left animated pulse"; },500);

        //setTimeout(function(){ preloader.remove(); setTimeout(function(){ document.getElementById("header").style.backgroundImage = "url('images/header_anm.gif')"; document.getElementById("myLogo").className  = "logo pull-left animated pulse"; },500);},delayMillis);
    }/*
	$(window).load(function(){
		preloader.remove();
	});*/


//remove shadow from mobile version for mobile
	if(isMobile.any()){
		$('head').append('<style>.card:after{box-shadow: none !important;}</style>');
		//remove text from menu if need be.
		if(screen.width < 370){
			document.getElementById("menuNavi").innerHTML = "<i class=\"fa fa-align-justify\"></i>";
		}
	}



	function played(){
	        var ca = document.cookie.split(';');
	        for(var i=0; i<ca.length; i++) {
	                var c = ca[i];
	                while (c.charAt(0)==' ') c = c.substring(1,c.length);
	                if (c.indexOf("played=") == 0) return 1;
	        }
	        var date = new Date();
	        /*var days = 7;
	        date.setTime(date.getTime()+(days*24*60*60*1000));*/
					var days = 1;
					date.setTime(date.getTime()+(1*1*60*60*1000));
	        document.cookie = "played=1"+"; expires="+date.toGMTString()+"; path=/";
	        return 0;
	}



	// Menu
	$('#header .nav-button').on('click',function(){
		$('#navigation').fadeIn();
	});

	$('#hidemenu').on('click', function(){
		$('#navigation').fadeOut();
	});

	$('.main-nav ul li a').on('click', function(){
		$('#navigation').fadeOut();
	});

	var slider = $('#page-slider .carousel-inner').find('.item');
	$('#page-slider').on('slid.bs.carousel', function () {
		var curIndex 	= slider.filter('.active').index();
		var menuItems 	= $('.main-nav ul').find('li');
		menuItems.removeClass('active').eq(curIndex).addClass('active');
	});

	//Contact Form
	var form = $('#contact-form');
	form.submit(function(event){
		event.preventDefault();
		var form_status = $('.form-status');
		$.ajax({
			url: $(this).attr('action'),
			beforeSend: function(){
				form_status.find('.form-status-content').html('<p><i class="fa fa-spinner fa-spin"></i> Email is sending...</p>').fadeIn();
			}
		}).done(function(data){
			form_status.find('.form-status-content').html('<p class="text-success">Thank you for contact us. As early as possible  we will contact you</p>').delay(3000).fadeOut();
		});
	});



	function AdjustNew(num, OldMax, OldMin)
	{
			var NewMin = 0.65;
			var NewMax = 1.15;
			var NewValue = 0;
			if (OldMax - OldMin != 0)
			{
					NewValue = (((NewMax - NewMin) * (num - OldMin) / (OldMax - OldMin))) + NewMin;
			}

				//flip the colors. otherwise its yellow > blue.
				//Prefer Blue to Yellow.
			var difference;
			if(NewValue < 0.9	){
				difference = NewValue - NewMin;
				NewValue = NewMax - difference;
			}
			else{
				difference = NewMax - NewValue;
				NewValue = NewMin + difference;
			}

			if(NewValue > 1){
				NewValue = NewValue - 1;
			}




			return NewValue;
	}

	function Adjust(num, OldMax, OldMin)
  {
      var NewMin = 217;
      var NewMax = 365;
      var NewValue = 0;
      if (OldMax - OldMin != 0)
      {
          NewValue = (((NewMax - NewMin) * (num - OldMin) / (OldMax - OldMin))) + NewMin;
      }
			NewValue = Math.round(NewValue);
      return NewValue;
  }

	function hslToRgb(h, s, l){

//console.log(document.getElementById('welcome-page').style.color);

	    var r, g, b;

	    if(s == 0){
	        r = g = b = l; // achromatic
	    }else{
	        var hue2rgb = function hue2rgb(p, q, t){
	            if(t < 0) t += 1;
	            if(t > 1) t -= 1;
	            if(t < 1/6) return p + (q - p) * 6 * t;
	            if(t < 1/2) return q;
	            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
	            return p;
	        }

	        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	        var p = 2 * l - q;
	        r = hue2rgb(p, q, h + 1/3);
	        g = hue2rgb(p, q, h);
	        b = hue2rgb(p, q, h - 1/3);
	    }

	    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
	}



//var itsHere = false;

function doAnimations(elems) {
  var animEndEv = 'webkitAnimationEnd animationend';

  elems.each(function () {
    var $this = $(this),
        $animationType = $this.data('animation');

    // Add animate.css classes to
    // the elements to be animated
    // Remove animate.css classes
    // once the animation event has ended
    $this.addClass($animationType).one(animEndEv, function () {
      $this.removeClass($animationType);
			//if($this.data('id') == "strive"){
			///	setTimeout(function() {
			//		itsHere = true;
			//  }, 800);
		//};
    });
  });
}

// Select the elements to be animated
// in the first slide on page load
var $firstAnimatingElems = $("#page-slider").find('.item:first')
                           .find('[data-animation ^= "animated"]');

// Apply the animation using our function
doAnimations($firstAnimatingElems);

// Pause the carousel
	$("#page-slider").carousel('pause');
//var int1;
// Attach our doAnimations() function to the
// carousel's slide.bs.carousel event
	$("#page-slider").on('slide.bs.carousel', function (e) {
		//clearTimeout(timer1);
		//clearTimeout(timer2);
		//clearInterval(int1);
  // Select the elements to be animated inside the active slide


  var $animatingElems = $(e.relatedTarget)
                        .find("[data-animation ^= 'animated']");



	//changeWord();
	//int1 = setInterval(changeWord, 4000);

  //itsHere = false;
  doAnimations($animatingElems);

});


	//color background

	/*
	const w = window.innerWidth

const getPercentX = x => Math.round(x / w * 360)
//var Rx = require('rx');
const mouse$ = Rx.Observable
  .fromEvent(document, 'mousemove')
  .map(({ clientX }) => {
    const percentX = getPercentX(clientX)


const colormp = Adjust(percentX,400,0);
const colormpn = AdjustNew(colormp,217,365);
		const color = hslToRgb(colormpn,0.4, 0.15);


document.getElementById('welcome-page').style.background = "linear-gradient(135deg, rgba(" + color[0] + "," + color[1] + "," + color[2] + ",0.5), rgba(" + color[0] + "," + color[1] + "," + color[2] + ",0.5)), url('images/bodysm2.png')";

    return {
      xStart: percentX,
      xEnd:   percentX + 120,
			xColor1: color[0],
			xColor2: color[1],
			xColor3: color[2]
    }
  });


RxCSS({grad: mouse$})
*/

//test rotating animations
/*

var words = document.getElementsByClassName('word');
var wordArray = [];
var currentWord = 0;

words[currentWord].style.opacity = 1;
for (var i = 0; i < words.length; i++) {
  splitLetters(words[i]);
}

function changeWord() {
	//skip first iteration
	if(!itsHere){
		console.log("NOT HERE YET");
		return;
	}
	console.log("HERE");
  var cw = wordArray[currentWord];
  var nw = currentWord == words.length-1 ? wordArray[0] : wordArray[currentWord+1];
  for (var i = 0; i < cw.length; i++) {
    animateLetterOut(cw, i);
  }

  for (var i = 0; i < nw.length; i++) {
    nw[i].className = 'letter behind';
    nw[0].parentElement.style.opacity = 1;
    animateLetterIn(nw, i);
  }

  currentWord = (currentWord == wordArray.length-1) ? 0 : currentWord+1;
}
var timer1;
var timer2;
function animateLetterOut(cw, i) {
  timer1 = setTimeout(function() {
		cw[i].className = 'letter out';
  }, i*80);
}

function animateLetterIn(nw, i) {
  timer2 = setTimeout(function() {
		nw[i].className = 'letter in';
  }, 340+(i*80));
}

function splitLetters(word) {
  var content = word.innerHTML;
  word.innerHTML = '';
  var letters = [];
  for (var i = 0; i < content.length; i++) {
    var letter = document.createElement('span');
    letter.className = 'letter';
    letter.innerHTML = content.charAt(i);
    word.appendChild(letter);
    letters.push(letter);
  }

  wordArray.push(letters);
}
*/


/* mouse hover 3d*/

// why it doesn't work on firefox?
var card = $(".card");

$(document).on("mousemove",function(e) {
	if(!isMobile.any()){
  var ax = -($(window).innerWidth()/2- e.pageX)/20;
  var ay = ($(window).innerHeight()/2- e.pageY)/10;
  card.attr("style", "transform: rotateY("+ax+"deg) rotateX("+ay+"deg);-webkit-transform: rotateY("+ax+"deg) rotateX("+ay+"deg);-moz-transform: rotateY("+ax+"deg) rotateX("+ay+"deg)");
}
});

});
