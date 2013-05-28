/*global define*/
(function (window, undefined) {
    define([
        'underscore',
        'backbone',
        'IO/IO',
        'App/AppsCollection'
    ], function (
        _,
        Backbone,
        IO,
        AppsCollection
    ) {
        var appsCollection = AppsCollection.getInstance();

        var App = _.extend({}, Backbone.Events);

        appsCollection.on('refresh', function () {
            App.trigger('refresh');
        });

        App.detectApp = function (packageName, versionCode) {
            var targetApp = appsCollection.get('packageName');
            var status = 0;
            if (!targetApp) {
                status = 0;
            } else {
                if (targetApp.get('versionCode') >= versionCode) {
                    status = 1;
                } else {
                    status = 2;
                }
            }
            return status;
        };

        return App;
    });
}(this));
