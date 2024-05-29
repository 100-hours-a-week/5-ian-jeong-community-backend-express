import connection from "./dbConnection.js";


const createUser = async (newUser) => {
    const sql = 'INSERT INTO users (email, password, nickname, image) VALUES (?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
        connection.execute(sql, [newUser.email, newUser.password, newUser.nickname, newUser.image], (err, result) => {
            if (err) {
                return reject(err);
            }
    
            resolve();
        });
    })
}


const getUsers = async () => {
    const sql = 'SELECT * FROM users';
    return new Promise((resolve, reject) => {
        connection.execute(sql, [], (err, result) => {
            if (err) {
                return reject(err);
            }
            
            resolve(result);
        });    
    });
}


const getUserById = async (id) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
    return new Promise((resolve, reject) => {
        connection.execute(sql, [id], (err, result) => {
            if (err) {
                return reject(err);
            }
            
            resolve(result);
        });    
    });
}


const updateUser = async (user) => {
    const sql = "UPDATE users SET nickname = ?, image = ? WHERE id = ?";
    return new Promise((resolve, reject) => {
        connection.execute(sql, [user.nickname, user.profileImage, user.id], (err, result) => {
            if(err) {
                return reject(err);
            }
    
            resolve();
        });
    });
}


const updateUserPassword = async (user) => {
    const sql = "UPDATE users SET password = ? WHERE id = ?";   
    return new Promise((resolve, reject) => {
        connection.execute(sql, [user.password, user.id], (err, result) => {
            if(err) {
                return reject(err);
            }
    
            resolve();
        });
    });
}


const deleteUser = async (userId) => {
    const sql = "DELETE FROM users WHERE id = ?";
    return new Promise((resolve, reject) => {
        connection.execute(sql, [userId], (err, result) => {
            if(err) {
                return reject(err);
            }
    
            resolve();
        });
    });
}


export default {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    updateUserPassword,
};