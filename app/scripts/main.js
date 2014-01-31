require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
       // fitText: 'jquery.fittext',
        touche: 'touche.min',
        swiper: 'idangerous.swiper-2.1.min',
        swiperScrollbar: 'idangerous.swiper.scrollbar-2.1'
    },
    shim: {
        fitText: {
            deps: ['jquery']
        },
        touche: {
            deps: ['jquery']
        },
        swiper: {
            deps: ['jquery']
        },
        swiperScrollbar: {
            deps: ['swiper']
        }
    }
});

require(['simple','touche','swiper','swiperScrollbar', 'jquery'], function (app, touche,swiper, scrollbar, $) {
    'use strict';
    // use app here
    console.log(app);
    console.log('Running jQuery %s', $().jquery);
});
