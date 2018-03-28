
const HipChatNotify = require('hipchat-notify');
let hipchat = new HipChatNotify(4516663, 'tn8neyu93ei7x3jRnYrHuzNtq2RbXXGuIXwZTmwn');

exports.handler = function(event, context, callback) {
    let retval = 200;
    const user = context.clientContext.user;
    console.log("webhook");
    console.log(event);
    console.log(context);
    hipchat.notify({
        message: 'webhook, context.clientContext.identity: ' + JSON.stringify(context.clientContext.identity),
        color: 'green'
    });
    hipchat.notify({
        message: 'webhook, event.body.event: ' + JSON.stringify(event.body.event),
        color: 'green'
    });
    hipchat.notify({
        message: 'webhook, event.body.user: ' + JSON.stringify(event.body.user),
        color: 'green'
    });
    hipchat.notify({
            message: 'webhook, event: ' + JSON.stringify(event),
        color: 'green'
    });
    hipchat.notify({
            message: 'webhook, context: ' + JSON.stringify(context),
        color: 'green'
    });
    hipchat.notify({
            message: 'webhook, returning code : ' + retval,
        color: 'gray'
    });

    callback(null, {
        statusCode: retval
    });
};
