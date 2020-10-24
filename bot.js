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
    
    //send message
    if(isValidCommand(message, 'pomodoro')) {
        message.channel.send(`${message.author} starting timer for 25 minutes, happy studying!`);
    }

    //add role
    else if(isValidCommand(message, 'addrole')){
        let args = message.content.toLowerCase().substring(9);
        console.log(args);
        let { cache } = message.guild.roles;
        let role = cache.find(role => role.name.toLowerCase() === args);

        if(role) {
            if(message.member.roles.cache.has(role.id)) {
                message.channel.send("You already have this role!");
                return;
            }

            if(
                role.permissions.has('ADMINISTRATOR') || 
                role.permissions.has('KICK_MEMBERS') ||
                role.permissions.has('MANAGE_GUILD') ||
                role.permissions.has('MANAGE_CHANNELS')){
                    message.channel.send(`${message.author} You cannot access this role`);
                    return;
            } else {
                message.member.roles.add(role)
                    .then(() => message.channel.send('You were added to this role!'))
                    .catch(err => {
                        console.log(err);
                        message.channel.send("Oops! something went wrong");
                    })
            }
                
        }
        else {
            message.channel.send("Role not found!");
        }
    }
});

//edge cases

