module.exports.deleteRole = deleteRole;

async function deleteRole(message, studyRole) {
    let args = studyRole;
    let { cache } = message.guild.roles;
    let role = cache.find(role => role.name.toLowerCase() === args);

    if(role) {
        //case 1: member does not have role
        if(!message.member.roles.cache.has(role.id)) {
            return (`${message.author} You do not have the **${role.name}** role!`);
        } else {
            message.member.roles.remove(role);
            return (`${message.author} \n\n Congrats on finishing a \n\n :tomato: **pomodoro session** :tomato: \n\n Have a good break! \n \`\`\`Many hours of studies and practice, achievement is practically a given \n-Rodelo Dimaano\`\`\``);
        }
    } 
}
