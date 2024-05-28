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
    
        res.status(200).json(resultJson);

    } catch(error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}


const getPost = async (req, res) => {
    try {
        const result = await postDAO.getPost(req.params.postId);
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





function createComment(req, res) {
    const newComment = {
        postId: req.body.postId,
        writer : req.body.writer,
        text : req.body.text
    }

    model.createComment(newComment);

    res.status(201).send('create_success');
}

function getComments(req, res) {
    const comments = model.getComments(req.params.postId);

    const resultJson = {
        result : comments
    }
    
    res.status(200).json(resultJson);
}

function updateComment(req, res) {
    const comment = {
        id: parseInt(req.params.commentId),
        text : req.body.text
    }

    model.updateComment(comment); 

    res.status(204).send('update_success');
}

function deleteComment(req, res) {
    model.deleteComment(req.params.postId, req.params.commentId);   

    res.status(204).send('delete_success');
}









export default {
    getPosts,
    createPost,
    getPost,
    getComments,
    deletePost,
    updatePost,
    createComment,
    deleteComment,
    updateComment
};
