exports.handler = function(event, context, callback) {
  const user = context.clientContext.user;
  console.log("identity login");
  console.log(user);
  console.log(event);
  console.log(context);
  callback(null, {
      statusCode: 200
  });
};
