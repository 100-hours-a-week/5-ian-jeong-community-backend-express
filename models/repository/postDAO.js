import connection from "./dbConnection";


const createPost = async (newPost) => {
    const sql = "INSERT INTO posts (user_id, title, content, image, imageName) VALUES (?, ?, ?, ?, ?)";
    return new Promise((resolve, reject) => {
        connection.execute(sql, [newPost.writer, newPost.title, newPost.content, newPost.image, newPost.imageName], (err, result) => {
            if (err) {
                return reject(err);
            }
    
            resolve();
        });
    });
}


const getPosts = async () => {
    const sql = "SELECT * FROM posts ORDER BY created_at DESC";
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
        SELECT p.id, nickname, u.image, title, content, p.image, view_count, like_count, comment_count, created_at
        FROM posts AS p
        JOIN users AS u ON p.user_id = u.id
        WHERE p.id = ?
    `;
    const selectCommentsQuery = 'SELECT * FROM comments WHERE post_id = ?';

    return new Promise(async (resolve, reject) => {
        try {
            await connection.beginTransaction();
            await connection.execute(updateViewCountQuery, [postId]);

            const [post] = await connection.execute(selectPostQuery, [postId]);
            const [comments] = await connection.execute(selectCommentsQuery, [postId]);

            await connection.commit();

            const result = {
                post: post[0],
                comments: comments
            };

            resolve(result);
        } catch (err) {
            if (connection) {
                await connection.rollback();
            }

            reject(err);
        } finally {
            if (connection) {
                connection.release();
            }
        }
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




// delete cascade로 댓글 알아서 삭제됨 
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
        connection.execute(sql, [newComment.id, newComment,user_id, newComment.content], (arr, result) => {
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
        connection.execute(sql, [comment.content, comment.id], (arr, result) => {
            if (err) {
                return reject(err);
            }
    
            resolve();
        });
    });
}


function deleteComment(postId, commentId) {
    const commentsJsonFile = fs.readFileSync(__dirname + commentsDataPath, 'utf8');
    const commentsJsonData = JSON.parse(commentsJsonFile);
    const filteredData = commentsJsonData.filter(comment => comment.id !== parseInt(commentId));

    const deletedJsonData = JSON.stringify(filteredData);

    fs.writeFileSync(path.join(__dirname, commentsDataPath), deletedJsonData, 'utf8');
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