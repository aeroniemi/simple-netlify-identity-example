const HipChatNotify = require('hipchat-notify');
let hipchat = new HipChatNotify(4516663, 'tn8neyu93ei7x3jRnYrHuzNtq2RbXXGuIXwZTmwn');

exports.handler = function(event, context, callback) {
    console.log("identity signup");
    hipchat.notify({
        message: 'identity signup, event: ' + JSON.stringify(event),
        color: 'purple'
    });
    hipchat.notify({
        message: 'identity signup, context: ' + JSON.stringify(context),
        color: 'purple'
    });
    callback(null, {
        statusCode: 200
    });
};
