function mobilecheck(){var a=!1;return function(b){(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(b)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(b.substr(0,4)))&&(a=!0)}(navigator.userAgent||navigator.vendor||window.opera),a}function detectIE(){var a=window.navigator.userAgent,b=a.indexOf("MSIE "),c=a.indexOf("Trident/");if(b>0)return parseInt(a.substring(b+5,a.indexOf(".",b)),10);if(c>0){var d=a.indexOf("rv:");return parseInt(a.substring(d+3,a.indexOf(".",d)),10)}return!1}function selectPhrase(a){if(!a)var a="column1";var b=Math.floor(Math.random()*column1_JSON.phrases.length);console.log(column1_JSON.phrases[b].salutation),console.log(column1_JSON.phrases[b].comment),$("#"+a+" .salutation").text(column1_JSON.phrases[b].salutation),$("#"+a+" .salutation").fadeIn(200),$(".logo").addClass("touched"),$(".salutation-comment").text(column1_JSON.phrases[b].comment),"column1"!=a&&$(".logo").addClass("touched")}function selectInterruption(){var a=Math.floor(Math.random()*interruptionJSON.phrases.length),b=$("#interupt");b.html("<h2>"+interruptionJSON.phrases[a].comment+"</h2>"),console.log("scuse me: "+interruptionJSON.phrases[a].comment),b.one("webkitAnimationEnd oanimationend msAnimationEnd animationend",function(){b.css({display:"none"}),console.log("end animation")})}function clearAlert(){window.clearTimeout(timeoutID)}function userHint(){$("#column1 .salutation").removeClass("speaking"),$("#column1 .salutation-comment").removeClass("speaking");setTimeout(function(){$("body").width()<=320&&$("#hello h2").css({"font-size":"40px","line-height":"40px"}),$("#column1 .salutation").text("Work, experiments and info.").addClass("speaking"),$("#column1 .salutation-comment").text("Right this way...").addClass("speaking")},500)}function initializeVerticalSwiper(a){var b;if(b=Modernizr.touch&&$("body").width()<=phablet?null:"#column"+a+" .pagination-nested",7==a&&(a=2),"undefined"==typeof window["swiper_column"+a+"_nested"]){console.log("vert swiper_column"+a+"_nested init");var c=0;$("#column"+a+" .swiper-wrapper").first().children(".swiper-slide").each(function(){c++}),console.log(" slide count="+c),window["swiper_column"+a+"_nested"]=new Swiper("#column"+a+" .swiper-nested",{mode:"vertical",keyboardControl:!0,cssWidthAndHeight:!0,mousewheelControl:freeScroll,mousewheelControlForceToAxis:freeScroll,slidesPerView:"auto",loop:vLoop,loopedSlides:c,updateOnImagesReady:!1,onFirstInit:function(){},onSlideClick:function(a){console.log(a.clickedSlide);var b=$(a.clickedSlide).find(".project-tray");b.hasClass("reveal")?b.removeClass("reveal"):b.addClass("reveal")},onSlideChangeStart:function(b){if($(".project-tray").removeClass("reveal"),"null"!=b.previousIndex&&$("#column"+a).hasClass("swiper-slide-active")){var c=$(b.getSlide(b.previousIndex)).find(".owl-carousel");"undefined"!=c.data("owlCarousel")?(console.log("vert slider owl destroy"),c.data("owlCarousel").destroy()):console.log("previous undefined")}},onSlideChangeEnd:function(){if(1==owl_active){$(".full-slide.swiper-slide-active .swiper-nested .swiper-slide-active .owl-carousel").owlCarousel({items:1,lazyLoad:!0,navigation:!1,pagination:!1,singleItem:!0,autoPlay:2e3,transitionStyle:"fade",mouseDrag:!1,touchDrag:!1}).trigger("owl.next")}else $("#column"+a+" .gallery").removeClass("autoplay"),$("#column"+a+" .swiper-slide-active .gallery").addClass("autoplay")},onTouchEnd:function(){},onResistanceAfter:function(){}})}}function initLogo(){if("ontouchstart"in window);else;$(".logo").on({click:function(){$("body").hasClass("blog")?window.location="/"+base+"blog":$("#hello").fadeOut(100,function(){selectPhrase(),$("#hello").delay(200).fadeIn(500),0!=swiperParent.activeIndex&&swiperParent.swipeTo(0,500)})}}),$("#logo").bind("touchstart mousedown",function(){$(this).addClass("touched")}),$("#logo").bind("touchend mouseup",function(){$(this).delay(100).removeClass("touched")}),$(".logo").bind("webkitAnimationEnd mozAnimationEnd animationEnd",function(){$(this).removeClass("touched")}),$(".logo").bind("touchstart mousedown",function(){$(this).addClass("touched")}),$(".logo").bind("touchend mouseup",function(){}),$(".logo").addClass("touched")}function initSwiper(a){console.log("swiper goooooooo");var b=$(window).height(),c=$(window).width();$(".swiper-container").css({height:b}),620>=c&&$(".view").css({height:1.125*c});var d=0;$("#column1").bind("touchstart mousedown",function(){userHint(),$("#column1").hasClass("swiper-slide-active")&&$("#column3").addClass("preview"),d++}),$("#column3").bind("webkitAnimationEnd mozAnimationEnd animationEnd",function(){$(this).removeClass("preview")});var e=0;$(document).scroll(function(){var a=$(this).scrollLeft();$("#column1").hasClass("swiper-slide-active")&&$("#column3").addClass("preview"),e===a&&0==d&&(console.log("I scrolled vertically."),userHint(),d++)}),"undefined"==typeof a&&(a=0),swiperParent=new Swiper(".swiper-parent",{slidesPerView:"auto",loop:hLoop,loopedSlides:5,keyboardControl:!0,offsetPxBefore:leftOffset,initialSlide:a,updateOnImagesReady:!1,mousewheelControl:freeScroll,mousewheelControlForceToAxis:freeScroll,scrollbar:doScroll,onFirstInit:function(){selectPhrase(),$(".swiper-parent").find(".salutation").addClass("speaking"),$(".swiper-parent").find(".salutation-comment").addClass("speaking"),$("body").removeClass("thinking"),initializeVerticalSwiper(3),initializeVerticalSwiper(4),initializeVerticalSwiper(5)},onSlideChangeStart:function(a){if(1==owl_active){var b=$(a.getSlide(a.previousIndex)).find(".swiper-nested .swiper-slide-active .owl-carousel").data("owlCarousel");console.log("swiper.previousIndex="+a.previousIndex),console.log("previousOwl="+b),"null"!=a.previousIndex&&null!=b&&(console.log(">> parent previous ="+b),b.destroy())}$(".logo").addClass("touched"),$(".project-tray").removeClass("reveal")},onSlideChangeEnd:function(){var a=swiperParent.activeIndex,b=a+3;console.log("END: swiperParent.activeIndex="+a+" :: NEXT = "+b);$(".swiper-parent .swiper-slide-active").attr("id");if(1==owl_active){console.log("now active = "+$(".full-slide.swiper-slide-active .swiper-nested .swiper-slide-active .owl-carousel"));var c=$(".full-slide.swiper-slide-active .swiper-nested .swiper-slide-active .owl-carousel").owlCarousel({items:1,lazyLoad:!0,navigation:!1,pagination:!1,singleItem:!0,autoPlay:2e3,transitionStyle:"fade",mouseDrag:!1,touchDrag:!1}).trigger("owl.next");console.log("****** initialized: "+c.data("owlCarousel")),0==a?$.address.value("/"+base):1==a?$.address.value("/"+base+"portfolio/websites"):2==a?$.address.value("/"+base+"portfolio/apps"):3==a?$.address.value("/"+base+"portfolio/ads"):4==a?$.address.value("/"+base+"about"):5==a&&$.address.value("/"+base+"blog")}initializeVerticalSwiper(b)},onResistanceBefore:function(){console.log("onResistanceBefore")},onResistanceAfter:function(){console.log("onResistanceAfter")},onMomentumBounce:function(){console.log("onMomentumBounce")}});"rgb("+Math.floor(256*Math.random())+","+Math.floor(256*Math.random())+","+Math.floor(256*Math.random())+")"}function reInitAll(){console.log("reinit all"),swiperParent.reInit(),swiper_column2_nested.reInit(),swiper_column3_nested.reInit(),swiper_column4_nested.reInit(),swiper_column5_nested.reInit(),swiper_column6_nested.reInit()}function colorizePanels(){var a,b,c=tinycolor("yellow"),d=tinycolor.analogous(c,80),e=39,f=1;$("#column3 .swiper-slide").each(function(){b=tinycolor.desaturate(d[f+e],30),$(this).css({"background-color":tinycolor.darken(b,5)}),$("body").width()<=phablet&&($(this).find(".project-title").css({"background-color":b}),$(this).find(".project-tray").css({"background-color":tinycolor.darken(b,5)})),f++}),$("#column4 .swiper-slide").each(function(){a=tinycolor.desaturate(d[f+e],30),$(this).css({"background-color":tinycolor.darken(a,5)}),$("body").width()<=phablet&&($(this).find(".project-title").css({"background-color":a}),$(this).find(".project-tray").css({"background-color":tinycolor.darken(a,5)})),f++}),$("#column5 .swiper-wrapper").first().children(".swiper-slide").each(function(){a=tinycolor.desaturate(d[f+e],30),$(this).css({"background-color":tinycolor.darken(a,5)}),$("body").width()<=phablet&&($(this).find(".project-title").css({"background-color":a}),$(this).find(".project-tray").css({"background-color":tinycolor.darken(a,5)})),f++}),$("#column6 .swiper-slide").each(function(){a=tinycolor.desaturate(d[f+e],30),$(this).css({"background-color":a}),f++}),$(".blog-slide").each(function(){a=tinycolor.darken(d[f+e],10),console.log("newColor="+a),$(this).css({"background-color":a}),f++}),Modernizr.touch&&$("body").height()<=480&&$(".project-desc ul").css({display:"none"})}var swiperParent,swiper_column1_nested,swiper_column2_nested,swiper_column3_nested,swiper_column4_nested,swiper_column5_nested,swiper_column6_nested,swiper_column7_nested,swiperProject,phablet=620;owl_active=!0;var document=window.document,domain=document.domain;if("dev.supercomputingmachine.com"==domain)var base="dist/";else var base="";var hLoop,vLoop=!0,doScroll,freeScroll,leftOffset;0!=detectIE()&&(vLoop=!1),doScroll=Modernizr.touch?!1:{container:".swiper-scrollbar",hide:!1,draggable:!0,snapOnRelease:!0,onTouchMoveEnd:function(){alert("scrolled")}},$("body").width()<=phablet?(leftOffset=0,hLoop=!1,$(".swiper-scrollbar").css("display","none")):(slides="auto",$(".full-slide").css("width","100%").css("width","-=150px"),hLoop=!1,freeScroll=!0,leftOffset=100),String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});var title=document.title,log=function(a){var b=$(".log");b.size()||(b=$('<div class="log" />').appendTo(".page")),b.append(a.replace(/^([^:]*):(.*)$/,'<p><b>$1:</b> <span class="$1">$2</span></p>')).attr({scrollTop:b.attr("scrollHeight")}).find("p:nth-child(even)").addClass("even")},track=function(){log("track: "+arguments[0])},serialize=function(a,b){var c=[];return $.each(a,function(a,d){(b&&b.test(a)||!b)&&c.push(a+": "+("object"==typeof d?d.join?"'"+d.join(", ")+"'":serialize(d):"'"+d+"'"))}),"{"+c.join(", ")+"}"},column1_JSON={phrases:[{salutation:"Hooray!",comment:"You made it."},{salutation:"Blimey!",comment:"You startled me."},{salutation:"OK,",comment:"Let's get to it!"},{salutation:"Hey!",comment:"I thought you might show up."},{salutation:"Hola.",comment:"You've come to the right place."},{salutation:"Hello.",comment:"It's a fine day for parcheesi."},{salutation:"By the Hoary Hosts of Hoggarth!",comment:"Let's get this show on the road."},{salutation:"Greg Oden's Raven!",comment:"We've much to do..."},{salutation:"Hey!",comment:"Look at you."},{salutation:"HTML, CSS, JS. ",comment:"And many more acronyms..."}]},timeoutID;$(document).ready(function(){var a=function(){newOrientation=window.orientation,swiperParent.reInit(),swiper_column2_nested.reInit(),swiper_column3_nested.reInit(),swiper_column4_nested.reInit(),swiper_column5_nested.reInit()};$(window).bind("orientationchange",a),$(window).resize(function(){var a=$(window).height(),b=$(window).width();$(".swiper-container").css("height",a),phablet>=b?$(".full-slide").css("width",b):$(".full-slide").css("width",b).css("width","-=150px")}),colorizePanels(),initLogo(),initSwiper();{var b=window.location.origin;void 0!==window.history.pushState}$.address.state(b).init(function(){console.log("init: "+serialize({value:$.address.value(),path:$.address.path(),pathNames:$.address.pathNames(),parameterNames:$.address.parameterNames(),queryString:$.address.queryString()}))}).bind("change",function(a){console.log("change: "+serialize(a,/parameters|parametersNames|path|pathNames|queryString|value/));var b=$.map(a.pathNames,function(a){return a.substr(0,1).toUpperCase()+a.substr(1)}).concat(a.parameters.id?a.parameters.id.split("."):[]),c=b.slice(),d=c.length?c.shift()+" "+c.join("."):"Home";console.log("match ="+d),$("a").each(function(){$(this).toggleClass("selected",$(this).text()==d)}),$.address.title([title].concat(b).join(" | ")),$.address.path()=="/"+base?swiperParent.swipeTo(0):$.address.path()=="/"+base+"portfolio/websites"?swiperParent.swipeTo(1,200):$.address.path()=="/"+base+"portfolio/apps"?swiperParent.swipeTo(2,200):$.address.path()=="/"+base+"portfolio/ads"?swiperParent.swipeTo(3,200):$.address.path()=="/"+base+"about"&&(initializeVerticalSwiper(6),swiperParent.swipeTo(4,200)),$.address.path()=="/"+base+"blog"&&(initializeVerticalSwiper(7),swiperParent.swipeTo(5,200))})});