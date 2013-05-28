/*!
 * Narya.js Wandoujia 2.0 Doraemon JavaScript SDK v0.5
 * https://github.com/wandoulabs/Narya
 *
 * Copyright 2010 - 2012 WandouLabs
 * Release under GPL License.
 *
 * Read sourece code? Join us! We're hiring WEB front-end engineer
 * with curiosity like U!
 * http://www.wandoujia.com/join
 */
(function (window, undefined) {
    require.config({
        paths : {
            underscore : 'libraries/underscore-1.4.4',
            backbone : 'libraries/backbone-1.0.0'
        },
        shim: {
            underscore : {
                exports : '_'
            },
            backbone : {
                deps: ['underscore'],
                exports: 'Backbone'
            }
        }
    });

    require([
        'Doraemon/Doraemon',
        'IO/IO',
        'Social/Social',
        'Device/Device',
        'App/App'
    ], function (
        Doraemon,
        IO,
        Social,
        Device,
        App
    ) {
        console.log('OneRing is now ruling Narya ...');

        var root = window;

        var Narya = {
            App : App,
            Doraemon : Doraemon,
            IO : IO,
            Social : Social,
            Device : Device
        };

        root.Narya = root.SnapPea = Narya;

        return Narya;
    });
}(this));
