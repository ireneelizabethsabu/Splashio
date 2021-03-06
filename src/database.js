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

const  reset = () => {
  if(moment().utcOffset("+05:30").format("HH:mm") === '00:00'){
    Reminder.update({}, {$set: {Amount : 0}}, {multi: true, new: true},function(err,doc){
        if(err){
            console.log(err);
        }
    });  
    setTimeout(reset, 86400000);
  }
  else setTimeout(reset, 60000);
}


const reminderData = (reqBody,user) => {
    Reminder.findOneAndUpdate(
          {userId: user},
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
                    userId: user,
                    startTime: reqBody.startime,
                    endTime: reqBody.lastime,
                    frequency: reqBody.frequency.split("every ")[1],
                });
                try {
                    await reminder.save();
                } catch (err) {
                    console.log("Invalid user");
                }
            })();
        }
    });
}

function findInUser(userid) {
    const docs = User.findOne( { userId: userid } );
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
        console.log("user does not exist in database");
    }
}

module.exports = { addUserToDatabase, reminderData, findInUser, updateDailyStatus,reset }
