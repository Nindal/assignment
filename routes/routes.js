const express = require('express');
const { commentOnPost,createPost,likeOnPost,createUser,likePostList,unlikeOnPost,
    commentPostList,likeOnComment , likeCommentList} = require('../controllers/Controller');
const router = express.Router();

router.get('/heathCheck',async (req,res)=>{
    res.status(200)
    .json({
        message: "working fine"
    })
})

router.post('/user',createUser);

router.post('/post',createPost);

router.post('/posts/like',likeOnPost);

router.post('/posts/unlike',unlikeOnPost);

router.post('/comment/like',likeOnComment);

router.post('/posts/comment',commentOnPost);

router.get('/posts/:postId/likeList',likePostList);

router.get('/comments/:commentId/commentLikeList',likeCommentList);

router.get('/posts/:postId/commentPostList',commentPostList);

router.get('/comment/:commentId/commentLikeList',)


module.exports = router;
