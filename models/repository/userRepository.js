import connection from "./dbConnection";

const createUser = (newUser) => {
    const sql = 'INSERT INTO users (email, password, nickname, image) VALUES (?, ?, ?, ?)';
    connection.execute(sql, [newUser.email, newUser.password, newUser.nickname, newUser.profileImage], (err, result) => {
        if (err) {
            return false;
        }

        if (result.affectedRows < 1) {
            return false;
        } 
        
        return true;
    });
}

const getUsers = () => {
    
}

const getUserById = () => {

}

const updateUser = () => {

}

const deleteUser = () => {

}


export default {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
}


