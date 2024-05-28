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


// 트랜잭션
// 반환값은 게시글데이터 하나와 댓글들 
const getPost = (postId) => {
    return new Promise(async (resolve, reject) => {
        const updateViewCountQuery = 'UPDATE posts SET view_count = view_count + 1 WHERE id = ?';
        const selectPostQuery = `
            SELECT p.id, nickname, u.image, title, content, p.image, view_count, like_count, comment_count, created_at
            FROM posts AS p
            JOIN users AS u ON p.user_id = u.id
            WHERE p.id = ?
        `;
        const selectCommentsQuery = 'SELECT * FROM comments WHERE post_id = ?';

        try {
            await connection.beginTransaction();
            await connection.execute(updateViewCountQuery, [postId]);

            const [postRows] = await connection.execute(selectPostQuery, [postId]);
            const [commentRows] = await connection.execute(selectCommentsQuery, [postId]);

            await connection.commit();

            const post = {
                post: postRows[0],
                comments: commentRows
            };

            resolve(post);
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






function getComments(postId) {
    const commentsJsonFile = fs.readFileSync(__dirname + commentsDataPath, 'utf8');
    const commentsJsonData = JSON.parse(commentsJsonFile);

    return commentsJsonData.filter(comment => comment.postId === parseInt(postId));
}


function deletePost(postId) {
    const postsJsonFile = fs.readFileSync(__dirname + postsDataPath, 'utf8');
    const postsJsonData = JSON.parse(postsJsonFile);
    const filteredData = postsJsonData.filter(post => post.id !== parseInt(postId));
    const deletedJsonData = JSON.stringify(filteredData);

    fs.writeFileSync(path.join(__dirname, postsDataPath), deletedJsonData, 'utf8');
}


function updatePost(post) {
    const postsJsonFile = fs.readFileSync(__dirname + postsDataPath, 'utf8');
    const postsJsonData = JSON.parse(postsJsonFile);

    for (let i = 0; i < postsJsonData.length; i++) {
        if (parseInt(post.id) === parseInt(postsJsonData[i].id)) {
            postsJsonData[i].title = post.title;
            postsJsonData[i].content = post.content;
            postsJsonData[i].imageName = post.imageName;
            postsJsonData[i].image = post.image;
            postsJsonData[i].hits = post.hits;
        } 
    }
    
    const result = JSON.stringify(postsJsonData);
    
    fs.writeFileSync(path.join(__dirname, postsDataPath), result);
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