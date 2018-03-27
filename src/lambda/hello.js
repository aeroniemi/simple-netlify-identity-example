
const HipChatNotify = require('hipchat-notify');
let hipchat = new HipChatNotify(4516663, 'tn8neyu93ei7x3jRnYrHuzNtq2RbXXGuIXwZTmwn');

exports.handler = function(event, context, callback) {
    console.log("hello");
    console.log(event);
    console.log(context);
    hipchat.notify('hello hipchat this is netfliy hello.js again, here is the event: ' + JSON.stringify(event));
    callback(null, {
        statusCode: 200,
        body: "Hello, World"
    });
};
