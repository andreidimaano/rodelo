require('dotenv').config();
let discord = require('discord.js');
let client = new discord.Client();
let PREFIX = process.env.PREFIX;


client.login(process.env.TOKEN);

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in.`);
});

let isValidCommand = (message, cmdName) => message.content.toLowerCase().startsWith(PREFIX + cmdName);

client.on('message', (message) => {
    if(message.author.bot) return;
    
    if(isValidCommand(message, 'pomodoro')) {
        message.channel.send(`${message.author} starting timer for 25 minutes, happy studying!`);
    }

    
});

