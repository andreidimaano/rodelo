module.exports.addRole = addRole;

let checkPermissions = (role) => (role.permissions.has('ADMINISTRATOR') || role.permissions.has('KICK_MEMBERS') || role.permissions.has('MANAGE_GUILD') || role.permissions.has('MANAGE_CHANNELS')) ? true : false

async function addRole(message) {
    let args = message.content.toLowerCase().substring(9);
    let { cache } = message.guild.roles;
    let role = cache.find(role => role.name.toLowerCase() === args);

    //check if role exists
    if(role) {
        //case 1: member has role
        if(message.member.roles.cache.has(role.id)) {
            return `${message.author} You already have this role!`;
        } 

        //case 2: role has bad permissions
        if(checkPermissions(role)) {
            return `${message.author} You cannot access this role.`;
        } else {
            //case 3: can add role
            message.member.roles.add(role);
            return `${message.author} You were added to **${role.name}** role! Happy Studying!`
        }
    }
}