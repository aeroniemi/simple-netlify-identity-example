exports.handler = function(event, context, callback) {
  const user = context.clientContext.user;
  console.log("identity login");
  console.log(event);
  console.log(context);
  callback(null, {
      statusCode: 200,
      body: {
        event: 'login',
        user: user,
        app_metadata: {"authorization": {"roles": ["admin"]}}
      }
  });
};
