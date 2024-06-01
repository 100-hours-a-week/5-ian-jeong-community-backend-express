import connection from "./dbConnection.js";



const createPost = async (newPost) => {
    const sql = "INSERT INTO posts (user_id, title, content, image, imageName) VALUES (?, ?, ?, ?, ?)";
    return new Promise((resolve, reject) => {
        connection.execute(sql, [newPost.userId, newPost.title, newPost.content, newPost.image, newPost.imageName], (err, result) => {
            if (err) {
                return reject(err);
            }
    
            resolve();
        });
    });
}


const getPosts = async () => {
    const sql = "SELECT id, user_id, title, content, image, imageName, view_count, like_count, comment_count, DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') AS created_at FROM posts ORDER BY created_at DESC";
    return new Promise((resolve, reject) => {
        connection.execute(sql, [], (err, result) => {
            if (err) {
                return reject(err);
            }
    
            resolve(result);
        });
    });
}


const getPost = (postId) => {
    const updateViewCountQuery = 'UPDATE posts SET view_count = view_count + 1 WHERE id = ?';
    const selectPostQuery = `
        SELECT id, user_id, title, content, convert(image USING UTF8) as image, imageName, view_count, like_count, comment_count, DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') AS created_at
        FROM posts
        WHERE id = ?
        ORDER BY created_at DESC
    `;
    const selectCommentsQuery = `SELECT id, post_id, user_id, content, DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') AS created_at FROM comments WHERE post_id = ? ORDER BY created_at DESC`;

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


const updatePost = (post) => {
    const sql = 'UPDATE posts SET title = ?, content = ?, image = ?, imageName = ? WHERE id = ?';
    
    return new Promise((resolve, reject) => {
        connection.execute(sql, [post.title, post.content, post.image, post.imageName, post.id], (err, result) => {
            if (err) {
                return reject(err);
            }
    
            resolve();
        });
    });
}





const deletePost = (postId) => {
    const sql = 'DELETE FROM posts WHERE id = ?';

    return new Promise((resolve, reject) => {
        connection.execute(sql, [postId], (err, result) => {
            if (err) {
                return reject(err);
            }
    
            resolve(result);
        });
    });
}


const createComment = (newComment) => { 
    const sql = 'INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)';

    return new Promise((resolve, reject) => {
        connection.execute(sql, [newComment.postId, newComment.userId, newComment.content], (err, result) => {
            if (err) {
                return reject(err);
            }
    
            resolve();
        });
    });
}


const updateComment = (comment) => {
    const sql = 'UPDATE comments SET content = ? WHERE id = ?';

    return new Promise((resolve, reject) => {
        connection.execute(sql, [comment.content, comment.id], (err, result) => {
            if (err) {
                return reject(err);
            }
    
            resolve();
        });
    });
}


const deleteComment = (commentId) => {
    const sql = 'DELETE FROM comments WHERE id = ?';
    
    return new Promise((resolve, reject) => {
        connection.execute(sql, [commentId], (err, result) => {
            if (err) {
                return reject(err);
            }
    
            resolve();
        });
    });
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