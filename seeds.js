var mongoose    = require("mongoose"),
    Posts       = require("./models/posts")

    
// EXAMPLE POST

var examplePost = [
    {
        title: "Post Example",
        image: "https://s3.amazonaws.com/uploads.hotmart.com/blog/2016/01/post_url_940x6062-670x432.png",
        body: "This is an example of a blog post. Click on 'New post' to add your first blog post. Insert a title, then a url of an image, a content and next click on Submit. And your post is done!",
        created: "Tue Apr 23 2019"
    },
    {
        title: "Another Example",
        image: "http://dominiquej.com/wp-content/uploads/2017/01/successful-blogger.jpg",
        body: "This is another example of a blog post. Now it is time for you to create your own ",
        created: "Tue May 07 2019"
    }
]

function seedDB(){
   //Remove all posts
   Posts.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed posts!");
         //add a few posts
        examplePost.forEach(function(seed){
            Posts.create(seed, function(err, post){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a post");

                }
            });
        });
    }); 
}

module.exports = seedDB;
