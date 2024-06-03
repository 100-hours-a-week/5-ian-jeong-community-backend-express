import postDAO from '../models/repository/postDAO.js';


const createPost = async (req, res) => {
    const {userId, title, content, imageName, image} = req.body;

    const filePath = path.join('uploads/post', userId);
    fs.writeFileSync(filePath, image);

    const newPost = {
        userId : userId,
        title : title,
        content : content,
        imageName: imageName,
        image : image
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

        const filePath = result.post[0].image;
        const data = fs.readFileSync(filePath, 'utf8');
        result.post[0].image = data;
        
        const resultJson = {
            post : result.post[0],
            comments : result.comments
        }
        
        console.log(result);
    
        res.status(200).json(resultJson);

    } catch(error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}




const updatePost = (req, res) => {
    const post = {
        id: parseInt(req.params.postId),
        userId: req.params.userId,
        title : req.body.title,
        content : req.body.content,
        imageName: req.body.imageName,
        image : req.body.image,
    }

    const filePath = path.join('uploads/post', userId);
    fs.writeFileSync(filePath, image);
    postMessage.image = filePath;

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
        postId: req.body.postId,
        userId: req.body.writer,
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
