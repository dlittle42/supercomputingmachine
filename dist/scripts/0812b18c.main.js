function mobilecheck(){var a=!1;return function(b){(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(b)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(b.substr(0,4)))&&(a=!0)}(navigator.userAgent||navigator.vendor||window.opera),a}function selectPhrase(a){if(!a)var a="column1";var b=Math.floor(Math.random()*column1_JSON.phrases.length);console.log(column1_JSON.phrases[b].salutation),console.log(column1_JSON.phrases[b].comment),$("#"+a+" .salutation").text(column1_JSON.phrases[b].salutation),$("#"+a+" .salutation").fadeIn(200),$(".logo").addClass("touched"),$(".salutation-comment").text(column1_JSON.phrases[b].comment),"column1"!=a&&$(".logo").addClass("touched")}function selectInterruption(){var a=Math.floor(Math.random()*interruptionJSON.phrases.length),b=$("#interupt");b.html("<h2>"+interruptionJSON.phrases[a].comment+"</h2>"),console.log("scuse me: "+interruptionJSON.phrases[a].comment),b.one("webkitAnimationEnd oanimationend msAnimationEnd animationend",function(){b.css({display:"none"}),console.log("end animation")})}function clearAlert(){window.clearTimeout(timeoutID)}function userHint(){$("#column1 .salutation").removeClass("speaking"),$("#column1 .salutation-comment").removeClass("speaking");setTimeout(function(){$("#column1 .salutation").text("Hint?").addClass("speaking"),$("#column1 .salutation-comment").text("Swipe to view more.").addClass("speaking")},500)}function initializeVerticalSwiper(a){var b;if(b=Modernizr.touch&&$("body").width()<=420?null:"#column"+a+" .pagination-nested","undefined"==typeof window["swiper_column"+a+"_nested"]){console.log("vert swiper_column"+a+"_nested init");var c=0;$("#column"+a+" .swiper-slide").each(function(){c++}),console.log(" slide count="+c),window["swiper_column"+a+"_nested"]=new Swiper("#column"+a+" .swiper-nested",{mode:"vertical",keyboardControl:!0,cssWidthAndHeight:!0,mousewheelControl:freeScroll,mousewheelControlForceToAxis:freeScroll,slidesPerView:"auto",loop:!0,loopedSlides:c,onFirstInit:function(){1==owl_active&&$("#column"+a+" .swiper-nested .owl-carousel").owlCarousel({items:1,lazyLoad:!0,navigation:!1,pagination:!1,singleItem:!0,transitionStyle:"fade",mouseDrag:"false",touchDrag:"false"})},onSlideClick:function(a){console.log(a.clickedSlide);var b=$(a.clickedSlide).find(".project-tray");b.hasClass("reveal")?b.removeClass("reveal"):b.addClass("reveal")},onSlideChangeStart:function(){$(".project-tray").removeClass("reveal")},onSlideChangeEnd:function(){$(".full-slide.swiper-slide-active .swiper-nested .swiper-slide-active .view .owl-carousel").trigger("owl.play",1e3)},onTouchEnd:function(){console.log(swiperParent.activeIndex)},onResistanceAfter:function(){console.log(swiperParent.activeIndex);swiperParent.activeIndex}})}}function initializeCol2(){swiper_column2_nested=new Swiper(".swiper-nested",{mode:"vertical",slidesPerView:2,onFirstInit:function(){alert("first init Col 2")}})}function initOwls(){$(".owl-carousel").owlCarousel({items:1,lazyLoad:!0,navigation:!1,pagination:!1,singleItem:!0,autoPlay:1e3,mouseDrag:"false",touchDrag:"false"})}function initLogo(){if("ontouchstart"in window);else;console.log("it's simple"),$(".logo").on({click:function(){$("#hello").fadeOut(100,function(){selectPhrase(),$("#hello").delay(200).fadeIn(500)})}}),$("#logo").bind("touchstart mousedown",function(){$(this).addClass("touched")}),$("#logo").bind("touchend mouseup",function(){$(this).delay(100).removeClass("touched")}),$(".logo").bind("webkitAnimationEnd mozAnimationEnd animationEnd",function(){$(this).removeClass("touched")}),$(".logo").bind("touchstart mousedown",function(){$(this).addClass("touched")}),$(".logo").bind("touchend mouseup",function(){}),$(".logo").addClass("touched")}function initSwiper(){console.log("swiper goooooooo");{var a=$(window).height();$(window).width()}$(".swiper-container").css({height:a});var b=0;$("#column1").bind("touchstart mousedown",function(){$(this).addClass("preview"),3==b&&userHint(),b++}),$("#column1").bind("webkitAnimationEnd mozAnimationEnd animationEnd",function(){$(this).removeClass("preview")}),swiperParent=new Swiper(".swiper-parent",{slidesPerView:"auto",loop:doLoop,loopedSlides:7,keyboardControl:!0,offsetPxBefore:leftOffset,mousewheelControl:freeScroll,mousewheelControlForceToAxis:freeScroll,scrollbar:doScroll,onFirstInit:function(){selectPhrase(),$(".swiper-parent").find(".salutation").addClass("speaking"),$(".swiper-parent").find(".salutation-comment").addClass("speaking"),$("body").removeClass("thinking"),initializeVerticalSwiper(2)},onSlideChangeStart:function(){$(".logo").addClass("touched"),$(".project-tray").removeClass("reveal")},onSlideChangeEnd:function(){var a=swiperParent.activeIndex,b=a+2;console.log("END: swiperParent.activeIndex="+a+" :: NEXT = "+b);$(".swiper-parent .swiper-slide-active").attr("id");$(".full-slide.swiper-slide-active .swiper-nested .swiper-slide-active .view .owl-carousel").trigger("owl.play",1e3),initializeVerticalSwiper(b)}});"rgb("+Math.floor(256*Math.random())+","+Math.floor(256*Math.random())+","+Math.floor(256*Math.random())+")"}function colorizePanels(){var a,b=tinycolor("yellow"),c=tinycolor.analogous(b,80),d=39,e=1;$(".blog-slide").each(function(){a=tinycolor.darken(c[e+d],10),console.log("newColor="+a),$(this).css({"background-color":a}),e++});var f;$("#column3 .swiper-slide").each(function(){f=tinycolor.desaturate(c[e+d],30),$(this).css({"background-color":tinycolor.darken(f,5)}),Modernizr.touch&&$("body").width()<=420&&($(this).find(".project-title").css({"background-color":f}),$(this).find(".project-tray").css({"background-color":tinycolor.darken(f,5)})),e++}),$("#column4 .swiper-slide").each(function(){a=tinycolor.desaturate(c[e+d],30),$(this).css({"background-color":tinycolor.darken(a,5)}),Modernizr.touch&&$("body").width()<=420&&($(this).find(".project-title").css({"background-color":a}),$(this).find(".project-tray").css({"background-color":tinycolor.darken(a,5)})),e++}),$("#column5 .swiper-slide").each(function(){a=tinycolor.desaturate(c[e+d],30),$(this).css({"background-color":tinycolor.darken(a,5)}),Modernizr.touch&&$("body").width()<=420&&($(this).find(".project-title").css({"background-color":a}),$(this).find(".project-tray").css({"background-color":tinycolor.darken(a,5)})),e++}),$("#column6 .swiper-slide").each(function(){a=tinycolor.desaturate(c[e+d],30),$(this).css({"background-color":a}),e++}),Modernizr.touch&&$("body").height()<=480&&$(".project-desc ul").css({display:"none"})}var swiperParent,swiper_column1_nested,swiper_column2_nested,swiper_column3_nested,swiper_column4_nested,swiper_column5_nested,swiper_column6_nested,swiper_column7_nested,owl_active=!1,document=window.document,doLoop,doScroll,freeScroll,leftOffset;Modernizr.touch&&$("body").width()<=568?(leftOffset=0,doLoop=!1):Modernizr.touch&&$("body").width()<=768?(slides="auto",doScroll=!1,doLoop=!1,freeScroll=!1,leftOffset=100):Modernizr.touch?(slides="auto",doScroll=!1,doLoop=!0,freeScroll=!1,leftOffset=100):(slides="auto",doScroll={container:".swiper-scrollbar",hide:!1,draggable:!0,snapOnRelease:!0},doLoop=!1,freeScroll=!0,leftOffset=120),String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});var title=document.title,log=function(a){var b=$(".log");b.size()||(b=$('<div class="log" />').appendTo(".page")),b.append(a.replace(/^([^:]*):(.*)$/,'<p><b>$1:</b> <span class="$1">$2</span></p>')).attr({scrollTop:b.attr("scrollHeight")}).find("p:nth-child(even)").addClass("even")},track=function(){log("track: "+arguments[0])},serialize=function(a,b){var c=[];return $.each(a,function(a,d){(b&&b.test(a)||!b)&&c.push(a+": "+("object"==typeof d?d.join?"'"+d.join(", ")+"'":serialize(d):"'"+d+"'"))}),"{"+c.join(", ")+"}"},column1_JSON={phrases:[{salutation:"Hooray!",comment:"You made it."},{salutation:"Blimey!",comment:"You startled me."},{salutation:"Well,",comment:"It's about time."},{salutation:"Hey!",comment:"I thought you'd never show."},{salutation:"Hola.",comment:"You've come to the right place."},{salutation:"Hello.",comment:"It's a fine day for parcheesi."},{salutation:"Dude...",comment:"Did you catch that game last night?"},{salutation:"Face front, true believer!",comment:"Let us begin our journey."},{salutation:"Why...",comment:"if it weren't for you meddling kids..."},{salutation:"By the Hoary Hosts of Hoggarth!",comment:"Let's get this show on the road."},{salutation:"Greg Oden's Raven!",comment:"We've much to do..."},{salutation:"Hey!",comment:"Look at you."},{salutation:"HTML, CSS, JS. ",comment:"Let's use more acronyms..."}]},column2_JSON={phrases:[{salutation:"Here's what I'm thinking...",comment:"Didn't see you there."},{salutation:"Let me see what I have here...",comment:"You startled me."},{salutation:"Every self-respecting site needs a blog, right?",comment:"It's about time."},{salutation:"Thought you might want to see this...",comment:"I thought you'd never show."},{salutation:"Yeah, I've been doing a little writing...",comment:"You've come to the right place."},{salutation:"I've been working on these lately...",comment:"It's a fine day for parcheesi."},{salutation:"Racking my digital brain...",comment:"It's a fine day for parcheesi."}]},column3_JSON={phrases:[{salutation:"This isn't the only website I've made...",comment:"Didn't see you there."},{salutation:"When I'm not busy here, this is what I've been up to...",comment:"You startled me."},{salutation:"Just a small sampling of websites...",comment:"It's about time."},{salutation:"Retreiving website portfolio...",comment:"I thought you'd never show."},{salutation:"Yup, websites...",comment:"You've come to the right place."},{salutation:"Got your websites right here...",comment:"It's a fine day for parcheesi."},{salutation:"Work. Let's start with websites...",comment:"Did you catch that game last night?"}]},column4_JSON={phrases:[{salutation:"Oh yeah. I have apps too...",comment:"Didn't see you there."},{salutation:"Apps. Not websites...",comment:"You startled me."},{salutation:"Let's see some apps...",comment:"It's about time."},{salutation:"You might like these apps...",comment:"I thought you'd never show."}]},column5_JSON={phrases:[{salutation:"Got some ads here too...",comment:"Didn't see you there."},{salutation:"Not sites. Not apps. It's ads!",comment:"You startled me."},{salutation:"Fetching ads...",comment:"It's about time."},{salutation:"What would the internet be without ads?",comment:"I thought you'd never show."},{salutation:"Ads. Or Rich Media if you're fancy...",comment:"You've come to the right place."},{salutation:"Tabulating results...",comment:"It's a fine day for parcheesi."}]},column6_JSON={phrases:[{salutation:"A little about myself? Gladly...",comment:"Didn't see you there."},{salutation:"There's something you should know...",comment:"You startled me."},{salutation:"Here's the file on me...",comment:"It's about time."},{salutation:"Seems like a good time to get to know each other better...",comment:"I thought you'd never show."},{salutation:"A-ha! Here's those social media links...",comment:"You've come to the right place."},{salutation:"For your consideration...",comment:"It's a fine day for parcheesi."},{salutation:"My creator is a great man. ( He made me say that. )",comment:"Did you catch that game last night?"},{salutation:"Background check processing...",comment:"Let us begin our journey."}]},interruptionJSON={phrases:[{salutation:"Oh.",comment:"You're going to love this..."},{salutation:"Blimey!",comment:"Topical, eh?"},{salutation:"Well,",comment:"Ah, good choice."},{salutation:"Hey!",comment:"Check this out."},{salutation:"Hola.",comment:"One of my personal favorites..."},{salutation:"Hello.",comment:"Get ready."},{salutation:"Dude...",comment:"Come on internet. Load already."},{salutation:"Face front, true believer!",comment:"Ah-Choo! Excuse me."},{salutation:"Why...",comment:"So my inspiration for this one was... well. You'll see."},{salutation:"By the Hoary Hosts of Hoggarth!",comment:"Really glad you picked this one."},{salutation:"Greg Oden's Raven!",comment:"Let me look that up for you."}]},timeoutID;$(document).ready(function(){var a=function(){newOrientation=window.orientation,swiperParent.reInit(),swiper_column2_nested.reInit(),swiper_column3_nested.reInit(),swiper_column4_nested.reInit(),swiper_column5_nested.reInit()};$(window).bind("orientationchange",a),$("body").hasClass("blog")?selectInterruption():(colorizePanels(),initLogo(),initSwiper());{var b=window.location.origin;void 0!==window.history.pushState}$.address.state(b).init(function(){console.log("init: "+serialize({value:$.address.value(),path:$.address.path(),pathNames:$.address.pathNames(),parameterNames:$.address.parameterNames(),queryString:$.address.queryString()}))}).bind("change",function(a){console.log("change: "+serialize(a,/parameters|parametersNames|path|pathNames|queryString|value/));var b=$.map(a.pathNames,function(a){return a.substr(0,1).toUpperCase()+a.substr(1)}).concat(a.parameters.id?a.parameters.id.split("."):[]),c=b.slice(),d=c.length?c.shift()+" "+c.join("."):"Home";console.log("match ="+d),$("a").each(function(){$(this).toggleClass("selected",$(this).text()==d)}),$.address.title([title].concat(b).join(" | ")),"/blog"==$.address.path()?swiperParent.swipeTo(1):"/portfolio/websites"==$.address.path()||"/portfolio"==$.address.path()?swiperParent.swipeTo(2):"/portfolio/apps"==$.address.path()?swiperParent.swipeTo(3):"/portfolio/ads"==$.address.path()?swiperParent.swipeTo(4):"/about"==$.address.path()&&swiperParent.swipeTo(5,2e3)})});