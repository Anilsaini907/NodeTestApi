var express= require("express");
var app=express();
var bodyParser=require("body-Parser");
var router=express.Router();
var path = require('path');
var geoip = require('geoip-lite');
// var requestIp = require('request-ip');
// var getIP = require('ipware')().get_ip;
app.use(bodyParser.urlencoded({"extended":false}));
app.use(bodyParser.json());
var mongoOp= require("./model/mongo");
const { mongo } = require("mongoose");
const { db } = require("./model/mongo");

// router.get("/",function(req,res){

//     res.sendFile('htmlPage/Latlong.html', {
//         root: path.join(__dirname, './')
//     })
//    // res.sendFile(path.join(__dirname, "/htmlPage/Latlong.html"));
//    // res.sendFile(__dirname + "/htmlPage/Latlong.html");
// });

router.route("/user")
    .get(function(req,res){
        // res.send(__dirname+'/htmlPage/Latlong.html');
        var response = {};
        mongoOp.find({},function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    });

    router.route("/user")
    .post(function(req,res){
        var db = new mongoOp();
        var response = {};
        db.name = req.body.name;
        db.product = req.body.product;
        db.phone=req.body.phone;  
        var ip = "207.97.227.239";
        var geo = geoip.lookup(ip);
        db.longitude= geo.ll[0];
        db.latitude= geo.ll[1];  
        console.log(  geo.ll[0]) ;
        db.save(function(err){
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
            } else {
                response = {"error" : false,"message" : "Data added"};
            }
            res.json(response);
        });
    });

app.use('/',router);
app.listen(3000);
console.log("listening to port 3000");