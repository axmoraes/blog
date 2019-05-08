This is a very simple blog application.

In order to run it, you first need to clone the repository to your folder and install the dependencies.
If you don't have NPM installed in your machine:

sudo apt-get install npm

if you do, skip direct to the dependencies:

sudo npm i body-parser express express-sanitizer method-override mongoose

once you have it all, install MongoDB following this tutorial:

https://docs.mongodb.com/manual/administration/install-community/

Then, start mongo in your terminal, just type 'mongo'

open another terminal in the repository folder and run the server:

node app.js

It might show the server has started, otherwise it's not working.

Then go to your web browser and open the localhost port:

localhost:3000

and it will open the blog.

It's ready to play with, change the colors, the posts and any config you'd like.

The application will generate 2 posts examples, which you can edit or delete at your will, but every time you restart the server, it will come as default again.





