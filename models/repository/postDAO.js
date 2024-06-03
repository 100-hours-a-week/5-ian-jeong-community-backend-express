import {connection, executeQuery} from "./dbConnection.js";



const createPost = async (newPost) => {
    const sql = "INSERT INTO posts (user_id, title, content, image, imageName) VALUES (?, ?, ?, ?, ?)";
    const args = [newPost.userId, newPost.title, newPost.content, newPost.image, newPost.imageName];
    
    return executeQuery(sql, args);
}


const getPosts = async () => {
    const sql = "SELECT id, user_id, title, content, image, imageName, view_count, like_count, comment_count, DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') AS created_at FROM posts WHERE deleted_at IS NULL ORDER BY created_at DESC";
    const args = [];

    return executeQuery(sql, args);
}


const getPost = async (postId) => {
    const updateViewCountQuery = 'UPDATE posts SET view_count = view_count + 1 WHERE id = ? AND deleted_at IS NULL';
    const selectPostQuery = `
        SELECT id, user_id, title, content, convert(image USING UTF8) as image, imageName, view_count, like_count, comment_count, DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') AS created_at
        FROM posts
        WHERE id = ? AND deleted_at IS NULL
        ORDER BY created_at DESC
    `;
    const selectCommentsQuery = `SELECT id, post_id, user_id, content, DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') AS created_at FROM comments WHERE post_id = ? ORDER BY created_at DESC WHERE deleted_at IS NULL`;

    return new Promise( async (resolve, reject) => {
        connection.beginTransaction();
        let post;
        let comments;
        
        try {
            await new Promise((resolve, reject) => {
                connection.execute(updateViewCountQuery, [postId], (err, result) => {
                    if (err) {
                        connection.rollback();
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
            
            post = await new Promise((resolve, reject) => {
                connection.execute(selectPostQuery, [postId], (err, result) => {
                    if (err) {
                        connection.rollback();
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
            
            comments = await new Promise((resolve, reject) => {
                connection.execute(selectCommentsQuery, [postId], (err, result) => {
                    if (err) {
                        connection.rollback();
                        reject(err);
                    } else {
                        console.log(result);
                        resolve(result);
                    }
                });
            });

        } catch (err) {
            reject(err);
        }
        
        
        connection.commit();
        if (post.length === 0) {
            resolve(null);
        }

        const result = {
            post: post,
            comments: comments
        };
        
        resolve(result);
    });
}


const updatePost = async (post) => {
    const sql = 'UPDATE posts SET title = ?, content = ?, image = ?, imageName = ? WHERE id = ? AND deleted_at IS NULL';
    const args = [post.title, post.content, post.image, post.imageName, post.id];

    return executeQuery(sql, args);
}


const deletePost = async (postId) => {
    const sql = 'UPDATE posts SET deleted_at = CURRENT_TIMESTAMP() WHERE id = ?';
    const args = [postId];

    return executeQuery(sql, args);
}


const createComment = async (newComment) => { 
    const sql = 'INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)';
    const args = [newComment.postId, newComment.userId, newComment.content];

    return executeQuery(sql, args);
}


const updateComment = async (comment) => {
    const sql = 'UPDATE comments SET content = ? WHERE id = ? AND deleted_at IS NULL';
    const args = [comment.content, comment.id];

    return executeQuery(sql, args);
}


const deleteComment = async (commentId) => {
    const sql = 'UPDATE comments SET deleted_at = CURRENT_TIMESTAMP() WHERE id = ?';
    const args = [commentId];
    
    return executeQuery(sql, args);
}


export default {
    createPost,
    getPosts,
    getPost,
    deletePost,
    updatePost,
    createComment,
    deleteComment,
    updateComment
};