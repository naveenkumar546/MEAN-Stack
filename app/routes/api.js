var User=require("../models/user");
var jwt = require('jsonwebtoken');
var secret='harrypotter';
var path=require("path");
module.exports=function (router) {
    router.post('/users', function (req, res) {
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        if (req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == '') {
            res.json({success:false,message:'you have to give Username,password and email'});
        } else {
            user.save(function (err) {
                if (err) {
                    res.json({success:false,message:'Username already Exist'});
                } else {
                    res.json({success:true,message:'User Created'});
                }
            });
        }

    });

    //http:localhost:8080/api/authenticate
    router.post('/authenticate',function (req,res) {
        User.findOne({username:req.body.username}).select('email username password').exec(function (err, user) {
            if(err) throw err;

            if(!user) {

                res.json({success: false, message: 'Could not Authenticate User'});

            }
            else if(user){
                if(req.body.password){
                    var validpassword=user.comparePassword(req.body.password);
                }
                else{
                    res.json({success: false, message: 'No Password Provided'});
                }
                if(!validpassword){
                    res.json({success: false, message: 'Could not Authenticate Password'});
                }
                else{
                    var token=jwt.sign({username:user.username,email:user.email},'secret',{ expiresIn: '24h' });
                    res.json({success: true, message: 'User Authenticated',token:token});
                }


            }
        });
    });
    //getting Jwt token data
    router.use(function (req,res,next) {
        var token=req.body.token || req.body.query || req.headers['x-access-token'];
        if(token){
            jwt.verify(token,'secret',function (err,decoded) {
                if(err){
                    res.json({success:false,message:'Token Invalid'});
                }else{
                    req.decoded=decoded;
                    next();
                }
            });
        }else{
            res.json({success:false,message:'No Token Provide'});
        }
    })

    router.post('/me',function (req,res) {
        res.send(req.decoded);
    });

    return router;
};

