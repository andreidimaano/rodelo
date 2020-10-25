require('dotenv').config();
let discord = require('discord.js');
let client = new discord.Client();
let PREFIX = process.env.PREFIX;
let { addRole } = require('./components/addRole'); 
let { deleteRole } = require('./components/deleteRole'); 
let { startPomodoro } = require('./components/pomodoro'); 

client.login(process.env.TOKEN);

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in.`);
});

let isValidCommand = (message, cmdName) => message.content.toLowerCase().startsWith(PREFIX + cmdName);

client.on('message', async (message) => {
    if(message.author.bot) return;
    
    //send message
    if(isValidCommand(message, 'pomodoro')) {
        let confirmationMessage = await startPomodoro(message).catch(err => {
            console.log(err);
            message.channel.send("Oops! something went wrong");
        });
        
        message.channel.send(confirmationMessage);
    }

    //add role
    else if(isValidCommand(message, 'addrole')){
        let confirmationMessage = await addRole(message).catch(err => {
            console.log(err);
            message.channel.send("Oops! something went wrong");
        });
        message.channel.send(confirmationMessage);
    }

    //delete role
    else if(isValidCommand(message, 'delrole')){
        let confirmationMessage = await deleteRole(message).catch(err => {
            console.log(err);
            message.channel.send('Oops! something went wrong');
        });
        message.channel.send(confirmationMessage);
    }
});


