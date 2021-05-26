![BFH Banner](https://trello-attachments.s3.amazonaws.com/542e9c6316504d5797afbfb9/542e9c6316504d5797afbfc1/39dee8d993841943b5723510ce663233/Frame_19.png)
# SPLASHIO
## Summary

A slack bot to remind user about drinking water. 

## Elements

- User profiles to setup reminder and update
- Slack bot to send reminder and take feedback
- Sign in with slack


## Possible users journey

- User able to login to a website using slack login
- Setup reminder frequency (every hour, every 30 min, every 2 hours, every 3 hours) and start and ending time of the day (eg: work time usually - 9am to 8PM)
- See daily status of water consumed each day.
- Users get slack notification as message as reminder with following action buttons
    - 1 glass
    - 2 glass
    - 3 glass
    - 0 glass
    - Snooze for 10 minutes
## Team members
1. [Irene Elizabeth Sabu](https://github.com/ireneelizabethsabu)
2. [Elsa Maria Joseph](https://github.com/Lza-etc)
3. [Aishwarya A J](https://github.com/aish2002)
## Team Id
###   `BFH/recFwI5dmSSc22vib/2021`
## Link to product walkthrough
Here's the [Product Walkthrough](https://www.loom.com/share/a5a8543fd3b14be3b334552b8d28186b)
## How it Works ?
- Go to [https://splashio.herokuapp.com](https://splashio.herokuapp.com/) 
- Click Sign in Button . You will be redirected to dashboard after successful login 
- Click on Add to Slack Button to add the bot to the desired channel.
- Set your reminder by clicking on set reminder button. You can specify start time, end time and frequency in the modal that pops up
- Check your Slack app and invite Splashio bot to the same channel.
- You will get timely notifications in that channel. (This feature is currently accessible only in the development workspace)  
- Select one of the options provided in the notification button to indicate the amount of water you consumed. 
- Your hydration status will be reflected in your [dashboard](https://splashio.herokuapp.com/dashboard)


Here's the [Product Walkthrough](https://www.loom.com/share/a5a8543fd3b14be3b334552b8d28186b)
## Libraries used
    @popperjs/core: "^2.9.2"
    @slack/web-api: "^6.2.3"
    bootstrap: "^5.0.1"
    dotenv: "^9.0.2"
    express: "^4.17.1"
    express-session: "^1.17.2",
    moment: "^2.29.1"
    mongodb: "^3.6.7"
    mongoose: "^5.12.10"
    nodemon: "^2.0.7"
    slackbots: "^1.2.0"
    socket.io: "^4.1.2"
## How to configure
### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    $ npm --version
   

## Install

    $ git clone https://github.com/ireneelizabethsabu/Splashio.git
    $ cd Splashio
    $ npm install

Configure your slack app at [Slack API website](https://api.slack.com/apps). 

Get the tokens from your app and paste them in .env file as shown in .env.example

## How to Run
### `npm start`
Runs the app in the development mode.
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.
