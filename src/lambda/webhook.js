
const request = require('request');
const HipChatNotify = require('hipchat-notify');
let hipchat = new HipChatNotify(4516663, 'tn8neyu93ei7x3jRnYrHuzNtq2RbXXGuIXwZTmwn');

let putAdminRoleOnUser = function(identityUrl, userId, token) {
    // using this library for http requests: https://github.com/request/request
    // using this library at the api endpoint: https://github.com/netlify/gotrue
    // use the PUT /admin/users api endpoint to add this to user record:
    // {"app_metadata": {"authorization": {"roles": ["admin"]}}}
    let putOptions = {
        url: identityUrl + '/admin/users/' + userId,
        method: 'PUT',
        headers: {
            Authorization: 'Bearer ' + token
        },
        json: true,
        body: {
            app_metadata: {"authorization": {"roles": ["admin"]}}
        }
    };
    request(putOptions, function(error, response, body) {
        hipchat.notify({
            message: 'webhook, PUT request for userId= ' + userId + ' error=' + error +
            ' response: ' + JSON.stringify(response) + ' ==== body: ' + JSON.stringify(body),
            color: 'purple'
        });
    });
};

exports.handler = function (event, context, callback) {
    let retval = 200;
    console.log("webhook");
    console.log("event", event);
    console.log("context", context);
    hipchat.notify({
        message: 'webhook, context.clientContext: ' + JSON.stringify(context.clientContext) +
        ' the token is ' + context.clientContext.identity.token + ' and the url is ' +
        context.clientContext.identity.url,
        color: 'green'
    });
    let body = JSON.parse(event.body);
    hipchat.notify({
        message: 'webhook, body.event: ' + JSON.stringify(body.event),
        color: 'yellow'
    });
    hipchat.notify({
        message: 'webhook, body.user: ' + JSON.stringify(body.user),
        color: 'yellow'
    });

    if (body.event === 'validate') {
        // only allow signups from ntti3.io domain
        let allow = false;
        if (body.user.email) {
            hipchat.notify({
                message: 'EXAMINE: email of new user ' + body.user.email,
                color: 'red'
            });

            if (body.user.email.match(/@ntti3.io$/i)) {
                allow = true;
            }
        }

        retval = allow ? 200 : 401;
    }
    else if (body.event === 'signup') {
        // figure out how to give the 'admin' role to the newly signed up user
        hipchat.notify({
            message: 'give admin role to new user ' + body.user.email,
            color: 'red'
        });

        putAdminRoleOnUser(context.clientContext.identity.url, body.user.id, context.clientContext.identity.token);
    }
    else if (body.event === 'login') {
        hipchat.notify({
            message: 'TODO: try again to give admin role to user ' + body.user.email,
            color: 'red'
        });

        putAdminRoleOnUser(context.clientContext.identity.url, body.user.id, context.clientContext.identity.token);
    }

    hipchat.notify({
        message: 'webhook, returning code : ' + retval,
        color: 'red'
    });

    callback(null, {
        statusCode: retval
    });
};
