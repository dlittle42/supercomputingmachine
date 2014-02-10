/*global define */

function mobilecheck() {
		var check = false;
		//removed 'ipad'
		(function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
		return check;
	}

var sayings = {
	"headlines" : [
        "Oh.",
        "Greetings",
        "Aloha",
        "Get Ready"
    ],
    "comment" : [
        "Didn't see you there",
        "About time for a change, right?",
        "Did you see that game last night?!",
        "Lemme get a coffee. Be right back."

    ]
}

var greetingJSON = {"phrases": [
        {	
        	"salutation": "Oh.",
        	"comment": "Didn't see you there."
        },
        {	
        	"salutation": "Blimey!",
        	"comment": "You startled me."
        },
        {	
        	"salutation": "Well,",
        	"comment": "It's about time."
        },
        {	
        	"salutation": "Hey!",
        	"comment": "I thought you'd never show."
        },
        {	
        	"salutation": "Hola.",
        	"comment": "You've come to the right place."
        },
        {	
        	"salutation": "Hello.",
        	"comment": "It's a fine day for parcheesi."
        },
        {	
        	"salutation": "Dude...",
        	"comment": "Did you catch that game last night?"
        },
        {	
        	"salutation": "Face front, true believer!",
        	"comment": "Let us begin our journey."
        },
        {	
        	"salutation": "Why...",
        	"comment": "if it weren't for you meddling kids..."
        },
        {	
        	"salutation": "By the Hoary Hosts of Hoggarth!",
        	"comment": "Let's get this show on the road."
        },
        {	
        	"salutation": "Greg Oden's Raven!",
        	"comment": "What made you decide on that outfit?!"
        },
    ]
};

function selectPhrase(){
	var rand = Math.floor(Math.random()*greetingJSON.phrases.length)
	console.log(greetingJSON.phrases[rand].salutation);
	console.log(greetingJSON.phrases[rand].comment);
	$('#salutation').text(greetingJSON.phrases[rand].salutation);
	$('#comment').text(greetingJSON.phrases[rand].comment);
}



function initSimple(){

	/*	Define Click Event for Mobile */
	if( 'ontouchstart' in window ){ var click = 'touchstart'; }
	else { var click = 'click'; }



	console.log("it's simple");
	
	selectPhrase();
	
	$('.logo').on({
		 click : function(){ 
		 	/* do something... */ 
		 	$('#greeting').fadeOut(100, function(){
		  		selectPhrase();
	            $('#greeting').delay(200).fadeIn(500);
	        });
		 	//var logo = $(this);
	       // TweenLite.to(logo, 1, {width:100, height:200});
	        /*
		  	var panel = $(this);
		  	if (panel.hasClass('shrink')) {
		  		panel.removeClass('shrink');
		  	}else{
		  		panel.addClass('shrink');
		  	}
		  	*/
		 } 
	});
	/*
	$('#logo').click(function(e) {
	  e.preventDefault();

	  $('.jumbotron').fadeOut(500, function(){
	  		selectPhrase();
            $('.jumbotron').delay(500).fadeIn(500);
        });
	  var panel = $(this);
	  	if (panel.hasClass('shrink')) {
	  		panel.removeClass('shrink');
	  	}else{
	  		panel.addClass('shrink');
	  	}
	  	*/
/*
	    if (panel.hasClass('reverse')) {
	        panel.removeClass('reverse').css({
	            'transform': 'rotateY(0deg)',
	            'transition-timing-function': 'cubic-bezier(0.3, -1, 0.7, 2)',
	            '-webkit-transform': 'rotateY(0deg)'
	        });
	    } else {
	        panel.addClass('reverse').css({
	            'transform': 'rotateY(180deg)',
	            'transition-timing-function': 'cubic-bezier(0.3, -1, 0.7, 2)',
	            '-webkit-transform': 'rotateY(180deg)'
	        });
	    }
	    
	});
*/

	$('#logo').bind('touchstart mousedown', function(e){
		$(this).addClass("touched");

	});
	$('#logo').bind('touchend mouseup', function(e){
		$(this).delay(100).removeClass("touched");

	});

	$(".logo").bind("webkitAnimationEnd mozAnimationEnd animationEnd", function(){
	  $(this).removeClass("touched");
	})

	$('.logo').bind('touchstart mousedown', function(e){
		initSwiper();
		$(this).addClass("touched");

		
		//$(this).css({animation: 'rotation .5s 1 ease-in-out'})

	});
	$('.logo').bind('touchend mouseup', function(e){
		// $(this).delay(500).removeClass("touched");

	});
}

  //  $("#salutation").fitText(1.1, { minFontSize: '50px', maxFontSize: '75px' });
  //  $("#comment").fitText(0.8, { minFontSize: '20px', maxFontSize: '45px' });


	function initSwiper(){

		
	console.log('swiper goooooooo');
	var slides;
	var vertonly;
/*
		if (mobilecheck()){
			slides = 1;
		}else{
			slides = 3;
		}
*/
		if (Modernizr.touch) { 
			//alert('Touch Screen');
			slides = 1;
			vertonly = false;
		} else { 
			//alert('No Touch Screen');
			slides = 3;
			vertonly = true;
		}


		if (vertonly == false){
			$('.swiper-container').css({'width':'100%', 'height':'100%'});
		  var swiperParent = new Swiper('.swiper-parent',{
		  //  pagination: '.pagination-parent',
		  //  paginationClickable: true,
		    loop: true,
		    keyboardControl: true,
		  //  mousewheelControl: true,
		    mousewheelControlForceToAxis: true,
		  cssWidthAndHeight: true,

		    slidesPerView: slides,
		    //scrollContainer: true,
		    mode: 'horizontal',
		 /*   scrollbar: {
		        container : '.swiper-scrollbar',
		        draggable : true,
		        hide: false,
		        snapOnRelease: false
		    },
		   */
		    onSlideClick: function(swiper){
		     // alert('PARENT '+ swiperParent.clickedSlideIndex);
		    }
	      
		    //slidesPerView: 'auto'
		  });
		}
	
	  var swiperNested1 = new Swiper('#swiper-nested1',{
	    mode: 'vertical',
	   // pagination: '.pagination-nested',
	   // paginationClickable: true,
	    freeMode: true,
	    freeModeFluid: true,
	    keyboardControl: true,
	 //   mousewheelControl: true,
	  //  mousewheelControlForceToAxis: true,
	    loop: true,
	    slidesPerView: 4,
	    
	    onSlideClick: function(swiper){
	      //alert('Hello '+ swiperNested1.clickedSlideIndex);
	    }
	  });
	  var swiperNested2 = new Swiper('#swiper-nested2',{
	    mode: 'vertical',
	   // pagination: '.pagination-nested',
	   // paginationClickable: true,
	    freeMode: true,
	    freeModeFluid: true,
	    keyboardControl: true,
	  //  mousewheelControl: true,
	  //  mousewheelControlForceToAxis: true,
	    loop: true,
	    slidesPerView: 4
	    //slidesPerView: slides
	  });
	  var swiperNested3 = new Swiper('#swiper-nested3',{
	    mode: 'vertical',
	   // pagination: '.pagination-nested',
	   // paginationClickable: true,
	    freeMode: true,
	    freeModeFluid: true,
	    keyboardControl: true,
	   //mousewheelControl: true,
	   // mousewheelControlForceToAxis: true,
	    loop: true,
	    slidesPerView: 4
	  });

	  var timeoutID;

	  function delayedSlide() {
		  timeoutID = window.setTimeout(toScreenTwo, 3000);
		}

		function toScreenTwo() {
		  swiperParent.swipeTo(1, 250, false);
		}

		//delayedSlide();


	  

}





define(['swiper', 'swiperScrollbar'], function (swiper) {
    //'use strict';
   // $('body').scrollTop(1);
	initSimple();
	initSwiper();
	
	
});