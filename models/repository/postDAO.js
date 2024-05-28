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
    
            resolve(result);
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






function getComments(postId) {
    const commentsJsonFile = fs.readFileSync(__dirname + commentsDataPath, 'utf8');
    const commentsJsonData = JSON.parse(commentsJsonFile);

    return commentsJsonData.filter(comment => comment.postId === parseInt(postId));
}

function createComment(newComment) {
    const commentsJsonFile = fs.readFileSync(__dirname + commentsDataPath, 'utf8');
    const commentsJsonData = JSON.parse(commentsJsonFile);

    let newCommentId = parseInt(commentsJsonData[commentsJsonData.length-1].id) + 1;
    const currentDate = new Date();
    const koreaTimeOffset = 9 * 60; // 분 단위로 계산
    const koreaTime = new Date(currentDate.getTime() + koreaTimeOffset * 60 * 1000);
    const formattedDate = koreaTime.toISOString().replace('T', ' ').split('.')[0];

    const post = {
        id: newCommentId,
        postId: parseInt(newComment.postId),
        writer: parseInt(newComment.writer),
        time: formattedDate,
        text: newComment.text
    };

    commentsJsonData.push(post);

    const newCommentsJson = JSON.stringify(commentsJsonData);
    
    fs.writeFileSync(__dirname + commentsDataPath, newCommentsJson,'utf8');
}


function deleteComment(postId, commentId) {
    const commentsJsonFile = fs.readFileSync(__dirname + commentsDataPath, 'utf8');
    const commentsJsonData = JSON.parse(commentsJsonFile);
    const filteredData = commentsJsonData.filter(comment => comment.id !== parseInt(commentId));

    const deletedJsonData = JSON.stringify(filteredData);

    fs.writeFileSync(path.join(__dirname, commentsDataPath), deletedJsonData, 'utf8');
}


function updateComment(comment) {
    const commentsJsonFile = fs.readFileSync(__dirname + commentsDataPath, 'utf8');
    const commentsJsonData = JSON.parse(commentsJsonFile);

    for (let i = 0; i < commentsJsonData.length; i++) {
        if(parseInt(commentsJsonData[i].id) === parseInt(comment.id)) {
            commentsJsonData[i].text = comment.text;
        }
    }


    const result = JSON.stringify(commentsJsonData);
    
    fs.writeFileSync(path.join(__dirname, commentsDataPath), result, 'utf8');
}




export default {
    createPost,
    getPosts,
    getPost,
    getComments,
    deletePost,
    updatePost,
    createComment,
    deleteComment,
    updateComment
};