jQuery(function($) {

	//Preloader
	var preloader = $('.preloader');

	document.getElementById('myvideo').addEventListener('ended',myHandler,false);
    function myHandler(e) {
			var delayMillis = 1500; //1 second
			if(played()==0){
				console.log("first time");
				setTimeout(function(){ preloader.remove(); setTimeout(function(){ document.getElementById("header").style.backgroundImage = "url('images/header_anm.gif')"; document.getElementById("myLogo").className  = "logo pull-left animated pulse"; },500);},delayMillis);
				}
			else{
				console.log("NOT first time");
				setTimeout(function(){ preloader.remove(); setTimeout(function(){ document.getElementById("header").style.backgroundImage = "url('images/header_anm.gif')"; document.getElementById("myLogo").className  = "logo pull-left animated pulse"; },500);},0);
		}
        //setTimeout(function(){ preloader.remove(); setTimeout(function(){ document.getElementById("header").style.backgroundImage = "url('images/header_anm.gif')"; document.getElementById("myLogo").className  = "logo pull-left animated pulse"; },500);},delayMillis);
    }/*
	$(window).load(function(){
		preloader.remove();
	});*/


	function played(){
	        var ca = document.cookie.split(';');
	        for(var i=0; i<ca.length; i++) {
	                var c = ca[i];
	                while (c.charAt(0)==' ') c = c.substring(1,c.length);
	                if (c.indexOf("played=") == 0) return 1;
	        }
	        var date = new Date();
	        var days = 7;
	        date.setTime(date.getTime()+(days*24*60*60*1000));
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
});
