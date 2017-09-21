angular.module('usercontroller',['userservice'])
.controller('regCtrl',function ($http,$location,$timeout,User) {
    var app=this;
this.registerUser =function (regData) {
    app.loading=true;
    app.errorMsg=false;
    console.log("button is working");
    // console.log(this.regData);
    User.create(app.regData).then(function(data){
        console.log(data.data.success);
        console.log(data.data.message);
        if(data.data.success){
            app.loading=false;
            app.successMsg=data.data.message+'.....Redirect to';
            $timeout(function () {
                $location.path('/');
            },15000);
        }
        else{
            app.loading=false;
            app.errorMsg=data.data.message;
        }
    });

};
});
// angular.module('usercontroller', [])
//
//     .controller('regCtrl', function($http, $location, $timeout){
//
//         var app=this;
//
//         this.regUser = function(regData){
//             console.log("button is working");
//             app.loading = true;
//             app.errorMessage= false;
//             // console.log(app.regData);
//             // User.create(app.regData).then(function(data){
//                 $http.post('/api/users',this.regData).then(function (data) {
//                 if(data.data.success){
//                     app.loading=false;
//                     app.successMessage = data.data.message;
//                     $timeout(function() {
//                         $location.path('/');
//                     }, 1500);
//
//                 }
//                 else{
//                     app.loading=false;
//                     app.errorMessage = data.data.message;
//                 }
//             });
//         };
//     });