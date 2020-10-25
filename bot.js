require('dotenv').config();
let discord = require('discord.js');
let client = new discord.Client();
let PREFIX = process.env.PREFIX;
let { addRole } = require('./components/addRole'); 
let { deleteRole } = require('./components/deleteRole'); 
let { startPomodoro } = require('./components/pomodoro'); 
let currentRole = "studying";


//if you want to set up a custom bot, needs a database to keep track of your role name.

client.login(process.env.TOKEN);

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in.`);
});

let isValidCommand = (message, cmdName) => message.content.toLowerCase().startsWith(PREFIX + cmdName);

client.on('message', async (message) => {
    if(message.author.bot) return;
    
    //send message
    if(isValidCommand(message, 'pomodoro')) {
        let botMessage = await startPomodoro(message, currentRole).catch(err => {
            console.log(err);
            message.channel.send("Oops! something went wrong");
        });
        
        let { confirmationMessage, isValid } = botMessage;

        if(isValid){
        //sends study message
        message.channel.send(confirmationMessage);

        //Delete Role
        //Return study break message
            setTimeout(async () => {
                let newMessage = await deleteRole(message, currentRole);
                message.channel.send(newMessage);
            }, 5000)
        } else {
            //return error message
            message.channel.send(confirmationMessage);
        }
    }

    //set role
    else if(isValidCommand(message, 'setrole')) {
        console.log(`previous role: ${currentRole}`);
        let newRole = message.content.toLowerCase().substring(9);

        currentRole = newRole;
        console.log(`current role: ${currentRole}`);
    }
});


