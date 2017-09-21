angular.module('mainController',['authService'])
.controller('mainCtrl',function ($http,$timeout,$location,Auth,$rootScope) {
    var app=this;
    $rootScope.$on('$routeChangeStart',function () {
        app.isLoggedIn=false;
        if(Auth.isLoggedIn()){
            console.log("Successs:User Is Logged In");
            app.isLoggedIn=true;
            Auth.getUser().then(function (data) {
                console.log(data.data.username);
                app.username=data.data.username;
                app.email=data.data.email;
            });
        }else {
            console.log("Fail Logged In");
            app.isLoggedIn=false;
            app.username='';
        }
    });


    this.dologin =function (loginData) {
        app.loading=true;
        app.errorMsg=false;
        console.log("button is working");
        // console.log(this.regData);
        Auth.login(app.loginData).then(function(data){
            console.log(data.data.success);
            console.log(data.data.message);
            if(data.data.success){
                app.loading=false;
                app.successMsg=data.data.message+'.....Redirect to';
                $timeout(function () {
                    app.loginData='';
                    app.successMsg=false;
                    $location.path('/about');
                },2000);
            }
            else{
                app.loading=false;
                app.errorMsg=data.data.message;
            }
        });

    };

    this.logout=function () {
        Auth.logout();
        $location.path('/logout');
        $timeout(function () {
            $location.path('/');
        },2000);
    }
});