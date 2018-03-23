exports.handler = function(event, context, callback) {
    const user = context.clientContext.user;
    console.log("identity validate");
    console.log(user);
    console.log(event);
    console.log(context);
    if (user.email === "van@fellupon.com") {
      callback(null, {
          statusCode: 401
      });
    }
    else {
      callback(null, {
          statusCode: 200
      });
    }
};
