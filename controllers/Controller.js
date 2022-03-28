const { Post,User,Comment} = require('./../models/Model');

const createUser = async(req, res) => {
  try{
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        post: newUser
      }
    });
  }
  catch(err){
    res.status(500).json({
      status: 'error',
      message: 'not able tp create user'
    });
  }
 
};

const createPost = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    const postId = newPost._id;
    const user = await User.findById(req.body.user_id);
    user.posts.push(postId);
    user.save();
    res.status(201).json({
      status: 'success',
      data: {
        post: newPost
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};


const likeOnPost = async (req,res) => {
  try{
    const postId = req.body.postId;
    const userId = req.body.userId;
    const post = await Post.findById(postId);
    if(post.user_id == userId){
      return res.status(201).json({
        message : 'can not like your own post'
      });
    }
    if(post.likeList.has(userId)){
      if(post.likeList.get(userId)){
        return res.status(201).json({
          message : 'can not like same post more than one'
        });
      }
      post.likeList.delete(userId);
    }
    post.likeList.set(userId,true);
    post.save();
    res.status(201).json({
      message : 'post liked successfully'
    });
  }
  catch(err){
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
}

const unlikeOnPost = async (req,res) => {
  try{
    const postId = req.body.postId;
    const userId = req.body.userId;
    const post = await Post.findById(postId);
    if(post.user_id == userId){
      res.status(201).json({
        message : 'can not unlike your own post'
      });
    }
    if(post.likeList.has(userId)){
      if(post.likeList.get(userId)){
        post.likeList.set(userId,false);
      }
      else{
        return res.status(201).json({
          message : 'can not unlike post'
        });
      }
    }
    post.save();
    res.status(201).json({
      message : 'post unliked successfully'
    });
  }
  catch(err){
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
}

const commentOnPost = async (req,res) => {
  try{
    const postId=req.body.post_id;
    const newComment = await Comment.create(req.body);
    const post = await Post.findById(postId);
    post.commentList.push(newComment._id);
    post.save();
    res.status(201).json({
      status: 'successfull commented on post',
      data: {
        post: newComment
      }
    });

  }
  catch(err){
    res.status(500).json({
      status: 'error',
      message: err
    });
  }
}

const likeOnComment = async (req,res) => {
  try{
    const id = req.body.commentId;
    const userId = req.body.userId;
    const comment = await Comment.findById(id);
    if(comment.likeList.has(userId)){
      if(comment.likeList.get(userId)==true){
        return res.status(201).json({
          status: 'success',
          data: {
            message : 'comment already liked'
          }
        });
      }
      comment.likeList.delete(userId);
    }
    comment.likeList.set(userId,true);
    comment.save();
    res.status(201).json({
      status: 'success',
      data: {
        message : 'comment succesfully liked'
      }
    });
  }
  catch(err){
    res.status(400).json({
      status: 'failed',
      message: err
    });
  }
}

const likePostList = async (req,res) => {
  try{
    const post = await Post.findById(req.params.postId);
    const map = post.likeList;
    const usersLikedMyPosts =[];
    for (let [key, value] of map) {
      if( value == true){
        usersLikedMyPosts.push(key);
      }
    }
    res.status(200).json({
      status: 'success',
      data: {
        usersLikedMyPosts
      }
    });

  }
  catch(err){
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
}

const likeCommentList = async (req,res) =>{
  try{
    const commentId = req.params.commentId ;
    const comment = await Comment.findById(commentId);
    const map = comment.likeList;
    const usersLikedMyComments =[];
    for (let [key, value] of map) {
      if( value == true){
        usersLikedMyComments.push(key);
      }
    }
    res.status(200).json({
      status: 'success',
      data: {
        usersLikedMyComments
      }
    });
  }
  catch(err){
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
}
 

const commentPostList = async (req,res) => {
  try{
    const comment = await Post.findById(req.params.postId);
    const commentList = comment.commentList;
    res.status(200).json({
      status: 'success',
      data: {
        commentList
      }
    });
  }
  catch(err){
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
}

module.exports = { createUser,createPost,likeOnPost,unlikeOnPost,commentOnPost,likeOnComment,commentPostList,
  commentPostList,likePostList,likeCommentList }