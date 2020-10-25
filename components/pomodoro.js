let {addRole} = require('./addRole');
let { deleteRole } = require('./deleteRole');

module.exports.startPomodoro = startPomodoro;

async function startPomodoro(message, role, timer) {
    return await addRole(message, role, timer);
}


