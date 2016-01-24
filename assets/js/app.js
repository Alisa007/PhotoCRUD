/**
 * Created by alisabelousova on 22/01/16.
 */

'use strict';

angular.module('app', [
    'ngRoute',
    'ngResource',
    'ngAnimate',
    'ngCookies',
    "ngTouch",
    'ngSanitize',
    'ngFileUpload',
    'app.photo'
])
    .config(function ($locationProvider, $routeProvider, $resourceProvider, $httpProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'templates/index.html',
                controller: 'PhotoController'
            })
            .otherwise({
                redirectTo: "/"
            })
        ;

        $resourceProvider.defaults.stripTrailingSlashes = true;
        $locationProvider.html5Mode(true);
    });
