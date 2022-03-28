const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  user_name : {
    type : String,
    required: [true, 'username is required'],
    unique: true,
  },
  full_name : {
    type : String,
    required : true
  },
  mobile_number : Number,
  posts : [  String ],
  
})
const postSchema = new Schema({
  user_id : {type : Schema.ObjectId , ref : 'User' },
  title : {
    type : String,
    required : true,
  },
  content : {
    type :String,
    required : true
  },
  likeList: {
    type: Map,
    of: Boolean,
    default : {}
  },
  commentList : [String]
},{
  timestamps : true
})

const commentSchema = new Schema({
  user_id :{
    type : Schema.ObjectId ,
    ref : 'User' 
  },
  post_id : {
    type : Schema.ObjectId,
    ref : 'Post'
  },
  content : {
    type : String,
    required : true
  },
  likeList: {
    type: Map,
    of: Boolean,
    default : {}
  },
},{
  timestamps : true
})

const Post = mongoose.model('Post', postSchema);
const User = mongoose.model('User',userSchema);
const Comment = mongoose.model('Comment',commentSchema);


module.exports = { Post,User,Comment }
