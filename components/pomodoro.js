let {addRole} = require('./addRole');
let { deleteRole } = require('./deleteRole');

module.exports.startPomodoro = startPomodoro;

async function startPomodoro(message, role) {
    return await addRole(message, role);
}


