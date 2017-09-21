var express=require("express");
var app=express();
var morgan=require("morgan");
var port=process.env.PORT || 8080;
var mongoose=require("mongoose");
// var User=require("./appss/models/user");      // packages
var bodyParser=require("body-parser");
var bcrypt=require("bcrypt-nodejs");
 var router=express.Router();
var passport = require('passport')


var appRoutes= require('./app/routes/api')(router);
var path=require("path");

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/api',appRoutes);


app.use(express.static(__dirname + '/public'));        //middleware


mongoose.connect('mongodb://localhost:27017/Usersss',function (err) {
    if(err){
        console.log("Not connected");
    }else
    {
        console.log("succssfully connected");   //Database connection
    }

});
// appss.post('/users', function (req, res) {
//     var user = new User();
//     user.username = req.body.username;
//     user.password = req.body.password;
//     user.email = req.body.email;
//     if (req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == '') {
//         res.send("you have to give Username,password and email");
//     } else {
//         user.save(function (err) {
//             if (err) {
//                 res.send(err);
//             } else {
//                 res.send(" user created");
//             }
//         });
//     }
//
// });

app.get('/home',function(req,res){
    res.send("Hello wrold");

});

app.get('*',function (req,res) {
    res.sendFile(path.join(__dirname+'/public/appss/view/index.html'));
});


app.listen(port, function () {
    console.log("server running",+port);
});                                             //server port