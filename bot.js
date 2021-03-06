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
        let timer = parseInt(message.content.substring(10));

        let botMessage = await startPomodoro(message, currentRole, timer).catch(err => {
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
            }, timer * 60000)
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

    else if(isValidCommand(message, 'rodelohelp')) {
        message.channel.send(`${message.author} \n\n:sunglasses: Rodelo to the rescue!\n \`\`\`!rodelohelp : list of commands\n\n !pomodoro [x] : set pomodoro for x amount of minutes\n\n !setrole : set the server role for the pomodoro, I recommened creating a "studying" role\`\`\``);
    }
});


