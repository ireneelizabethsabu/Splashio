var request = require("request");
const { WebClient } = require("@slack/web-api");
const slackToken = process.env.SLACK_BOT_TOKEN;
const slackClient = new WebClient(slackToken);

 function publishMessage(channelId, userId) {
    try { 
      const result = slackClient.chat.postEphemeral({
        channel: channelId,
        user: userId,
        text: "Hey it's time to drink water!!",
        attachments: [
          {
            text: "How much water did you consume?",
            fallback: "Shame... buttons aren't supported in this land",
            callback_id: "button_tutorial",
            color: "#3AA3E3",
            attachment_type: "default",
            type: "interactive_message",
            actions: [
              {
                name: "0",
                text: "0 glass",
                type: "button",
                value: "0",
              },
              {
                name: "1",
                text: "1 glass",
                type: "button",
                value: "1",
              },
              {
                name: "2",
                text: "2 glass",
                type: "button",
                value: "2",
              },
              {
                name: "3",
                text: "3 glass",
                type: "button",
                value: "3",
              },
              {
                name: "snooze",
                text: "snooze for 10 minutes",
                type: "button",
                value: "snooze",
              },
            ],
          },
        ],
      });
    } catch (error) {
      console.error("Publish message error");
    }
  }
  
  function sendResponse(response_url, JSONmessage) {
    var options = {
      url: response_url,
      method: 'POST',
      headers: {
        "Content-type": "application/json",
      },
      json: JSONmessage,
    }
    request(options, function (err, response, body) {
      if (err) {
        console.log(err);
      }
    });
  }

  module.exports = {publishMessage, sendResponse}
