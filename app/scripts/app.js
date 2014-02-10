/*global define */
 var swiperParent;


 var document = window.document;

	if (!String.prototype.trim) {
		String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};
	}

	function NLForm( el ) {	
		this.el = el;
		this.overlay = this.el.querySelector( '.nl-overlay' );
		this.fields = [];
		this.fldOpen = -1;
		this._init();
	}

	NLForm.prototype = {
		_init : function() {
			var self = this;
			Array.prototype.slice.call( this.el.querySelectorAll( 'select' ) ).forEach( function( el, i ) {
				self.fldOpen++;
				self.fields.push( new NLField( self, el, 'dropdown', self.fldOpen ) );
			} );
			Array.prototype.slice.call( this.el.querySelectorAll( 'input' ) ).forEach( function( el, i ) {
				self.fldOpen++;
				self.fields.push( new NLField( self, el, 'input', self.fldOpen ) );
			} );
			this.overlay.addEventListener( 'click', function(ev) { self._closeFlds(); } );
			this.overlay.addEventListener( 'touchstart', function(ev) { self._closeFlds(); } );
		},
		_closeFlds : function() {
			if( this.fldOpen !== -1 ) {
				this.fields[ this.fldOpen ].close();
			}
		}
	}

	function NLField( form, el, type, idx ) {
		this.form = form;
		this.elOriginal = el;
		this.pos = idx;
		this.type = type;
		this._create();
		this._initEvents();
	}

	NLField.prototype = {
		_create : function() {
			if( this.type === 'dropdown' ) {
				this._createDropDown();	
			}
			else if( this.type === 'input' ) {
				this._createInput();	
			}
		},
		_createDropDown : function() {
			var self = this;
			this.fld = document.createElement( 'div' );
			this.fld.className = 'nl-field nl-dd';
			this.toggle = document.createElement( 'a' );
			this.toggle.innerHTML = this.elOriginal.options[ this.elOriginal.selectedIndex ].innerHTML;
			this.toggle.className = 'nl-field-toggle';
			this.optionsList = document.createElement( 'ul' );
			var ihtml = '';
			Array.prototype.slice.call( this.elOriginal.querySelectorAll( 'option' ) ).forEach( function( el, i ) {
				ihtml += self.elOriginal.selectedIndex === i ? '<li class="nl-dd-checked">' + el.innerHTML + '</li>' : '<li>' + el.innerHTML + '</li>';
				// selected index value
				if( self.elOriginal.selectedIndex === i ) {
					self.selectedIdx = i;
				}
			} );
			this.optionsList.innerHTML = ihtml;
			this.fld.appendChild( this.toggle );
			this.fld.appendChild( this.optionsList );
			this.elOriginal.parentNode.insertBefore( this.fld, this.elOriginal );
			this.elOriginal.style.display = 'none';
		},
		_createInput : function() {
			var self = this;
			this.fld = document.createElement( 'div' );
			this.fld.className = 'nl-field nl-ti-text';
			this.toggle = document.createElement( 'a' );
			this.toggle.innerHTML = this.elOriginal.getAttribute( 'placeholder' );
			this.toggle.className = 'nl-field-toggle';
			this.optionsList = document.createElement( 'ul' );
			this.getinput = document.createElement( 'input' );
			this.getinput.setAttribute( 'type', 'text' );
			this.getinput.setAttribute( 'placeholder', this.elOriginal.getAttribute( 'placeholder' ) );
			this.getinputWrapper = document.createElement( 'li' );
			this.getinputWrapper.className = 'nl-ti-input';
			this.inputsubmit = document.createElement( 'button' );
			this.inputsubmit.className = 'nl-field-go';
			this.inputsubmit.innerHTML = 'Go';
			this.getinputWrapper.appendChild( this.getinput );
			this.getinputWrapper.appendChild( this.inputsubmit );
			this.example = document.createElement( 'li' );
			this.example.className = 'nl-ti-example';
			this.example.innerHTML = this.elOriginal.getAttribute( 'data-subline' );
			this.optionsList.appendChild( this.getinputWrapper );
			this.optionsList.appendChild( this.example );
			this.fld.appendChild( this.toggle );
			this.fld.appendChild( this.optionsList );
			this.elOriginal.parentNode.insertBefore( this.fld, this.elOriginal );
			this.elOriginal.style.display = 'none';
		},
		_initEvents : function() {
			var self = this;
			this.toggle.addEventListener( 'click', function( ev ) { ev.preventDefault(); ev.stopPropagation(); self._open(); } );
			this.toggle.addEventListener( 'touchstart', function( ev ) { ev.preventDefault(); ev.stopPropagation(); self._open(); } );

			if( this.type === 'dropdown' ) {
				var opts = Array.prototype.slice.call( this.optionsList.querySelectorAll( 'li' ) );
				opts.forEach( function( el, i ) {
					el.addEventListener( 'click', function( ev ) { ev.preventDefault(); self.close( el, opts.indexOf( el ) ); } );
					el.addEventListener( 'touchstart', function( ev ) { ev.preventDefault(); self.close( el, opts.indexOf( el ) ); } );
				} );
			}
			else if( this.type === 'input' ) {
				this.getinput.addEventListener( 'keydown', function( ev ) {
					if ( ev.keyCode == 13 ) {
						self.close();
					}
				} );
				this.inputsubmit.addEventListener( 'click', function( ev ) { ev.preventDefault(); self.close(); } );
				this.inputsubmit.addEventListener( 'touchstart', function( ev ) { ev.preventDefault(); self.close(); } );
			}

		},
		_open : function() {
			if( this.open ) {
				return false;
			}
			this.open = true;
			this.form.fldOpen = this.pos;
			var self = this;
			this.fld.className += ' nl-field-open';
		},
		close : function( opt, idx ) {
			if( !this.open ) {
				return false;
			}
			this.open = false;
			this.form.fldOpen = -1;
			this.fld.className = this.fld.className.replace(/\b nl-field-open\b/,'');

			if( this.type === 'dropdown' ) {
				if( opt ) {
					// remove class nl-dd-checked from previous option
					var selectedopt = this.optionsList.children[ this.selectedIdx ];
					selectedopt.className = '';
					opt.className = 'nl-dd-checked';
					this.toggle.innerHTML = opt.innerHTML;
					// update selected index value
					this.selectedIdx = idx;
					// update original select element´s value
					this.elOriginal.value = this.elOriginal.children[ this.selectedIdx ].value;
				}
			}
			else if( this.type === 'input' ) {
				this.getinput.blur();
				this.toggle.innerHTML = this.getinput.value.trim() !== '' ? this.getinput.value : this.getinput.getAttribute( 'placeholder' );
				this.elOriginal.value = this.getinput.value;
			}
		}
	}

	// add to global namespace
	window.NLForm = NLForm;

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
		 	$('#hello').fadeOut(100, function(){
		  		selectPhrase();
	            $('#hello').delay(200).fadeIn(500);
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
		//initSwiper();
		$(this).addClass("touched");

		
		//$(this).css({animation: 'rotation .5s 1 ease-in-out'})

	});
	$('.logo').bind('touchend mouseup', function(e){
		// $(this).delay(500).removeClass("touched");

	});


}

function initSwiper(){
	console.log('swiper goooooooo');
	var winHeight = $(window).height();
    var winWidth = $(window).width();
    $('.swiper-container').css({'height': winHeight});
	//$('.swiper-container').css({'height': winHeight, 'width': winWidth});
	var slides;

		/*
		if (mobilecheck()){
			slides = 1;
		}else{
			slides = 3;
		}
*/
		var doLoop,
			doScroll,
			freeScroll;

		if (Modernizr.touch && $('body').width() < 768) { 
			//mobile

			slides = 1;

			doScroll=false;
			doLoop = true;
			freeScroll = false;
		} else if (Modernizr.touch) { 
			//tablet
			//alert('is tablet');
			slides = 'auto';

			doScroll=false;
			doLoop = true;
			freeScroll = false;
		} else { 
			//desktop

			slides = 'auto';
			
			doScroll = {
		        
		         container :'.swiper-scrollbar',
			      hide: false,
			      draggable: true,
			      watchActiveIndex: true,
			      onScrollbarDrag: function(){
			        console.log('Dragging')
			      }
		    };
		    
		   doLoop = false;
		   freeScroll = true;

		}


	  swiperParent = new Swiper('.swiper-parent',{
	    pagination: '.pagination-parent',
	    paginationClickable: true,
	    loop: doLoop,
	   // loop: true,
	   // loopedSlides: 7,
	   // loopAdditionalSlides: 2,
	    keyboardControl: true,


	    mousewheelControl: freeScroll,
	    mousewheelControlForceToAxis: freeScroll,
	    freeMode: freeScroll,
	    freeModeFluid: freeScroll,
	  	//cssWidthAndHeight: true,
	  	slidesPerView: slides,
	  	//centeredSlides: true,
	  	//resistance: '100%',
	  	//scrollContainer: true,


	    //scrollContainer: true,
	    mode: 'horizontal',
	    scrollbar: doScroll,
	    onSlideClick: function(swiper){
	     // alert('PARENT '+ swiperParent.clickedSlideIndex);
	    },
	    onSlideChangeEnd: function(swiper){
	    	console.log(swiperParent.activeIndex);
	    	var n = swiperParent.activeIndex;
	    	//$('.colorize .full-slide #swiper-nested'+n).parent().css({"-webkit-filter": 'grayscale(0%)'});
	    	//$('.colorize #swiper-nested0'+(n+1)).parent().addClass("color");
		  	//$('.colorize #swiper-nested0'+(n)).parent().removeClass("color");
	    }
      
	    //slidesPerView: 'auto'
	  });

	  var swiperNested0 = new Swiper('#swiper-nested0',{
	    mode: 'vertical',
	   // pagination: '.pagination-nested',
	   // paginationClickable: true,
	  //  freeMode: true,
	 //   freeModeFluid: true,
	    keyboardControl: true,
	  //  cssWidthAndHeight: true,
	 //   mousewheelControl: true,
	  //  mousewheelControlForceToAxis: true,
	    loop: true,
	   // slidesPerView: 2,
	    slidesPerView: 'auto',
	    
	    onSlideClick: function(swiper){
	      //alert('Hello '+ swiperNested1.clickedSlideIndex);

	    },
	    onSlideChangeEnd: function(swiper){
	    	console.log(swiperParent.activeIndex);
	    	//var n = swiperParent.activeIndex;
	    	//alert('end');


	    //	$('.swiper-slide-active+.full-slide .swiper-slide-active .view img').attr("src", '/images/portfolio/santa.gif');
	    	//$('.colorize .full-slide #swiper-nested'+n).parent().css({"-webkit-filter": 'grayscale(0%)'});
	    	//$('.colorize #swiper-nested0'+(n+1)).parent().addClass("color");
		  	//$('.colorize #swiper-nested0'+(n)).parent().removeClass("color");
	    },
	    onTouchEnd: function(swiper){
	    	console.log(swiperParent.activeIndex);
	    	//var n = swiperParent.activeIndex;
	    	//alert('end');
	    	//$('.full-slide.swiper-slide-active .swiper-slide-active .view img').attr("src", '/images/portfolio/santa.gif');
	    	//$('.colorize .full-slide #swiper-nested'+n).parent().css({"-webkit-filter": 'grayscale(0%)'});
	    	//$('.colorize #swiper-nested0'+(n+1)).parent().addClass("color");
		  	//$('.colorize #swiper-nested0'+(n)).parent().removeClass("color");
	    },
	    onResistanceAfter: function(swiper){
	    	console.log(swiperParent.activeIndex);
	    	var n = swiperParent.activeIndex;
	    	//alert('resistance');
	    //	$('.full-slide.swiper-slide-active .swiper-slide-active .view img').attr("src", '/images/portfolio/santa.gif');
	    	//$('.colorize .full-slide #swiper-nested'+n).parent().css({"-webkit-filter": 'grayscale(0%)'});
	    	//$('.colorize #swiper-nested0'+(n+1)).parent().addClass("color");
		  	//$('.colorize #swiper-nested0'+(n)).parent().removeClass("color");
	    }
	  });
	
	  var swiperNested1 = new Swiper('#swiper-nested1',{
	    mode: 'vertical',
	   // pagination: '.pagination-nested',
	   // paginationClickable: true,
	  //  freeMode: true,
	 //   freeModeFluid: true,
	    keyboardControl: true,
	  //  cssWidthAndHeight: true,
	 //   mousewheelControl: true,
	  //  mousewheelControlForceToAxis: true,
	    loop: true,
	   // slidesPerView: 2,
	    slidesPerView: 'auto',
	    
	    onSlideClick: function(swiper){
	      //alert('Hello '+ swiperNested1.clickedSlideIndex);
	      //$(".looper img").unveil();
	      $('.owl-carousel').trigger('owl.stop');
	    },
	    onSlideChangeStart: function(swiper){
	      //alert('Hello '+ swiperNested1.clickedSlideIndex);
	      //$(".looper img").unveil();
	      console.log('change start');
	      $('.owl-carousel').trigger('owl.stop');
	      $('.owl-carousel').trigger('owl.goTo',0);
	      
	    },
	    onTouchStart: function(swiper){
	      $('.owl-carousel').trigger('owl.stop');
	      $('.owl-carousel').trigger('owl.goTo',0);
	    },
	    onSlideChangeEnd: function(swiper){
	    	console.log('change end');
	    	$('.swiper-slide-active .view .owl-carousel').trigger('owl.play',1000);
	    },
	    onTouchEnd: function(swiper){
	    	console.log(swiperParent.activeIndex);
	    	//var n = swiperParent.activeIndex;
	    	//alert('end');
	    	//$('.full-slide.swiper-slide-active .swiper-slide-active .view img').attr("src", '/images/portfolio/santa.gif');
	    	//$('.colorize .full-slide #swiper-nested'+n).parent().css({"-webkit-filter": 'grayscale(0%)'});
	    	//$('.colorize #swiper-nested0'+(n+1)).parent().addClass("color");
		  	//$('.colorize #swiper-nested0'+(n)).parent().removeClass("color");
	    },
	    onResistanceAfter: function(swiper){
	    	console.log(swiperParent.activeIndex);
	    	var n = swiperParent.activeIndex;
	    	alert('resistance');
	    //	$('.full-slide.swiper-slide-active .swiper-slide-active .view img').attr("src", '/images/portfolio/santa.gif');
	    	//$('.colorize .full-slide #swiper-nested'+n).parent().css({"-webkit-filter": 'grayscale(0%)'});
	    	//$('.colorize #swiper-nested0'+(n+1)).parent().addClass("color");
		  	//$('.colorize #swiper-nested0'+(n)).parent().removeClass("color");
	    }
	  });
	  var swiperNested2 = new Swiper('#swiper-nested2',{
	    mode: 'vertical',
	   // pagination: '.pagination-nested',
	   // paginationClickable: true,
	 //   freeMode: true,
	 //   freeModeFluid: true,
	    keyboardControl: true,
	  //  mousewheelControl: true,
	  //  mousewheelControlForceToAxis: true,
	    loop: true,
	   // cssWidthAndHeight: true
	   slidesPerView: 'auto',
	    //slidesPerView: 3
	    onSlideClick: function(swiper){
	      //alert('Hello '+ swiperNested1.clickedSlideIndex);
	      $(".looper img").unveil();
	    }
	  });
	  var swiperNested3 = new Swiper('#swiper-nested3',{
	    mode: 'vertical',
	   // pagination: '.pagination-nested',
	   // paginationClickable: true,
	  //  freeMode: true,
	  //  freeModeFluid: true,
	    keyboardControl: true,
	   //mousewheelControl: true,
	   // mousewheelControlForceToAxis: true,
	    loop: true,
	    slidesPerView: 'auto'
	  });
	  var swiperNested4 = new Swiper('#swiper-nested4',{
	    mode: 'vertical',
	   // pagination: '.pagination-nested',
	   // paginationClickable: true,
	  //  freeMode: true,
	  //  freeModeFluid: true,
	    keyboardControl: true,
	   //mousewheelControl: true,
	   // mousewheelControlForceToAxis: true,
	    loop: true,
	    slidesPerView: 'auto'
	  });

	  var timeoutID;

	  function delayedSlide() {
		  timeoutID = window.setTimeout(toScreenTwo, 3000);
		}

		function toScreenTwo() {
		  //swiperParent.swipeTo(1, 250, false);
		  console.log('screentwo');
		 // $('.colorize #swiper-nested0').parent().addClass("color");
		 // $('.colorize #greeting').removeClass("color");
		  $('.colorize .full-slide.swiper-slide-active').css({"-webkit-filter": 'grayscale(100%)'});
		  $('.colorize .full-slide #swiper-nested0').css({"-webkit-filter": 'grayscale(0%)'});
		}

		delayedSlide();
		$('.colorize .full-slide.swiper-slide-active').css({"-webkit-filter": 'grayscale(0%)'});
		$('.colorize .full-slide #swiper-nested0').css({"-webkit-filter": 'grayscale(100%)'});


	  $('.view').bind('touchstart mousedown', function(e){
		console.log('image click');
		//alert('click');
		//$(this).attr("src", '/images/portfolio/santa.gif');
		 //$(".rslides img").unveil();
		//.trigger("unveil");
		// $(".looper").looper();
		//$(this).add(".rhino img").trigger("unveil");
		//$('.owl-carousel').trigger('owl.play',1000);
		/*
		 $('.looper').looper({
		    interval: 3000
		 });



*/


/*
			$(this).add('.rhino').rhinoslider({
                    effect: 'fade',
                    controlsMousewheel: false,
                    controlsKeyboard: false,
                    controlsPrevNext: false,
                    controlsPlayPause: false,
                    autoPlay: true,
                    pauseOnHover: false,
                    showBullets: 'never',
                    showControls: 'never'
                });
*/
	  });

	  $(".owl-carousel").owlCarousel({
       // items : 1,
        lazyLoad : true,
        lazyEffect: "fade",
        navigation : true,
        singleItem:true
       // autoPlay: 2000
        //transitionStyle : "fade"
      });


}




/*global define */
define(['swiper', 'swiperScrollbar','owl'], function (swiper, owl) {
    //'use strict';
    
    var nlform = new NLForm( document.getElementById( 'nl-form' ) );
 /* $(".owl-carousel").owlCarousel({
       // items : 1,
        lazyLoad : true,
        lazyEffect: "fade",
        navigation : true,
        singleItem:true,
        autoPlay: 2000
        //transitionStyle : "fade"
      });
   */

	//$("img").unveil();
   //$('.logo').bind('touchstart mousedown', function(e){
  	    initSimple();
		initSwiper();
		// $(".looper img").unveil();
		
		/*
		$("#slider1").responsiveSlides({
	        maxwidth: 800,
	        speed: 800,
	        auto: false
	      });
	     */
		
	//});

	
});