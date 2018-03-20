# Netlify Identity Bug Demonstration Site

This is an example site that has a really simple structure,
and can be used to demonstrate a bug with the Google email sign on button.

The top-level index.html file is open to everyone, but access to the Test Folder is
restricted to those logged in users than have an 'admin' role.

If you are not logged in, or do not have an "admin" role, you should be redirected to login.html when
you try to go to the test folder.

