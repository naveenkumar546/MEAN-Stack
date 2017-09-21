angular.module('Userapp',['appRoutes','usercontroller','userservice','ngAnimate','authService','mainController'])
.config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
});