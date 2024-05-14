import express from 'express';
import postController from './../controllers/postController.js';


const router = express.Router();

router.get('/', postController.getPosts)
router.post('/', postController.createPost);

router.get('/:postId', postController.getPost);
router.delete('/:postId', postController.deletePost);
router.patch('/:postId', postController.updatePost);

router.get('/:postId/comments', postController.getComments);
router.post('/:postId/comments', postController.createComment);

router.delete('/:postId/comments/:commentId', postController.deleteComment);
router.patch('/:postId/comments/:commentId', postController.updateComment);


export default router;