
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
            app_metadata: {"roles": ["admin"]}
        }
    };
    request(putOptions, function(error, response, body) {
        hipchat.notify({
            message: 'webhook, PUT request for userId=' + userId + ' error=' + error +
            ' response: ' + JSON.stringify(response) + ' ==== body: ' + JSON.stringify(body),
            color: 'purple'
        });
    });
};

let postCreateUserWithAdminRole = function(identityUrl, user, token) {
    // using this library for http requests: https://github.com/request/request
    // using this library at the api endpoint: https://github.com/netlify/gotrue
    // use the POST /admin/users api endpoint to create a new user record with role
    if (user && user.app_metadata) {
        user.app_metadata.roles = ["admin"];
    }
    let postOptions = {
        url: identityUrl + '/admin/users',
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + token
        },
        json: true,
        body: user
    };
    request(postOptions, function(error, response, body) {
        hipchat.notify({
            message: 'webhook, POST request with these options: ' + JSON.stringify(postOptions) +
            ' and this response ' + response + ' and this body ' + body,
            color: 'red'
        });
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
        if (allow) {
            hipchat.notify({
                message: 'webhook, validate has user: ' + JSON.stringify(body.user),
                color: 'yellow'
            });
            postCreateUserWithAdminRole(context.clientContext.identity.url, body.user, context.clientContext.identity.token);
        }
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
