// angular.module('authService',[])
//     .factory('Auth',function () {
//         //
//        var authfactory={};
//        authfactory.login=
//
//     })

angular.module('authService',[])
    .factory('Auth',function ($http,AuthToken) {
       var authFactory={};
        authFactory.login=function (loginData) {
            return  $http.post('/api/authenticate',loginData).then(function (data) {
                // console.log(data.data.token);
                AuthToken.setToken(data.data.token)
                return data;
            });
        };
        // Auth.isLoggedIn();
        authFactory.isLoggedIn=function () {
            if(AuthToken.getToken()){
                return true

                    ;
            }else{
                return false;
            }
        };

        // Auth.logout();
        authFactory.logout=function () {
            AuthToken.setToken();

        };

        authFactory.getUser=function () {
            if(AuthToken.getToken()){
                return $http.post('/api/me');
            }else{
                $q.reject({message:'User has Not Token'});
            }
        };


        return authFactory;
    })


    .factory('AuthToken',function ( $window) {
    var authTokenfactory={};

    authTokenfactory.setToken=function (token) {
        if(token){
            $window.localStorage.setItem('token',token);
        }else{
            $window.localStorage.removeItem('token');
        }

    };

    authTokenfactory.getToken=function () {
        return $window.localStorage.getItem('token');
    }
    return authTokenfactory;
})

.factory('AuthInterceptor',function (AuthToken) {
  var   authInterceptorFactory={};

    authInterceptorFactory.request=function (config) {
        var token=AuthToken.getToken();
        if(token){
            config.headers['x-access-token']=token;
        }
        return config;
    };


  return authInterceptorFactory;
});
