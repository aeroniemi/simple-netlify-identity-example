/*
 * This webhook is called whenever a new user tries to sign up on the site using the Netlify Identity Wisget.
 * It checks that the user's email is on a permitted domain (such as username@ntti3.io),
 * and will only allow new users to sign up from permitted domains. Upon a valid signup, the new user is
 * automatically given the 'reader' role, so that they may view everything on the website.
 *
 * To get this script called by Netlify, you need to activate the webhook, here are the steps:
 *     - go to the Netlify Site Settings for your web site
 *     - look for the Settings -> Identity -> Notifications section
 *     - edit the Webhook
 *     - set the URL to https://<your-site-name>.netlify.com/.netlify/functions/webhook
 *     - leave the Secret field blank
 *     - check the event box for validate
 *     - click on the Save button
 *
 * In addition, the site should have a _redirects file that limits access to those with particular roles.
 * This will restrict visitor access to only those people with a role that permits access.
 *
 * Here's what the _redirects file should look like for your static website when you publish it on Netlify:
 *
 *     /test/* 200! Role=reader
 *     /test/ /login 404
 *
 * (replace test with the name of your protected sub-folder, and login with the name of the fail html file)
 *
 * More information about Netlify Identity service and Functions here:
 *     - https://www.netlify.com/docs/identity/
 *     - https://www.netlify.com/docs/functions/#identity-and-functions
 */

exports.handler = function (event, context, callback) {
    let body = JSON.parse(event.body);
    if (body.event === 'validate') {
        if (body.user.email && body.user.email.match(/@aeroniemi.com$/i)) {
            const responseBody = {"app_metadata": {"roles": ["reader"]}};
            callback(null, {
                statusCode: 200,
                body: JSON.stringify(responseBody)
            });
        }
        else {
            callback(null, {
                statusCode: 401
            });
        }
    }
    else {
        // if you happen to enable this webhook for signup or login events, this will make sure they still succeed
        callback(null, {
            statusCode: 200
        });
    }
};
