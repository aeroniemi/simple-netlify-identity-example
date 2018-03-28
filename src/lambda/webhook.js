
const HipChatNotify = require('hipchat-notify');
let hipchat = new HipChatNotify(4516663, 'tn8neyu93ei7x3jRnYrHuzNtq2RbXXGuIXwZTmwn');

exports.handler = function (event, context, callback) {
    let retval = 200;
    console.log("webhook");
    console.log("event", event);
    console.log("context", context);
    hipchat.notify({
        message: 'webhook, context.clientContext: ' + JSON.stringify(context.clientContext),
        color: 'green'
    });
    hipchat.notify({
        message: 'webhook, event.body: ' + JSON.stringify(event.body),
        color: 'yellow'
    });
    hipchat.notify({
        message: 'webhook, event.body.user: ' + JSON.stringify(event.body.user),
        color: 'red'
    });
    hipchat.notify({
        message: 'webhook, event: ' + JSON.stringify(event),
        color: 'purple'
    });
    hipchat.notify({
        message: 'webhook, returning code : ' + retval,
        color: 'gray'
    });

    callback(null, {
        statusCode: retval
    });
};
