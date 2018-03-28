const HipChatNotify = require('hipchat-notify');
let hipchat = new HipChatNotify(4516663, 'tn8neyu93ei7x3jRnYrHuzNtq2RbXXGuIXwZTmwn');

exports.handler = function(event, context, callback) {
    const user = context.clientContext.user;
    console.log("separate validate");
    hipchat.notify({
        message: 'separate validate, user: ' + JSON.stringify(user),
        color: 'yellow'
    });
    hipchat.notify({
        message: 'separate validate, event: ' + JSON.stringify(event),
        color: 'yellow'
    });
    hipchat.notify({
        message: 'separate signup, context: ' + JSON.stringify(context),
        color: 'yellow'
    });
    callback(null, {
        statusCode: 200
    });
};
