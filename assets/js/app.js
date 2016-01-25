/**
 * Created by alisabelousova on 22/01/16.
 */

'use strict';

angular.module('app', [
    'ngRoute',
    'ngResource',
    'ngSanitize',
    'ngCookies',
    'ngSanitize',
    'ngAnimate',
    'ngFileUpload'
])
    .config(function ($locationProvider, $routeProvider, $resourceProvider) {
        $resourceProvider.defaults.stripTrailingSlashes = true;
        $locationProvider.html5Mode(true);
    })
    .controller('PhotoController', function ($scope, $resource, Upload) {
        var Photos = $resource('/photo');
        var Photo = $resource('/photo/:id', {}, {
            update: {
                method: 'PUT'
            }
        });

        $scope.photo = {};
        $scope.form = {};

        Photos.query({
            sort: 'createdAt desc'
        }).$promise.then(
            function(data) {
                $scope.photos = data;
            });

        $scope.upload = function (photo) {
            $scope.form.submitted = true;

            if (file && photo.name) {
                Upload.upload({
                    url: '/createPhoto',
                    file: photo.image,
                    data: {
                        name: photo.name
                    }
                }).then(function (response) {
                    $scope.photo = undefined;
                    $scope.photos.unshift(response.data);
                    $scope.form.submitted = false
                }, function (response) {
                    alert('Error status: ' + response.status)
                }, function (evt) {
                    $scope.photo.progress = parseInt(100.0 * evt.loaded / evt.total);
                });
            }
        };

        $scope.edit = function (photo, index) {
            $scope.newPhoto = angular.copy(photo);
            $scope.photos[index].editable = true;
        };

        $scope.update = function (photo, newPhoto, index) {
            if (newPhoto.name && photo.name != newPhoto.name) {
                Photo.update({
                    "id": photo.id
                }, {
                    "name": newPhoto.name
                }).$promise.then(
                    function (data) {
                        $scope.photos[index].name = data.name;
                    });
            }

            $scope.photos[index].editable = false;
        };

        $scope.delete = function (photo, index) {
            Photos.delete({
                "id": photo.id
            }).$promise.then(
                function(data) {
                    $scope.photos.splice(index, 1);
                });
        };
    });
