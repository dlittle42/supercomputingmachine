/*global define */
 var swiperParent,
     swiper_column1_nested,
     swiper_column2_nested,
     swiper_column3_nested,
     swiper_column4_nested,
     swiper_column5_nested,
     swiper_column6_nested,
     swiper_column7_nested,
     swiperProject,
     phablet = 620;//480, 
     owl_active = true;//false;

//Modernizr.touch=true;

 var document = window.document;
 var domain = document.domain;

 if ( domain == 'dev.supercomputingmachine.com'){
    var base = "dist/";
 }else{
    var base ="";
 }

 var setting = {

    voices: [
          'Alice',
          'Alva',
          'Bruce',
          'Damayanti',
          'Diego',
          'Ellen',
          'Fred',
          'Ioana',
          'Joana',
          'Junior',
          'Kanya',
          'Kyoko',
          'Lekha',
          'Melina',
          'Milena',
          'Moira',
          'Monica',
          'Nora',
          'Satu',
          'Tarik',
          'Thomas',
          'Ting-Ting',
          'Yuna',
          'Zosia',
          'Zuzana'
         // 'Google 普通话（中国大陆）',
         // 'Google 粤語（香港）',
         // 'Google 國語（臺灣）'
    ]
};


var hLoop,
    vLoop = true,
    doScroll,
    freeScroll,
    leftOffset;


    if (detectIE() != false){
        vLoop = false;
    }
   


if ($('body').width() <= phablet) { 
    leftOffset = 0;
    hLoop = false;
    $('.swiper-scrollbar').css('display', 'none');
}else{
    slides = 'auto';
    $('.full-slide').css('width', '100%').css('width', '-=150px');
    hLoop = false;//true;
    freeScroll = true;//false;
    leftOffset = 100;
}




if (!String.prototype.trim) {
	String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};
}

// voice code ////

var voiceList = setting.voices;
  var randomVoice = voiceList[Math.floor(Math.random()*voiceList.length)];

  var msg = new SpeechSynthesisUtterance();
 // console.log("!!"+msg);
  msg.text = 'Super Computing Machine';
  msg.onboundary = function(event) {
     // console.log('The msg boundary is to be spoken.')
  };

          
  // Queue this utterance.

  // make sure voices are loaded before playing. ?? get it to work on repeat???
  window.speechSynthesis.onvoiceschanged = function () {

    var voices = window.speechSynthesis.getVoices();

    //console.dir(voices);
    msg.voice = voices.filter(function(voice) { return voice.name == randomVoice })[0];
  //  window.speechSynthesis.speak(msg);
    //showName();
  };

  //document.getElementById("trigger").addEventListener('touchstart', handleEvent);
  //on iOS, only 'click' works on an a tag


 //window.addEventListener('touchstart', newVoice);
 //window.addEventListener('mousedown', newVoice);

  function newVoice(e){

  //  handleEvent(e);
  // alert('new voice')
   /* var saying = Math.floor(Math.random()*setting.phrases.length)
    msg.text = setting.phrases[saying].salutation + '     '+ setting.phrases[saying].comment;

  */


    var voices = window.speechSynthesis.getVoices();
    randomVoice = voiceList[Math.floor(Math.random()*voiceList.length)];
  //  randomVoice = 'Fred';
   // console.log(randomVoice)
    msg.voice = voices.filter(function(voice) { return voice.name == randomVoice })[0];
    window.speechSynthesis.speak(msg);

    $('.logo').addClass("touched");
    $('body').removeClass("thinking");
   // showName();
  }


function mobilecheck() {
		var check = false;
		//removed 'ipad'
		(function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
		return check;
	}


function detectIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    var trident = ua.indexOf('Trident/');

    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    if (trident > 0) {
        // IE 11 (or newer) => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    // other browser
    return false;
}



// Document title
            var title = document.title;

            // Simple log
            var log = function(msg) {
                var log = $('.log');
                if (!log.size()) {
                    log = $('<div class="log" />').appendTo('.page');
                }
                log.append(msg.replace(/^([^:]*):(.*)$/, '<p><b>$1:</b> <span class="$1">$2</span></p>'))
                    .attr({scrollTop: log.attr('scrollHeight')})
                    .find('p:nth-child(even)').addClass('even');
            };
            
            // Default tracker mock
            var track = function() {
                log('track: ' + arguments[0]);
            };

            // Serialization utility
            var serialize = function(obj, re) {
                var result = [];
                $.each(obj, function(i, val) {
                    if ((re && re.test(i)) || !re)
                        result.push(i + ': ' + (typeof val == 'object' ? val.join 
                            ? '\'' + val.join(', ') + '\'' : serialize(val) : '\'' + val + '\''));
                });
                return '{' + result.join(', ') + '}';
            };
            



//var greetingJSON = {"phrases": [
var column1_JSON = {"phrases": [
        {	
        	"salutation": "Hooray!",
        	"comment": "You made it."
        },
        {	
        	"salutation": "Blimey!",
        	"comment": "You startled me."
        },
        {	
        	"salutation": "OK,",
        	"comment": "Let's get to it!"
        },
        {	
        	"salutation": "Hey!",
        	"comment": "I thought you might show up."
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
        	"salutation": "Face front, true believer!",
        	"comment": "Let us begin our journey."
        },

        {	
        	"salutation": "By the Hoary Hosts of Hoggarth!",
        	"comment": "Let's get this show on the road."
        },
        {	
        	"salutation": "Greg Oden's Raven!",
        	"comment": "We've much to do..."
        },
        {	
        	"salutation": "Hey!",
        	"comment": "Look at you."
        },
        /*
        {	
        	"salutation": "HTML, CSS, JS. ",
        	"comment": "And many more acronyms..."
        }
        */
        /*,
        {   
            "salutation": "Jiminy Cricket,",
            "comment": "Is winter over yet?"
        }
        */
    ]
};

function selectPhrase(column){

    if (!column) var column = 'column1';

   // console.log('newColumn = '+newColumn);

        var rand = Math.floor(Math.random()*column1_JSON.phrases.length)
      //  console.log(column1_JSON.phrases[rand].salutation);
      //  console.log(column1_JSON.phrases[rand].comment);
        $('#'+column+' .salutation').text(column1_JSON.phrases[rand].salutation);
        $('#'+column+' .salutation').fadeIn(200);
        
        //timeoutSpinner = window.setTimeout(function(){
      //  $('.logo').addClass("touched");
       // }, 1000);

        $('.salutation-comment').text(column1_JSON.phrases[rand].comment);

        // speak quote ///
    //    msg.text = column1_JSON.phrases[rand].salutation + ". "+column1_JSON.phrases[rand].comment;
    //    newVoice();
      //  newVoice();



        if (column != 'column1'){
            $('.logo').addClass("touched");
           
        }
   // }
}
/*
function selectPhrase(target, column){
	if (!target) var target = 'greeting';
	if (!column) var column = 'column1';
	console.log(target);
	targetArray = eval(target+'JSON');

	var rand = Math.floor(Math.random()*targetArray.phrases.length)
	console.log(targetArray.phrases[rand].salutation);
	console.log(targetArray.phrases[rand].comment);
	$('#'+column+' .salutation').text(targetArray.phrases[rand].salutation);
	$('#'+column+' .salutation').fadeIn(200);
	$('.logo').delay(1000).addClass("touched");
	$('.salutation-comment').text(targetArray.phrases[rand].comment);

	if (target != 'greeting'){
		timeoutID = window.setTimeout(function(){
			$('#'+column+' .salutation').fadeOut(200);
			//$('#'+column+' .comment').slideUp(200);
			$('#'+column+' .comment').css({'height': 0});
			$('#'+column+' .swiper-slide').addClass('new-item');
			//setBlogSwiper();
			//$('.logo').delay(1000).removeClass("touched");
		}, 1500);
	}
}
*/

function selectInterruption(){
	var rand = Math.floor(Math.random()*interruptionJSON.phrases.length)
	//$('#salutation').text(greetingJSON.phrases[rand].salutation);
	var msg = $('#interupt');
	msg.html('<h2>'+interruptionJSON.phrases[rand].comment+'</h2>');
  //  console.log('scuse me: '+interruptionJSON.phrases[rand].comment);

	msg.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
	    
	    msg.css({'display': 'none'});
	   // console.log('end animation');

	 });
}

var timeoutID;



function clearAlert() {
  window.clearTimeout(timeoutID);
}

function userHint(){

	$('#column1 .salutation').removeClass('speaking');
	$('#column1 .salutation-comment').removeClass('speaking');
	var delay = setTimeout(function(){
        if ( $('body').width() <= 320){
         $('#hello h2').css({"font-size" : "40px", "line-height" : "40px"});
        }
   
        $('#column1 .salutation').text("Work, experiments and info.").addClass('speaking');
       // $('#column1 .salutation').text('Hint?').addClass('speaking');
        $('#column1 .salutation-comment').text('Right this way...').addClass('speaking');
     }, 500)
}

function initializeVerticalSwiper(n){
    var paginate;
    if (Modernizr.touch && $('body').width() <= phablet) { 
        paginate = null;
    }else{
        paginate = '#column'+n+' .pagination-nested';
    }
    ///because i swapped order of columns...
    if ( n==7 ) n=2;
    if ( typeof window['swiper_column'+n+'_nested'] == "undefined"){
     //   console.log('vert swiper_column'+n+'_nested init');

        var count = 0;
       // var firstLevel = $('#column5 .swiper-wrapper').first().children('.swiper-slide')
        $('#column'+n+' .swiper-wrapper').first().children('.swiper-slide').each(function(i, obj) {
            count++;
        });

      //  console.log(' slide count='+count);

      window['swiper_column'+n+'_nested'] = new Swiper('#column'+n+' .swiper-nested',{
        mode: 'vertical',
       // pagination: paginate,
       // paginationClickable: true,
      //  freeMode: true,
     //   freeModeFluid: true,
        keyboardControl: true,
        cssWidthAndHeight: true,
        mousewheelControl: freeScroll,
        mousewheelControlForceToAxis: freeScroll,
        slidesPerView: 'auto',
        loop: vLoop,//true,
        loopedSlides: count,
        updateOnImagesReady: false,
       // slidesPerView: 2,
        
        onFirstInit: function(swiper){
          //  console.log('first init- previousIndex ' +swiper.previousIndex);
            /*
           if ( owl_active == true){
            $('#column'+n+' .swiper-nested .owl-carousel').owlCarousel({
                items : 1,
                lazyLoad : true,
               // lazyEffect: "fade",
                navigation : false,
                pagination : false,
                singleItem:true,
               // autoPlay: 1000,
                transitionStyle : "fade",
                mouseDrag: "false",
                touchDrag: "false"
              });
            }
            */
        },
        
        onSlideClick: function(swiper){
          //  alert($(this).find('.project-info'));
        //   console.log(swiper.clickedSlide);
            var curTray = $(swiper.clickedSlide).find('.project-tray');
            if ( curTray.hasClass('reveal')){
                curTray.removeClass('reveal');
            }else{
                curTray.addClass('reveal');
            }

            if ( owl_active == true){
/*
                 var owl = $('.full-slide.swiper-slide-active .swiper-nested .swiper-slide-active .owl-carousel').owlCarousel({
                    items : 1,
                    lazyLoad : true,
                   // lazyEffect: "fade",
                    navigation : false,
                    pagination : false,
                    singleItem:true,
                    autoPlay: 2000,
                    transitionStyle : "fade",
                    mouseDrag: "false",
                    touchDrag: "false"
                  }).trigger('owl.next');
        */
              //$('.full-slide.swiper-slide-active .swiper-nested .swiper-slide-active .owl-carousel').trigger('owl.stop');
                //var owl = $(swiper.activeSlide()).find(".owl-carousel").data('owlCarousel');
   //             var owl = $(".owl-carousel").data('owlCarousel');
              //  var owl = $('.full-slide.swiper-slide-active .swiper-nested .swiper-slide-active .owl-carousel').data('owlCarousel');
   //             owl.destroy();
                
              
            }

           
            //$('.full-slide.swiper-slide-active .swiper-nested .swiper-slide-active .project-info').addClass('reveal');

        },
        onSlideChangeStart: function(swiper){
           // $('.full-slide.swiper-slide-active .owl-carousel').trigger('owl.stop');
          //  $('.full-slide.swiper-slide-active .owl-carousel').trigger('owl.goTo',0);
            //$('.swiper-project').swiper().stopAutoplay();
            $('.project-tray').removeClass('reveal');
            
            if (swiper.previousIndex != 'null' && $('#column'+n).hasClass('swiper-slide-active')){
   
                 var previousOwl = $(swiper.getSlide(swiper.previousIndex)).find(".owl-carousel");
                 if ( previousOwl.data('owlCarousel') != 'undefined'){
                 //   console.log('vert slider owl destroy');
                    previousOwl.data('owlCarousel').destroy();
                }else{
                  //  console.log('previous undefined');
                }

 
            }


        },
        onSlideChangeEnd: function(swiper){

            

            if ( owl_active == true){


                //$(swiper.activeSlide()).find('.owl-carousel').owlCarousel({
                var owl = $('.full-slide.swiper-slide-active .swiper-nested .swiper-slide-active .owl-carousel').owlCarousel({
                    items : 1,
                    lazyLoad : true,
                   // lazyEffect: "fade",
                    navigation : false,
                    pagination : false,
                    singleItem:true,
                    autoPlay: 2000,
                    transitionStyle : "fade",
                    mouseDrag: false,
                    touchDrag: false
                  }).trigger('owl.next');
               // owl.data('owlCarousel').next();

                //$('.full-slide.swiper-slide-active .swiper-nested .swiper-slide-active .view .owl-carousel').trigger('owl.play',2000);
            }else{
                $('#column'+n+' .gallery').removeClass('autoplay');
                $('#column'+n+' .swiper-slide-active .gallery').addClass('autoplay');
            }


        },
        onTouchEnd: function(swiper){
         //   console.log(swiperParent.activeIndex);

        },
        onResistanceAfter: function(swiper){
           // console.log(swiperParent.activeIndex);
          //  var n = swiperParent.activeIndex;

        }
      });
    }
}



function initLogo(){

	/*	Define Click Event for Mobile */
	if( 'ontouchstart' in window ){ var click = 'touchstart'; }
	else { var click = 'click'; }

//	selectPhrase();

	
	$('.logo').on({
		 click : function(){ 
		 	/* do something... */ 
            newVoice();
            renderActive=true;

            if ($('body').hasClass('blog')){

                window.location = "/"+base+"blog";

            }else{

    		 	$('#hello').fadeOut(100, function(){
    		  		selectPhrase();
                   // newVoice();
    	            $('#hello').delay(200).fadeIn(500);
                    //console.log('logo click: active =' +swiperParent.activeIndex);
                    if (swiperParent.activeIndex != 0){
                        swiperParent.swipeTo(0, 500);
                    }

    	        });
             }

		 } 
	});

/*
	$('#logo').bind('touchstart mousedown', function(e){
		$(this).addClass("touched");

	});
	$('#logo').bind('touchend mouseup', function(e){
		$(this).delay(100).removeClass("touched");

	});
*/
	$(".logo").bind("webkitAnimationEnd mozAnimationEnd animationEnd", function(){
	  $(this).removeClass("touched");
	})

	$('.logo').bind('touchstart mousedown', function(e){
		//initSwiper();
		$(this).addClass("touched");

		
		//$(this).css({animation: 'rotation .5s 1 ease-in-out'})

	});
	$('.logo').bind('touchend mouseup', function(e){
		// $(this).delay(500).removeClass("touched");

	});

  //  $('.logo').addClass("touched");


}

function initMessage(){



    selectPhrase();
    $('.swiper-parent').find('.salutation').addClass('speaking');
    $('.swiper-parent').find('.salutation-comment').addClass('speaking');
   // $('#hello').delay(200).fadeIn(500);

   $('.strip').each(function(){
      var $t = $(this);

      var letters = $.trim($t.html()).split('');
      
      $t.html('');
      
      
      $.each(letters, function(j, v){
          v = (v == ' ') ? '&nbsp;' : v;
          $('<span>' + $.trim(v) + '</span>').appendTo($t);
        });



      

    });


   setTimeout(revealLinks, 2000);
  
}

function revealLinks(){

    $('.strip').each(function(){

        $(this).toggleClass('reveal');
    })



    for (i = 0; i < $('.strip span').length; i++) {
            (function(ind) {
              setTimeout(function(){
                  $('.strip span:not(".letters")').eq(ind).toggleClass('animate');
              }, ind * 50);
            })(i);
          }

}

function initSwiper(initial){
	//console.log('swiper goooooooo');
	var winHeight = $(window).height();
    var winWidth = $(window).width();
    $('.swiper-container').css({'height': winHeight});
    if (winWidth <= 620 ){
        $('.view').css({'height': winWidth*1.125});


    }
    
	//$('.swiper-container').css({'height': winHeight, 'width': winWidth});
	var slides;
	var hint = 0;

    $('#column1').on({
         click : function(){ 
            /* do something... */ 
           
            userHint();
            if (hint==0)  newVoice();
            addWords();

            hint++;

         } 
    });
/*
	$('#column1').bind('touchstart mousedown', function(e){
        
		//$('#column2').addClass("preview");
        //selectPhrase();
        if (hint==0){
            //swiperParent.swipeTo(2);
            //userHint();

        }
        userHint();

    //    msg.text = 'Continue';
     //   newVoice();
  
		//if (hint==3) userHint();
		hint++;
	});
*/
	$('#column3').bind("webkitAnimationEnd mozAnimationEnd animationEnd", function(){
	  $(this).removeClass("preview");
	})

    var prevLeft = 0;
    $(document).scroll( function(evt) {
        var currentLeft = $(this).scrollLeft();
        if ( $("#column1").hasClass('swiper-slide-active')){
            $('#column3').addClass("preview");
        }
        if(prevLeft === currentLeft && hint==0) {
           // console.log("I scrolled vertically.");
            userHint();
            hint++;
        } 
    });



	  if(typeof(initial)==='undefined') initial = 0;


	  swiperParent = new Swiper('.swiper-parent',{
	 // 	slidesPerView:1,
        slidesPerView: 'auto',
	  	loop: hLoop,
	    loopedSlides: 5,
	   // loopAdditionalSlides: 0,
	  	keyboardControl: true,
	  	offsetPxBefore: leftOffset,
       // useCSS3Transforms:false,
	  	initialSlide: initial,//0,
        updateOnImagesReady: false,
	  	mousewheelControl: freeScroll,
	    mousewheelControlForceToAxis: freeScroll,
	  
	    //Enable Scrollbar
	    scrollbar: doScroll,
	    onFirstInit: function(swiper){
	    	//alert('first init');
	    	//selectPhrase();
	    	
           // $('body').removeClass("thinking");

            // for threedee2
             initGraphics();


             setTimeout(newVoice, 1500);
             setTimeout(initMessage, 2500);
             

         
                initializeVerticalSwiper(3);
                initializeVerticalSwiper(4);
                initializeVerticalSwiper(5);
        
            

            //WHy only the columns with owl carousels? to avoid the init flash. Also doing all at once makes the transform on the bio column off on iphone(?!)
          //  initializeVerticalSwiper(6);


	    },
        onSlideChangeStart: function(swiper){
            if ( owl_active ==true){
                var previousOwl = $(swiper.getSlide(swiper.previousIndex)).find(".swiper-nested .swiper-slide-active .owl-carousel").data('owlCarousel');
             //   console.log('swiper.previousIndex='+swiper.previousIndex);
             //   console.log('previousOwl='+previousOwl);

                if (swiper.previousIndex != 'null' && previousOwl != null){
                    //debug
                  //  $(swiper.getSlide(swiper.previousIndex)).find('.swiper-nested .swiper-slide-active').css({'background-color': 'white'});
               //     console.log('>> parent previous ='+previousOwl);
                    previousOwl.destroy();
                }
 
            
            }
            $('.logo').addClass("touched");
            $('.project-tray').removeClass('reveal');

        },
	    onSlideChangeEnd: function(swiper){
	    	var n = swiperParent.activeIndex;
	    	
            var next = n+3;
	    //	console.log('END: swiperParent.activeIndex='+n+ ' :: NEXT = '+next);
	    	var col = $('.swiper-parent .swiper-slide-active').attr('id');

            if ( owl_active == true){
                //debug
                //$('.full-slide.swiper-slide-active .swiper-nested .swiper-slide-active').css({'background-color': 'red'});

                //$(swiper.activeSlide()).find('.owl-carousel').owlCarousel({
             //   console.log('now active = '+ $('.full-slide.swiper-slide-active .swiper-nested .swiper-slide-active .owl-carousel'));
                var owl = $('.full-slide.swiper-slide-active .swiper-nested .swiper-slide-active .owl-carousel').owlCarousel({
                    items : 1,
                    lazyLoad : true,
                   // lazyEffect: "fade",
                    navigation : false,
                    pagination : false,
                    singleItem:true,
                    autoPlay: 2000,
                    transitionStyle : "fade",
                    mouseDrag: false,
                    touchDrag: false
                  }).trigger('owl.next');

            //    console.log('****** initialized: '+owl.data('owlCarousel'))

               // owl.data('owlCarousel').next();
          
                if ( n == 0 ){
                    $.address.value('/'+base);
                   // msg.text = 'Welcome back';
                //    newVoice();
                }else if ( n ==1 ){
                   // msg.text = 'Websites';
                   // newVoice();
                    $.address.value("/"+base+"portfolio/websites");
                }else if ( n ==2 ){
                  //  msg.text = 'Apps';
                  //  newVoice();
                    $.address.value("/"+base+"portfolio/apps");
                }else if ( n ==3 ){
                   // msg.text = 'Advertising';
                   // newVoice();
                    $.address.value("/"+base+"portfolio/ads");
                }else if ( n ==4 ){
                   // msg.text = 'Viewing Info.';
                   // newVoice();
                    $.address.value("/"+base+"about");
                }else if ( n ==5 ){
                   // msg.text = 'Viewing Text.';
                   // newVoice();
                    $.address.value("/"+base+"blog");
                }
               
              

             }
           
            initializeVerticalSwiper(next);

        


	    },
        onResistanceBefore: function(swiper){
          //  console.log('onResistanceBefore');
        },
        onResistanceAfter: function(swiper){
          //  console.log('onResistanceAfter');
        },
        onMomentumBounce: function(swiper){
           // console.log('onMomentumBounce');
        }


	  });

/*

	  $('.project-block').bind('touchstart mousedown', function(e){
		console.log('image click'+ $(this).attr('class'));
        $(this).find('.project-info').addClass('reveal');

        
	  });

*/
      
	 
      var hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';

/*

	  var n = $( "#swiper-blog .swiper-slide" ).length;
	  console.log("number blog divs="+n);
	  var per = 5;
	  $('#swiper-blog .swiper-slide').each(function(i, obj) {
	  		console.log(i);
		    $(this).css({'background-color': 'hsl(80, 80%, '+(20+(per*i))+'%)' });
		    //$(this).css({'background-color': 'hsl(280, '+(70+(per*i))+'%, 80%)' });
		   // $(this).css({'background-color': 'hsl(120, '+(20+(per*i))+'%, '+(20+(per*i))+'%)' });
	
		});

	  $('#swiper-websites .swiper-slide').each(function(i, obj) {
	  		console.log(i);
		    $(this).css({'background-color': 'hsl(120, 80%, '+(20+(per*i))+'%)' });
	
		});
	  $('#swiper-apps .swiper-slide').each(function(i, obj) {
	  		console.log(i);
		    $(this).css({'background-color': 'hsl(220, 80%, '+(20+(per*i))+'%)' });
		   
	
		});

	  $('#swiper-ads .swiper-slide').each(function(i, obj) {
	  		console.log(i);
		    $(this).css({'background-color': 'hsl(300, 80%, '+(20+(per*i))+'%)' });
	
		});

	  $('#swiper-bio .swiper-slide').each(function(i, obj) {
	  		console.log(i);
		    $(this).css({'background-color': 'hsl(340, 80%, '+(20+(per*i))+'%)' });
	
		});

    */


}

function reInitAll(){
   // console.log('reinit all');
    swiperParent.reInit();
    swiper_column2_nested.reInit();
    swiper_column3_nested.reInit();
    swiper_column4_nested.reInit();
    swiper_column5_nested.reInit();
    swiper_column6_nested.reInit();
}

function colorizePanels(color){
    var tiny = tinycolor('yellow');//tinycolor('#f2f200');
    var colorEffect = tinycolor.analogous(tiny, 80);
    //console.log(colorEffect);
    var offset = 39;
    var n=1;
    var newColor;
    

    var newColor2;
    $('#column3 .swiper-slide').each(function(i, obj) {
        //$(this).css({'background-color': analogous[i].toRgbString()});
      //  console.log(colorEffect[i]);
       // $(this).css({'background-color': colorEffect[i].toRgbString()});
        newColor2 = tinycolor.desaturate(colorEffect[n+offset],30);
       // console.log('newColor='+newColor2);
        $(this).css({'background-color': tinycolor.darken(newColor2, 5)});
        if ($('body').width() <= phablet){
            $(this).find(".project-title").css({'background-color': newColor2});
            $(this).find(".project-tray").css({'background-color': tinycolor.darken(newColor2,5)});
        }
        /*
        $(this).find("li").each(function(i, obj) {
            $(this).css({'background-color': tinycolor.darken(newColor2,i*5)});
        });
*/

        n++;
    });


    $('#column4 .swiper-slide').each(function(i, obj) {
        //$(this).css({'background-color': analogous[i].toRgbString()});
      //  console.log(colorEffect[i]);
       // $(this).css({'background-color': colorEffect[i].toRgbString()});
        newColor = tinycolor.desaturate(colorEffect[n+offset],30);
       // console.log('newColor='+newColor);
        $(this).css({'background-color': tinycolor.darken(newColor,5)});
        if ($('body').width() <= phablet){
           $(this).find(".project-title").css({'background-color': newColor});
            $(this).find(".project-tray").css({'background-color': tinycolor.darken(newColor,5)});
        }
        n++;
    });



    $('#column5 .swiper-wrapper').first().children('.swiper-slide').each(function(i, obj) {
        //$(this).css({'background-color': analogous[i].toRgbString()});
      //  console.log(colorEffect[i]);
       // $(this).css({'background-color': colorEffect[i].toRgbString()});
        newColor = tinycolor.desaturate(colorEffect[n+offset], 30);
      //  console.log('newColor='+newColor);
        $(this).css({'background-color': tinycolor.darken(newColor,5)});
        if ($('body').width() <= phablet){
           $(this).find(".project-title").css({'background-color': newColor});
            $(this).find(".project-tray").css({'background-color': tinycolor.darken(newColor,5)});
        }
        n++;
    });

    $('#column6 .swiper-slide').each(function(i, obj) {
        //$(this).css({'background-color': analogous[i].toRgbString()});
      //  console.log(colorEffect[i]);
       // $(this).css({'background-color': colorEffect[i].toRgbString()});
      //  $(this).css({'background-color': tinycolor.darken(colorEffect[(i)+22], 10)});
        newColor = tinycolor.desaturate(colorEffect[n+offset], 30);
      //  console.log('newColor='+newColor);
        $(this).css({'background-color': newColor});

        n++;
    });

    $('.blog-slide').each(function(i, obj) {
        //$(this).css({'background-color': analogous[i].toRgbString()});
      //  console.log(colorEffect[i]);
       // $(this).css({'background-color': colorEffect[i].toRgbString()});
      // newColor = tinycolor.darken(colorEffect[n+offset],10);
       newColor = tinycolor.darken(colorEffect[n+offset],10);
     //  console.log('newColor='+newColor);
         $(this).css({'background-color': newColor});
        n++;
    });



    ///hide project roles when short screen
    if (Modernizr.touch && $('body').height() <= 480){
        $('.project-desc ul').css({'display':'none'});
    }
}

/*global define */
//define(['swiper','swiperScrollbar','address','tinycolor','owl'], function (swiper, swiperScrollbar, address,tinycolor,owl) {
 
$(document).ready(function() {
    //'use strict';
    var oldOrientation = 0;
    var updateOrientation = function(e) {
        newOrientation = window.orientation;
        swiperParent.reInit();
        swiper_column2_nested.reInit();
         swiper_column3_nested.reInit();
         swiper_column4_nested.reInit();
         swiper_column5_nested.reInit();
         // does vh, vw get recalculated????

        //alert(newOrientation);

    };
    $(window).bind("orientationchange", updateOrientation);


    $(window).resize(function(){

        var h = $(window).height();
        var w = $(window).width();

        $('.swiper-container').css("height",h);

        if (w <= phablet) { 
            $('.full-slide').css('width', w);

        }else{
            

            $('.full-slide').css('width', w).css('width', '-=150px');

        }

    });

   



    colorizePanels();
    initLogo();
	initSwiper();


	var init = true,
    home_uri = window.location.origin,
    state = window.history.pushState !== undefined;

	$.address.state(home_uri).init(function(event) {
              /*  console.log('init: ' + serialize({
                    value: $.address.value(), 
                    path: $.address.path(),
                    pathNames: $.address.pathNames(),
                    parameterNames: $.address.parameterNames(),
                    queryString: $.address.queryString()
                }));
                */
            }).bind('change', function(event) {
               // console.log('change: ' + serialize(event, /parameters|parametersNames|path|pathNames|queryString|value/));
                var names = $.map(event.pathNames, function(n) {
                    return n.substr(0, 1).toUpperCase() + n.substr(1);
                }).concat(event.parameters.id ? event.parameters.id.split('.') : []);
                var links = names.slice();

                var match = links.length ? links.shift() + ' ' + links.join('.') : 'Home';
             //   console.log("match ="+match);
             
                $('a').each(function() {
                    $(this).toggleClass('selected', $(this).text() == match);
                });
                $.address.title([title].concat(names).join(' | '));
				if ( $.address.path() == "/"+base){
                    swiperParent.swipeTo(0);
                   // alert('home?')
                 //  if (renderActive){
                       // renderActive=true;
                       // addWords();
                    //    newVoice();

                   // }
                    //initSwiper(0);
                }else if ( $.address.path() == "/"+base+"portfolio/websites"){
					swiperParent.swipeTo(1, 200);
                    if (!renderActive){
                        renderActive=true;
                        addWords();
                       // newVoice();

                    }
                   // renderActive=false;
                    //initSwiper(1);
				}else if ( $.address.path() == "/"+base+"portfolio/apps"){
					swiperParent.swipeTo(2, 200);
                    renderActive=false;
                    //initSwiper(2);
				}else if ( $.address.path() == "/"+base+"portfolio/ads"){
					swiperParent.swipeTo(3, 200);
                    renderActive=false;
                    //initSwiper(3);
				}else if ( $.address.path() == "/"+base+"about"){
                    initializeVerticalSwiper(6);
					swiperParent.swipeTo(4, 200);
                    renderActive=false;
                    //initSwiper(4);
				}if ( $.address.path() == "/"+base+"blog"){
                    initializeVerticalSwiper(7);

                    swiperParent.swipeTo(5, 200);
                    renderActive=false;
                    //initSwiper(5);
                }
                //swiperParent.swipeTo(4);
               
            });
	
	$('#goApps').on({
         click : function(e){ 
            e.preventDefault();
            e.stopPropagation();
            swiperParent.swipeTo(2, 200);
            renderActive=false;

         } 
    });

    $('#goBio').on({
         click : function(e){ 
            e.preventDefault();
            e.stopPropagation();
            swiperParent.swipeTo(4, 500);
            renderActive=false;

         } 
    });

    $('#goBlog').on({
         click : function(e){ 
            e.preventDefault();
            e.stopPropagation();
            swiperParent.swipeTo(5, 700);
            renderActive=false;

         } 
    });
});