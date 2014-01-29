require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
       // fitText: 'jquery.fittext',
        touche: 'touche.min'
    },
    shim: {
        fitText: {
            deps: ['jquery']
        },
        touche: {
            deps: ['jquery']
        }
    }
});

require(['simple','touche','jquery'], function (app, touche, $) {
    'use strict';
    // use app here
    console.log(app);
    console.log('Running jQuery %s', $().jquery);
});
