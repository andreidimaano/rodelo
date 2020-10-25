module.exports.deleteRole = deleteRole;

async function deleteRole(message) {
    let args = message.content.toLowerCase().substring(9);
    let { cache } = message.guild.roles;
    let role = cache.find(role => role.name.toLowerCase() === args);

    if(role) {
        //case 1: member does not have role
        if(!message.member.roles.cache.has(role.id)) {
            return (`${message.author} You do not have the **${role.name}** role!`);
        } else {
            message.member.roles.remove(role);
            return (`${message.author} Congrats on finishing a pomodoro session Have a good break! \n \`\`\`Many hours of studies and practice, achievement is practically a given \n-Rodelo Dimaano\`\`\``);
        }
    } 
}
