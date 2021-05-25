var mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: String, unique: true },
    teamId: { type: String },
    channelId: { type: String, default: ''},
    webHookUrl: { type: String, default: '' },
   }
);

const reminderSchema = new mongoose.Schema({
   userId: { type: String, unique: true },
   startTime: String,
   endTime: String,
   frequency: String,
   Amount: {type: Number, default: 0} 
  }
);
 
module.exports = {
   Reminder: mongoose.model('Reminder',reminderSchema),
   User: mongoose.model('User',userSchema)
};
