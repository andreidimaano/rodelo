let discord = require('discord.js');
let client = new discord.Client();
require('dotenv').config();

client.login(process.env.TOKEN);
