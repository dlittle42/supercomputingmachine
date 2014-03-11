require.config({
    //baseUrl: "/scripts",
    paths: {
       // jquery: '../bower_components/jquery/jquery',
       // jquery: '//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min',
        jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.min',
        /*
        bootstrapAffix: '../bower_components/sass-bootstrap/js/affix',
        bootstrapAlert: '../bower_components/sass-bootstrap/js/alert',
        bootstrapButton: '../bower_components/sass-bootstrap/js/button',
        bootstrapCarousel: '../bower_components/sass-bootstrap/js/carousel',
        bootstrapCollapse: '../bower_components/sass-bootstrap/js/collapse',
        bootstrapPopover: '../bower_components/sass-bootstrap/js/popover',
        bootstrapScrollspy: '../bower_components/sass-bootstrap/js/scrollspy',
        bootstrapTab: '../bower_components/sass-bootstrap/js/tab',
        bootstrapTooltip: '../bower_components/sass-bootstrap/js/tooltip',
        bootstrapTransition: '../bower_components/sass-bootstrap/js/transition',
        */
        touche: 'touche.min',
        swiper: 'idangerous.swiper',
        swiperScrollbar: 'idangerous.swiper.scrollbar-2.1',
        address: 'jquery.address',
        tinycolor: 'tinycolor-min',
        owl: 'owl-carousel/owl.carousel.min'
    },
    shim: {
      /*  bootstrapAffix: {
            deps: ['jquery']
        },
        bootstrapAlert: {
            deps: ['jquery']
        },
        bootstrapButton: {
            deps: ['jquery']
        },
        bootstrapCarousel: {
            deps: ['jquery']
        },
        bootstrapCollapse: {
            deps: ['jquery']
        },
        bootstrapPopover: {
            deps: ['jquery']
        },
        bootstrapScrollspy: {
            deps: ['jquery']
        },
        bootstrapTab: {
            deps: ['jquery']
        },
        bootstrapTooltip: {
            deps: ['jquery']
        },
        bootstrapTransition: {
            deps: ['jquery']
        },*/
        touche: {
            deps: ['jquery']
        },
        swiper: {
            deps: ['jquery']
        },
        swiperScrollbar: {
            deps: ['swiper']
        },
        address: {
            deps: ['jquery']
        },
        tinycolor: {
            deps: ['jquery']
        },
        owl: {
            deps: ['jquery']
        }
    },
    waitSeconds: 200
});

require(['app', 'touche', 'swiper','swiperScrollbar','address','tinycolor','owl','jquery'], function (app, touche, swiper,swiperScrollbar,address,tinycolor,owl, $) {
    'use strict';
    // use app here
  
   
    /*
    $('.carousel ul').anoSlide(
    {
        items: 1,
        speed: 500,
        prev: 'a.prev',
        next: 'a.next',
        lazy: true,
        auto: 4000
    })
*/

    console.log(app);
    console.log(swiper);
    console.log('Running jQuery %s', $().jquery);
});
