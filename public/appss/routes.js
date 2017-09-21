angular.module('appRoutes',['ngRoute'])
.config(function ($routeProvider,  $locationProvider) {
    $routeProvider
        .when('/',{
        templateUrl:'appss/view/pages/home.html'
    })
        .when('/about',{
            templateUrl:'appss/view/pages/about.html'

        })
        .when('/register',{
    templateUrl:'appss/Users/Registration.html',
            controller:'regCtrl',
            controllerAs:'register'

        })
        .when('/login',{
            templateUrl:'appss/Users/login.html'
        })
        .when('/logout',{
            templateUrl:'appss/Users/logout.html'
        })
        .when('/profile',{
            templateUrl:'appss/Users/profile.html'
        })


        .otherwise({ redirectTo:'/'});
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });


});
