
To run this code please create a clone and run npm install.
All the necessary packages will be downloaded.
a link to the postman APIs which you can use to test it is attached
link to postman collection : https://www.getpostman.com/collections/14f66dcb3a600cda1bb3

the following apis are implemented
i.   An API to Create a post
ii.  An API to Like a post/comment on a post
iii. An api to comment on a post
iv.  an API to fetch the latest list of users liking my posts
v.   an API to fetch the latest list of users liking my comments on any post
vi.  An API to fetch the latest list of users commenting on my post

Mongodb as database and mongoose as ODM are used. Express is used for building apis and routing.
It has three schemas
1. User
2. Post
3. Comment

Description of Schemas
1. User Schema :
In this following fields are there
i.   username : to uniquely identify each user
ii.  fullname : a person' s name
iii. mobie_number : in case a person want to get mobile notifications
iv . an array of posts to keep track of post posted by user


2. Post Schema :
In the following fields are there
i.   userid : to keep  track of user
ii.  title;: title of post
iii. content : content of post
iV.  likeList : a map containing userids of user who have liked and unliked the post
v .  commentList : an array conating the commentids of comment made on post

3. Comments Schema
In this following fields are there
i.   userid : to keep the track of user who commented
ii.  postid : post on which comment is made
iii. content : content of comment
iv.  likeList : a map containing users who liked and unliked the comment



