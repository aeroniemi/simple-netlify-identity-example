
const HipChatNotify = require('hipchat-notify');
let hipchat = new HipChatNotify(4516663, 'tn8neyu93ei7x3jRnYrHuzNtq2RbXXGuIXwZTmwn');

exports.handler = function(event, context, callback) {
    console.log("hello-401");
    console.log(event);
    console.log(context);
    hipchat.notify('hello hipchat this is netfliy hello-401, here is the event: ' + JSON.stringify(event));
    hipchat.notify('hello hipchat this is netlify hello-401, here is the context: ' + JSON.stringify(context));
    callback(null, {
        statusCode: 401,
        body: "Hello, World, but this returns code 401"
    });
};
