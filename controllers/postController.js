import postDAO from '../models/repository/postDAO.js';


const createPost = async (req, res) => {
    const newPost = {
        writer : req.body.writer,
        title : req.body.title,
        content : req.body.content,
        imageName: req.body.imageName,
        image : req.body.image
    }
    
    try {
        await postDAO.createPost(newPost);
        res.status(201).send('create_success');

    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}




const getPosts = async (req, res) => {
    try {
        const posts = await postDAO.getPosts();
        const resultJson = {
            result : posts
        }

        if (posts.length === 0) {
            res.status(404).send('Post Not found');
            return;
        }
    
        res.status(200).json(resultJson);

    } catch(error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}


const getPost = async (req, res) => {
    try {
        const result = await postDAO.getPost(req.params.postId);

        if (result == null) {
            res.status(404).send("Post not found" );
            return;
        }

        const resultJson = {
            result : result // 게시글 하나랑 댓글 배열
        }

    
        res.status(200).json(resultJson);

    } catch(error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}




const updatePost = (req, res) => {
    const post = {
        id: parseInt(req.params.postId),
        title : req.body.title,
        content : req.body.content,
        imageName: req.body.imageName,
        image : req.body.image,
    }

    try {
        postDAO.updatePost(post); 
        res.status(204).send('update_success');

    } catch(error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    } 
}




const deletePost = (req, res) => {
    try {
        postDAO.deletePost(req.params.postId);   
        res.status(204).send('delete_success');

    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}


const createComment = (req, res) => {
    const newComment = {
        id: req.body.postId,
        user_id: req.body.writer,
        content: req.body.text
    }

    try {
        postDAO.createComment(newComment);
        res.status(201).send('create_success');

    } catch(error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}


const updateComment = (req, res) => {
    const comment = {
        id: parseInt(req.params.commentId),
        content : req.body.text
    }

    try {
        postDAO.updateComment(comment); 
        res.status(204).send('update_success');

    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}


const deleteComment = (req, res) => {
    try {
        postDAO.deleteComment(req.params.commentId);   
        res.status(204).send('delete_success');

    } catch(error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}









export default {
    getPosts,
    createPost,
    getPost,
    deletePost,
    updatePost,
    createComment,
    deleteComment,
    updateComment
};
