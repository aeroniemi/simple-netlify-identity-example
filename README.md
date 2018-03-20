# Netlify Identity Bug Demonstration Site

This is an example site that has a really simple structure,
and can be used to demonstrate a bug with the use the Google email sign on button.

The top-level index.html file, the test folder index file and the login.html file are all really
the same file, except for a notation at the top about which page it is.

It should be possible to navigate to the top-level page and login, while will allow you
to proceed to the test folder index page.

If you are not logged in and have an "admin" role, you will be redirected to login.html when
you try to go to the test folder.
