const HipChatNotify = require('hipchat-notify');
let hipchat = new HipChatNotify(4516663, 'tn8neyu93ei7x3jRnYrHuzNtq2RbXXGuIXwZTmwn');

exports.handler = function (event, context, callback) {
    const user = context.clientContext.user;
    console.log("separate login");
    hipchat.notify({
        message: 'separate login, user: ' + JSON.stringify(user),
        color: 'green'
    });
    hipchat.notify({
        message: 'separate login, event: ' + JSON.stringify(event),
        color: 'green'
    });
    hipchat.notify({
        message: 'separate login, context: ' + JSON.stringify(context),
        color: 'green'
    });

    hipchat.notify(
        {
            message: 'separate login, user 2nd time: ' + JSON.stringify(user),
            color: 'green'
        },
        function() {
            callback(null, {
                statusCode: 200
            });
        }
    );
};
