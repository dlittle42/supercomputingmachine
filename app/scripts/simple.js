/*global define */
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

		$(this).addClass("touched");

		
		//$(this).css({animation: 'rotation .5s 1 ease-in-out'})

	});
	$('.logo').bind('touchend mouseup', function(e){
		// $(this).delay(500).removeClass("touched");

	});


  //  $("#salutation").fitText(1.1, { minFontSize: '50px', maxFontSize: '75px' });
  //  $("#comment").fitText(0.8, { minFontSize: '20px', maxFontSize: '45px' });


}


define([], function (swiper) {
    //'use strict';
	initSimple();
	
});