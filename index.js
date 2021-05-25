require("dotenv").config();
var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var path = require("path");
const PORT = process.env.PORT || 3001;
const moment = require("moment");
var  botFn  = require('./src/botHelpers');
var  db  = require('./src/database');
var session = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(session({
  secret: process.env.SESSION,
  resave: true,
  saveUninitialized: true
}));

function checkSignIn(req, res){
   if(req.session.user){
      next();     //If session exists, proceed to page
   } else {
      //var err = new Error("Not logged in!");
      console.log('please sign to go to dashboard');
      //next(err);  //Error, trying to access unauthorized page!
   }
}

const server = app.listen(PORT, () => {
  console.log("App listening on port " + PORT);
}); 

const io = require('socket.io')(server);
app.set('socketio', io);

//app.use
app.use(express.static(__dirname + "/front-end/"));
app.use("/assets", express.static(path.join(__dirname + "/assets")));
app.use("/css", express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js")));
app.use(
  "/js",
  express.static(path.join(__dirname, "/javascript-fluid-meter-master/js"))
);
app.use(express.static(__dirname));

//app.get()
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/front-end/index.html");
});

app.get("/dashboard",checkSignIn, (req, res) => {
  res.sendFile(__dirname + "/front-end/dashboard.html");
});

app.get("/oauth", function (req, res) {
  if (!req.query.code) {
    res.status(500);
    res.send({ Error: "Looks like we're not getting code." });
  } else {
    request(
      {
        url: "https://slack.com/api/oauth.v2.access", //URL to hit
        qs: {
          code: req.query.code,
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
        }, //Query string data
        method: "GET", //Specify the method
      },
      function (error, response, body) {
        if (error) {
          console.log(error);
          res.redirect("/");
        } else {
          body = JSON.parse(body);
          req.session.user = body.authed_user.id;
          db.addUserToDatabase(body,res);
        }
      } 
    ); 
  }
});   

//app.post()
app.post("/setreminder", urlencodedParser, (req, res) => {
  db.reminderData(req.body,req.session.user);
  var s=req.body.startime+":00";
  var l=req.body.lastime+":00";
  var start=moment(s,"HH:mm");
  var end = moment(l,"HH:mm");
  var duration = moment.duration(end.diff(start));
  db.findInUser(req.session.user).then((docs) => {
    var interval = parseInt(JSON.stringify(req.body).split(" ")[1]);
    interval = (interval === 30 ) ? interval*60000 : interval* 3600000;
    function timingFn () {
      var t = moment().utcOffset("+05:30").format("HH:mm");
      var time=moment(t,"HH:mm");
      if (time.isBetween(start,end)){
        botFn.publishMessage(docs.channelId,docs.userId);
        console.log('msg incoming');
        setTimeout(timingFn,interval);
      }else{
        console.log('its sleep time');
        setTimeout(timingFn,duration._milliseconds );
      }
    }
    setTimeout(timingFn, interval);
  });  
  res.redirect("/dashboard");
  res.status(200).end();
});   

setTimeout(db.reset,10000);

const waterDrank = (num) => {
  num = num > 8 ? 8 : num;
  num = Math.floor(100*(num/8));
  io.emit('newMessage', {
        amount: num,  
  });
} 

app.post("/interactive", urlencodedParser, (req, res) => {
  const body = JSON.parse(req.body.payload);
  if (body.token != process.env.VERIFICATION_TOKEN) {
    res.status(403).end("Access forbidden");
  } else {
      if(parseInt(body.actions[0].value)){
        db.updateDailyStatus(parseInt(body.actions[0].value),body.user.id).then( (doc) => {
          waterDrank(doc.Amount);
        });
      }else if(body.actions[0].value === 'snooze'){
              setTimeout(botFn.publishMessage(body.channel.id,body.user.id), 600000);          
      }
      botFn.sendResponse(body.response_url, {
        attachments: [
          { text: "Your feedback is saved! :+1:" },
          { fallback: "buttons aren't supported in this land " },
        ]
      });   
      res.status(200).end();
  }
});
