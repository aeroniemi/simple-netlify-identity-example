
const request = require('request');
const HipChatNotify = require('hipchat-notify');
let hipchat = new HipChatNotify(4516663, 'tn8neyu93ei7x3jRnYrHuzNtq2RbXXGuIXwZTmwn');

let putAdminRoleOnUser = function(identityUrl, userId, token, numTries = 0) {
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
            app_metadata: {"roles": ["admin"]}
        }
    };
    request(putOptions, function(error, response, body) {
        hipchat.notify({
            message: 'webhook, PUT request try=' + numTries + ' for userId=' + userId + ' error=' + error +
            ' response: ' + JSON.stringify(response) + ' ==== body: ' + JSON.stringify(body),
            color: 'purple'
        });
        if (response.statusCode === 404) {
            if (numTries < 3) {
                putAdminRoleOnUser(identityUrl, userId, token, numTries + 1);
            }
        }
    });
};

exports.handler = function (event, context, callback) {
    let body = JSON.parse(event.body);
    let retval = 200;

    console.log("webhook");
    console.log("event", event);
    console.log("context", context);

    if (body.event === 'validate') {
        // allow new signups only from ntti3.io domain
        let allow = (body.user.email && body.user.email.match(/@ntti3.io$/i));
        retval = allow ? 200 : 401;
    }
    else if (body.event === 'signup') {
        // if this user doesn't have any roles yet, then add admin role (typically for newly signed up user)
        if (!body.user.app_metadata.roles) {
            putAdminRoleOnUser(context.clientContext.identity.url, body.user.id, context.clientContext.identity.token);
        }
    }
    else if (body.event === 'login') {
        // if this user doesn't have any roles yet, then add admin role (typically for newly signed up user)
        // TODO: figure out why this is necessary, it should have been handled during signup
        if (!body.user.app_metadata.roles) {
            putAdminRoleOnUser(context.clientContext.identity.url, body.user.id, context.clientContext.identity.token);
        }
    }

    hipchat.notify({
        message: 'webhook, returning code: ' + retval + ' while doing ' +
            JSON.stringify(body.event) + ' for user: ' + JSON.stringify(body.user),
        color: 'yellow'
    });

    callback(null, {
        statusCode: retval
    });
};
