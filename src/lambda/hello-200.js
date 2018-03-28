
const HipChatNotify = require('hipchat-notify');
let hipchat = new HipChatNotify(4516663, 'tn8neyu93ei7x3jRnYrHuzNtq2RbXXGuIXwZTmwn');

exports.handler = function(event, context, callback) {
    console.log("hello-200");
    console.log(event);
    console.log(context);
    hipchat.notify('hello hipchat hello.js returning code 200, here is the event: ' + JSON.stringify(event));
    hipchat.notify('hello hipchat hello.js returning code 200, here is the context: ' + JSON.stringify(context));
    callback(null, {
        statusCode: 200,
        body: "Hello, World, returning code 200"
    });
};
