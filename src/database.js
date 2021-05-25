const localStorage = require("localStorage");
var { User } = require("./Schema");
var { Reminder } = require("./Schema");
var mongoose = require("mongoose");
var moment = require('moment');
const uri =
    "mongodb+srv://databaseuser:Splashio@splashiocluster.qif8l.mongodb.net/SplashioDB?retryWrites=true&w=majority";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

const addUserToDatabase = (body, res) => {
    (async () => {
        if (body.token_type === "bot") {
            User.findOneAndUpdate(
                { userId: body.authed_user.id },
                {
                    $set: {
                        channelId: body.incoming_webhook.channel_id,
                        webHookUrl: body.incoming_webhook.url,
                    },
                },
                { multi: true, new: true }
            ).exec((err, docs) => {
                if (err) console.log(err);
                if (!docs) {
                    (async () => {
                        const userauth = new User({
                            userId: body.authed_user.id,
                            teamId: body.team.id,
                            channelId: body.incoming_webhook.channel_id,
                            webHookUrl: body.incoming_webhook.url,
                        });
                        try {
                            await userauth.save();
                        } catch (err) {
                            console.log("is okiiiee");
                        }
                    })();
                } 
            });
            res.redirect('/dashboard');
        } else if (body.authed_user.token_type === "user") {
            localStorage.setItem("userId", body.authed_user.id);
            const userauth = new User({
                userId: body.authed_user.id,
                teamId: body.team.id,
            });
            try {
                await userauth.save();
            } catch (err) {
                console.log("Already exists");
            }
            res.redirect('/dashboard')
        }
    })();
};

function resetzero(){
    Reminder.update({}, {$set: {Amount : 0}}, {multi: true, new: true},function(err,doc){
        if(err){
            console.log(err);
        }
    });  
}

const  reset = () => {
  if(moment().format('h:mm') === '12:30'){
    Reminder.update({}, {$set: {Amount : 0}}, {multi: true, new: true},function(err,doc){
        if(err){
            console.log(err);
        }
    });  
    setTimeout(reset, 86400000);
  }
  else setTimeout(reset, 60000);
}


const reminderData = (reqBody) => {
    console.log('reqBody.present');
    Reminder.findOneAndUpdate(
        { userId: localStorage.getItem('userId') },
        {
            $set: {
                startTime: reqBody.startime,
                endTime: reqBody.lastime,
                frequency: reqBody.frequency.split("every ")[1],
            },
        },
        { multi: true, new: true }
    ).exec((err, docs) => {
        if (err) console.log(err);
        if (!docs) {
            (async () => {
                const reminder = new Reminder({
                    userId:  reqBody.userId,
                    startTime: reqBody.startime,
                    endTime: reqBody.lastime,
                    frequency: reqBody.frequency.split("every ")[1],
                });
                try {
                    await reminder.save();
                } catch (err) {
                    console.log("is okiiiee");
                }
            })();
        }
    });
}

function findInUser() {
    const docs = User.findOne( { userId: localStorage.getItem('userId') } );
    return docs.exec();
}

function updateDailyStatus(noofglasses, userId) {
    try{
        const docs = Reminder.findOneAndUpdate(
            { userId: userId },
            {
                $inc: {
                    Amount: noofglasses,
                },
            },
            { new: true }
        );
        return docs.exec();
    }catch(e){
        console.log("no no");
    }
}

module.exports = { addUserToDatabase, reminderData, findInUser, updateDailyStatus,reset }
