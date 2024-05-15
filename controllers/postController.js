import model from '../models/postModel.js';


function getPosts(req, res) {
    const postsJson = model.getPosts();

    const resultJson = {
        result : postsJson
    }

    res.status(200).json(resultJson);
}

function createPost(req, res) {

    const newPost = {
        writer : req.body.writer,
        title : req.body.title,
        content : req.body.content,
        imageName: req.body.imageName,
        image : req.body.image
    }
    
    model.createPost(newPost);

    res.status(201).send('create_success');
}

function getPost(req, res) {
    const post = model.getPost(req.params.postId);

    const resultJson = {
        result : post
    }

    res.status(200).json(resultJson);
}

function getComments(req, res) {
    const comments = model.getComments(req.params.postId);

    const resultJson = {
        result : comments
    }
    
    res.status(200).json(resultJson);
}

function deletePost(req, res) {
    model.deletePost(req.params.postId);   

    res.status(204).send('delete_success');
}


function updatePost(req, res) {
    const post = {
        id: parseInt(req.params.postId),
        title : req.body.title,
        content : req.body.content,
        imageName: req.body.imageName,
        image : req.body.image,
        hits: req.body.hits,
    }

    model.updatePost(post); 
+
    res.status(204).send('update_success');
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

function deleteComment(req, res) {
    model.deleteComment(req.params.postId, req.params.commentId);   

    res.status(204).send('delete_success');
}

function updateComment(req, res) {
    const comment = {
        id: parseInt(req.params.commentId),
        text : req.body.text
    }

    model.updateComment(comment); 

    res.status(204).send('update_success');
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
