const HipChatNotify = require('hipchat-notify');
let hipchat = new HipChatNotify(4516663, 'tn8neyu93ei7x3jRnYrHuzNtq2RbXXGuIXwZTmwn');

exports.handler = function(event, context, callback) {
    const user = context.clientContext.user;
    console.log("identity validate");
    hipchat.notify({
        message: 'identity validate, user: ' + JSON.stringify(user),
        color: 'yellow'
    });
    hipchat.notify({
        message: 'identity validate, event: ' + JSON.stringify(event),
        color: 'yellow'
    });
    hipchat.notify({
        message: 'identity signup, context: ' + JSON.stringify(context),
        color: 'yellow'
    });
    callback(null, {
        statusCode: 200
    });
};
