import connection from "./dbConnection";



const createUser = (newUser) => {
    const sql = 'INSERT INTO users (email, password, nickname, image) VALUES (?, ?, ?, ?)';
    connection.execute(sql, [newUser.email, newUser.password, newUser.nickname, newUser.profileImage], (err, result) => {
        if (err) {
            return false;
        }

        return true;
    });
}


const getUsers = () => {
    const sql = 'SELECT * FROM users';
    connection.execute(sql, [], (err, result) => {
        if (err) {
            return false;
        }
        
        return result;
    });    
}


const getUserById = (id) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
    connection.execute(sql, [id], (err, result) => {
        if (err) {
            return false;
        }
        
        return result;
    });    
}


const updateUser = (user) => {
    const sql = "UPDATE users SET ninkname = ?, image = ? WHERE id = ?";
    connection.execute(sql, [user.nickname, user.profileImage, user.id], (err, result) => {
        if(err) {
            return false;
        }

        return true;
    })
}


const updateUserPassword = (user) => {
    const sql = "UPDATE users SET password = ? WHERE id = ?";   
    connection.execute(sql, [user.password, user.id], (err, result) => {
        if(err) {
            return false;
        }

        return true;
    })
}


const deleteUser = (userId) => {
    const sql = "DELETE FROM users WHERE id = ?";
    connection.execute(sql, [userId], (err, result) => {
        if(err) {
            return false;
        }

        return true;
    })
}



export default {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    updateUserPassword,
};