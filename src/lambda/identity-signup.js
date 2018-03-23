exports.handler = function(event, context, callback) {
    console.log("identity signup");
    console.log(event);
    console.log(context);
    callback(null, {
        statusCode: 200
    });
};
