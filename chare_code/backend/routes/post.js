const express=require('express');
const postController=require('../controllers/PostController');

const router=express.Router();
router.get('/posts',postController.getPosts);
router.get('/post/:id',postController.getPost);
router.post('/post',postController.newPost);
router.delete('/post/:id',postController.deletePost);
router.put('/post/:id',postController.updatePost);
module.exports=router;
