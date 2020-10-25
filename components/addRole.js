module.exports.addRole = addRole;

let checkPermissions = (role) => (role.permissions.has('ADMINISTRATOR') || role.permissions.has('KICK_MEMBERS') || role.permissions.has('MANAGE_GUILD') || role.permissions.has('MANAGE_CHANNELS')) ? true : false

async function addRole(message, studyRole, timer) {
    let args = studyRole;
    let { cache } = message.guild.roles;
    let role = cache.find(role => role.name.toLowerCase() === args);

    //check if role exists
    if(role) {
        //case 1: member has role
        if(message.member.roles.cache.has(role.id)) {
            return {
                confirmationMessage: `${message.author} You already have this role!`,
                isValid: false
            };
        } 

        //case 2: role has bad permissions
        if(checkPermissions(role)) {
            return {
                confirmationMessage: `${message.author} You cannot access this role.`,
                isValid: false
            };
        } else {
            //case 3: can add role
            message.member.roles.add(role);
            return {
                confirmationMessage: `${message.author} \n\n:closed_book: You were added to **${role.name}** role! \n \n:alarm_clock: Your timer is set to ${timer} minutes \n\n:blush: Happy Studying! \n\n`,
                isValid: true
            }
        }
    }
}

